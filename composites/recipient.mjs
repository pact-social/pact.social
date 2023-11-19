export const recipient = function () {
  return `
  type Recipient @createModel(accountRelation: LIST, description: "A Pact Recipient, a decision maker reference") {
    author: DID! @documentAccount
    
    name: String! @string(maxLength: 100)
    isVerified: Boolean!
    contact: String @string(maxLength: 1000) # can be email, or address
    altContact: String @string(maxLength: 1000) # can be email, or address
    profile: DID
  }
  `
}

export const pactRecipient = function (pactId, recipientId) {
  return `
  type Recipient @loadModel(id: "${recipientId}") {
    id: ID!
  }
  type Pact @loadModel(id: "${pactId}") {
    id: ID!
  }
  type PactRecipient @createModel(accountRelation: LIST, description: "Link between a recipient (decision maker) and a Pact") {
    author: DID! @documentAccount

    pactID: StreamID! @documentReference(model: "Pact")
    pact: Pact @relationDocument(property: "pactID")
    recipientID: StreamID! @documentReference(model: "Recipient")
    recipient: Recipient @relationDocument(property: "recipientID")
    deleted: Boolean
  }
  `
}

export const pactRecipientView = (pactId, recipientId, pactRecipientId) => {
  return `
  type PactRecipient @loadModel(id: "${pactRecipientId}") {
    id: ID!
  }
  type Pact @loadModel(id: "${pactId}") {
    id: ID!
    pactRecipients: [PactRecipient] @relationFrom(model: "PactRecipient", property: "pactID")
    pactRecipientsCount: Int! @relationCountFrom(model: "PactRecipient", property: "pactID")
  }
  type Recipient @loadModel(id: "${recipientId}") {
    id: ID!
    pactsRecipient: [PactRecipient] @relationFrom(model: "PactRecipient", property: "recipientID")
    pactsRecipientCount: Int! @relationCountFrom(model: "PactRecipient", property: "recipientID")
  }
  `
}
