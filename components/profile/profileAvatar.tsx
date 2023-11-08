import { useAccount } from "wagmi"
import EmojiAvatar from "../avatar/emojiAvatar"
import useGetName from "../../hooks/useGetName";

export default function ProfileAvatar({
  address,
  name,
  size
}: {
  address?: string | null;
  name?: string;
  size?: string;
}) {
  const { address: currentAddress } = useAccount()

  if (!address && !currentAddress) {
    return <></>
  }
  // const address = null
  const sizeClasses = !size 
    ? 'h-24 w-24 text-4xl'
    : size === 'sm' 
      ? 'h-12 w-12 text-2xl'
      : 'h-9 w-9 text-lg'
  return (
    <div className="flex flex-row gap-3">
      <div className="avatar">
        <div className="w-12 h-fit rounded">
        <EmojiAvatar address={address || currentAddress as string} className={`mask mask-squircle ${sizeClasses}`} />
          {/* <img src="https://images.unsplash.com/photo-1585066699728-a56ef32a992b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80" alt="Tailwind-CSS-Avatar-component" /> */}
        </div>
      </div>
      <div>
        <h5 className="font-semibold">{ name }</h5>
        <p className="text-xs">Profile</p>
      </div>
    </div>
  )
}
