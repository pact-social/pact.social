import Image from 'next/image'

export default function Hero() {
  return (
    <div className="hero min-h-fit bg-base-200 py-64">
      <div className="hero-content flex-col lg:flex-row">
        <Image
          src="https://images.unsplash.com/photo-1516589091380-5d8e87df6999?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
          className="max-w-sm rounded-lg shadow-2xl"
          alt=""
          width={800}
          height={500}
        />
        <div>
          <h1 className="text-5xl font-bold">Decentralized plaform for Impact Change!</h1>
          <p className="py-6">where crypto people take action</p>
          <button className="btn btn-secondary">Start a Manifest</button>
        </div>
      </div>
    </div>
  )
}
