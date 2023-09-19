import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'

import Layout from "../../components/layout";
import useTopics from "../../hooks/useTopics";
import { PactInput, PactType } from "../../src/gql";
import TopicSelect from "../../components/form/topicSelect";
import ConnectButton from "../../components/connect";
import { markdownToHtml } from "../../lib/mdUtils";
import MediaField from "../../components/form/mediaField";
import useMutatePact from "../../hooks/useMutatePact";
import MarkdownField from "../../components/form/markdownField";
import SubmitButton from "../../components/form/submitButton";

const RteField = dynamic(() => import('../../components/form/rteField'), {
  ssr: false,
})

type PactTypeInput = {
  id: PactType;
  name: string;
}

const pactTypes: PactTypeInput[] = [
  {id: PactType.Manifesto, name:"Manifesto"},
  {id: PactType.Openletter, name:"Open-Letter"},
  {id: PactType.Petition, name:"Petition"},
]

const PactForm = ({ defaultValues, pactID }: { defaultValues?: PactInput, pactID?: string;}) => {
  const { push } = useRouter();

  const methods = useForm<PactInput>({
    defaultValues: defaultValues ? {
      ...defaultValues,
      content: markdownToHtml(defaultValues.content)
    } : {
      type: PactType.Petition,
      title: ''
    }
  });
  const { register, handleSubmit, watch, setValue, getValues, formState: { errors } } = methods

  const { data: topics } = useTopics();
  const { saveDraft, publish } = useMutatePact()

  watch('topicID')

  const onSubmit: SubmitHandler<PactInput> = async (data) => {

    await publish(data, pactID)
  };

  return (
    <Layout metas={{
      title: "Create a Pact",
      description: "",
      imageSrc: ""
    }}>
      <FormProvider {...methods} >
      <div className="container max-w-md my-12">

        <h1 className="text-3xl font-bold">Your cry for change!</h1>
        <div className="divider"></div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-row gap-3">
          <div className="formControl">

            <div className="form-control">
              <label htmlFor="type" className="label cursor-pointer ">
                Choose the type of Pact:
              </label>
              <select
                className="select select-bordered w-full"
                placeholder="placeholder"
                multiple={false}
                {...register('type', {required: true})}
              >
                {pactTypes.map((value, index) => (
                  <option key={value.id} value={value.id}>
                    {value.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="formControl">
            <label htmlFor="topic" className="label cursor-pointer">
              Choose the topic that fit to your Pact:
            </label>
            {topics &&
              <TopicSelect topics={topics} register={register} setValue={setValue}></TopicSelect>
            }
          </div>

          <div className="formControl">
            <label htmlFor="title" className="label cursor-pointer">
              Choose the title of your Pact:
            </label>
              <input
                id="title"
                type="text"
                className={`input input-bordered w-full max-w-xs${errors.title && 'input-error'}`}
                placeholder="Name your Pact"
                {...register('title', {required: true, minLength: 10, maxLength: 120})}
              />
            {errors.title &&
            <label className="label">

              <span className="label-text-alt ">Title is required</span>
            </label>
            }
          </div>

          <div className="formControl">

            <label htmlFor="description" className="label cursor-pointer">
              Summarize your Pact:
            </label>
              <input
                id="description"
                type="text"
                className={`input input-bordered w-full max-w-xs${errors.description && 'input-error'}`}
                placeholder=" Summarize your Pact"
                {...register('description', {required: false, maxLength: 500})}
              />
            {errors.description &&
            <label className="label">

              <span className="label-text-alt ">Description is required</span>
            </label>
            }
          </div>

          {/* <RteField label="Post your content:" field="content" /> */}
          <MarkdownField label="Post your content:" field="content" />

          <MediaField />
          <div className="divider"></div>
          <div className="formControl flex justify-end">
            <ConnectButton el={
              <div className="join">
                <button
                  type="button"
                  className="btn btn-primary join-item"
                  onClick={() => saveDraft(getValues(), pactID)}
                >Save Draft</button>
                <SubmitButton name="Publish Live" className="btn-secondary join-item" />
              </div>
            } />
          </div>

        </form>
      </div>
      </FormProvider>
    </Layout>
  );
};

export default PactForm;
