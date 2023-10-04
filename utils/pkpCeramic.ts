import type * as LitJsSdk from '@lit-protocol/lit-node-client';
import { Cacao, SiweMessage } from '@didtools/cacao';
import { randomBytes, randomString } from '@stablelib/random';
import { DIDSession, createDIDKey, createDIDCacao } from 'did-session'
import { evmEmptyAuthSig, executeLitAction } from "../lib/litUtils";
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers';

export async function authenticatePkp(
  wallet: PKPEthersWallet,
  options: {
    address: string;
  }
) {
  /** Step 1: Create a new did:key */
  const keySeed = randomBytes(32);
  const didKey = await createDIDKey(keySeed);

  /** Step 2: Create a SIWE message */
  let siweMessage = createSiweMessage(options.address.toLowerCase(), didKey.id)

  const signature = await wallet.signMessage(siweMessage.signMessage())
  if (signature) {
    siweMessage.signature = signature;
    let cacao = Cacao.fromSiweMessage(siweMessage);
  
     /** Step 5: Create a did with this Cacao object */
     const did = await createDIDCacao(didKey, cacao);
     let didSession = new DIDSession({
         cacao,
         keySeed,
         did
     });
     localStorage.setItem('ceramic-session', didSession.serialize());
     return {
       status: 200,
       session: didSession
     };
  } else {
    console.log("results Lit Action: ");
    return({
      status: 300,
      error: "Error generating signatures from LitAction"
    })
  }
}

/** Will generate a SIWE message that can be signed to authenticate the user to Ceramic */
export function createSiweMessage(address: string, uri: string) {
   const VERSION = '1';
   const CHAIN_NAMESPACE = 'eip155';
   const now = new Date();
   const threeMonthsLater = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
   const message = new SiweMessage({
       domain: window.location.hostname,
       address: address,
       statement: 'Give this application access to some of your data on Ceramic',
       uri: uri,
       version: VERSION,
       nonce: randomString(10),
       issuedAt: now.toISOString(),
       expirationTime: threeMonthsLater.toISOString(),
       chainId: '1',
       resources: [`ceramic://*`]
   });
   return message;
}
