import useSWR from 'swr'
import { getManifest, ManifestQueryArgs } from '../lib/getManifest';

interface useStreamProps {
  __typename?: string;
  stream?: string;
}

export default function useManifest({stream}: useStreamProps) {
  const args: ManifestQueryArgs = { streamID: stream || '' };

  const { data, error, isLoading, mutate } = useSWR(args,
    getManifest,
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
