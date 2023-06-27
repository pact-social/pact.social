import { useEffect, useRef } from "react"
import useLit from "../../hooks/useLit";

type LitModalProps = {
  open: boolean;
  onClose: () => void;
}

export default function LitModal ({ onClose, open }: LitModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  const { connect: connectLit, isConnected, isLoading } = useLit()
  
  useEffect(() => {
    if (isConnected) {
      ref.current?.close()
      onClose()
    }
  }, [isConnected, onClose, ref])

  useEffect(() => {
    if(open) {
      try {
        ref.current?.showModal()
      } catch(error) {}
    }
  }, [open, ref])

  return (
    <div>
      {/* Open the modal using ID.showModal() method */}
      <dialog 
        ref={ref}
        className="modal modal-bottom sm:modal-middle"
        data-theme="dark"
        id="lit-modal-dialog"
      >
        <form method="dialog" id="lit-modal" className="modal-box">
          <h3 className="font-bold text-xl text-white">Unlock your private storage</h3>
          <p className="py-4">To unlock your private storage, you must sign a message in your wallet to verify that you are the owner of this account.</p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-ghost">skip</button>
            {/* <ConnectButton /> */}
            <div 
              className={`btn btn-secondary ${isLoading ? 'disabled' : ''}`}
              onClick={connectLit}
            >
              {isLoading &&
                <span className="loading"></span>
              }
              sign
            </div>
          </div>
        </form>
      </dialog>
    </div>
  )
}
