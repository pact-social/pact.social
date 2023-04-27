import Image from 'next/image'
import { usePactContext } from "../../context/pact";
import useGetUsername from '../../hooks/useGetUsername';


export default function PactHero() {
  const { pact } = usePactContext()
  const username = useGetUsername(pact?.author, null, pact?.author.id)
  return (
    <>
      <div className="hero hero-split">
        <div className="hero-content">
          <div className="hero-img">
            <Image
              // src="https://images.unsplash.com/photo-1516589091380-5d8e87df6999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              src={pact?.picture ? `${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/${pact?.picture}` : "https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80"}
              alt=""
              width={800}
              height={800}
            />
          </div>
          <div className="hero-details grid gap-4 my-4 md:my-8">
            <div className={`label-${pact?.type}`}>{pact?.type === 'openletter' ? 'open letter' : pact?.type}</div>
            <h1 className="text-4xl font-bold">{pact?.title}</h1>
            <span className="badge font-sans">{pact?.topic?.name}</span>
            <p className="text-base font-light font-sans">Short intro text. Maybe ppl can add it to the form when they fill in their data So its easier to share for influencers 140 char like twitter</p>
            
            <div>
              <div className="pb-3">
                <h4 className="font-semibold">Petition starter</h4>
              </div>
              
              <div className="flex flex-row gap-3">

                <div className="avatar">
                  <div className="w-12 h-fit rounded">
                    <img src="https://images.unsplash.com/photo-1585066699728-a56ef32a992b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80" alt="Tailwind-CSS-Avatar-component" />
                  </div>
                </div>
                <div>
                  <h5 className=" font-extralight">{ username }</h5>
                  <p className=" text-xs">Profile</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
