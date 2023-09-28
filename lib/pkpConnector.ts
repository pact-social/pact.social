import {
  Abi,
  Account,
  AddChainParameters,
  DeployContractParameters,
  EIP1193RequestFn,
  GetAddressesReturnType,
  GetPermissionsReturnType,
  RequestAddressesReturnType,
  RequestPermissionsReturnType,
  SendTransactionParameters,
  SignMessageParameters,
  SignTypedDataParameters,
  SwitchChainParameters,
  TransportConfig,
  TypedDataParameter,
  WalletRpcSchema,
  WatchAssetParams,
  WriteContractParameters,
} from 'viem'
import type { Chain } from 'viem/chains'

// import { ConnectorNotFoundError } from 'viem/src'
// import type { InjectedConnectorOptions } from 'wagmi/connectors/injected'
// import { InjectedConnector } from 'wagmi'
// import { WindowProvider } from 'wagmi'
// import { ConnectorNotFoundError } from 'wagmi'
import { Connector } from 'wagmi/connectors'
import { Lit } from './litUtils'
import { PKPEthersWallet } from '@lit-protocol/pkp-ethers'
import { WalletClient } from 'wagmi'
// import { Provider } from '@ethersproject/providers'

export type PKPConnectorOptions = {
  /**
   * While "disconnected" with `shimDisconnect`, allows user to select a different PKP account (than the currently connected account) when trying to connect.
   */
  lit: Lit
}

export class PKPConnector extends Connector {
  name: string
  ready: boolean

  readonly id = 'pkp'
  private lit?: Lit;
  private pkpWallet?: PKPEthersWallet;
  private pkp?: string;

  constructor({
    chains,
    options: options_,
  }: {
    chains?: Chain[]
    options?: PKPConnectorOptions
  } = {}) {
    
    const options = {
      name: 'PKP',
      ...options_,
    }
    super({ chains, options })
    this.lit = options_?.lit
    this.name = 'GoogleConnect'
    // this.getProvider()
    this.ready = true
  }

  getLitClient(): Lit {
    if (!this.lit) throw new Error('no client')
    return this.lit
  }

