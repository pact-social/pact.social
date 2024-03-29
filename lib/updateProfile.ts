import type { CeramicClient } from "@ceramicnetwork/http-client"
import { composeClient } from "./composeClient";
import { PactProfile, CreatePactProfileInput, Mutation } from "../src/gql";


const createProfileQuery = `
  mutation CreateProfile($input: CreatePactProfileInput!) {
    createPactProfile(input: $input) {
      clientMutationId
        document {
          id
        }
    }
  }
`;

export default async function createProfile (profile: PactProfile, ceramic?: CeramicClient) { 
  const { email, ...inputs} = Object.fromEntries(Object.entries(profile).filter(([_, v]) => {
    return (v && typeof v === 'object') || (v != null && v != '')
  }));
  inputs?.id && delete inputs.id
  const inputProfile: CreatePactProfileInput = {
    content: {
      ...inputs,
    }
  }
  if (email?.ciphertext) {
    inputProfile.content.email = email
  }

  const { data, errors } = await composeClient.executeQuery<Mutation>(
    createProfileQuery,
    {input: inputProfile},
  )
  if (errors) {
    errors.map(err => console.log(err.message));
    throw new Error('error submitting profile')
  }

  return data
}
