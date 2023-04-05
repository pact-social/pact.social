import { useState } from "react";
import Image from 'next/image'
import { useAccount, useSignMessage } from "wagmi";
import type { ChallengeResponse, ScorerResponse } from "../../pages/api/credentials/challenge";
import { useViewContext } from "../signBox"

export default function VerifiedSign() {
  const [ challengeLoading, toggleChallengeLoading ] = useState<boolean>(false)
  const [ challenge, setChallenge ] = useState<ChallengeResponse>()
  const [ waitingSigning, toggleWaitingSigning ] = useState<boolean>(false);
  const [ signature, setSignature ] = useState<string>();
  const [ score, setScore ] = useState<ScorerResponse>();

  const { setView, previousView } = useViewContext()
  const { address } = useAccount();

  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: challenge?.message,
    onSuccess(data) {
      setSignature(data)
      toggleWaitingSigning(!waitingSigning)
      submitSignedChallenge(data);
    }
  });

  async function getChallenge() {
    toggleChallengeLoading(!challengeLoading)
    const res = await fetch('/api/credentials/challenge');
    const data = await res.json();
    if (data) {
      setChallenge(data);
    }
    toggleChallengeLoading(!challengeLoading)
  }

  function signChallenge() {
    toggleWaitingSigning(!waitingSigning)
    signMessage()
  }

  async function submitSignedChallenge(signature: string) {
    const params = {
      address,
      signature,
      nonce: challenge?.nonce,
    }
    const res = await fetch('/api/credentials/challenge', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const data = await res.json();
    if (data) {
      setScore(data);
    }
    // toggleChallengeLoading(!challengeLoading)
  }


  async function refreshScore() {
    const res = await fetch(`/api/credentials/score/${address}`);
    const data = await res.json();
    if (data) {
      setScore(data);
    }
    // toggleChallengeLoading(!challengeLoading)
  }

  return (
    <div className="flex flex-col justify-around my-6 mx-4">
      <p className=" text-lg font-semibold text-neutral-700">Add legitimacy to your voice!</p>
      <p className="text-sm">Get your signature verified.</p>
      <div className="divider"></div>
      {!challenge &&
        <>
          {challengeLoading && 
            <div 
              className="btn btn-primary loading"
            >
              Fetching challenge
            </div>
          }
          {!challengeLoading && 
          <>
            <div 
              className="btn btn-primary"
              onClick={getChallenge}
            >
              score your GitcoinPassport
            </div>

            <div 
            className="btn btn-primary"
            onClick={getChallenge}
            >
              <Image
                src={'/gitcoin_passport_logo.svg'}
                height={32}
                width={32}
                alt=""
              ></Image>
            Add Credentials to your wallet
            </div>
          </>
          }
        </>
      }

      {(challenge && !score) &&
      <div>
        <div>Nonce: {challenge.nonce}</div>
        {waitingSigning && 
          <div 
            className="btn btn-primary loading"
          >
            Waiting wallet signature
          </div>
        }
        {!waitingSigning && 
          <div 
            className="btn btn-primary"
            onClick={signChallenge}
          >
            Sign the challenge
          </div>
        }
      </div>
      }
      {score &&
      <div>
        {score.status === 'PROCESSING' &&
        <>
          <div>status: {score.status}</div>
          <div 
            className="btn"
            onClick={refreshScore}
          >
            refresh
          </div>
        </>
        }
        {score.status === 'DONE' &&
          <div>score: {parseInt(score.score?.toString() || '0')}</div>
        }
        {score.status === 'ERROR' &&
        <>
          <div>{score.error}</div>
        </>
        }
      </div>
      }
      <div className="divider"></div>
      <div className=" self-start">
        <div
          className="btn"
          onClick={previousView}
        >
          Back
        </div>
      </div>
    </div>
  )
}
