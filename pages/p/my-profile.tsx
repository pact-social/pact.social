import ConnectButton from "../../components/connect";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import PactsTable from "../../components/pacts/pactsTable";
import { useCeramicContext } from "../../context";
import Link from "next/link";

const MyProfileContent = () => {
  const { state: { isAuthenticated } } = useCeramicContext();
  if (!isAuthenticated) {
    return <ConnectButton />
  }
  return <PactsTable />
  
}

export default function MyProfile () {
  const { query } = useRouter();

  return (
    <Layout metas={{
      title: "My Pacts",
      description: "",
      imageSrc: ""
    }}>
      <div className="overflow-x-auto w-full">
        <div className="flex items-center mt-9">
          <h1 className="text-xl collapse-title font-bold">My Pacts</h1>
          <Link
            href="/profile/edit"
            className="btn btn-outline"
          >
            Edit
          </Link>
        </div>
        <div className="divider"></div>
        <MyProfileContent />
      </div>
    </Layout>
  )
}
