import { composeClient } from "../context";
import { Query, Pact } from "../src/gql";

const query = `
  query GetPact($streamID: ID!) {
    node(id: $streamID) {
      ... on Pact {
        __typename
        id
        version
        createdAt
        title
        description
        content
        type
        image
        media {
          item
          cid
          type
          cover
          altTag
        }
        author {
          id
          isViewer
          pactProfile {
            name
          }
        }
        topic {
          name
        }
        topicID
      }
    }
  }
`;

export type PactQueryArgs = {
  streamID: string;
}

export const getPact = async (args: PactQueryArgs) => {
  if (!args.streamID) {
    throw new Error('no streamID')
  }

  const { data, errors } = await composeClient.executeQuery<Query>(query, args);

  if (errors || !data) {
    console.log('getPact error', errors, data, args)
    throw new Error('an error occured')
  }
  
  return data.node as Pact;
}
