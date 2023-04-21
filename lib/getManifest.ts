import { composeClient } from "../context";
import { Query, Manifest } from "../src/gql";

const query = `
  query GetManifest($streamID: ID!) {
    node(id: $streamID) {
      ... on Manifest {
        __typename
        id
        version
        title
        content
        type
        picture
        author {
          id
          basicProfile {
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

export type ManifestQueryArgs = {
  streamID: string;
}

export const getManifest = async (args: ManifestQueryArgs) => {
  
  const { data, errors } = await composeClient.executeQuery<Query>(query, args);

  if (errors || !data) {
    console.log('error', errors, data, args)
    throw new Error('an error occured')
  }
  
  // if (data.node && data.node?.__typename !== 'Manifest' && "title" in data?.node ) {
  //   throw new Error('Result is not a manifest.')
  // }
  
  return data.node as Manifest;
}
