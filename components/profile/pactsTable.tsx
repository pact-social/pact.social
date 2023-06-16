import { useRouter } from "next/router";
import useMyPacts from "../../hooks/useMyPacts";
import { Pact } from "../../src/gql";
import useStreamStats from "../../hooks/useStreamStats";
import { useProfileContext } from "../../context/profile";

const Row = ({pact, isDraft} : { pact: Pact; isDraft?: boolean }) => {
  const { push } = useRouter()
  const { data } = useStreamStats(pact.id)
  const stats = data
  function openPact() {
    push(`/m/${pact.id}`)
  }

  function openDraft() {
    push({
      pathname: '/p/drafts/[pactID]',
      query: { pactID: pact.id },
    }
    )
  }
  
  return (
    <tr className="hover" onClick={isDraft ? openDraft : openPact}>
      <td>
        <div className="flex items-center space-x-3">
            {isDraft && 
              <div className=" badge badge-ghost">draft</div>
            }
          <div>
            <div className="font-bold">{pact.title}</div>
          </div>
        </div>
      </td>
      <td>{stats?.total || 0}</td>
      <td>{stats?.verified || 0}</td>
      <td>
        {stats?.views || 0}
      </td>
    </tr>
  )
}

export default function PactsTable() {
  const { data, error } = useMyPacts()
  const { drafts } = useProfileContext()

  return (
    <div className="pb-24 overflow-x-auto w-full">
      <table className="table table-zebra w-full">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>total<br/> signatures</th>
            <th>verified<br/>signatures</th>
            <th>total<br/>views</th>
          </tr>
        </thead>
        <tbody>
          {/* rows */}
          {drafts && drafts.map((pact, index) => {
            return (
              <Row key={`my-pact-draft-${index}`} pact={pact} isDraft />    
            )
          })}
          {data && data.map((pact, index) => {
            return (
              <Row key={`my-pact-${index}`} pact={pact?.node as Pact} />    
            )
          })}
        </tbody>
        
      </table>
    </div>
  );
}
