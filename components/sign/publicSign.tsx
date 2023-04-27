import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useState } from "react";
import { useAccount, useSigner, useSignMessage } from "wagmi";
import { useCeramicContext } from "../../context";
import { usePactContext } from "../../context/pact";
import { authenticateCeramic } from "../../utils";
import { useViewContext } from "../signBox";
import VerifiedSign from "./verifiedSign";

export default function PublicSign() {
  const { address, connector, status } = useAccount()
  const { setView, previousView } = useViewContext()

  const { pact } = usePactContext()
  const [msg, setMsg] = useState<string>();
  const [ timestamp, setTimestamp ] = useState<Date | undefined>();
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: msg,
    onSuccess(data) {
      saveSignature(data);
    }
  });
  const { composeClient, ceramic } = useCeramicContext();
  const validatorDID = "did:key:z6MkmnaXQ9N85XjXFy57wie3uixawegPbQjsQxifL1VAjVVB";
  
  
  const saveSignature = async (data: string) => {
    // validity of pacto signature and compare with authenticated user
    if (!msg) return;
    // TODO: upload to ipfs using server api to not expose ipfs apis publicly
    try {
      // verify message
      const signerAddress = await ethers.utils.verifyMessage(
        `${msg}`,
        data
      );
  
      const jwe = await composeClient.did?.createDagJWE({
        timestamp: timestamp?.valueOf(),
        message: msg,
        signature: data,
      }, [composeClient.did.id]);
  
      // put the JWE into the ipfs dag with server side api
      // TODO: must be done serverside for not exposing ipfs api
      const response = await fetch('/api/pacts/sign', {
          method: 'POST',
          body: JSON.stringify({jwe}),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        }
      )
      if (response.status !== 200) {
        console.error('error adding a topic', response.status)
        return;
      }
  
      const {jweCid} = await response.json();
      console.log('jweCid', jweCid)
      const input = {
        content: {
          jwe: jweCid,
          signedAt: timestamp?.toISOString(),
          validator: validatorDID,
          pactID: pact?.id,
          visibility: 'public',
          pactVersion: pact?.version
        }
      };
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

      setView(<VerifiedSign/>);
    } catch (error) {
      console.log('error signature', error);
    }

  }

  const handleCeramicAuth = async () => {
    const provider = await connector?.getProvider();
    await authenticateCeramic(address, provider, ceramic, composeClient);
  }

  const handlePactSign = async () => {
    // check if user already signed

    // form the message
    const time = new Date();
    if(!timestamp) {
      setTimestamp(time);
    }
    const message = `I am signing in support of the following {pact?.type}:\n\ntitle: ${pact?.title}\n${pact?.type} content:\n${pact?.content.replace(/<[^>]+>/g, '')}\ncreated by:\n ${pact?.author?.id}\nsigned at:\n ${time.valueOf()}\n`;
    setMsg(message);

    // call wallet sign
    signMessage({
      message,
    });

  }


  if ( !address || status !== 'connected') {
    return (<ConnectButton/>);
  }
  if (!composeClient.did?.authenticated) {
    return (
      <div 
        className="btn btn-primary"
        onClick={handleCeramicAuth}
      >
        SignIn With Ethereum
      </div>
    );
  }

  
  return (
    <div className="flex flex-col justify-around my-6 mx-4">
      <p className=" text-lg font-semibold text-neutral-700">Public Signature</p>
      <p className="text-sm">encrypt and share with Pact.Social operator keys the secret used to sign.</p>
      <div className="divider"></div>
      <div 
        className="btn btn-primary"
        onClick={handlePactSign}
      >
        Sign Pact
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
  );
}
