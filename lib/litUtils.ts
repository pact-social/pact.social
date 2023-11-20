import * as LitJsSdk from '@lit-protocol/lit-node-client';
import { AuthMethodType, ProviderType } from '@lit-protocol/constants';
import type { AuthMethod, AuthSig, ExecuteJsProps, GetSessionSigsProps, IRelayPKP, IRelayRequestData, SessionSigs } from '@lit-protocol/types'
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import {  ExternalProvider, JsonRpcFetchFunc, JsonRpcProvider, Web3Provider } from "@ethersproject/providers"
import { ethConnect } from '@lit-protocol/auth-browser';
import { Store } from './store';
import { SESSION_DAYS } from './constants';
import { LitAuthClient, GoogleProvider, StytchOtpProvider, isSignInRedirect } from '@lit-protocol/lit-auth-client';
import { LitAbility, LitActionResource } from '@lit-protocol/auth-helpers';
import { BigNumber } from "@ethersproject/bignumber";
import { Wallet } from "@ethersproject/wallet";
import { computeAddress } from "@ethersproject/transactions";
import { LitContracts } from '@lit-protocol/contracts-sdk';


interface MintRequestBody {
  keyType: number;
  permittedAuthMethodTypes: number[];
  permittedAuthMethodIds: string[];
  permittedAuthMethodPubkeys: string[];
  permittedAuthMethodScopes: any[][] // ethers.BigNumber;
  addPkpEthAddressAsPermittedAddress: boolean;
  sendPkpToItself: boolean;
};


const validateMintRequestBody = (customArgs: Partial<MintRequestBody>): boolean => {
  let isValid = true;
  const validKeys = ['keyType', 'permittedAuthMethodTypes', 'permittedAuthMethodIds', 'permittedAuthMethodPubkeys', 'permittedAuthMethodScopes', 'addPkpEthAddressAsPermittedAddress', 'sendPkpToItself'];

  // Check for any extraneous keys
  for (const key of Object.keys(customArgs)) {
    if (!validKeys.includes(key)) {
      console.error(`Invalid key found: ${key}. This key is not allowed. Valid keys are: ${validKeys.join(', ')}`);
      isValid = false;
    }
  }

  if (customArgs.keyType !== undefined && typeof customArgs.keyType !== 'number') {
    console.error('Invalid type for keyType: expected a number.');
    isValid = false;
  }

  if (customArgs.permittedAuthMethodTypes !== undefined && (!Array.isArray(customArgs.permittedAuthMethodTypes) || !customArgs.permittedAuthMethodTypes.every(type => typeof type === 'number'))) {
    console.error('Invalid type for permittedAuthMethodTypes: expected an array of numbers.');
    isValid = false;
  }

  if (customArgs.permittedAuthMethodIds !== undefined && (!Array.isArray(customArgs.permittedAuthMethodIds) || !customArgs.permittedAuthMethodIds.every(id => typeof id === 'string'))) {
    console.error('Invalid type for permittedAuthMethodIds: expected an array of strings.');
    isValid = false;
  }

  if (customArgs.permittedAuthMethodPubkeys !== undefined && (!Array.isArray(customArgs.permittedAuthMethodPubkeys) || !customArgs.permittedAuthMethodPubkeys.every(pubkey => typeof pubkey === 'string'))) {
    console.error('Invalid type for permittedAuthMethodPubkeys: expected an array of strings.');
    isValid = false;
  }

  if (customArgs.permittedAuthMethodScopes !== undefined && (!Array.isArray(customArgs.permittedAuthMethodScopes) || !customArgs.permittedAuthMethodScopes.every(scope => Array.isArray(scope) && scope.every(s => typeof s === 'number')))) {
    console.error('Invalid type for permittedAuthMethodScopes: expected an array of arrays of numberr.');
    isValid = false;
  }

  if (customArgs.addPkpEthAddressAsPermittedAddress !== undefined && typeof customArgs.addPkpEthAddressAsPermittedAddress !== 'boolean') {
    console.error('Invalid type for addPkpEthAddressAsPermittedAddress: expected a boolean.');
    isValid = false;
  }

  if (customArgs.sendPkpToItself !== undefined && typeof customArgs.sendPkpToItself !== 'boolean') {
    console.error('Invalid type for sendPkpToItself: expected a boolean.');
    isValid = false;
  }

  return isValid;
};

