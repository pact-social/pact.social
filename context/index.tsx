import { createContext, Dispatch, useContext, useReducer } from "react";
import { CeramicClient } from "@ceramicnetwork/http-client"
import type { ComposeClient } from "@composedb/client";
import { DID } from "dids";

import { composeClient as composeClientInstance } from "../lib/composeClient";

type State = {
  ceramic: CeramicClient;
  composeClient: ComposeClient;
  did?: DID;
  isAuthenticating: boolean;
  isAuthenticated: boolean;
}

type Action =
 | { type: 'logout' }
 | { type: 'setDID', payload: { did?: DID } }
 | { type: 'toggleIsAuthenticating'}

/**
 * Configure ceramic Client & create context.
 */
export const ceramic = new CeramicClient(process.env.NEXT_PUBLIC_CERAMIC || "http://localhost:7007");

export const composeClient = composeClientInstance;


const initialState = {
  ceramic: ceramic,
  composeClient: composeClient,
  isAuthenticating: false,
  isAuthenticated: false
}
const CeramicContext = createContext<{
  state: State
  dispatch: Dispatch<Action>
  ceramic: CeramicClient
  composeClient: ComposeClient
}>({ 
  state: initialState,
  dispatch: () => null,
  ceramic,
  composeClient,

});


const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'logout':
      return initialState;
    case "setDID":
      return { 
        ...state, 
        did: action.payload.did,
        isAuthenticated: true,
        isAunthenticating: false,
      };
    case "toggleIsAuthenticating":
      return { 
        ...state, 
        isAuthenticating: !state.isAuthenticating 
      };
  }
}

export const CeramicWrapper = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { 
    state,
    dispatch,
    ceramic,
    composeClient
  };
  return (
    <CeramicContext.Provider value={value}>
      {children}
    </CeramicContext.Provider>
  );
};

/**
 * Provide access to the Ceramic & Compose clients.
 * @example const { ceramic, compose } = useCeramicContext()
 * @returns CeramicClient
 */

export const useCeramicContext = () => useContext(CeramicContext);
