import { ComposeClient } from '@composedb/client'
import { definition } from '../../src/__generated__/event_definition.js'
import { DID } from 'dids';
import { Ed25519Provider } from 'key-did-provider-ed25519'
import KeyResolver from 'key-did-resolver'
import flatten from 'flat'
import { RuntimeCompositeDefinition } from '@composedb/types';

type PayloadType = {
  [x: string]: any;
  geo: {};
  meta: { ts: { toString: () => any; }; }; 
}

const CERAMIC_ADDRESS = process.env.NEXT_PUBLIC_CERAMIC || 'http://localhost:7007'


// Set up Ceramic ComposeDB
const compose = new ComposeClient({ ceramic: CERAMIC_ADDRESS, definition: definition as unknown as RuntimeCompositeDefinition})


/**
 * web3Analytics v3 plugin
 * @param {object}  userConfig - Plugin settings
 * @param {string}  pluginConfig.appId - The app ID (an ETH address) you received from web3 analytics (required)
 * @param {string}  pluginConfig.jsonRpcUrl - Your JSON RPC url (required)
 * @param {string}  pluginConfig.logLevel - Log level may be debug, info, warn, error (default). Param is optional
 * @example
 *
 * web3Analytics({
 *   appId: 'YOUR_APP_ID',
 *   jsonRpcUrl: 'YOUR_JSONRPC_URL'
 * })
 */

export default function web3Analytics(userConfig: { appId: any; loglevel?: string; }) {
  const appId = userConfig.appId
  let web3AnalyticsLoaded = false
  
  let authenticatedDID: DID
  let q_ = Promise.resolve();

  // `seed` must be a 32-byte long Uint8Array
  async function authenticateCeramic(seed: Uint8Array) {
      // This will go in infinit loop if you try to auth on the frontend
      const provider = new Ed25519Provider(seed)
      const did = new DID({ provider, resolver: KeyResolver.getResolver() })

      // Authenticate the DID with the provider
      await did.authenticate()

      // The ComposeDB client can create and update streams using the authenticated DID
      compose.setDID(did)
      return did;
  }

  function queue(fn: ((value: void) => void | PromiseLike<void>) | null | undefined) {
    q_ = q_.then(fn);
    return q_;
  }

  async function sendEvent(payload: PayloadType, authenticatedDID: { id: any; }) {
    // Flatten payload
    let flattened = payload
    try {
      flattened = flatten(payload, {delimiter:'_'})
    } catch (err) {
      console.error(err)
    }

    let cdbVariables: {[x: string]: any} = {
      app_id: appId,
      did: authenticatedDID.id,
      created_at: (new Date()).toISOString(),
    }
    if (flattened.properties_referral) cdbVariables.referral = flattened.properties_referral
    if (flattened.anonymousId) cdbVariables.anonymousId = flattened.anonymousId
    if (flattened.event) cdbVariables.event = flattened.event
    if (flattened.meta_ts) cdbVariables.meta_ts = payload.meta.ts.toString()
    if (flattened.meta_rid) cdbVariables.meta_rid = flattened.meta_rid
    if (flattened.properties_url) cdbVariables.properties_url = flattened.properties_url
    if (flattened.properties_hash) cdbVariables.properties_hash = flattened.properties_hash
    if (flattened.properties_path) cdbVariables.properties_path = flattened.properties_path
    if (flattened.properties_title) cdbVariables.properties_title = flattened.properties_title
    if (flattened.properties_referrer) cdbVariables.properties_referrer = flattened.properties_referrer
    if (flattened.properties_search) cdbVariables.properties_search = flattened.properties_search
    if (flattened.type) cdbVariables.type = flattened.type

    // Create Event using ComposeDB
    const createResult = await compose.executeQuery(`
        mutation CreateNewEvent($i: CreateEventInput!){
            createEvent(input: $i){
                document{
                    id
                }
            }
        }
    `,
      {
        "i": {
          "content": cdbVariables
        }
      }
    )
  }
  
    
  // Return object for analytics to use
  return {
    name: 'web3analytics',
    config: {},
    initialize: async () => {
      let seed;
      if (typeof window === 'undefined') return;
      const localSeed = localStorage.getItem('ceramicSeed')
      if (!localSeed) {
          // Create new seed
          seed = crypto.getRandomValues(new Uint8Array(32));
          localStorage.setItem('ceramicSeed', JSON.stringify(Array.from(seed)));
      } else {
          // Use existing seed
          seed = new Uint8Array(JSON.parse(localSeed));
      }
      
      // const privateKey = "0x"+ u8aToString(seed, 'base16')

      // Authenticate Ceramic
      authenticatedDID = await authenticateCeramic(seed)
      localStorage.setItem('authenticatedDID', authenticatedDID.id);
      
      // enable tracking      
      if (typeof window != 'undefined') {
        web3AnalyticsLoaded = true 
      }
      
    },
    page: async ({ payload }: { payload: PayloadType}) => {
      queue(sendEvent.bind(null, payload, authenticatedDID));
    },
    track: async ({ payload }: { payload: PayloadType}) => {
      queue(sendEvent.bind(null, payload, authenticatedDID));
    },
    identify: async ({ payload }: { payload: PayloadType}) => {
      queue(sendEvent.bind(null, payload, authenticatedDID));
    },
    loaded: () => {
      if (typeof window == 'undefined') return false;
      return !!web3AnalyticsLoaded;
    }
  }
}
