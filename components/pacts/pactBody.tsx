import dynamic from "next/dynamic";
import { usePactContext } from "../../context/pact";
import { markdownToHtml } from "../../lib/mdUtils";
import PactSignatures from "./pactSignatures";
import PactLatestUpdates from "./pactLatestUpdates";
import { PactPageProps } from "../../pages/m/[streamID]";


const ReportButton = dynamic(() => import('./reportButton'), {
  ssr: false,
})

export default function PactBody (props: PactPageProps) {
  const { pact } = usePactContext()

  return (
    <>
      <article className="prose">
        {pact?.content &&
          <div dangerouslySetInnerHTML={{ __html: markdownToHtml( pact?.content ) || pact?.content }}></div>
        }
      </article>
      <div className="flex justify-end">
        <ReportButton pactID={pact?.id} />
      </div>
      <section className="">
        <PactSignatures />
      </section>
      {props.posts &&
      <section className="my-8">
        <PactLatestUpdates posts={props.posts} className="grid grid-cols-1 gap-8" />
      </section>
      }
    </>
  )
}
