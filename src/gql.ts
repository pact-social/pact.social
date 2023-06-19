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

export type CeramicAccount = Node & {
  __typename?: 'CeramicAccount';
  collectionList?: Maybe<CollectionConnection>;
  collectionPactList?: Maybe<CollectionPactConnection>;
  eventList?: Maybe<EventConnection>;
  /** Globally unique identifier of the account (DID string) */
  id: Scalars['ID'];
  /** Whether the Ceramic instance is currently authenticated with this account or not */
  isViewer: Scalars['Boolean'];
  pactList?: Maybe<PactConnection>;
  pactProfile?: Maybe<PactProfile>;
  pactRecipientList?: Maybe<PactRecipientConnection>;
  pactSignatureList?: Maybe<PactSignatureConnection>;
  postList?: Maybe<PostConnection>;
  privateStoreList?: Maybe<PrivateStoreConnection>;
  topicList?: Maybe<TopicConnection>;
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


export type CeramicAccountTopicListArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Collection = Node & {
  __typename?: 'Collection';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  media?: Maybe<Array<Maybe<CollectionPublicationMetadataMedia>>>;
  name?: Maybe<Scalars['String']>;
  pacts: CollectionPactConnection;
  pactsCount: Scalars['Int'];
};


export type CollectionPactsArgs = {
  account?: InputMaybe<Scalars['ID']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type CollectionPactsCountArgs = {
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
  description?: InputMaybe<Scalars['String']>;
  media?: InputMaybe<Array<InputMaybe<CollectionPublicationMetadataMediaInput>>>;
  name?: InputMaybe<Scalars['String']>;
};

export type CollectionPact = Node & {
  __typename?: 'CollectionPact';
  collection?: Maybe<Pact>;
  collectionID: Scalars['CeramicStreamID'];
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
  geo_continent_code?: Maybe<Scalars['String']>;
  geo_continent_geonameId?: Maybe<Scalars['Int']>;
  geo_continent_name?: Maybe<Scalars['String']>;
  geo_country_geonameId?: Maybe<Scalars['Int']>;
  geo_country_isoCode?: Maybe<Scalars['String']>;
  geo_country_name?: Maybe<Scalars['String']>;
  geo_location_timeZone?: Maybe<Scalars['String']>;
  geo_registeredCountry_geonameId?: Maybe<Scalars['Int']>;
  geo_registeredCountry_isoCode?: Maybe<Scalars['String']>;
  geo_registeredCountry_name?: Maybe<Scalars['String']>;
  geo_subdivision_geonameId?: Maybe<Scalars['Int']>;
  geo_subdivision_isoCode?: Maybe<Scalars['String']>;
  geo_subdivision_name?: Maybe<Scalars['String']>;
  geo_traits_isAnonymous?: Maybe<Scalars['Boolean']>;
  geo_traits_isAnonymousProxy?: Maybe<Scalars['Boolean']>;
  geo_traits_isAnonymousVpn?: Maybe<Scalars['Boolean']>;
  geo_traits_isHostingProvider?: Maybe<Scalars['Boolean']>;
  geo_traits_isLegitimateProxy?: Maybe<Scalars['Boolean']>;
  geo_traits_isPublicProxy?: Maybe<Scalars['Boolean']>;
  geo_traits_isResidentialProxy?: Maybe<Scalars['Boolean']>;
  geo_traits_isSatelliteProvider?: Maybe<Scalars['Boolean']>;
  geo_traits_isTorExitNode?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  meta_rid?: Maybe<Scalars['String']>;
  meta_ts?: Maybe<Scalars['String']>;
  properties_hash?: Maybe<Scalars['String']>;
  properties_height?: Maybe<Scalars['Int']>;
  properties_path?: Maybe<Scalars['String']>;
  properties_referrer?: Maybe<Scalars['String']>;
  properties_search?: Maybe<Scalars['String']>;
  properties_title?: Maybe<Scalars['String']>;
  properties_url?: Maybe<Scalars['String']>;
  properties_width?: Maybe<Scalars['Int']>;
  raw_payload?: Maybe<Scalars['String']>;
  ref?: Maybe<CeramicAccount>;
  type?: Maybe<Scalars['String']>;
  updated_at: Scalars['Float'];
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
  geo_continent_code?: InputMaybe<Scalars['String']>;
  geo_continent_geonameId?: InputMaybe<Scalars['Int']>;
  geo_continent_name?: InputMaybe<Scalars['String']>;
  geo_country_geonameId?: InputMaybe<Scalars['Int']>;
  geo_country_isoCode?: InputMaybe<Scalars['String']>;
  geo_country_name?: InputMaybe<Scalars['String']>;
  geo_location_timeZone?: InputMaybe<Scalars['String']>;
  geo_registeredCountry_geonameId?: InputMaybe<Scalars['Int']>;
  geo_registeredCountry_isoCode?: InputMaybe<Scalars['String']>;
  geo_registeredCountry_name?: InputMaybe<Scalars['String']>;
  geo_subdivision_geonameId?: InputMaybe<Scalars['Int']>;
  geo_subdivision_isoCode?: InputMaybe<Scalars['String']>;
  geo_subdivision_name?: InputMaybe<Scalars['String']>;
  geo_traits_isAnonymous?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isAnonymousProxy?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isAnonymousVpn?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isHostingProvider?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isLegitimateProxy?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isPublicProxy?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isResidentialProxy?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isSatelliteProvider?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isTorExitNode?: InputMaybe<Scalars['Boolean']>;
  meta_rid?: InputMaybe<Scalars['String']>;
  meta_ts?: InputMaybe<Scalars['String']>;
  properties_hash?: InputMaybe<Scalars['String']>;
  properties_height?: InputMaybe<Scalars['Int']>;
  properties_path?: InputMaybe<Scalars['String']>;
  properties_referrer?: InputMaybe<Scalars['String']>;
  properties_search?: InputMaybe<Scalars['String']>;
  properties_title?: InputMaybe<Scalars['String']>;
  properties_url?: InputMaybe<Scalars['String']>;
  properties_width?: InputMaybe<Scalars['Int']>;
  raw_payload?: InputMaybe<Scalars['String']>;
  ref?: InputMaybe<Scalars['DID']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at: Scalars['Float'];
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
  createPost?: Maybe<CreatePostPayload>;
  createPrivateStore?: Maybe<CreatePrivateStorePayload>;
  createTopic?: Maybe<CreateTopicPayload>;
  updateCollection?: Maybe<UpdateCollectionPayload>;
  updateCollectionPact?: Maybe<UpdateCollectionPactPayload>;
  updateEvent?: Maybe<UpdateEventPayload>;
  updatePact?: Maybe<UpdatePactPayload>;
  updatePactProfile?: Maybe<UpdatePactProfilePayload>;
  updatePactRecipient?: Maybe<UpdatePactRecipientPayload>;
  updatePactSignature?: Maybe<UpdatePactSignaturePayload>;
  updatePost?: Maybe<UpdatePostPayload>;
  updatePrivateStore?: Maybe<UpdatePrivateStorePayload>;
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


export type MutationCreatePostArgs = {
  input: CreatePostInput;
};


export type MutationCreatePrivateStoreArgs = {
  input: CreatePrivateStoreInput;
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


export type MutationUpdatePostArgs = {
  input: UpdatePostInput;
};


export type MutationUpdatePrivateStoreArgs = {
  input: UpdatePrivateStoreInput;
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
  /** Account controlling the document */
  author: CeramicAccount;
  collections: CollectionPactConnection;
  collectionsCount: Scalars['Int'];
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
  name?: Maybe<Scalars['String']>;
  posts: PostConnection;
  postsCount: Scalars['Int'];
  recipientList?: Maybe<Array<Maybe<Scalars['CeramicStreamID']>>>;
  signatures: PactSignatureConnection;
  signaturesCount: Scalars['Int'];
  sourceUrl?: Maybe<Scalars['String']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title: Scalars['String'];
  topic?: Maybe<Topic>;
  topicID: Scalars['CeramicStreamID'];
  type?: Maybe<PactType>;
  /** Current version of the document */
  version: Scalars['CeramicCommitID'];
};


export type PactCollectionsArgs = {
  account?: InputMaybe<Scalars['ID']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PactCollectionsCountArgs = {
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
  name?: InputMaybe<Scalars['String']>;
  recipientList?: InputMaybe<Array<InputMaybe<Scalars['CeramicStreamID']>>>;
  sourceUrl?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title: Scalars['String'];
  topicID: Scalars['CeramicStreamID'];
  type?: InputMaybe<PactType>;
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
  id: Scalars['ID'];
  isVerified: Scalars['Boolean'];
  name: Scalars['String'];
  profile?: Maybe<Scalars['CeramicStreamID']>;
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
  isVerified: Scalars['Boolean'];
  name: Scalars['String'];
  profile?: InputMaybe<Scalars['CeramicStreamID']>;
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
  signature: Scalars['String'];
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
  signature: Scalars['String'];
  signedAt: Scalars['DateTime'];
  turnToken?: InputMaybe<Scalars['String']>;
  visibility?: InputMaybe<PactSignatureVisibilityType>;
};

export enum PactSignatureVisibilityType {
  Anon = 'anon',
  Private = 'private',
  Public = 'public'
}

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
  description?: InputMaybe<Scalars['String']>;
  media?: InputMaybe<Array<InputMaybe<CollectionPublicationMetadataMediaInput>>>;
  name?: InputMaybe<Scalars['String']>;
};

export type PartialCollectionPactInput = {
  collectionID?: InputMaybe<Scalars['CeramicStreamID']>;
  pactID?: InputMaybe<Scalars['CeramicStreamID']>;
};

export type PartialEventInput = {
  anonymousId?: InputMaybe<Scalars['String']>;
  app_id?: InputMaybe<Scalars['String']>;
  created_at?: InputMaybe<Scalars['DateTime']>;
  did?: InputMaybe<Scalars['DID']>;
  event?: InputMaybe<Scalars['String']>;
  geo_continent_code?: InputMaybe<Scalars['String']>;
  geo_continent_geonameId?: InputMaybe<Scalars['Int']>;
  geo_continent_name?: InputMaybe<Scalars['String']>;
  geo_country_geonameId?: InputMaybe<Scalars['Int']>;
  geo_country_isoCode?: InputMaybe<Scalars['String']>;
  geo_country_name?: InputMaybe<Scalars['String']>;
  geo_location_timeZone?: InputMaybe<Scalars['String']>;
  geo_registeredCountry_geonameId?: InputMaybe<Scalars['Int']>;
  geo_registeredCountry_isoCode?: InputMaybe<Scalars['String']>;
  geo_registeredCountry_name?: InputMaybe<Scalars['String']>;
  geo_subdivision_geonameId?: InputMaybe<Scalars['Int']>;
  geo_subdivision_isoCode?: InputMaybe<Scalars['String']>;
  geo_subdivision_name?: InputMaybe<Scalars['String']>;
  geo_traits_isAnonymous?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isAnonymousProxy?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isAnonymousVpn?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isHostingProvider?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isLegitimateProxy?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isPublicProxy?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isResidentialProxy?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isSatelliteProvider?: InputMaybe<Scalars['Boolean']>;
  geo_traits_isTorExitNode?: InputMaybe<Scalars['Boolean']>;
  meta_rid?: InputMaybe<Scalars['String']>;
  meta_ts?: InputMaybe<Scalars['String']>;
  properties_hash?: InputMaybe<Scalars['String']>;
  properties_height?: InputMaybe<Scalars['Int']>;
  properties_path?: InputMaybe<Scalars['String']>;
  properties_referrer?: InputMaybe<Scalars['String']>;
  properties_search?: InputMaybe<Scalars['String']>;
  properties_title?: InputMaybe<Scalars['String']>;
  properties_url?: InputMaybe<Scalars['String']>;
  properties_width?: InputMaybe<Scalars['Int']>;
  raw_payload?: InputMaybe<Scalars['String']>;
  ref?: InputMaybe<Scalars['DID']>;
  type?: InputMaybe<Scalars['String']>;
  updated_at?: InputMaybe<Scalars['Float']>;
};

export type PartialPactInput = {
  animation_url?: InputMaybe<Scalars['URI']>;
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
  name?: InputMaybe<Scalars['String']>;
  recipientList?: InputMaybe<Array<InputMaybe<Scalars['CeramicStreamID']>>>;
  sourceUrl?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
  topicID?: InputMaybe<Scalars['CeramicStreamID']>;
  type?: InputMaybe<PactType>;
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
  profilePicture?: InputMaybe<Scalars['InterPlanetaryCID']>;
  title?: InputMaybe<Scalars['String']>;
};

export type PartialPactRecipientInput = {
  isVerified?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<Scalars['CeramicStreamID']>;
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

export type PartialPostInput = {
  animation_url?: InputMaybe<Scalars['URI']>;
  content?: InputMaybe<Scalars['String']>;
  contentWarning?: InputMaybe<PostPublicationContentWarning>;
  context?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  external_url?: InputMaybe<Scalars['URI']>;
  image?: InputMaybe<Scalars['URI']>;
  imageMimeType?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['Locale']>;
  mainContentFocus?: InputMaybe<PostPublicationMainFocus>;
  media?: InputMaybe<Array<InputMaybe<PostPublicationMetadataMediaInput>>>;
  name?: InputMaybe<Scalars['String']>;
  pactID?: InputMaybe<Scalars['CeramicStreamID']>;
  sourceUrl?: InputMaybe<Scalars['URI']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title?: InputMaybe<Scalars['String']>;
};

export type PartialPrivateStoreInput = {
  encryptedContent?: InputMaybe<PrivateStoreEncryptedLitContentInput>;
  model?: InputMaybe<Scalars['String']>;
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
  context?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  external_url?: Maybe<Scalars['URI']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['URI']>;
  imageMimeType?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['Locale']>;
  mainContentFocus?: Maybe<PostPublicationMainFocus>;
  media?: Maybe<Array<Maybe<PostPublicationMetadataMedia>>>;
  name?: Maybe<Scalars['String']>;
  pact?: Maybe<Pact>;
  pactID: Scalars['CeramicStreamID'];
  sourceUrl?: Maybe<Scalars['URI']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title: Scalars['String'];
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
  context?: InputMaybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  description?: InputMaybe<Scalars['String']>;
  external_url?: InputMaybe<Scalars['URI']>;
  image?: InputMaybe<Scalars['URI']>;
  imageMimeType?: InputMaybe<Scalars['String']>;
  locale?: InputMaybe<Scalars['Locale']>;
  mainContentFocus?: InputMaybe<PostPublicationMainFocus>;
  media?: InputMaybe<Array<InputMaybe<PostPublicationMetadataMediaInput>>>;
  name?: InputMaybe<Scalars['String']>;
  pactID: Scalars['CeramicStreamID'];
  sourceUrl?: InputMaybe<Scalars['URI']>;
  tags?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  title: Scalars['String'];
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
  encryptedContent: PrivateStoreEncryptedLitContentInput;
  model?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  collectionIndex?: Maybe<CollectionConnection>;
  collectionPactIndex?: Maybe<CollectionPactConnection>;
  eventIndex?: Maybe<EventConnection>;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  pactIndex?: Maybe<PactConnection>;
  pactProfileIndex?: Maybe<PactProfileConnection>;
  pactRecipientIndex?: Maybe<PactRecipientConnection>;
  pactSignatureIndex?: Maybe<PactSignatureConnection>;
  postIndex?: Maybe<PostConnection>;
  privateStoreIndex?: Maybe<PrivateStoreConnection>;
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


export type QueryTopicIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
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
