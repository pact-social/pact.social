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
      <div onClick={connectCeramic} className={`btn btn-secondary ${isAuthenticating ? 'disabled' : ''}`}>
        {isAuthenticating &&
          <span className="loading loading-spinner"></span>
        }
        {isAuthenticating && 'Please sign in your wallet'}
        {!isAuthenticating && 'sign'}
      </div>

    )
  }

  return <>{el}</>
}
