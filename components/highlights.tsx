import useSWR from 'swr'
import { getLatestPetitions } from '../lib/getLatestPetitions'
import ManifestCard from './manifest/manifestCard'
import Divider from './svg/divider';

export default function Highlights() {
  const { data, error } = useSWR(
    {
      key: 'getLatestPetitions',
      limit: 3,
    },
    getLatestPetitions, 
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
      <div className="grid lg:grid-cols-3 gap-8 mx-8 lg:mx-16 xl:mx-24 justify-center">
        {data?.map(doc => (
          <ManifestCard key={doc?.node?.id} manifest={doc?.node} />
        ))}
      </div>
    </div>
  )
}
