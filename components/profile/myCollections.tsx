import { useRef } from "react"
import { useCeramicContext } from "../../context"
import useCollections from "../../hooks/useCollections"
import CollectionList from "../collections/collectionList"
import CollectionForm from "../collections/collectionForm"

export default function MyCollection () {
  const {state: { did }} = useCeramicContext()
  const { isLoading, data } = useCollections(did?.parent)
  const collectionCreateModal = useRef<HTMLDialogElement>(null)

  return (
    <div>
      <div className="flex justify-end">
        <button 
          className="btn btn-xs btn-secondary" 
          onClick={() => collectionCreateModal.current?.showModal()}
        >
          new collection
        </button>
        <dialog 
          id="collection-create-modal" 
          className="modal modal-bottom sm:modal-middle"
          ref={collectionCreateModal}
        >
          <>
            <CollectionForm className="modal-box" />
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </>
        </dialog>
      </div>
      <div className="divider"></div>
      {isLoading &&
        <span className="loading loading-dots"></span>
      }
      {data &&
        <CollectionList collections={data} />
      }
    </div>
  )
}
