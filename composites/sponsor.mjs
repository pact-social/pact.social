export const sponsor = (pactId) => {
  return `
  type Pact @loadModel(id: "${pactId}") {
    id: ID!
  }
  type Sponsor @createModel(accountRelation: LIST, description:"An sponsorship document") {
    author: DID! @documentAccount
    createdAt: DateTime!
    
    name: String @string(maxLength: 255)
    website: String @string(maxLength: 255)
    transactionHash: String @string(maxLength: 255)
    chainID: ChainID
    logo: CID
    poolContract: String @string(maxLength: 255) # 
    # poolConfiguration: 
    
    pactID: StreamID! @documentReference(model: "Pact")
    pact: Pact @relationDocument(property: "pactID")
  }
  
  `
}
