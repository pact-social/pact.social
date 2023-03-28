import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useSigner } from "wagmi"
import { useCeramicContext } from "../../context"
import { useBoxContext } from "../../context/box"
import { authenticateCeramic } from "../../utils"
import { useViewContext } from "../signBox"

export default function PrivateSign() {
  const { address, connector, status } = useAccount()
  const { setView, previousView } = useViewContext()
  console.log('private sign address', address)
  const signer = useSigner()
  const { composeClient, ceramic } = useCeramicContext();

  const handleCeramicAuth = async () => {
    const provider = await connector?.getProvider()
    await authenticateCeramic(address, provider, ceramic, composeClient)
  }

  const handlePetitionSign = async () => {
    // generate a secret/nonce getCsrfToken from next-auth? or from client side


    // get petition datas

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
      <p className=" text-lg font-semibold text-neutral-700">Private Signature</p>
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
