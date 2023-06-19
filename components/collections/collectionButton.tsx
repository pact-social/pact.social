import { useRef } from "react";

export default function CollectionButton ({ pactID } : { pactID: string }) {
  const collectionModel = useRef<HTMLDialogElement>(null);

  return (
    <>
    <button className="btn" onClick={()=>collectionModel.current?.showModal()}>Save to Collection</button>
    <dialog id="collection_save" className="modal" ref={collectionModel}>
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg">Save to collection</h3>
        <div>no collection</div>
        <div className="btn">create collection</div>
        <p className="py-4">Press ESC key or click outside to close</p>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
    </>
  )
}
