import { ComposeClient } from '@composedb/client';
import { DID } from 'dids';
import useSWR from 'swr'
import { useCeramicContext } from '../context';
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


const fetch = async ({ composeClient }: {composeClient: ComposeClient;}) => {
  const { data, errors } = await composeClient.executeQuery<Query>(query, {});
  if (errors || !data) {
    // console.error('composedb query error', query, errors);
    throw new Error('an error occured')
  }
  
  return data.viewer;
}

export default function useMyPacts() {
  const { composeClient, state: {isAuthenticated, did} } = useCeramicContext();
  console.log('get my pacts', did)
  
  // if (!isAuthenticated) throw new Error('not authenticated');

  const { data, error, isLoading, mutate } = useSWR({composeClient},
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
