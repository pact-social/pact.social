import Image from 'next/image'
import Link from 'next/link';
import { Post } from '../../src/gql';
import useGetName from '../../hooks/useGetName';

export default function PostCard({post}: { post: Post }) {
  const name = useGetName(post.author, null, post.author.id)
  return (
  <Link 
    href={{
      pathname: '/m/[streamID]/updates/[postID]',
      query: {
        streamID: post.pactID,
        postID: post.id
      }
    }}
    >
    <div className="card card-compact bg-base-100 shadow-xl max-w-sm h-full">
      <div className="carousel aspect-[4/3] mb-5">
        {post.media?.map((current, index) => 
          <figure 
            key={`postcard-${index}`}
            className="relative w-full aspect-[4/3] carousel-item">
            <Image 
              src={current?.item ? current.item : 'https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80'}
              alt={post.title}
              fill
              // height={210}
              // width={280}
              className=" object-cover"
            />
          </figure>
        )}
        {post.media?.length === 0 && 
          <figure
            className="bg-gradient-radial from-[#cfffc1] to-[#d495ff]"
          />
        }
      </div>
      <div className={`card-body bg-neutral-100 justify-between`}>
        <h2 className="card-title">{post.title}</h2>
        <div className="text-sm">{post?.tags}</div>
        <div className="card-actions justify-between items-baseline">
          <div className="flex gap-3 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="text-sm">{name}</div>
          </div>
          <div className="justify-end">
            <div className="btn btn-primary">
              view
            </div>
          </div>
        </div>
      </div>
    </div>
  </Link>
  );
}
