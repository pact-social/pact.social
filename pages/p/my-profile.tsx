import ConnectButton from "../../components/connect";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import ManifestsTable from "../../components/manifest/manifestsTable";
import { useCeramicContext } from "../../context";
import Link from "next/link";

const MyProfileContent = () => {
  const { state: { isAuthenticated } } = useCeramicContext();
  if (!isAuthenticated) {
    return <ConnectButton />
  }
  return <ManifestsTable />
  
}

export default function MyProfile () {
  const { query } = useRouter();

  return (
    <Layout metas={{
      title: "My Petitions",
      description: "",
      imageSrc: ""
    }}>
      <div className="overflow-x-auto w-full">
        <div className="flex items-center mt-9">
          <h1 className="text-xl collapse-title font-bold">My Petitions</h1>
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
