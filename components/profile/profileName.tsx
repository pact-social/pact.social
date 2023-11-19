import { useEnsAvatar, useEnsName } from "wagmi";
import useProfile from "../../hooks/useProfile";
import { shortAddress } from "../../utils";

export default function ProfileName ({
  address
}: {
  address: `0x${string}`;
}) {
  const { data: ensName } = useEnsName({
    address,
    chainId: 1,
  })

  const { profile } = useProfile(`did:pkh:eip155:1:${address.toLowerCase()}`)
  return (
    <>
      {profile?.name && 
      <>{profile?.name}</>
      }
      {!profile?.name &&
      <>
        {ensName && ensName}
        {!ensName && shortAddress(address)}
      </>
      }
    </>
  )
}
