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
const compose = new ComposeClient({ ceramic: CERAMIC_ADDRESS, definition: definition as RuntimeCompositeDefinition})


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
  let geoInfo = {}
  let q_ = Promise.resolve();

  // `seed` must be a 32-byte long Uint8Array
  async function authenticateCeramic(seed: Uint8Array) {
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
    payload.geo = geoInfo
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
      updated_at: Date.now(),
      raw_payload: JSON.stringify(payload)
    }
    if (flattened.properties_ref) cdbVariables.ref = flattened.properties_ref
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
    if (flattened.properties_width) cdbVariables.properties_width = flattened.properties_width
    if (flattened.properties_height) cdbVariables.properties_height = flattened.properties_height
    if (flattened.traits_email) cdbVariables.traits_email = flattened.traits_email
    if (flattened.type) cdbVariables.type = flattened.type
    if (flattened.userId) cdbVariables.userId = flattened.userId
    if (flattened.geo_autonomousSystemNumber) cdbVariables.geo_autonomousSystemNumber 
      = flattened.geo_autonomousSystemNumber
    if (flattened.geo_autonomousSystemOrganization) cdbVariables.geo_autonomousSystemOrganization 
      = flattened.geo_autonomousSystemOrganization
    if (flattened.geo_city_geonameId) cdbVariables.geo_city_geonameId 
      = flattened.geo_city_geonameId
    if (flattened.geo_city_name) cdbVariables.geo_city_name 
      = flattened.geo_city_name
    if (flattened.geo_continent_code) cdbVariables.geo_continent_code 
      = flattened.geo_continent_code
    if (flattened.geo_continent_geonameId) cdbVariables.geo_continent_geonameId 
      = flattened.geo_continent_geonameId
    if (flattened.geo_continent_name) cdbVariables.geo_continent_name 
      = flattened.geo_continent_name
    if (flattened.geo_country_geonameId) cdbVariables.geo_country_geonameId 
      = flattened.geo_country_geonameId
    if (flattened.geo_country_isoCode) cdbVariables.geo_country_isoCode 
      = flattened.geo_country_isoCode
    if (flattened.geo_country_name) cdbVariables.geo_country_name 
      = flattened.geo_country_name
    if (flattened.geo_location_accuracyRadius) cdbVariables.geo_location_accuracyRadius 
      = flattened.geo_location_accuracyRadius
    if (flattened.geo_location_latitude) cdbVariables.geo_location_latitude 
      = flattened.geo_location_latitude
    if (flattened.geo_location_longitude) cdbVariables.geo_location_longitude 
      = flattened.geo_location_longitude
    if (flattened.geo_location_metroCode) cdbVariables.geo_location_metroCode 
      = flattened.geo_location_metroCode
    if (flattened.geo_location_timeZone) cdbVariables.geo_location_timeZone 
      = flattened.geo_location_timeZone
    if (flattened.geo_postal) cdbVariables.geo_postal 
      = flattened.geo_postal
    if (flattened.geo_registeredCountry_geonameId) cdbVariables.geo_registeredCountry_geonameId 
      = flattened.geo_registeredCountry_geonameId
    if (flattened.geo_registeredCountry_isoCode) cdbVariables.geo_registeredCountry_isoCode 
      = flattened.geo_registeredCountry_isoCode
    if (flattened.geo_registeredCountry_name) cdbVariables.geo_registeredCountry_name 
      = flattened.geo_registeredCountry_name
    if (flattened.geo_subdivision_geonameId) cdbVariables.geo_subdivision_geonameId 
      = flattened.geo_subdivision_geonameId
    if (flattened.geo_subdivision_isoCode) cdbVariables.geo_subdivision_isoCode 
      = flattened.geo_subdivision_isoCode
    if (flattened.geo_subdivision_name) cdbVariables.geo_subdivision_name 
      = flattened.geo_subdivision_name
    if (flattened.hasOwnProperty('geo_traits_isAnonymous')) cdbVariables.geo_traits_isAnonymous 
      = flattened.geo_traits_isAnonymous    
    if (flattened.hasOwnProperty('geo_traits_isAnonymousProxy')) cdbVariables.geo_traits_isAnonymousProxy 
      = flattened.geo_traits_isAnonymousProxy
    if (flattened.hasOwnProperty('geo_traits_isAnonymousVpn')) cdbVariables.geo_traits_isAnonymousVpn 
      = flattened.geo_traits_isAnonymousVpn
    if (flattened.hasOwnProperty('geo_traits_isHostingProvider')) cdbVariables.geo_traits_isHostingProvider 
      = flattened.geo_traits_isHostingProvider
    if (flattened.hasOwnProperty('geo_traits_isLegitimateProxy')) cdbVariables.geo_traits_isLegitimateProxy 
      = flattened.geo_traits_isLegitimateProxy
    if (flattened.hasOwnProperty('geo_traits_isPublicProxy')) cdbVariables.geo_traits_isPublicProxy 
      = flattened.geo_traits_isPublicProxy
    if (flattened.hasOwnProperty('geo_traits_isResidentialProxy')) cdbVariables.geo_traits_isResidentialProxy 
      = flattened.geo_traits_isResidentialProxy
    if (flattened.hasOwnProperty('geo_traits_isSatelliteProvider')) cdbVariables.geo_traits_isSatelliteProvider 
      = flattened.geo_traits_isSatelliteProvider    
    if (flattened.hasOwnProperty('geo_traits_isTorExitNode')) cdbVariables.geo_traits_isTorExitNode 
      = flattened.geo_traits_isTorExitNode

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
