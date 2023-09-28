import { createContext, ReactNode, useContext, useEffect } from "react";
import { Lit } from "../lib/litUtils";

export const litClient = new Lit();
export const LitContext = createContext<{litClient: Lit;}>({
  litClient,
});

export const LitProvider = ({
  children 
}: {
  children: ReactNode
}) => {
  return (
    <LitContext.Provider value={{ litClient }}>
      {children}
    </LitContext.Provider>
  );
};

export const useLitContext = () => useContext(LitContext);
