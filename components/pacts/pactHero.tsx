import Image from 'next/image'
import { usePactContext } from "../../context/pact";
import useGetName from '../../hooks/useGetName';
import { ReactNode } from 'react';
import CollectionButton from '../collections/collectionButton';
import { useRouter } from 'next/router';
import ProfileAvatar from '../profile/profileAvatar';
import { getAddressFromDid } from '../../utils';
import DefaultImage from './defaultImage';


export default function PactHero({ 
  children,
  draft = false,
}: { 
  children?: ReactNode;
  draft?: boolean;
}) {
  const { push } = useRouter()
  const { pact } = usePactContext()
  const name = useGetName(pact?.author, null, pact?.author?.id)

  const { address } = getAddressFromDid(pact?.author.id)
  
  return (
    <>
      <div className="hero hero-split">
        <div className="hero-content">
          {(pact?.media && pact?.media.length > 0) &&
            <div className="hero-img self-start aspect-[4/3] carousel flex flex-1 relative">
              {pact.media?.map((current, index) => 
                <figure 
                  key={index}
                  className="relative w-full h-full carousel-item">
                  <Image 
                    src={current?.item ? current.item : 'https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80'}
                    alt={current?.altTag || pact.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </figure>
              )}
            </div>
          }
          {(!pact?.media || pact.media.length === 0) && 
            <div className="hero-img self-start aspect-[4/3] carousel flex flex-1 relative">
              <figure className="relative w-full h-full carousel-item">
                {pact?.image 
                  ?
                    <Image 
                      src={pact?.image ? pact?.image : 'https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80'}
                      alt={pact?.title || ''}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  : <DefaultImage />
                }
                
              </figure>
            </div>
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
              
              <ProfileAvatar address={address} name={name} size="sm" />
            </div>
            
            {pact?.id && !draft && 
            <div className=" font-sans">
              <CollectionButton pactID={pact?.id} />
            </div>
            }
            {pact?.id && !draft && pact.author.isViewer &&
              <div className="flex join">
                <button 
                  className="btn"
                  onClick={() => push({
                    pathname: `/m/[streamID]/edit`,
                    query: {
                      streamID: pact.id
                    }
                  })}
                >
                    Edit
                  </button>
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
