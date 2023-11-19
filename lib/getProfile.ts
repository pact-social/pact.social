import { supportedChains } from "./constants";
// import { orbisIndexer } from "./getOrbisIndexer";
import { composeClient } from "./composeClient";
import { getAddressFromDid } from "../utils";
import { PactProfile, Maybe } from "../src/gql";

type QueryMultiProfile = {
  [x: string]: {
    pactProfile: Maybe<PactProfile>
  };
}

const profileQuery = (address: string) => {
  const query = supportedChains.reduce((query, chain) => {
    return `${query}
      ${chain.network}: node(id: "did:pkh:eip155:${chain.id}:${address}") {
        ... on CeramicAccount {
          pactProfile {
            id
            name
            bio
            title
            country
            city
            organisation
            profilePicture
            email {
              dataToEncryptHash
              ciphertext
              chain
              accessControlConditions
              accessControlConditionType
            }
          }
        }
      }
    `
  }, '')
  
  const queryWrapper = `
    query ProfileQuery {
      ${query}
    }
  `;

  return queryWrapper;
};

const getComposeProfile = async (address: string) => {
  
  const profileResult = await composeClient.executeQuery<QueryMultiProfile>(profileQuery(address));

  return profileResult;
}

export default async function getProfile (did: string) {
  // check profile from orbis and composeDB
  const account = getAddressFromDid(did)
  const address = account.address;
  if(!address) throw new Error('invalid DID provided');
  
  const [
    {errors, data: composeProfiles},
    // {error, data: orbisProfiles, status}
  ] = await Promise.all([
    getComposeProfile(address),
    // orbisIndexer.from("orbis_v_profiles").select().ilike('address', address)
  ])

  const currentChain = supportedChains.find((current) => current.id.toString() === account.chain.split(':')[1])
  
  if (currentChain && composeProfiles) {
    let profile = composeProfiles[currentChain?.network].pactProfile;
    return profile as PactProfile;
  }
  return;
  
}