export function decodeb64(b64String: string) {
  return new Uint8Array(Buffer.from(b64String, "base64"));
}

export function encodeb64(uintarray: any) {
  const b64 = Buffer.from(uintarray).toString("base64");
  return b64;
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
  private store: Store;
  private provider?: GoogleProvider | StytchOtpProvider | any;
  private pkp?: string;
  private pkpWallet?: PKPEthersWallet;
  private sessionSigs?: SessionSigs;
  public pkpStatus: PkpStatus = PkpStatus.NONE;
  public authStytch: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.store = new Store()
      // this.getTokensOwnerByAddress('0x2D85abE6769806ab5B9611CDb6409c06ab541313')
      // this.getTokensOwnerByAddress('0xC13E5709b01af28F12865EdF324DB77C374031Ec')
      // this.getTokensOwnerByAddress('0x3B5dD260598B7579A0b015A1F3BBF322aDC499A1')
    } else {
      // @ts-ignore
      this.store = {}
    }
    const client = new LitJsSdk.LitNodeClient({
      alertWhenUnauthorized: true,
      debug: false,
      litNetwork: "cayenne",
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

  triggerStytch() {
    if(!this.authStytch) {
      this.authStytch = true
    } else {
      // this.authStytch = false
    }
  }

  isStytch() {
    return this?.authStytch || false
  }

  async prepareRelayRequestData(
    authMethod: AuthMethod
  ): Promise<IRelayRequestData> {
    const authMethodType = authMethod.authMethodType;
    const authMethodId = await this.getPKPProvider(authMethodType).getAuthMethodId(authMethod);
    const data = {
      authMethodType,
      authMethodId,
    };
    return data;
  }

  async mintPKPThroughRelayer(authMethod: AuthMethod, customArgs?: any): Promise<string> {
    const data = await this.prepareRelayRequestData(authMethod);

    if (customArgs && !validateMintRequestBody(customArgs)) {
      throw new Error('Invalid mint request body');
    };

    const body = this.prepareMintBody(data, customArgs ?? {} as MintRequestBody);
    const mintRes = await this.getPKPProvider(authMethod.authMethodType).relay.mintPKP(body);
    if (!mintRes || !mintRes.requestId) {
      throw new Error('Missing mint response or request ID from relay server');
    }
    return mintRes.requestId;
  }

  prepareMintBody(data: IRelayRequestData, customArgs: MintRequestBody): string {
    const pubkey = data.authMethodPubKey || '0x';

    const defaultArgs: MintRequestBody = {
      // default params
      keyType: 2,
      permittedAuthMethodTypes: [data.authMethodType],
      permittedAuthMethodIds: [data.authMethodId],
      permittedAuthMethodPubkeys: [pubkey],
      permittedAuthMethodScopes: [[BigNumber.from('0')]],
      addPkpEthAddressAsPermittedAddress: true,
      sendPkpToItself: true,
    };

    const args: MintRequestBody = {
      ...defaultArgs,
      ...customArgs,
    };

    const body = JSON.stringify(args);
    return body;
  }


  async fetchPKPs() {
    // const litContracts = new LitContracts({});
    try {
      // 3. connect to lit contracts
      // Create a random wallet
      const wallet = Wallet.createRandom();

      // Define custom RPC provider information
      const customRpcProvider = new JsonRpcProvider(
        "https://chain-rpc.litprotocol.com/http",
        175177  // This is the network ID
      );

      // Connect the wallet to the custom RPC provider
      const walletWithProvider = wallet.connect(customRpcProvider);

      const litContracts = new LitContracts({ signer: walletWithProvider });
      await litContracts.connect();
      
      const permissionsContract = litContracts.pkpPermissionsContract
      const _authMethod = await this.getAuthMethod()
      if (!_authMethod) {
        throw new Error('No auth method provided')
      }
      var authProvider = await this.getPKPProvider(_authMethod.authMethodType)

      const authId = await authProvider.getAuthMethodId(_authMethod);
      const tokenIds = await permissionsContract.read.getTokenIdsForAuthMethod(_authMethod.authMethodType, authId);
      // console.log('tokenIds', tokenIds, permissionsContract)

      let pkpsRelayer = await authProvider.fetchPKPsThroughRelayer(_authMethod);
      // console.log('pkpsRelayer', pkpsRelayer)
      
      // -- get the pkps
      const pkps = [];
      for (let i = 0; i < tokenIds.length; i++) {
        const pubkey = await permissionsContract.read.getPubkey(tokenIds[i]);
        if (pubkey) {
          const ethAddress = computeAddress(pubkey);

          // check the permission scopes
          const permissionScopes = await permissionsContract.read.getPermittedAuthMethodScopes(
            tokenIds[i],
            _authMethod.authMethodType,
            authId,
            3,
          );

          pkps.push({
            authId: authId,
            tokenId: tokenIds[i],
            publicKey: pubkey,
            ethAddress: ethAddress,
            scopes: {
              signAnything: permissionScopes[1],
              onlySignMessages: permissionScopes[2],
            },
          });
        }
      }

      // reverse the pkps order
      pkps.reverse();
      // console.log('pkps', pkps)
      return pkps

    } catch (error) {
      console.log('error lit contracts connect', error)
    }
  }

  getPublicKey() {
    return this.pkp || 'undefined'
  }
  
  async googleLogin() {
    const currentUri = typeof window !== 'undefined' ? window.location.href : undefined
    await this.store?.setItem('auth-redirect', currentUri)
    await this.getPKPProvider(AuthMethodType.GoogleJwt).signIn();
  }

  getGoogleProvider(redirectUri?: string) {
    // Initialize Google provider
    const provider = this.litAuthClient.initProvider(ProviderType.Google, {
      // The URL of your web app where users will be redirected after authentication
      redirectUri: this.redirectUri,

    })

    // const provider = this.litAuthClient.getProvider(
    //   ProviderType.Google,
    // ) as GoogleProvider;
    this.provider = provider
    return provider
  }

  async handleGoogleRedirect() {
    if (isSignInRedirect(this.redirectUri)) {
      // Get auth method object that has the OAuth token from redirect callback
      this.pkpStatus = PkpStatus.AUTH_PROVIDER
      const authMethod: AuthMethod = await this.getPKPProvider(AuthMethodType.GoogleJwt).authenticate();

      this.store?.setItem("lit-auth-method", JSON.stringify(authMethod));
      this.pkpStatus = PkpStatus.FETCH_PKP
      const pkp = await this.mintPKP()
      this.pkp = pkp
      this.pkpStatus = PkpStatus.SESSION_SIGS
      await this.createPKPWallet()
      this.pkpStatus = PkpStatus.AUTH_SUCCESS
    }
  }

  async getStytchProvider() {
    const provider = this.litAuthClient.initProvider(ProviderType.StytchOtp, {
      appId: process.env.NEXT_PUBLIC_STYTCH_APP_ID || '',
    });
    this.provider = provider
    return provider
  }

  async authenticateWithStytch(
    accessToken: string,
    userId?: string
  ) {
    const provider = await this.getStytchProvider()
    // @ts-ignore
    this.provider = provider

    const authMethod = await provider?.authenticate({ accessToken, userId });
    this.store?.setItem("lit-auth-method", JSON.stringify(authMethod));

    this.pkpStatus = PkpStatus.FETCH_PKP
    const pkp = await this.mintPKP()
    this.pkp = pkp
    this.pkpStatus = PkpStatus.SESSION_SIGS
    await this.createPKPWallet()
    this.pkpStatus = PkpStatus.AUTH_SUCCESS
    return authMethod;
  }

  // 
  // const authMethod = {accessToken
  //   : "eyJhbGciOiJSUzI1NiIsImtpZCI6Imp3ay10ZXN0LTBiMzIzZWU4LWM2NjEtNGI1OC04YjBlLWY4YmQ0YWYyMTg5NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicHJvamVjdC10ZXN0LWU3YTQwNjcyLTBlZWItNDBkNi1hNzg5LWExNDJiM2I4OTlhOSJdLCJleHAiOjE2OTk1Mzk1NzMsImh0dHBzOi8vc3R5dGNoLmNvbS9zZXNzaW9uIjp7ImlkIjoic2Vzc2lvbi10ZXN0LTUzYTFhZTA0LTcwNmEtNGI4ZC1iMjU2LTA5NWI1ZWQ3Y2UzYSIsInN0YXJ0ZWRfYXQiOiIyMDIzLTExLTA5VDE0OjA1OjI0WiIsImxhc3RfYWNjZXNzZWRfYXQiOiIyMDIzLTExLTA5VDE0OjE0OjMzWiIsImV4cGlyZXNfYXQiOiIyMDIzLTExLTA5VDE1OjE0OjMzWiIsImF0dHJpYnV0ZXMiOnsidXNlcl9hZ2VudCI6Ik1vemlsbGEvNS4wIChNYWNpbnRvc2g7IEludGVsIE1hYyBPUyBYIDEwXzE1XzcpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMTkuMC4wLjAgU2FmYXJpLzUzNy4zNiIsImlwX2FkZHJlc3MiOiI4My40MS41NS4yMDEifSwiYXV0aGVudGljYXRpb25fZmFjdG9ycyI6W3sidHlwZSI6Im90cCIsImRlbGl2ZXJ5X21ldGhvZCI6ImVtYWlsIiwibGFzdF9hdXRoZW50aWNhdGVkX2F0IjoiMjAyMy0xMS0wOVQxNDoxNDozM1oiLCJlbWFpbF9mYWN0b3IiOnsiZW1haWxfaWQiOiJlbWFpbC10ZXN0LTEwYzJhZTc0LWYzNjMtNDY1Zi05N2IzLWZkZGY0MTJlN2E1NCIsImVtYWlsX2FkZHJlc3MiOiJsdWRvQHBhY3Quc29jaWFsIn19XX0sImlhdCI6MTY5OTUzOTI3MywiaXNzIjoic3R5dGNoLmNvbS9wcm9qZWN0LXRlc3QtZTdhNDA2NzItMGVlYi00MGQ2LWE3ODktYTE0MmIzYjg5OWE5IiwibmJmIjoxNjk5NTM5MjczLCJzdWIiOiJ1c2VyLXRlc3QtNjJkNjNkN2MtN2M0MC00NjRlLWJhNGEtMzMzMDE5MWRlOWM1In0.EkirhN-48BxIPuZJ5U4JE3NWsuHJixnmlzSMwYTYE9WY_tfIexi43gjbuk8vBvwZHLPJosv2lsCNj9UQYLjZTzPpGr1NC5iRj3f6LdpV75KT5ES0YGLMtgApicZisMCDods8Ct1EIHNu4O1xLYFtcrz3uZgW0AqKLyPvH6cKmzWgB-gF-SWqrqwAPXlOE-um-iNzKs_qurg5VyvTpb8-1-lydBZnjUWgEA8Gz2c6jN33gjFwbQBD6f9gvmxUz6iNSpag2ZkaBsiAR5I3D6n63IyiUfWG3ENNZJjiQFomCcXZMuFojiuSC_s1fhOaCDhL2rJFCvqYVF4WsmjMjlo2FQ",
  //   authMethodType: 9}
  

  getPKPProvider(type: AuthMethodType, redirectUri?: string) {
    if (redirectUri) this.redirectUri = redirectUri
    if (!this.provider) {
      // Initialize Google provider
      switch (type) {
        case AuthMethodType.StytchOtp:
          return this.getStytchProvider()
          break;
        case AuthMethodType.GoogleJwt:
          
          return this.getGoogleProvider()
          break;
      
        default:
          return this.getStytchProvider()
          break;
      }
    }
    return this.provider
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
    const sessionSigs = await this.getPKPProvider(authMethod.authMethodType).getSessionSigs({
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
      const existingPKP = await this.fetchPKPs()
      const validPKPs = existingPKP?.filter(pkp => pkp.scopes.signAnything === true)
      // console.log('valid pkps', validPKPs)
      if (!validPKPs || validPKPs?.length === 0) {
        this.pkpStatus = PkpStatus.MINT_PKP
        const customArgs = {
          permittedAuthMethodScopes: [[1]], // ethers.BigNumber;
        };
        const tx = await this.mintPKPThroughRelayer(authMethod, customArgs)
        const newPKP = await this.getPKPProvider(authMethod.authMethodType)?.relay.pollRequestUntilTerminalState(tx)
        // const newPKP = await this.getPKPProvider().fetchPKPsThroughRelayer(authMethod)
        this.pkp = newPKP?.pkpPublicKey
        return this.pkp
      }
      this.pkp = validPKPs[0].publicKey
      return validPKPs[0].publicKey
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

  async decryptString(encryptedContent: any, forcedAuthSig = null) {
    /** Make sure Lit is ready before trying to decrypt the string */
    await this.connect();
    /** Retrieve AuthSig or used the one passed as a parameter */
    let authSig;
    if(forcedAuthSig) {
      authSig = forcedAuthSig;
    } else {
      authSig = await this.getAuthSig()
    }

    try {
      const decryptedString = await LitJsSdk.decryptToString(
        {
          accessControlConditions: JSON.parse(encryptedContent.accessControlConditions),
          ciphertext: encryptedContent.ciphertext,
          dataToEncryptHash: encryptedContent.dataToEncryptHash,
          authSig,
          chain: encryptedContent.chain,
        },
        this.litNodeClient,
      );
      
      return {
        decryptedString
      }
    } catch (error) {
      console.log('error', error) 
    }

    // /** Decode string encoded as b64 to be supported by Ceramic */
    // let decodedString;
    // try {
    //   decodedString = decodeb64(encryptedContent.ciphertext);
    // } catch(e) {
    //   console.log("Error decoding b64 string: ", e);
    //   throw e;
    // }
  
    // /** Instantiate the decrypted symmetric key */
    // let decryptedSymmKey;
  
    // /** Decrypt the message accroding to the chain the user is connected on  */
    // switch (encryptedContent.chain) {
    //   /** Decrypt for EVM users */
    //   case "ethereum":
    //     let _access;
    //     try {
    //       _access = JSON.parse(encryptedContent.accessControlConditions);
    //     } catch(e) {
    //       console.log("Couldn't parse accessControlConditions: ", e);
    //       throw e;
    //     }
  
    //     /** Get encryption key from Lit */
    //     try {
    //       decryptedSymmKey = await this.litNodeClient. getEncryptionKey({
    //         accessControlConditions: _access,
    //         toDecrypt: encryptedContent.dataToEncryptHash,
    //         chain: "ethereum",
    //         authSig
    //       })
    //     } catch(e) {
    //       console.log("Error getting encryptionKey for EVM: ", e);
    //       throw e;
    //     }
    //     break;
  
    //   /** Decrypt for Solana users */
    //   case "solana":
    //     let _rpcCond;
    //     try {
    //       _rpcCond = JSON.parse(encryptedContent.solRpcConditions);
    //     } catch(e) {
    //       console.log("Couldn't parse solRpcConditions: ", e);
    //       throw e;
    //     }
  
    //     /** Get encryption key from Lit */
    //     try {
    //       decryptedSymmKey = await this.litNodeClient.getEncryptionKey({
    //         solRpcConditions: _rpcCond,
    //         toDecrypt: encryptedContent.dataToEncryptHash,
    //         chain: "solana",
    //         authSig
    //       })
    //     } catch(e) {
    //       console.log("Error getting encryptionKey for Solana: ", e);
    //       throw e;
    //     }
    //     break;
    // }
  
    // /** Decrypt the string using the encryption key */
    // try {
    //     if (!decryptedSymmKey) throw new Error('no symmKey found')
    //     let _blob = new Blob([decodedString]);
    //     const decryptedString = await LitJsSdk.decryptString(_blob, decryptedSymmKey);
    //     return {
    //       decryptedString
    //     };
    // } catch(e) {
    //   console.log("Error decrypting string: ", e)
    //   throw e;
    // }
  }

  /** Encrypt string based on some access control conditions */
  async encryptString(body: string, chain = 'ethereum', accessControlConditions: any[]) {
    await this.connect();
    /** Step 2: Encrypt message */
    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString({
      accessControlConditions,
      authSig: await this.getAuthSig(),
      chain,
      dataToEncrypt: body,
    }, this.litNodeClient)

    return {
      ciphertext,
      dataToEncryptHash,
      accessControlConditions: JSON.stringify(accessControlConditions),
      chain,
      accessControlConditionType: 'accessControlConditions'
    }
   
    // const { encryptedString, symmetricKey } = await LitJsSdk.encryptString(body);

    // /** We convert the encrypted string to base64 to make it work with Ceramic */
    // let base64EncryptedString = await blobToBase64(encryptedString);

    // /** Step 4: Save encrypted content to lit nodes */
    // let encryptedSymmetricKey;
    // switch (chain) {
    //   /** Encrypt for EVM based on the access control conditions */
    //   case "ethereum":
    //     try {
    //       encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
    //         accessControlConditions,
    //         symmetricKey: symmetricKey,
    //         authSig: evmEmptyAuthSig,
    //         chain: "ethereum"
    //       });
    //     } catch(e) {
    //       console.log("Error encrypting string with Lit for EVM: ", e);
    //       throw new Error("Error encrypting string with Lit: " + e)
    //     }

    //     /** Step 5: Return encrypted content which will be stored on Ceramic (and needed to decrypt the content) */
    //     return {
    //       ciphertext: base64EncryptedString,
    //       dataToEncryptHash: buf2hex(encryptedSymmetricKey),
    //       accessControlConditions: JSON.stringify(accessControlConditions),
    //       chain,
    //       accessControlConditionType: 'v2accessControlConditionsEth'
    //     }

    //   /** Encrypt for Solana based on the sol rpc conditions */
    //   case "solana":
    //     try {
    //       encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
    //         solRpcConditions: accessControlConditions,
    //         symmetricKey: symmetricKey,
    //         authSig: solEmptyAuthSig,
    //         chain: "solana"
    //       });
    //     } catch(e) {
    //       console.log("Error encrypting string with Lit for Solana: ", e);
    //       throw new Error("Error encrypting string with Lit: " + e)
    //     }

    //     /** Step 5: Return encrypted content which will be stored on Ceramic (and needed to decrypt the content) */
    //     return {
    //       ciphertext: base64EncryptedString,
    //       dataToEncryptHash: buf2hex(encryptedSymmetricKey),
    //       accessControlConditions: JSON.stringify(accessControlConditions),
    //       chain,
    //       accessControlConditionType: 'v2accessControlConditionsSol'
    //     }
    // }
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
    if(address) {
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
    }

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
