import type { NextPage } from 'next'
import Image from 'next/image'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import Layout from '../../components/layout';
import { useCeramicContext } from '../../context';
import { GetManifestQuery, Manifest } from '../../src/gql';
// import { Manifest } from '../../types';
import ManifestHero from '../../components/manifest/manifestHero';
import SignStats from '../../components/sign/stats';
import useManifest from '../../hooks/useManifest';
import ManifestProfile from '../../components/manifest/manifestProfile';
import SignBox from '../../components/signBox';


const ManifestPage: NextPage = () => {
  const router = useRouter();
  const { streamID } = router.query;
  
  const { data, error } = useManifest({
    __typename: "Manifest",
    stream: streamID?.[0],
  })

  console.log('manifest streamID', streamID, data);

  if(!streamID) return <></>
  
  
  if (error || !data) {
    return <></>
  }
    return (
      <Layout
        noContainer
        metas={{
        title: 'Pact.Social',
        description: 'decentralized petition and manifest for change and impact'
        }}
      >
        <ManifestHero manifest={data}></ManifestHero>
        {/* <div className="container relative"> */}

        <div className="bg-neutral-50 sticky top-[21rem] z-10">
          
          <div className="container flex max-w-6xl place-content-between min-h-16">
            <div className="tabs align-bottom">
              <a className="tab tab-bordered tab-active">Petition Details</a> 
              <a className="tab tab-bordered">Comments</a> 
              <a className="tab tab-bordered">Updates</a>
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
            {/* <h1 className="text-4xl font-bold text-center">{data?.title}</h1> */}
            {/* <div className=" divider"></div> */}
            <div className="">
              <div className="">
                <div className="aspect-w-16 aspect-h-9">
                  <figure>
                    {/* <Image 
                      src="https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80"
                      alt={data?.title}
                      height={300}
                      width={600}
                      // layout="fill"
                      // objectFit="cover"
                      // className=""
                    /> */}
                  </figure>
                </div>
                <p dangerouslySetInnerHTML={{ __html: data?.content }}></p>
                {/* <p>{data?.content}</p> */}
              </div>
            </div>
          </div>

          <div className="hidden xl:block  xl:fixed xl:top-[18rem] bottom-20 xl:right-[max(0px,calc(50%-41rem))] xl:z-40 xl:overflow-auto rounded-box">
              <div className="flex justify-end">
                <SignBox streamID={data.id}>
                  <SignStats />  
                </SignBox>
              </div>
              {/* <div>
                <div><div className="badge badge-lg">34,354</div> have signed. Let’s get to <div className="badge badge-lg badge-secondary">35,000!</div></div>
                <progress className="progress w-56"></progress>
                <div>
                At 35,000 signatures, this petition becomes one of the top signed on Change.org!
                </div>
              </div> */}
              {/* <div className="divider"></div>  */}
              {/* <div className="grid gap-4">
                <h3 className="text-2xl font-bold">Sign this Petition</h3>
                
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your First Name</span>
                  </label>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Last Name</span>
                  </label>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Your Email</span>
                  </label>
                  <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
                </div>

              </div> */}
            </div>

          </div>
        {/* </div> */}
      </Layout>
    );
  }

export default ManifestPage
