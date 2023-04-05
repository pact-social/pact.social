import { NextApiRequest, NextApiResponse } from "next/types";
import fetch from 'node-fetch';
import {supabase, getDBScore} from '../../../lib/supabase';

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
      console.log('error', response)
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

    const data = await response.json() as ScorerResponse;
    if (!data) {
      console.log('error', response)
      return res.status(500).end();
    }

    // set current cache state to requested
    const {data: dbRecord} = await getDBScore(body.address);
    if (dbRecord) {
      await supabase
        .from('passport_sybil_scorer')
        .update({
          status: data.status,
        })
        .eq('address', (body.address as string).toLowerCase())
        .eq('scorer', GPScorer)
      ;
    } else {
      await supabase
        .from('passport_sybil_scorer')
        .insert({
          ...data,
          score: null,
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
