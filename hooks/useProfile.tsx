import useSWR from 'swr'
import getProfile from '../lib/getProfile';


export default function useProfile(did: string) {
  const { data, error, isLoading, mutate } = useSWR(did,
    getProfile,
    {
      dedupingInterval: 30000,
      focusThrottleInterval: 60000,
    }
  )

  return {
    isLoading,
    error,
    profile: data,
    mutate,
  };
}
