import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { AuthMethodType, ProviderType } from '@lit-protocol/constants';
import type { AuthMethod, AuthSig, ExecuteJsProps } from '@lit-protocol/types'
import { PKPClient } from '@lit-protocol/pkp-client';
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import { PKPWalletConnect } from '@lit-protocol/pkp-walletconnect';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers"
import { ethConnect } from '@lit-protocol/auth-browser';
import { Store } from './store';
import { SESSION_DAYS } from './constants';
import { LitAuthClient, GoogleProvider, isSignInRedirect, BaseProvider } from '@lit-protocol/lit-auth-client';'@lit-protocol/lit-auth-client';
import AuthClient, { generateNonce } from '@walletconnect/auth-client'

export function decodeb64(b64String: string) {
  return new Uint8Array(Buffer.from(b64String, "base64"));
}

/**
 * This function converts blobs to base 64.
 * for easier storage in ceramic
 * @param {Blob} blob what you'd like to encode
 * @returns {Promise<String>} returns a string of b64
 */
export function blobToBase64(blob: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(
          reader.result?.replace("data:application/octet-stream;base64,", "")
        );
      }
    }
    reader.readAsDataURL(blob);
  });
}

/** Turns a uint8array in a buffer */
export function buf2hex(buffer: ArrayBuffer) { // buffer is an ArrayBuffer
  return [...new Uint8Array(buffer)].map(x => x.toString(16).padStart(2, '0')).join('');
}


export class Lit {
  private litNodeClient: LitJsSdk.LitNodeClient
  private litAuthClient: LitAuthClient
  public account?: string
  private redirectUri: string = 'http://localhost:3000/auth/lit'
  private store?: Store;
  private provider: GoogleProvider;
  private pkps?: string;
  private pkpWallet?: PKPEthersWallet;

  constructor() {
    if (typeof window !== 'undefined') {
      this.store = new Store()
    }
    const client = new LitJsSdk.LitNodeClient({
      alertWhenUnauthorized: true,
      debug: false,
      // litNetwork: "cayenne",
    })
    this.litNodeClient = client
    const authClient = new LitAuthClient({
      litRelayConfig: {
        relayUrl: 'https://relay-server-staging.herokuapp.com',
         // Request a Lit Relay Server API key here: https://forms.gle/RNZYtGYTY9BcD9MEA
        relayApiKey: '1234567890',
      },
      litNodeClient: client,
    })
    this.litAuthClient = authClient
    // Initialize Google provider
    this.litAuthClient.initProvider(ProviderType.Google, {
      // The URL of your web app where users will be redirected after authentication
      redirectUri: this.redirectUri,
    })

    const provider = this.litAuthClient.getProvider(
      ProviderType.Google,
    ) as GoogleProvider;
    this.provider = provider
  }
  
  async googleLogin() {    
    await this.provider.signIn();
  }

  getPKPProvider() {
    return this.provider
  }

  async handleGoogleRedirect() {
    if (isSignInRedirect(this.redirectUri)) {
      if (!this.store) this.store = new Store()
      // Get the provider that was used to sign in

      // Get auth method object that has the OAuth token from redirect callback
      const authMethod: AuthMethod = await this.provider.authenticate();
      console.log('authMethod', authMethod, this.provider)
      this.store.setItem("lit-auth-signature", JSON.stringify(authMethod));
      const pkp = await this.mintPKP()
      this.pkps = pkp
      // await this.getPKPWalletConnect()
      await this.createPKPWallet()
      // return authMethod;
      // Get session signatures for the given PKP public key and auth method
      // const sessionSigs = await provider.getSessionSigs({
      //   authMethod: authMethod,
      //   sessionSigsParams: {
      //     chain: 'ethereum',
      //     resourceAbilityRequests: [
      //       resource: litResource,
      //       ability: LitAbility.AccessControlConditionDecryption
      //     ],
      //   },
      // });
      }



  }

  async mintPKP() {
    let authSig = await this.getAuthSig()
    if(authSig && authSig != "") {
      // const authSig = JSON.parse(_authSig);

      const existingPKP = await this.provider?.fetchPKPsThroughRelayer(authSig)

      if (!existingPKP || existingPKP?.length === 0) {
        const tx = await this.provider?.mintPKPThroughRelayer(authSig)
        console.log('new pkp tx', tx)
        const newPKP = await this.provider?.fetchPKPsThroughRelayer(authSig)
        // this.pkps = newPKP[newPKP.length - 1].publicKey
        this.pkps = newPKP[0].publicKey
        return this.pkps
      }
      // console.log('old pkp', existingPKP)
      // this.pkps = existingPKP[0].publicKey
      return existingPKP[0].publicKey
      // return authSig;
    }
  }

