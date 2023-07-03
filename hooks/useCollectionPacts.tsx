import useSWR from 'swr'
import { getCollectionPacts } from "../lib/getCollectionPacts";

export default function UseCollectionPacts (collectionID: string) {
  const { data, error, isLoading, mutate } = useSWR({path: '/collections', collectionID},
  getCollectionPacts,
    // {
    //   dedupingInterval: 30000,
    //   focusThrottleInterval: 60000,
    // }
  )

  return {
    isLoading,
    error,
    data: data,
    mutate,
  };
}
