import { createContext, ReactNode, useContext } from "react"
import usePact from "../hooks/usePact"
import { Pact } from "../src/gql"

export const PactContext = createContext<{
  pact?: Pact,
  isLoading: boolean,
}>({ 
  isLoading: false 
});

export const PactProvider = ({ 
  pactId, 
  children 
}: {
  pactId: string; 
  children: ReactNode;
}) => {
  const {
    data,
    isLoading,
  } = usePact({ stream: pactId })

  return (
    <PactContext.Provider value={{pact: data, isLoading}}>
      {children}
    </PactContext.Provider>
  );
};

export const DraftPactProvider = ({
  pact,
  children,
}: {
  pact: Pact;
  children: ReactNode;
}) => {
  return (
    <PactContext.Provider value={{pact, isLoading: false}}>
      {children}
    </PactContext.Provider>
  )
}

export const usePactContext = () => useContext(PactContext)
