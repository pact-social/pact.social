import type { NextPage } from 'next'
import Hero from '../components/hero';
import Highlights from '../components/highlights';
import Layout from '../components/layout';

const Home: NextPage = () => {
  
  return (
    <Layout metas={{
      title: 'Pact.Social',
      description: 'decentralized petition and manifest for change and impact'
    }}>
      <Hero />
      <Highlights />
    </Layout>
  );
}

export default Home