  // async getPKPWalletConnect () {
  //   const authSig = await this.store?.getItem("lit-auth-signature");
  //   if (!authSig || !this.pkps) throw new Error('you must authenticate first')
  //   const pkpClient = new PKPClient({
  //     controllerAuthSig: JSON.parse(authSig),
  //     // Or you can also pass in controllerSessionSigs
  //     pkpPubKey: this.pkps,
  //   });
  //   await pkpClient.connect();
  //   const config = {
  //     projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  //     metadata: {
  //       name: 'pact.social',
  //       description: 'A dapp using WalletConnect AuthClient',
  //       url: 'localhost:3000',
  //       icons: ['https://litprotocol.com/favicon.png'],
  //     },
  //   };
  //   const pkpWalletConnect = new PKPWalletConnect();
  //   await pkpWalletConnect.initWalletConnect(config);
  //   pkpWalletConnect.addPKPClient(pkpClient)
  //   console.log('pkp connector wc', pkpWalletConnect.getPendingSessionRequests())

  //   pkpWalletConnect.on('session_proposal', async (proposal) => {
  //     console.log('Received session proposal: ', proposal);
    
  //     // Accept session proposal
  //     await pkpWalletConnect.approveSessionProposal(proposal);
    
  //     // Log active sessions
  //     const sessions = Object.values(pkpWalletConnect.getActiveSessions());
  //     for (const session of sessions) {
  //       const { name, url } = session.peer.metadata;
  //       console.log(`Active Session: ${name} (${url})`);
  //     }
  //   });

  //   // const uri = ''
    
  //   const authClient = await AuthClient.init({
  //     projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
  //     metadata: {
  //       name: 'pact.social',
  //       description: 'A dapp using WalletConnect AuthClient',
  //       url: 'localhost:3000',
  //       icons: ['https://litprotocol.com/favicon.png'],
  //     }
  //   })
  //   try {

  //     console.log('pkp wc pending req', await authClient.getPendingRequests())
  //     console.log('pkp wc pending req', await pkpWalletConnect.getPendingSessionRequests())
  //     console.log('pkp wc pending req', pkpWalletConnect, authClient)

  //     // const { topic, uri } = await authClient.core.pairing.create()
  //     // const resp = authClient.request({
  //     //   aud: 'http://localhost:3000',
  //     //   domain: 'localhost:3000',
  //     //   chainId: 'eip155:1',
  //     //   type: 'eip4361',
  //     //   nonce: generateNonce()
  //     // })
  //     // console.log('pkp resp', uri)
  //     // console.log('pkp wc uri', uri, topic)
  //     // await pkpWalletConnect.pair({ uri: uri });
  //     // a
  //   } catch (error) {
  //     console.log('error wc uri', error)
  //   }
  // }

  async createPKPWallet() {
    if (this.pkpWallet) return this.pkpWallet
    const authSig = await this.getAuthSig()
    if (!authSig || !this.pkps) throw new Error('you must authenticate first')
    const pkpWallet = new PKPEthersWallet({
      controllerAuthSig: authSig,
      // Or you can also pass in controllerSessionSigs
      pkpPubKey: this.pkps,
      rpc: "https://chain-rpc.litprotocol.com/http",
      // rpc: 'https://eth-mainnet.g.alchemy.com/v2/IDWVV0sgoqdHQAgWzE0-BWs3088ibvJH',
    });
    await pkpWallet.init();
    console.log('pkpWallet', pkpWallet)
    this.pkpWallet = pkpWallet;
    return pkpWallet;
  }

  getPKPWallet () {
    return this.pkpWallet
  }

  async connect() {
    await this.litNodeClient.connect()
  }

  async disconnect() {
    ethConnect.disconnectWeb3();
  }

  getClient() {
    return this.litNodeClient;
  }

  getAuthClient() {
    return this.litAuthClient;
  }

  isValid(authSig: AuthSig) {
    return !ethConnect.getMustResign(authSig, null)
  }

