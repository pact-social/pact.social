export const collectionPactView = (collectionPactID, pactID, collectionID) => {
  return `
  type CollectionPact @loadModel(id: "${collectionPactID}") {
    id: ID!
  }

  type Pact @loadModel(id: "${pactID}") {
    id: ID!
    collections: [CollectionPact] @relationFrom(model: "CollectionPact", property: "pactID")
    collectionsCount: Int! @relationCountFrom(model: "CollectionPact", property: "pactID")
  }
  
  type Collection @loadModel(id: "${collectionID}") {
    id: ID!
    pacts: [CollectionPact] @relationFrom(model: "CollectionPact", property: "collectionID")
    pactsCount: Int! @relationCountFrom(model: "CollectionPact", property: "collectionID")
  }
  `
}
