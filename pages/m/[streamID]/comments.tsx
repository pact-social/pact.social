import { useRouter } from "next/router"
import { ReactElement } from "react"
import PactLayout from "../../../components/pactLayout"
import type { GetStaticPaths, GetStaticProps } from "next"
import { unstable_serialize } from "swr"
import PactUpdates from "../../../components/pacts/pactUpdates"
import PactComments from "../../../components/pacts/pactComments"
import { NextPageWithLayout } from "../../_app"

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
  const { getPact } = await import('../../../lib/getPact')
  
  try {

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

const PactCommentsPage: NextPageWithLayout = () => {
  const { query } = useRouter()
  const pactID = query.streamID as string

  return (
    <>
      <PactComments context={pactID} />
    </>
  )
}

PactCommentsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PactLayout>
      {page}
    </PactLayout>
  )
}

export default PactCommentsPage
