import Image from "next/image";
import { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "../../components/layout";

interface Topic {
    id: string;
    name: string;
}

interface ImageFile {
    file: File;
    url: string;
  }

const topics: Topic[] = [
    { id: "animals", name: "Animals" },
    { id: "criminal-justice", name: "Criminal Justice" },
    { id: "disability", name: "Disability" },
    { id: "economic-justice", name: "Economic Justice" },
    { id: "education", name: "Education" },
    { id: "entertainment", name: "Entertainment" },
    { id: "family", name: "Family" },
    { id: "food", name: "Food" },
    { id: "health", name: "Health" },
    { id: "human-rights", name: "Human Rights" },
    { id: "immigration", name: "Immigration" },
    { id: "lgbtq-rights", name: "LGBTQ Rights" },
    { id: "politics", name: "Politics" },
    { id: "technology", name: "Technology" },
    { id: "womens-rights", name: "Women\'s rights" },
    { id: "other", name: "Other" },
];

enum PetitionScope {
  local,
  national,
  global
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
  //scope: PetitionScope,
  scope: PetitionScope, 
  title: string,
  topic: string,
  content: string,
  picture: string,
};

const PetitionForm = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = useForm<PetitionInputs>({
    defaultValues: {
      scope: PetitionScope.local,
      title: ''
    }
  });
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
        `${'http://localhost:3000'}/api/media/upload`,
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

  const onSubmit: SubmitHandler<PetitionInputs> = (data) => {
    console.log('form data to submit', data, {
      scope: PetitionScope[data.scope]
    })

      

      // const petitionData = {
      //     scope,
      //     tags: selectedTags,
      //     title,
      //     story,
      //     image,
      // };
      const jsonData = JSON.stringify(data);
      console.log(jsonData); // To send to Composedb
  };

return (
  <Layout metas={{
    title: "Create a Petition",
    description: "",
    imageSrc: ""
  }}>

    <div className="container max-w-md">

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-row gap-12">
        <div className=" max-w-fit">
          <h2>Just fill this form and that's it!!</h2>

          <div className="form-control">
              <label htmlFor="scope" className="label cursor-pointer ">
                Choose the scope of your petition:
              </label>
              <select 
                //name="scope"
                //id="scope"
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
          <select
             className="select select-primary w-full max-w-xs"
             //{...topics}
             //value={topics}
             //onChange={handleTopicChange}
             {...register('topic',{required: true})}
             placeholder="placeholder topics"
             multiple={false}
           >
             {topics.map((value: Topic, index) =>(
               <option key={index} value={value.id}>
               {value.name}
               </option>
             ))}
           </select>
        </div>

        <div className="formControl">

          <label htmlFor="title" className="input-group input-group-vertical">
            <span className="label-text text-lg">Title</span>
            <input 
              id="title" 
              type="text" 
              className={`input input-bordered w-full${errors.title && 'input-error'}`}
              placeholder="Name your petition"
              {...register('title', {required: true, minLength: 10, maxLength: 120})}
            />
          </label>
          {errors.title && 
           <label className="label">

             <span className="label-text-alt ">Title is required</span>
           </label>
          }
        </div>

        <div className="formControl">
          <label htmlFor="content" className="label">Tell your story!</label>
          <textarea 
            id="content"
            // value={story}
            // onChange={handleStoryChange} 
            // minLength={10}
            className="textarea textarea-bordered textarea-lg w-full max-w-xl"
            {...register('content', {required: true, minLength: 100, maxLength: 10000})}
            />
        </div>
        
        <div className="formControl">

          <h2>Insert an image</h2>
          <h3>Optional</h3>
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
