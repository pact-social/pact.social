import { useEffect, useRef, useState } from "react"
import { useLitContext } from "../../context/lit";
import useAuthenticateOtp from "../../hooks/useOtp";
import ViewBox, { useViewContext } from "../viewBox";
import { useStytch } from '@stytch/nextjs';

type StytchModalProps = {
  open: boolean;
  onClose: () => void;
}

export default function StytchModal ({ onClose, open }: StytchModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const { setView } = useViewContext()
  const { connect, isConnected, isLoading } = useLitContext()
  const { authWithStytch } = useAuthenticateOtp()
  
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



  const [step, setStep] = useState<string>('submit');
  const [email, setEmail] = useState<string>('');
  const [methodId, setMethodId] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const stytchClient = useStytch();

  async function sendPasscode(event: any) {
    event.preventDefault();
    setLoading(true);
    setError(undefined);
    try {
      const response = await stytchClient.otps.email.loginOrCreate(email);
      setMethodId(response.method_id);
      setStep('verify');
    } catch (err) {
      // @ts-ignore
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function authenticate(event: any) {
    event.preventDefault();
    setLoading(true);
    setError(undefined);
    try {
      const response = await stytchClient.otps.authenticate(code, methodId, {
        session_duration_minutes: 60,
      });
      await authWithStytch(response.session_jwt, response.user_id);
      ref.current?.close()
      window.history.pushState({}, document.title, window.location.pathname);
    } catch (err) {
      // @ts-ignore
      setError(err);
    } finally {
      setLoading(false);
    }
  }




  return (
    <div>
      {/* Open the modal using ID.showModal() method */}
      <dialog 
        ref={ref}
        className="modal modal-bottom sm:modal-middle"
        data-theme="dark"
        id="stytch-modal-dialog"
      >
        <div className="modal-box">


          <div className='text-white flex flex-col gap-4'>
            {step === 'submit' && (
              <>
                {/* {error && (
                  <div className="alert alert--error">
                    <p>{error.message}</p>
                  </div>
                )} */}
                <h1>Enter your email</h1>
                <p>A verification code will be sent to your email.</p>
                <div className="">
                  <form className="flex flex-col gap-3" onSubmit={sendPasscode}>
                    <label htmlFor="email" className="sr-only">
                      email
                    </label>
                    <input
                      id="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      type="email"
                      name="email"
                      className="input input-border input-secondary"
                      placeholder="Your email"
                      autoComplete="off"
                    ></input>
                    <button
                      type="submit"
                      className="btn btn-secondary"
                      disabled={loading}
                    >
                      Send code
                    </button>
                    <button
                      onClick={() => ref.current?.close()}
                      className="btn btn--link"
                    >
                      Back
                    </button>
                  </form>
                </div>
              </>
            )}
            {step === 'verify' && (
              <>
                <h1>Check your email</h1>
                <p>Enter the 6-digit verification code to {email}</p>
                <div className="form-wrapper">
                  <form className="flex flex-col gap-3" onSubmit={authenticate}>
                    <label htmlFor="code" className="sr-only">
                      Code
                    </label>
                    <input
                      id="code"
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      type="code"
                      name="code"
                      className="input input-border input-secondary"
                      placeholder="Verification code"
                      autoComplete="off"
                    ></input>
                    <button 
                      type="submit" 
                      className={`btn btn-secondary ${loading ? 'btn-disabled' : ''}`}
                    >
                      {loading && <span className="loading loading-spinner"></span>}
                      Verify
                    </button>
                    <button
                      onClick={() => setStep('submit')}
                      className="btn btn-outline"
                    >
                      Try again
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </div>
      </dialog>
    </div>
  )
}
