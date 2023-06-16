import Image from "next/image";
import { useRef, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { PostPublicationMetadataMedia } from "../../src/gql";

export default function MediaField () {
  const ref = useRef<HTMLInputElement>(null);
  const { register, control, setValue, formState: { errors }} = useFormContext()
  const { fields, append, update, remove, move } = useFieldArray<PostPublicationMetadataMedia>({
    control,
    name: 'media',
  });
  
  const handleFileUpload = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new window.Image();
      img.src = reader.result as string;
      img.onload = () => {
        if (img.width < 1200 || img.height < 825) {
          // alert("The image should be at least 1200x825 pixels");
        } else {
          // setImage({ file, url: reader.result as string });
        }
      };
    };

    const formData = new FormData();
    formData.append("fileInput", file);

    const res = await fetch(
      `/api/media/upload`,
      {
        method: 'POST',
        body: formData
      }
    );
    const { url: item, cid } = await res.json();
    append({ item, cid, type: file.type, cover: item })
    return { item, cid, type: file.type, cover: item }
  }

  const handleFilesUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = ref?.current?.files?.item(0)
    console.log('nb files', ref?.current?.files?.length)
    if (ref?.current?.files) {
      const promises = []
      for (const fileItem of ref?.current?.files) {
        console.log('fileItem', fileItem)
        promises.push(handleFileUpload(fileItem))
      }
      const res = await Promise.all(promises);
    }
    // if (file) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     const img = new window.Image();
    //     img.src = reader.result as string;
    //     img.onload = () => {
    //       if (img.width < 1200 || img.height < 825) {
    //         // alert("The image should be at least 1200x825 pixels");
    //       } else {
    //         // setImage({ file, url: reader.result as string });
    //       }
    //     };
    //   };

    //   const formData = new FormData();
    //   formData.append("fileInput", file);

    //   const res = await fetch(
    //     `/api/media/upload`,
    //     {
    //       method: 'POST',
    //       body: formData
    //     }
    //   );
    //   const { url, cid } = await res.json();
    //   const newMedias = [...medias, { item: url, cid }]
    //   setMedias(newMedias)
    //   setValue("medias", newMedias);
    // }
  };

  return (
    <>
      <div className="formControl">
        <label htmlFor="fileInput" className="label cursor-pointer">
          Insert an image (optional)
        </label>
        <div>
          <input 
            ref={ref} 
            id="fileInput"
            type="file"
            multiple
            onChange={handleFilesUpload} 
            className="file-input w-full max-w-xs"
          />
          <input 
            type="hidden"
            {...register('media', {required: false})}
          />
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
        {(fields as (Record<"id", string> & PostPublicationMetadataMedia)[]).map((field, index) => {
          return (
          <div key={field.id} className="card card-compact h-full bg-base-100 shadow-xl relative">
            <figure className="relative aspect-[4/3]">
              <Image
                alt='uploaded image'
                src={field.item}
                fill
                // width={200}
                // height={200}
                className="object-cover"
              />
            </figure>
            {index === 0 &&
            <div className=" bg-slate-100">
              Default image used for display and sharing
            </div>
            }
            {index > 0 && 
              <div className="btn" onClick={() => move(index, 0)}>
                Set as default
              </div>
            }
            <div className="card-body">
              <label htmlFor={`media.${index}.altTag`} className="label cursor-pointer">
                alt text: 
              </label>
              <input type="text" className="input input-bordered input-primary" {...register(`media.${index}.altTag`)} />
              <div className="card-actions justify-end">
                <button 
                  className="btn btn-circle btn-xs "
                  onClick={() => remove(index)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <input className="hidden" type="hidden" {...register(`media.${index}.item`)} />
              <input className="hidden" type="hidden" {...register(`media.${index}.cid`)} />
            </div>
          </div>
          )
        }
        )}
        </div>
      </div>
    </>
  )
}
