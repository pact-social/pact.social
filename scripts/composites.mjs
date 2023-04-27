import ora from 'ora'
import { readFileSync, writeFileSync } from 'fs';
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

import { pact } from '../composites/pact.mjs';
import { topicToPact } from '../composites/topicToPact.mjs';
import { pactSignature } from '../composites/signature.mjs';
import { signatureToPact } from '../composites/signatureToPact.mjs';

const spinner = ora();

const ceramic = new CeramicClient("http://localhost:7007");

/**
 * @param {Ora} spinner - to provide progress status.
 * @return {Promise<void>} - return void when composite finishes deploying.
 */
export const writeComposite = async (spinner) => {
  await authenticate()
  spinner.info("writing composite to Ceramic")

  // profile
  const privateStoreComposite = await createComposite(ceramic, './composites/privateStore.graphql');
  await writeEncodedComposite(privateStoreComposite, "./src/__generated__/private_store_definition.json");

  // profile
  const profileComposite = await createComposite(ceramic, './composites/pactProfile.graphql');
  await writeEncodedComposite(profileComposite, "./src/__generated__/profile_definition.json");
  
  // topic
  const topicComposite = await createComposite(ceramic, './composites/topic.graphql');
  await writeEncodedComposite(topicComposite, "./src/__generated__/topic_definition.json");
  
  // recipient
  const recipientComposite = await createComposite(ceramic, './composites/recipient.graphql');
  await writeEncodedComposite(recipientComposite, "./src/__generated__/recipient_definition.json");

  // pact
  const pactSchema = pact(topicComposite.modelIDs[0], recipientComposite.modelIDs[0]);
  writeFileSync('./src/__generated__/pactSchema.graphql', pactSchema);

  const pactComposite = await createComposite(ceramic, './src/__generated__/pactSchema.graphql')
  await writeEncodedComposite(pactComposite, "./src/__generated__/pact_definition.json");

  // relation topic pact
  const topicToPactView = topicToPact(topicComposite.modelIDs[0], pactComposite.modelIDs[1]);
  writeFileSync('./src/__generated__/topicToPactSchema.graphql', topicToPactView);
  
  const topicToPactComposite = await createComposite(ceramic, './src/__generated__/topicToPactSchema.graphql')
  await writeEncodedComposite(topicToPactComposite, "./src/__generated__/topicToPact_definition.json");
  
  // doc and relation pact signature
  const pactSignatureView = pactSignature(topicToPactComposite.modelIDs[0]);
  writeFileSync('./src/__generated__/pactSignatureSchema.graphql', pactSignatureView);

  const pactSignatureComposite = await createComposite(ceramic, './src/__generated__/pactSignatureSchema.graphql')
  await writeEncodedComposite(pactSignatureComposite, "./src/__generated__/pactSignature_definition.json");
  
  // relation signature on pact
  const signatureToPactView = signatureToPact(pactSignatureComposite.modelIDs[1], topicToPactComposite.modelIDs[0]);
  writeFileSync('./src/__generated__/signatureToPactSchema.graphql', signatureToPactView);

  const signatureToPactComposite = await createComposite(ceramic, './src/__generated__/signatureToPactSchema.graphql')
  await writeEncodedComposite(signatureToPactComposite, "./src/__generated__/signatureToPact_definition.json");

  spinner.info('creating composite for runtime usage')
  await mergeEncodedComposites(ceramic, [
    "./src/__generated__/private_store_definition.json",
    "./src/__generated__/profile_definition.json",
    // below definition is not needed in the encoded composite
    // "./src/__generated__/topic_definition.json",
    "./src/__generated__/recipient_definition.json",
    "./src/__generated__/pact_definition.json",
    "./src/__generated__/topicToPact_definition.json",
    "./src/__generated__/pactSignature_definition.json",
    "./src/__generated__/signatureToPact_definition.json",
    ],
    "./src/__generated__/definition.json"
  )


  await writeEncodedCompositeRuntime(
    ceramic,
    "./src/__generated__/definition.json",
    "./src/__generated__/definition.js"
  );
}

export const deployComposites = async (spinner) => {
  spinner.info('deploying composite')
  const deployComposite = await readEncodedComposite(ceramic, './src/__generated__/definition.json')

  await deployComposite.startIndexingOn(ceramic);
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
const start = async () => {
  try {
    spinner.info("[Composites] bootstrapping composites");
    await writeComposite(spinner)
    spinner.succeed("Composites] composites bootstrapped")
    await deployComposites(spinner)
  } catch(err) {
    spinner.fail(err)
  }
}

start()
