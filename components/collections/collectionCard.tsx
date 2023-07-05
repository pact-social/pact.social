import Image from 'next/image'
import Link from "next/link";
import { Collection, Maybe } from "../../src/gql";
import { useCeramicContext } from "../../context";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function CollectionCard ({
  collection
}: {
  collection?: Maybe<Collection>
}) {
  const { state: { did } } = useCeramicContext()
  return (
    <Link
      href={{
        pathname: '/collections/[collectionID]',
        query: { collectionID: collection?.id}
      }}
    >
      <div className="card card-side card-compact border-0">
          <div className="stack h-full w-full max-w-[40%] mr-2">
            <figure className="w-full h-full ">
              <Image 
                src={collection?.media?.at(0)?.item}
                alt={collection?.media?.at(0)?.item}
                fill
                className=" object-cover"
              />
            </figure>
            <div className="grid w-full aspect-[4/3] -ml-5 border border-neutral-500 bg-neutral-400 !opacity-100"></div> 
            <div className="grid w-full aspect-[4/3] -ml-10 border border-neutral-500 bg-neutral-200 !opacity-100"></div>
          </div>
        {collection &&
        <div className="card-body bg-gradient-to-t from-[#A7D1FF]/[0.2] to-[#FFB6B6]/[0.2]">
          { did?.parent === collection?.author.id &&
            <button className="btn btn-circle btn-xs absolute right-2 top-2">
              <XMarkIcon className="h-3 w-3" />
            </button>
          }
          <div className="flex gap-2">
            <Image
              src="/collectionIcon.svg"
              width={20}
              height={16}
              alt="collection"
            /> 
            <span>Collection</span>
          </div>
          <h2 className="card-title">
            {collection.name}
          </h2>
          <div className="card-actions justify-start items-end flex-1">
            <Image
              src="/collectionStackIcon.svg"
              width={16}
              height={14}
              alt="collection"
              className="self-end"
            />
            <span className="align-bottom">
              {collection.collectionPactsCount} pacts
            </span>
          </div>
        </div>
        }
      </div>
    </Link>
  )
}
