import { composeClient } from "../context";
import { Query, Pact } from "../src/gql";

const query = `
  query GetPact($streamID: ID!, $accountID: ID!) {
    node(id: $streamID) {
      ... on Pact {
        id
        signatures(first: 1, account: $accountID) {
          edges {
            node {
              id
              signedAt
            }
          }
        }
      }
    }
  }
`;

export type PactQueryArgs = {
  streamID: string;
  accountID: string;
}

export const getPactSignature = async (args: PactQueryArgs): Promise<Pact> => {  
  const { data, errors } = await composeClient.executeQuery<Query>(query, args);

  if (errors || !data) {
    throw new Error('an error occured')
  }
  
  return data.node as Pact;
}
