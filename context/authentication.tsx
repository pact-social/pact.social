import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import CeramicModal from "../components/authentication/ceramicModal";
import { useCeramicContext } from ".";
import useAuthCeramic from "../hooks/useAuthCeramic";
import useLit from "../hooks/useLit";
import { useAccount } from "wagmi";
import LitModal from "../components/authentication/litModal";

function useModalStateValue() {
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
  const { restoreLit, logoutLit, isConnected: isLitConnected, isLoading: isLitLoading } = useLit()

  const { isConnected, address } = useAccount({
    async onDisconnect() {
      logoutCeramic()
      logoutLit()
      closeCeramicModal()
    },
  });

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

  return (
    <AuthenticationContext.Provider value={useMemo(
      () => ({
        litModalOpen,
        ceramicModalOpen,
        openCeramicModal: isConnected ? openCeramicModal : undefined,
        openLitModal: isAuthenticated ? openLitModal : undefined,
        }),
        [ceramicModalOpen, isAuthenticated, isConnected, litModalOpen, openCeramicModal, openLitModal]
      )}
      >
      {children}
      <CeramicModal onClose={closeCeramicModal} open={ceramicModalOpen} />
      <LitModal onClose={closeLitModal} open={litModalOpen} />
    </AuthenticationContext.Provider>
  );
};

export const useAuthenticationContext = () => useContext(AuthenticationContext);
