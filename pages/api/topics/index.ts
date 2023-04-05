import { CeramicClient } from '@ceramicnetwork/http-client'
import { DID } from 'dids'
import { Ed25519Provider } from 'key-did-provider-ed25519'
import * as KeyDIDResolver from 'key-did-resolver'
import {Resolver} from 'did-resolver'
import { fromString } from 'uint8arrays'
import { definition } from "../../../src/__generated__/definition.js";
import { RuntimeCompositeDefinition } from "@composedb/types";
import { ComposeClient } from "@composedb/client";
import { NextApiRequest, NextApiResponse } from 'next'
import { Maybe, Mutation, Query, TopicEdge } from '../../../src/gql.js'

type Data = {
  topic: string;
}

async function getComposeClient() {
  // The key must be provided as an environment variable
  const pk = process.env.TOPICS_DID_KEY as string
  const key = fromString(pk, 'base16')
  // Create and authenticate the DID

  const keyDidResolver = KeyDIDResolver.getResolver()
  const didResolver = new Resolver(keyDidResolver)

  const did = new DID({
    provider: new Ed25519Provider(key),
    resolver: didResolver,
  })
  await did.authenticate()

  // Connect to the local Ceramic node
  const ceramic = new CeramicClient('http://localhost:7007')
  ceramic.did = did

  const composeClient = new ComposeClient({
    ceramic: "http://localhost:7007",
    // cast our definition as a RuntimeCompositeDefinition
    definition: definition as RuntimeCompositeDefinition,
  });

  composeClient.setDID(did)
  return {
    composeClient,
    did,
    ceramic,
  }
}

async function getTopics(data: Maybe<TopicEdge>[]  = [], offset = ''): Promise<Maybe<TopicEdge>[]> {
  const { composeClient, did } = await getComposeClient()
  
  const topicList = await composeClient.executeQuery<Query>(`
    query GetTopics($limit: Int=10, $offset: String="") {
      viewer {
        topicList(first: $limit, after: $offset) {
          edges {
            node {
              id
              name
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }  
    `, {
      limit: 100,
      offset,
    });

    const res = topicList.data?.viewer?.topicList;

    // console.log('topic list',res);
    if (res?.pageInfo.hasNextPage) {
      if (Array.isArray(res.edges)) {
        return getTopics([...data, ...res.edges], res.pageInfo.endCursor as string)
      }
    }
    if (res?.edges && Array.isArray(res?.edges)) {
      return [...data, ...res.edges]
    }
    return data;
}

async function ensureUniq(topicName: string) {
  try {
    const topicList = await getTopics()
  
    const topicNames = topicList.map(item => item?.node?.name);
  
    return topicNames.indexOf(topicName) === -1;
  } catch (error) {
    console.log('error', error)
  }
}

async function addTopic(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // get ComposeDB instance
  const { composeClient, did } = await getComposeClient()
  const topicName = req.body.topic

  // check for duplicates of topics
  const testUniq = await ensureUniq(topicName)
  if (!testUniq) {
    return res.status(409).end();
  }

  try {
    const testTopic = await composeClient.executeQuery<Mutation>(`
      mutation newTopic($input: CreateTopicInput!) {
        createTopic(input: $input) {
          document {
            id
          }
        }
      }        
    `, {
      input: {
        content: {
          name: topicName
        }
      }
    });
  
    return res.send({topicId: testTopic.data?.createTopic?.document.id});
  } catch (error) {
    console.log('compose error', error)
  }
}


async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    return addTopic(req, res)
  } else if (req.method === 'GET') {
    const topics = await getTopics();
    return res.send(topics)
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

export default handle;
