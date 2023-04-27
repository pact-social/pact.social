import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { useRouter } from 'next/router'
import Layout from '../../components/layout';
import PactHero from '../../components/pacts/pactHero';
import SignStats from '../../components/sign/stats';
import SignBox from '../../components/signBox';
import { SWRConfig, unstable_serialize } from 'swr';
import PactBody from '../../components/pacts/pactBody';
import { PactProvider } from '../../context/pact';
import { ReactNode, useState } from 'react';
import PactComments from '../../components/pacts/pactComments';
import Highlights from '../../components/highlights';
import Portal from '../../components/portal';
import WalletSign from '../../components/sign/wallet';

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

  if (!params?.streamID || params?.streamID.length === 0) {
    return {
      notFound: true,
    }
  }
  const [ streamID ] = params?.streamID as Array<string>;
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



const PactPage: NextPage<{fallback: Object}> = ({ fallback }) => {
  const router = useRouter();
  const [ streamID ]  = router.query.streamID as Array<string>;
  const tabList: Tab[] = [
    {
      name: 'Petition details',
      content: <PactBody />
    },
    {
      name: 'Comments',
      content: <PactComments context={streamID}/>
    },
    {
      name: 'Updates',
      content: <div>updates</div>
    }
  ]
  const [ currentTab, setTab ] = useState<Tab>(tabList[0])

  return (
    <Layout
      // noContainer
      metas={{
      title: 'Pact.Social',
      description: 'decentralized petition and manifest for change and impact'
      }}
    >
      <SWRConfig value={{ fallback }}>
        <PactProvider pactId={streamID}>

          <PactHero />

          <div className="bg-neutral-50 sticky top-[5rem] z-10">
            
            <div className="container flex place-content-between min-h-16">
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
              {/* <button className="btn self-center btn-primary gap-2">
                Sign Now
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path></svg>
              </button> */}
            </div>

          </div>
          <div className=" flex items-start justify-center gap-4 lg:gap-8">
              <div className="md:max-w-lg lg:max-w-2xl xl:max-w-3xl my-16 px-7">
                  {currentTab.content}
              </div>


            {/* </div> */}

            <div className="hidden md:block right-0 top-28 w-56 lg:w-64 md:sticky">
              <div className="flex justify-end my-16 ">
                <SignBox className="stats shadow-xl stats-vertical w-full min-h-[18rem]">
                  <SignStats />  
                </SignBox>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <div className="btm-nav z-10 px-8 gap-8 border-t-2">
            {/* <div className="btn-group btn-group-horizontal gap-0"> */}
              <label htmlFor="sign-modal" className="btn btn-secondary flex-auto">
                  Sign
                  <Portal>
                    <input type="checkbox" id="sign-modal" className="modal-toggle" />
                    <div className="modal modal-bottom">
                      <div className="modal-box">
                        <SignBox>
                          <WalletSign />  
                        </SignBox>
                        <div className="modal-action">
                          <label htmlFor="sign-modal" className="btn">Yay!</label>
                        </div>
                      </div>
                    </div>
                  </Portal>
              </label>
              <button className="btn btn-success flex-auto">
                Share
              </button>
              <button className="btn btn-outline flex-auto">
                Chip in $
              </button>
              {/* </div> */}
              {/* <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              </button>
              <button className="active">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </button>
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </button> */}
            </div>
          </div>
        </PactProvider>
      </SWRConfig>
      <Highlights />
    </Layout>
  );
}

export default PactPage
