import { useAccount } from "wagmi";
import { useCeramicContext } from "../context";
import { authenticateCeramic, logoutCeramic, restoreAuth } from "../utils";
import { useCallback, useEffect, useState } from "react";
import { DID } from "dids";
import { type VerifyOptions, verifyTimeChecks } from "@didtools/cacao";
import { authenticatePkp } from "../utils/pkpCeramic";


export default function useAuthCeramic () {
  const { connector, address } = useAccount();
  const { ceramic, composeClient, dispatch, state: { isAuthenticated, isAuthenticating } } = useCeramicContext();
  const [ authRequested, setAuthRequested ] = useState<boolean>(false);

  const connectCeramic = useCallback(async () => {
    dispatch({
      type: 'toggleIsAuthenticating',
    })
    // console.log('connector', connector)

    // if (connector?.id === 'pkp') {
    //   const { status, session, error } = authenticatePkp(
    //     connector.getLitClient(),
    //     {
    //       address: '',
    //       ipfs: '',
    //       accessToken: '',
    //       authMethodType
    //       userId: 
    //     }
    //   )
    // } else {

    // }
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
    const provider = await connector?.getProvider()
    // if (provider && provider.)
    const sessionDID = await restoreAuth(address, ceramic, composeClient)
    if (!sessionDID) return false
    
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
  }, [connector, authRequested, setAuthRequested, connectCeramic])

  return {
    connectCeramic,
    restoreSession,
    logout
  }
}
