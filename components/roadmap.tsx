import Image from 'next/image';

export default function Roadmap () {
  return (
    <section className="max-w-full">
      <div className="flex flex-col items-center px-12 py-24 md:p-24">
        <h3 className="font-title text-5xl font-bold lowercase">roadmap</h3>
      </div>

      <div className="container mx-auto w-full h-full">

        <div className="relative wrap  m-10 h-full min-h-[8rem]">
          <div className=" border-4 -ml-[4px] rounded absolute border-opacity-20 border-gray-700 h-full left-1/2 -top-5"></div>
          {/* <!-- right timeline --> */}
          <div className="mb-8 flex justify-between items-center w-full">
            <div className="flex order-1 w-5/12 justify-end">
              <div className="rounded-3xl border-2 border-base-content shadow-xl px-6 py-4">pact.social launch</div>
            </div>
            <div className="z-0 flex items-center order-1 bg-secondary shadow-xl w-8 h-8 rounded-3xl">
              <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
            </div>
            <div className="flex order-1 w-5/12">
              <div className="rounded-3xl border-2 border-base-content shadow-xl px-6 py-4">pact.social manifesto</div>
            </div>
          </div>

          {/* <!-- left timeline --> */}
          <div className="mb-8 flex justify-between items-center w-full min-h-[8rem]">
            <div className="flex order-1 w-5/12 justify-end">
              <div className="rounded-3xl border-2 border-base-content shadow-xl px-6 py-4">tokenomics white paper</div>
            </div>
            <div className="z-0 flex items-center order-1 bg-secondary shadow-xl w-8 h-8 rounded-3xl">
              <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
            </div>
            <div className="order-1 w-5/12 flex">
              <div className="rounded-3xl border-2 border-base-content shadow-xl px-6 py-4">NFT collection & tokens public sale</div>
            </div>
              
          </div>
          
          {/* <!-- right timeline --> */}
          <div className="mb-8 flex justify-between items-center w-full min-h-[8rem]">
            <div className="flex order-1 w-5/12 justify-end flex-col gap-4">
              <div className="flex justify-end">
                <div className="rounded-3xl border-2 border-base-content shadow-xl px-6 py-4">Pact NFTs</div>
              </div>
              <div className="flex justify-end">
                <div className="rounded-3xl border-2 border-base-content shadow-xl px-6 py-4">Lobbyist Impact evaluators rewards</div>
              </div>
            </div>
            <div className="z-0 flex items-center order-1 bg-secondary shadow-xl w-8 h-8 rounded-3xl">
              <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
            </div>
            <div className="order-1 w-5/12 flex flex-col gap-4">
              <div className="flex">
                <div className="rounded-3xl border-2 border-base-content shadow-xl px-6 py-4">Pact sponsoring</div>
              </div>
              <div className="flex">
                <div className="rounded-3xl border-2 border-base-content shadow-xl px-6 py-4">DAO launch</div>
              </div>
            </div>
          </div>

          {/* <!-- left timeline --> */}
          <div className="mb-8 flex justify-between items-center w-full min-h-[8rem]">
            <div className="flex order-1 w-5/12 justify-end">
              <div className="rounded-3xl border-2 border-base-content shadow-xl px-6 py-4">Community Growth</div>
            </div>
            <div className="z-0 flex items-center order-1 bg-secondary shadow-xl w-8 h-8 rounded-3xl">
              <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
            </div>
            <div className="order-1 w-5/12 flex">
              <div className="rounded-3xl border-2 border-base-content shadow-xl px-6 py-4">Operational team growth</div>
            </div>
          </div>
          
          <div className="mb-8 flex justify-between items-center w-full min-h-[8rem]">
            <div className="flex order-1 w-5/12 justify-end">
              <div className="rounded-3xl border-2 border-base-content shadow-xl px-6 py-4">Email/SMS login with lit PKP</div>
            </div>
            <div className="z-0 flex items-center order-1 bg-secondary shadow-xl w-8 h-8 rounded-3xl">
              <h1 className="mx-auto text-white font-semibold text-lg">5</h1>
            </div>
            <div className="order-1 w-5/12 flex">
              {/* <div className="rounded-3xl border-2 border-base-content shadow-xl px-6 py-4">Operational team growth</div> */}
            </div>
          </div>
          
          <div className="mb-8 flex justify-between items-center w-full min-h-[8rem]">
            <div className="flex order-1 w-5/12 justify-end">
              <div className="rounded-3xl border-2 border-base-content shadow-xl px-6 py-4">pact.social SDK and components</div>
            </div>
            <div className="z-0 flex items-center order-1 bg-secondary shadow-xl w-8 h-8 rounded-3xl">
              <h1 className="mx-auto text-white font-semibold text-lg">6</h1>
            </div>
            <div className="order-1 w-5/12 flex">
              <div className="rounded-3xl border-2 border-base-content shadow-xl px-6 py-4">Custom impact evaluators and token rewards</div>
            </div>
          </div>


        </div>
      </div>

    </section>
  )
}
