import type { NextPage } from 'next'
import Image from 'next/image';
import { SWRConfig, unstable_serialize } from 'swr';
import Hero from '../components/hero';
import Highlights from '../components/highlights';
import Layout from '../components/layout';
import BrandName from '../components/svg/brandName';
import Leaderboard from '../components/leaderboard';
import Roadmap from '../components/roadmap';

export async function getStaticProps() {
  const { getLatestPacts } = await import('../lib/getLatestPacts')
  return { 
    props: {
      fallback: {
        [unstable_serialize({key: 'getLatestPacts',limit: 6})]: await getLatestPacts({limit: 6})
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
        title: 'pact.social',
        description: 'decentralized petitions, manifestos and open-letters for change and impact',
        imageSrc: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/og/default`
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
            className="picture-frame max-w-[75%] lg:max-w-[calc(50%-3.5rem)] mx-auto lg:ml-14"
          />
          <div className="lg:absolute w-full min-h-[50%] lg:top-0 py-8 pt-32 -mt-24 lg:mt-0 lg:py-0 flex items-center justify-center lg:justify-end backdrop-opacity-10 bg-gradient-to-b from-[#cfffc1]/[.4] to-[#d495ff]/[.4]">
            <div className="w-3/4 lg:w-1/2 lg:px-14 my-24">
              <div className="grid gap-9 lg:max-w-lg text-md">
                <BrandName black className="h-9 mb-4" />
                <p className=" font-light">
                Is a tool to gather verfied signaures for your open letter, manifesto or petitions. Where people can sign public, private or anonoums. Decentralized, transparent and open. 
                </p>
                <p className=" font-light">
                To really stand up to change, voices need to be free. To be free you need to have the option of maintaining your privacy. Gathered voices (evidence) needs to be provable, verifiable, and unchangable (immutable). And lobbying should be a power of the many, and not just the elite with access. 
                </p>
                <p className=" font-light">
                We are a bunch of Cyberpunks that build Sybil restistent tools to bring people together to Act.
                </p>
                <p className=" font-light">
                We are all hackers driven by change. We are the 99%. Our world seems under chaos everyday, yet we strive to change our daily lives in a certainly unfair war against each other.
                </p>
                <p className=" font-bold">
                This is our cry for change. Join us.
                </p>
              </div>

            </div>
          </div>
        </section>
        <div className="divider"></div>
        {/* Partners */}
        <section className="flex flex-col items-center py-9">
          <h3 className="font-title text-5xl font-bold lowercase">partners</h3>
          <p className="my-4 font-light">buidl on the following tech stack and partners</p>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 justify-items-center items-center gap-12 my-11">
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
        <Roadmap />
      </SWRConfig>
    </Layout>
  );
}

export default Home
