import { useEffect, useState } from "react";
import Image from 'next/image'
import { useAccount, useSignMessage } from "wagmi";
import type { ChallengeResponse, ScorerResponse } from "../../pages/api/credentials/challenge";
import { useViewContext } from "../signBox"
import ShareView from "../sign/share";
import { useCeramicContext } from "../../context";
import OrbisCredentials from "../user/credentials";
import Link from "next/link";
import { ArrowPathIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export default function GitcoinPassport () {
  const [ challengeLoading, toggleChallengeLoading ] = useState<boolean>(false)
  const [ challenge, setChallenge ] = useState<ChallengeResponse>()
  const [ waitingSigning, toggleWaitingSigning ] = useState<boolean>(false);
  const [ signature, setSignature ] = useState<string>();
  const [ score, setScore ] = useState<ScorerResponse>();
  const [ scoreLoading, setScoreLoading] = useState<boolean>(false)

  const { setView, previousView } = useViewContext()
  const { address } = useAccount();
  const { ceramic: {did}} = useCeramicContext()

  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: challenge?.message,
    async onSuccess(data) {
      setSignature(data)
      await submitSignedChallenge(data);
      toggleWaitingSigning(false)
      setChallenge(undefined)
    }
  });

  async function getChallenge() {
    toggleChallengeLoading(true)
    const res = await fetch('/api/credentials/challenge');
    const data = await res.json();
    if (data) {
      setChallenge(data);
    }

    toggleChallengeLoading(false)
  }

  function signChallenge() {
    toggleWaitingSigning(true)
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
    if (res.status !== 200) return
    const data = await res.json();
    if (data) {
      setScore(data);
    }
  }


  async function getScore(refresh: boolean = false) {
    try {
      setScoreLoading(true)
      const res = await fetch(`/api/credentials/score/${address}${refresh ? '?refresh=true' : ''}`);

      if (res.status === 404 && address) {
        // setScore({
        //   address: address as string,
        //   score: 0,
        //   status: 'DONE',
        //   last_score_timestamp: null,
        //   evidence: null,
        //   error: null,
        // })
        setScoreLoading(false)
        return
      }
      const data = await res.json();
      if (data) {
        setScore(data);
      }
      setScoreLoading(false)
    } catch (error) {
      console.error(error)
      setScoreLoading(false)
    }
  }


  // useEffect(() => {
  //   if (score && score.score !== null && score.score >= 20) {

  //     setView(<ShareView/>)
  //   }
  // }, [score, setView])

  useEffect(() => {

    getScore()
    // getRegenScore()
  }, [])

  return (
    <>
    <div className="card card-compact border w-full !rounded-2xl bg-slate-50">
      <div className="card-body !gap-0">
        
        <h2 className="card-title text-md gap-4">
        <Image
          src={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/gitcoin_passport_logo.svg`}
          height={24}
          width={24}
          alt=""
          className=""
        ></Image>
        Gitcoin Passport
        <div className="tooltip" data-tip="hello">
          <InformationCircleIcon className="w-4 h-4" />
          {/* <button className="btn">Hover me</button> */}
        </div>
        </h2>
      </div>
      <div className="card-actions justify-between  px-4 py-2 bg-white !rounded-2xl">
        <div>
          <span>Score</span>
          <div className="flex font-alt text-2xl gap-2 items-baseline">
            <span>{score?.score || 0}</span>
            {(!score || (typeof score?.score === 'number' && score.score < 20)) &&
              <span className="text-xs text-red-500">{'< 20'} </span>
            }
            {(typeof score?.score === 'number' && score.score >= 20) && 
              <span className="text-xs text-green-500">{'> 20'} </span>
            }
          </div>
        </div>
        {(!challenge && !score) &&
          <>
            {challengeLoading && 
              <div 
                className="btn btn-primary loading"
              >
                Fetching challenge
              </div>
            }
            {(!challengeLoading) && 
            // <div className="grid gap-2">
              <div 
                className="btn btn-primary"
                onClick={getChallenge}
              >
                Get score
              </div>
            // {/* </div> */}
            }
          </>
        }

        {(challenge) &&
        <>
          {/* <div className=" w-72 break-words text-sm my-3">Nonce: {challenge.nonce}</div> */}
          {waitingSigning && 
            <div 
              className="btn btn-neutral loading"
            >
              Waiting wallet signature
            </div>
          }
          {!waitingSigning && 
            <div 
              className="btn btn-neutral"
              onClick={signChallenge}
            >
              Sign challenge
            </div>
          }
        </>
        }
        {(score && !challenge) &&
        <>
          {score.status === 'PROCESSING' &&
          <>
            <div>status: {score.status}</div>
            <div 
              className="btn"
              onClick={() => getScore()}
            >
              refresh
            </div>
          </>
          }
          {/* {score.status === 'DONE' &&
            <div 
              className="btn"
              onClick={getScore}
            >
              refresh
            </div>
          } */}
          {/* {score.status === 'DONE' &&
            <div>score: {parseInt(score.score?.toString() || '0')}</div>
          } */}
          {score.status === 'ERROR' &&
          <>
            <div>{score.error}</div>
          </>
          }
          {/* {!score && 
      <div className="alert gap-4">
        <Image
          src={'/gitcoin_passport_logo.svg'}
          height={24}
          width={24}
          alt=""
          className=""
        ></Image>
        <p className="text-sm font-bold">Get your signature verified.</p>
      </div>
      } */}
      {(score?.status === 'DONE' && score.score !== null && 20 > score?.score && score?.score >= 0) && 
      <div className="join">
        <Link 
          className="btn join-item"
          href="https://passport.gitcoin.co"
          target="_blank"
          
        >
          Add
        </Link>
        <div 
          className="btn join-item"
          onClick={() => getScore(true)}
        >
          {!scoreLoading && <ArrowPathIcon height={20} width={20} />}
          {scoreLoading && <span className="loading loading-spinner loading-sm"></span>}
        </div>
      </div>
      }
      {(score?.status === 'DONE' && score.score !== null && score.score >= 20) && 
        <div className="btn btn-success">Verified</div>
        // <div className="alert gap-2">
        //   <Image
        //     src={'/gitcoin_passport_logo.svg'}
        //     height={24}
        //     width={24}
        //     alt=""
        //     className=""
        //   ></Image>
        //   <div className="flex gap-2">
        //     <span className="text-sm font-bold">{score.score}</span>
        //     <span className="text-sm font-bold">You are eligible</span>
        //   </div>
        // </div>
      }
        </>
        }
      </div>
    </div>
    </>
  )
}
