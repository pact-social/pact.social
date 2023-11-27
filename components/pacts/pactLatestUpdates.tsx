import Link from "next/link"
import { useCeramicContext } from "../../context"
import { usePactContext } from "../../context/pact"
import { useRouter } from "next/router";
import { PostConnection } from "../../src/gql";
import PostUpdate from "../post/postUpdate";

export default function PactLatestUpdates ({ 
  posts,
  className,
}: { 
  posts: PostConnection;
  className?: string;
}) {
  const { query } = useRouter()
  const create = query.create as string;
  
  const { pact } = usePactContext()
  const { ceramic } = useCeramicContext()
  
  return (
    <>
      <div className={className || "grid grid-cols-1 gap-8"}>
        <h3 className="text-5xl font-bold font-title">Lastest updates</h3>
        {posts.edges?.map((edge, index) => 
          <div key={`post-${edge?.node?.id || index}`}>
          {edge?.node &&
            <PostUpdate post={edge.node} />
          }
          </div>
        )}
      </div>
      {posts.edges?.length === 0 &&
        <div className="hero bg-base-200 my-12">
          <div className="hero-content text-center grid">
            <div className="max-w-md">
                <p className="py-6">This pact has no updates yet.</p>
            </div>
          </div>
        </div>
      }
      <div className="flex justify-end gap-4">
      {(pact?.author.id === ceramic.did?.parent && !create) &&
        <Link
          className="btn mt-8 btn-success"
          href={{
            pathname: '/m/[streamID]/updates/new',
            query: {
              streamID: pact?.id
            }
          }}
        >
          Post a new update
        </Link>
      }
      {posts.edges && posts.edges.length > 0 &&
      <Link
        className="btn mt-8"
        href={{
          pathname: '/m/[streamID]/updates',
          query: {
            streamID: pact?.id
          }
        }}
      >
        View more
      </Link>
      }
      </div>
    </>
  )
}
