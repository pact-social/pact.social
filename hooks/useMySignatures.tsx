import useSWR from 'swr'
import { useCeramicContext } from "../context";
import { getMySignatures } from "../lib/getMySignature";

export default function useMySignatures () {
  const { composeClient } = useCeramicContext();

  const { data, error, isLoading, mutate } = useSWR({composeClient},
    getMySignatures,
    {
      dedupingInterval: 30000,
      focusThrottleInterval: 60000,
    }
  )

  return {
    isLoading,
    error,
    data,
    mutate,
  };
}
