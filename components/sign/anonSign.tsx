import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Wallet } from "ethers"
import { useAccount, useSigner } from "wagmi"
import { useCeramicContext } from "../../context"
import { useBoxContext } from "../../context/box"
import { useManifestContext } from "../../context/manifest"
import { authenticateCeramic } from "../../utils"
import { useViewContext } from "../signBox"

export default function AnonSign() {
  const { address, connector, status } = useAccount()
  const { setView, previousView } = useViewContext()
  console.log('anon sign address', address)
  const signer = useSigner()
  const { composeClient, ceramic } = useCeramicContext();
  const { manifest } = useManifestContext();

  const handleCeramicAuth = async () => {
    const provider = await connector?.getProvider()
    await authenticateCeramic(address, provider, ceramic, composeClient)
  }

  const getRandomWallet = () => {
    // check if pk in localstorage
    const wallet = Wallet.createRandom()
    console.log('new wallet created', wallet)
    // persist wallet pk in localstorage
    return wallet;
  }

  const handlePetitionSign = async () => {
    // generate a secret/nonce getCsrfToken from next-auth? or from client side
    const timestamp = new Date().valueOf();
    const signingAddress = getRandomWallet() ;
    console.log('signing petition', timestamp, signingAddress)

    // get petition datas
    const message = `
      ${manifest}\n\n
      ${timestamp}
    `
    // form the message

    // call wallet sign

    // save datas on ceramic
  }


  if ( !address || status !== 'connected') {
    return (<ConnectButton/>)
  }
  if (!composeClient.did?.authenticated) {
    return (
      <div 
        className="btn btn-primary"
        onClick={handleCeramicAuth}
      >
        SignIn With Ethereum
      </div>
    )
  }

  
  return (
    <div className="flex flex-col justify-around my-6 mx-4">
      <p className=" text-lg font-semibold text-neutral-700">Anon Signature</p>
      <p className="text-sm">encrypt and share with Pact.Social operator keys the secret used to sign.</p>
      <div className="divider"></div>
      <div 
        className="btn btn-primary"
        onClick={handlePetitionSign}
      >
        Sign Petition
      </div>
      <div className="divider"></div>
      <div className=" self-start">
        <div
          className="btn"
          onClick={previousView}
        >
          Back
        </div>
      </div>
    </div>
  )
}
