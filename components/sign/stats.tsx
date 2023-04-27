import { useEffect, useState } from "react";
import { useCeramicContext } from "../../context";
import { usePactContext } from "../../context/pact";
import { getPactSignature } from "../../lib/getPactSignature";
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
  const { pact } = usePactContext();
  const { state: { isAuthenticated, did } } = useCeramicContext();
  const [ signedType, setSignedType ] = useState<SignedType>(SignedType.NONE)

  async function fetchSigningStatus () {
    if (!pact || !did) return;
    // check PUBLIC
    const res = await getPactSignature({ streamID: pact?.id, accountID: did.parent || did.id });

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
    <div className="stats stats-vertical">

      <div className="stat">
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
        <div className="stat-title">Influencers</div>
        <div className="stat-value">1,200</div>
        <div className="stat-desc">↘︎ 90 (14%)</div>
        <div className="stat-actions">
          <button className="btn btn-sm btn-secondary btn-block">Recommend</button>
        </div>
      </div>
      
      <div className="stat">
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
