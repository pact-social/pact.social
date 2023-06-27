import { Wallet } from "ethers"
import { newClients, useCeramicContext } from "../../context"
import { usePactContext } from "../../context/pact"
import { useViewContext } from "../signBox"
import { formatMessage } from "../../lib/pact-utils"
import { useState } from "react"
import { DIDSession } from "did-session"
import { AuthMethodOpts, Cacao, SiweMessage } from "@didtools/cacao"
import { CreatePactSignatureInput, Mutation, PactSignatureVisibilityType } from "../../src/gql"
import Turnstile from "react-turnstile";
import ShareView from "./share"
import { useProfileContext } from "../../context/profile"


const {
  ceramic: burnerCeramic,
  composeClient: burnerComposeClient
} = newClients()


export default function AnonSign() {
  const { pact } = usePactContext();
  const { setView, previousView } = useViewContext()
  const { composeClient } = useCeramicContext();
  const { add, hasSigned } = useProfileContext()

  const [ timestamp, setTimestamp ] = useState<Date | undefined>();
  const [ token, setToken ] = useState<string>()
  const [ burnerWallet, setBurner ] = useState<Wallet>();
  
  const saveSignature = async (data: string, time: Date) => {
    try {
      const input: CreatePactSignatureInput = {
        content: {
          signature: data,
          signedAt: time?.toISOString(),
          pactID: pact?.id,
          visibility: PactSignatureVisibilityType.Anon,
          pactVersion: pact?.version,
          turnToken: token,
        }
      };
      const did = composeClient.did;
      if(!did?.authenticated) {
        throw new Error('You are not connected')
      }
      const referral = localStorage.getItem(`ref_${pact?.id}`)
      if (referral) {
        const data = JSON.parse(referral)

        input.content.referral = data.ref
      }
      
      const res = await burnerComposeClient.executeQuery<Mutation>(`
      mutation RecordSignature($input: CreatePactSignatureInput!) {
        createPactSignature(input: $input) {
          clientMutationId
          document {
            id
          }
        }
      }
      `, {
        input
      });

      if (res.data?.createPactSignature?.document?.id && add) {
        await add(input, 'PactSignature', res.data?.createPactSignature?.document?.id);
      }

      setView(<ShareView/>);
    } catch (error) {
      console.log('error signature', error);
    }
  }


  const getRandomWallet = () => {
    const wallet = Wallet.createRandom()
    setBurner(wallet);
    return wallet;
  }

  const authBurnerClients = async (wallet: Wallet) => {
    const customAuthMethod = async (opts: AuthMethodOpts): Promise<Cacao> => {
      const siweMessage = new SiweMessage({
        domain: 'service.org',
        address: wallet.address,
        statement: 'I accept the ServiceOrg Terms of Service: https://service.org/tos',
        uri: opts.uri,
        version: '1',
        nonce: '1',
        issuedAt: (new Date()).toISOString(),
        chainId: '1',
        resources: [`${process.env.NEXT_PUBLIC_APP_DOMAIN}*`, "ceramic://*"],
      })
      const signature = await wallet.signMessage(siweMessage.toMessage())
      siweMessage.signature = signature
      
      const cacao = Cacao.fromSiweMessage(siweMessage)
      
      return cacao;
    }
    
    const session = await DIDSession.authorize(customAuthMethod, {
      resources: [`${process.env.NEXT_PUBLIC_APP_DOMAIN}*`, "ceramic://*"],
      // expiresInSecs: 60*60*24*7
       
    })
    
    burnerComposeClient.setDID(session.did)
    burnerCeramic.did = session.did
    return session.did;
  }

  const handlePactSign = async () => {
    if (!pact) return;
    // generate random wallet
    const signingAddress = burnerWallet || getRandomWallet() ;
    const did = await authBurnerClients(signingAddress)
    // get pact datas
    const { message, time } = formatMessage(pact);

    setTimestamp(time);
    // sign pact message
    const sig = await signingAddress.signMessage(message);
    
    await saveSignature(sig, time)
  }
  
  return (
    <div className="flex flex-col justify-around my-6 mx-4">
      <p className=" text-lg font-semibold text-neutral-700">Anon Signature</p>
      <p className="text-sm">Preserve your identity. A random account is generated.</p>
      <div className="divider"></div>
      <p className="text-sm font-bold pb-3">Bot protection</p>
      <Turnstile
        className=" w-20"
        sitekey={process.env.NEXT_PUBLIC_TURNS_SITE_KEY || ''}
        onVerify={(token) => setToken(token)}
      />
      <div className="divider"></div>
      <button 
        className="btn btn-primary"
        disabled={!token}
        onClick={handlePactSign}
      >
        Sign Petition
      </button>
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
