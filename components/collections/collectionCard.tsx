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
      <div className="card card-compact !shadow-md !rounded-xl border-2">
        {collection &&
        <div className="card-body">
          { did?.parent === collection?.author.id &&
            <button className="btn btn-circle btn-xs absolute right-2 top-2">
              <XMarkIcon className="h-3 w-3" />
            </button>
          }
          <h2 className="card-title">
            {collection.name}
            <div className="badge badge-ghost">{collection.collectionPactsCount} pacts</div>
          </h2>
          <p>{collection?.description}</p>
        </div>
        }
      </div>
    </Link>
  )
}
