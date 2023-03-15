export const manifest = function (topicId) {
  return `
    type Topic @loadModel(id: "${topicId}") {
      id: ID!
    }
    
    enum RegionScope {
      local
      national
      global
    }
    
    type Manifest @createModel(accountRelation: LIST, description: "A manifest document") {
      author: DID! @documentAccount
      title: String! @string(minLength: 3, maxLength: 100)
      scope: RegionScope!
      content: String! @string(minLength: 1, maxLength: 10000)
      picture: CID
      topicID: StreamID! @documentReference(model: "Topic")
      topic: Topic @relationDocument(property: "topicID")
    }
  `;
}
