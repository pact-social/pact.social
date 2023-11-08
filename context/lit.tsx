import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { Lit } from "../lib/litUtils";
import { useCeramicContext } from ".";
import { Store } from '../lib/store';
import { useAccount } from "wagmi";

interface LitClientContext {
  litClient: Lit;
  isConnected: boolean;
  isLoading: boolean;
  connect: () => Promise<Lit | undefined>;
  restore: () => Promise<boolean>;
  logout: () => Promise<void>;
}

export const litClient = new Lit();

const defaultContext = {
  isConnected: false,
  isLoading: false,
  litClient,
  connect: async () => undefined,
  restore: async () => false,
  logout: async () => {},
}
export const LitContext = createContext<LitClientContext>(defaultContext);

export const LitProvider = ({
  children 
}: {
  children: ReactNode
}) => {
  const { address, connector } = useAccount()
  const [ isLoading, setLoading ] = useState(false)
  const [ isConnected, setConnected ] = useState(false)
  const { state: { isAuthenticated } } = useCeramicContext()
  
  useEffect(() => {
    if (!isAuthenticated) {
      setConnected(false)
      setLoading(false)
    }
  }, [isAuthenticated])


  async function connect() {
    setLoading(true)
    if (!litClient.getClient().ready) await litClient.connect()
    const provider = await connector?.getProvider();

    const store = new Store()
    try {
      const auth = await Lit.getAuthSig(store);

      if ((auth?.address.toLowerCase() !== address?.toLowerCase() && provider) || !litClient.isValid(auth)) {
        throw new Error('invalid lit auth')
      }
      setLoading(false)
      setConnected(true)
      return litClient

    } catch(error: any) {
      try {
        if (address && provider) {
          await litClient.generateLitSignatureV2(provider, address.toLowerCase(), 'ethereum', store)
        }
        setLoading(false)
        setConnected(true)
        return litClient
      } catch (error) {
        setLoading(false)
      }
    }
  }

  const restore = async () => {
    setLoading(true)
    setConnected(false)
    const store = new Store()
    try {
      const authSig = await Lit.getAuthSig(store);
      if(authSig?.address.toLowerCase() !== address?.toLowerCase() || !litClient.isValid(authSig)) {
        setLoading(false)
        throw new Error('auth invalid')
      }
      // setLoading(false)
      setConnected(true)
      return true
    } catch (error) {
      setConnected(false)
      setLoading(false)
      return false
    }
  }

  const logout = async () => {
    try {
      setLoading(false)
      setConnected(false)
      await litClient.disconnect()
    } catch (error) {
      console.log('ERROR lit logout')
    }
  }

  return (
    <LitContext.Provider value={
      {
        litClient,
        isLoading,
        isConnected,
        connect,
        restore,
        logout,
      }
    }
    >
      {children}
    </LitContext.Provider>
  );
};

export const useLitContext = () => useContext(LitContext);
