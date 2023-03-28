import { DIDSession } from "did-session";
import { EthereumWebAuth, getAccountId } from "@didtools/pkh-ethereum";
import type { CeramicApi } from "@ceramicnetwork/common"
import type { ComposeClient } from "@composedb/client";
import { DID } from "dids";

/**
 * Checks localStorage for a stored DID Session. If one is found we authenticate it, otherwise we create a new one.
 * @returns Promise<DID-Session> - The User's authenticated sesion.
 */
export const authenticateCeramic = async (address: any, provider: any, ceramic: CeramicApi, compose: ComposeClient) => {
  const sessionStr = localStorage.getItem('did') // for production you will want a better place than localStorage for your sessions.
  let session

  if(sessionStr) {
    session = await DIDSession.fromSession(sessionStr)
  }

  if(!session || (session.hasSession && session.isExpired)) {

    const accountId = await getAccountId(provider, address)
    const authMethod = await EthereumWebAuth.getAuthMethod(provider, accountId)

    /**
     * Create DIDSession & provide capabilities that we want to access.
     * @NOTE: Any production applications will want to provide a more complete list of capabilities.
     *        This is not done here to allow you to add more datamodels to your application.
     */
    // TODO: update resources to only provide access to our composities
    session = await DIDSession.authorize(authMethod, {
      resources: ["http://localhost:3000*", "ceramic://*"],
      // expiresInSecs: 60*60*24*7
       
    })
    // Set the session in localStorage.
    localStorage.setItem('did', session.serialize());
  }
  
  // Set our Ceramic DID to be our session DID.
  compose.setDID(session.did)
  ceramic.did = session.did
  return session.did;
}

export const logoutCeramic = async (ceramic: CeramicApi, compose: ComposeClient) => {
  localStorage.removeItem('did');
  const did = new DID()
  compose.setDID(did)
  ceramic.did = undefined
}
