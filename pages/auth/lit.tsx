import { useEffect, useState } from "react"
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { useCeramicContext } from "../../context";
import { useLitContext } from "../../context/lit";
import { PkpStatus } from "../../lib/litUtils";
import { Store } from "../../lib/store";
import { useAccount } from "wagmi";

export default function AuthLit () {
  const { push, reload } = useRouter()
  const { state: { isAuthenticating: CeramicIsConnecting, isAuthenticated: CeramicIsConnected }} = useCeramicContext()
  const { litClient, isLoading: litIsConnecting, isConnected: litIsConnected} = useLitContext()
  const { isConnecting: AccountIsConnecting, isConnected: AccountIsConnected} = useAccount()
  const [progress, setProgress] = useState<number>(0)

  async function redirect() {
    const store = new Store()
    const redirecttUri = await store.getItem('auth-redirect')
    if (redirecttUri) push(redirecttUri)
  }

  useEffect(() => {
    if (AccountIsConnected && !CeramicIsConnected && !litIsConnected) {
      setProgress(70)
    }
    if (AccountIsConnected && CeramicIsConnected && !litIsConnected) {
      setProgress(80)
    }
    if (AccountIsConnected && CeramicIsConnected && litIsConnected) {
      setProgress(100)
      redirect()
    }
  }, [AccountIsConnected, CeramicIsConnected, litIsConnected])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((old: number) => {
        if (old < 100) {
          if (!AccountIsConnected && old === 70) return old
          return old + 1
        }
        return old || 0
      })
    }, 500)

    return () => {
      clearInterval(interval)
    }
  }, [AccountIsConnected])

  return (
    <Layout 
      metas={{
        title: 'pact.social',
        description: 'decentralized petitions, manifestos and open-letters for change and impact',
        // imageSrc: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/og/default`
      }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col gap-3 items-center">
          <span className="loading loading-ring loading-lg"></span>
          <progress className="progress progress-secondary w-56" value={progress} max="100"></progress>
          <span>Connection in progresss,<br/>it could take 1 minute…</span>
          {!AccountIsConnected && progress < 70 && <AuthStatus pkpStatus={litClient.pkpStatus} />}
          {AccountIsConnected && !CeramicIsConnected && <span className="text-sm">Loading personal storage</span>}
          {AccountIsConnected && CeramicIsConnected && !litIsConnected && <span className="text-sm">Loading encrypted personal storage</span>}
          {(progress === 70 && !AccountIsConnected) &&
          <>
            <span className="text-sm text-error">An error occurred</span>
            <div className="btn btn-error" onClick={reload}>Retry</div>
          </>
          }
        </div>
      </div>
    </Layout>
  )
}

const AuthStatus = ({pkpStatus}: { pkpStatus: PkpStatus | undefined }) => {

  switch (pkpStatus) {
    case PkpStatus.AUTH_PROVIDER:
      return <span className="text-sm">authenticating</span>
    case PkpStatus.FETCH_PKP:
      return <span className="text-sm">fetching account</span>
    case PkpStatus.MINT_PKP:
      return <span className="text-sm">creating new account</span>
    case PkpStatus.SESSION_SIGS:
      return <span className="text-sm">generating secured session</span>
    case PkpStatus.AUTH_SUCCESS:
      return <span className="text-sm">success</span>
  
    default:
      return <span className="text-sm">fetching account</span>
  }
}
