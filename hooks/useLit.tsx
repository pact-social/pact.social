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
    if (litClient.getClient().ready && isConnected) return litClient

    await litClient.connect()
    const provider = await connector?.getProvider();
    const store = new Store()
    try {
      const auth = await Lit.getAuthSig(store);

      if (auth.address !== address?.toLowerCase() && provider) throw new Error('invalid lit auth')

      setLoading(false)
      setConnected(true)
      return litClient

    } catch(error: any) {

      if (address) {
        const sig = await litClient.generateLitSignatureV2(provider, address.toLowerCase(), 'ethereum', store)
      }

      setLoading(false)
      setConnected(true)
      return litClient
    }
  }

  return {
    isLoading,
    error,
    lit: litClient,
    connect: connectLit,
    isConnected
  };
}
