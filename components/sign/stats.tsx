import { useEffect, useState } from "react";
import { useCeramicContext } from "../../context";
import { usePactContext } from "../../context/pact";
import { useViewContext } from "../signBox";
import WalletSign from "./wallet";
import useStreamStats from "../../hooks/useStreamStats";
import ShareView from "./share";
import { useProfileContext } from "../../context/profile";
import { PactSignatureVisibilityType } from "../../src/gql";
import Sign from "./sign";

enum SignedType {
  none,
  anon,
  private,
  public
}



export default function SignStats({
  disabled = false
}: {
  disabled?: boolean;
}) {
  const { setView, previousView } = useViewContext();
  const { pact } = usePactContext();
  const { state: { isAuthenticated, did } } = useCeramicContext();
  const [ signedType, setSignedType ] = useState<PactSignatureVisibilityType>()
  const { data: stats, error } = useStreamStats(pact?.id);
  const { hasSigned, signatures, privateStore, isLoading } = useProfileContext()

  async function fetchSigningStatus () {
    if (!pact || !did || !hasSigned) {
      setSignedType(undefined)
      return;
    }
    // check PUBLIC and ANON

    const signedType = hasSigned(pact.id);
    setSignedType(signedType)
  }

  useEffect(() => {
    if (isAuthenticated && signatures && signatures.size > 0) {
      fetchSigningStatus()
    }
    // fetchStats()
  }, [isAuthenticated, pact?.id, signatures])

  return (
    <div className="stats stats-vertical relative w-full">
    {disabled && 
      <div className="absolute w-full h-full bg-slate-100 opacity-80 backdrop-blur-lg"></div>
    }
      <div className="stat">
        <div className="flex flex-row justify-between">
          <div>
            <div className="stat-title">Signatures</div>
            <div className="stat-value">{stats?.total || 0}</div>
            <div className="stat-desc">{stats?.verified || 0} Verified</div>
          </div>
          {!signedType &&
            <div>
              <progress className="progress progress-accent w-full" value={undefined} max="100"></progress>
              <p className=" text-lg font-semibold text-neutral-700">Sign Now</p>
            </div>
          }
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
            <div className="stat-title">Influencers</div>
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
