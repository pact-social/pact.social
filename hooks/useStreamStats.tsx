import useSWR from 'swr'

const fetcher = async (uri: string) => {
  if (uri?.indexOf('undefined') > -1) {
    throw new Error('no stream')
  }
  const res = await fetch(uri);
  const body = await res.json();
  if (body.data && body.data.length > 0) {
    return body.data[0];
  }
}

export default function useStreamStats(streamID: string = 'undefined') {
  const { data, error, isLoading, mutate } = useSWR<StatsProps>(`/api/stats/pacts/${streamID}`,
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