  async generateLitSignatureV2(provider: ExternalProvider | JsonRpcFetchFunc, account: string, providerNetwork: string, store: Store) {

    switch (providerNetwork) {
      /** Support for EVM chains */
      case "ethereum":
        const web3 = new Web3Provider(provider);
        /** Step 1: Get chain id */
        // const { chainId } = await web3.getNetwork();
  
        /** Step 2: Generate signature */
        let res = await ethConnect.signAndSaveAuthMessage({
          web3,
          account,
          chainId: 1,
          resources: null,
          expiration: new Date(Date.now() + 1000 * 60 * 60 * SESSION_DAYS).toISOString(),
          uri: process.env.NEXT_PUBLIC_APP_DOMAIN,
        });
        break;
      /** Support for Solana */
      case "solana":
        const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain: "solana" });
        store.setItem("lit-auth-signature", JSON.stringify(authSig));
        break;
      }
      
      /** Step 3: Save signature in local storage while referencing address */
      const __authSig = await Lit.getAuthSig(store)
      store.setItem("lit-auth-signature-" + account, JSON.stringify(__authSig));
      this.account = account;
  
    /** Step 3: Return results */
    return {
      status: 200,
      result: "Created lit signature with success."
    }
  }

  async getAuthSig() {
    if (!this.store) return
    return Lit.getAuthSig(this.store)
  }

  /** Retrieve user's authsig from localStorage */
  static async getAuthSig(store: Store) {
    let _authSig = await store.getItem("lit-auth-signature")
    if(_authSig && _authSig != "") {
      const authSig = JSON.parse(_authSig);
      return authSig;
    // } 
    // else if (false) {

    } else {
      console.error("User not authenticated to Lit Protocol for messages")
      // throw new Error("User not authenticated to Lit Protocol for messages");
    }
  }

  async decryptString(encryptedContent: any, chain: string, store: Store, forcedAuthSig = null) {
    /** Make sure Lit is ready before trying to decrypt the string */
    await this.connect();
  
    /** Retrieve AuthSig or used the one passed as a parameter */
    let authSig;
    if(forcedAuthSig) {
      authSig = forcedAuthSig;
    } else {
      authSig = await Lit.getAuthSig(store);
    }
  
    /** Decode string encoded as b64 to be supported by Ceramic */
    let decodedString;
    try {
      decodedString = decodeb64(encryptedContent.encryptedString);
    } catch(e) {
      console.log("Error decoding b64 string: ", e);
      throw e;
    }
  
    /** Instantiate the decrypted symmetric key */
    let decryptedSymmKey;
  
    /** Decrypt the message accroding to the chain the user is connected on  */
    switch (chain) {
      /** Decrypt for EVM users */
      case "ethereum":
        let _access;
        try {
          _access = JSON.parse(encryptedContent.accessControlConditions);
        } catch(e) {
          console.log("Couldn't parse accessControlConditions: ", e);
          throw e;
        }
  
        /** Get encryption key from Lit */
        try {
          decryptedSymmKey = await this.litNodeClient.getEncryptionKey({
            accessControlConditions: _access,
            toDecrypt: encryptedContent.encryptedSymmetricKey,
            chain: "ethereum",
            authSig
          })
        } catch(e) {
          console.log("Error getting encryptionKey for EVM: ", e);
          throw e;
        }
        break;
  
      /** Decrypt for Solana users */
      case "solana":
        let _rpcCond;
        try {
          _rpcCond = JSON.parse(encryptedContent.solRpcConditions);
        } catch(e) {
          console.log("Couldn't parse solRpcConditions: ", e);
          throw e;
        }
  
        /** Get encryption key from Lit */
        try {
          decryptedSymmKey = await this.litNodeClient.getEncryptionKey({
            solRpcConditions: _rpcCond,
            toDecrypt: encryptedContent.encryptedSymmetricKey,
            chain: "solana",
            authSig
          })
        } catch(e) {
          console.log("Error getting encryptionKey for Solana: ", e);
          throw e;
        }
        break;
    }
  
    /** Decrypt the string using the encryption key */
    try {
        if (!decryptedSymmKey) throw new Error('no symmKey found')
        let _blob = new Blob([decodedString]);
        const decryptedString = await LitJsSdk.decryptString(_blob, decryptedSymmKey);
        return {
          status: 200,
          result: decryptedString
        };
    } catch(e) {
      console.log("Error decrypting string: ", e)
      throw e;
    }
  }

  /** Encrypt string based on some access control conditions */
  async encryptString(body: string, chain = "ethereum", controlConditions: any[]) {
    /** Step 2: Encrypt message */
    const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(body);

    /** We convert the encrypted string to base64 to make it work with Ceramic */
    let base64EncryptedString = await blobToBase64(encryptedString);

    /** Step 4: Save encrypted content to lit nodes */
    let encryptedSymmetricKey;
    switch (chain) {
      /** Encrypt for EVM based on the access control conditions */
      case "ethereum":
        try {
          encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
            accessControlConditions: controlConditions,
            symmetricKey: symmetricKey,
            authSig: evmEmptyAuthSig,
            chain: "ethereum"
          });
        } catch(e) {
          console.log("Error encrypting string with Lit for EVM: ", e);
          throw new Error("Error encrypting string with Lit: " + e)
        }

        /** Step 5: Return encrypted content which will be stored on Ceramic (and needed to decrypt the content) */
        return {
          accessControlConditions: JSON.stringify(controlConditions),
          encryptedSymmetricKey: buf2hex(encryptedSymmetricKey),
          encryptedString: base64EncryptedString
        };

      /** Encrypt for Solana based on the sol rpc conditions */
      case "solana":
        try {
          encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
            solRpcConditions: controlConditions,
            symmetricKey: symmetricKey,
            authSig: solEmptyAuthSig,
            chain: "solana"
          });
        } catch(e) {
          console.log("Error encrypting string with Lit for Solana: ", e);
          throw new Error("Error encrypting string with Lit: " + e)
        }

        /** Step 5: Return encrypted content which will be stored on Ceramic (and needed to decrypt the content) */
        return {
          solRpcConditions: JSON.stringify(controlConditions),
          encryptedSymmetricKey: buf2hex(encryptedSymmetricKey),
          encryptedString: base64EncryptedString
        };
    }
  }
}

