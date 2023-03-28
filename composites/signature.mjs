export const manifestSignature = function (manifestId) {
  return `
    type Manifest @loadModel(id: "${manifestId}") {
      id: ID!
    }
    
    type ManifestSignature @createModel(accountRelation: LIST, description: "A signature document for a manifest") {
      author: DID! @documentAccount
      validator: DID!
      createdAt: DateTime! 
      jwe: String! @string(minLength: 132, maxLength: 132)
      manifestID: StreamID! @documentReference(model: "Manifest")
      manifest: Manifest @relationDocument(property: "manifestID")
    }
  `;
}
