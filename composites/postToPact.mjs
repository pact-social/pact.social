export const postToPact = (postId, pactId) => {
  return `
  type Post @loadModel(id:  "${postId}") {
    id: ID!
  }
  type Pact @loadModel(id: "${pactId}"){
    posts: [Post] @relationFrom(model: "Post", property: "pactID")
    postsCount: Int! @relationCountFrom(model: "Post", property: "pactID")
  }
  `
}
