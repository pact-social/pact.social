import { DIDSession } from "did-session";
import { EthereumWebAuth, getAccountId } from "@didtools/pkh-ethereum";
import type { CeramicApi } from "@ceramicnetwork/common"
import type { ComposeClient } from "@composedb/client";
import { DID } from "dids";
import { getAddress } from 'ethers/lib/utils';

export const restoreAuth = async (address: any, ceramic: CeramicApi, compose: ComposeClient) => {
  const sessionStr = localStorage.getItem('ceramic-session') // for production you will want a better place than localStorage for your sessions.

  if(!sessionStr) return false;

  const session = await DIDSession.fromSession(sessionStr)
  
  if (getAddressFromDid(session.did?.parent)?.address !== address.toLowerCase()) {
    return false;
  }
  compose.setDID(session.did)
  ceramic.did = session.did
  
  return session.did
}

/**
 * Checks localStorage for a stored DID Session. If one is found we authenticate it, otherwise we create a new one.
 * @returns Promise<DID-Session> - The User's authenticated sesion.
 */
export const authenticateCeramic = async (address: any, provider: any, ceramic: CeramicApi, compose: ComposeClient, fromStore: boolean = true) => {
  const sessionStr = localStorage.getItem('ceramic-session') // for production you will want a better place than localStorage for your sessions.
  let session

  if(fromStore && sessionStr) {
    session = await DIDSession.fromSession(sessionStr)
    
    if (getAddressFromDid(session.did?.parent)?.address !== address.toLowerCase()) {
      console.log('no matching session', getAddressFromDid(session.did?.parent), address.toLowerCase())
      session = undefined;
    }
  }

  if(!session || (session.hasSession && session.isExpired)) {
    const accountId = await getAccountId(provider, address)
    accountId.chainId.reference = '1'

    const authMethod = await EthereumWebAuth.getAuthMethod(provider, accountId)

    /**
     * Create DIDSession & provide capabilities that we want to access.
     * @NOTE: Any production applications will want to provide a more complete list of capabilities.
     *        This is not done here to allow you to add more datamodels to your application.
     */
    // TODO: update resources to only provide access to our composities
    session = await DIDSession.authorize(authMethod, {
      resources: [
        `${process.env.NEXT_PUBLIC_APP_DOMAIN}/*`, 
        'ceramic://*',
        // 'lit-accesscontrolcondition://*'
      ],
      expiresInSecs: 60*60*24*7,
      // statement: ''
       
    })
    // Set the session in localStorage.
    if (fromStore) {
      localStorage.setItem('ceramic-session', session.serialize());
    }
  }
  
  // Set our Ceramic DID to be our session DID.
  compose.setDID(session.did)
  ceramic.did = session.did
  return session.did;
}

export const logoutCeramic = async (ceramic: CeramicApi, compose: ComposeClient) => {
  localStorage.removeItem('ceramic-session');
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

