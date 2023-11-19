import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";
import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";
import { useCeramicContext } from "../../context";
import { usePactContext } from "../../context/pact";
import { authenticateCeramic } from "../../utils";
import { useViewContext } from "../signBox";
import VerifiedSign from "./verifiedSign";
import { formatMessage } from "../../lib/pact-utils";
import { CreatePactSignatureInput, PactSignatureVisibilityType } from "../../src/gql";
import ShareView from "./share";

export default function PublicSign() {
  const { address, connector, status } = useAccount()
  const { setView, previousView } = useViewContext()

  const { pact } = usePactContext()
  const [msg, setMsg] = useState<string>();
  const [ timestamp, setTimestamp ] = useState<Date | undefined>();
  // const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
  //   message: msg,
  //   onSuccess(data) {
  //     saveSignature(data);
  //   }
  // });
  const { composeClient, ceramic } = useCeramicContext();
  
  const saveSignature = async (time: Date) => {
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

  const handleCeramicAuth = async () => {
    const provider = await connector?.getProvider();
    await authenticateCeramic(address, provider, ceramic, composeClient);
  }

  const handlePactSign = async () => {
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
    await saveSignature(time);

  }


  if ( !address || status !== 'connected') {
    return (
      <div className="flex flex-col justify-around my-6 mx-4 items-center">
        <ConnectButton label="Connect"/>
      </div>
    );
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
      <p className="text-sm">Give the maximum impact to your voice by making your signature verifiable and public.</p>
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
