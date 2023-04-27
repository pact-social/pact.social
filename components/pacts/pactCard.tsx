import Image from 'next/image'
import Link from 'next/link';
import { Pact } from '../../src/gql';

export default function PactCard({pact}: { pact: Pact }) {
  
  return (
    <div className="card card-compact bg-base-100 shadow-xl max-w-sm">
      <figure className="relative aspect-[4/3]">
        <Image 
          src={pact.picture ? `${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/${pact.picture}` : 'https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80'}
          alt={pact.title}
          fill
          className="object-cover"
        />
      </figure>
      <div className={`card-body bg-${pact.type}-light`}>
        <div className={`label-${pact.type}`}>featured {pact.type === 'openletter' ? 'open letter' : pact.type}</div>
        <h2 className="card-title">{pact.title}</h2>
        <div className="card-actions justify-end">
          <Link 
            scroll
            href={`/m/${pact.id}`}
            className="btn btn-primary">
            sign
          </Link>
        </div>
      </div>
    </div>
  );
}
