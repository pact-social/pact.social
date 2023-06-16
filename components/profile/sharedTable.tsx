import { useRouter } from "next/router";
import useShareStats from "../../hooks/useShareStats";
import { useCeramicContext } from "../../context";
import usePact from "../../hooks/usePact";

const Row = ({view} : { view: any }) => {
  const { push } = useRouter()
  const { data: pact } = usePact({ stream: view.streamid })

  function openPact() {
    push(`/m/${view.streamid}`)
  }
  
  return (
    <tr className="hover" onClick={openPact}>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{pact?.title}</div>
          </div>
        </div>
      </td>
      <td>{view?.total || 0}</td>
      <td>{view?.verified || 0}</td>
      <td>
        {view?.views || 0}
      </td>
    </tr>
  )
}

export default function SharedTable() {
  const { state: { did }} = useCeramicContext()
  const { data, error } = useShareStats(did?.parent)

  return (
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
        {data && data.map((view, index) => {
          return (
            <Row key={`my-pact-${index}`} view={view} />
          )
        })}
      </tbody>
      
    </table>
  );
}
