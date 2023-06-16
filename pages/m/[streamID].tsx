import type { GetStaticPaths, GetStaticProps } from 'next'
import { unstable_serialize } from 'swr';
import PactBody from '../../components/pacts/pactBody';
import { ReactElement, ReactNode } from 'react';
import PactLayout from '../../components/pactLayout';
import { NextPageWithLayout } from '../_app';

type Tab = {
  name: string,
  content: ReactNode
}

export const getStaticPaths: GetStaticPaths<{ streamID: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  console.log('getStaticProps PactPage', params, context)
  if (!params?.streamID || params?.streamID.length === 0 || params.streamID.indexOf('<no source>') > -1 ) {
    return {
      notFound: true,
    }
  }
  const streamID = params?.streamID as string;
  const { getPact } = await import('../../lib/getPact')
  
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



const PactPage: NextPageWithLayout<{fallback: Object; title: string; pactID: string;}> = ({ fallback, title, pactID }) => {

  return (
    <PactBody />
  );
}

PactPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <PactLayout>
      {page}
    </PactLayout>
  )
}

export default PactPage

