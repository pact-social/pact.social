import { usePactContext } from "../../context/pact";
import PactSignatures from "./pactSignatures";

export default function PactBody () {
  const { pact } = usePactContext()
  
  return (
    <>
      <h1 className="text-3xl font-bold">{pact?.title}</h1>
      <article className="prose">
        {pact?.content &&
          <div dangerouslySetInnerHTML={{ __html: pact?.content }}></div>
        }
      </article>
      <section>
        <PactSignatures />
      </section>
    </>
  )
}
