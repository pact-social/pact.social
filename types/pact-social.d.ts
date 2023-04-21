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
