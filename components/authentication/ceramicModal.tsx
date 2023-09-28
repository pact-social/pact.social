import { useEffect, useRef } from "react"
import { useCeramicContext } from "../../context";
import ConnectButton from "../connect";

type CeramicModalProps = {
  open: boolean;
  onClose: () => void;
}

export default function CeramicModal ({ onClose, open }: CeramicModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  const { state: { isAuthenticated } } = useCeramicContext()
  
  useEffect(() => {
    if (isAuthenticated) {
      onClose()
      ref.current?.close()
    }
  }, [isAuthenticated, onClose])

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
      {/* <button className="btn" onClick={()=>ref.current?.showModal()}>open modal</button> */}
      <dialog
        ref={ref}
        className="modal modal-bottom sm:modal-middle"
        data-theme="dark"
        id="ceramic-modal-dialog"
      >
        <form method="dialog" id="ceramic-modal" className="modal-box text-white">
          <h3 className="font-bold text-xl">Verify your account</h3>
          <p className="py-4">pact.social need access to your personal data hub, you must sign a message in your wallet to verify that you are the owner of this account.</p>
          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-ghost">skip</button>
            <ConnectButton />
            {/* <div 
              className={`btn btn-primary ${isAuthenticating && 'loading disabled'}`}
              onClick={connect}
            >
              sign
            </div> */}
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">

        </form>
      </dialog>
    </div>
  )
}
