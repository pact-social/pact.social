export const signatureToPact = function (signatureId, pactId) {
  return `
    type PactSignature @loadModel(id: "${signatureId}") {
      id: ID!
    }

    type Pact @loadModel(id: "${pactId}") {
      id: ID!
      signatures: [PactSignature] @relationFrom(model: "PactSignature", property: "pactID")
      signaturesCount: Int! @relationCountFrom(model: "PactSignature", property: "pactID")
    }
  `;
}
