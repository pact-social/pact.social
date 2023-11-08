export const socialTemplate = (pactID) => {
  return `
  type Pact @loadModel(id: "${pactID}") {
    id: ID!
  }
  type SocialTemplate @createModel(accountRelation: LIST, description: "A Social content template Model") {
    author: DID! @documentAccount
    content: String! @string(maxLength: 5000)
    createdAt: DateTime!
    primaryTemplate: Boolean
    archived: Boolean
    pactID: StreamID! @documentReference(model: "Pact")
    pact: Pact @relationDocument(property: "pactID")
  }
  `
}

export const socialTemplateToPact = function (pactId, socialTemplateId) {
  return `
    type SocialTemplate @loadModel(id: "${socialTemplateId}") {
      id: ID!
    }

    type Pact @loadModel(id: "${pactId}") {
      id: ID!
      socialTemplates: [SocialTemplate] @relationFrom(model: "SocialTemplate", property: "pactID")
    }
  `;
}
