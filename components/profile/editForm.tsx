import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { PactProfile, PactProfileEncryptedLitContent } from "../../src/gql";
import createProfile from "../../lib/updateProfile";
import { useCeramicContext } from "../../context";
import ConnectButton from "../connect";
import { useViewContext } from "../viewBox";
import CountrySelect from "../form/countrySelect";
import SubmitButton from "../form/submitButton";
import { useProfileContext } from "../../context/profile";
import Input from "../form/input";
import { useRef } from "react";
import EmailField from "./emailField";
import Image from "next/image";
import EmojiAvatar from "../avatar/emojiAvatar";
import { useAccount } from "wagmi";

export default function ProfilEditForm({ 
  profile
}: {
  profile?: PactProfile
}) {

  const ref = useRef<HTMLInputElement>(null);
  const { ceramic } = useCeramicContext()
  const { previousView } = useViewContext()
  const { address } = useAccount()
  const methods = useForm<PactProfile & { decryptedEmail?: string }>({
    defaultValues: profile ? {...profile} : {}
  })
  const { register, handleSubmit, watch, setValue, getValues, formState: { errors }, reset } = methods
  const { refreshProfile, encryptContent, decryptContent } = useProfileContext()

  watch('email')
  watch('profilePicture')

  // useEffect(() => {
  //   if (profile?.email && typeof profile.email !== 'string') {
  //     console.log('decrypting string', profile.email, profile)
  //     decryptContent(profile.email).then((decryptedString) => {
  //       console.log('decrypted string', decryptedString)
  //       setValue('email', decryptedString.email)
  //     })
  //   } else {
  //     console.log('profile decrypt missed', profile)
  //   }
  // }, [profile])

  const onSubmit: SubmitHandler<PactProfile & { decryptedEmail?: string }> = async (data) => {
    try {
      // @TODO fix cannot edit after saving without email
      if (data.email && typeof data.email === 'string' && data.email !== profile?.email) {
        const encryptedContent = await encryptContent(
          'Email', 
          data.email,
          {email: data.email},
          [process.env.NEXT_PUBLIC_EMAIL_NOTIF_ADDRESS || '']
        ) as PactProfileEncryptedLitContent
        data.email = encryptedContent
      }
      const { decryptedEmail, ...rest} = data
      await createProfile(rest, ceramic);
      if (refreshProfile) refreshProfile()
      previousView()
    } catch (error) {
      console.log('error', error)
    }
  }

  const handleFileUpload = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result as string;
      img.onload = () => {
        if (img.width < 1200 || img.height < 825) {
          // alert("The image should be at least 1200x825 pixels");
        } else {
          // setImage({ file, url: reader.result as string });
        }
      };
    };

    const formData = new FormData();
    formData.append("fileInput", file);

    const res = await fetch(
      `/api/media/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    const { url: item, cid } = await res.json();
    setValue('profilePicture', cid)
    return { item, cid, type: file.type, cover: item }
  }

  const handleFilesUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = ref?.current?.files?.item(0)

    if (ref?.current?.files) {
      const promises = []
      for (const fileItem of ref?.current?.files) {
        promises.push(handleFileUpload(fileItem))
      }
      const res = await Promise.all(promises);
    }
  }

  return (
    <>
      <div
        className="relative flex flex-col items-center w-full"
      >
        <span className=" text-sm pb-3 self-start">Profile picture</span>
        <input 
          ref={ref} 
          id="fileInput"
          type="file"
          onChange={handleFilesUpload} 
          className="file-input w-full file-input-bordered file-input-ghost hidden"
        />
        <label htmlFor="fileInput" className="relative h-28 w-28 after:content-['Edit'] after:z-10 after:absolute after:left-1/2 after:-translate-x-1/2 after:top-1/2 after:-translate-y-1/2 after:text-white after:px-2 after:rounded-xl after:bg-slate-600/75 after:text-sm">
        {getValues().profilePicture &&
          <Image
            src={`${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/${getValues().profilePicture}`}
            alt=""
            fill
            objectFit="cover"
            className="rounded-full h-28 w-28 hover:opacity-80 hover:animate-pulse"
          />
        }
        {!getValues().profilePicture &&
          <EmojiAvatar 
            address={address as `0x${string}`}
            className="w-28 text-4xl rounded-full"
          />
        }
        </label>
      </div>
      <FormProvider {...methods} >
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-row gap-2 w-full">
          <input
            type="text"
            hidden
            {...register('profilePicture', {required: false})}
          />
          <div className="formControl">
            <label htmlFor="name" className="label cursor-pointer">
              <span className="label-text">name</span>
            </label>
            <input 
              id="name"
              type="text" 
              className={`input input-bordered w-full max-w-xs${errors?.name && 'input-error'}`}
              placeholder="your name"
              {...register('name', {required: false, maxLength: 100})}
            />
            {errors?.name && 
              <label className="label">
                <span className="label-text-alt ">name max length is 100</span>
              </label>
            }
          </div>

          <div className="formControl">
            <label htmlFor="bio" className="label cursor-pointer">
              <span className="label-text">bio</span>
            </label>
            <textarea 
              id="bio" 
              className={`textarea textarea-bordered w-full max-w-xs${errors.bio && 'input-error'}`}
              placeholder="your bio"
              {...register('bio', {required: false, maxLength: 200})}
            />
            {errors.bio && 
              <label className="label">
                <span className="label-text-alt ">bio max length is 200</span>
              </label>
            }
          </div>
          
          <div className="formControl">
            <label htmlFor="title" className="label cursor-pointer">
              <span className="label-text">your title</span>
            </label>
            <input 
              id="title" 
              type="text" 
              className={`input input-bordered w-full max-w-xs${errors.title && 'input-error'}`}
              placeholder="your title"
              {...register('title', {required: false, maxLength: 100})}
            />
            {errors.title && 
              <label className="label">
                <span className="label-text-alt ">title max length is 100</span>
              </label>
            }
          </div>

          <div className="formControl">
            <label htmlFor="organisation" className="label cursor-pointer">
              <span className="label-text">organisation</span>
            </label>
            <input 
              id="organisation" 
              type="text" 
              className={`input input-bordered w-full max-w-xs${errors.organisation && 'input-error'}`}
              placeholder="your organisation"
              {...register('organisation', {required: false, maxLength: 100})}
            />
            {errors.organisation && 
              <label className="label">
                <span className="label-text-alt ">organisation max length is 100</span>
              </label>
            }
          </div>

          <CountrySelect />
          
          <div className="formControl">
            <label htmlFor="city" className="label cursor-pointer">
              <span className="label-text">city</span>
            </label>
            <input 
              id="city" 
              type="text" 
              className={`input input-bordered w-full max-w-xs${errors.city && 'input-error'}`}
              placeholder="your city"
              {...register('city', {required: false, maxLength: 100})}
            />
            {errors.city && 
              <label className="label">
                <span className="label-text-alt ">country max length is 100</span>
              </label>
            }
          </div>
          <EmailField 
            required={false}
            profile={profile}
          />
          <div className="divider"></div>
          <div className="formControl flex justify-between">
            <ConnectButton el={
              <>
                <button className="btn btn-outline" onClick={() => previousView()}>Cancel</button>
                <SubmitButton name="Submit" className="btn-secondary" />
              </>
            } />
          </div>
        </form>
      </FormProvider>
    </>
  )
}
