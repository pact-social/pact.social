import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import CeramicModal from "../components/authentication/ceramicModal";
import { useCeramicContext } from ".";
import useAuthCeramic from "../hooks/useAuthCeramic";
import { useAccount } from "wagmi";
import LitModal from "../components/authentication/litModal";
import { useLitContext } from "./lit";
import StytchModal from "../components/authentication/stytchModal";

export function useModalStateValue() {
  const [isModalOpen, setModalOpen] = useState(false);

  return {
    closeModal: useCallback(() => setModalOpen(false), []),
    isModalOpen,
    openModal: useCallback(() => setModalOpen(true), []),
  };
}

interface AuthenticationContextValue {
  litModalOpen: boolean;
  ceramicModalOpen: boolean;
  openLitModal?: () => void;
  openCeramicModal?: () => void;
}

export const AuthenticationContext = createContext<AuthenticationContextValue>({
  litModalOpen: false,
  ceramicModalOpen: false,
});

export const AuthenticationProvider = ({
  children
}: {
  children: ReactNode
}) => {

  const { state: { isAuthenticated, isAuthenticating } } = useCeramicContext()
  const { logout: logoutCeramic, restoreSession } = useAuthCeramic()
  const { restore: restoreLit, logout: logoutLit, isConnected: isLitConnected, isLoading: isLitLoading} = useLitContext()

  const { isConnected, address } = useAccount({
    async onDisconnect() {
      logoutCeramic()
      logoutLit()
      closeCeramicModal()
    },
  });
  const [ currentAddress, setCurrentAddress] = useState<string>(address as string);

  const {
    closeModal: closeCeramicModal,
    isModalOpen: ceramicModalOpen,
    openModal: openCeramicModal,
  } = useModalStateValue()
  
  const {
    closeModal: closeLitModal,
    isModalOpen: litModalOpen,
    openModal: openLitModal,
  } = useModalStateValue()
  
  const {
    closeModal: closeStytchModal,
    isModalOpen: litStytchOpen,
    openModal: openStytchModal,
  } = useModalStateValue()

  useEffect(() => {
    if (isConnected && address && !isAuthenticated && !isAuthenticating) {
      restoreSession().then(isRestored => {
        if(!isRestored) openCeramicModal()
      })
    }
  }, [
    address,
    isAuthenticated,
    isAuthenticating,
    isConnected,
    restoreSession,
    openCeramicModal
  ])
  
  useEffect(() => {
    if (isConnected && address && isAuthenticated && !isLitConnected && !isLitLoading) {
      restoreLit().then(isRestored => {
        if(!isRestored) openLitModal()
      })
    }
  }, [
    isConnected,
    address,
    isAuthenticated,
    isLitConnected,
    isLitLoading,
    openLitModal,
    restoreLit
  ])

  const switchAccount = useCallback(() => {
    logoutCeramic()
    logoutLit()
    closeCeramicModal()
  }, [currentAddress])

  useEffect(() => {
    if (address && currentAddress && address !== currentAddress) {
      switchAccount()
      setCurrentAddress(address)
    }
  }, [address])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('stytch') === 'open' ) {
      openStytchModal()
    }
  }, [])

  return (
    <AuthenticationContext.Provider value={useMemo(
      () => ({
        litModalOpen,
        ceramicModalOpen,
        openCeramicModal: isConnected ? openCeramicModal : undefined,
        openLitModal: isAuthenticated ? openLitModal : undefined,
        }),
        [ceramicModalOpen, isAuthenticated, isConnected, litModalOpen, openCeramicModal, openLitModal, closeStytchModal, litStytchOpen]
      )}
      >
      {children}
      <CeramicModal onClose={closeCeramicModal} open={ceramicModalOpen} />
      <LitModal onClose={closeLitModal} open={litModalOpen} />
      <StytchModal onClose={closeStytchModal} open={litStytchOpen} />
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);
