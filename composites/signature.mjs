export const manifestSignature = function (manifestId) {
  return `
    enum VisibilityType {
      anon
      private
      public
    }

    type Manifest @loadModel(id: "${manifestId}") {
      id: ID!
    }

    type ManifestSignature @createModel(accountRelation: LIST, description: "A signature document for a manifest") {
      author: DID! @documentAccount
      visibility: VisibilityType!
      validator: DID!
      signedAt: DateTime! 
      jwe: CID!
      manifestVersion: CommitID!
      manifestID: StreamID! @documentReference(model: "Manifest")
      manifest: Manifest @relationDocument(property: "manifestID")
      metadata: String @string(maxLength: 10000)
    }
  `;
}
