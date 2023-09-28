import { useEffect, useState } from "react";
import { useCeramicContext } from "../../context";
import { usePactContext } from "../../context/pact";
import { useViewContext } from "../signBox";
import WalletSign from "./wallet";
import useStreamStats from "../../hooks/useStreamStats";
import ShareView from "./share";
import { useProfileContext } from "../../context/profile";
import { PactSignatureVisibilityType } from "../../src/gql";

enum SignedType {
  none,
  anon,
  private,
  public
}



export default function SignStats() {
  const { setView } = useViewContext();
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
    <div className="stats stats-vertical">

      <div className="stat">
        <div className="stat-title">Verified/Total Signatures</div>
        <div className="stat-value">{stats?.verified || 0}/{stats?.total || 0}</div>
        <div className="stat-desc">↗︎ 900 (22%)</div>
        <div className="stat-actions">
          {!signedType && 
            <button 
              className={`btn btn-sm btn-success btn-block ${isLoading && 'btn-disbled'}`}
              onClick={() => {setView(<WalletSign />)}}
            >
              {isLoading &&
                <span className="loading loading-spinner"></span>
              }
              Sign Now
            </button>
          }
          
          {signedType && 
            <span 
              className="text-xs btn btn-outline btn-info"
            >Thank you for your support! ({signedType})</span>
          }
        </div>
      </div>
      
      
      <div className="stat">
        <div className="stat-title">Influencers</div>
        <div className="stat-value">{stats?.influencers || 0}</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
        <div className="stat-actions">
          
          <button 
            className="btn btn-sm btn-secondary btn-block"
            onClick={() => {setView(<ShareView />)}}
          >Recommend</button>
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
