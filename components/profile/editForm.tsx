import { SubmitHandler, useForm } from "react-hook-form";
import { PactProfile } from "../../src/gql";
import createProfile from "../../lib/updateProfile";
import { useCeramicContext } from "../../context";
import ConnectButton from "../connect";
import { useViewContext } from "../viewBox";

export default function ProfilEditForm({ 
  profile
}: {
  profile?: PactProfile
}) {
  const { ceramic } = useCeramicContext();
  const { previousView } = useViewContext()
  const { register, handleSubmit, watch, setValue, getValues, formState: { errors }, reset } = useForm<PactProfile>({
    defaultValues: profile || {}
  });

  const onSubmit: SubmitHandler<PactProfile> = async (data) => {
    try {
      await createProfile(data, ceramic);
      previousView()
    } catch (error) {
      console.log('error', error)
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-row gap-2 w-full px-4">
      
      <div className="formControl">
        <label htmlFor="username" className="label cursor-pointer">
          <span className="label-text">username</span>
          <span className="label-text-alt">required</span>
        </label>
          <input 
            id="username" 
            type="text" 
            className={`input input-bordered w-full max-w-xs${errors.username && 'input-error'}`}
            placeholder="your username"
            {...register('username', {
              required: true, 
              minLength: 5, 
              maxLength: 120,
              pattern: {
                value: /^\S*$/,
                message: "username cannot contains white spacing"
              },
            })}
          />
          {errors.username && 
          <label className="label">
            <span className="label-text-alt ">{errors.username.message || 'username is required'}</span>
          </label>
          }
      </div>
      
      <div className="formControl">
        <label htmlFor="name" className="label cursor-pointer">
          <span className="label-text">name</span>
        </label>
        <input 
          id="name" 
          type="text" 
          className={`input input-bordered w-full max-w-xs${errors.name && 'input-error'}`}
          placeholder="your name"
          {...register('name', {required: false, minLength: 5, maxLength: 120})}
        />
        {errors.name && 
          <label className="label">
            <span className="label-text-alt ">name is required</span>
          </label>
        }
      </div>

      <div className="formControl">
        <label htmlFor="bio" className="label cursor-pointer">
          <span className="label-text">bio</span>
        </label>
        <textarea 
          id="bio" 
          className={`textarea textarea-bordered w-full max-w-xs${errors.bio && 'input-error'}`}
          placeholder="your bio"
          {...register('bio', {required: false, minLength: 5, maxLength: 120})}
        />
        {errors.bio && 
          <label className="label">
            <span className="label-text-alt ">bio is required</span>
          </label>
        }
      </div>
      
      <div className="formControl">
        <label htmlFor="title" className="label cursor-pointer">
          <span className="label-text">your title</span>
        </label>
        <input 
          id="title" 
          type="text" 
          className={`input input-bordered w-full max-w-xs${errors.title && 'input-error'}`}
          placeholder="your title"
          {...register('title', {required: false, minLength: 3, maxLength: 120})}
        />
        {errors.title && 
          <label className="label">
            <span className="label-text-alt ">title is required</span>
          </label>
        }
      </div>

      <div className="formControl">
        <label htmlFor="organisation" className="label cursor-pointer">
          <span className="label-text">organisation</span>
        </label>
        <input 
          id="organisation" 
          type="text" 
          className={`input input-bordered w-full max-w-xs${errors.organisation && 'input-error'}`}
          placeholder="your organisation"
          {...register('organisation', {required: false, minLength: 3, maxLength: 120})}
        />
        {errors.organisation && 
          <label className="label">
            <span className="label-text-alt ">organisation is required</span>
          </label>
        }
      </div>

      <div className="formControl">
        <label htmlFor="country" className="label cursor-pointer">
          <span className="label-text">country</span>
        </label>
        <input 
          id="country" 
          type="text" 
          className={`input input-bordered w-full max-w-xs${errors.country && 'input-error'}`}
          placeholder="your country"
          {...register('country', {required: false, minLength: 5, maxLength: 120})}
        />
        {errors.country && 
          <label className="label">
            <span className="label-text-alt ">country is required</span>
          </label>
        }
      </div>
      
      <div className="formControl">
        <label htmlFor="city" className="label cursor-pointer">
          <span className="label-text">city</span>
        </label>
        <input 
          id="city" 
          type="text" 
          className={`input input-bordered w-full max-w-xs${errors.city && 'input-error'}`}
          placeholder="your city"
          {...register('city', {required: false, minLength: 5, maxLength: 120})}
        />
        {errors.city && 
          <label className="label">
            <span className="label-text-alt ">country is required</span>
          </label>
        }
      </div>
      <div className="divider"></div>
      <div className="formControl flex justify-between">
        <ConnectButton el={
          <>
            <button className="btn btn-outline" onClick={() => previousView()}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit</button>
          </>
        } />
      </div>
    </form>
  )
}
