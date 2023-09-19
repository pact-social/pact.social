import { usePactContext } from "../../context/pact";
import { markdownToHtml } from "../../lib/mdUtils";
import PactSignatures from "./pactSignatures";
import ReportButton from "./reportButton";

export default function PactBody () {
  const { pact } = usePactContext()

  return (
    <>
      <h1 className="text-3xl font-bold">{pact?.title}</h1>
      <article className="prose">
        {pact?.content &&
          <div dangerouslySetInnerHTML={{ __html: markdownToHtml( pact?.content ) || pact?.content }}></div>
        }
      </article>
      <div className="flex justify-end">
        <ReportButton pactID={pact?.id} />
      </div>
      <section>
        <PactSignatures />
      </section>
    </>
  )
}
