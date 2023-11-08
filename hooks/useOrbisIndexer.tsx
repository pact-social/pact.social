import { orbisIndexer } from '../lib/getOrbisIndexer';


export default function useOrbisIndexer() {
  return {
    orbisApi: orbisIndexer,
    /** Will query our Node to fetch credentials for this did */
    fetchUserCredentials: async (did: string) => {
      try {
        let res = await fetch("https://api.orbis.club/mint-credentials/" + did, {
          method: 'GET'
        });
        let result = await res.json();
        return result
      } catch(e) {
        console.log("Error fetching credentials.");
      }
    }
  };
}
