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
};

export type CeramicAccount = Node & {
  __typename?: 'CeramicAccount';
  /** Globally unique identifier of the account (DID string) */
  id: Scalars['ID'];
  /** Whether the Ceramic instance is currently authenticated with this account or not */
  isViewer: Scalars['Boolean'];
  pactList?: Maybe<PactConnection>;
  pactProfile?: Maybe<PactProfile>;
  pactRecipientList?: Maybe<PactRecipientConnection>;
  pactSignatureList?: Maybe<PactSignatureConnection>;
  privateStoreList?: Maybe<PrivateStoreConnection>;
  topicList?: Maybe<TopicConnection>;
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

export type Mutation = {
  __typename?: 'Mutation';
  createPact?: Maybe<CreatePactPayload>;
  createPactProfile?: Maybe<CreatePactProfilePayload>;
  createPactRecipient?: Maybe<CreatePactRecipientPayload>;
  createPactSignature?: Maybe<CreatePactSignaturePayload>;
  createPrivateStore?: Maybe<CreatePrivateStorePayload>;
  createTopic?: Maybe<CreateTopicPayload>;
  updatePact?: Maybe<UpdatePactPayload>;
  updatePactProfile?: Maybe<UpdatePactProfilePayload>;
  updatePactRecipient?: Maybe<UpdatePactRecipientPayload>;
  updatePactSignature?: Maybe<UpdatePactSignaturePayload>;
  updatePrivateStore?: Maybe<UpdatePrivateStorePayload>;
  updateTopic?: Maybe<UpdateTopicPayload>;
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


export type MutationCreatePrivateStoreArgs = {
  input: CreatePrivateStoreInput;
};


export type MutationCreateTopicArgs = {
  input: CreateTopicInput;
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
  /** Account controlling the document */
  author: CeramicAccount;
  content: Scalars['String'];
  id: Scalars['ID'];
  picture?: Maybe<Scalars['InterPlanetaryCID']>;
  recipientList?: Maybe<Array<Maybe<Scalars['CeramicStreamID']>>>;
  signatures: PactSignatureConnection;
  signaturesCount: Scalars['Int'];
  title: Scalars['String'];
  topic?: Maybe<Topic>;
  topicID: Scalars['CeramicStreamID'];
  type?: Maybe<PactType>;
  /** Current version of the document */
  version: Scalars['CeramicCommitID'];
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
  content: Scalars['String'];
  picture?: InputMaybe<Scalars['InterPlanetaryCID']>;
  recipientList?: InputMaybe<Array<InputMaybe<Scalars['CeramicStreamID']>>>;
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
  fullname?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isMagicLink: Scalars['Boolean'];
  latitude?: Maybe<Scalars['Float']>;
  locale?: Maybe<Scalars['Locale']>;
  longitude?: Maybe<Scalars['Float']>;
  organisation?: Maybe<Scalars['String']>;
  profilePicture?: Maybe<Scalars['InterPlanetaryCID']>;
  username: Scalars['String'];
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
  fullname?: InputMaybe<Scalars['String']>;
  isMagicLink: Scalars['Boolean'];
  latitude?: InputMaybe<Scalars['Float']>;
  locale?: InputMaybe<Scalars['Locale']>;
  longitude?: InputMaybe<Scalars['Float']>;
  organisation?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['InterPlanetaryCID']>;
  username: Scalars['String'];
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
  jwe: Scalars['InterPlanetaryCID'];
  metadata?: Maybe<Scalars['String']>;
  pact?: Maybe<Pact>;
  pactID: Scalars['CeramicStreamID'];
  pactVersion: Scalars['CeramicCommitID'];
  signedAt: Scalars['DateTime'];
  validator: CeramicAccount;
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
  jwe: Scalars['InterPlanetaryCID'];
  metadata?: InputMaybe<Scalars['String']>;
  pactID: Scalars['CeramicStreamID'];
  pactVersion: Scalars['CeramicCommitID'];
  signedAt: Scalars['DateTime'];
  validator: Scalars['DID'];
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

export type PartialPactInput = {
  content?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['InterPlanetaryCID']>;
  recipientList?: InputMaybe<Array<InputMaybe<Scalars['CeramicStreamID']>>>;
  title?: InputMaybe<Scalars['String']>;
  topicID?: InputMaybe<Scalars['CeramicStreamID']>;
  type?: InputMaybe<PactType>;
};

export type PartialPactProfileInput = {
  bio?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['CountryCode']>;
  email?: InputMaybe<PactProfileEncryptedLitContentInput>;
  fullname?: InputMaybe<Scalars['String']>;
  isMagicLink?: InputMaybe<Scalars['Boolean']>;
  latitude?: InputMaybe<Scalars['Float']>;
  locale?: InputMaybe<Scalars['Locale']>;
  longitude?: InputMaybe<Scalars['Float']>;
  organisation?: InputMaybe<Scalars['String']>;
  profilePicture?: InputMaybe<Scalars['InterPlanetaryCID']>;
  username?: InputMaybe<Scalars['String']>;
};

export type PartialPactRecipientInput = {
  isVerified?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  profile?: InputMaybe<Scalars['CeramicStreamID']>;
};

export type PartialPactSignatureInput = {
  jwe?: InputMaybe<Scalars['InterPlanetaryCID']>;
  metadata?: InputMaybe<Scalars['String']>;
  pactID?: InputMaybe<Scalars['CeramicStreamID']>;
  pactVersion?: InputMaybe<Scalars['CeramicCommitID']>;
  signedAt?: InputMaybe<Scalars['DateTime']>;
  validator?: InputMaybe<Scalars['DID']>;
  visibility?: InputMaybe<PactSignatureVisibilityType>;
};

export type PartialPrivateStoreInput = {
  jwe?: InputMaybe<Scalars['String']>;
};

export type PartialTopicInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type PrivateStore = Node & {
  __typename?: 'PrivateStore';
  id: Scalars['ID'];
  jwe: Scalars['String'];
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

export type PrivateStoreInput = {
  jwe: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  pactIndex?: Maybe<PactConnection>;
  pactProfileIndex?: Maybe<PactProfileConnection>;
  pactRecipientIndex?: Maybe<PactRecipientConnection>;
  pactSignatureIndex?: Maybe<PactSignatureConnection>;
  privateStoreIndex?: Maybe<PrivateStoreConnection>;
  topicIndex?: Maybe<TopicConnection>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
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
