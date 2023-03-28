import useSWR from 'swr'
import { useCeramicContext } from '../context'
import { ManifestIndex } from '../types'
import ManifestCard from './manifest/manifestCard'

export default function Highlights() {
  const { composeClient } = useCeramicContext()
  const { data, error } = useSWR(
    `query {
      manifestIndex(first: 10) {
        edges {
          node {
            id
            title
            content
            scope
            picture
            topic {
              name
            }
          }
        }
      }
    }`,
    async (query) => {
      const res = await composeClient.executeQuery<ManifestIndex>(query);
      console.log('latest manifests', res.data)
      return res.data?.manifestIndex;
    }
  )
  console.log('rendering highlights', data?.edges);
  return (
    <div className="mx-auto my-12">
      <h3 className="text-2xl">Latest</h3>
      <div className="divider"></div> 
      <div className="">
        {data?.edges?.map(doc => (
          <ManifestCard key={doc.node.id} manifest={doc.node} />
        ))}
      </div>
    </div>
  )
}
