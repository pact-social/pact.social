export const collectionPactsView = (collectionPactID, pactID, collectionID) => {
  return `
  type CollectionPact @loadModel(id: "${collectionPactID}") {
    id: ID!
  }

  type Pact @loadModel(id: "${pactID}") {
    id: ID!
    collectionsPact: [CollectionPact] @relationFrom(model: "CollectionPact", property: "pactID")
    collectionsPactCount: Int! @relationCountFrom(model: "CollectionPact", property: "pactID")
  }
  
  type Collection @loadModel(id: "${collectionID}") {
    id: ID!
    collectionPacts: [CollectionPact] @relationFrom(model: "CollectionPact", property: "collectionID")
    collectionPactsCount: Int! @relationCountFrom(model: "CollectionPact", property: "collectionID")
  }
  `
}
