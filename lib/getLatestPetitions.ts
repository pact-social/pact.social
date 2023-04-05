import { composeClient } from '../context';
import { Query } from '../src/gql';

const query = `query GetLatestPetitions($limit: Int=10) {
  manifestIndex(last: $limit) {
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

export const getLatestPetitions = async ({ limit }: {limit: number}) => {

  const { data, errors } = await composeClient.executeQuery<Query>(query, {limit});
  if (!data?.manifestIndex?.edges) {
    return [];
  }
  // reverse results
  return data.manifestIndex.edges.reverse()
}
