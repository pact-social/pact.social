import { composeClient } from "../context";
import type { Collection } from "../src/gql";

type QueryCollection = {
  node: Collection
}

const query = `
  query GetCollectionPacts($collectionID: ID!) {
    node(id: $collectionID) {
      ... on Collection {
        id
        name
        description
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

        collectionPacts(first: 200) {
          edges {
            node {
              id
              deleted
              author {
                id
              }
              pact {
                id
                createdAt
                title
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
                topic {
                  name
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

export const getCollectionPacts = async ({ collectionID }: { collectionID: string }) => {
  if (!collectionID) {
    throw new Error('collectionID not provided')
  }

  const { data, errors } = await composeClient.executeQuery<QueryCollection>(query, { collectionID });

  if (errors || !data) {

    throw new Error('an error occured')
  }

  if (data.node.collectionPacts.edges) {
    data.node.collectionPacts.edges = data?.node.collectionPacts.edges?.filter(item => !item?.node?.deleted)
    data.node.collectionPactsCount = data.node.collectionPacts.edges.length
  }
  
  return data?.node;
}
