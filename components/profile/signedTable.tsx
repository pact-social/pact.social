import { useRouter } from "next/router";
import { PactSignature } from "../../src/gql";
import useStreamStats from "../../hooks/useStreamStats";
import { useProfileContext } from "../../context/profile";
import usePact from "../../hooks/usePact";

const Row = ({signature} : { signature: PactSignature }) => {
  const { push } = useRouter()
  const { data } = useStreamStats(signature.pactID)
  const { data: pact} = usePact({stream: signature?.pactID})
  const stats = data

  function openPact() {
    push(`/m/${signature.pactID}`)
  }
  
  return (
    <tr className="hover" onClick={openPact}>
      <td>
        <div className="flex items-center space-x-3">
          <div className="text-left">
            <div className="font-bold">{signature?.pact?.title || pact?.title}</div>
          </div>
        </div>
      </td>
      <td>{stats?.total || 0}</td>
      <td>{stats?.verified || 0}</td>
      <td>
        {stats?.views || 0}
      </td>
      <td>
        <div className={`badge ${ signature?.visibility === 'anon' 
          ? 'badge-ghost'
          : (signature?.visibility === 'private' ? 'badge-primary' : 'badge-secondary')
        }`}>{signature?.visibility}</div>
      </td>
    </tr>
  )
}

export default function SignedTable() {
  const { privateStore, signatures } = useProfileContext()

  return (
    <table className="table table-zebra w-full">
      {/* head */}
      <thead>
        <tr>
          <th>Name</th>
          <th>total<br/> signatures</th>
          <th>verified<br/>signatures</th>
          <th>total<br/>views</th>
          <th>Visibility</th>
        </tr>
      </thead>
      <tbody>
        {/* rows */}
        {signatures && Array.from(signatures.values()).map((sig, index) => {
          return (
            <Row key={`my-pact-${index}`} signature={sig as PactSignature} />    
          )
        })}
      </tbody>
      
    </table>
  );
}
