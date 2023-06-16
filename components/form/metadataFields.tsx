import { UseFormRegister, useFormContext } from "react-hook-form";
import { PostInput, PostPublicationContentWarning, PostPublicationMainFocus } from "../../src/gql";
import { RFC5646_LANGUAGE_TAGS } from "../../lib/constants/locales";
import MediaField from "./mediaField";

export default function MetadataFields ({ defaultValues }: { defaultValues?: PostInput}) {
  const { register, formState: { errors }} = useFormContext()

  return (
    <>
    <MediaField />
    <div className="form-control">
      <label htmlFor="sourceUrl" className="label cursor-pointer">
        sourceUrl: 
      </label>
        <input 
          id="sourceUrl" 
          type="text" 
          className={`input input-bordered input-primary w-full max-w-xs${errors.sourceUrl && 'input-error'}`}
          placeholder="https://..."
          {...register('sourceUrl', {required: false, maxLength: 500})}
        />
      {errors.sourceUrl && 
      <label className="label">

        <span className="label-text-alt ">Description is required</span>
      </label>
      }
    </div>

    <div className="form-control">
      <label htmlFor="locale" className="label cursor-pointer ">
        locale:
      </label>
      <select 
        className="select select-primary w-full max-w-xs"  
        placeholder="placeholder"
        multiple={false}
        defaultValue={defaultValues?.locale || 'en'}
        {...register('locale', {required: true})}
      >
        {Object.entries(RFC5646_LANGUAGE_TAGS).map(([key, value], index) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>
    </div>
    
    <div className="form-control">
      <label htmlFor="context" className="label cursor-pointer">
        context: 
      </label>
        <input 
          id="context" 
          type="text" 
          className={`input input-bordered input-primary w-full max-w-xs${errors.context && 'input-error'}`}
          placeholder="https://..."
          {...register('context', {required: false, maxLength: 500})}
        />
      {errors.context && 
      <label className="label">

        <span className="label-text-alt ">Description is required</span>
      </label>
      }
    </div>
    
    <div className="form-control">
      <label htmlFor="contentWarning" className="label cursor-pointer">
        Content Warning: 
      </label>
        <select 
          className="select select-primary w-full max-w-xs"  
          placeholder="placeholder"
          multiple={false}
          defaultValue={defaultValues?.contentWarning || 'en'}
          {...register('contentWarning', {required: false})}
        >
          <option>
            none
          </option>
          {Object.entries(PostPublicationContentWarning).map(([key, value], index) => (
            <option key={value} value={value}>
              {key}
            </option>
          ))}
        </select>
      {errors.contentWarning && 
      <label className="label">

        <span className="label-text-alt ">contentWarning is required</span>
      </label>
      }
    </div>
    
    <div className="form-control">
      <label htmlFor="mainContentFocus" className="label cursor-pointer">
        Content Focus: 
      </label>
        <select 
          className="select select-primary w-full max-w-xs"  
          placeholder="placeholder"
          multiple={false}
          defaultValue={defaultValues?.mainContentFocus || 'en'}
          {...register('mainContentFocus', {required: false})}
        >
          <option>
            none
          </option>
          {Object.entries(PostPublicationMainFocus).map(([key, value], index) => (
            <option key={value} value={value}>
              {key}
            </option>
          ))}
        </select>
      {errors.mainContentFocus && 
      <label className="label">

        <span className="label-text-alt ">mainContentFocus is required</span>
      </label>
      }
    </div>

    <div className="form-control">
      <label htmlFor="external_url" className="label cursor-pointer">
        external_url: 
      </label>
        <input 
          id="external_url" 
          type="text" 
          className={`input input-bordered input-primary w-full max-w-xs${errors.external_url && 'input-error'}`}
          placeholder="https://..."
          {...register('external_url', {required: false, maxLength: 500})}
        />
      {errors.external_url && 
      <label className="label">

        <span className="label-text-alt ">Description is required</span>
      </label>
      }
    </div>
    
    <div className="form-control">
      <label htmlFor="animation_url" className="label cursor-pointer">
        animation_url: 
      </label>
        <input 
          id="animation_url" 
          type="text" 
          className={`input input-bordered input-primary w-full max-w-xs${errors.animation_url && 'input-error'}`}
          placeholder="https://..."
          {...register('animation_url', {required: false, maxLength: 500})}
        />
      {errors.animation_url && 
      <label className="label">

        <span className="label-text-alt ">Description is required</span>
      </label>
      }
    </div>
    
    <div className="form-control">
      <label htmlFor="imageMimeType" className="label cursor-pointer">
        imageMimeType: 
      </label>
        <input 
          id="imageMimeType" 
          type="text" 
          className={`input input-bordered input-primary w-full max-w-xs${errors.imageMimeType && 'input-error'}`}
          placeholder="https://..."
          {...register('imageMimeType', {required: false, maxLength: 500})}
        />
      {errors.imageMimeType && 
      <label className="label">

        <span className="label-text-alt ">Description is required</span>
      </label>
      }
    </div>
    
    <div className="form-control">
      <label htmlFor="image" className="label cursor-pointer">
        image: 
      </label>
        <input 
          id="image" 
          type="text" 
          className={`input input-bordered input-primary w-full max-w-xs${errors.image && 'input-error'}`}
          placeholder="https://..."
          {...register('image', {required: false, maxLength: 500})}
        />
      {errors.image && 
      <label className="label">

        <span className="label-text-alt ">Description is required</span>
      </label>
      }
    </div>
    </>
  )
}
