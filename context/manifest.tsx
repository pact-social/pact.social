import { createContext, ReactNode, useContext } from "react";
import useManifest from "../hooks/useManifest";
import { Manifest } from "../src/gql";

export const ManifestContext = createContext<{manifest?: Manifest}>({});

export const ManifestProvider = ({ 
  manifestId, 
  children 
}: {
  manifestId: string; 
  children: ReactNode
}) => {
  const {
    isLoading,
    error,
    data,
    mutate,
  } = useManifest({ __typename: "Manifest", stream: manifestId })
  return (
    <ManifestContext.Provider value={{manifest: data}}>
      {children}
    </ManifestContext.Provider>
  );
};

/**
 * Provide access to the Ceramic & Compose clients.
 * @example const { ceramic, compose } = useManifestContext()
 * @returns CeramicClient
 */

export const useManifestContext = () => useContext(ManifestContext);
