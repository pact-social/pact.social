import { ReactNode } from 'react';
import { useAccount } from "wagmi";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useCeramicContext } from "../../context";
import useAuthCeramic from '../../hooks/useAuthCeramic';

export default function ConnectButton({ 
  el,
  label,
}: {
  el?: ReactNode;
  label?: string;
}) {
  const {connectCeramic} = useAuthCeramic()
  const { isConnected, address } = useAccount()
  const { state: { isAuthenticated, isAuthenticating } } = useCeramicContext();
  const { openConnectModal } = useConnectModal();

  if (!isConnected) {
    return (
      <>
        {openConnectModal && (
          <button onClick={openConnectModal} type="button" className="btn btn-secondary">
            {label || 'Connect'}
          </button>
        )}
      </>
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
