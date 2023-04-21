import type { NextPage } from 'next'
import Image from 'next/image';
import { SWRConfig, unstable_serialize } from 'swr';
import Hero from '../components/hero';
import Highlights from '../components/highlights';
import Layout from '../components/layout';
import BrandName from '../components/svg/brandName';
import Leaderboard from '../components/leaderboard';

export async function getStaticProps() {
  const { getLatestPetitions } = await import('../lib/getLatestPetitions')
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
  return (
    <Layout 
      metas={{
        title: 'Pact.Social',
        description: 'decentralized petition and manifest for change and impact'
      }}
    >
      <SWRConfig value={{ fallback }}>
        <Hero />
        <Highlights />
        <Leaderboard />
        {/* About pact.social */}
        <section className="relative py-9 min-h-[32rem]">
          <Image 
            src="/gayatri-malhotra-WzfqobnrSVc-unsplash.jpeg"
            width={680}
            height={1024}
            alt=""
            className="picture-frame max-w-[75%] sm:max-w-[calc(50%-3.5rem)] mx-auto sm:ml-14"
          />
          <div className="sm:absolute w-full min-h-[50%] sm:top-1/4 py-8 pt-32 -mt-24 sm:mt-0 sm:py-0 flex items-center justify-center sm:justify-end backdrop-opacity-10 bg-gradient-to-b from-[#cfffc1]/[.4] to-[#d495ff]/[.4]">
            <div className="w-3/4 sm:w-1/2 sm:px-14 py-4">
              <BrandName black className="h-9 mb-11" />
              <p className="font-bold">A bunch of impact punks worried about voices becoming less free. <br/>
              pact.social is decentralized, verified </p>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="flex flex-col items-center my-9">
          <h3 className="font-title text-5xl font-bold lowercase">partners</h3>
          <p className="my-4 font-light">buidl on the following tech stack and partners</p>
          <div className="grid grid-cols-3 lg:grid-cols-6 justify-items-center items-center gap-12 my-11">
            <Image 
              src="/partners/ceramic_logo.png"
              width={120}
              height={48}
              alt=""
              className=""
            />
            <Image 
              src="/partners/composedb_logo.png"
              width={120}
              height={48}
              alt=""
              className=""
            />
            <Image 
              src="/partners/orbis_logo.png"
              width={120}
              height={48}
              alt=""
              className=""
            />
            <Image 
              src="/partners/ipfs_logo.png"
              width={120}
              height={48}
              alt=""
              className=""
            />
            <Image 
              src="/partners/lit_logo.png"
              width={48}
              height={48}
              alt=""
              className=""
            />
            <Image 
              src="/partners/passport_logo.png"
              width={120}
              height={48}
              alt=""
              className=""
            />
          </div>
        </section>

        {/* Support us */}
        <section className="bg-black text-neutral-content">
          <div className=" py-24 mx-24">
            <h3 className="font-title text-5xl font-bold lowercase">like what you see ?</h3>
            <p className="my-4 font-light text-lg">If you believe in building tools for humans to express themselves<br/> and rally around impact topics without selling out on privacy,<br/> there are ways to support: </p>
          </div>
        </section>

        {/* Roadmap */}
        <section>
          <div className="flex flex-col items-center py-24 mx-24">
            <h3 className="font-title text-5xl font-bold lowercase">roadmap</h3>
          </div>

          <div className="container mx-auto w-full h-full">
            <div className="relative wrap overflow-hidden m-10 h-full">
              <div className=" border-4 -ml-[4px] rounded absolute border-opacity-20 border-gray-700 h-full left-1/2"></div>
              {/* <!-- right timeline --> */}
              <div className="mb-8 flex justify-between items-center w-full right-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-secondary shadow-xl w-8 h-8 rounded-full">
                  <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
                </div>
                <div className="order-1 w-5/12">
                  <Image 
                    src="/timeline/step1.png"
                    width={400}
                    height={400}
                    alt=""
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>

              {/* <!-- left timeline --> */}
              <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-secondary shadow-xl w-8 h-8 rounded-full">
                  <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
                </div>
                <div className="order-1 w-5/12 flex justify-end">
                  <Image 
                    src="/timeline/step2.png"
                    width={400}
                    height={400}
                    alt=""
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
              
              {/* <!-- right timeline --> */}
              <div className="mb-8 flex justify-between items-center w-full right-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-secondary shadow-xl w-8 h-8 rounded-full">
                  <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
                </div>
                <div className="order-1 w-5/12">
                  <Image 
                    src="/timeline/step3.png"
                    width={400}
                    height={400}
                    alt=""
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>

              {/* <!-- left timeline --> */}
              <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
                <div className="order-1 w-5/12"></div>
                <div className="z-20 flex items-center order-1 bg-secondary shadow-xl w-8 h-8 rounded-full">
                  <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
                </div>
                <div className="order-1 w-5/12 flex justify-end">
                  <Image 
                    src="/timeline/step4.png"
                    width={300}
                    height={300}
                    alt=""
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </div>

        </section>
      </SWRConfig>
    </Layout>
  );
}

export default Home
