import { useEffect, useState } from "react";
import Image from 'next/image'
import { useAccount, useSignMessage } from "wagmi";
import type { ChallengeResponse, ScorerResponse } from "../../pages/api/credentials/challenge";
import { useViewContext } from "../signBox"
import ShareView from "./share";
import { useCeramicContext } from "../../context";
import OrbisCredentials from "../user/credentials";
import GitcoinPassport from "../verification/gitcoinPassport";
import OrbisScore from "../verification/orbisScore";
import RegenScore from "../verification/regenScore";

export default function VerifiedSign() {
  const [ challengeLoading, toggleChallengeLoading ] = useState<boolean>(false)
  const [ challenge, setChallenge ] = useState<ChallengeResponse>()
  const [ waitingSigning, toggleWaitingSigning ] = useState<boolean>(false);
  const [ signature, setSignature ] = useState<string>();
  const [ score, setScore ] = useState<ScorerResponse>();

  const { setView, previousView } = useViewContext()
  const { address } = useAccount();
  const { ceramic: {did}} = useCeramicContext()


  
  return (
    <div className="flex flex-col justify-around my-6 mx-4 gap-3">
      <p className=" text-lg font-semibold text-neutral-700">Add legitimacy to your voice!</p>
      <p className=" text-sm text-neutral-700">We reward unique humans, not bots.</p>
      
      <div className="flex flex-col mt-4 gap-4">
        <GitcoinPassport />
        <OrbisScore />
        <RegenScore />
      </div>

      {/* {did && <OrbisCredentials did={did.parent}/>} */}
      
      {/* <div className="divider"></div> */}
      <div className="flex justify-end">
        {/* <div
          className="btn"
          onClick={previousView}
        >
          Back
        </div> */}
        <div
          className="btn btn-ghost"
          onClick={() => setView(<ShareView/>)}
        >
          Next
        </div>
      </div>
    </div>
  )
}
