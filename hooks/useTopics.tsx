import useSWR from 'swr'


const fetcher = async () => {

  const res = await fetch('/api/topics');
  const topics = await res.json();
  return topics.map(topic => topic.node);
}

export default function useTopics() {
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
