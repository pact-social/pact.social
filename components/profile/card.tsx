import { useCeramicContext } from "../../context";
import { useProfileContext } from "../../context/profile";
import useGetName from "../../hooks/useGetName";
import { CeramicAccount } from "../../src/gql";
import { getAddressFromDid, shortAddress } from "../../utils";
import EmojiAvatar from "../avatar/emojiAvatar";
import { useViewContext } from "../viewBox";
import ProfilEditForm from "./editForm";
// import OrbisCredentials from "../user/credentials"

export default function ProfileCard() {
  const { state: { did }} = useCeramicContext();
  const { profile } = useProfileContext()
  const address = getAddressFromDid(did?.parent).address || 'anon';
  const { setView } = useViewContext()
  const name = useGetName({ pactProfile: profile } as CeramicAccount, address, did?.parent)

  return (
    <div className="bg-base-100 rounded-box mx-2 flex flex-col flex-shrink-0 gap-4 p-4 py-8 shadow-xl xl:mx-0 xl:w-full place-items-center items-center">
      <div className="avatar">
        <EmojiAvatar address={address} className="mask mask-squircle h-24 w-24 text-4xl" />
      </div>
      <div className="text-lg font-extrabold">
        {name}
      </div>
      {/* <OrbisCredentials did={'t'} /> */}
      <div className="text-sm text-base-content/70 text-center whitespace-pre-wrap">
        {profile?.bio && 
          <>{profile.bio}</>
        }
        {!profile?.bio &&
          <>You don&apos;t have a bio yet.<br/>Complete your profile</>
        }
      </div>
      <button
        className="btn btn-outline"
        onClick={() => setView(
          <div className="bg-base-100 rounded-box mx-2 flex flex-col w-full flex-shrink-0 gap-4 p-4 py-8 shadow-xl xl:mx-0 xl:w-full place-items-center items-center">
            <ProfilEditForm profile={profile} />
          </div>
        )}
      >
        Edit
      </button>
    </div>
  )
}
