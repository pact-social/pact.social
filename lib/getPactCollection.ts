import { composeClient } from "../context";
import type { CollectionPactConnection, Maybe } from "../src/gql";

type QueryCollectionPact = {
  [x: string]: {
    collectionsPact: Maybe<CollectionPactConnection>
  };
}

const query = `
query getCollectionPactViewer($pactID: ID = "", $did: ID = "") {
  node(id: $pactID) {
    ... on Pact {
      name
      collectionsPact(account: $did, first: 100) {
        edges {
          node {
            id
            collectionID
            collection {
              name
            }
            pactID
            deleted
          }
        }
      }
    }
    id
  }
}
`;

export type CollectionPactQueryArgs = {
  did: string;
  pactID: string;
}

export const getPactCollection = async (args: CollectionPactQueryArgs) => {
  if (!args.did) {
    throw new Error('no DID')
  }
  if (!args.pactID) {
    throw new Error('no pact passed')
  }

  const { data, errors } = await composeClient.executeQuery<QueryCollectionPact>(query, args);

  if (errors || !data?.node) {
    throw new Error('an error occured')
  }
  const collections = data?.node?.collectionsPact
  
  return collections?.edges;
}
