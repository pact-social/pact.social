import { ChartBarIcon, RocketLaunchIcon, ShieldCheckIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Pact, PactSignatureVisibilityType } from "../../src/gql";
import { formatNumber } from "../../utils/stats";
import CollectionButton from "../collections/collectionButton";

export default function PactStats ({
  hasSigned,
  pact,
  stats,
}: {
  hasSigned?: PactSignatureVisibilityType;
  pact: Pact;
  stats?: StatsProps;
}) {
  return (
    <div className="grid grid-cols-5 justify-items-center items-center gap-x-3 gap-y-1 text-gray-500">
      {hasSigned ?
        <PencilIcon className="w-4 h-4 text-success" color={'rgb(22 163 74)'} height={20} />
        : <PencilIcon className="w-4 h-4" color={'rgb(107 114 128)'} height={20} />
      }
      <ShieldCheckIcon className="w-5 h-5" />
      <ChartBarIcon className="w-5 h-5" />
      <RocketLaunchIcon className="w-5 h-5" />
      <CollectionButton pactID={pact?.id} />
      <div className="text-xs">{formatNumber(stats?.total)}</div>
      <div className="text-xs">{formatNumber(stats?.verified)}</div>
      <div className="text-xs">{formatNumber(stats?.views)}</div>
      <div className="text-xs">{formatNumber(stats?.influencers)}</div>
      <div className="text-xs">add</div>
    </div>
  )
}
