// import Image from 'next/image'

import { Manifest } from "../../src/gql"

type ManifestHeroProps = {
  manifest: Manifest;
}

export default function ManifestHero({ manifest }: ManifestHeroProps) {
  return (
    <>
      <div 
        className="hero bg-base-200 min-h-[21rem] content-end sticky top-0 z-30" 
        style={{
          // load manifest image if present
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2) 50%),url("https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        {/* <div className="hero-overlay bg-opacity-60"></div> */}
        <div className="hero-content flex-col lg:flex-row">
          {/* <Image
            src="" 
            className="max-w-sm rounded-lg shadow-2xl"
            alt=""
            width={800}
            height={500}
          /> */}
          <div className="pb-9">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary-content">{manifest.title}</h1>
            <p className="py-3"></p>
            {/* <button className="btn btn-secondary">Start a Manifest</button> */}
            <div className="flex place-content-center">
              <div className="stats shadow">
                <div className="stat">
                  {/* <div className="stat-title">Total Page Views</div> */}
                  <div className="stat-value text-primary">312,400</div>
                  <div className="stat-desc text-center">signatures</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
