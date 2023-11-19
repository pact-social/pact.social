import Image from 'next/image'
import Link from 'next/link';
import type { Pact } from '../../src/gql';
import useStreamStats from '../../hooks/useStreamStats';
import IconSig from '../svg/noun-signature';
import CollectionButton from '../collections/collectionButton';
import dayjs from 'dayjs';
import { useProfileContext } from '../../context/profile';
import { CheckBadgeIcon } from '@heroicons/react/24/outline';
import DefaultImage from './defaultImage';

export default function PactCardH({pact}: { pact: Pact }) {
  const { data: stats, error } = useStreamStats(pact?.id);
  const { hasSigned } = useProfileContext()
  return (
    <div className="card card-compact sm:card-side bg-base-100 w-full max-w-3xl">
      <Link 
      href={`/m/${pact.id}`}>
        <div className="flex h-full">
        {pact.media && pact.media.length > 0 &&
          <div className="carousel aspect-[4/3] w-full sm:w-[232px] xl:w-[300px] mb-0!">
            {pact.media?.map((current, index) => 
              <figure 
                key={index}
                className="relative aspect-[4/3] carousel-item">
                <Image 
                  src={current?.item}
                  alt={current?.altTag || pact.title}
                  fill
                  // width={300}
                  // height={300}
                  sizes="(max-width: 768px) 232px, 400px"
                  // sizes="300px"
                  priority={false}
                  className="object-cover"
                />
              </figure>
            )}
          </div>
        }
        {pact.media && pact.media.length === 0 && 
          <figure className="relative aspect-[4/3] w-full sm:w-[232px] xl:w-[300px] mb-0!">
            {pact?.image 
              ?
                <Image 
                  src={pact?.image ? pact?.image : 'https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80'}
                  alt={pact.title}
                  fill
                  priority={false}
                  // sizes="300px"
                  className="object-cover"
                />
              : <DefaultImage height={70} />
            }
          </figure>
        }
        </div>
      </Link>
      <div className={`card-body bg-${pact.type}-light justify-between`}>
        <Link href={`/m/${pact.id}`} className="flex flex-col gap-2 flex-1">
          <div className={`label-${pact.type}`}>{pact.type === 'openletter' ? 'open letter' : pact.type}</div>
          <h2 className="card-title line-clamp-2">{pact.title}</h2>
          <div className="flex gap-2">  
            <div className="">{dayjs(pact.createdAt).format('LL')}</div>
            <div className="badge badge-outline badge-primary line-clamp-1">{pact?.topic?.name}</div>
          </div>
        </Link>
        <div className="card-actions justify-between items-baseline">
          <div className="flex items-baseline gap-6">
            <div className="flex gap-3">
              {hasSigned && hasSigned(pact.id) &&
                <CheckBadgeIcon className="w-5 h-5 text-green-600" />
              }
              {hasSigned && !hasSigned(pact.id) &&
                <IconSig className="w-4 h-4" />
              }
              <div className="text-sm">{stats?.total}</div>
            </div>
            <CollectionButton pactID={pact?.id} />
          </div>
          <div className="justify-end">
          <Link href={`/m/${pact.id}`}>
            read more
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
