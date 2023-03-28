import { ReactNode } from 'react';
import { useAccount } from "wagmi";
import { ConnectButton as RainbowConnect } from '@rainbow-me/rainbowkit';
import { useCeramicContext } from "../../context";

export default function ConnectButton({ el }: {el?: ReactNode}) {
  const { isConnected, status } = useAccount();
  const { state: { isAuthenticated, isAuthenticating } } = useCeramicContext();
  
  if (!isConnected) {
    return (
      <RainbowConnect />
    )
  }
  if (isConnected && !isAuthenticated) {
    return <div className="btn">Connect ceramic</div>
  }

  return <>{el}</>
}
