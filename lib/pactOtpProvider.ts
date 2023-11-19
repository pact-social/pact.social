import type { Chain } from 'viem/chains'
import { Connector } from 'wagmi/connectors'
import { Lit } from './litUtils'
import { WalletClient } from 'wagmi'

export type PKPStytchConnectorOptions = {
  /**
   * While "disconnected" with `shimDisconnect`, allows user to select a different PKP account (than the currently connected account) when trying to connect.
   */
  lit: Lit
}

const delay = (ms: number) => {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
export class PKPStytchConnector extends Connector {
  name: string
  ready: boolean

  readonly id = 'pkp'
  private lit?: Lit;
  private pkp?: string;

  constructor({
    chains,
    options: options_,
  }: {
    chains?: Chain[]
    options?: PKPStytchConnectorOptions
  } = {}) {
    
    const options = {
      name: 'PKP',
      ...options_,
    }
    super({ chains, options })
    this.lit = options_?.lit
    this.name = 'Email'
    // this.getProvider()
    this.ready = true
  }

  async getUri () {
    if(typeof window !== 'undefined') {
      const loginHref = `${window.location.pathname}?stytch=open`
      window.location.href = loginHref
      return loginHref
    }
    return '/auth/otp'
  }

  async disconnect(): Promise<void> {
    await this.lit?.disconnect()
    return
    // throw new Error('Method not implemented.')
  }
  async getAccount(): Promise<`0x${string}`> {
    const pkpWallet = this.lit?.getPKPWallet()
    if (!pkpWallet) throw new Error('Not authenticated.')
    return pkpWallet.address as `0x${string}`
  }
  async getChainId(): Promise<number> {
    return 1
    // throw new Error('Method not implemented.')
  }
  getWalletClient(config?: { chainId?: number | undefined } | undefined): Promise<WalletClient> {
    // return this.lit?.getPKPWallet();
    throw new Error('Method not implemented.')
  }

  async waitAuth(): Promise<boolean> {
    const authSig = await this.lit?.getWalletSig()
    if(!authSig) {
      await delay(1000)
      return await this.waitAuth()
    }
    return true
  }

  async isAuthorized(): Promise<boolean> {
    const authSig = await this.lit?.getWalletSig()
    if (!authSig) {
      const urlParams = new URLSearchParams(window.location.search);
      if(urlParams.get('stytch') === 'open' ) {
        const res = await this.waitAuth()
        return res
      }
      // const urlParams = new URLSearchParams(window.location.search);
      // if (urlParams.get('provider') === 'google' && urlParams.has('id_token') && urlParams.has('state')) {
      //   await this.lit?.handleGoogleRedirect()
      //   return true
      // }
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
    if (typeof window === 'undefined') return
    const pkpWallet = this.lit?.getPKPWallet()
    if(pkpWallet) {
      return pkpWallet.rpcProvider
    }

    const wallet = await this.lit?.createPKPWallet()
    if (!wallet) throw new Error('no wallet created')

    return wallet.rpcProvider
  }

  async connect({ chainId }: { chainId?: number } = {}) {
    // check localstorage for authMethod
    const authSig = await this.lit?.getWalletSig()
    if(!authSig) {
      this.getUri()
    }
    
    const pkp = await this.lit?.mintPKP()
    // create wallet and get provider
    if (!authSig || !pkp) throw new Error('you must authenticate first')
    const pkpWallet = await this.lit?.createPKPWallet()

    return { 
      account: await this.getAccount(),
      chain: {
        id: 1,
        unsupported: false,
      }, 
      provider: pkpWallet?.rpcProvider
    }
  }
}
