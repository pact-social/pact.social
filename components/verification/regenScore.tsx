import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useAccount } from "wagmi";
import { ScorerResponse } from '../../pages/api/credentials/challenge';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function RegenScore() {
  const { address } = useAccount();
  // const address = '0x839395e20bbB182fa440d08F850E6c7A8f6F0780'
  const [score, setScore] = useState<ScorerResponse>()
  const [isLoading, setLoading] = useState<boolean>()
  
  async function getRegenScore(refresh: boolean = false) {
    try {
      setLoading(true)
      const res = await fetch(
        `/api/credentials/${address}/regen${refresh ? '?refresh=true' : ''}`,
        {
          method: 'POST',
          headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({address})
        }
      )
      if (res.status !== 200) {
        setLoading(false)
        return
      }
      const body = await res.json()

      if (body) {
        setScore(body)
      }
      setLoading(false)
      return body
    } catch (error) {
      setLoading(false)
      console.log('error', error)
    }
  }

  useEffect(() => {
    getRegenScore()
  }, [])
  return (
      <div className="card card-compact border w-full !rounded-2xl bg-slate-50">
        <div className="card-body !gap-0">
          
          <h2 className="card-title text-sm gap-4">
          <Image
              src={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/regenscore-leaf.svg`}
              height={32}
              width={24}
              alt=""
              className=""
          />
          <Image
              src={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/regenscore-logo-header.svg`}
              height={30}
              width={120}
              alt=""
              className=""
          />
            
          </h2>
        </div>
        <div className="card-actions justify-between  px-4 py-2 bg-white !rounded-2xl">
          <div>
            <span>Score</span>
            <div className="flex font-alt text-2xl gap-2 items-baseline">
              <span>{score?.score || 0}</span>
              {(!score || typeof score?.score === 'number' && score.score < 1000) &&
                <span className="text-xs text-red-500">{'< 1000'} </span>
              }
              {typeof score?.score === 'number' && score.score >= 1000 && 
                <span className="text-xs text-green-500">{'> 1000'} </span>
              }
            </div>
          </div>
          {(!score || typeof score?.score === 'number' && score.score < 1000) &&
          <div className="join">
            <Link 
              className="btn join-item"
              href="https://regenscore.io/profile"
              target="_blank"
              
            >
              Add
            </Link>
            <div 
              className="btn join-item"
              onClick={() => getRegenScore()}
            >
              {!isLoading && <ArrowPathIcon height={20} width={20} />}
              {isLoading && <span className="loading loading-spinner loading-sm"></span>}
            </div>
          </div>
            // <button
            //   className="btn gap-1"
            //   onClick={() => getRegenScore()}
            // >
            //   {isLoading && <span className="loading loading-spinner loading-sm"></span>}
            //   Refresh
            // </button>
          }
          {typeof score?.score === 'number' && score.score >= 1000 &&
            <div className="btn btn-success">
              Verified
            </div>
          }
        </div>
      </div>

  )
}
