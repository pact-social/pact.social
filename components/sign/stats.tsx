import { useEffect, useState } from "react";
import { useCeramicContext } from "../../context";
import { usePactContext } from "../../context/pact";
import { useViewContext } from "../signBox";
import useStreamStats from "../../hooks/useStreamStats";
import ShareView from "./share";
import { useProfileContext } from "../../context/profile";
import { PactSignatureVisibilityType } from "../../src/gql";
import Sign from "./sign";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { formatNumber, numberWithCommas } from "../../utils/stats";

enum SignedType {
  none,
  anon,
  private,
  public
}

const ranges = [
  {
    min: 0,
    max: 49,
    level: 1,
    description: ''
  },
  {
    min: 50,
    max: 99,
    level: 2,
    description: ''
  },
  {
    min: 100,
    max: 499,
    level: 3,
    description: ''
  },
  {
    min: 500,
    max: 999,
    level: 4,
    description: ''
  },
  {
    min: 1000,
    max: 4999,
    level: 5,
    description: ''
  },
  {
    min: 5000,
    max: 9999,
    level: 6,
    description: ''
  },
  {
    min: 10000,
    max: 49999,
    level: 7,
    description: ''
  },
  {
    min: 50000,
    max: 99999,
    level: 8,
    description: ''
  },
  {
    min: 100000,
    max: 499999,
    level: 9,
    description: ''
  },
  {
    min: 500000,
    max: 999999,
    level: 10,
    description: ''
  },
  {
    min: 1000000,
    max: 4999999,
    level: 11,
    description: ''
  },
  {
    min: 5000000,
    max: 9999999,
    level: 12,
    description: ''
  },
]

export default function SignStats({
  disabled = false
}: {
  disabled?: boolean;
}) {
  const { setView, previousView } = useViewContext();
  const { pact } = usePactContext();
  const { state: { isAuthenticated, did } } = useCeramicContext();
  const { data: stats, error } = useStreamStats(pact?.id);
  const { hasSigned, signatures, privateStore, isLoading } = useProfileContext()
  
  const [ signedType, setSignedType ] = useState<PactSignatureVisibilityType>()
  const [ displayRange, setRange ] = useState<typeof ranges[0]>(ranges[0])

  async function fetchSigningStatus () {
    if (!pact || !did || !hasSigned) {
      setSignedType(undefined)
      return;
    }

    const signedType = hasSigned(pact.id);
    setSignedType(signedType)
  }

  useEffect(() => {
    if (isAuthenticated && signatures && signatures.size > 0) {
      fetchSigningStatus()
    }
  }, [isAuthenticated, pact?.id, signatures])

  useEffect(() => {
    if (stats) {
      const [ supportRange ] = ranges.filter(range => {
        return range.min <= stats.total && range.max >= stats.total
      })
      setRange(supportRange)
    }
  }, [stats])

  return (
    <div className="stats stats-vertical relative w-full">
    {disabled && 
      <div className="absolute w-full h-full bg-slate-100 opacity-80 backdrop-blur-lg"></div>
    }
      <div className="stat">
        <div className="flex flex-row justify-between">
          <div className="flex flex-col w-full">
            {!signedType &&
            <p className=" text-lg font-semibold text-neutral-700 inline-flex gap-2 items-center my-4">
              Sign Now
            <Link
              href="https://pact-social.gitbook.io/pact.social/faq/how-to-sign"
              target="_blank"
            >
              <span>
                <InformationCircleIcon height={24} width={24} />
              </span>
            </Link>
            </p>
            }
            <progress className="progress progress-gradient w-full" value={stats?.total && ((stats?.total * 100 / displayRange.max)).toFixed(1) || undefined} max={100}></progress>
            {displayRange &&
            <div className="flex flex-row justify-between text-xs my-2">
              <div>
                <div className="stat-title">Signatures</div>
                <div className="stat-value text-3xl">{numberWithCommas(stats?.total || 0)}</div>
                <div className="stat-desc">{numberWithCommas(stats?.verified || 0)} Verified</div>
              </div>
              <div>
                <div className="stat-title text-right">Next Goal !</div>
                <div className="stat-value text-3xl text-right">{formatNumber(displayRange.max + 1)}</div>
              </div>
            </div>
            }
          </div>
        </div>
        <div className="stat-actions">
          {!signedType && 
            // <button 
            //   className={`btn btn-sm btn-success btn-block ${isLoading && 'btn-disbled'}`}
            //   onClick={() => {setView(<Sign />)}}
            // >
            //   {isLoading &&
            //     <span className="loading loading-spinner"></span>
            //   }
            //   Sign Now
            // </button>
            <>
              <Sign />
            </>
          }
          
          {signedType && 
            <span 
              className="text-xs btn btn-outline btn-info"
            >Thank you for your support! ({signedType})</span>
          }
        </div>
      </div>
      
      
      <div className="stat">
        <div className="flex flex-row justify-between">
          <div>
            <div className="stat-title">Supporters</div>
            <div className="stat-value">{stats?.influencers || 0}</div>
            {/* <div className="stat-desc">↘︎ 90 (14%)</div> */}
          </div>
        {signedType &&
            <div>
              <progress className="progress progress-accent w-full" value={undefined} max="100"></progress>
              <p className=" text-lg font-semibold text-neutral-700">Advocate Now</p>
            </div>
          }
        </div>
        <div className="stat-actions">
          
          <button 
            className="btn btn-sm btn-success btn-block"
            onClick={() => {setView(<ShareView />)}}
          >
            Share
          </button>
        </div>
      </div>
      
      {/* <div className="stat">
        <div className="stat-title">Position</div>
        <div className="stat-value">37th</div>
        <div className="stat-desc">↗︎ 2 (22%)</div>
        <div className="stat-actions">
          <button className="btn btn-sm btn-outline btn-block">Chip In $</button>
        </div>
      </div> */}

    </div>
  )
}
