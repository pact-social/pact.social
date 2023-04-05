import { getAddressFromDid } from "../utils";

/** Turns a did:pkh into a clean address and chain object */
export default function useDidToAddress(did: string) {
  return getAddressFromDid(did);
}
