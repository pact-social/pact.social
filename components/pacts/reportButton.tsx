import { FlagIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useRef, useState } from "react"
import { ReportPolicyType, reportPolicy } from "../../lib/reportPolicy"
import { SubmitHandler, useForm } from "react-hook-form"
import { useCeramicContext } from "../../context"
import { useConnectModal } from "@rainbow-me/rainbowkit"

type ReportForm = {
  reason: ReportPolicyType;
}

export default function ReportButton ({ pactID } : { pactID?: string }) {
  const ref = useRef<HTMLDialogElement>(null)
  const { handleSubmit, register, formState: { errors } } = useForm<ReportForm>()
  const { state: { did } } = useCeramicContext()
  const { openConnectModal } = useConnectModal()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()

  const onSubmit: SubmitHandler<ReportForm> = async (data) => {
    if (!did) return
    setError(undefined)
    setLoading(true)

    const jws = await did?.createDagJWS({
      ...data,
      pactID
    })
    const resp = await reportPolicy(jws)
    if (resp.ok) {
      ref.current?.close()
    } else {
      setError(`An error occured - ${resp.statusText}`)
    }
    setLoading(false)
  }

  const openModal = () => {
    if (!did?.authenticated && openConnectModal) {
      openConnectModal()
    } else {
      ref.current?.showModal()
    }
  }

  return (
    <>
      <div 
        className="btn btn-ghost"
        onClick={openModal}
      >
        <FlagIcon className="h-4 w-4" />
        Report a policy violation
      </div>
      <dialog
        ref={ref}
        className="modal modal-bottom sm:modal-middle -z-0"
        // data-theme="dark"
      >
        <div className="modal-box -z-0">
          <h3 className="font-bold text-xl">Report a policy violation</h3>
          <p className="py-4">
            A report will be sent to the pact.social team. If it turns out that this pact does not respect our policies, it may be removed from display on pact.social
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 justify-items-stretch">
            <select 
              className={`select select-bordered flex-1 ${errors.reason && ' select-error'}`}
              {...register('reason', {required: true})}
              defaultValue=""
            >
              <option disabled value="">Select a report reason</option>
              {Object.entries(ReportPolicyType).map(([key, value]) => 
              <option key={key} value={key}>{value}</option>
              )}
            </select>
            <button type="submit" className={`btn btn-secondary ${isLoading && 'btn-disabled'}`}>
              {isLoading && <span className="loading loading-spinner"></span>}
              Report
            </button>
          </form>
          {error &&
          <div className="alert alert-error mt-4">
            <XCircleIcon className="h-6 w-6" />
            <span>{error}</span>
          </div>
          }
          <div className="modal-action">
            <form method="dialog" className="">
              <button className="btn btn-ghost">
                skip
              </button>
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}
