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
    data,
  } = useManifest({ stream: manifestId })

  return (
    <ManifestContext.Provider value={{manifest: data}}>
      {children}
    </ManifestContext.Provider>
  );
};

export const useManifestContext = () => useContext(ManifestContext);
