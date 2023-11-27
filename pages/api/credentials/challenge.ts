import { NextApiRequest, NextApiResponse } from "next/types";
import fetch from 'node-fetch';
import {supabase, getDBScore} from '../../../lib/supabase';
import { sanityzeData } from "./score/[address]";

export const GPapiEndpoint = 'https://api.scorer.gitcoin.co'
export const GPScorer = '139'

export type ChallengeResponse = {
  message: string;
  nonce: string;
}

export type ScorerResponse = {
  address: string;
  score: number | null;
  status: string | null;
  last_score_timestamp: string | null;
  evidence: string | null;
  stamp_scores?: any[] | null;
  error: string | null;
}

async function getChallenge (
  req: NextApiRequest,
  res: NextApiResponse<ChallengeResponse>
) {
  try {
    const response = await fetch(`${GPapiEndpoint}/registry/signing-message`,{
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': process.env.GP_SCORER_API_KEY || '',
      }
    });

    const body = await response.json() as ChallengeResponse;

    if (!body) {
      console.log('empty response from challenge')
      return res.status(500).end();
    }
    return res.send(body)
  } catch (error) {
    console.log('challenge error', error)
  }
}

async function validateChallenge(
  req: NextApiRequest,
  res: NextApiResponse<ScorerResponse>
) {
  const { body } = req

  try {
    const response = await fetch(`${GPapiEndpoint}/registry/submit-passport`,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-API-KEY': process.env.GP_SCORER_API_KEY || '',
      },
      body: JSON.stringify({
        ...body,
        community: GPScorer,
      })
    });
    if (response.status !== 200) return res.status(response.status).end()
    const data = await response.json() as ScorerResponse & { score: string };
    
    if (!data) {
      console.log('challenge error - no data')
      return res.status(500).end();
    }
    const score = sanityzeData(data)
    // set current cache state to requested
    const {data: dbRecord} = await getDBScore(body.address);

    if (dbRecord) {
      const res = await supabase
        .from('passport_sybil_scorer')
        .update({
          status: data.status,
          score: parseFloat(score.score || 0),
        })
        .eq('address', (body.address as string).toLowerCase())
        .eq('scorer', GPScorer)
      ;

    } else {
      const res = await supabase
        .from('passport_sybil_scorer')
        .insert({
          ...score,
          score: parseFloat(score.score || 0),
          scorer: GPScorer,
        })
      ;

    }

    return res.send(data);
  } catch (error) {
    console.log('challenge error', error)
    return res.status(500).end();
  }
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<ChallengeResponse | ScorerResponse>
) {
  if (req.method === 'POST') {
    return await validateChallenge(req, res)
    // return getChallenge(req, res)
  } else if (req.method === 'GET') {
    return await getChallenge(req, res);
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
};
