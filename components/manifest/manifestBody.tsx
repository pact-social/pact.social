import { useManifestContext } from "../../context/manifest";

export default function ManifestBody () {
  const { manifest } = useManifestContext()
  
  return (
    <article className="prose">
      {manifest?.content &&
        <div dangerouslySetInnerHTML={{ __html: manifest?.content }}></div>
      }
    </article>
  )
}
