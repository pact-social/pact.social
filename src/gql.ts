export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  CeramicCommitID: any;
  CeramicStreamID: any;
  CountryCode: any;
  DID: any;
  DateTime: any;
  InterPlanetaryCID: any;
  Locale: any;
  URI: any;
};

export type BooleanValueFilterInput = {
  equalTo?: InputMaybe<Scalars['Boolean']>;
  isNull?: InputMaybe<Scalars['Boolean']>;
};

export type CeramicAccount = Node & {
  __typename?: 'CeramicAccount';
  collectionList?: Maybe<CollectionConnection>;
  collectionListCount: Scalars['Int'];
  collectionPactList?: Maybe<CollectionPactConnection>;
  collectionPactListCount: Scalars['Int'];
  eventList?: Maybe<EventConnection>;
  eventListCount: Scalars['Int'];
  /** Globally unique identifier of the account (DID string) */
  id: Scalars['ID'];
  /** Whether the Ceramic instance is currently authenticated with this account or not */
  isViewer: Scalars['Boolean'];
  pactList?: Maybe<PactConnection>;
  pactListCount: Scalars['Int'];
  pactProfile?: Maybe<PactProfile>;
  pactRecipientList?: Maybe<PactRecipientConnection>;
  pactRecipientListCount: Scalars['Int'];
  pactSignatureList?: Maybe<PactSignatureConnection>;
  pactSignatureListCount: Scalars['Int'];
  pactSubscribeList?: Maybe<PactSubscribeConnection>;
  pactSubscribeListCount: Scalars['Int'];
  postList?: Maybe<PostConnection>;
  postListCount: Scalars['Int'];
  privateStoreList?: Maybe<PrivateStoreConnection>;
  privateStoreListCount: Scalars['Int'];
  recipientList?: Maybe<RecipientConnection>;
  recipientListCount: Scalars['Int'];
  socialTemplateList?: Maybe<SocialTemplateConnection>;
  socialTemplateListCount: Scalars['Int'];
  topicList?: Maybe<TopicConnection>;
  topicListCount: Scalars['Int'];
};


export type CeramicAccountCollectionListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CeramicAccountCollectionPactListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CeramicAccountEventListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CeramicAccountPactListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CeramicAccountPactRecipientListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CeramicAccountPactSignatureListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CeramicAccountPactSubscribeListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<PactSubscribeFiltersInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sorting?: InputMaybe<PactSubscribeSortingInput>;
};


export type CeramicAccountPactSubscribeListCountArgs = {
  filters?: InputMaybe<PactSubscribeFiltersInput>;
};


export type CeramicAccountPostListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CeramicAccountPrivateStoreListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CeramicAccountRecipientListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CeramicAccountSocialTemplateListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CeramicAccountTopicListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Collection = Node & {
  __typename?: 'Collection';
  /** Account controlling the document */
  author: CeramicAccount;
  collectionPacts: CollectionPactConnection;
  collectionPactsCount: Scalars['Int'];
  deleted?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  media?: Maybe<Array<Maybe<CollectionPublicationMetadataMedia>>>;
  name: Scalars['String'];
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
};


export type CollectionCollectionPactsArgs = {
  account?: InputMaybe<Scalars['ID']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CollectionCollectionPactsCountArgs = {
  account?: InputMaybe<Scalars['ID']>;
};

/** A connection to a list of items. */
export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CollectionEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Collection>;
};

export type CollectionInput = {
  deleted?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  media?: InputMaybe<Array<InputMaybe<CollectionPublicationMetadataMediaInput>>>;
  name: Scalars['String'];
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type CollectionPact = Node & {
  __typename?: 'CollectionPact';
  /** Account controlling the document */
  author: CeramicAccount;
  collection?: Maybe<Collection>;
  collectionID: Scalars['CeramicStreamID'];
  deleted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  pact?: Maybe<Pact>;
  pactID: Scalars['CeramicStreamID'];
};

/** A connection to a list of items. */
export type CollectionPactConnection = {
  __typename?: 'CollectionPactConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<CollectionPactEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CollectionPactEdge = {
  __typename?: 'CollectionPactEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<CollectionPact>;
};

export type CollectionPactInput = {
  collectionID: Scalars['CeramicStreamID'];
  deleted?: InputMaybe<Scalars['Boolean']>;
  pactID: Scalars['CeramicStreamID'];
};

export type CollectionPublicationMetadataMedia = {
  __typename?: 'CollectionPublicationMetadataMedia';
  altTag?: Maybe<Scalars['String']>;
  cid?: Maybe<Scalars['InterPlanetaryCID']>;
  cover?: Maybe<Scalars['String']>;
  item?: Maybe<Scalars['URI']>;
  type?: Maybe<Scalars['String']>;
};

export type CollectionPublicationMetadataMediaInput = {
  altTag?: InputMaybe<Scalars['String']>;
  cid?: InputMaybe<Scalars['InterPlanetaryCID']>;
  cover?: InputMaybe<Scalars['String']>;
  item?: InputMaybe<Scalars['URI']>;
  type?: InputMaybe<Scalars['String']>;
};

export type CreateCollectionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: CollectionInput;
};

