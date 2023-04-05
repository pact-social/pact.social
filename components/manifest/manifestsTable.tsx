import { useRouter } from "next/router";
import useMyManifests from "../../hooks/useMyManifests";
import { Manifest } from "../../src/gql";

const Row = ({manifest} : { manifest: Manifest }) => {
  const { push } = useRouter()
  
  function openManifest() {
    push(`/m/${manifest.id}`)
  }
  
  return (
    <tr className="hover" onClick={openManifest}>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{manifest.title}</div>
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

export default function ManifestsTable() {
  const { data, error } = useMyManifests()

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
        <Row manifest={{title: 'my petition'} as Manifest} />
        {/* row 2 */}
        <Row manifest={{title: 'my petition'} as Manifest} />
        {/* row 3 */}
        <Row manifest={{title: 'my petition'} as Manifest} />
        {/* row 4 */}
        <Row manifest={{title: 'my petition'} as Manifest} />
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
