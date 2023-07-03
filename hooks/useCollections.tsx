import useSWR from 'swr'
import { getCollections } from "../lib/getCollections";

export default function UseCollections (did?: string, light: boolean = false) {
  const { data, error, isLoading, mutate } = useSWR({path: '/collections', did, light},
    getCollections,
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
