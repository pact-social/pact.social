import { usePactContext } from "../../context/pact";
import { markdownToHtml } from "../../lib/mdUtils";
import PactSignatures from "./pactSignatures";
import ReportButton from "./reportButton";

export default function PactBody () {
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
    </>
  )
}
