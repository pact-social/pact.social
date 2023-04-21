import { Orbis } from "@orbisclub/orbis-sdk";
import type { CeramicClient } from "@ceramicnetwork/http-client"


export default async function updateProfile (profile: Profile, ceramic?: CeramicClient) {
  // const orbis = new Orbis({ ceramic });
  const orbis = new Orbis();
  const isConnected = await orbis.isConnected(localStorage.getItem('did'))
  
  if (isConnected.status !== 200) {
    await orbis.connect_v2(window.ethereum);
  }
  let res = await orbis.updateProfile(profile);
  
  /** Return results */
  // return({ data: orbisProfiles as Profile[]});
}
