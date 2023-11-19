import { composeClient } from "../context";
import { Pact } from "../src/gql";

const query = `
  query GetPact($id: ID!) {
    node(id: $id) {
      ... on Post {
        id
        description
        content
        author {
          id
          pactProfile {
            name
          }
        }
        image
        imageMimeType
        media {
          altTag
          cid
          item
          type
        }
        pactID
        tags
        title
      }
    }
  }
`;

export type PostQueryArgs = {
  id: string;
}

export const getPost = async (args: PostQueryArgs) => {
  if (!args.id) {
    throw new Error('no streamID')
  }

  const { data, errors } = await composeClient.executeQuery<{ node: Pact }>(query, args);

  if (errors || !data) {
    console.log('getPact error', errors, data, args)
    throw new Error('an error occured')
  }
  
  return data.node;
}
