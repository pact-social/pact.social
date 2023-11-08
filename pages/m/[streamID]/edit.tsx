import { useRouter } from "next/router";
import { PactProvider, usePactContext } from "../../../context/pact";
import PactForm from "../create";
import { useEffect } from "react";
import Layout from "../../../components/layout";

function PactEdit() {
  const { push } = useRouter()
  const { pact, isLoading } = usePactContext()
  useEffect(() => {
    if (pact && !pact?.author.isViewer) {
      push(`/m/${pact.id}`)
    }
  }, [pact])
  
  
  if (isLoading || !pact?.author.isViewer) {
    return (
      <Layout>
      <div className="flex items-center justify-center h-full">
        <div className="flex gap-3 items-center">
          <span className="loading loading-ring loading-lg"></span>
          <span>Loading</span>
        </div>
      </div>
      </Layout>
    )
  }

  return (
    <>
      {(pact.author.isViewer) && 
        <PactForm defaultValues={pact} pactID={pact.id} isLive></PactForm>
      }
    </>
  )
}

export default function EditPact () {
  const router = useRouter()
  const streamID = router.query.streamID as string;
  return (
    <PactProvider pactId={streamID}>
      <PactEdit></PactEdit>
    </PactProvider>
  )
}
