import { useMemo } from 'react';
import { emojiAvatarForAddress } from './emojiAvatarForAddress';
import useProfile from '../../hooks/useProfile';
import Image from 'next/image';
import { useEnsAvatar, useEnsName } from 'wagmi';

export default function EmojiAvatar({ 
  address,
  className,
  ensImage,
  size,
}: {
  address: string;
  className?: string;
  ensImage?: string | null;
  size?: number;
}) {
  const { color: backgroundColor, emoji } = useMemo(
    () => emojiAvatarForAddress(address),
    [address]
  );
  const { data: ensName } = useEnsName({
    address: address as `0x${string}`,
    chainId: 1,
  })
  const { data: ensAvatar } = useEnsAvatar({
    name: ensName,
    chainId: 1,
  })

  const { profile } = useProfile(`did:pkh:eip155:1:${address.toLowerCase()}`)
  return (
    <div
      className="avatar placeholder"
    >
      <div 
        className={"text-neutral-content items-center justify-center ".concat(size ? ` h-[${size.toString()}px] w-[${size.toString()}px] ` : className || ' rounded-full w-8 h-8 ')} style={{backgroundColor}}
        // className={"text-neutral-content ".concat(size ? ` h-full w-full ` : className || ' rounded-full w-8')} style={{backgroundColor}}
      >
        {profile?.profilePicture &&
          <Image 
            src={`${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/${profile.profilePicture}`}
            alt={address}
            height={120}
            width={120}
            className={className || 'rounded-full'}
          />
        }
        {!profile?.profilePicture &&
          <>
            {ensAvatar &&
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={ensAvatar}
              alt={address}
              // className={`h-[${size}px] w-[${size}px]`}
            />
            }
            {!ensAvatar &&
            <span className="block">{emoji}</span>
            }
          </>
        }
      </div>
    </div>
  )
}
