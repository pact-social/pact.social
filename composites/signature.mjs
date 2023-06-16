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
      signedAt: DateTime!
      signature: String! @string(minLength: 10, maxLength: 200)
      pactVersion: CommitID!
      pactID: StreamID! @documentReference(model: "Pact")
      pact: Pact @relationDocument(property: "pactID")
      turnToken: String @string(maxLength: 1000) # cf turnstill token
      referral: DID
      metadata: String @string(maxLength: 10000)
    }
  `;
}
