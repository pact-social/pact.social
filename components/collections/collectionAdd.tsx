import { SubmitHandler, useForm } from "react-hook-form";
import { useCeramicContext } from "../../context";
import UseCollections from "../../hooks/useCollections";
import { useViewContext } from "../viewBox";
import CollectionForm from "./collectionForm";
import type { CollectionPact, CollectionPactInput, Mutation } from "../../src/gql";
import UseMyCollectionPact from "../../hooks/useMyCollectionPact";
import { useEffect, useState } from "react";

export default function CollectionAdd({ pactID } : { pactID: string }) {
  const {composeClient, state: { did }} = useCeramicContext()
  const { isLoading: isCollectionsLoading, mutate: mutateCollections, data: collections } = UseCollections(did?.parent, true)
  const { isLoading: isAddedLoading, mutate: mutatePactCollections, data: collectionsAdded } = UseMyCollectionPact(pactID)
  const { setView } = useViewContext()
  const { handleSubmit, register } = useForm<CollectionPact>()
  
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  const onSubmit: SubmitHandler<CollectionPactInput> = async (data) => {
    setSaving(true)
    
    const alreadyAdded = collectionsAdded?.find(item => item?.node?.collectionID === data.collectionID)

    if (!alreadyAdded) {
      const { data: res, errors } = await composeClient.executeQuery<Mutation>(`
        mutation addToCollection($input: CreateCollectionPactInput!) {
          createCollectionPact(input: $input) {
            document {
              id
            }
          }
        }
      `, {
        input: {
          content: {
            ...data,
            pactID: pactID,
          }
        }
      })
      await Promise.all([mutateCollections(), mutatePactCollections()])
    }
    if (alreadyAdded && alreadyAdded.node?.deleted) {
      const { data: res, errors } = await composeClient.executeQuery<Mutation>(`
        mutation updateCollectionPact($input: UpdateCollectionPactInput!) {
          updateCollectionPact(input: $input) {
            document {
              id
            }
          }
        }
      `, {
        input: {
          id: alreadyAdded.node.id,
          content: {
            deleted: false,
          }
        }
      })
      await Promise.all([mutateCollections(), mutatePactCollections()])
    }
    setSaving(false)
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <>
      <h4 className="font-bold text-xl">Save to collection</h4>
      <div className="w-full">
        {collectionsAdded && collectionsAdded?.length > 0 &&
          <>
            <span>You saved this pact in the following collections</span>
            <ul className="list-disc">
            {collectionsAdded.map((entry, index) => 
              <li key={index}>{entry?.node?.collection?.name}</li>
            )}
            </ul>
          </>
        }
        {collections &&
        <form onSubmit={handleSubmit(onSubmit)} className="flex gap-4 mt-4">
          <select 
            className="select select-bordered w-full max-w-xs"
            {...register('collectionID', {required: true})}
          >
            {collections?.map((collection) => 
              <option key={collection?.node?.id} value={collection?.node?.id}>{collection?.node?.name}</option>
            )}
          </select>
          <button
            type="submit"
            className={`btn btn-secondary ${saving ? 'btn-disabled' : (success ? 'btn-success' : '')}`}
          >
            {saving &&
              <span className="loading loading-spinner"></span>
            }
            {success ? <>Success</> : <>Add</>}
          </button>
        </form>
        }
        {!collections &&
          <div>you don&apos;t collections yet</div>
        }
      </div>

      <div className="modal-action">
        <form method="dialog">
          <button className="btn btn-ghost">close</button>
        </form>
        <div 
          className="btn"
          onClick={() => setView(<CollectionForm />)}
        >
          new collection
        </div>
      </div>
    </>
  )
}
