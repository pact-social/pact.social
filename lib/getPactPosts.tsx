import { composeClient } from "../context";
import { Pact } from "../src/gql";

const query = `
  query GetPact($id: ID!, $last: Int, $before: String="") {
    node(id: $id) {
      ... on Pact {
        posts(last: $last, before: $before) {
          pageInfo {
            hasPreviousPage
            startCursor
          }
          edges {
            node {
              id
              description
              content
              author {
                id
                pactProfile {
                  name
                  username
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
              name
              pactID
              tags
              title
            }
          }
        }
      }
    }
  }
`;

export type PostQueryArgs = {
  id: string;
  last: number;
  before: string;
}

// @TODO: must only return posts from pact author
export const getPactPosts = async (args: PostQueryArgs) => {
  if (!args.id) {
    throw new Error('no streamID')
  }

  const { data, errors } = await composeClient.executeQuery<{ node: Pact }>(query, args);

  if (errors || !data) {
    console.log('getPact error', errors, data, args)
    throw new Error('an error occured')
  }
  
  return data.node.posts;
}
