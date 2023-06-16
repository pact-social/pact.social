export const pact = function (topicId, postId) {
  return `
    type Topic @loadModel(id: "${topicId}") {
      id: ID!
    }

    type PublicationMetadataMedia {
      item: URI
      type: String @string(maxLength: 50)
      altTag: String @string(maxLength: 500)
      cover: String @string(maxLength: 500)
      cid: CID
    }

    enum PublicationContentWarning {
      NSFW
      SENSITIVE
      SPOILER
    }

    enum PublicationMainFocus {
      VIDEO
      IMAGE
      ARTICLE
      TEXT_ONLY
      AUDIO
      LINK
      EMBED
    }

    enum PactType {
      manifesto
      openletter
      petition
    }
    
    type Pact @createModel(accountRelation: LIST, description: "A pact.social base document") {
      version: CommitID! @documentVersion
      author: DID! @documentAccount
      createdAt: DateTime!
      
      title: String! @string(maxLength: 500)
      name: String @string(maxLength: 500)
      description: String @string(maxLength: 500)
      content: String! @string(minLength: 1, maxLength: 50000)

      type: PactType!
      topicID: StreamID! @documentReference(model: "Topic")
      topic: Topic @relationDocument(property: "topicID")
      recipientList: [StreamID!] @list(maxLength: 10) # decisionMakers
      
      tags: [String] @list(maxLength: 20) @string(maxLength: 50)
      sourceUrl: String @string(maxLength: 500)
      locale: Locale
      contentWarning: PublicationContentWarning
      mainContentFocus: PublicationMainFocus
      external_url: URI
      media: [PublicationMetadataMedia] @list(maxLength: 20)
      image: URI
      imageMimeType: String @string(maxLength: 50)
      animation_url: URI
    }
  `;
}
