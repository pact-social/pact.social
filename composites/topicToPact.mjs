export const topicToPact = function (topicId, pactId) {
  return `
    type Pact @loadModel(id: "${pactId}") {
      id: ID!
    }
    
    type Topic @loadModel(id: "${topicId}"){
      pacts: [Pact] @relationFrom(model: "Pact", property: "topicID")
      pactsCount: Int! @relationCountFrom(model: "Pact", property: "topicID")
    }  
  `;
}
