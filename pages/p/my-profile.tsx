import ConnectButton from "../../components/connect";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import PactsTable from "../../components/profile/pactsTable";
import { useCeramicContext } from "../../context";
import Link from "next/link";
import ViewBox from "../../components/viewBox";
import ProfileCard from "../../components/profile/card";
import SignedTable from "../../components/profile/signedTable";
import SharedTable from "../../components/profile/sharedTable";

const MyProfileContent = () => {
  const { state: { isAuthenticated } } = useCeramicContext();
  const { query } = useRouter();

  if (!isAuthenticated) {
    return <ConnectButton />
  }
  switch (query.tab) {
    case 'created':
      return <PactsTable />

    case 'signed':
      return <SignedTable />

    case 'shared':
      return <SharedTable />
  
    default:
      return <PactsTable />
  }
  
}

export default function MyProfile () {
  const { query: { tab } } = useRouter();
  const { state: { did } } = useCeramicContext()
  return (
    <Layout
      metas={{
        title: "My Profile",
        description: "",
        imageSrc: ""
      }}
      className="bg-slate-100"
    >
      <div className="w-full">
        <div className="container">
          <div className="grid grid-cols-12 grid-flow-row flex-shrink-0 gap-4 py-9">
            <ViewBox className="col-span-12 md:col-span-4 lg:col-span-3">
              <ProfileCard />
            </ViewBox>
            <div className="col-span-12 md:col-span-8 lg:col-span-9">
              <div className="tabs">
                <Link
                  className={`tab tab-lg tab-border-none tab-lifted flex-1 ${(tab === 'created' || !tab) && 'tab-active'}`}
                  href="/p/my-profile?tab=created"
                >
                  My Pacts
                </Link> 
                <Link
                  className={`tab tab-lg tab-border-none tab-lifted flex-1 ${tab === 'signed' && 'tab-active'}`}
                  href="/p/my-profile?tab=signed"
                >
                  Pacts Signed
                </Link> 
                <Link
                  className={`tab tab-lg tab-border-none tab-lifted flex-1 ${tab === 'shared' && 'tab-active'}`}
                  href="/p/my-profile?tab=shared"
                >
                  Pacts Shared
                </Link>
              </div>
              <div className="overflow-x-auto w-full bg-white rounded-xl rounded-tl-none p-6 shadow-xl">
                <MyProfileContent />
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}
