import Image from 'next/image'
import Link from 'next/link';
import { Pact } from '../../src/gql';
import useStreamStats from '../../hooks/useStreamStats';
import IconSig from '../svg/noun-signature';

export default function PactCardH({pact}: { pact: Pact }) {
  const { data: stats, error } = useStreamStats(pact?.id);
  return (
    <Link 
      href={`/m/${pact.id}`}>
    <div className="card card-compact card-side bg-base-100 shadow-xl max-w-3xl">
      {pact.media &&
        <div className="carousel aspect-[4/3] min-w-[14rem] mb-0!">
          {pact.media?.map((current, index) => 
            <figure 
              key={index}
              className="relative aspect-[4/3] carousel-item">
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
      {(!pact.media && pact.image) && 
        <figure className="relative aspect-[4/3] min-w-[14rem] mb-0!">
          <Image 
            src={pact?.image ? pact?.image : 'https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80'}
            alt={pact.title}
            fill
            className="object-cover"
          />
        </figure>
      }
      <div className={`card-body bg-${pact.type}-light justify-between`}>
        <div className={`label-${pact.type}`}>featured {pact.type === 'openletter' ? 'open letter' : pact.type}</div>
        <h2 className="card-title">{pact.title}</h2>
        <div className="text-sm">{pact?.topic?.name}</div>
        <div className="card-actions justify-between items-baseline">
          <div className="flex gap-3">
            <IconSig className="w-4 h-4" />
            <div className="text-sm">{stats?.total}</div>
          </div>
          <div className="justify-end">
              read more
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}
