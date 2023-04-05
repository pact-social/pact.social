import { ReactNode } from 'react';
import { useAccount } from "wagmi";
import { ConnectButton as RainbowConnect } from '@rainbow-me/rainbowkit';
import { useCeramicContext } from "../../context";
import useAuthCeramic from '../../hooks/useAuthCeramic';

export default function ConnectButton({ el }: {el?: ReactNode}) {
  const {connectCeramic} = useAuthCeramic()
  const { isConnected } = useAccount();
  const { state: { isAuthenticated, isAuthenticating } } = useCeramicContext();
  
  
  if (!isConnected) {
    return (
      <RainbowConnect />
    )
  }
  if (isConnected && !isAuthenticated) {
    return (
      <div onClick={connectCeramic} className={`btn ${isAuthenticating && 'loading disabled'}`}>
        {isAuthenticating && 'Please sign!'}
        {!isAuthenticating && 'Connect ceramic'}
      </div>

    )
  }

  return <>{el}</>
}
