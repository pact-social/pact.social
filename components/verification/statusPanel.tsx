import { ChevronDownIcon, ShieldCheckIcon, ShieldExclamationIcon } from "@heroicons/react/24/outline";
import GitcoinPassport from "./gitcoinPassport";
import { useAccount } from "wagmi";
import { VerifiedResponse } from "../../pages/api/credentials/[address]/verified";
import { useCallback, useEffect, useState } from "react";

export default function VerificationStatusPanel() {
  const { address, connector } = useAccount()
  const [ verified, setVerified ] = useState<VerifiedResponse>()
  
  const getVerified = async () => {
    try {
      const res = await fetch(`/api/credentials/${address?.toLowerCase()}/verified`)
      const body = await res.json()
      setVerified(body)
    } catch (error) {
      
    }
  }

  // const loadVerificationStatus = useCallback(async () => {
  //   await getVerified()
  // }, [address])

  // loadVerificationStatus()

  useEffect(() => {
    getVerified()
  }, [])

  if (!connector || connector?.id === 'pkp') {
    return <></>
  }

  return (
    <div
      className="card card-compact m-0 p-0 mb-4"
    >
      <div className="card-body m-0 !p-0">
        <div className="collapse border-gray-200 border collapse-arrow">
          <input type="checkbox" /> 
          <div className="collapse-title text-lg font-medium">
            {(!verified || !verified.verified) &&
            <div className="flex items-start gap-2">
                <ShieldExclamationIcon className="w-7 h-7 text-primary" />
              <div>
                <span>Get verified</span>
                <p className=" text-xs text-neutral-500 break-words">We reward unique humans,<br/>not bots.</p>
              </div>
            </div>
            }
            {(verified && verified.verified) &&
            <div className="flex items-start gap-2">
              <ShieldCheckIcon className="w-7 h-7 text-openletter" />
              <div>
                  <span>You are verified!</span>
                  {/* <p className=" text-xs text-neutral-500 break-words">We reward unique humans,<br/>not bots.</p> */}
                </div>
            </div>
            }
          </div>
          <div className="collapse-content p-0 !pb-0">
            <GitcoinPassport />
          </div>
        </div>
      </div>
    </div>
  )
}
