import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "../../components/layout";
import { useCeramicContext } from "../../context";
import { useEffect } from "react";
import getProfile from "../../lib/getProfile";
import ConnectButton from "../../components/connect";
import createProfile from "../../lib/updateProfile";
import { PactProfile } from "../../src/gql";

export default function EditProfile() {
  const { ceramic, state: { isAuthenticated, did } } = useCeramicContext();
  const { register, handleSubmit, watch, setValue, getValues, formState: { errors }, reset } = useForm<PactProfile>({
    defaultValues: {}
  });

  async function fetchCurrentProfile() {
    if(isAuthenticated && did) {
      const data = await getProfile(did?.parent || did?.id);
      if (data) reset(data)
    }
  }

  useEffect(() => {
    fetchCurrentProfile();
  }, [did])

  const onSubmit: SubmitHandler<PactProfile> = async (data) => {
    try {
      await createProfile(data, ceramic);
    } catch (error) {
      console.log('error', error)
    }
  };

  return (
    <Layout>
      <div className="card max-w-md bg-base-100 shadow-xl m-auto">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-row gap-6">
            
            <div className="formControl">
              <label htmlFor="username" className="label cursor-pointer">
                username: 
              </label>
                <input 
                  id="username" 
                  type="text" 
                  className={`input input-bordered input-primary w-full max-w-xs${errors.username && 'input-error'}`}
                  placeholder="your username"
                  {...register('username', {required: true, minLength: 5, maxLength: 120})}
                />
                {errors.username && 
                <label className="label">
                  <span className="label-text-alt ">username is required</span>
                </label>
                }
            </div>
            <div className="formControl">
              <label htmlFor="name" className="label cursor-pointer">
                name: 
              </label>
                <input 
                  id="name" 
                  type="text" 
                  className={`input input-bordered input-primary w-full max-w-xs${errors.name && 'input-error'}`}
                  placeholder="your name"
                  {...register('name', {required: false, minLength: 5, maxLength: 120})}
                />
                {errors.name && 
                <label className="label">
                  <span className="label-text-alt ">name is required</span>
                </label>
                }
            </div>
            
            <div className="formControl flex justify-center">
              <ConnectButton el={<button type="submit" className="btn btn-primary">Submit</button>} />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
