import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { LitContracts } from '@lit-protocol/contracts-sdk';
import { ProviderType } from '@lit-protocol/constants';
import type { AuthMethod, AuthSig, ExecuteJsProps, GetSessionSigsProps, SessionSigs } from '@lit-protocol/types'
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from "@ethersproject/providers"
import { ethConnect } from '@lit-protocol/auth-browser';
import { Store } from './store';
import { SESSION_DAYS } from './constants';
import { LitAuthClient, GoogleProvider, isSignInRedirect, OtpProvider } from '@lit-protocol/lit-auth-client';'@lit-protocol/lit-auth-client';
import { LitAbility, LitActionResource } from '@lit-protocol/auth-helpers';

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

export enum PkpStatus {
  NONE,
  AUTH_PROVIDER,
  FETCH_PKP,
  MINT_PKP,
  SESSION_SIGS,
  AUTH_SUCCESS,
}

export class Lit {
  private litNodeClient: LitJsSdk.LitNodeClient
  private litAuthClient: LitAuthClient
  public account?: string
  private redirectUri: string = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/auth/lit`
  private store?: Store;
  private provider?: GoogleProvider;
  private pkp?: string;
  private pkpWallet?: PKPEthersWallet;
  private sessionSigs?: SessionSigs;
  public pkpStatus: PkpStatus = PkpStatus.NONE;

  constructor() {
    if (typeof window !== 'undefined') {
      this.store = new Store()
      // this.getTokensOwnerByAddress('0x2D85abE6769806ab5B9611CDb6409c06ab541313')
      // this.getTokensOwnerByAddress('0xC13E5709b01af28F12865EdF324DB77C374031Ec')
      // this.getTokensOwnerByAddress('0x3B5dD260598B7579A0b015A1F3BBF322aDC499A1')
    }
    const client = new LitJsSdk.LitNodeClient({
      alertWhenUnauthorized: true,
      debug: false,
      litNetwork: "serrano",
    })
    this.litNodeClient = client

    const authClient = new LitAuthClient({
      litRelayConfig: {
        // relayUrl: 'https://relay-server-staging.herokuapp.com',
         // Request a Lit Relay Server API key here: https://forms.gle/RNZYtGYTY9BcD9MEA
        relayApiKey: '67e55044-10b1-426f-9247-bb680e5fe0c8_relayer',
      },
      litNodeClient: client,
    })
    this.litAuthClient = authClient
  }

  async getTokensOwnerByAddress(address: string) {

  const litContracts = new LitContracts({});
  try {
    await litContracts.connect();
    
  } catch (error) {
    console.log('error lit contracts connect', error)
  }
  //  
  
  const tokens = await litContracts
                       .pkpNftContractUtil
                       .read
                       .getTokensInfoByAddress(address)
                      //  .getTokensByAddress(address);
  const actions = await litContracts.pkpPermissionsContractUtil.read.getPermittedActions("82886857139868379093806024562634912421531242225124108697027997553177628602053")
  const addresses = await litContracts.pkpPermissionsContractUtil.read.getPermittedAddresses("82886857139868379093806024562634912421531242225124108697027997553177628602053")
  // const infos = await litContracts.
  }

  getPublicKey() {
    return this.pkp || 'undefined'
  }
  
  async googleLogin() {
    const currentUri = typeof window !== 'undefined' ? window.location.href : undefined
    await this.store?.setItem('auth-redirect', currentUri)
    await this.getPKPProvider().signIn();
  }

  getPKPProvider(redirectUri?: string) {
    if (redirectUri) this.redirectUri = redirectUri

    if (!this.provider) {
      // Initialize Google provider
      const provider = this.getGoogleProvider()
  
      // const provider = this.litAuthClient.getProvider(
      //   ProviderType.Google,
      // ) as GoogleProvider;
      this.provider = provider
    }
    return this.provider
  }

  getGoogleProvider(redirectUri?: string) {
    // Initialize Google provider
    this.litAuthClient.initProvider(ProviderType.Google, {
      // The URL of your web app where users will be redirected after authentication
      redirectUri: this.redirectUri,

    })

    const provider = this.litAuthClient.getProvider(
      ProviderType.Google,
    ) as GoogleProvider;
    this.provider = provider
    return provider
  }

  getOtpProvider(userId: string) {
    // Initialize Google provider
    const provider = this.litAuthClient.initProvider(ProviderType.Otp, {
      // The URL of your web app where users will be redirected after authentication
      // redirectUri: this.redirectUri,
      userId: userId || 'pact.social0x01@gmail.com',
      emailCustomizationOptions: {
        fromName: 'pact.social',
        from: 'devops@pact.social'
      }
      // appId: '',
      // requestId,
      // emailCustomizationOptions,
      // customName,
    })

    // const provider = this.litAuthClient.getProvider(
    //   ProviderType.Otp,
    // ) as OtpProvider;
    // this.provider = provider
    return provider
  }

  getActionProvider(userId: string) {
    // Initialize Google provider
    const provider = this.litAuthClient.initProvider(ProviderType.Otp, {
      // The URL of your web app where users will be redirected after authentication
      // redirectUri: this.redirectUri,
      userId: userId || 'pact.social0x01@gmail.com',
      emailCustomizationOptions: {
        fromName: 'pact.social',
        from: 'devops@pact.social'
      }
      // appId: '',
      // requestId,
      // emailCustomizationOptions,
      // customName,
    })

    // const provider = this.litAuthClient.getProvider(
    //   ProviderType.Otp,
    // ) as OtpProvider;
    // this.provider = provider
    return provider
  }

  async handleGoogleRedirect() {
    if (isSignInRedirect(this.redirectUri)) {
      // Get auth method object that has the OAuth token from redirect callback
      this.pkpStatus = PkpStatus.AUTH_PROVIDER
      const authMethod: AuthMethod = await this.getPKPProvider().authenticate();

      this.store?.setItem("lit-auth-method", JSON.stringify(authMethod));
      this.pkpStatus = PkpStatus.FETCH_PKP
      const pkp = await this.mintPKP()
      this.pkp = pkp
      this.pkpStatus = PkpStatus.SESSION_SIGS
      await this.createPKPWallet()
      this.pkpStatus = PkpStatus.AUTH_SUCCESS
    }
  }
  // Get session signatures for the given PKP public key and auth method
  async getSessionSigs({
    pkpPublicKey,
    authMethod,
    sessionSigsParams,
  }: {
    pkpPublicKey: string;
    authMethod: AuthMethod;
    sessionSigsParams: GetSessionSigsProps;
  }) {
    const sessionSigs = await this.getPKPProvider().getSessionSigs({
      pkpPublicKey,
      authMethod,
      sessionSigsParams,
      litNodeClient: this.litNodeClient,
    });
    return sessionSigs;
  } 

  async mintPKP() {
    let authMethod = await this.getAuthMethod()
    if(authMethod) {
      // const exp = this.litNodeClient.getExpiration()
      const existingPKP = await this.getPKPProvider().fetchPKPsThroughRelayer(authMethod)

      if (!existingPKP || existingPKP?.length === 0) {
        this.pkpStatus = PkpStatus.MINT_PKP
        const tx = await this.getPKPProvider().mintPKPThroughRelayer(authMethod)

        const newPKP = await this.getPKPProvider().fetchPKPsThroughRelayer(authMethod)
        this.pkp = newPKP[0].publicKey
        return this.pkp
      }
      this.pkp = existingPKP[0].publicKey
      return existingPKP[0].publicKey
    }
  }

  async getPkpSessionSigs() {
    const authMethod = await this.getAuthMethod()
    if(!this.pkp || !authMethod) return

    const sessionSigs = await this.getSessionSigs({
      pkpPublicKey: this.pkp,
      authMethod: authMethod,
      sessionSigsParams: {
        chain: 'ethereum',
        expiration: new Date(Date.now() + 1000 * 60 * 60 * 24 * SESSION_DAYS).toISOString(), // 1 week    
        resourceAbilityRequests: [
          {
            resource: new LitActionResource('*'),
            ability: LitAbility.PKPSigning,
          },
        ]
      }
    })
    this.sessionSigs = sessionSigs
    return sessionSigs
  }

  async createPKPWallet() {
    if (this.pkpWallet) return this.pkpWallet
    const authSig = await this.getWalletSig()
    if(!authSig && this.pkp) {
      const sessionSigs = await this.getPkpSessionSigs()
      const pkpWallet = new PKPEthersWallet({
        controllerSessionSigs: sessionSigs,
        // Or you can also pass in controllerSessionSigs
        pkpPubKey: this.pkp,
        rpc: "https://chain-rpc.litprotocol.com/http",
        // rpc: 'https://eth-mainnet.g.alchemy.com/v2/',
      });
      await pkpWallet.init();
      this.pkpWallet = pkpWallet;
      return pkpWallet;
    }
    // const authMethod = await this.getAuthMethod()
    if (!authSig || !this.pkp) throw new Error('you must authenticate first')

    const pkpWallet = new PKPEthersWallet({
      controllerAuthSig: authSig,
      // Or you can also pass in controllerSessionSigs
      pkpPubKey: this.pkp,
      rpc: "https://chain-rpc.litprotocol.com/http",
      // rpc: 'https://eth-mainnet.g.alchemy.com/v2/',
    });
    await pkpWallet.init();
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
    await this.store?.removeItem('lit-auth-method')
    ethConnect.disconnectWeb3();
  }

  getClient() {
    return this.litNodeClient;
  }

  getAuthClient() {
    return this.litAuthClient;
  }

  isValid(authSig?: AuthSig) {
    if (!authSig) return false
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
      // store.setItem("lit-auth-signature-" + account, JSON.stringify(__authSig));
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

  async getAuthMethod() {
    if (!this.store) return
    return Lit.getAuthMethod(this.store)
  }
  
  async getWalletSig() {
    if (!this.store) return
    return Lit.getWalletSig(this.store)
  }

  /** Retrieve user's authsig from localStorage */
  static async getAuthSig(store: Store): Promise<AuthSig | undefined> {
    let _authSig = await store.getItem("lit-auth-signature")
    if(_authSig && _authSig != "") {
      let authSig = JSON.parse(_authSig);
      // if(authSig?.authMethodType === 6) {
      //   authSig = JSON.parse(await store.getItem("lit-wallet-sig") || '') as AuthMethod
      // }
      return authSig;
    } 
    else if (_authSig === "" || !_authSig) {
      const _authSig = await store.getItem("lit-wallet-sig")
      if (_authSig) return JSON.parse(_authSig)
    } else {
      console.error("User not authenticated to Lit Protocol for messages")

      // throw new Error("User not authenticated to Lit Protocol for messages");
    }
  }
  
  static async getAuthMethod(store: Store): Promise<AuthMethod | undefined> {
    let _authMethod = await store.getItem("lit-auth-method")
    if(_authMethod && _authMethod != "") {
      let authMethod = JSON.parse(_authMethod);
      return authMethod;
    } else {
      console.error("User not authenticated to Lit Protocol for messages")
    }
  }
  
  static async getWalletSig(store: Store): Promise<AuthSig | undefined> {
    let _authSig = await store.getItem("lit-wallet-sig")
    if(_authSig && _authSig != "") {
      let authSig = JSON.parse(_authSig);
      return authSig;
    } else {
      console.error("User not authenticated to Lit Protocol for messages")
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
