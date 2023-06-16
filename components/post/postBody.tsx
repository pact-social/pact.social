import Image from 'next/image'
import { Post } from "../../src/gql";

export default function PostBody ({ post }: { post: Post }) {
  return (
    <div>
      <h2 className="text-3xl font-bold">{post.title}</h2>
      <p>{post.description}</p>
      <div className="carousel aspect-[4/3] mb-5">
        {post.media?.map((current, index) => 
          <figure 
            key={index}
            className="relative aspect-[4/3] carousel-item"
          >
            <Image 
              src={current?.item ? `${current.item}` : 'https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80'}
              alt={current?.altTag || ''}
              // width={400}
              // height={300}
              fill
              className="object-contain"
            />
          </figure>
        )}
      </div>
      <article className="prose">
        {post?.content &&
          <div dangerouslySetInnerHTML={{ __html: post?.content }}></div>
        }
      </article>
    </div>
  )
}