/** Clean the list of recipients to keep only the did pkh */
function cleanRecipients(recipients: any[]) {
  /** Instantiate new array */
  let ethRecipients: any[] = [];
  let solRecipients: any[] = [];

  /** Loop through all recipients */
  recipients.forEach((recipient, i) => {
    /** Get address and network from DiD */
    let { address, network } = getAddressFromDid(recipient);

    /** If user is using EVM or Solana we add it to its respective array */
    switch (network) {
      case "eip155":
        ethRecipients.push(recipient);
        break;
      case "solana":
        solRecipients.push(recipient);
        break;
    }
  });

  /** Return recipients list without did:key */
  return {
    ethRecipients: ethRecipients,
    solRecipients: solRecipients
  };
}

/** Returns a JSON object with the address and network based on the did */
export function getAddressFromDid(did: string) {
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

/** This function will take an array of recipients and turn it into a clean access control conditions array */
export function generateAccessControlConditionsForRecipients(recipients: any[]) {
  let { ethRecipients, solRecipients } = cleanRecipients(recipients);
  let _accessControlConditions: any[] = [];
  let _solRpcConditions: any[] = [];

  /** Loop through all EVM users in this conversation */
  ethRecipients.forEach((ethRecipient, i) => {
    let { address } = getAddressFromDid(ethRecipient);
    _accessControlConditions.push({
      contractAddress: '',
      standardContractType: '',
      chain: 'ethereum',
      method: '',
      parameters: [
        ':userAddress',
      ],
      returnValueTest: {
        comparator: '=',
        value: address
      }
    });

    /** Push `or` operator if recipient isn't the last one of the list */
    if(i < ethRecipients.length - 1) {
      _accessControlConditions.push({"operator": "or"})
    }
  });

  /** Loop through Solana recipients */
  solRecipients.forEach((solRecipient, i) => {
    let { address } = getAddressFromDid(solRecipient);
    _solRpcConditions.push({
      method: "",
      params: [":userAddress"],
      chain: "solana",
      pdaParams: [],
      pdaInterface: { offset: 0, fields: {} },
      pdaKey: "",
      returnValueTest: {
        key: "",
        comparator: "=",
        value: address,
      },
    });

    /** Push `or` operator if recipient isn't the last one of the list */
    if(i < solRecipients.length - 1) {
      _solRpcConditions.push({"operator": "or"})
    }
  });

  /** Return clean access control conditions for both Solana and EVM */
  return {
    accessControlConditions: _accessControlConditions,
    solRpcConditions: _solRpcConditions
  };
}

 /** This function will execute a Lit Action and return the results */
export const executeLitAction = async (litClient: LitJsSdk.LitNodeClient, action: ExecuteJsProps) => {
  let results;
  try {
    results = await litClient.executeJs(action);
  } catch(e) {
    console.log("Error running Lit Action: ", e);
    return;
  }
  return results;
}

/** Default AuthSig to be used to write content */
export const evmEmptyAuthSig = {
  sig: "0x111d0285180969b8790683e2665b9e48737deb995242fa9353ee7b42f879f12d7804b5d5152aedf7f59d32dfb02de46f2b541263738342dc811b7e54229fe5a31c",
  derivedVia: "web3.eth.personal.sign",
  signedMessage: "localhost:3000 wants you to sign in with your Ethereum account:\n0x348d53ac2638BEA8684Ac9ec4DDeAE1171b01059\n\n\nURI: http://localhost:3000\nVersion: 1\nChain ID: 137\nNonce: Tq3dXTTh4zHBmvWVM\nIssued At: 2022-10-04T12:48:40.872Z",
  address: "0x348d53ac2638bea8684ac9ec4ddeae1171b01059"
};
export const solEmptyAuthSig = {
  sig: "8cfb8dc58d7f6e2740618af75c1c4fe3653e8179806e490062364765e49a5fd3810a7db1255a9355cf04b804aa30c8fb0c401b228db3d550b17ed59425c8f80f",
  derivedVia: "solana.signMessage",
  signedMessage: "I am creating an account to use Lit Protocol at 2022-10-04T12:45:03.943Z",
  address: "7ddxX3wPse3Nm43Vrtp8CG7EEH7SXFZj1jqZTsEZcedj"
};
