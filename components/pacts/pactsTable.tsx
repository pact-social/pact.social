import { useRouter } from "next/router";
import useMyPacts from "../../hooks/useMyPacts";
import { Pact } from "../../src/gql";

const Row = ({pact} : { pact: Pact }) => {
  const { push } = useRouter()
  
  function openPact() {
    push(`/m/${pact.id}`)
  }
  
  return (
    <tr className="hover" onClick={openPact}>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{pact.title}</div>
          </div>
        </div>
      </td>
      <td>102,303</td>
      <td>30,000</td>
      <td>
        4M
      </td>
      <th>
        <button className="btn btn-ghost btn-xs">details</button>
      </th>
    </tr>
  )
}

export default function PactsTable() {
  const { data, error } = useMyPacts()

  return (
    <table className="table w-full">
      {/* head */}
      <thead>
        <tr>
          <th>Name</th>
          <th>Signatures</th>
          <th>Verified Signatures</th>
          <th>Views</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        <Row pact={{title: 'my petition'} as Pact} />
        {/* row 2 */}
        <Row pact={{title: 'my petition'} as Pact} />
        {/* row 3 */}
        <Row pact={{title: 'my petition'} as Pact} />
        {/* row 4 */}
        <Row pact={{title: 'my petition'} as Pact} />
      </tbody>
      {/* foot */}
      <tfoot>
        <tr>
          <th>Name</th>
          <th>Signatures</th>
          <th>Verified Signatures</th>
          <th>Views</th>
          <th></th>
        </tr>
      </tfoot>
      
    </table>
  );
}
