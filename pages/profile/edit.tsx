import { useForm, SubmitHandler } from "react-hook-form";
import Layout from "../../components/layout";
import { useCeramicContext } from "../../context";
import { useEffect, useState } from "react";
import getProfile from "../../lib/getProfile";
import ConnectButton from "../../components/connect";
import updateProfile from "../../lib/updateProfile";

export default function EditProfile() {
  const { ceramic, state: { isAuthenticated, did } } = useCeramicContext();
  const [ current, setCurrent ] = useState<Profile>();
  const { register, handleSubmit, watch, setValue, getValues, formState: { errors }, reset } = useForm<Profile>({
    defaultValues: {}
  });

  async function fetchCurrentProfile() {
    if(isAuthenticated && did) {
      const { data } = await getProfile(did?.parent || did?.id);
      if (data && data?.length > 0) {
        // setCurrent(data?.at(0))
        reset(data?.at(0))
      }
    }
  }

  useEffect(() => {
    fetchCurrentProfile();
  }, [did])

  const onSubmit: SubmitHandler<Profile> = async (data) => {
    try {
      await updateProfile(data, ceramic);
    } catch (error) {
      console.log('error', error)
    }
  };

  return (
    <Layout>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-row gap-12">
          
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
          
          <div className="formControl flex justify-center">
            <ConnectButton el={<button type="submit" className="btn btn-primary">Submit</button>} />
          </div>
        </form>
      </div>
    </Layout>
  );
}
