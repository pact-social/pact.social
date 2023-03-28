import { ComposeClient } from '@composedb/client';
// import { graphql } from 'graphql';
import useSWR from 'swr'
import { useCeramicContext } from '../context';


const fetcher = async () => {

  const res = await fetch('/api/topics');
  console.log(res)
  // if (errors || !data) {
  //   console.error('composedb query error', query, errors);
  //   throw new Error('an error occured')
  // }
  
  // if (data.node && data.node?.__typename !== 'Manifest' && "title" in data?.node ) {
  //   throw new Error('Result is not a manifest.')
  // }
  
  // return data.node as Manifest;
  return res.json();
}

export default function useTopics() {
  const { composeClient } = useCeramicContext();

  const { data, error, isLoading, mutate } = useSWR({},
    fetcher,
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
