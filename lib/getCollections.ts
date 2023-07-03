import { composeClient } from "../context";
import type { CollectionConnection, Maybe } from "../src/gql";

type QueryCollection = {
  [x: string]: {
    collectionList: Maybe<CollectionConnection>
  };
}

const queryLight = `
  query GetCollection($did: ID!) {
    node(id: $did) {
      ... on CeramicAccount {
        collectionList(first: 200) {
          edges {
            node {
              id
              name
              deleted
            }
          }
        }
      }
    }
  }
`;

const queryFull = `
  query GetCollection($did: ID!) {
    node(id: $did) {
      ... on CeramicAccount {
        collectionList(first: 200) {
          edges {
            node {
              id
              name
              description
              deleted
              author {
                id
                pactProfile {
                  name
                }
              }
              media {
                item
                cid
                type
                cover
                altTag
              }
              collectionPactsCount
              collectionPacts(first: 200, account: $did) {
                edges {
                  node {
                    deleted
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type CollectionQueryArgs = {
  did: string;
  light?: boolean
}

export const getCollections = async (args: CollectionQueryArgs) => {
  if (!args.did) {
    throw new Error('no DID')
  }

  const { data, errors } = await composeClient.executeQuery<QueryCollection>(args.light ? queryLight : queryFull, args);

  if (errors || !data?.node) {
    throw new Error('an error occured')
  }
  const collections = data?.node?.collectionList?.edges?.filter(item => !item?.node?.deleted)

  if (collections) {
    for (const collection of collections) {
      if (collection?.node?.collectionPacts?.edges) {
        collection.node.collectionPacts.edges = collection?.node?.collectionPacts.edges?.filter(item => !item?.node?.deleted)
        collection.node.collectionPactsCount = collection.node.collectionPacts.edges.length
      }
    }
  }
  
  return collections;
}
