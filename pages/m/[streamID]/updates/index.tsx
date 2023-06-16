import { ReactElement } from "react"
import PactLayout from "../../../../components/pactLayout"
import type { GetStaticPaths, GetStaticProps } from "next"
import { unstable_serialize } from "swr"
import PactUpdates from "../../../../components/pacts/pactUpdates"
import { NextPageWithLayout } from "../../../_app"
import { PostConnection } from "../../../../src/gql"

export const getStaticPaths: GetStaticPaths<{ streamID: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  
  if (!params?.streamID || params?.streamID.length === 0 || params.streamID.indexOf('<no source>') > -1 ) {
    return {
      notFound: true,
    }
  }
  const streamID = params?.streamID as string;
  const { getPact } = await import('../../../../lib/getPact')
  const { getPactPosts } = await import('../../../../lib/getPactPosts')
  try {
    const posts = await getPactPosts({id: streamID, last: 100, before: ''})
    const data = await getPact({ streamID })
    
    if (!data) {
      console.log('404', data)
      return {
        notFound: true,
      }
    }

    return { 
      props: {
        fallback: {
          [unstable_serialize({ streamID })]: data
        },
        title: data.title,
        pactID: data.id,
        posts
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

const PactUpdatesPage: NextPageWithLayout<{ posts: PostConnection}> = (props) => {
  return (
    <>
      <PactUpdates posts={props.posts} />
    </>
  )
}

PactUpdatesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PactLayout>
      {page}
    </PactLayout>
  )
}

export default PactUpdatesPage
