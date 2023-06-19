import Image from 'next/image'
import Link from 'next/link'
import Divider from './svg/divider'

export default function Hero() {
  return (
    <>
      <div className="hero hero-split">
        <div className="hero-content">
          <div className="hero-img flex-1 relative lg:border-white lg:border-r-[1rem] lg:border-b-[1rem]">
            <figure className="relative">
              <Image
                src="/ehimetalor-akhere-unuabona-sW16rbnZHp8-unsplash.jpg" 
                alt=""
                width={800}
                height={800}
                className="aspect-[1/1] object-cover"
              />
            </figure>
            <div className="absolute bottom-0 sm:bottom-10 xl:bottom-20 max-w-full min-w-[80%] lg:max-w-[90%] bg-[#f4fffb]/80 backdrop-blur-md font-sans p-8 py-3">
              <div className="pb-2 font-light">
                <div className="h-[0.875rem] w-[0.875rem] bg-secondary inline-flex rounded-2xl mr-2"></div>
                featured petition
              </div>
              <h2 className="text-xl font-bold">
              Help Save Grace the Ancient Tree and her friends, by ending the filling of wetlands!
              </h2>
            </div>
          </div>
          <div className="hero-details mb-40 mt-9 sm:mt-12 lg:mt-0">
            <h1 className="text-5xl font-bold">where free voices act!</h1>
            <p className="py-3 text-4xl xl:text-5xl font-medium">stand up and create</p>
            <div className="relative overflow-hidden h-16 -ml-2">
              <div className="message">
                <div className="word-manifesto">manifestos</div>
                <div className="word-petition">petitions</div>
                <div className="word-openletter">open letters</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      <div className="mx-auto -mt-20 bg-[#eef9ff]">
        <div className="relative pt-28 pb-28">

        <Divider width={100} position="right" className="absolute right-0 -top-[117px]"></Divider>
        <div className="grid lg:grid-flow-col lg:grid-cols-3 gap-12 justify-items-center lg:mx-12 xl:mx-24">
          
          <div className="grid h-full items-start max-w-xs">
            <h3 className="font-bold text-3xl my-6">Manifesto</h3>
            <p className="font-light text-lg self-start">
              Make a stand and join all those free<br/>
              voices that share your values
            </p>
            <div className="flex gap-4 mt-12 self-end">
              <Link
                className="btn normal-case btn-secondary"
                href="/m/create"
              >
                Post a Manifesto
              </Link>
              <Link
                className="btn normal-case btn-outline"
                href="/explore/manifesto"
              >
                See all Manifestos
              </Link>
            </div>
          </div>

          <div className="grid h-full items-start max-w-xs">
            <h3 className="font-bold text-3xl my-6">Petition</h3>
            <p className="font-light text-lg self-start">
              Change your society, create decision power by gathering free voices to make change happen
            </p>
            <div className="flex gap-4 mt-12 self-end">
              <Link
                className="btn normal-case btn-secondary"
                href="/m/create"
              >
                Make a Petition
              </Link>
              <Link
                className="btn normal-case btn-outline"
                href="/explore/petition"
              >
                See all Petitions
              </Link>
            </div>
          </div>

          <div className="grid h-full items-start max-w-xs">
            <h3 className="font-bold text-3xl my-6">Open letter</h3>
            <p className="font-light text-lg self-start">
              Your opinion counts, Get your free voice out there and power it up by others.
            </p>
            <div className="flex gap-4 mt-12 self-end">
              <Link
                className="btn normal-case btn-secondary"
                href="/m/create"
              >
                Write open letter
              </Link>
              <Link
                className="btn normal-case btn-outline"
                href="/explore/openletter"
              >
                See all Open letters
              </Link>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  )
}
