import { supportedChains } from "./constants";
import { orbisIndexer } from "./getOrbisIndexer";
import { composeClient } from "./composeClient";
import { getAddressFromDid } from "../utils";
import { Query } from "../src/gql";

const profileQuery = (address: string) => {
  const query = supportedChains.reduce((query, chain) => {
    return `${query}
      ${chain.name}: node(id: "did:pkh:eip155:${chain.id}:${address}") {
        ... on PactProfile {
          id
          name
          description
        }
      }
    `
  }, '')
  
  const queryWrapper = `
    query ProfileQuery {
      ${query}
    }
  `;
  console.log('prep query', queryWrapper);

  return queryWrapper;
};

const getComposeProfile = async (address: string) => {
  
  const profileResult = await composeClient.executeQuery<Query>(profileQuery(address));

  console.log('profileResult');
  return profileResult;
}

export default async function getProfile (did: string) {
  // check profile from orbis and composeDB
  const address = getAddressFromDid(did).address;
  if(!address) throw new Error('invalid DID provided');
  
  const [
    {errors, data: composeProfiles},
    {error, data: orbisProfiles, status}
  ] = await Promise.all([
    getComposeProfile(address),
    orbisIndexer.from("orbis_v_profiles").select().ilike('address', address)
  ])
  console.log('profiles errors', error, errors, status);
  console.log('Profiles', composeProfiles, orbisProfiles);
  
  /** Return results */
  return({ data: orbisProfiles as Profile[]});
}
