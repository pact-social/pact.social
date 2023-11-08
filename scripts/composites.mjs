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
import { pactSubscribe, pactWithSubscribe } from '../composites/pactSubscribe.mjs';
import { socialTemplate, socialTemplateToPact } from '../composites/socialTemplate.mjs';
import { recipient, pactRecipient, pactRecipientView } from '../composites/recipient.mjs';

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
  const { PrivateStore } = privateStoreComposite.toRuntime().models;
  // profile
  const profileSchema = profile();
  writeFileSync('./src/__generated__/pactProfile.graphql', profileSchema);

  const profileComposite = await createComposite(ceramic, './src/__generated__/pactProfile.graphql');
  await writeEncodedComposite(profileComposite, "./src/__generated__/profile_definition.json");
  
  // topic
  const topicComposite = await createComposite(ceramic, './composites/topic.graphql');
  await writeEncodedComposite(topicComposite, "./src/__generated__/topic_definition.json");
  const { Topic } = topicComposite.toRuntime().models;

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

  // subscribe pact
  console.log('PrivateStore.id', PrivateStore.id, PrivateStore)
  const subscribeView = pactSubscribe(models.Pact.id, PrivateStore.id)
  writeFileSync('./src/__generated__/subscribeSchema.graphql', subscribeView);
  
  const subscribeComposite = await createComposite(ceramic, './src/__generated__/subscribeSchema.graphql')
  await writeEncodedComposite(subscribeComposite, "./src/__generated__/subscribe_definition.json");
  const { PactSubscribe } = subscribeComposite.toRuntime().models;

  const pactToSubscribeView = pactWithSubscribe(models.Pact.id, PactSubscribe.id)
  writeFileSync('./src/__generated__/pactToSubscribeSchema.graphql', pactToSubscribeView);

  const pactToSubscribeComposite = await createComposite(ceramic, './src/__generated__/pactToSubscribeSchema.graphql')
  await writeEncodedComposite(pactToSubscribeComposite, "./src/__generated__/pactToSubscribe_definition.json");


  // social template pact
  const socialTemplateView = socialTemplate(models.Pact.id)
  writeFileSync('./src/__generated__/socialTemplateSchema.graphql', socialTemplateView);
  
  const socialTemplateComposite = await createComposite(ceramic, './src/__generated__/socialTemplateSchema.graphql')
  await writeEncodedComposite(socialTemplateComposite, "./src/__generated__/socialTemplate_definition.json");
  const { SocialTemplate } = socialTemplateComposite.toRuntime().models;

  const socialTemplateToPactView = socialTemplateToPact(models.Pact.id, SocialTemplate.id)
  writeFileSync('./src/__generated__/socialTemplateToPactSchema.graphql', socialTemplateToPactView);

  const socialTemplateToPactComposite = await createComposite(ceramic, './src/__generated__/socialTemplateToPactSchema.graphql')
  await writeEncodedComposite(socialTemplateToPactComposite, "./src/__generated__/socialTemplateToPact_definition.json");

  // recipient
  const recipientModel = recipient()
  writeFileSync('./src/__generated__/recipient.graphql', recipientModel);

  const recipientComposite = await createComposite(ceramic, './src/__generated__/recipient.graphql')
  await writeEncodedComposite(recipientComposite, "./src/__generated__/recipient_definition.json");
  const { Recipient } = recipientComposite.toRuntime().models;
  
  // pactRecipient
  const pactRecipientModel = pactRecipient(Pact.id, Recipient.id)
  writeFileSync('./src/__generated__/pactRecipient.graphql', pactRecipientModel);

  const pactRecipientComposite = await createComposite(ceramic, './src/__generated__/pactRecipient.graphql')
  await writeEncodedComposite(pactRecipientComposite, "./src/__generated__/pactRecipient_definition.json");
  const { PactRecipient } = pactRecipientComposite.toRuntime().models;
  
  // pactRecipientView
  const pactRecipientViewModel = pactRecipientView(Pact.id, Recipient.id, PactRecipient.id)
  writeFileSync('./src/__generated__/pactRecipientView.graphql', pactRecipientViewModel);

  const pactRecipientViewComposite = await createComposite(ceramic, './src/__generated__/pactRecipientView.graphql')
  await writeEncodedComposite(pactRecipientViewComposite, "./src/__generated__/pactRecipientView_definition.json");
  // const { PactRecipientView } = recipientComposite.toRuntime().models;

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
    "./src/__generated__/subscribe_definition.json",
    "./src/__generated__/pactToSubscribe_definition.json",
    "./src/__generated__/socialTemplate_definition.json",
    "./src/__generated__/socialTemplateToPact_definition.json",
    "./src/__generated__/recipient_definition.json",
    "./src/__generated__/pactRecipient_definition.json",
    "./src/__generated__/pactRecipientView_definition.json",
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
      seed.toString().trim(),
      "base16"
    );
    const did = new DID({
      resolver: getResolver(),
      provider: new Ed25519Provider(key)
    })

    await did.authenticate()

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
