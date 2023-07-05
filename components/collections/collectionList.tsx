import type { CollectionEdge, Maybe } from "../../src/gql";
import CollectionCard from "./collectionCard";

export default function CollectionList ({
  collections
}: {
  collections: Maybe<CollectionEdge>[]
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {collections.map((item, index) => 
      <CollectionCard 
        key={index}
        collection={item?.node}
      />
    )}
    </div>
  )
}