export type CreateCollectionPactInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: CollectionPactInput;
};

export type CreateCollectionPactPayload = {
  __typename?: 'CreateCollectionPactPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: CollectionPact;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateCollectionPactPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type CreateCollectionPayload = {
  __typename?: 'CreateCollectionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: Collection;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateCollectionPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type CreateEventInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: EventInput;
};

export type CreateEventPayload = {
  __typename?: 'CreateEventPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: Event;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateEventPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type CreatePactInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PactInput;
};

export type CreatePactPayload = {
  __typename?: 'CreatePactPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: Pact;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreatePactPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type CreatePactProfileInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PactProfileInput;
};

export type CreatePactProfilePayload = {
  __typename?: 'CreatePactProfilePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: PactProfile;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreatePactProfilePayloadNodeArgs = {
  id: Scalars['ID'];
};

export type CreatePactRecipientInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PactRecipientInput;
};

export type CreatePactRecipientPayload = {
  __typename?: 'CreatePactRecipientPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: PactRecipient;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreatePactRecipientPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type CreatePactSignatureInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PactSignatureInput;
};

export type CreatePactSignaturePayload = {
  __typename?: 'CreatePactSignaturePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: PactSignature;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreatePactSignaturePayloadNodeArgs = {
  id: Scalars['ID'];
};

export type CreatePactSubscribeInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PactSubscribeInput;
};

export type CreatePactSubscribePayload = {
  __typename?: 'CreatePactSubscribePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: PactSubscribe;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreatePactSubscribePayloadNodeArgs = {
  id: Scalars['ID'];
};

export type CreatePostInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PostInput;
};

export type CreatePostPayload = {
  __typename?: 'CreatePostPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: Post;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreatePostPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type CreatePrivateStoreInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PrivateStoreInput;
};

export type CreatePrivateStorePayload = {
  __typename?: 'CreatePrivateStorePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: PrivateStore;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreatePrivateStorePayloadNodeArgs = {
  id: Scalars['ID'];
};

export type CreateRecipientInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: RecipientInput;
};

export type CreateRecipientPayload = {
  __typename?: 'CreateRecipientPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: Recipient;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateRecipientPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type CreateSocialTemplateInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: SocialTemplateInput;
};

export type CreateSocialTemplatePayload = {
  __typename?: 'CreateSocialTemplatePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: SocialTemplate;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateSocialTemplatePayloadNodeArgs = {
  id: Scalars['ID'];
};

export type CreateTopicInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: TopicInput;
};

