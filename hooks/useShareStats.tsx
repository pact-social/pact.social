import useSWR from 'swr'

const fetcher = async (uri: string) => {
  const res = await fetch(uri);
  const body = await res.json();
  if (body.data && body.data.length > 0) {
    return body.data;
  }
}

export default function useShareStats(did?: string) {
  const { data, error, isLoading, mutate } = useSWR<StatsProps[]>(`/api/stats/referral/${did}`,
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
