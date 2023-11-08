export const pactSubscribe = function (pactId, privateStoreId) {
  return `
  type Pact @loadModel(id: "${pactId}") {
    id: ID!
  }
  type PrivateStore @loadModel(id: "${privateStoreId}") {
    id: ID!
  }
  type PactSubscribe 
    @createModel(accountRelation: LIST, description: "A subscription to a Pact")
    @createIndex(fields: [{ path: ["archived"] }])
    @createIndex(fields: [{ path: ["createdAt"] }])
  {
    author: DID! @documentAccount
    pactID: StreamID! @documentReference(model: "Pact")
    pact: Pact @relationDocument(property: "pactID")
    createdAt: DateTime!
    archived: Boolean
    recipientID: StreamID! @documentReference(model: "PrivateStore")
    recipient: PrivateStore! @relationDocument(property: "recipientID")
  }
  `
}

export const pactWithSubscribe = function (pactId, pactSubscribeId) {
  return `
  type PactSubscribe @loadModel(id: "${pactSubscribeId}") {
    id: ID!
  }
  type Pact @loadModel(id: "${pactId}") {
    id: ID!
    subscriptions: [PactSubscribe] @relationFrom(model: "PactSubscribe", property: "pactID")
    subscriptionsCount: Int! @relationCountFrom(model: "PactSubscribe", property: "pactID")
  }
  `
}
