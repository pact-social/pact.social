import Image from 'next/image'
import Link from 'next/link'
import useGetName from "../../hooks/useGetName"
import { Post } from "../../src/gql"
import DefaultImage from '../pacts/defaultImage'
import dayjs from 'dayjs'

export default function PostUpdate({post}: { post: Post }) {
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
    <div className="card card-compact card-side bg-base-100 shadow-xl h-full w-full">
      <div className="carousel aspect-[1/1]">
        {post.media?.map((current, index) => 
          <figure 
            key={`postcard-${index}`}
            className="relative w-full aspect-[1/1] carousel-item">
            <Image 
              src={current?.item ? current.item : 'https://images.unsplash.com/photo-1573481078804-70c9d3406cff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2333&q=80'}
              alt={post.title}
              fill
              height={280}
              width={280}
              className=" object-cover"
            />
          </figure>
        )}
        {post.media?.length === 0 && 
          <figure 
            className="relative w-full h-full aspect-[1/1] carousel-item">
            <DefaultImage height={40} />
          </figure>
        }
      </div>
      <div className={`card-body bg-neutral-100 justify-between flex-col md:flex-row content-between`}>
        <div>
          <h2 className="card-title">{post.title}</h2>
          <div className="text-sm">{post?.description}</div>
          <div className="flex gap-3 items-center">
            <div className="text-xs">{dayjs(post.createdAt).format('LL')}</div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <div className="text-xs">{name}</div>
          {post?.tags && <div className="text-xs">{post?.tags}</div>}
          </div>
        </div>
        <div className="card-actions items-end justify-end">
          <div className="btn btn-ghost btn-xs">
            view
          </div>
        </div>
      </div>
    </div>
  </Link>
  )
}
