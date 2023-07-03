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

import { post } from '../composites/post.mjs';
import { pact } from '../composites/pact.mjs';
import { postToPact } from '../composites/postToPact.mjs';
import { topicToPact } from '../composites/topicToPact.mjs';
import { pactSignature } from '../composites/signature.mjs';
import { signatureToPact } from '../composites/signatureToPact.mjs';
import { profile } from '../composites/profile.mjs';
import { collectionPacts } from '../composites/collectionPacts.mjs'
import { collectionPactsView } from '../composites/collectionPactsView.mjs';

const spinner = ora();

const ceramic = new CeramicClient("http://localhost:7007");

/**
 * @param {Ora} spinner - to provide progress status.
 * @return {Promise<void>} - return void when composite finishes deploying.
 */
export const writeComposite = async () => {
  await authenticate()
  spinner.info("writing composite to Ceramic")

  // event analytics
  const eventComposite = await createComposite(ceramic, './composites/event.graphql');
  await writeEncodedComposite(eventComposite, "./src/__generated__/event_definition.json");

  // profile
  const privateStoreComposite = await createComposite(ceramic, './composites/privateStore.graphql');
  await writeEncodedComposite(privateStoreComposite, "./src/__generated__/private_store_definition.json");

  // profile
  const profileSchema = profile();
  writeFileSync('./src/__generated__/pactProfile.graphql', profileSchema);

  const profileComposite = await createComposite(ceramic, './src/__generated__/pactProfile.graphql');
  await writeEncodedComposite(profileComposite, "./src/__generated__/profile_definition.json");
  
  // topic
  const topicComposite = await createComposite(ceramic, './composites/topic.graphql');
  await writeEncodedComposite(topicComposite, "./src/__generated__/topic_definition.json");
  const { Topic } = topicComposite.toRuntime().models;

  // recipient
  const recipientComposite = await createComposite(ceramic, './composites/recipient.graphql');
  await writeEncodedComposite(recipientComposite, "./src/__generated__/recipient_definition.json");
  const { PactRecipient } = recipientComposite.toRuntime().models;

  // collection
  const collectionComposite = await createComposite(ceramic, './composites/collection.graphql');
  await writeEncodedComposite(collectionComposite, "./src/__generated__/collection_definition.json");
  const { Collection } = collectionComposite.toRuntime().models;

  // pact
  const pactSchema = pact(Topic.id);
  writeFileSync('./src/__generated__/pactSchema.graphql', pactSchema);

  const pactComposite = await createComposite(ceramic, './src/__generated__/pactSchema.graphql')
  await writeEncodedComposite(pactComposite, "./src/__generated__/pact_definition.json");
  const { Pact } = pactComposite.toRuntime().models;

  // collectionPacts
  const collectionPactsSchema = collectionPacts(Pact.id, Collection.id);
  writeFileSync('./src/__generated__/collectionPactsSchema.graphql', collectionPactsSchema);

  const collectionPactsComposite = await createComposite(ceramic, './src/__generated__/collectionPactsSchema.graphql')
  await writeEncodedComposite(collectionPactsComposite, "./src/__generated__/collectionPacts_definition.json");
  const { CollectionPact } = collectionPactsComposite.toRuntime().models;

  // collectionPactsView
  const collectionPactsViewSchema = collectionPactsView(CollectionPact.id, Pact.id, Collection.id)
  writeFileSync('./src/__generated__/collectionPactsViewSchema.graphql', collectionPactsViewSchema);

  const collectionPactsViewComposite = await createComposite(ceramic, './src/__generated__/collectionPactsViewSchema.graphql')
  await writeEncodedComposite(collectionPactsViewComposite, "./src/__generated__/collectionPactsView_definition.json");

  // post
  const postSchema = post(Pact.id);
  writeFileSync('./src/__generated__/postSchema.graphql', postSchema);
  const postComposite = await createComposite(ceramic, './src/__generated__/postSchema.graphql');
  await writeEncodedComposite(postComposite, "./src/__generated__/post_definition.json");
  const { Post } = postComposite.toRuntime().models;

  // relation post pact
  const postToPactView = postToPact(Post.id, Pact.id)
  writeFileSync('./src/__generated__/postToPactSchema.graphql', postToPactView);
  const postToPactComposite = await createComposite(ceramic, './src/__generated__/postToPactSchema.graphql')
  await writeEncodedComposite(postToPactComposite, "./src/__generated__/postToPact_definition.json");
  // const models = postToPactComposite.toRuntime().models;

  // relation topic pact
  const topicToPactView = topicToPact(Topic.id, Pact.id);
  writeFileSync('./src/__generated__/topicToPactSchema.graphql', topicToPactView);
  
  const topicToPactComposite = await createComposite(ceramic, './src/__generated__/topicToPactSchema.graphql')
  await writeEncodedComposite(topicToPactComposite, "./src/__generated__/topicToPact_definition.json");
  const models = topicToPactComposite.toRuntime().models;

  // doc and relation pact signature
  const pactSignatureView = pactSignature(models.Pact.id);
  writeFileSync('./src/__generated__/pactSignatureSchema.graphql', pactSignatureView);

  const pactSignatureComposite = await createComposite(ceramic, './src/__generated__/pactSignatureSchema.graphql')
  await writeEncodedComposite(pactSignatureComposite, "./src/__generated__/pactSignature_definition.json");
  const { PactSignature } = pactSignatureComposite.toRuntime().models;
  
  // relation signature on pact
  const signatureToPactView = signatureToPact(PactSignature.id, models.Pact.id);
  writeFileSync('./src/__generated__/signatureToPactSchema.graphql', signatureToPactView);

  const signatureToPactComposite = await createComposite(ceramic, './src/__generated__/signatureToPactSchema.graphql')
  await writeEncodedComposite(signatureToPactComposite, "./src/__generated__/signatureToPact_definition.json");

  spinner.info('creating composite for runtime usage')
  await mergeEncodedComposites(ceramic, [
    "./src/__generated__/event_definition.json",
    "./src/__generated__/private_store_definition.json",
    "./src/__generated__/profile_definition.json",
    // below definition is not needed in the encoded composite
    "./src/__generated__/topic_definition.json",
    "./src/__generated__/pact_definition.json",
    "./src/__generated__/collection_definition.json",
    "./src/__generated__/collectionPacts_definition.json",
    "./src/__generated__/collectionPactsView_definition.json",
    "./src/__generated__/post_definition.json",
    "./src/__generated__/postToPact_definition.json",
    "./src/__generated__/recipient_definition.json",
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
  await writeEncodedCompositeRuntime(
    ceramic,
    "./src/__generated__/event_definition.json",
    "./src/__generated__/event_definition.js"
  );
}

export const deployComposites = async () => {
  spinner.info('deploying composite')
  const deployComposite = await readEncodedComposite(ceramic, './src/__generated__/definition.json')

  await authenticate()
  await deployComposite.startIndexingOn(ceramic);
  spinner.succeed("composite deployed & ready for use");
}

/**
 * Authenticating DID for publishing composite
 * @return {Promise<void>} - return void when DID is authenticated.
 */
const authenticate = async () => {
  try {
    const seed = readFileSync('./admin_seed.txt')

    const key = fromString(
      seed,
      "base16"
    );
    const did = new DID({
      resolver: getResolver(),
      provider: new Ed25519Provider(key)
    })
    console.log('did', did)
    await did.authenticate()
    console.log('did authenticated', did)
    ceramic.did = did
  } catch (error) {
    console.log('error authenticating', error)
  }
}
export const start = async () => {
  try {
    spinner.info("[Composites] bootstrapping composites");
    await writeComposite()
    spinner.succeed("Composites] composites bootstrapped")
    await deployComposites(spinner)
  } catch(err) {
    console.log('error', err)
    spinner.fail(err)
  }
}

// start()
