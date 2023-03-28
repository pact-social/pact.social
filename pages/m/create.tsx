import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import dynamic from 'next/dynamic'
import Layout from "../../components/layout";
//import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useTopics from "../../hooks/useTopics";
import { useCeramicContext } from "../../context";
import { useRouter } from "next/router";
import { Mutation, Manifest } from "../../src/gql";
import TopicSelect from "../../components/form/topicSelect";
//import "react-quill/dist/quill.bubble.css";
//import "react-quill/dist/quill.core.css";

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
})

interface Topic {
  id: string;
  name: string;
}

interface ImageFile {
  file: File;
  url: string;
}

enum PetitionScope {
  local = 'local',
  national = 'national',
  global = 'global'
}

type ScopeInput = {
  id: PetitionScope;
  name: string;
}

const scopes: ScopeInput[] = [
  {id: PetitionScope.local, name:"Local"},
  {id: PetitionScope.national, name:"National"},
  {id: PetitionScope.global, name:"Global"},
]

type PetitionInputs = {
  scope: PetitionScope, 
  title: string,
  topicID: string,
  content: string,
  picture: string,
};

const PetitionForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { push } = useRouter();
  
  const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm<PetitionInputs>({
    defaultValues: {
      scope: PetitionScope.local,
      title: ''
    }
  });
  const { data: topics } = useTopics();
  
  const { composeClient } = useCeramicContext()

  useEffect(() =>{
    register("content",{ required:true, minLength:30});
  },[register]);

  const onEditorStateChange = (editorState : any) => {
    setValue("content", editorState);
  };

  const [currentPicture, setCurrentPicture] = useState<string|undefined>();


  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = ref?.current?.files?.item(0)
    if (file) {
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
      const { url, cid } = await res.json();
      console.log('upload result', url, cid)
      setCurrentPicture(url)
      setValue("picture", cid);
    }
  };

  const onSubmit: SubmitHandler<PetitionInputs> = async (data) => {
    console.log('form data to submit', data, {
      scope: PetitionScope[data.scope]
    })

    try {
      if(data.picture === '') {
        delete data.picture;
      }
      const response = await composeClient.executeQuery<Mutation>(`
      mutation newManifest($input: CreateManifestInput!) {
        createManifest(input: $input) {
          document {
            id
          }
        }
      }
      `, {
        input: {
          content: { 
            ...data,
            scope: PetitionScope[data.scope]
          }
        }
      })
      console.log('response', response)

      return push(`/m/${response.data?.createManifest?.document.id}`)
    } catch (error) {
      console.log('error', error)
    }

      // const jsonData = JSON.stringify(data);
      // console.log(jsonData); // To send to Composedb
  };

  const editorContent = watch("content");


return (
  <Layout metas={{
    title: "Create a Petition",
    description: "",
    imageSrc: ""
  }}>

    <div className="container max-w-md">

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-row gap-12">
        <div className=" max-w-fit">
          <h1 className="text-5xl font-bold">Just fill this form and that&apos;s it!!</h1>

          <div className="form-control">
              <label htmlFor="scope" className="label cursor-pointer ">
                Choose the scope of your petition:
              </label>
              <select 
                className="select select-primary w-full max-w-xs"  
                placeholder="placeholder"
                multiple={false}
                {...register('scope', {required: true})}
              >
                {scopes.map((value, index) => (
                  <option key={value.id} value={value.id}>
                    {value.name}
                  </option>
                ))}
              </select>
            </div>
        </div>

        <div>
          <label htmlFor="topic" className="label cursor-pointer">
             Choose the topic that fit to your petition:
          </label>
          <TopicSelect topics={topics}></TopicSelect>
          <select
             className="select select-primary w-full max-w-xs"
             {...register('topicID',{required: true})}
             placeholder="placeholder topics"
             multiple={false}
           >
             {topics && topics.map((value: Topic) =>(
               <option key={value.id} value={value.id}>
               {value.name}
               </option>
             ))}
           </select>
        </div>

        <div className="formControl">

          <label htmlFor="title" className="label cursor-pointer">
            Choose the title of your petition: 
          </label>
            <input 
              id="title" 
              type="text" 
              className={`input input-bordered input-primary w-full max-w-xs${errors.title && 'input-error'}`}
              placeholder="Name your petition"
              {...register('title', {required: true, minLength: 10, maxLength: 120})}
            />
          {errors.title && 
           <label className="label">

             <span className="label-text-alt ">Title is required</span>
           </label>
          }
        </div>
        
        <div className="formControl">
          <label htmlFor="content" className="label cursor-pointer">
            Compose your petition or your manifest here:
          </label>  
              <ReactQuill 
                theme="snow" 
                placeholder="Compose here!"
                value={editorContent}
                onChange={onEditorStateChange}
              />
              {errors.content && 
                <label className="label">
                  <span className="label-text-alt ">A petition text is required, minimum 15 characters</span>
              </label>
              }
        </div>

        <div className="formControl">
          <label htmlFor="picture" className="label cursor-pointer">
            Insert an image (optional)
          </label>
          <div>
            <input ref={ref} id="fileInput" type="file" onChange={handleFileUpload} />
            <input 
              type="hidden"
              {...register('picture', {required: false})}
            />
          </div>
          {currentPicture && 
          <div>
            <h4>Preview</h4>
            <div>
              <Image
                alt='uploaded image'
                src={currentPicture}
                width={200}
                height={200}
              />
            </div>
          </div>
          }
        </div>

        <div className="formControl flex justify-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>

      </form>
    </div>
  </Layout>
);
};

export default PetitionForm;
