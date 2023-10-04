import { useAccount } from "wagmi";
import { useCeramicContext } from "../context";
import { authenticateCeramic, logoutCeramic, restoreAuth } from "../utils";
import { useCallback, useEffect, useState } from "react";
import { type VerifyOptions, verifyTimeChecks } from "@didtools/cacao";
import { authenticatePkp } from "../utils/pkpCeramic";
import { useLitContext } from "../context/lit";


export default function useAuthCeramic () {
  const { connector, address } = useAccount();
  const { ceramic, composeClient, dispatch } = useCeramicContext();
  const [ authRequested, setAuthRequested ] = useState<boolean>(false);
  const { litClient: lit } = useLitContext()

  const connectCeramic = useCallback(async () => {
    dispatch({
      type: 'toggleIsAuthenticating',
    })

    try {
      const provider = await connector?.getProvider()
      const did = await authenticateCeramic(address, provider, ceramic, composeClient)
      dispatch({
        type: 'setDID',
        payload: { did }
      })
    } catch (error: any) {
      if (!error?.code) {
        setAuthRequested(true);
      }
      console.log('error', error)
      dispatch({
        type: 'toggleIsAuthenticating',
      })
    }
  }, [address, ceramic, composeClient, connector, dispatch])

  const restoreSession = async () => {
    const sessionDID = await restoreAuth(address, ceramic, composeClient)
    if (!sessionDID) {
      const pkpWallet = lit.getPKPWallet()
      if(pkpWallet) {
        const address = await pkpWallet.getAddress()
        const { session, status } = await authenticatePkp(pkpWallet, {
          address,
        })
        if (!session) return false
        await restoreAuth(address, ceramic, composeClient)
        dispatch({
          type: 'setDID',
          payload: { did: session.did }
        })
        return true
      }
      return false
    }
    
    try {
      verifyTimeChecks(sessionDID.capability, {} as VerifyOptions)
      dispatch({
        type: 'setDID',
        payload: { did: sessionDID }
        })
        return true
    } catch (error) {
      return false
    }
  }

  const logout = useCallback(async () => {
    await logoutCeramic(ceramic, composeClient)
    dispatch({
      type: 'logout',
    })
  }, [])

  useEffect(() => {
    if (connector && authRequested) {
      connectCeramic()
      setAuthRequested(false);
    }
  }, [authRequested, connectCeramic, connector, setAuthRequested])

  return {
    connectCeramic,
    restoreSession,
    logout
  }
}
