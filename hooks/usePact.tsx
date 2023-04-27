import useSWR from 'swr'
import { getPact, PactQueryArgs } from '../lib/getPact';

interface useStreamProps {
  __typename?: string;
  stream?: string;
}

export default function usePact({stream}: useStreamProps) {
  const args: PactQueryArgs = { streamID: stream || '' };

  const { data, error, isLoading, mutate } = useSWR(args,
    getPact,
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
