import useSWR from 'swr'
import type { Pact } from '../src/gql';

export type PactsPage = {
  data: Pact[];
  count: number;
}

const fetcher = async (uri: string): Promise<PactsPage> => {
  if (uri?.indexOf('undefined') > -1) {
    throw new Error('no type')
  }
  const res = await fetch(uri);
  const body = await res.json();

  if (body.data && body.data.length > 0) {
    return body;
  }
  throw new Error('no results')
}

export default function usePactListType(type: string, page: number = 1) {

  const { data, error, isLoading, mutate } = useSWR<PactsPage>(`/api/type/${type}?page=${page}`,
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
