import ConnectButton from "../../components/connect";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import ManifestsTable from "../../components/manifest/manifestsTable";
import { useCeramicContext } from "../../context";

const MyPetitionsContent = () => {
  const { state: { isAuthenticated } } = useCeramicContext();
  if (!isAuthenticated) {
    return <ConnectButton />
  }
  return <ManifestsTable />
  
}

export default function MyPetitions () {
  const { query } = useRouter();

  return (
    <Layout metas={{
      title: "My Petitions",
      description: "",
      imageSrc: ""
    }}>
      <div className="overflow-x-auto w-full">
        <h1 className="text-xl collapse-title font-bold">My Petitions</h1>
        <div className="divider"></div>
        <MyPetitionsContent />
      </div>
    </Layout>
  )
}
