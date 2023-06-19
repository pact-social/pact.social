import { BasicProfile } from "@datamodels/identity-profile-basic";
import { CeramicAccount } from "../src/gql";
import { shortAddress } from "../utils";

export default function useGetName(details: CeramicAccount | undefined | null, address: string | undefined | null, did: string | undefined) {
  if(details && details.pactProfile?.name) {
    return details.pactProfile?.name;
  }
  // else if(details && details.body?.name) {
  //   return details.body.name;
  // }
  else if(address) {
    return shortAddress(address)
  }
  else {
    return shortAddress(did)
  }
}
