import { useRouter } from "next/router"
import useTopStats from "../../hooks/useTopStats";
import usePact from "../../hooks/usePact";

const Row = ({rank, streamID, stats} : { rank: number; streamID?: string; stats?: StatsProps }) => {
  const { push } = useRouter()
  const { data: pact } = usePact({stream: streamID});

  function openPact() {
    push(`/m/${pact?.id}`)
  }
  if (!pact) {
    return (
      <tr className="">
        <td colSpan={6} className=" text-left">
          loading
        </td>
      </tr>
    )
  }
  return (
    <tr className="hover" onClick={openPact}>
      <th className="md:w-44 md:pl-12 text-left">
        <span className="sm:text-2xl font-alt font-light">#{rank}</span>
      </th>
      <td className="md:min-w-[12rem] text-left">
        <div className="text-left text-xs sm:text-base space-x-3">
            <div className="font-bold">{pact?.title || 'title'}</div>
        </div>
      </td>
      <td className="font-alt">{stats?.total}</td>
      <td className="font-alt">{stats?.verified}</td>
      <td className="font-alt">
        {stats?.views}
      </td>
      <td className="font-alt text-secondary md:pr-12">
        4M
      </td>
    </tr>
  )
}

export default function Leaderboard() {

  const { data: stats } = useTopStats();

  return (
    <div className="py-24">

      <div className="flex flex-cols font-alt md:ml-9">
        <div className="btn btn-ghost btn-sm btn-active">Top</div>
        <div className="divider divider-horizontal mx-2"></div>
        <div className="btn btn-ghost btn-sm">Trending</div>
      </div>

      <div className="pb-24 overflow-x-auto w-full">
        <table className="table table-zebra w-full text-right">
          {/* head */}
          <thead>
            <tr>
              <th className="md:w-44 md:pl-12 text-left">rank</th>
              <th className="md:min-w-[12rem] text-left">title</th>
              <th>total<br/> signatures</th>
              <th>verified<br/>signatures</th>
              <th>total<br/>views</th>
              <th className="text-secondary md:pr-12">$LOBBY<br/>volume</th>
            </tr>
          </thead>

          <tbody className="md:bg-gradient-to-b from-[#c1dfff]/[.3] to-[#ffac95]/[.2]">
            {/* rows */}
            {stats && stats.map((row, index) => {
              return (
                <Row key={index} rank={index + 1} streamID={row.streamid} stats={row} />
              )
            }
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
