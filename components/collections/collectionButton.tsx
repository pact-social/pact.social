import { useEffect, useRef, useState } from "react";
import ViewBox from "../viewBox";
import CollectionAdd from "./collectionAdd";
import { BookmarkIcon } from "@heroicons/react/24/solid";

export default function CollectionButton ({ pactID } : { pactID: string }) {
  const collectionModal = useRef<HTMLDialogElement>(null);
  const [ isOpen, setOpen ] = useState<boolean>(false)
  
  useEffect(() => {
    const onClose = () => setOpen(false)
    const element = collectionModal.current
    element?.addEventListener('close', onClose)
    
    return () => {
      element?.removeEventListener('close', onClose);
    };
  }, []);

  function openModal() {
    collectionModal.current?.showModal()
    setOpen(true)
  }
  return (
    <>
      <div className="tooltip" data-tip="add to collection">
        <button 
          className="btn btn-xs btn-ghost btn-circle rounded-full bg-gray-200" 
          onClick={openModal}
        >
          <BookmarkIcon className="w-4 h-4" />
        </button>
      </div>
      <dialog 
        id="collection-add-modal" 
        className="modal modal-bottom sm:modal-middle"
        ref={collectionModal}
      >
        {isOpen &&
        <>
          <ViewBox className="modal-box">
            <CollectionAdd pactID={pactID} />
          </ViewBox>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </>
        }
      </dialog>
    </>
  )
}
