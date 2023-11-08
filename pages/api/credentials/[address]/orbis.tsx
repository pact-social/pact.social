import { NextApiRequest, NextApiResponse } from "next/types";
import { orbisIndexer } from "../../../../lib/getOrbisIndexer";
import { ScorerResponse } from "../challenge";
import { supabase } from "../../../../lib/supabase";
import getDBScore from "../../../../lib/supabase/getDBScore";
import { getAddressFromDid } from "../../../../utils";

const OrbisScorer = '1101'

function computeScore(stamps: []) {
  let score = 0
  for (const stamp of stamps) {
    // @ts-ignore
    score += stamp.weight || 1
  }
  return score
}

function formatScore(did: string, stamps: []) {
  const { address } = getAddressFromDid(did as string)
  return {
    address: address || did,
    stamp_scores: stamps,
    status: 'DONE',
    last_score_timestamp: (new Date()).toISOString(),
    score: computeScore(stamps),
    error: null,
    evidence: null,
  }
}

async function mintCredentials(did: string) {
  const { address } = getAddressFromDid(did as string)
  try {
    let newCreds = await fetch("https://api.orbis.club/mint-credentials/" + did, {
      method: 'GET'
    });
    let result = await newCreds.json();
    if (result?.status && result?.status !== 200) {
      throw new Error('invalid response')
    }

    const score = await fetchCredentials(did as string)
    const update = await supabase
      .from('passport_sybil_scorer')
      .insert({
        ...score,
        address: address as string,
        scorer: OrbisScorer,
      })
    return score
  } catch(e) {
    console.log('refresh orbis credentials error', e)
  }
}

async function fetchCredentials(did: string) {
  let { data, error, status } = await orbisIndexer.rpc("get_verifiable_credentials", {
    q_subject: did,
    q_min_weight: 0
  });
  const score = formatScore(did as string, data)
  return score
}

export default async function getScore(
  req: NextApiRequest,
  res: NextApiResponse<ScorerResponse>
) {
  // should it only return value if sig verification is true ?
  const { address: did, refresh } = req.query

  if (!did) return res.status(500).end()
  const { address } = getAddressFromDid(did as string)
  if (!address) return res.status(500).end()
  const {error: dbError, data: dbData} = await getDBScore(address, OrbisScorer);
  if(dbError) {
    console.log('errors in query', dbError)
    // return res.status(404).end();
  }
  
  if(refresh) {
    try {
      await mintCredentials(did as string)
    } catch (error) {
      
    }
  }

  const score = dbData ? dbData : await fetchCredentials(did as string)

  if (!score) return res.status(500).end()
  return res.send(score)
}
