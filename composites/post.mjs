export const post = function (pactId) {
  return `
  type Pact @loadModel(id: "${pactId}") {
    id: ID!
  }
  type PublicationMetadataMedia {
    item: URI
    type: String @string(maxLength: 50) # MimeType
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
  
  type Post 
    @createModel(accountRelation: LIST, description: "A Post on a pact or a blog")
    @createIndex(fields: [{ path: ["createdAt"] }])
    @createIndex(fields: [{ path: ["pactID"] }])
    @createIndex(fields: [{ path: ["archived"] }])
    {
    author: DID! @documentAccount
    createdAt: DateTime!
    updatedAt: DateTime
    archived: Boolean
    
    title: String! @string(maxLength: 500)
    description: String @string(maxLength: 500)
    content: String @string(maxLength: 50000)
    
    pactID: StreamID! @documentReference(model: "Pact")
    pact: Pact @relationDocument(property: "pactID")
    
    tags: [String] @list(maxLength: 20) @string(maxLength: 50)
    sourceUrl: URI
    locale: Locale
    contentWarning: PublicationContentWarning
    mainContentFocus: PublicationMainFocus
    external_url: URI
    media: [PublicationMetadataMedia] @list(maxLength: 20)
    image: URI
    imageMimeType: String @string(maxLength: 50)
    animation_url: URI
    metadata: String @string(maxLength: 10000)
  }
  
  `
}
