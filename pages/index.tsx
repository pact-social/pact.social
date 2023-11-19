import type { NextPage } from 'next'
import Image from 'next/image';
import { SWRConfig, unstable_serialize } from 'swr';
import Hero from '../components/hero';
import Highlights from '../components/highlights';
import Layout from '../components/layout';
import BrandName from '../components/svg/brandName';
import Leaderboard from '../components/leaderboard';
// import Roadmap from '../components/roadmap';
import SpeakCTA from '../components/speakCTA';
import { getPact } from '../lib/getPact';
import { Pact, PactType } from '../src/gql';
import Link from 'next/link';


export async function getStaticProps() {

  try {
    const { getLatestPacts } = await import('../lib/getLatestPacts')
    const { supabase } = await import('../lib/supabase')
    const { data, error } = await supabase.rpc('sign_stats_top')
    if (error) console.log('error', error)
    
    let featured = null
    let top = null
    console.log(data)
    if (data && data.length > 0) {
      featured = await getPact({streamID: data[0].streamid})
    }
    if (data && data.length > 3) {
      top = await Promise.all([
        getPact({streamID: data[1].streamid}),
        getPact({streamID: data[2].streamid}),
        getPact({streamID: data[3].streamid}),
      ])
    }
  
    return { 
      props: {
        fallback: {
          [unstable_serialize({key: 'getLatestPacts',limit: 6})]: await getLatestPacts({limit: 6})
        },
        featured,
        top,
      }, 
      revalidate: 1000
    }
  } catch (error) {
    return {
      props: {
        fallback: {
          [unstable_serialize({key: 'getLatestPacts',limit: 6})]: null
        },
        featured: null,
        top: null,
      },
      revalidate: 1000
    }
  }
}

interface HomeProps {
  fallback: Object;
  featured?: Pact,
  top?: Pact[];
}

