import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Collection, CollectionInput, Mutation } from "../../src/gql";
import { useViewContext } from "../viewBox";
import MediaField from "../form/mediaField";
import { useCeramicContext } from "../../context";

export default function CollectionForm ({
  collection,
  onSave,
  className,
}: {
  collection?: Collection;
  onSave?: () => void;
  className?: string;
}) {
  const { previousView, setView } = useViewContext()
  const { composeClient } = useCeramicContext()

  const methods = useForm<Collection>({
    defaultValues: collection || {}
  });
  const { register, handleSubmit, formState: { errors } } = methods

  const onSubmit: SubmitHandler<CollectionInput> = async (data) => {
    const { data: res, errors } = await composeClient.executeQuery<Mutation>(`
      mutation newCollection($input: CreateCollectionInput!) {
        createCollection(input: $input) {
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
    if(onSave) onSave()
  }

  return (
    <div className={className}>
      <h3 className="text-lg font-bold">Add a collection</h3>
      <div className="divider"></div>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-row gap-3">
          <div className="formControl">
            <input 
              id="name" 
              type="text" 
              className={`input input-bordered w-full max-w-xs${errors.name && 'input-error'}`}
              placeholder="Name your collection"
              {...register('name', {required: true, minLength: 3, maxLength: 100})}
            />
            {errors.name && 
            <label className="label">
              <span className="label-text-alt ">Name is required</span>
            </label>
            }
          </div>
          
          <div className="formControl">
            <input 
              id="description" 
              type="text" 
              className={`input input-bordered w-full max-w-xs${errors.description && 'input-error'}`}
              placeholder="Description your collection"
              {...register('description', {required: false, maxLength: 500})}
            />
            {errors.name && 
              <label className="label">
                <span className="label-text-alt ">Description length must be less than 500 characters</span>
              </label>
            }
          </div>
          <MediaField />
          
          <button type="submit" className="btn btn-secondary">Save</button>

        </form>
        
        <div className="formControl flex justify-end">
          <form method="dialog">
            <button className="btn btn-ghost">close</button>
          </form>
        </div>

      </FormProvider>
    </div>
  )
}
