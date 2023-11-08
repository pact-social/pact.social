import Image from 'next/image'
import { useEffect, useState } from 'react';
import { useCeramicContext } from '../../context';
import { ScorerResponse } from '../../pages/api/credentials/challenge';
import Link from 'next/link';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function OrbisScore () {
  const [score, setScore] = useState<ScorerResponse>()
  const [isLoading, setLoading] = useState<boolean>()
  const { state: { did } } = useCeramicContext()
  // const did = { parent: 'did:pkh:eip155:1:0xbc4eeebcb3806991319b7756a79bdcf088f5e78c' }
  
  async function fetchScore(refresh: boolean = false) {
    setLoading(true)
    const res = await fetch(`/api/credentials/${did?.parent}/orbis${refresh ? '?refresh=true' : ''}`);

    if (res.status === 404 && did) {
      
      setLoading(false)
      return
    }
    const data = await res.json();

    if (data) {
      setScore(data);
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchScore()
  }, [])

  return (
    <div className="card card-compact border w-full !rounded-2xl bg-slate-50">
      <div className="card-body !gap-0">
        
        <h2 className="card-title text-md gap-4">
        <Image
            src={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/orbis-logo.png`}
            height={60}
            width={60}
            alt=""
            className=" invert grayscale"
        />
        on-chain activity
        </h2>
      </div>
      <div className="card-actions justify-between  px-4 py-2 bg-white !rounded-2xl">
        <div>
          <span>Score</span>
          <div className="flex font-alt text-2xl gap-2 items-baseline">
            {score?.score || 0}
            {(!score || typeof score?.score === 'number' && score.score < 1000) &&
              <span className="text-xs text-red-500">{'< 1000'} </span>
            }
            {typeof score?.score === 'number' && score.score >= 1000 && 
              <span className="text-xs text-green-500">{'1000'} </span>
            }
          </div>
        </div>
        {(!score || (typeof score?.score === 'number' && score.score < 1000)) &&
        <div className="join">
          <Link 
            className="btn join-item"
            href="https://docs.useorbis.com/docs/primitives/credentials/credentials-list"
            target="_blank"
            
          >
            Add
          </Link>
          <div 
            className="btn join-item"
            onClick={() => fetchScore(true)}
          >
            {!isLoading && <ArrowPathIcon height={20} width={20} />}
            {isLoading && <span className="loading loading-spinner loading-sm"></span>}
          </div>
        </div>
          // <button
          //   className="btn gap-1"
          //   onClick={() => fetchScore(true)}
          // >
          //   {isLoading && <span className="loading loading-spinner loading-sm"></span>}
          //   Refresh
          // </button>
        }
        {typeof score?.score === 'number' && score.score > 1000 &&
          <button 
            className="btn btn-success gap-1"
            // onClick={() => fetchScore(true)}
          >
            Verified
          </button>
        }
      </div>
    </div>
  )
}
