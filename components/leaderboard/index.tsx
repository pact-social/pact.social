import { useRouter } from "next/router"

const Row = ({manifest} : { manifest?: {title: string; rank: string; id?: string;} }) => {
  const { push } = useRouter()
  
  function openManifest() {
    push(`/m/${manifest?.id}`)
  }
  
  return (
    <tr className="hover" onClick={openManifest}>
      <th>
        <span className="text-2xl font-alt font-light">#{manifest?.rank}</span>
        {/* <span>
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
            </div>
          </div>
        </span> */}
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div>
            <div className="font-bold">{manifest?.title || 'title'}</div>
          </div>
        </div>
      </td>
      <td className="font-alt">102,303</td>
      <td className="font-alt">30,000</td>
      <td className="font-alt">
        4M
      </td>
      <td className="font-alt text-secondary">
        4M
      </td>
    </tr>
  )
}

export default function Leaderboard() {
  return (
    <div className="py-24">

      <div className="flex flex-cols font-alt md:ml-9">
        <div className="btn btn-ghost btn-sm btn-active">Top</div>
        <div className="divider divider-horizontal mx-2"></div>
        <div className="btn btn-ghost btn-sm">Trending</div>
      </div>

      <div className="pb-24 overflow-x-auto w-full">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>rank</th>
              <th>title</th>
              <th>total<br/> signatures</th>
              <th>verified<br/>signatures</th>
              <th>total<br/>views</th>
              <th className="text-secondary">$LOBBY<br/>volume</th>
            </tr>
          </thead>

          <tbody className="md:bg-gradient-to-b from-[#c1dfff]/[.3] to-[#ffac95]/[.2]">
            {/* row 1 */}
            <Row manifest={{title: 'my petition', rank: '1'}} />
            {/* row 2 */}
            <Row manifest={{title: 'my petition', rank: '2'}} />
            {/* row 3 */}
            <Row manifest={{title: 'my petition', rank: '3'}} />
            {/* row 4 */}
            <Row manifest={{title: 'my petition', rank: '4'}} />
            {/* row 5 */}
            <Row manifest={{title: 'my petition', rank: '5'}} />
            {/* row 6 */}
            <Row manifest={{title: 'my petition', rank: '6'}} />
            {/* row 7 */}
            <Row manifest={{title: 'my petition', rank: '7'}} />
            {/* row 8 */}
            <Row manifest={{title: 'my petition', rank: '8'}} />
            {/* row 9 */}
            <Row manifest={{title: 'my petition', rank: '9'}} />
            {/* row 10 */}
            <Row manifest={{title: 'my petition', rank: '10'}} />
            {/* row 11 */}
            <Row manifest={{title: 'my petition', rank: '11'}} />
            {/* row 12 */}
            <Row manifest={{title: 'my petition', rank: '12'}} />
            {/* row 13 */}
            <Row manifest={{title: 'my petition', rank: '13'}} />
            {/* row 14 */}
            <Row manifest={{title: 'my petition', rank: '14'}} />
            {/* row 15 */}
            <Row manifest={{title: 'my petition', rank: '15'}} />
          </tbody>
          {/* foot */}
          {/* <tfoot>
            <tr>
              <th>eee</th>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th>ww</th>
              <th>ee</th>
            </tr>
          </tfoot> */}
        </table>
      </div>
    </div>
  )
}
