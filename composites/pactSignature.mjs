export const pactSignature = function (pactId) {
  return `
    enum VisibilityType {
      anon
      private
      public
    }

    type Pact @loadModel(id: "${pactId}") {
      id: ID!
    }

    type PactSignature @createModel(accountRelation: LIST, description: "A signature document for a pact") {
      author: DID! @documentAccount
      visibility: VisibilityType!
      validator: DID!
      signedAt: DateTime! 
      pactVersion: CommitID!
      pactID: StreamID! @documentReference(model: "Pact")
      pact: Pact @relationDocument(property: "pactID")
      metadata: String @string(maxLength: 10000)
    }
  `;
}
