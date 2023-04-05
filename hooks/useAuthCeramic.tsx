import { useAccount } from "wagmi";
import { useCeramicContext } from "../context";
import { authenticateCeramic } from "../utils";


export default function useAuthCeramic (){
    const { connector, address } = useAccount();
    const { ceramic, composeClient, dispatch, state: { isAuthenticated, isAuthenticating } } = useCeramicContext();
    
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
      } catch (error) {
        dispatch({
          type: 'toggleIsAuthenticating',
        })
      }
    }

    return {connectCeramic}
}
