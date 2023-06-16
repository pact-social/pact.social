import useSWR from 'swr'
import { composeClient } from '../context';
import {  Query } from '../src/gql';

const query = `
query GetMyPacts($limit: Int=10, $offset: String="") {
  viewer {
    id
    pactList(first: $limit, after: $offset) {
      edges {
        node {
          id
          title
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;


const fetch = async () => {
  const { data, errors } = await composeClient.executeQuery<Query>(query, {});
  if (errors || !data) {
    throw new Error('an error occured')
  }
  
  return data.viewer?.pactList?.edges;
}

export default function useMyPacts() {

  const { data, error, isLoading, mutate } = useSWR('/profile/pacts',
    fetch,
    // {
    //   dedupingInterval: 30000,
    //   focusThrottleInterval: 60000,
    // }
  )

  return {
    isLoading,
    error,
    data,
    mutate,
  };
}
