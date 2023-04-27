import { composeClient } from '../context';
import { Query } from '../src/gql';

const query = `query GetLatestPacts($limit: Int=10) {
  pactIndex(last: $limit) {
    edges {
      node {
        id
        title
        content
        type
        picture
        topic {
          name
        }
      }
    }
  }
}`;

export const getLatestPacts = async ({ limit }: {limit: number}) => {

  const { data, errors } = await composeClient.executeQuery<Query>(query, {limit});
  if (!data?.pactIndex?.edges) {
    return [];
  }
  // reverse results
  return data.pactIndex.edges.reverse()
}
