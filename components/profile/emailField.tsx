import { useFormContext } from "react-hook-form"
import { PactProfile, PactProfileEncryptedLitContent } from "../../src/gql";
import { useEffect, useState } from "react";
import { useProfileContext } from "../../context/profile";
import Input from "../form/input";
import createProfile from "../../lib/updateProfile";
import { useCeramicContext } from "../../context";

export default function EmailField({
  profile,
  required
}: { 
  profile?: PactProfile;
  required?: boolean;
}) {
  const { watch, setValue, getValues, register, trigger, formState: { isValid } } = useFormContext();
  const { refreshProfile, encryptContent, decryptContent } = useProfileContext()
  const { ceramic } = useCeramicContext()
  const [current, setCurrent] = useState<string>()
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isEdit, setEdit] = useState<boolean>(!profile?.email)
  // const emailFields = register('email')
  // register('decryptedEmail')
  const decryptedEmail = watch('decryptedEmail')

  const encryptEmail = async (email: string) => {
    setLoading(true)
    const encryptedContent = await encryptContent('Email', email, {email}, [process.env.NEXT_PUBLIC_EMAIL_NOTIF_ADDRESS || 'notif-address']) as PactProfileEncryptedLitContent

    setValue('email', encryptedContent)
    setCurrent(decryptedEmail)
    setLoading(false)
    setEdit(false)
    return encryptedContent
  }

  const saveEmail = async () => {
    if (decryptedEmail && decryptedEmail !== current && isValid) {
      // if (!current) return
      try {
        const encryptedContent =  await encryptEmail(decryptedEmail)

        if (profile?.id) {
          await createProfile({
            id: profile?.id,
            email: encryptedContent
          }, ceramic);
        }
      } catch (error) {
        console.log('error', error)
      }

    }    
  }

  useEffect(() => {
    if (profile?.email && typeof profile.email !== 'string') {
      setLoading(true)

      decryptContent(profile.email).then((decryptedString) => {
        setValue('decryptedEmail', decryptedString.email)
        setCurrent(decryptedString.email)
        trigger()
        setLoading(false)
      })
    }
  }, [profile])

  // useEffect(() => {
  //   if (decryptedEmail && decryptedEmail !== current && isValid) {
  //     console.log('decryptedEmail effect')
  //     if (!current) return
  //     encryptEmail(decryptedEmail)
  //   }
  // }, [decryptedEmail, current, isValid])

  return (
    <>
    <input
      type="hidden"
      {...register('email.accessControlConditions')}
    ></input>
    <input
      type="hidden"
      {...register('email.encryptedString')}
    ></input>
    <input
      type="hidden"
      {...register('email.encryptedSymmetricKey')}
    ></input>
    <div
      className=" join"
    >
      <Input 
        label="email"
        id="decryptedEmail"
        placeholder="your email"
        disabled={isLoading || !isEdit}
        inputClassName="join-item"
        required={required !== undefined ? required : true}
        options={isEdit ? {
          required: required !== undefined ? required : true,
          validate: {
            maxLength: (v) =>
              v?.length <= 50 || "The email should have at most 50 characters",
            matchPattern: (v) =>
              /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
              "Email address must be a valid address",
          },
        } : {}}
      >
          {isLoading &&
            <div 
              className="btn join-item"
              // onClick={() => saveEmail()}
            >
              <span className="loading loading-spinner loading-sm"></span>
            </div>
          }
          {(!isLoading && !isEdit) && 
            <div 
              className="btn join-item"
              onClick={() => setEdit(true)}
            >
              <span 
                className="text-sm"
              >
                edit
              </span>
            </div>
          }
          {(!isLoading && isEdit) && 
            <div 
              className="btn join-item btn-secondary"
              onClick={() => saveEmail()}
            >
              <span 
                className="text-xs"
              >
                encrypt
              </span>
            </div>
          }
      </Input>
    </div>
    </>
  )
}
