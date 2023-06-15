import Link from "next/link";

export default function ExplorerHeader ({ type } : { type: string }) {
  return (
    <>
      <div className="hero bg-gradient-to-t from-[#F3e0ff] to-[#f1faf0] h-48">
        <div className="hero-content text-center">
          <h1 className=" text-4xl font-title font-bold">Find your {type}</h1>
        </div>
      </div>
      <div className="flex pb-10 -mt-4 items-center justify-center">

        <ul className="menu menu-vertical lg:menu-horizontal bg-base-100 rounded-box shadow-xl">
          <li>
            <Link
              className={`${type === 'petition' ? 'active' : ''}`}
              href="/explore/petition"
            >
              petition
            </Link>
          </li>
          <li>
            <Link
              className={`${type === 'manifesto' ? 'active' : ''}`}
              href="/explore/manifesto"
            >
              manifesto
            </Link>
          </li>
          <li>
            <Link
              className={`${type === 'openletter' ? 'active' : ''}`}
              href="/explore/openletter"
            >
              open letter
            </Link>
          </li>
          <li>
            <Link
              className={`${type === 'all' ? 'active' : ''}`}
              href="/explore/all"
            >
              all
            </Link>
          </li>
        </ul>
      </div>
    </>
  )
}
