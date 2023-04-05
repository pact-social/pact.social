import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../../components/layout';
import ManifestHero from '../../components/manifest/manifestHero';
import SignStats from '../../components/sign/stats';
import ManifestProfile from '../../components/manifest/manifestProfile';
import SignBox from '../../components/signBox';
import { SWRConfig, unstable_serialize } from 'swr';
import ManifestBody from '../../components/manifest/manifestBody';
import { ManifestProvider } from '../../context/manifest';
import { ReactNode, useState } from 'react';
import ManifestComments from '../../components/manifest/manifestComments';

type Tab = {
  name: string,
  content: ReactNode
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  if (!params?.streamID) {
    return {
      notFound: true,
    }
  }
  const [ streamID ] = params?.streamID as Array<string>;
  const { getManifest } = await import('../../lib/getManifest')
  try {
    const data = await getManifest({streamID})
    
    if (!data) {
      console.log('404', data)
      return {
        notFound: true,
      }
    }

    return { 
      props: {
        fallback: {
          [unstable_serialize({streamID})]: data
        }
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



const ManifestPage: NextPage<{fallback: Object}> = ({ fallback }) => {
  const router = useRouter();
  const [ streamID ]  = router.query.streamID as Array<string>;
  const tabList: Tab[] = [
    {
      name: 'Petition details',
      content: <ManifestBody />
    },
    {
      name: 'Comments',
      content: <ManifestComments />
    },
    {
      name: 'Updates',
      content: <div>updates</div>
    }
  ]
  const [ currentTab, setTab ] = useState<Tab>(tabList[0])

  return (
    <Layout
      noContainer
      metas={{
      title: 'Pact.Social',
      description: 'decentralized petition and manifest for change and impact'
      }}
    >
      <SWRConfig value={{ fallback }}>
        <ManifestProvider manifestId={streamID}>

          <ManifestHero />

          <div className="bg-neutral-50 sticky top-[21rem] z-10">
            
            <div className="container flex max-w-6xl place-content-between min-h-16">
              <div className="tabs align-bottom">
                {tabList.map((tab, index) => (
                  <a
                    onClick={() => setTab(tab)}
                    key={`tab-${index}`} 
                    className={`tab tab-bordered ${tab.name === currentTab.name && 'tab-active'}`}
                  >
                    {tab.name}
                  </a>
                ))}
              </div>
              <button className="btn self-center btn-primary gap-2">
                Sign Now
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </button>
            </div>

          </div>

          <div className="container flex max-w-6xl justify-center ">

            <div className="flex flex-col lg:fixed lg:left-[max(0px,calc(50%-36rem))] lg:top-[32rem] lg:bottom-0 z-50 gap-5">
              <ManifestProfile />
            </div>

            <div className=" min-h-screen max-w-3xl my-16 px-11">
              {/* <div className=""> */}
                {currentTab.content}
              {/* </div> */}
            </div>

            <div className="hidden xl:block  xl:fixed xl:top-[18rem] bottom-20 xl:right-[max(0px,calc(50%-41rem))] xl:z-40 xl:overflow-auto rounded-box">
              <div className="flex justify-end">
                <SignBox>
                  <SignStats />  
                </SignBox>
              </div>
            </div>

          </div>
        </ManifestProvider>
      </SWRConfig>
    </Layout>
  );
}

export default ManifestPage