const Home: NextPage<HomeProps> = ({ 
  fallback,
  featured,
  top,
}) => {
  return (
    <Layout 
      metas={{
        title: 'pact.social',
        description: 'decentralized petitions, manifestos and open-letters for change and impact',
        imageSrc: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/og/default`
      }}
    >
      <SWRConfig value={{ fallback }}>
        {featured
          ?
          <Link
            href={`/m/${featured.id}`}
            title=''
          >
            <Hero 
              title="where free voices act!"
              description="stand up and create"
              media={{
                image: featured.media?.at(0)?.item,
                alt: '',
                title: `featured ${featured.type}`,
                subtitle: featured?.title || '',
                ratio: '1/1',
                action: 'Sign',
                accentColor: featured.type as PactType,
              }}
              extra={
              <div className="relative overflow-hidden h-16 -ml-2">
                <div className="message">
                  <div className="word-manifesto">manifestos</div>
                  <div className="word-petition">petitions</div>
                  <div className="word-openletter">open letters</div>
                </div>
              </div>
            }
            />
          </Link>
          :
          <Hero 
            title="where free voices act!"
            description="stand up and create"
            media={{
              image: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/ehimetalor-akhere-unuabona-sW16rbnZHp8-unsplash.jpg`,
              alt: '',
              title: 'featured petition',
              subtitle: 'Help Save Grace the Ancient Tree and her friends, by ending the filling of wetlands!',
              ratio: '1/1'
            }}
            extra={
            <div className="relative overflow-hidden h-16 -ml-2">
              <div className="message">
                <div className="word-manifesto">manifestos</div>
                <div className="word-petition">petitions</div>
                <div className="word-openletter">open letters</div>
              </div>
            </div>
            }
          />
        }
        <SpeakCTA />
        <Highlights pacts={top} />
        <Leaderboard />

        {/* About pact.social */}
        <section className="relative py-9 min-h-[32rem] sm:mb-12 md:mb-24 lg:mb-72 xl:mb-32">
          <Image 
            src={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/gayatri-malhotra-WzfqobnrSVc-unsplash.jpeg`}
            width={680}
            height={1024}
            alt=""
            priority={false}
            sizes="(max-width: 768px) 80vw, (max-width: 1200px) 33vw, 33vw"
            // className={`${props.media?.ratio ? `aspect-[${props.media?.ratio}]` : 'aspect-[1/1]'} object-cover h-auto w-auto`}
            className="picture-frame max-w-[75%] lg:max-w-[calc(50%-3.5rem)] mx-auto lg:ml-14 h-auto w-auto"
          />
          <div className="lg:absolute w-full min-h-[50%] lg:top-0 py-8 pt-32 -mt-24 lg:mt-0 lg:py-0 flex items-center justify-center lg:justify-end backdrop-opacity-10 bg-gradient-to-b from-[#cfffc1]/[.4] to-[#d495ff]/[.4]">
            <div className="w-3/4 lg:w-1/2 lg:px-14 my-24">
              <div className="grid gap-9 lg:max-w-lg text-md">
                <BrandName black className="h-9 mb-4" />
                <p className=" font-light">
                Is a tool to gather verfied signatures for your open letter, manifesto or petitions. Where people can sign public, private or anonoums. Decentralized, transparent and open. 
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
                <Link
                  href="/m/kjzl6kcym7w8y5jz1licdlf4tqs56pygk36at6qnlp7ja1qpx8bwguzihrck6qt"
                  className="btn btn-secondary"
                >
                  Sign our manifesto
                </Link>
              </div>

            </div>
          </div>
        </section>
        {/* <div className="divider"></div> */}
        
        {/* Support us */}
        <section className="bg-black text-neutral-content flex flex-col lg:flex-row items-center">
          <div className="flex-1 py-12 mx-4 sm:py-24 sm:mx-24">
            <h3 className="font-title text-5xl font-bold lowercase">like what you see ?</h3>
            <p className="my-4 font-light text-lg">If you believe in building tools for humans to express themselves and rally around impact topics without selling out on privacy, there are ways to support: </p>
          </div>
          <div className="flex-1 grid gap-8 grid-cols-1 lg:grid-cols-2 grid-flow-row lg:grid-flow-col items-center items-stretch justify-center pb-12 sm:pb-24 lg:pb-0 lg:mr-12">
            <div className="grid grid-flow-row grid-rows-3 gap-2 items-stretch ">
              {/* <div className="flex flex-col items-center"> */}
                <svg fill="none" viewBox="0 0 27 32" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 self-center justify-self-center"  ><path d="m25.8683 17.7777c0 1.7733-.4008 3.4528-1.1172 4.9544l-1.5588-.9711-.7304-.455c.47-1.0816.7304-2.275.7304-3.5283s-.2604-2.4467-.7304-3.5283l.7304-.455 1.5588-.9712c.7164 1.5017 1.1172 3.1812 1.1172 4.9545z" fill="#146c76"></path><path d="m23.1926 21.7611-.7304-.455-2.8015-1.7444c-.1633-.1017-.243-.2973-.1962-.4834.1042-.4161.16-.8516.16-1.3 0-.4483-.0552-.8839-.16-1.3-.0468-.1866.0329-.3816.1962-.4833l2.8015-1.7444 2.2892-1.4262 1.5716-.9788c.4064-.2534.5419-.7828.3011-1.1962-.0803-.1383-.1634-.2744-.2481-.4094-.2375-.37778-.4923-.74389-.7633-1.09667-2.5662-3.34166-6.587-5.51611-11.1195-5.585-.1227-.00166-.2214-.1-.2214-.22222v-2.00278c0-.736108-.5993-1.33333-1.338-1.33333s-1.338.597222-1.338 1.33333v2.29056c0 .10611-.0753.19667-.1796.21778-.7548.15277-1.48851.365-2.19488.63166-.14551.055-.30161-.05222-.30161-.20777v-2.93223c0-.736108-.59932-1.33333-1.33803-1.33333-.7387 0-1.33803.597222-1.33803 1.33333v4.45223c0 .14555-.07247.28111-.19178.365-3.64836 2.56611-6.0356235 6.79444-6.05179138 11.57884-.02620302 7.8489 6.50115138 14.2706 14.37772138 14.2706h10.5988c.4929 0 .892-.3978.892-.8889v-7.0672c0-.3833-.1979-.7395-.524-.9422l-.5932-.3695zm-.446 7.5722h-8.3711c-6.3846 0-11.70494-5.205-11.69881-11.5666.00279-3.1767 1.29232-6.0528 3.37685-8.14003.07025-.07056.19123-.02111.19123.07833v1.4061c0 .7361.59932 1.3333 1.33803 1.3333.7387 0 1.33803-.5972 1.33803-1.3333v-3.31277c0-.16944.097-.325.24976-.39944 1.53981-.75333 3.27151-1.17667 5.10231-1.17667 3.4778 0 6.5982 1.52556 8.7234 3.94168.1812.2061.1338.525-.0992.6705l-1.8543 1.155-2.5333 1.5778c-.3139.1956-.7159.1767-1.0114-.0455-.9037-.6817-2.0315-1.0834-3.2542-1.0767-2.8996.0156-5.28015 2.3644-5.32252 5.2539-.04348 2.9817 2.36942 5.4128 5.35152 5.4128 1.2137 0 2.3327-.4023 3.2303-1.0811.2932-.2217.6941-.2362 1.0063-.0417l2.5333 1.5778 1.8883 1.1761c.1628.1016.262.2794.262.4711v3.6755c0 .2456-.1996.4445-.446.4445zm-5.7998-11.6489v.1867c-.0168.4839-.1628.935-.4048 1.32-.2481.3956-.5982.7217-1.013.9417-.3746.1989-.8022.3116-1.2566.3116-1.478 0-2.6761-1.1938-2.6761-2.6666s1.1981-2.6667 2.6761-2.6667c.4544 0 .882.1128 1.2566.3117.4148.22.7649.5461 1.013.9416.242.385.388.8362.4048 1.32z" fill="#ffffff"></path></svg>
                {/* <span className="">Gitcoin</span> */}
                <span className="justify-self-center text-center">Donate to GG19 community and education Round</span>
              {/* </div> */}
              <Link
                href="https://explorer.gitcoin.co/#/round/424/0x98720dd1925d34a2453ebc1f91c9d48e7e89ec29/0x98720dd1925d34a2453ebc1f91c9d48e7e89ec29-169"
                className="btn normal-case w-full btn-secondary"
                target="_blank"
              >
                
                Donate
              </Link>
            </div>
            <div className="grid grid-flow-row grid-rows-3 gap-2 items-stretch ">
              {/* <div className="flex flex-col items-center"> */}
              <Image 
                src="/opencivics_logo.jpeg"
                width={48}
                height={48}
                alt="OpenCivics"
                className=" rounded-full self-center justify-self-center"
              />
                  {/* <svg fill="none" viewBox="0 0 27 32" xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 justify-self-center"  ><path d="m25.8683 17.7777c0 1.7733-.4008 3.4528-1.1172 4.9544l-1.5588-.9711-.7304-.455c.47-1.0816.7304-2.275.7304-3.5283s-.2604-2.4467-.7304-3.5283l.7304-.455 1.5588-.9712c.7164 1.5017 1.1172 3.1812 1.1172 4.9545z" fill="#146c76"></path><path d="m23.1926 21.7611-.7304-.455-2.8015-1.7444c-.1633-.1017-.243-.2973-.1962-.4834.1042-.4161.16-.8516.16-1.3 0-.4483-.0552-.8839-.16-1.3-.0468-.1866.0329-.3816.1962-.4833l2.8015-1.7444 2.2892-1.4262 1.5716-.9788c.4064-.2534.5419-.7828.3011-1.1962-.0803-.1383-.1634-.2744-.2481-.4094-.2375-.37778-.4923-.74389-.7633-1.09667-2.5662-3.34166-6.587-5.51611-11.1195-5.585-.1227-.00166-.2214-.1-.2214-.22222v-2.00278c0-.736108-.5993-1.33333-1.338-1.33333s-1.338.597222-1.338 1.33333v2.29056c0 .10611-.0753.19667-.1796.21778-.7548.15277-1.48851.365-2.19488.63166-.14551.055-.30161-.05222-.30161-.20777v-2.93223c0-.736108-.59932-1.33333-1.33803-1.33333-.7387 0-1.33803.597222-1.33803 1.33333v4.45223c0 .14555-.07247.28111-.19178.365-3.64836 2.56611-6.0356235 6.79444-6.05179138 11.57884-.02620302 7.8489 6.50115138 14.2706 14.37772138 14.2706h10.5988c.4929 0 .892-.3978.892-.8889v-7.0672c0-.3833-.1979-.7395-.524-.9422l-.5932-.3695zm-.446 7.5722h-8.3711c-6.3846 0-11.70494-5.205-11.69881-11.5666.00279-3.1767 1.29232-6.0528 3.37685-8.14003.07025-.07056.19123-.02111.19123.07833v1.4061c0 .7361.59932 1.3333 1.33803 1.3333.7387 0 1.33803-.5972 1.33803-1.3333v-3.31277c0-.16944.097-.325.24976-.39944 1.53981-.75333 3.27151-1.17667 5.10231-1.17667 3.4778 0 6.5982 1.52556 8.7234 3.94168.1812.2061.1338.525-.0992.6705l-1.8543 1.155-2.5333 1.5778c-.3139.1956-.7159.1767-1.0114-.0455-.9037-.6817-2.0315-1.0834-3.2542-1.0767-2.8996.0156-5.28015 2.3644-5.32252 5.2539-.04348 2.9817 2.36942 5.4128 5.35152 5.4128 1.2137 0 2.3327-.4023 3.2303-1.0811.2932-.2217.6941-.2362 1.0063-.0417l2.5333 1.5778 1.8883 1.1761c.1628.1016.262.2794.262.4711v3.6755c0 .2456-.1996.4445-.446.4445zm-5.7998-11.6489v.1867c-.0168.4839-.1628.935-.4048 1.32-.2481.3956-.5982.7217-1.013.9417-.3746.1989-.8022.3116-1.2566.3116-1.478 0-2.6761-1.1938-2.6761-2.6666s1.1981-2.6667 2.6761-2.6667c.4544 0 .882.1128 1.2566.3117.4148.22.7649.5461 1.013.9416.242.385.388.8362.4048 1.32z" fill="#ffffff"></path></svg> */}
                  {/* <span className="">Donate to</span> */}
                  <span className="justify-self-center text-center">Donate to OpenCivics Genesis round</span>
                {/* </div> */}
              <Link
                href="https://explorer.gitcoin.co/#/round/424/0xe60a569ec8aac2045d9fda306dc2a16cc1e52a90/0xe60a569ec8aac2045d9fda306dc2a16cc1e52a90-11"
                className="btn normal-case w-full btn-primary"
                target="_blank"
              >
                Donate
              </Link>
            </div>
          </div>
        </section>

        
        {/* Partners */}
        <section className="flex flex-col items-center py-9">
          <h3 className="font-title text-5xl font-bold lowercase">partners</h3>
          <p className="my-4 font-light">buidl on the following tech stack and partners</p>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 justify-items-center items-center gap-12 my-11">
            <Image 
              src={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/partners/ceramic_logo.png`}
              width={120}
              height={48}
              alt=""
              className="h-auto"
            />
            <Image 
              src={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/partners/composedb_logo.png`}
              width={120}
              height={48}
              alt=""
              className="h-auto"
            />
            <Image 
              src={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/partners/orbis_logo.png`}
              width={120}
              height={48}
              alt=""
              className="h-auto"
            />
            <Image 
              src={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/partners/ipfs_logo.png`}
              width={120}
              height={48}
              alt=""
              className="h-auto"
            />
            <Image 
              src={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/partners/lit_logo.png`}
              width={48}
              height={48}
              alt=""
              className="h-auto"
            />
            <Image 
              src={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/partners/passport_logo.png`}
              width={120}
              height={48}
              alt=""
              className="h-auto"
            />
          </div>
        </section>


        {/* Roadmap */}
        {/* <Roadmap /> */}
      </SWRConfig>
    </Layout>
  );
}

export default Home
