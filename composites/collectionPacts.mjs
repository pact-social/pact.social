export const collectionPacts = function (pactId, collectionID) {
  return `
  type Pact @loadModel(id: "${pactId}") {
    id: ID!
  }
  type Collection @loadModel(id: "${collectionID}") {
    id: ID!
  }

  type CollectionPact @createModel(accountRelation: LIST, description:"Link between collection and Pact") {
    author: DID! @documentAccount

    pactID: StreamID! @documentReference(model: "Pact")
    pact: Pact @relationDocument(property: "pactID")
    collectionID: StreamID! @documentReference(model: "Collection")
    collection: Collection @relationDocument(property: "collectionID")
    
    tags: [String] @list(maxLength: 20) @string(maxLength: 50)
    deleted: Boolean
  }
  `
}
