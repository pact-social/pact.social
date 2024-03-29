import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useCeramicContext } from "../../context";
import { usePactContext } from "../../context/pact";
import { Mutation, PostConnection, PostInput } from "../../src/gql";
import { useRouter } from "next/router";
import Link from "next/link";
import MetadataFields from "../form/metadataFields";
import PostCard from "../post/postCard";
import dynamic from "next/dynamic";
import { htmlToMarkdown } from "../../lib/mdUtils";
import SubmitButton from "../form/submitButton";

const MarkdownField = dynamic(() => import('../../components/form/markdownField'), {
  ssr: false,
})

export const PactUpdateForm = ({defaultValues}: {defaultValues?: any}) => {
  const { push } = useRouter()
  const methods = useForm<PostInput>({
    defaultValues: {
      ...defaultValues,
      // type: PactType.petition,
      title: ''
    }
  });
  const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = methods
  const { composeClient } = useCeramicContext()
  
  const onSubmit: SubmitHandler<PostInput> = async (data) => {
    data.createdAt = data.createdAt || (new Date()).toISOString()
    data.content = htmlToMarkdown(data?.content as string)
    
    try {
      for (const prop in data) {
        // @ts-ignore
        if (data[prop] === '' || data[prop] === 'none') delete data[prop]
      }
      const { data: res, errors } = await composeClient.executeQuery<Mutation>(`
      mutation newPost($input: CreatePostInput!) {
        createPost(input: $input) {
          document {
            id
          }
        }
      }
      `, {
        input: {
          content: {
            ...data,
          }
        }
      })

      if (!errors) {
        return push({
          pathname: `/m/[streamID]/updates/[postID]`,
          query: {
            streamID: data.pactID,
            postID: res?.createPost?.document.id
          }
        })
      }
    } catch (error) {
      console.log('error', error)
    }
  };
  return (
    <FormProvider {...methods} >
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-row gap-12">
        <div className=" max-w-fit">
          <h1 className="text-3xl font-bold">New Post</h1>
          <div className="divider"></div>
          
          <input className="hidden" type="hidden" {...register('pactID')} />

          <div className="form-control">
            <label htmlFor="title" className="label cursor-pointer">
              Choose the title of your post: 
            </label>
              <input 
                id="title" 
                type="text" 
                className={`input input-bordered w-full max-w-xs${errors.title && 'input-error'}`}
                placeholder="Name your post"
                {...register('title', {required: true, maxLength: 120})}
              />
            {errors.title && 
            <label className="label">

              <span className="label-text-alt ">Title is required</span>
            </label>
            }
          </div>
          
          <div className="form-control">
            <label htmlFor="description" className="label cursor-pointer">
              Choose the description of your post: 
            </label>
              <input 
                id="description" 
                type="text" 
                className={`input input-bordered w-full max-w-xs${errors.description && 'input-error'}`}
                placeholder="Description your post"
                {...register('description', {required: false, maxLength: 500})}
              />
            {errors.description && 
            <label className="label">

              <span className="label-text-alt ">Description is required</span>
            </label>
            }
          </div>
          
          <MarkdownField label="Your post content:" field="content" />

          <MetadataFields />

          <div className="formControl flex justify-center">
            <SubmitButton name="Publish Live" className="btn-secondary" />
            <button 
              type="button"
              className="btn btn-secondary"
              // onClick={() => SaveDraft()}
            >
              Save Draft
            </button>
        </div>
        </div>
      </form>
    </FormProvider>
  )
}

export default function PactUpdates({
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
      <div className={className || "grid grid-cols-2 gap-8"}>
        {posts.edges?.map((edge, index) => 
          <div key={`post-${edge?.node?.id || index}`}>
          {edge?.node &&
            <PostCard post={edge.node} />
          }
          </div>
        )}
      </div>
      {posts.edges?.length === 0 &&
        <div className="hero bg-base-200 mb-12">
          <div className="hero-content text-center grid">
            <div className="max-w-md">
                <p className="py-6">This pact has no updates yet.</p>
            </div>
          </div>
        </div>
      }
      {(pact?.author.id === ceramic.did?.parent && create) &&
        <PactUpdateForm defaultValues={{pactID: pact?.id}}></PactUpdateForm>
      }
      {(pact?.author.id === ceramic.did?.parent && !create) &&
        <Link
          className="btn"
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
    </>
  )
}
