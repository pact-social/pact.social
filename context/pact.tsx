import { createContext, ReactNode, useContext } from "react";
import usePact from "../hooks/usePact";
import { Pact } from "../src/gql";

export const PactContext = createContext<{pact?: Pact}>({});

export const PactProvider = ({ 
  pactId, 
  children 
}: {
  pactId: string; 
  children: ReactNode
}) => {
  const {
    data,
  } = usePact({ stream: pactId })

  return (
    <PactContext.Provider value={{pact: data}}>
      {children}
    </PactContext.Provider>
  );
};

export const usePactContext = () => useContext(PactContext);
