import { ReactElement } from "react"
import PactLayout from "../../../../components/pactLayout"
import type { GetStaticPaths, GetStaticProps } from "next"
import { unstable_serialize } from "swr"
import { NextPageWithLayout } from "../../../_app"
import { Post } from "../../../../src/gql"
import PostBody from '../../../../components/post/postBody'

export const getStaticPaths: GetStaticPaths<{ streamID: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  
  if (
    (!params?.streamID || params?.streamID.length === 0 || params.streamID.indexOf('<no source>') > -1)
    ||
    (!params?.postID)
  ) {
    return {
      notFound: true,
    }
  }
  const streamID = params?.streamID as string;
  const postID = params?.postID as string;
  const { getPact } = await import('../../../../lib/getPact')
  const { getPost } = await import('../../../../lib/getPost')
  
  try {

    const data = await getPact({ streamID })
    
    if (!data) {
      console.log('404', data)
      return {
        notFound: true,
      }
    }

    const post = await getPost({ id: postID})

    return { 
      props: {
        fallback: {
          [unstable_serialize({ streamID })]: data
        },
        title: data.title,
        pactID: data.id,
        postID: post.id,
        post
      }, 
      revalidate: 1000
    }
  } catch (error) {
    console.log('404', error)
    return {
      notFound: true,
    }
  }
}

const PactPostPage: NextPageWithLayout<{post: Post}> = ({post}) => {

  return (
    <>
      <PostBody post={post} />
    </>
  )
}

PactPostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PactLayout>
      {page}
    </PactLayout>
  )
}

export default PactPostPage
