import useSWR from 'swr'
import type { Pact } from '../src/gql';



const fetcher = async (uri: string) => {
  if (uri?.indexOf('undefined') > -1) {
    throw new Error('no type')
  }
  const res = await fetch(uri);
  const body = await res.json();
  if (body.error) throw body.error
  
  return {
    count: body.count,
    data: body.data
  };
}
export default function usePactListTopic(type: string, topicID: string, page?: number) {
  const { data, error, isLoading, mutate } = useSWR<{count: number; data: Pact[]}>(`/api/topics/${type}/${topicID}?page=${page || 1}`,
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
