import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Input from "../form/input";
import { useViewContext } from "../signBox";
import SubmitButton from "../form/submitButton";
import { useAccount } from "wagmi";
import ConnectButton from "../connect";
import ShareView from "./share";
import useProfile from "../../hooks/useProfile";
import { useCeramicContext } from "../../context";
import { useEffect, useState } from "react";
import { useProfileContext } from "../../context/profile";
import createProfile from "../../lib/updateProfile";
import useSignPact from "../../hooks/useSignPact";
import Turnstile from "react-turnstile";
import EmailField from "../profile/emailField";
import { subscribeToPact } from "../../lib/subscription";
import { Mutation } from "../../src/gql";
import { usePactContext } from "../../context/pact";

const DescriptionButton = ({
  title,
  description,
  onClick,
}: {
  title: string;
  description: string;
  onClick: () => void;
}) => {
  return (
    <div 
      className="btn btn-outline px-4 py-3 h-auto justify-start text-left shadow"
      onClick={onClick}
      >
        <div className="">
          <p className="text-sm">{title}</p>
          <p className="text-xs text-neutral-400 capitalize font-normal">{description}</p>
        </div>
    </div>
  );
}

interface SignInput {
  name?: string;
  email?: string;
  anon: boolean;
  subscribe: boolean;
  turnToken?: string;
}

export default function Sign () {
  // const { address, connector, status } = useAccount()
  const { composeClient, ceramic } = useCeramicContext();
  const { profile, refreshProfile, refreshSignatures, add } = useProfileContext()
  // const { profile } = useProfile(composeClient.did?.parent || '')
  // const { setView, previousView } = useViewContext()

  const defaultValues: SignInput = {
    anon: false,
    subscribe: false,
  }
  
  const { signPublic, signAnon } = useSignPact()
  const { pact } = usePactContext()
  
  const methods = useForm<SignInput & { decryptedEmail?: string }>({
    defaultValues: {
      ...defaultValues,
      // load localstorage or profile if connected
    }
  });
  const { register, handleSubmit, trigger, watch, setValue, getValues, formState: { errors } } = methods
  
  watch('anon')
  watch('name')
  watch('subscribe')
  watch('turnToken')
  
  const onSubmit: SubmitHandler<SignInput & { decryptedEmail?: string }> = async (data) => {
    // update profile if name changed
    if (data.name !== profile?.name && !data.anon) {
      const res = await createProfile({
        ...profile,
        id: profile?.id as string,
        name: data.name,
      }, ceramic);
      if (refreshProfile) {
        refreshProfile()
      }
    }
    // share notif recipient and method
    if (data.decryptedEmail && add && data.subscribe) {
      const recipients = [pact?.author?.id || '', process.env.NEXT_PUBLIC_EMAIL_NOTIF_ADDRESS || '']

      const encryptedContent = await add('Email', data.decryptedEmail, data.decryptedEmail, recipients)

      const { data: res } = encryptedContent
      const recipientId = res?.createPrivateStore?.document.id
      // add subscription
      if (data.subscribe && pact?.id && recipientId) {
        const res = await composeClient.executeQuery<Mutation>(subscribeToPact(), {
            input: {
              content: {
                archived: false,
                createdAt: (new Date()).toISOString(),
                pactID: pact.id,
                recipientID: recipientId,
              }
            }
        })
      }
    }
    // submit signature
    if (data.anon) {
      if (!data.turnToken) throw new Error('no turnstile token')
      // sign anon
      await signAnon(data.turnToken)
      refreshSignatures(false)
    } else {
      // sign public
      await signPublic()
      refreshSignatures(true)

    }

    // setView(<ShareView/>)
  }
  useEffect(() => {
    if (profile?.name) {
      setValue('name', profile.name)
      trigger(['name'])
    }

  }, [profile])

  return (
    <div className="flex flex-col justify-around">
    {/* <div className="flex flex-col justify-around my-6 mx-4"> */}
      {/* <div>

      </div>
      <p className=" text-lg font-semibold text-neutral-700">Support</p>
      <div className="divider"></div> */}
      <FormProvider {...methods} >
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-row gap-12">
          <div className="flex flex-col gap-4 ">
            {/* <div className="form-control">
              <div className="alert justify-start gap-4">
                <input 
                  type="checkbox"
                  className="checkbox" 
                  {...register('anon', {})}
                />
                <span className="label-text">sign anonymously</span>
              </div>
            </div> */}
            {!getValues().anon &&
              <Input 
                label="Your name"
                placeholder="type here"
                id="name"
                required
                size="sm"
              />
            }
            
            {/* <div 
              className="btn btn-primary"
              // onClick={handlePactSign}
            >
              Sign Pact
            </div> */}
            
            <ConnectButton 
              el={
                <SubmitButton name="Sign Pact" className=" btn-secondary" />
              } 
              label="Connect to sign"
            />
            
            <div className="form-control">
              <div className="flex justify-start gap-3">
                <input 
                  type="checkbox"
                  className="checkbox checkbox-sm" 
                  {...register('anon', {})}
                />
                <span className="label-text">sign anonymously</span>
              </div>
            </div>
            {getValues().anon && 
            <>
              <input 
                type="hidden"
                {...register('turnToken', { required: true})}
              />
              <Turnstile
                className=" w-20"
                size="compact"
                sitekey={process.env.NEXT_PUBLIC_TURNS_SITE_KEY || ''}
                onVerify={(token) => {
                  setValue('turnToken', token)
                  trigger(['turnToken'])
                }}
              />
            </>
            }
            
            <div className="form-control">
              <div className="flex justify-start gap-3">
                <input 
                  type="checkbox"
                  className="checkbox checkbox-sm" 
                  {...register('subscribe', {})}
                />
                <span className="label-text">stay informed</span>
              </div>
              {getValues().subscribe &&
                <EmailField 
                  profile={profile}
                />
              }
            </div>
            {/* {(!composeClient.did?.authenticated) &&
                <div 
                  className="btn btn-primary"
                  onClick={handleCeramicAuth}
                >
                  SignIn With Ethereum
                </div>
              );
            } */}
            
            {/* <DescriptionButton 
              onClick={() => (null)}
              title="Public"
              description="Your signature document is public"
            /> */}
            {/* <DescriptionButton 
              onClick={privateSign}
              title="Private"
              description="You trust pact.social to hide your identity while verifying your signature"
            /> */}
            {/* <DescriptionButton 
              onClick={() => (null)}
              title="Anon"
              description="You generate a new random wallet that will only be used once"
            /> */}
          </div>
        </form>
      </FormProvider>
      {/* <div className="divider"></div>
      <div className=" self-start">
        <div
          className="btn"
          onClick={previousView}
        >
          Back
        </div>
      </div> */}
    </div>
  )
}
