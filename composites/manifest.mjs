export const manifest = function (topicId) {
  return `
    type Topic @loadModel(id: "${topicId}") {
      id: ID!
    }
    
    enum PactType {
      manifesto
      openletter
      petition
    }
    
    type Manifest @createModel(accountRelation: LIST, description: "A manifest document") {
      version: CommitID! @documentVersion
      author: DID! @documentAccount
      title: String! @string(minLength: 3, maxLength: 100)
      type: PactType!
      content: String! @string(minLength: 1, maxLength: 10000)
      picture: CID
      topicID: StreamID! @documentReference(model: "Topic")
      topic: Topic @relationDocument(property: "topicID")
    }
  `;
}
