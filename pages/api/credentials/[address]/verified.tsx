import { NextApiRequest, NextApiResponse } from "next"
import getDBScore from "../../../../lib/supabase/getDBScore";
import { GPScorer } from "../challenge";

export type VerifiedResponse = {
  verified: boolean;
  scorers: ({
    name: string;
    id: string;
    verified: boolean;
    score: number;
  } | undefined)[];
}

export default async function getScore(
  req: NextApiRequest,
  res: NextApiResponse<VerifiedResponse>
) {
  const { address, refresh } = req.query
  
  if(!address) return res.status(500).end()

  try {
    
    // Get gitcoin passport cached score
    const {error, data} = await getDBScore(address as string, GPScorer);
    if(error) {
      // console.log('errors in query', error)
      // throw new Error('no data in db')
      return res.status(404).end();
    }
    
    const scorers = [data].map(scorer => {
      switch (scorer.scorer) {
        case GPScorer:
          return {
            name: 'GitcoinPassport',
            id: scorer.scorer,
            verified: scorer.score && scorer.score >= 15,
            score: scorer.score,
          }
          break;
      
        default:
          // return null
          break;
      }
    })
    const body = scorers.reduce((previous, scorer) => {
      if (scorer?.verified) {
        previous.verified = true
      }
      return previous
    }, {
      verified: false,
      scorers
    } as any)
    // check if score is sufficient
    // if score match, issue credential
    // verify signatures that are from the x last hours
    // store aggregated  result in db
    if (!body) return res.status(404).end()
    return res.send(body)

  } catch (error) {
    return res.status(404).end()
  }
}
