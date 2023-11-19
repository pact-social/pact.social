import { useEffect, useState } from "react";
import Layout from "../../../components/layout";
import PactHero from "../../../components/pacts/pactHero";
import { DraftPactProvider } from "../../../context/pact";
import { useProfileContext } from "../../../context/profile";
import { useRouter } from "next/router";
import { Pact, PactInput } from "../../../src/gql";
import PactBody from "../../../components/pacts/pactBody";
import SignBox from "../../../components/signBox";
import SignStats from "../../../components/sign/stats";
import PactForm from "../../m/create";
import Link from "next/link";
import useMutatePact from "../../../hooks/useMutatePact";

export default function DraftPactPreview({}) {
  const router = useRouter();

  const pactID  = router.query.pactID as string;
  const edit = router.query.edit as string;
  const { drafts, isLoading } = useProfileContext();
  const [pact, setPact] = useState<Pact>();
  const { publish } = useMutatePact()
  
  useEffect(() => {
    if (drafts) {
      const doc = drafts.find((value) => value.id === pactID)
      if (doc) {
        setPact(doc)
      }
    }
  }, [drafts])

  
  const publishDraft = async () => {
    if (pact) {
      await publish({
        ...pact,
        content: pact?.content as string,
      }, pact.id)
    }
  }

  return (
    <Layout
      // noContainer
      metas={{
      title: pact?.title || 'pact.social',
      description: 'decentralized petition and manifest for change and impact',
      imageSrc: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/og/${pactID}`
      }}
    >
      {(isLoading || !router.isReady) && <>Loading</>}
      {(!isLoading && !pact) && <>Error</>}
      {(edit && pact)&&
        <PactForm defaultValues={pact} pactID={pact.id}/>
      }
      {(pact && !edit) && 
        <DraftPactProvider
          pact={pact}
        >
          <PactHero draft>
            <div>
              <div className="badge badge-warning">Draft</div>
            </div>
            <div className="flex join">
              <Link 
                className=" btn btn-primary join-item"
                href={{
                  pathname: '/p/drafts/[pactID]',
                  query: { pactID: pact.id, edit: 'draft' },
                }}
              >
                Edit
              </Link>
              <button 
                className=" btn btn-secondary join-item"
                onClick={() => publishDraft()}
              >
                Publish
              </button>
            </div>
          </PactHero>
          
          <div className=" flex items-start justify-center gap-4 lg:gap-8">
            <div className="flex-1 md:max-w-lg lg:max-w-2xl xl:max-w-3xl my-16 px-7">
              <PactBody />
            </div>

            <div className="hidden md:block right-0 top-28 w-80 lg:w-80 md:sticky">
              <div className="flex justify-end my-16 ">
                <SignBox className="stats shadow-xl stats-vertical w-full min-h-[18rem]">
                  <SignStats disabled={true} />  
                </SignBox>
              </div>
            </div>
          </div>
        </DraftPactProvider>
      }
    </Layout>
  )
}
