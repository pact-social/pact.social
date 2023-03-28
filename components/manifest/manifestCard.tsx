import Image from 'next/image'
import Link from 'next/link';

export default function ManifestCard({manifest}: any) {
  console.log('rendering card', manifest)
  return (
    <div className="card card-compact bg-base-100 shadow-xl max-w-lg mx-auto">
      <figure className="max-h-32">
        <Image 
          src="https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80"
          alt={manifest.title}
          height={300}
          width={600}
          layout="intrinsic"
          objectFit="cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{manifest.title}</h2>
        <p className="line-clamp-3 flex-none" dangerouslySetInnerHTML={{ __html: manifest.content }}></p>
        <div className="card-actions justify-end">
          <Link 
            href={`/m/${manifest.id}`}
            className="btn btn-primary">
            sign
          </Link>
        </div>
      </div>
    </div>
  );
}
