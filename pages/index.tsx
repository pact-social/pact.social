import type { NextPage } from 'next'
import { SWRConfig, unstable_serialize } from 'swr';
import Hero from '../components/hero';
import Highlights from '../components/highlights';
import Layout from '../components/layout';

export async function getStaticProps() {
  // import { getLatestPetitions } from '../lib/getLatestPetitions'
  const { getLatestPetitions } = await import('../lib/getLatestPetitions')
  // console.log(mod);
  return { 
    props: {
      fallback: {
        [unstable_serialize({key: 'getLatestPetitions',limit: 6})]: await getLatestPetitions({limit: 6})
      }
    }, 
    revalidate: 1000
  }
}

interface HomeProps {
  fallback: Object
}

const Home: NextPage<HomeProps> = ({ fallback }) => {
  console.log('fallback', fallback)
  return (
    <Layout metas={{
      title: 'Pact.Social',
      description: 'decentralized petition and manifest for change and impact'
    }}>
      <SWRConfig value={{ fallback }}>
        <Hero />
        <Highlights />
      </SWRConfig>
    </Layout>
  );
}

export default Home
