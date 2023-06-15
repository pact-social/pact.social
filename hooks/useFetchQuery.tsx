import useSWR from 'swr'

const fetcher = async (uri: string) => {
  if (uri?.indexOf('undefined') > -1) {
    throw new Error('invalid uri')
  }
  const res = await fetch(uri);
  const body = await res.json();
  
  if (body.error) {
    console.log('fetch query error', body.error)
    throw body.error;
  }
  
  if (body.data && body.data.length > 0) {
    return body.data;
  }
}

export default function useFetchQuery<T>(uri: string) {
  const { data, error, isLoading, mutate } = useSWR<T>(uri,
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
