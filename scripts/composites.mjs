import { readFileSync } from 'fs';
import { CeramicClient } from '@ceramicnetwork/http-client'
import {
  createComposite,
  readEncodedComposite,
  mergeEncodedComposites,
  writeEncodedComposite,
  writeEncodedCompositeRuntime,
} from "@composedb/devtools-node";

import { DID } from 'dids';
import { Ed25519Provider } from "key-did-provider-ed25519";
import { getResolver } from "key-did-resolver";
import { fromString } from "uint8arrays/from-string";

const ceramic = new CeramicClient("http://localhost:7007");

/**
 * @param {Ora} spinner - to provide progress status.
 * @return {Promise<void>} - return void when composite finishes deploying.
 */
export const writeComposite = async (spinner) => {
  await authenticate()
  spinner.info("writing composite to Ceramic")
  const profileComposite = await createComposite(ceramic, './composites/basicProfile.graphql')
  await writeEncodedComposite(profileComposite, "./src/__generated__/profile_definition.json");
  
  const topicComposite = await createComposite(ceramic, './composites/topic.graphql')
  await writeEncodedComposite(topicComposite, "./src/__generated__/topic_definition.json");
  
  const manifestComposite = await createComposite(ceramic, './composites/manifest.graphql')
  await writeEncodedComposite(manifestComposite, "./src/__generated__/manifest_definition.json");
  
  
  spinner.info('creating composite for runtime usage')
  await mergeEncodedComposites(ceramic, [
    "./src/__generated__/profile_definition.json",
    "./src/__generated__/topic_definition.json",
    "./src/__generated__/manifest_definition.json",
    ],
    "./src/__generated__/definition.json"
  )


  await writeEncodedCompositeRuntime(
    ceramic,
    "./src/__generated__/definition.json",
    "./src/__generated__/definition.js"
  );
  spinner.info('deploying composite')
  const deployComposite = await readEncodedComposite(ceramic, './src/__generated__/definition.json')

  await deployComposite.startIndexingOn(ceramic)
  spinner.succeed("composite deployed & ready for use");
}

/**
 * Authenticating DID for publishing composite
 * @return {Promise<void>} - return void when DID is authenticated.
 */
const authenticate = async () => {
  const seed = readFileSync('./admin_seed.txt')
  const key = fromString(
    seed,
    "base16"
  );
  const did = new DID({
    resolver: getResolver(),
    provider: new Ed25519Provider(key)
  })
  await did.authenticate()
  ceramic.did = did
}