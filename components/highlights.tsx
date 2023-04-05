import useSWR from 'swr'
import { getLatestPetitions } from '../lib/getLatestPetitions'
import ManifestCard from './manifest/manifestCard'

export default function Highlights() {
  const { data, error } = useSWR(
    {
      key: 'getLatestPetitions',
      limit: 10,
    },
    getLatestPetitions, 
    {
      dedupingInterval: 30000,
      focusThrottleInterval: 60000,
    }
  );

  return (
    <div className="mx-auto my-12">
      <h3 className="text-2xl">Latest</h3>
      <div className="divider"></div> 
      <div className="flex flex-wrap gap-8 justify-center">
        {data?.map(doc => (
          <ManifestCard key={doc?.node?.id} manifest={doc?.node} />
        ))}
      </div>
    </div>
  )
}
