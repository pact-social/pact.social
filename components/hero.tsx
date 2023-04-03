import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <>
      <div className="hero min-h-fit bg-base-200 py-32 font-title">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src="https://images.unsplash.com/photo-1516589091380-5d8e87df6999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
            className="max-w-sm rounded-lg shadow-2xl"
            alt=""
            width={800}
            height={500}
          />
          <div className="">
            <h1 className="text-5xl font-bold">where free voices act!</h1>
            <p className="py-3 text-5xl font-medium">stand up and<br/>manifest</p>
          </div>
            <Link
              href={'/m/create'}
            >
                <button className="btn btn-secondary">Start a Manifest</button>
            </Link>
        </div>
      </div>
      <div className="flex place-content-center -mt-14">
        <div className="stats shadow">
          <div className="stat">
            {/* <div className="stat-title">Total Page Views</div> */}
            <div className="stat-value text-primary font-normal font-alt">312,400</div>
            <div className="stat-desc text-center">people making change</div>
          </div>
        </div>
      </div>
    </>
  )
}
