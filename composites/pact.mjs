export const pact = function (topicId) {
  return `
    type Topic @loadModel(id: "${topicId}") {
      id: ID!
    }

    enum PactType {
      manifesto
      openletter
      petition
    }
    
    type Pact @createModel(accountRelation: LIST, description: "A pact.social base document") {
      version: CommitID! @documentVersion
      author: DID! @documentAccount
      title: String! @string(minLength: 3, maxLength: 100)
      content: String! @string(minLength: 1, maxLength: 10000)
      type: PactType!
      picture: CID
      topicID: StreamID! @documentReference(model: "Topic")
      topic: Topic @relationDocument(property: "topicID")
      recipientList: [StreamID!] @list(maxLength: 10) # decisionMakers
    }
  `;
}
