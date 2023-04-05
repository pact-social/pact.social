import { composeClient } from "../context";
import { Query, ManifestSignatureEdge, Maybe } from "../src/gql";

const query = `
  query GetMySignatures($limit: Int=50, $after: String="") {
    viewer {
      manifestSignatureList(first: $limit, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            manifestID
            signedAt
            visibility
            metadata
            jwe
          }
        }
      }
    }
  }
`;

export const getMySignatures = async () => {

  async function fetch(limit: number = 50, after: string = '', previous: Maybe<ManifestSignatureEdge>[] =[]): Promise<Maybe<ManifestSignatureEdge>[]> {
    const { data, errors } = await composeClient.executeQuery<Query>(query, {
      limit,
      after,
    });

    if (errors || !data) {
      throw new Error('an error occured')
    }

    if (!data.viewer) {
      throw new Error('No Results.')
    }

    if (data.viewer?.manifestSignatureList?.pageInfo.hasNextPage && data.viewer?.manifestSignatureList?.pageInfo.endCursor) {
      const docs = data.viewer?.manifestSignatureList.edges || []
      return fetch(limit, data.viewer?.manifestSignatureList?.pageInfo.endCursor, [...previous, ...docs])
    } else {
      const docs = data.viewer?.manifestSignatureList?.edges || []
      return [...previous, ...docs];
    }
  }
  
  return await fetch();
}
