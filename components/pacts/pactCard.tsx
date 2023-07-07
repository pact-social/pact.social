import Image from 'next/image'
import Link from 'next/link';
import type { Pact } from '../../src/gql';
import useStreamStats from '../../hooks/useStreamStats';
import IconSig from '../svg/noun-signature';
import CollectionButton from '../collections/collectionButton';
import dayjs from 'dayjs';

export default function PactCard({pact}: { pact: Pact }) {
  const { data: stats, error } = useStreamStats(pact?.id);

  return (
    <div className="card card-compact bg-base-100 shadow-xl max-w-sm h-full w-full">
      <Link  href={`/m/${pact.id}`} className="">
      {pact.media && pact.media.length > 0 &&
        <div className="carousel aspect-[4/3] w-full">
          {pact.media?.map((current, index) => 
            <figure 
              key={index}
              className="relative w-full aspect-[4/3] carousel-item">
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
      {pact.media && pact.media.length === 0 &&
        <figure className="relative w-full aspect-[4/3]">
          <Image 
            src={pact?.image ? pact?.image : 'https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80'}
            alt={pact.title}
            fill
            className="object-cover"
          />
        </figure>
      }
      </Link>
      <div className={`card-body bg-${pact.type}-light justify-between`}>
        <Link 
        href={`/m/${pact.id}`}
        className="flex flex-col gap-2 flex-1"
        >
        <div className={`label-${pact.type}`}>featured {pact.type === 'openletter' ? 'open letter' : pact.type}</div>
        <h2 className="card-title">{pact.title}</h2>
        <div className="flex gap-2">  
          <div className="">{dayjs(pact.createdAt).format('LL')}</div>
          <div className="badge badge-outline badge-primary">{pact?.topic?.name}</div>
        </div>
        </Link>
        <div className="card-actions justify-between items-baseline">
          <div className="flex items-baseline gap-6">
            <div className="flex gap-3">
              <IconSig className="w-4 h-4" />
              <div className="text-sm">{stats?.total}</div>
            </div>
            <CollectionButton pactID={pact?.id} />
          </div>
          <div className="justify-end">
            <div className="btn btn-primary">
              sign
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
