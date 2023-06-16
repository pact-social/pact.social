import Image from 'next/image';
export default function Roadmap () {
  return (
    <section className="max-w-full">
      <div className="flex flex-col items-center px-12 py-24 md:p-24">
        <h3 className="font-title text-5xl font-bold lowercase">roadmap</h3>
      </div>

      <div className="container mx-auto w-full h-full">
        <div className="relative wrap overflow-hidden m-10 h-full">
          <div className=" border-4 -ml-[4px] rounded absolute border-opacity-20 border-gray-700 h-full left-1/2"></div>
          {/* <!-- right timeline --> */}
          <div className="mb-8 flex justify-between items-center w-full right-timeline">
            <div className="order-1 w-5/12"></div>
            <div className="z-0 flex items-center order-1 bg-secondary shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
            </div>
            <div className="order-1 w-5/12">
              <Image 
                src="/timeline/step1.png"
                width={400}
                height={400}
                alt=""
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>

          {/* <!-- left timeline --> */}
          <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
            <div className="order-1 w-5/12"></div>
            <div className="z-0 flex items-center order-1 bg-secondary shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
            </div>
            <div className="order-1 w-5/12 flex justify-end">
              <Image 
                src="/timeline/step2.png"
                width={400}
                height={400}
                alt=""
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
          
          {/* <!-- right timeline --> */}
          <div className="mb-8 flex justify-between items-center w-full right-timeline">
            <div className="order-1 w-5/12"></div>
            <div className="z-0 flex items-center order-1 bg-secondary shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
            </div>
            <div className="order-1 w-5/12">
              <Image 
                src="/timeline/step3.png"
                width={400}
                height={400}
                alt=""
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>

          {/* <!-- left timeline --> */}
          <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
            <div className="order-1 w-5/12"></div>
            <div className="z-0 flex items-center order-1 bg-secondary shadow-xl w-8 h-8 rounded-full">
              <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
            </div>
            <div className="order-1 w-5/12 flex justify-end">
              <Image 
                src="/timeline/step4.png"
                width={300}
                height={300}
                alt=""
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
