import Link from "next/link";
import Divider from "./svg/divider";

export default function SpeakCTA () {
  return (
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
  )
}
