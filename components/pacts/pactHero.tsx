import Image from 'next/image'
import { usePactContext } from "../../context/pact";
import useGetName from '../../hooks/useGetName';
import { ReactNode } from 'react';
import CollectionButton from '../collections/collectionButton';


export default function PactHero({ 
  children,
  draft = false,
}: { 
  children?: ReactNode;
  draft?: boolean;
}) {
  const { pact } = usePactContext()
  const name = useGetName(pact?.author, null, pact?.author?.id)
  return (
    <>
      <div className="hero hero-split">
        <div className="hero-content">
          {pact?.media &&
            <div className="hero-img self-start aspect-[4/3] carousel flex flex-1 relative">
              {pact.media?.map((current, index) => 
                <figure 
                  key={index}
                  className="relative w-full h-full carousel-item">
                  <Image 
                    src={current?.item ? current.item : 'https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80'}
                    alt={current?.altTag || pact.title}
                    fill
                    // height={210}
                    // width={280}
                    className=" object-cover"
                  />
                </figure>
              )}
            </div>
          }
          {(!pact?.media) && 
            <figure className="hero-img w-full self-start aspect-[4/3] carousel flex flex-1 relative mb-0!">
              <Image 
                src={pact?.image ? pact?.image : 'https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80'}
                alt={pact?.title || ''}
                fill
                className="object-cover"
              />
            </figure>
          }
          
          <div className="hero-details grid gap-4 my-4 md:my-8">
            <div className={`label-${pact?.type}`}>{pact?.type === 'openletter' ? 'open letter' : pact?.type}</div>
            <h1 className="text-4xl font-bold">{pact?.title}</h1>
            <span className="badge font-sans">{pact?.topic?.name}</span>
            <p className="text-base font-light font-sans">{pact?.description || 'no description'}</p>
            
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
                  <h5 className=" font-extralight">{ name }</h5>
                  <p className=" text-xs">Profile</p>
                </div>
              </div>
            </div>
            
            {pact?.id && !draft && 
            <div className=" font-sans">
              <CollectionButton pactID={pact?.id} />
            </div>
            }
            {children && 
              <>{children}</>
            }
          </div>
        </div>
      </div>
    </>
  )
}
