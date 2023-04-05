import { composeClient } from "../context";
import { GetManifestQuery, Manifest } from "../src/gql";

const query = `
  query GetManifest($streamID: ID!, $accountID: ID!) {
    node(id: $streamID) {
      ... on Manifest {
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

export type ManifestQueryArgs = {
  streamID: string;
  accountID: string;
}

export const getManifestSignature = async (args: ManifestQueryArgs): Promise<Manifest> => {  
  const { data, errors } = await composeClient.executeQuery<GetManifestQuery>(query, args);

  if (errors || !data) {
    throw new Error('an error occured')
  }
  
  return data.node as Manifest;
}
