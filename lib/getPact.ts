import { composeClient } from "../context";
import { Query, Pact } from "../src/gql";

const query = `
  query GetPact($streamID: ID!) {
    node(id: $streamID) {
      ... on Pact {
        __typename
        id
        version
        title
        content
        type
        picture
        author {
          id
          pactProfile {
            name
          }
        }
        topic {
          name
        }
      }
    }
  }
`;

export type PactQueryArgs = {
  streamID: string;
}

export const getPact = async (args: PactQueryArgs) => {
  
  const { data, errors } = await composeClient.executeQuery<Query>(query, args);

  if (errors || !data) {
    console.log('error', errors, data, args)
    throw new Error('an error occured')
  }
  
  // if (data.node && data.node?.__typename !== 'Pact' && "title" in data?.node ) {
  //   throw new Error('Result is not a pact.')
  // }
  
  return data.node as Pact;
}
