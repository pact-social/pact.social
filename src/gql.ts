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
  InterPlanetaryCID: any;
};

export type BasicProfile = Node & {
  __typename?: 'BasicProfile';
  description?: Maybe<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

/** A connection to a list of items. */
export type BasicProfileConnection = {
  __typename?: 'BasicProfileConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<BasicProfileEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BasicProfileEdge = {
  __typename?: 'BasicProfileEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<BasicProfile>;
};

export type BasicProfileInput = {
  description?: InputMaybe<Scalars['String']>;
  emoji?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CeramicAccount = Node & {
  __typename?: 'CeramicAccount';
  basicProfile?: Maybe<BasicProfile>;
  /** Globally unique identifier of the account (DID string) */
  id: Scalars['ID'];
  /** Whether the Ceramic instance is currently authenticated with this account or not */
  isViewer: Scalars['Boolean'];
  manifestList?: Maybe<ManifestConnection>;
  topicList?: Maybe<TopicConnection>;
};


export type CeramicAccountManifestListArgs = {
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

export type CreateBasicProfileInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: BasicProfileInput;
};

export type CreateBasicProfilePayload = {
  __typename?: 'CreateBasicProfilePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: BasicProfile;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateBasicProfilePayloadNodeArgs = {
  id: Scalars['ID'];
};

export type CreateManifestInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: ManifestInput;
};

export type CreateManifestPayload = {
  __typename?: 'CreateManifestPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: Manifest;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type CreateManifestPayloadNodeArgs = {
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

export type Manifest = Node & {
  __typename?: 'Manifest';
  /** Account controlling the document */
  author: CeramicAccount;
  content: Scalars['String'];
  id: Scalars['ID'];
  picture?: Maybe<Scalars['InterPlanetaryCID']>;
  scope?: Maybe<ManifestRegionScope>;
  title: Scalars['String'];
  topic?: Maybe<Topic>;
  topicID: Scalars['CeramicStreamID'];
};

/** A connection to a list of items. */
export type ManifestConnection = {
  __typename?: 'ManifestConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ManifestEdge>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ManifestEdge = {
  __typename?: 'ManifestEdge';
  /** A cursor for use in pagination */
  cursor: Scalars['String'];
  /** The item at the end of the edge */
  node?: Maybe<Manifest>;
};

export type ManifestInput = {
  content: Scalars['String'];
  picture?: InputMaybe<Scalars['InterPlanetaryCID']>;
  scope?: InputMaybe<ManifestRegionScope>;
  title: Scalars['String'];
  topicID: Scalars['CeramicStreamID'];
};

export enum ManifestRegionScope {
  Global = 'global',
  Local = 'local',
  National = 'national'
}

export type Mutation = {
  __typename?: 'Mutation';
  createBasicProfile?: Maybe<CreateBasicProfilePayload>;
  createManifest?: Maybe<CreateManifestPayload>;
  createTopic?: Maybe<CreateTopicPayload>;
  updateBasicProfile?: Maybe<UpdateBasicProfilePayload>;
  updateManifest?: Maybe<UpdateManifestPayload>;
  updateTopic?: Maybe<UpdateTopicPayload>;
};


export type MutationCreateBasicProfileArgs = {
  input: CreateBasicProfileInput;
};


export type MutationCreateManifestArgs = {
  input: CreateManifestInput;
};


export type MutationCreateTopicArgs = {
  input: CreateTopicInput;
};


export type MutationUpdateBasicProfileArgs = {
  input: UpdateBasicProfileInput;
};


export type MutationUpdateManifestArgs = {
  input: UpdateManifestInput;
};


export type MutationUpdateTopicArgs = {
  input: UpdateTopicInput;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
};

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

export type PartialBasicProfileInput = {
  description?: InputMaybe<Scalars['String']>;
  emoji?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type PartialManifestInput = {
  content?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['InterPlanetaryCID']>;
  scope?: InputMaybe<ManifestRegionScope>;
  title?: InputMaybe<Scalars['String']>;
  topicID?: InputMaybe<Scalars['CeramicStreamID']>;
};

export type PartialTopicInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  basicProfileIndex?: Maybe<BasicProfileConnection>;
  manifestIndex?: Maybe<ManifestConnection>;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  topicIndex?: Maybe<TopicConnection>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type QueryBasicProfileIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryManifestIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryTopicIndexArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type Topic = Node & {
  __typename?: 'Topic';
  id: Scalars['ID'];
  manifests: ManifestConnection;
  name: Scalars['String'];
};


export type TopicManifestsArgs = {
  account?: InputMaybe<Scalars['ID']>;
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
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

export type UpdateBasicProfileInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialBasicProfileInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateBasicProfilePayload = {
  __typename?: 'UpdateBasicProfilePayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: BasicProfile;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateBasicProfilePayloadNodeArgs = {
  id: Scalars['ID'];
};

export type UpdateManifestInput = {
  clientMutationId?: InputMaybe<Scalars['String']>;
  content: PartialManifestInput;
  id: Scalars['ID'];
  options?: InputMaybe<UpdateOptionsInput>;
};

export type UpdateManifestPayload = {
  __typename?: 'UpdateManifestPayload';
  clientMutationId?: Maybe<Scalars['String']>;
  document: Manifest;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Account currently authenticated on the Ceramic instance, if set */
  viewer?: Maybe<CeramicAccount>;
};


export type UpdateManifestPayloadNodeArgs = {
  id: Scalars['ID'];
};

export type UpdateOptionsInput = {
  /** Fully replace the document contents instead of performing a shallow merge */
  replace?: InputMaybe<Scalars['Boolean']>;
  /** Only perform mutation if the document matches the provided version */
  version?: InputMaybe<Scalars['CeramicCommitID']>;
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

export type GetManifestQueryVariables = Exact<{
  streamID: Scalars['ID'];
}>;


export type GetManifestQuery = { __typename?: 'Query', node?: { __typename?: 'BasicProfile' } | { __typename?: 'CeramicAccount' } | { __typename?: 'Manifest', id: string, title: string, content: string, scope?: ManifestRegionScope | null, picture?: any | null, topic?: { __typename?: 'Topic', name: string } | null } | { __typename?: 'Topic' } | null };

export type GetTopicsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['String']>;
}>;


export type GetTopicsQuery = { __typename?: 'Query', topicIndex?: { __typename?: 'TopicConnection', edges?: Array<{ __typename?: 'TopicEdge', node?: { __typename?: 'Topic', id: string, name: string } | null } | null> | null, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null } } | null };
