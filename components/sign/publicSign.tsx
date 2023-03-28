import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useState } from "react";
import { useAccount, useSigner, useSignMessage } from "wagmi";
import { useCeramicContext } from "../../context";
import { useManifestContext } from "../../context/manifest";
import { authenticateCeramic } from "../../utils";
import { useViewContext } from "../signBox";
import * as IPFS from 'ipfs-http-client';

export default function PublicSign() {
  const { address, connector, status } = useAccount()
  const { setView, previousView } = useViewContext()
  console.log('private sign address', address)
  const signer = useSigner()
  const { manifest } = useManifestContext()
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

  const ipfs = IPFS.create({url: 'http://localhost:5011/api/v0'});

  const saveSignature = async (data: string) => {
    console.log('saveSignature', data);
    // validity of manifesto signature and compare with authenticated user
    if (!msg) return;
    const signerAddress = await ethers.utils.verifyMessage(
      `${msg} -wlEHFLWgelgefljgqefljgweq`,
      data
    );
    console.log('recovered signer address', signerAddress);

    const jwe = await composeClient.did?.createDagJWE({
      timestamp: timestamp?.valueOf(),
      message: msg,
      signature: data,
    }, [composeClient.did.id, validatorDID]);

    // put the JWE into the ipfs dag
    const jweCid = await (await ipfs).dag.put(jwe, {
      storeCodec: 'dag-jose',
      hashAlg: 'sha2-256',
    });

    console.log('jwe', jwe, jweCid);

    const input = {
      content: {
        jwe: jweCid,
        createdAt: timestamp?.toISOString(),
        validator: validatorDID,
        manifestID: manifest?.id
      }
    };

    try {
      const res = await composeClient.executeQuery(`
      mutation RecordSignature($input: CreateManifestSignatureInput!) {
        createManifestSignature(input: $input) {
          clientMutationId
          document {
            id
          }
        }
      }
      `, {
        input
      });
      console.log('signature saved', res);
    } catch (error) {
      console.log('error signature', error);
    }

  }

  const handleCeramicAuth = async () => {
    const provider = await connector?.getProvider();
    await authenticateCeramic(address, provider, ceramic, composeClient);
  }

  const handlePetitionSign = async () => {
    // check if user already signed
    console.log('manifest', manifest);
    // form the message
    const time = new Date();
    if(!timestamp) {
      setTimestamp(time);
    }
    const message = `I am signing in support of the following petition:\n\ntitle: ${manifest?.title}\npetition content:\n${manifest?.content}\ncreated by:\n ${manifest?.author?.id}\nsigned at:\n ${time.valueOf()}\n`;
    setMsg(message);

    // call wallet sign
    signMessage({
      message,
    });

    console.log('message signed', data);
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
  );
}
