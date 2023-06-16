import useSWR from 'swr'
import type { TopicEdge } from '../src/gql';


const fetcher = async (uri: string) => {

  const res = await fetch(uri);
  const topics = await res.json();
  return topics.map((topic: TopicEdge) => topic.node);
}

export default function useTopics() {
  const { data, error, isLoading, mutate } = useSWR('/api/topics',
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
