import { useCallback, useState } from 'react'
import { AuthMethod } from '@lit-protocol/types'

import { useLitContext } from '../context/lit'

export default function useAuthenticateOtp() {
  const [authMethod, setAuthMethod] = useState<AuthMethod>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error>()
  const { litClient: lit} = useLitContext()
/**
   * Authenticate with Stytch
   */
const authWithStytch = useCallback(
  async (accessToken: string, userId?: string): Promise<void> => {
    setLoading(true)
    setError(undefined)
    setAuthMethod(undefined)

    try {
      const result: AuthMethod = (await lit.authenticateWithStytch(
        accessToken,
        userId
      )) as any;
      setAuthMethod(result)
    } catch (err) {
      // @ts-ignore
      setError(err)
    } finally {
      setLoading(false)
    }
  },
  []
);
return {
  authWithStytch,
  authMethod,
  loading,
  error,
};
}
