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
    
    if (getAddressFromDid(session.did?.parent)?.address !== address) {
      console.log('no matching session', getAddressFromDid(session.did?.parent), address)
      session = undefined;
    }
  }
  console.log('session', session, provider)
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


/** Returns a JSON object with the address and network based on the did */
export function getAddressFromDid(did: string | undefined) {
  if(did) {
    let didParts = did.split(":");
    if(did.substring(0, 7) == "did:pkh") {
      /** Explode address to retrieve did */
      if(didParts.length >= 4) {
        let address = didParts[4];
        let network = didParts[2];
        let chain = didParts[2] + ":" + didParts[3];

        /** Return result */
        return {
          address: address,
          network: network,
          chain: chain
        }
      } else {
        /** Return null object */
        return {
          address: null,
          network: null,
          chain: null
        }
      }
    } else if(did.substring(0, 7) == "did:key") {
      /** Return did object */
      return {
        address: didParts[3],
        network: 'key',
        chain: 'key'
      }
    } else {
      /** Return null object */
      return {
        address: null,
        network: null,
        chain: null
      }
    }
  } else {
    /** Return null object */
    return {
      address: null,
      network: null,
      chain: null
    }
  }
}

/** Returns a short address */
export function shortAddress(_address: string | undefined): string {
  if(!_address) {
    return "-";
  }

  const _firstChars = _address.substring(0, 5);
  const _lastChars = _address.substr(_address.length - 5);
  return _firstChars.concat('-', _lastChars);
}

