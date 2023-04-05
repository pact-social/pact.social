import { BasicProfile } from "@datamodels/identity-profile-basic";
import { CeramicAccount } from "../src/gql";
import { shortAddress } from "../utils";

export default function useGetUsername(details: CeramicAccount | undefined | null, address: string | undefined | null, did: string | undefined) {
  if(details && details.basicProfile?.name) {
    return details.basicProfile?.name;
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
