import { SWRConfig } from "swr";
import Layout from "./layout";
import { PactProvider } from "../context/pact";
import PactHero from "./pacts/pactHero";
import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import analytics from "../context/analytics";
import SignBox from "./signBox";
import SignStats from "./sign/stats";
import Portal from "./portal";
import WalletSign from "./sign/wallet";
import ShareView from "./sign/share";
import Highlights from "./highlights";
import Link from "next/link";

type Tab = {
  name: string,
  pathname: string,
}

export default function PactLayout({ children }: { children: ReactElement }) {
  const router = useRouter()
  const streamID = router.query.streamID as string;
  const { fallback, title, pactID } = children?.props;
  
  useEffect(() => {
    const url = new URL(location.href);
    const ref = url.searchParams.get('ref')
    let args: any = {}
    if (ref) {
      args.ref = ref
      localStorage.setItem(`ref_${streamID}`, JSON.stringify({
        ref,
        createdAt: (new Date()).toISOString()
      }));
    }
    analytics.page(args)
  }, []);

  const tabList: Tab[] = [
    {
      name: 'Petition details',
      pathname: '/m/[streamID]',
    },
    {
      name: 'Comments',
      pathname: '/m/[streamID]/comments',
    },
    {
      name: 'Updates',
      pathname: '/m/[streamID]/updates',
    
    }
  ]
  return (
    <Layout
      // noContainer
      metas={{
      title: title || 'pact.social',
      description: 'decentralized petition and manifest for change and impact',
      imageSrc: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/og/${pactID}`
      }}
    >
      <SWRConfig value={{ fallback }}>
        <PactProvider pactId={streamID}>

          <PactHero />

          <div className="bg-neutral-50 sticky top-[5rem] z-10">
            
            <div className="container flex place-content-between min-h-16">
              <div className="tabs align-bottom">
                {tabList.map((tab, index) => (
                  <Link
                    href={{
                      pathname: tab.pathname,
                      query: {
                        streamID: pactID
                      }
                    }}
                    scroll={false}
                    key={`tab-${index}`} 
                    className={`tab tab-bordered ${tab.pathname === router.pathname && 'tab-active'}`}
                  >
                    {tab.name}
                  </Link>
                ))}
              </div>
            </div>

          </div>
          <div className=" flex items-start justify-center gap-4 lg:gap-8">
            <div className="flex-1 md:max-w-lg lg:max-w-2xl xl:max-w-3xl my-16 px-7">
                {children}
            </div>

            <div className="hidden md:block right-0 top-28 w-80 lg:w-80 md:sticky">
              <div className="flex justify-end my-16 ">
                <SignBox className="stats shadow-xl stats-vertical w-full min-h-[18rem]">
                  <SignStats />  
                </SignBox>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <div className="btm-nav z-10 px-8 gap-8 border-t-2">
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
                      <label className="modal-backdrop" htmlFor="sign-modal">Close</label>
                    </div>
                  </Portal>
              </label>
              <label className="btn btn-success flex-auto" htmlFor="share-modal">
                Share
                <Portal>
                    <input type="checkbox" id="share-modal" className="modal-toggle" />
                    <div className="modal modal-bottom">
                      <div className="modal-box">
                      <SignBox>
                        <ShareView />
                      </SignBox>
                        <div className="modal-action">
                          <label htmlFor="share-modal" className="btn">Yay!</label>
                        </div>
                      </div>
                    </div>
                  </Portal>
              </label>
              {/* <button className="btn btn-outline flex-auto">
                Chip in $
              </button> */}
            </div>
          </div>
        </PactProvider>
      </SWRConfig>
      <Highlights />
    </Layout>
  )
}
