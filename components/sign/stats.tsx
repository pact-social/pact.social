import { useEffect, useState } from "react";
import { useCeramicContext } from "../../context";
import { useManifestContext } from "../../context/manifest";
import { getManifestSignature } from "../../lib/getManifestSignature";
import { useViewContext } from "../signBox";
import WalletSign from "./wallet";

enum SignedType {
  NONE,
  ANON,
  PRIVATE,
  PUBLIC
}

export default function SignStats() {
  const { setView } = useViewContext();
  const { manifest } = useManifestContext();
  const { state: { isAuthenticated, did } } = useCeramicContext();
  const [ signedType, setSignedType ] = useState<SignedType>(SignedType.NONE)

  async function fetchSigningStatus () {
    if (!manifest || !did) return;
    // check PUBLIC
    const res = await getManifestSignature({ streamID: manifest?.id, accountID: did.parent || did.id });

    if (res.signatures.edges && res.signatures.edges.length > 0) {
      setSignedType(SignedType.PUBLIC)
    }

    // check Private => query server api
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchSigningStatus()
    }
  }, [isAuthenticated])

  return (
    <div className="stats shadow stats-vertical xl:w-64">

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <div className="stat-title">Verified Signatures</div>
        <div className="stat-value">31K</div>
        <div className="stat-desc">↗︎ 900 (22%)</div>
        <div className="stat-actions">
          {signedType === SignedType.NONE && 
            <button 
              className="btn btn-sm btn-success btn-block"
              onClick={() => {setView(<WalletSign />)}}
            >
              Sign Now
            </button>
          }
          
          {signedType !== SignedType.NONE && 
            <span className="text-xs">Thank you for your support!</span>
          }
        </div>
      </div>
      
      
      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
        </div>
        <div className="stat-title">Influencers</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
        <div className="stat-actions">
          <button className="btn btn-sm btn-secondary btn-block">Recommend</button>
        </div>
      </div>
      
      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
        </div>
        <div className="stat-title">Position</div>
        <div className="stat-value">37th</div>
        <div className="stat-desc">↗︎ 2 (22%)</div>
        <div className="stat-actions">
          <button className="btn btn-sm btn-outline btn-block">Chip In $</button>
        </div>
      </div>

    </div>
  )
}
