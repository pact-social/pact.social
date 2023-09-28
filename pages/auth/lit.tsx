import { BaseProvider, isSignInRedirect } from "@lit-protocol/lit-auth-client";
import { useEffect } from "react"
import useLit from "../../hooks/useLit";
import { ProviderType } from "@lit-protocol/constants";
import { AuthMethod } from "@lit-protocol/types/src/lib/interfaces";
import { InjectedConnector } from 'wagmi/connectors/injected';
// import { walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { useRouter } from "next/router";
import { useConnect } from "wagmi";

export default function AuthLit () {
  const { query: { id_token, provider, state } } = useRouter()
  const { connect: connectLit, isConnected, isLoading, lit } = useLit()
  const redirectUri = 'http://localhost:3000/auth/lit'
  // const connector = new WalletConnectConnector({
  //   options: {
  //     projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  //     showQrModal: false,
  //   },
  // })
  const { connect, connectors, pendingConnector } = useConnect()
  async function handleRedirect() {
    // Check if app has been redirected from Lit login server
    // await lit.handleGoogleRedirect()
    // console.log('provider', lit.getPKPWallet())
    // await connect({connector})
    // console.log('connectors', connectors)
    // for (const connector of connectors) {
    //   console.log('provider', connector.name)
    //   if (connector.name === 'WalletConnect') {
    //     const provider = await connector.getProvider()
    //     console.log('provider', provider)
    //   }
    // }
  }
    
    useEffect(() => {
      if (id_token && provider && state) {
        handleRedirect()
        console.log('lit auth query params', id_token, provider, state)
      }
  }, [id_token, provider, state])

  return (
    <>
      Loading
    </>
  )
}
