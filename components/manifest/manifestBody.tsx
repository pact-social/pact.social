import { useManifestContext } from "../../context/manifest";
import ManifestSignatures from "./manifestSignatures";

export default function ManifestBody () {
  const { manifest } = useManifestContext()
  
  return (
    <>
      <h1 className="text-3xl font-bold">{manifest?.title}</h1>
      <article className="prose">
        {manifest?.content &&
          <div dangerouslySetInnerHTML={{ __html: manifest?.content }}></div>
        }
      </article>
      <section>
        <ManifestSignatures />
      </section>
    </>
  )
}
