export const signatureToManifest = function (signatureId, manifestId) {
  return `
    type ManifestSignature @loadModel(id: "${signatureId}") {
      id: ID!
    }

    type Manifest @loadModel(id: "${manifestId}") {
      id: ID!
      signatures: [ManifestSignature] @relationFrom(model: "ManifestSignature", property: "manifestID")
    }
  `;
}
