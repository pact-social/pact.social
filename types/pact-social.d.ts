enum ChainPfp {
  ethereum = 'ethereum',
  polygon = 'polygon',
}

type Profile = {
  pfp?: string;
  cover?: string;
  username: string;
  description?: string;
  pfpIsNft?: {
    chain: ChainPfp;
    contract: string;
    tokenId: string;
    timestamp: string;
  }
  data?: Object;
  encryptedEmail?: {
    encryptedString: string;
    encryptedSymmetricKey: string;
    accessControlConditions: string;
  }
}

type StatsProps = {
  anon: number;
  private: number;
  public: number;
  verified: number;
  total: number;
  streamid: string;
  views: number;
  influencers: number;
}

// type PactInputs = {
//   type: PactType;
//   createdAt: string;
//   title: string;
//   topicID: string;
//   content: string;
//   picture?: string;
// };
