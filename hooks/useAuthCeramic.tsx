import { useAccount } from "wagmi";
import { useCeramicContext } from "../context";
import { authenticateCeramic } from "../utils";
import { useEffect, useState } from "react";


export default function useAuthCeramic () {
    const { connector, address } = useAccount();
    const { ceramic, composeClient, dispatch, state: { isAuthenticated, isAuthenticating } } = useCeramicContext();
    const [ authRequested, setAuthRequested ] = useState<boolean>(false);
    
    useEffect(() => {
      if (connector && authRequested) {
        connectCeramic()
        setAuthRequested(false);
      }
    }, [connector, authRequested])

    async function connectCeramic() {
      dispatch({
        type: 'toggleIsAuthenticating',
      })
      const provider = await connector?.getProvider()
      try {
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
    }

    return {connectCeramic}
}