  async disconnect(): Promise<void> {
    return
    // throw new Error('Method not implemented.')
  }
  async getAccount(): Promise<`0x${string}`> {
    console.log('pkpConnector getAccount')
    if (!this.pkpWallet) throw new Error('Not authenticated.')
    return this.pkpWallet.address as `0x${string}`
  }
  getChainId(): Promise<number> {
    throw new Error('Method not implemented.')
  }
  getWalletClient(config?: { chainId?: number | undefined } | undefined): Promise<WalletClient> {
    throw new Error('Method not implemented.')
    // return this.pkpWallet;
  }
  getPkpWalletClient(config?: { chainId?: number | undefined } | undefined) {
    // throw new Error('Method not implemented.')
    return this.pkpWallet;
  }
  async isAuthorized(): Promise<boolean> {
    const authSig = await this.lit?.getAuthSig()
    console.log('pkpConnector isAuthorized', !!authSig, authSig)
    if (!authSig) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('provider') === 'google' && urlParams.has('id_token') && urlParams.has('state')) {
        await this.lit?.handleGoogleRedirect()
        return true
      }
      return false
    }
    return true
  }
  protected onAccountsChanged(accounts: `0x${string}`[]): void {
    throw new Error('Method not implemented.')
  }
  protected onChainChanged(chain: string | number): void {
    throw new Error('Method not implemented.')
  }
  protected onDisconnect(error: Error): void {
    throw new Error('Method not implemented.')
  }

  async getProvider(config?: { chainId?: number; }) {
    console.log('pkpConnector getProvider')
    // function getReady(ethereum?: WindowProvider) {
    //   const isMetaMask = !!ethereum?.isMetaMask
    //   if (!isMetaMask) return
    //   // Brave tries to make itself look like MetaMask
    //   // Could also try RPC `web3_clientVersion` if following is unreliable
    //   if (ethereum.isBraveWallet && !ethereum._events && !ethereum._state)
    //     return
    // }

    if (typeof window === 'undefined') return
    if(this.pkpWallet) {
      console.log('pkpWallet', this.pkpWallet, this.pkpWallet.provider)
      // await this.pkpWallet.connect()
      return this.pkpWallet.rpcProvider
    }
    // const ethereum = (window as unknown as { ethereum?: WindowProvider })
    //   .ethereum
    // if (ethereum?.providers) return ethereum.providers.find(getReady)
    // return getReady(ethereum)
    const wallet = await this.lit?.createPKPWallet()
    if (!wallet) throw new Error('no wallet created')
    // await wallet.connect()
    this.pkpWallet = wallet
    console.log('getProvider', wallet.provider, wallet)
    // if (!wallet.provider) throw new Error('cannot find provider')
    return this.pkpWallet.rpcProvider
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    console.log('pkpConnector connect', chainId)

    // check localstorage for authSig
    const authSig = await this.lit?.getAuthSig()
    // if not try generate authSig first
    // if authSig, authenticate
    // fetch pkps for account
    const pkps = await this.lit?.mintPKP()
    this.pkp = pkps
    console.log('pkpConnect auth', authSig, this.pkp)
    // create wallet and get provider
    if (!authSig || !this.pkp) throw new Error('you must authenticate first')
    const pkpProvider = this.lit?.getPKPProvider()
    const pkpList = await pkpProvider?.fetchPKPsThroughRelayer(authSig)
    console.log('pkpList', pkpList, pkpProvider, this.pkp)
    const pkpWallet = new PKPEthersWallet({
      controllerAuthSig: authSig,
      // Or you can also pass in controllerSessionSigs
      pkpPubKey: this.pkp,
      rpc: "https://chain-rpc.litprotocol.com/http",
      // rpc: 'https://eth-mainnet.g.alchemy.com/v2/IDWVV0sgoqdHQAgWzE0-BWs3088ibvJH',
    });
    await pkpWallet.init();
    console.log('pkpWallet', pkpWallet, this.lit?.getClient())
    this.pkpWallet = pkpWallet;

    return { 
      account: await this.getAccount(),
      chain: {
        id: 1,
        unsupported: false,
      }, 
      provider: pkpWallet.rpcProvider
    }



    // try {
    //   const provider = await this.getProvider()
    //   if (!provider) throw new ConnectorNotFoundError()

    //   if (provider.on) {
    //     provider.on('accountsChanged', this.onAccountsChanged)
    //     provider.on('chainChanged', this.onChainChanged)
    //     provider.on('disconnect', this.onDisconnect)
    //   }

    //   this.emit('message', { type: 'connecting' })

    //   // Attempt to show wallet select prompt with `wallet_requestPermissions` when
    //   // `shimDisconnect` is active and account is in disconnected state (flag in storage)
    //   let account: Address | null = null
    //   if (
    //     this.options?.shimDisconnect &&
    //     !this.storage?.getItem(this.shimDisconnectKey)
    //   ) {
    //     account = await this.getAccount().catch(() => null)
    //     const isConnected = !!account
    //     if (isConnected)
    //       // Attempt to show another prompt for selecting wallet if already connected
    //       try {
    //         await provider.request({
    //           method: 'wallet_requestPermissions',
    //           params: [{ eth_accounts: {} }],
    //         })
    //         // User may have selected a different account so we will need to revalidate here.
    //         account = await this.getAccount()
    //       } catch (error) {
    //         // Not all MetaMask injected providers support `wallet_requestPermissions` (e.g. MetaMask iOS).
    //         // Only bubble up error if user rejects request
    //         if (this.isUserRejectedRequestError(error))
    //           throw new UserRejectedRequestError(error as Error)
    //         // Or MetaMask is already open
    //         if (
    //           (error as ProviderRpcError).code ===
    //           new ResourceUnavailableRpcError(error as ProviderRpcError).code
    //         )
    //           throw error
    //       }
    //   }

    //   if (!account) {
    //     const accounts = await provider.request({
    //       method: 'eth_requestAccounts',
    //     })
    //     account = getAddress(accounts[0] as string)
    //   }

    //   // Switch to chain if provided
    //   let id = await this.getChainId()
    //   let unsupported = this.isChainUnsupported(id)
    //   if (chainId && id !== chainId) {
    //     const chain = await this.switchChain(chainId)
    //     id = chain.id
    //     unsupported = this.isChainUnsupported(id)
    //   }

    //   if (this.options?.shimDisconnect)
    //     this.storage?.setItem(this.shimDisconnectKey, true)

    //   return { account, chain: { id, unsupported }, provider }
    // } catch (error) {
    //   if (this.isUserRejectedRequestError(error))
    //     throw new UserRejectedRequestError(error as Error)
    //   if ((error as ProviderRpcError).code === -32002)
    //     throw new ResourceUnavailableRpcError(error as ProviderRpcError)
    //   throw error
    // }
  }
}
