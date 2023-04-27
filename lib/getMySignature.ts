import { composeClient } from "../context";
import { Query, PactSignatureEdge, Maybe } from "../src/gql";

const query = `
  query GetMySignatures($limit: Int=50, $after: String="") {
    viewer {
      pactSignatureList(first: $limit, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            pactID
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

  async function fetch(limit: number = 50, after: string = '', previous: Maybe<PactSignatureEdge>[] =[]): Promise<Maybe<PactSignatureEdge>[]> {
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

    if (data.viewer?.pactSignatureList?.pageInfo.hasNextPage && data.viewer?.pactSignatureList?.pageInfo.endCursor) {
      const docs = data.viewer?.pactSignatureList.edges || []
      return fetch(limit, data.viewer?.pactSignatureList?.pageInfo.endCursor, [...previous, ...docs])
    } else {
      const docs = data.viewer?.pactSignatureList?.edges || []
      return [...previous, ...docs];
    }
  }
  
  return await fetch();
}
