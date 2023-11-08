import {type NextApiRequest,type NextApiResponse } from "next";
import { GPapiEndpoint, GPScorer, ScorerResponse } from "../challenge";
import { supabase, getDBScore } from '../../../../lib/supabase';

export default async function getScore(
  req: NextApiRequest,
  res: NextApiResponse<ScorerResponse>
) {
  // should it only return value if sig verification is true ?
  const { address, refresh } = req.query

  try {
    const {error, data} = await getDBScore(address as string);
    if(error) {
      console.log('errors in query', error)
      return res.status(404).end();
    }

    if (!data) return res.status(404).end();

    if (data.status === 'PROCESSING' || refresh) {
      const response = await fetch(`${GPapiEndpoint}/registry/score/${GPScorer}/${address}`,{
        headers: {
          'Accept': 'application/json',
          'X-API-KEY': process.env.GP_SCORER_API_KEY || '',
        },
      });
      const body = await response.json() as ScorerResponse & { score: string };

      if (!body) {
        console.log('empty response from gitcoin')
        return res.status(500).end();
      }
      const content = {
        ...body,
        score: parseFloat(body.score)
      }
      if (body.status === 'DONE' || body.status === 'ERROR') {
      // save result to DB if 
      // @TODO fix save, add stamps array
        await supabase
          .from('passport_sybil_scorer')
          .upsert({
            ...content,
            scorer: GPScorer,
          });
      }
      
      return res.send({...content})
    }
    
    // @TODO fix typing
    return res.send(data)

  } catch (error) {
    console.log('challenge error', error)
    return res.status(500).end();
  }
}
