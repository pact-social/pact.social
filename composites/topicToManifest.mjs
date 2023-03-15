export const topicToManifest = function (topicId, manifestId) {
  return `
    type Manifest @loadModel(id:  "${manifestId}") {
      id: ID!
    }
    
    type Topic @loadModel(id: "${topicId}"){
      manifests: [Manifest] @relationFrom(model: "Manifest", property: "topicID")
    }  
  `;
}