export type CreateTopicPayload = {
  __typename?: 'CreateTopicPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: Topic;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateTopicPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type Event = Node & {
  __typename?: 'Event';
  anonymousId?: Maybe<Scalars['String']>;
  app_id: Scalars['String'];
  created_at: Scalars['DateTime'];
  did: CeramicAccount;
  event?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  meta_rid?: Maybe<Scalars['String']>;
  meta_ts?: Maybe<Scalars['String']>;
  properties_hash?: Maybe<Scalars['String']>;
  properties_path?: Maybe<Scalars['String']>;
  properties_referrer?: Maybe<Scalars['String']>;
  properties_search?: Maybe<Scalars['String']>;
  properties_title?: Maybe<Scalars['String']>;
  properties_url?: Maybe<Scalars['String']>;
  referral?: Maybe<CeramicAccount>;
  type?: Maybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type EventConnection = {
  __typename?: 'EventConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<EventEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type EventEdge = {
  __typename?: 'EventEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Event>;
};

export type EventInput = {
  anonymousId?: InputMaybe<Scalars['String']>;
  app_id: Scalars['String'];
  created_at: Scalars['DateTime'];
  did: Scalars['DID'];
  event?: InputMaybe<Scalars['String']>;
  meta_rid?: InputMaybe<Scalars['String']>;
  meta_ts?: InputMaybe<Scalars['String']>;
  properties_hash?: InputMaybe<Scalars['String']>;
  properties_path?: InputMaybe<Scalars['String']>;
  properties_referrer?: InputMaybe<Scalars['String']>;
  properties_search?: InputMaybe<Scalars['String']>;
  properties_title?: InputMaybe<Scalars['String']>;
  properties_url?: InputMaybe<Scalars['String']>;
  referral?: InputMaybe<Scalars['DID']>;
  type?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCollection?: Maybe<CreateCollectionPayload>;
  createCollectionPact?: Maybe<CreateCollectionPactPayload>;
  createEvent?: Maybe<CreateEventPayload>;
  createPact?: Maybe<CreatePactPayload>;
  createPactProfile?: Maybe<CreatePactProfilePayload>;
  createPactRecipient?: Maybe<CreatePactRecipientPayload>;
  createPactSignature?: Maybe<CreatePactSignaturePayload>;
  createPactSubscribe?: Maybe<CreatePactSubscribePayload>;
  createPost?: Maybe<CreatePostPayload>;
  createPrivateStore?: Maybe<CreatePrivateStorePayload>;
  createRecipient?: Maybe<CreateRecipientPayload>;
  createSocialTemplate?: Maybe<CreateSocialTemplatePayload>;
  createTopic?: Maybe<CreateTopicPayload>;
  updateCollection?: Maybe<UpdateCollectionPayload>;
  updateCollectionPact?: Maybe<UpdateCollectionPactPayload>;
  updateEvent?: Maybe<UpdateEventPayload>;
  updatePact?: Maybe<UpdatePactPayload>;
  updatePactProfile?: Maybe<UpdatePactProfilePayload>;
  updatePactRecipient?: Maybe<UpdatePactRecipientPayload>;
  updatePactSignature?: Maybe<UpdatePactSignaturePayload>;
  updatePactSubscribe?: Maybe<UpdatePactSubscribePayload>;
  updatePost?: Maybe<UpdatePostPayload>;
  updatePrivateStore?: Maybe<UpdatePrivateStorePayload>;
  updateRecipient?: Maybe<UpdateRecipientPayload>;
  updateSocialTemplate?: Maybe<UpdateSocialTemplatePayload>;
  updateTopic?: Maybe<UpdateTopicPayload>;
};


export type MutationCreateCollectionArgs = {
  input: CreateCollectionInput;
};


export type MutationCreateCollectionPactArgs = {
  input: CreateCollectionPactInput;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreatePactArgs = {
  input: CreatePactInput;
};


export type MutationCreatePactProfileArgs = {
  input: CreatePactProfileInput;
};


export type MutationCreatePactRecipientArgs = {
  input: CreatePactRecipientInput;
};


export type MutationCreatePactSignatureArgs = {
  input: CreatePactSignatureInput;
};


export type MutationCreatePactSubscribeArgs = {
  input: CreatePactSubscribeInput;
};


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreatePrivateStoreArgs = {
  input: CreatePrivateStoreInput;
};


export type MutationCreateRecipientArgs = {
  input: CreateRecipientInput;
};


export type MutationCreateSocialTemplateArgs = {
  input: CreateSocialTemplateInput;
};


export type MutationCreateTopicArgs = {
  input: CreateTopicInput;
};


export type MutationUpdateCollectionArgs = {
  input: UpdateCollectionInput;
};


export type MutationUpdateCollectionPactArgs = {
  input: UpdateCollectionPactInput;
};


export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


export type MutationUpdatePactArgs = {
  input: UpdatePactInput;
};


export type MutationUpdatePactProfileArgs = {
  input: UpdatePactProfileInput;
};


export type MutationUpdatePactRecipientArgs = {
  input: UpdatePactRecipientInput;
};


export type MutationUpdatePactSignatureArgs = {
  input: UpdatePactSignatureInput;
};


export type MutationUpdatePactSubscribeArgs = {
  input: UpdatePactSubscribeInput;
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdatePrivateStoreArgs = {
  input: UpdatePrivateStoreInput;
};


export type MutationUpdateRecipientArgs = {
  input: UpdateRecipientInput;
};


export type MutationUpdateSocialTemplateArgs = {
  input: UpdateSocialTemplateInput;
};


export type MutationUpdateTopicArgs = {
  input: UpdateTopicInput;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
};

export type Pact = Node & {
  __typename?: 'Pact';
  animation_url?: Maybe<Scalars['URI']>;
  archived?: Maybe<Scalars['Boolean']>;
  /** Account controlling the document */
  author: CeramicAccount;
  collectionsPact: CollectionPactConnection;
  collectionsPactCount: Scalars['Int'];
  content: Scalars['String'];
  contentWarning?: Maybe<PactPublicationContentWarning>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  external_url?: Maybe<Scalars['URI']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['URI']>;
  imageMimeType?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['Locale']>;
  mainContentFocus?: Maybe<PactPublicationMainFocus>;
  media?: Maybe<Array<Maybe<PactPublicationMetadataMedia>>>;
  metadata?: Maybe<Scalars['String']>;
  pactRecipients: PactRecipientConnection;
  pactRecipientsCount: Scalars['Int'];
  posts: PostConnection;
  postsCount: Scalars['Int'];
  signatures: PactSignatureConnection;
  signaturesCount: Scalars['Int'];
  socialTemplates: SocialTemplateConnection;
  sourceUrl?: Maybe<Scalars['String']>;
  subscriptions: PactSubscribeConnection;
  subscriptionsCount: Scalars['Int'];
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title: Scalars['String'];
  topic?: Maybe<Topic>;
  topicID: Scalars['CeramicStreamID'];
  type?: Maybe<PactType>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  /** Current version of the document */
  version: Scalars['CeramicCommitID'];
};


export type PactCollectionsPactArgs = {
  account?: InputMaybe<Scalars['ID']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PactCollectionsPactCountArgs = {
  account?: InputMaybe<Scalars['ID']>;
};


export type PactPactRecipientsArgs = {
  account?: InputMaybe<Scalars['ID']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PactPactRecipientsCountArgs = {
  account?: InputMaybe<Scalars['ID']>;
};


export type PactPostsArgs = {
  account?: InputMaybe<Scalars['ID']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PactPostsCountArgs = {
  account?: InputMaybe<Scalars['ID']>;
};


export type PactSignaturesArgs = {
  account?: InputMaybe<Scalars['ID']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PactSignaturesCountArgs = {
  account?: InputMaybe<Scalars['ID']>;
};


export type PactSocialTemplatesArgs = {
  account?: InputMaybe<Scalars['ID']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PactSubscriptionsArgs = {
  account?: InputMaybe<Scalars['ID']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<PactSubscribeFiltersInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sorting?: InputMaybe<PactSubscribeSortingInput>;
};


export type PactSubscriptionsCountArgs = {
  account?: InputMaybe<Scalars['ID']>;
  filters?: InputMaybe<PactSubscribeFiltersInput>;
};

/** A connection to a list of items. */
export type PactConnection = {
  __typename?: 'PactConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PactEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PactEdge = {
  __typename?: 'PactEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Pact>;
};

export type PactInput = {
  animation_url?: InputMaybe<Scalars['URI']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  content: Scalars['String'];
  contentWarning?: InputMaybe<PactPublicationContentWarning>;
  createdAt: Scalars['DateTime'];
  description?: InputMaybe<Scalars['String']>;
  external_url?: InputMaybe<Scalars['URI']>;
  image?: InputMaybe<Scalars['URI']>;
  imageMimeType?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['Locale']>;
  mainContentFocus?: InputMaybe<PactPublicationMainFocus>;
  media?: InputMaybe<Array<InputMaybe<PactPublicationMetadataMediaInput>>>;
  metadata?: InputMaybe<Scalars['String']>;
  sourceUrl?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title: Scalars['String'];
  topicID: Scalars['CeramicStreamID'];
  type?: InputMaybe<PactType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PactProfile = Node & {
  __typename?: 'PactProfile';
  bio?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['CountryCode']>;
  email?: Maybe<PactProfileEncryptedLitContent>;
  id: Scalars['ID'];
  latitude?: Maybe<Scalars['Float']>;
  locale?: Maybe<Scalars['Locale']>;
  longitude?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  organisation?: Maybe<Scalars['String']>;
  profileBanner?: Maybe<Scalars['InterPlanetaryCID']>;
  profilePicture?: Maybe<Scalars['InterPlanetaryCID']>;
  title?: Maybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type PactProfileConnection = {
  __typename?: 'PactProfileConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PactProfileEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PactProfileEdge = {
  __typename?: 'PactProfileEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<PactProfile>;
};

export type PactProfileEncryptedLitContent = {
  __typename?: 'PactProfileEncryptedLitContent';
  accessControlConditions: Scalars['String'];
  encryptedString: Scalars['String'];
  encryptedSymmetricKey: Scalars['String'];
};

export type PactProfileEncryptedLitContentInput = {
  accessControlConditions: Scalars['String'];
  encryptedString: Scalars['String'];
  encryptedSymmetricKey: Scalars['String'];
};

export type PactProfileInput = {
  bio?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['CountryCode']>;
  email?: InputMaybe<PactProfileEncryptedLitContentInput>;
  latitude?: InputMaybe<Scalars['Float']>;
  locale?: InputMaybe<Scalars['Locale']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  organisation?: InputMaybe<Scalars['String']>;
  profileBanner?: InputMaybe<Scalars['InterPlanetaryCID']>;
  profilePicture?: InputMaybe<Scalars['InterPlanetaryCID']>;
  title?: InputMaybe<Scalars['String']>;
};

export enum PactPublicationContentWarning {
  Nsfw = 'NSFW',
  Sensitive = 'SENSITIVE',
  Spoiler = 'SPOILER'
}

export enum PactPublicationMainFocus {
  Article = 'ARTICLE',
  Audio = 'AUDIO',
  Embed = 'EMBED',
  Image = 'IMAGE',
  Link = 'LINK',
  TextOnly = 'TEXT_ONLY',
  Video = 'VIDEO'
}

export type PactPublicationMetadataMedia = {
  __typename?: 'PactPublicationMetadataMedia';
  altTag?: Maybe<Scalars['String']>;
  cid?: Maybe<Scalars['InterPlanetaryCID']>;
  cover?: Maybe<Scalars['String']>;
  item?: Maybe<Scalars['URI']>;
  type?: Maybe<Scalars['String']>;
};

export type PactPublicationMetadataMediaInput = {
  altTag?: InputMaybe<Scalars['String']>;
  cid?: InputMaybe<Scalars['InterPlanetaryCID']>;
  cover?: InputMaybe<Scalars['String']>;
  item?: InputMaybe<Scalars['URI']>;
  type?: InputMaybe<Scalars['String']>;
};

export type PactRecipient = Node & {
  __typename?: 'PactRecipient';
  /** Account controlling the document */
  author: CeramicAccount;
  deleted?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  pact?: Maybe<Pact>;
  pactID: Scalars['CeramicStreamID'];
  recipient?: Maybe<Recipient>;
  recipientID: Scalars['CeramicStreamID'];
};

/** A connection to a list of items. */
export type PactRecipientConnection = {
  __typename?: 'PactRecipientConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PactRecipientEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PactRecipientEdge = {
  __typename?: 'PactRecipientEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<PactRecipient>;
};

export type PactRecipientInput = {
  deleted?: InputMaybe<Scalars['Boolean']>;
  pactID: Scalars['CeramicStreamID'];
  recipientID: Scalars['CeramicStreamID'];
};

export type PactSignature = Node & {
  __typename?: 'PactSignature';
  /** Account controlling the document */
  author: CeramicAccount;
  id: Scalars['ID'];
  metadata?: Maybe<Scalars['String']>;
  pact?: Maybe<Pact>;
  pactID: Scalars['CeramicStreamID'];
  pactVersion: Scalars['CeramicCommitID'];
  referral?: Maybe<CeramicAccount>;
  signature?: Maybe<Scalars['String']>;
  signedAt: Scalars['DateTime'];
  turnToken?: Maybe<Scalars['String']>;
  visibility?: Maybe<PactSignatureVisibilityType>;
};

/** A connection to a list of items. */
export type PactSignatureConnection = {
  __typename?: 'PactSignatureConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PactSignatureEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PactSignatureEdge = {
  __typename?: 'PactSignatureEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<PactSignature>;
};

export type PactSignatureInput = {
  metadata?: InputMaybe<Scalars['String']>;
  pactID: Scalars['CeramicStreamID'];
  pactVersion: Scalars['CeramicCommitID'];
  referral?: InputMaybe<Scalars['DID']>;
  signature?: InputMaybe<Scalars['String']>;
  signedAt: Scalars['DateTime'];
  turnToken?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<PactSignatureVisibilityType>;
};

export enum PactSignatureVisibilityType {
  Anon = 'anon',
  Private = 'private',
  Public = 'public'
}

export type PactSubscribe = Node & {
  __typename?: 'PactSubscribe';
  archived?: Maybe<Scalars['Boolean']>;
  /** Account controlling the document */
  author: CeramicAccount;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  pact?: Maybe<Pact>;
  pactID: Scalars['CeramicStreamID'];
  recipient?: Maybe<PrivateStore>;
  recipientID: Scalars['CeramicStreamID'];
};

/** A connection to a list of items. */
export type PactSubscribeConnection = {
  __typename?: 'PactSubscribeConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PactSubscribeEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PactSubscribeEdge = {
  __typename?: 'PactSubscribeEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<PactSubscribe>;
};

export type PactSubscribeFiltersInput = {
  and?: InputMaybe<Array<PactSubscribeFiltersInput>>;
  not?: InputMaybe<PactSubscribeFiltersInput>;
  or?: InputMaybe<Array<PactSubscribeFiltersInput>>;
  where?: InputMaybe<PactSubscribeObjectFilterInput>;
};

export type PactSubscribeInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  pactID: Scalars['CeramicStreamID'];
  recipientID: Scalars['CeramicStreamID'];
};

export type PactSubscribeObjectFilterInput = {
  archived?: InputMaybe<BooleanValueFilterInput>;
  createdAt?: InputMaybe<StringValueFilterInput>;
};

export type PactSubscribeSortingInput = {
  archived?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
};

export enum PactType {
  Manifesto = 'manifesto',
  Openletter = 'openletter',
  Petition = 'petition'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PartialCollectionInput = {
  deleted?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  media?: InputMaybe<Array<InputMaybe<CollectionPublicationMetadataMediaInput>>>;
  name?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type PartialCollectionPactInput = {
  collectionID?: InputMaybe<Scalars['CeramicStreamID']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  pactID?: InputMaybe<Scalars['CeramicStreamID']>;
};

export type PartialEventInput = {
  anonymousId?: InputMaybe<Scalars['String']>;
  app_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  did?: InputMaybe<Scalars['DID']>;
  event?: InputMaybe<Scalars['String']>;
  meta_rid?: InputMaybe<Scalars['String']>;
  meta_ts?: InputMaybe<Scalars['String']>;
  properties_hash?: InputMaybe<Scalars['String']>;
  properties_path?: InputMaybe<Scalars['String']>;
  properties_referrer?: InputMaybe<Scalars['String']>;
  properties_search?: InputMaybe<Scalars['String']>;
  properties_title?: InputMaybe<Scalars['String']>;
  properties_url?: InputMaybe<Scalars['String']>;
  referral?: InputMaybe<Scalars['DID']>;
  type?: InputMaybe<Scalars['String']>;
};

export type PartialPactInput = {
  animation_url?: InputMaybe<Scalars['URI']>;
  archived?: InputMaybe<Scalars['Boolean']>;
  content?: InputMaybe<Scalars['String']>;
  contentWarning?: InputMaybe<PactPublicationContentWarning>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  external_url?: InputMaybe<Scalars['URI']>;
  image?: InputMaybe<Scalars['URI']>;
  imageMimeType?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['Locale']>;
  mainContentFocus?: InputMaybe<PactPublicationMainFocus>;
  media?: InputMaybe<Array<InputMaybe<PactPublicationMetadataMediaInput>>>;
  metadata?: InputMaybe<Scalars['String']>;
  sourceUrl?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
  topicID?: InputMaybe<Scalars['CeramicStreamID']>;
  type?: InputMaybe<PactType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PartialPactProfileInput = {
  bio?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['CountryCode']>;
  email?: InputMaybe<PactProfileEncryptedLitContentInput>;
  latitude?: InputMaybe<Scalars['Float']>;
  locale?: InputMaybe<Scalars['Locale']>;
  longitude?: InputMaybe<Scalars['Float']>;
  name?: InputMaybe<Scalars['String']>;
  organisation?: InputMaybe<Scalars['String']>;
  profileBanner?: InputMaybe<Scalars['InterPlanetaryCID']>;
  profilePicture?: InputMaybe<Scalars['InterPlanetaryCID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PartialPactRecipientInput = {
  deleted?: InputMaybe<Scalars['Boolean']>;
  pactID?: InputMaybe<Scalars['CeramicStreamID']>;
  recipientID?: InputMaybe<Scalars['CeramicStreamID']>;
};

export type PartialPactSignatureInput = {
  metadata?: InputMaybe<Scalars['String']>;
  pactID?: InputMaybe<Scalars['CeramicStreamID']>;
  pactVersion?: InputMaybe<Scalars['CeramicCommitID']>;
  referral?: InputMaybe<Scalars['DID']>;
  signature?: InputMaybe<Scalars['String']>;
  signedAt?: InputMaybe<Scalars['DateTime']>;
  turnToken?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<PactSignatureVisibilityType>;
};

export type PartialPactSubscribeInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  pactID?: InputMaybe<Scalars['CeramicStreamID']>;
  recipientID?: InputMaybe<Scalars['CeramicStreamID']>;
};

export type PartialPostInput = {
  animation_url?: InputMaybe<Scalars['URI']>;
  content?: InputMaybe<Scalars['String']>;
  contentWarning?: InputMaybe<PostPublicationContentWarning>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  external_url?: InputMaybe<Scalars['URI']>;
  image?: InputMaybe<Scalars['URI']>;
  imageMimeType?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['Locale']>;
  mainContentFocus?: InputMaybe<PostPublicationMainFocus>;
  media?: InputMaybe<Array<InputMaybe<PostPublicationMetadataMediaInput>>>;
  metadata?: InputMaybe<Scalars['String']>;
  pactID?: InputMaybe<Scalars['CeramicStreamID']>;
  sourceUrl?: InputMaybe<Scalars['URI']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PartialPrivateStoreInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  encryptedContent?: InputMaybe<PrivateStoreEncryptedLitContentInput>;
  model?: InputMaybe<Scalars['String']>;
};

export type PartialRecipientInput = {
  contact?: InputMaybe<Scalars['String']>;
  isVerified?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<Scalars['DID']>;
};

export type PartialSocialTemplateInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  content?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  pactID?: InputMaybe<Scalars['CeramicStreamID']>;
  primaryTemplate?: InputMaybe<Scalars['Boolean']>;
};

export type PartialTopicInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type Post = Node & {
  __typename?: 'Post';
  animation_url?: Maybe<Scalars['URI']>;
  /** Account controlling the document */
  author: CeramicAccount;
  content?: Maybe<Scalars['String']>;
  contentWarning?: Maybe<PostPublicationContentWarning>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  external_url?: Maybe<Scalars['URI']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['URI']>;
  imageMimeType?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['Locale']>;
  mainContentFocus?: Maybe<PostPublicationMainFocus>;
  media?: Maybe<Array<Maybe<PostPublicationMetadataMedia>>>;
  metadata?: Maybe<Scalars['String']>;
  pact?: Maybe<Pact>;
  pactID: Scalars['CeramicStreamID'];
  sourceUrl?: Maybe<Scalars['URI']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** A connection to a list of items. */
export type PostConnection = {
  __typename?: 'PostConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PostEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PostEdge = {
  __typename?: 'PostEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Post>;
};

export type PostInput = {
  animation_url?: InputMaybe<Scalars['URI']>;
  content?: InputMaybe<Scalars['String']>;
  contentWarning?: InputMaybe<PostPublicationContentWarning>;
  createdAt: Scalars['DateTime'];
  description?: InputMaybe<Scalars['String']>;
  external_url?: InputMaybe<Scalars['URI']>;
  image?: InputMaybe<Scalars['URI']>;
  imageMimeType?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['Locale']>;
  mainContentFocus?: InputMaybe<PostPublicationMainFocus>;
  media?: InputMaybe<Array<InputMaybe<PostPublicationMetadataMediaInput>>>;
  metadata?: InputMaybe<Scalars['String']>;
  pactID: Scalars['CeramicStreamID'];
  sourceUrl?: InputMaybe<Scalars['URI']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export enum PostPublicationContentWarning {
  Nsfw = 'NSFW',
  Sensitive = 'SENSITIVE',
  Spoiler = 'SPOILER'
}

export enum PostPublicationMainFocus {
  Article = 'ARTICLE',
  Audio = 'AUDIO',
  Embed = 'EMBED',
  Image = 'IMAGE',
  Link = 'LINK',
  TextOnly = 'TEXT_ONLY',
  Video = 'VIDEO'
}

export type PostPublicationMetadataMedia = {
  __typename?: 'PostPublicationMetadataMedia';
  altTag?: Maybe<Scalars['String']>;
  cid?: Maybe<Scalars['InterPlanetaryCID']>;
  cover?: Maybe<Scalars['String']>;
  item?: Maybe<Scalars['URI']>;
  type?: Maybe<Scalars['String']>;
};

export type PostPublicationMetadataMediaInput = {
  altTag?: InputMaybe<Scalars['String']>;
  cid?: InputMaybe<Scalars['InterPlanetaryCID']>;
  cover?: InputMaybe<Scalars['String']>;
  item?: InputMaybe<Scalars['URI']>;
  type?: InputMaybe<Scalars['String']>;
};

export type PrivateStore = Node & {
  __typename?: 'PrivateStore';
  archived?: Maybe<Scalars['Boolean']>;
  encryptedContent: PrivateStoreEncryptedLitContent;
  id: Scalars['ID'];
  model?: Maybe<Scalars['String']>;
};

/** A connection to a list of items. */
export type PrivateStoreConnection = {
  __typename?: 'PrivateStoreConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<PrivateStoreEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PrivateStoreEdge = {
  __typename?: 'PrivateStoreEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<PrivateStore>;
};

export type PrivateStoreEncryptedLitContent = {
  __typename?: 'PrivateStoreEncryptedLitContent';
  accessControlConditions: Scalars['String'];
  encryptedString: Scalars['String'];
  encryptedSymmetricKey: Scalars['String'];
};

export type PrivateStoreEncryptedLitContentInput = {
  accessControlConditions: Scalars['String'];
  encryptedString: Scalars['String'];
  encryptedSymmetricKey: Scalars['String'];
};

export type PrivateStoreInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  encryptedContent: PrivateStoreEncryptedLitContentInput;
  model?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  collectionCount: Scalars['Int'];
  collectionIndex?: Maybe<CollectionConnection>;
  collectionPactCount: Scalars['Int'];
  collectionPactIndex?: Maybe<CollectionPactConnection>;
  eventCount: Scalars['Int'];
  eventIndex?: Maybe<EventConnection>;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Fetches objects given their IDs */
  nodes: Array<Maybe<Node>>;
  pactCount: Scalars['Int'];
  pactIndex?: Maybe<PactConnection>;
  pactProfileCount: Scalars['Int'];
  pactProfileIndex?: Maybe<PactProfileConnection>;
  pactRecipientCount: Scalars['Int'];
  pactRecipientIndex?: Maybe<PactRecipientConnection>;
  pactSignatureCount: Scalars['Int'];
  pactSignatureIndex?: Maybe<PactSignatureConnection>;
  pactSubscribeCount: Scalars['Int'];
  pactSubscribeIndex?: Maybe<PactSubscribeConnection>;
  postCount: Scalars['Int'];
  postIndex?: Maybe<PostConnection>;
  privateStoreCount: Scalars['Int'];
  privateStoreIndex?: Maybe<PrivateStoreConnection>;
  recipientCount: Scalars['Int'];
  recipientIndex?: Maybe<RecipientConnection>;
  socialTemplateCount: Scalars['Int'];
  socialTemplateIndex?: Maybe<SocialTemplateConnection>;
  topicCount: Scalars['Int'];
  topicIndex?: Maybe<TopicConnection>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type QueryCollectionIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryCollectionPactIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryEventIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryPactIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryPactProfileIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryPactRecipientIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryPactSignatureIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryPactSubscribeCountArgs = {
  filters?: InputMaybe<PactSubscribeFiltersInput>;
};


export type QueryPactSubscribeIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  filters?: InputMaybe<PactSubscribeFiltersInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  sorting?: InputMaybe<PactSubscribeSortingInput>;
};


export type QueryPostIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryPrivateStoreIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryRecipientIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QuerySocialTemplateIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryTopicIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Recipient = Node & {
  __typename?: 'Recipient';
  /** Account controlling the document */
  author: CeramicAccount;
  contact?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isVerified: Scalars['Boolean'];
  name: Scalars['String'];
  pactsRecipient: PactRecipientConnection;
  pactsRecipientCount: Scalars['Int'];
  profile?: Maybe<CeramicAccount>;
};


export type RecipientPactsRecipientArgs = {
  account?: InputMaybe<Scalars['ID']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type RecipientPactsRecipientCountArgs = {
  account?: InputMaybe<Scalars['ID']>;
};

/** A connection to a list of items. */
export type RecipientConnection = {
  __typename?: 'RecipientConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<RecipientEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type RecipientEdge = {
  __typename?: 'RecipientEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Recipient>;
};

export type RecipientInput = {
  contact?: InputMaybe<Scalars['String']>;
  isVerified: Scalars['Boolean'];
  name: Scalars['String'];
  profile?: InputMaybe<Scalars['DID']>;
};

export type SocialTemplate = Node & {
  __typename?: 'SocialTemplate';
  archived?: Maybe<Scalars['Boolean']>;
  /** Account controlling the document */
  author: CeramicAccount;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  pact?: Maybe<Pact>;
  pactID: Scalars['CeramicStreamID'];
  primaryTemplate?: Maybe<Scalars['Boolean']>;
};

/** A connection to a list of items. */
export type SocialTemplateConnection = {
  __typename?: 'SocialTemplateConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<SocialTemplateEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SocialTemplateEdge = {
  __typename?: 'SocialTemplateEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<SocialTemplate>;
};

export type SocialTemplateInput = {
  archived?: InputMaybe<Scalars['Boolean']>;
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  pactID: Scalars['CeramicStreamID'];
  primaryTemplate?: InputMaybe<Scalars['Boolean']>;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type StringValueFilterInput = {
  equalTo?: InputMaybe<Scalars['String']>;
  greaterThan?: InputMaybe<Scalars['String']>;
  greaterThanOrEqualTo?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  isNull?: InputMaybe<Scalars['Boolean']>;
  lessThan?: InputMaybe<Scalars['String']>;
  lessThanOrEqualTo?: InputMaybe<Scalars['String']>;
  notEqualTo?: InputMaybe<Scalars['String']>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
};

export type Topic = Node & {
  __typename?: 'Topic';
  /** Account controlling the document */
  author: CeramicAccount;
  id: Scalars['ID'];
  name: Scalars['String'];
  pacts: PactConnection;
  pactsCount: Scalars['Int'];
};


export type TopicPactsArgs = {
  account?: InputMaybe<Scalars['ID']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type TopicPactsCountArgs = {
  account?: InputMaybe<Scalars['ID']>;
};

/** A connection to a list of items. */
export type TopicConnection = {
  __typename?: 'TopicConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<TopicEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type TopicEdge = {
  __typename?: 'TopicEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Topic>;
};

export type TopicInput = {
  name: Scalars['String'];
};

export type UpdateCollectionInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialCollectionInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateCollectionPactInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialCollectionPactInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateCollectionPactPayload = {
  __typename?: 'UpdateCollectionPactPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: CollectionPact;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateCollectionPactPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type UpdateCollectionPayload = {
  __typename?: 'UpdateCollectionPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: Collection;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateCollectionPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type UpdateEventInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialEventInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateEventPayload = {
  __typename?: 'UpdateEventPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: Event;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateEventPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type UpdateOptionsInput = {
  /** Fully replace the document contents instead of performing a shallow merge */
  replace?: InputMaybe<Scalars['Boolean']>;
  /** Only perform mutation if the document matches the provided version */
  version?: InputMaybe<Scalars['CeramicCommitID']>;
};

export type UpdatePactInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialPactInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdatePactPayload = {
  __typename?: 'UpdatePactPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: Pact;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdatePactPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type UpdatePactProfileInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialPactProfileInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdatePactProfilePayload = {
  __typename?: 'UpdatePactProfilePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: PactProfile;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdatePactProfilePayloadNodeArgs = {
  id: Scalars['ID'];
};

export type UpdatePactRecipientInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialPactRecipientInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdatePactRecipientPayload = {
  __typename?: 'UpdatePactRecipientPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: PactRecipient;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdatePactRecipientPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type UpdatePactSignatureInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialPactSignatureInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdatePactSignaturePayload = {
  __typename?: 'UpdatePactSignaturePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: PactSignature;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdatePactSignaturePayloadNodeArgs = {
  id: Scalars['ID'];
};

export type UpdatePactSubscribeInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialPactSubscribeInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdatePactSubscribePayload = {
  __typename?: 'UpdatePactSubscribePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: PactSubscribe;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdatePactSubscribePayloadNodeArgs = {
  id: Scalars['ID'];
};

export type UpdatePostInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialPostInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdatePostPayload = {
  __typename?: 'UpdatePostPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: Post;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdatePostPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type UpdatePrivateStoreInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialPrivateStoreInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdatePrivateStorePayload = {
  __typename?: 'UpdatePrivateStorePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: PrivateStore;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdatePrivateStorePayloadNodeArgs = {
  id: Scalars['ID'];
};

export type UpdateRecipientInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialRecipientInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateRecipientPayload = {
  __typename?: 'UpdateRecipientPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: Recipient;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateRecipientPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type UpdateSocialTemplateInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialSocialTemplateInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateSocialTemplatePayload = {
  __typename?: 'UpdateSocialTemplatePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: SocialTemplate;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateSocialTemplatePayloadNodeArgs = {
  id: Scalars['ID'];
};

export type UpdateTopicInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialTopicInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateTopicPayload = {
  __typename?: 'UpdateTopicPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: Topic;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateTopicPayloadNodeArgs = {
  id: Scalars['ID'];
};
