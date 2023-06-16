import useSWR from 'swr'
import { getLatestPacts } from '../lib/getLatestPacts'
import PactCard from './pacts/pactCard'
import Divider from './svg/divider';
import { Pact } from '../src/gql';

export default function Highlights() {
  const { data, error } = useSWR(
    {
      key: 'getLatestPacts',
      limit: 3,
    },
    getLatestPacts, 
    {
      dedupingInterval: 30000,
      focusThrottleInterval: 60000,
    }
  );

  return (
    <div className="relative mx-auto mb-24">
      <Divider width={58} className="absolute -mt-40"></Divider>
      <div className="my-14 mx-16 xl:mx-24 mt-24">
        <h3 className="text-5xl font-bold font-title">Top Pacts</h3>
        <p className="mt-4 text-lg font-light max-w-xs">
          Pacts that are most promoted by its signers and champions
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mx-8 lg:mx-16 xl:mx-24 justify-center ">
        {data?.map(doc => (
          <PactCard key={doc?.node?.id} pact={doc?.node as Pact} />
        ))}
      </div>
    </div>
  )
}
