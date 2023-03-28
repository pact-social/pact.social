import Link from 'next/link'

export default function ManifestProfile() {
  return (
    <>
    <div>
      <div className="pb-3">
        <h4 className="font-semibold">Petition starter</h4>
      </div>
      
      <div className="flex flex-row gap-3">

        <div className="avatar">
          <div className="w-12 h-fit rounded">
            <img src="https://images.unsplash.com/photo-1585066699728-a56ef32a992b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80" alt="Tailwind-CSS-Avatar-component" />
          </div>
        </div>
        <div>
          <h5 className=" font-extralight">Name</h5>
          <p className=" text-xs">Profile</p>
        </div>
      </div>
    </div>

    <div className="flex flex-col gap-3">  
      <div className="">
        <h4 className="font-semibold">Recipient(s)</h4>
      </div>

      <div className="flex flex-row gap-3">

        <div className="avatar">
          <div className="w-12 h-fit rounded">
            <img src="https://images.unsplash.com/photo-1585066699728-a56ef32a992b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80" alt="Tailwind-CSS-Avatar-component" />
          </div>
        </div>
        <div>
          <div>
            <h5 className=" font-extralight">Name</h5>
            <p className=" text-xs">Profile</p>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-3">

        <div className="avatar">
          <div className="w-12 h-fit rounded">
            <img src="https://images.unsplash.com/photo-1585066699728-a56ef32a992b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80" alt="Tailwind-CSS-Avatar-component" />
          </div>
        </div>
        <div>
          <div>
            <h5 className=" font-extralight">Name</h5>
            <p className=" text-xs">Profile</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-row gap-3">

        <div className="avatar">
          <div className="w-12 h-fit rounded">
            <img src="https://images.unsplash.com/photo-1585066699728-a56ef32a992b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1635&q=80" alt="Tailwind-CSS-Avatar-component" />
          </div>
        </div>
        <div>
          <div>
            <h5 className=" font-extralight">Name</h5>
            <p className=" text-xs">Profile</p>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-400">Created March 2nd 2023</p>
      <p className="text-xs text-gray-400 italic">Report a policy violation</p>

      <div className="card w-54 bg-base-200 shadow-xl card-compact -mx-5 mt-5">
        
        <div className="card-body flex-col text-center items-center max-w-[14rem]">
          <div>
            <h2 className="card-title text-base text-center">Start your own petition!</h2>
            <p>This petition starter took action. Will you ?</p>
          </div>
          <div className="card-actions pt-3">
          <Link
            href={'/m/create'}
          >
            <button className="btn btn-primary btn-outline">Start a petition</button>
          </Link>
          </div>
        </div>
      </div>

    </div>
    </>

  )
}
