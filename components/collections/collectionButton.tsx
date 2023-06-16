export default function CollectionButton ({ pactID } : { pactID: string }) {

  return (
    <>
    <button className="btn" onClick={()=>window.collection_save.showModal()}>Save to Collection</button>
    <dialog id="collection_save" className="modal">
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
