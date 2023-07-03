import useSWR from 'swr'
import { getPactCollection } from "../lib/getPactCollection";
import { useCeramicContext } from '../context';

export default function UseMyCollectionPact (pactID: string | undefined) {
  const { state: { did } } = useCeramicContext()
  const { data, error, isLoading, mutate } = useSWR({path: `/${pactID}/my-collections`, did: did?.parent, pactID},
    getPactCollection,
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
