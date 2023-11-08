import { Wallet } from "ethers";
import { useState } from "react";
import { newClients, useCeramicContext } from "../context";
import { usePactContext } from "../context/pact";
import { useProfileContext } from "../context/profile";
import { CreatePactSignatureInput, Mutation, PactSignatureVisibilityType } from "../src/gql";
import { useViewContext } from "../components/signBox";
import ShareView from "../components/sign/share";
import { AuthMethodOpts, Cacao, SiweMessage } from "@didtools/cacao";
import { DIDSession } from "did-session";
import { formatMessage } from "../lib/pact-utils";
import { useAccount } from "wagmi";
import VerifiedSign from "../components/sign/verifiedSign";

const {
  ceramic: burnerCeramic,
  composeClient: burnerComposeClient
} = newClients()

export default function useSignPact() {
  const { setView, previousView } = useViewContext()
  const { pact } = usePactContext()
  const { address, connector, status } = useAccount()
  const { composeClient, ceramic } = useCeramicContext()
  const { add, hasSigned } = useProfileContext()
  const [ timestamp, setTimestamp ] = useState<Date | undefined>();
  const [ burnerWallet, setBurner ] = useState<Wallet>();
  

  const saveAnonSignature = async (time: Date, token: string) => {
    try {
      const input: CreatePactSignatureInput = {
        content: {
          // signature: data,
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

  const signAnon = async (token: string) => {
    if (!pact) return;
    // generate random wallet
    const signingAddress = burnerWallet || getRandomWallet() ;
    const did = await authBurnerClients(signingAddress)
    // get pact datas
    const { time } = formatMessage(pact);

    setTimestamp(time);
    // sign pact message
    // const sig = await signingAddress.signMessage(message);
    
    await saveAnonSignature(time, token)
  }


  /**
   * 
   */
  const savePublicSignature = async (time: Date) => {
    try {
      // verify message
      // const signerAddress = await ethers.utils.verifyMessage(
      //   `${msg}`,
      //   data
      // );

      const input: CreatePactSignatureInput = {
        content: {
          // signature: data,
          signedAt: time?.toISOString(),
          pactID: pact?.id,
          visibility: PactSignatureVisibilityType.Public,
          pactVersion: pact?.version,
        }
      };
      const referral = localStorage.getItem(`ref_${pact?.id}`)
      if (referral) {
        const data = JSON.parse(referral)
        input.content.referral = data.ref
      }
      const res = await composeClient.executeQuery(`
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
      // if signed with pkp, skip gitcoin passport
      if (connector?.id === 'pkp') {
        setView(
          <>
            <ShareView/>
          </>
        );
        return
      }
      setView(
        <>
          <VerifiedSign/>
        </>
      );

    } catch (error) {
      console.log('error signature', error);
    }
  }

  const signPublic = async () => {
    // check if user already signed
    if (!pact) return;
    // form the message
    const { time } = formatMessage(pact);
    if(!timestamp) {
      setTimestamp(time);
    }
    // setMsg(message);

    // call wallet sign
    // signMessage({
    //   message,
    // });

    // create signature on ceramic
    await savePublicSignature(time);

  }

  return {
    signAnon,
    signPublic,
  }
}
