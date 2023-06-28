import { Lit } from '../lib/litUtils';
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { Store } from '../lib/store';
import { useLitContext } from '../context/lit';


export default function useLit() {
  const { address, connector } = useAccount()
  const [ isLoading, setLoading ] = useState(false);
  const [ error, setError ] = useState<any>();
  const [ isConnected, setConnected ] = useState(false)
  const { litClient } = useLitContext()

  async function connectLit() {
    setLoading(true)
    if (!litClient.getClient().ready) await litClient.connect()

    const provider = await connector?.getProvider();

    const store = new Store()
    try {
      const auth = await Lit.getAuthSig(store);
      if ((auth.address !== address?.toLowerCase() && provider) || !litClient.isValid(auth)) {
        throw new Error('invalid lit auth')
      }
      setLoading(false)
      setConnected(true)
      return litClient

    } catch(error: any) {
      if (address && provider) {
        await litClient.generateLitSignatureV2(provider, address.toLowerCase(), 'ethereum', store)
      }

      setLoading(false)
      setConnected(true)
      return litClient
    }
  }

  const restoreLit = async () => {
    const store = new Store()
    try {
      const authSig = await Lit.getAuthSig(store);
      if(authSig.address !== address?.toLowerCase() || !litClient.isValid(authSig)) {
        throw new Error('auth invalid')
      }
      setConnected(true)
      return true
    } catch (error) {
      setConnected(false)
      return false
    }
  }

  const logoutLit = async () => {
    setLoading(false)
    setConnected(false)
    await litClient.disconnect()
  }

  return {
    isLoading,
    error,
    lit: litClient,
    isConnected,
    connect: connectLit,
    restoreLit,
    logoutLit,
  };
}
