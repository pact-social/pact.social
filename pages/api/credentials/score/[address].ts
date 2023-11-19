import {type NextApiRequest,type NextApiResponse } from "next";
import { GPapiEndpoint, GPScorer, ScorerResponse } from "../challenge";
import { supabase, getDBScore } from '../../../../lib/supabase';

export default async function getScore(
  req: NextApiRequest,
  res: NextApiResponse<ScorerResponse>
) {
  // should it only return value if sig verification is true ?
  const { address, refresh } = req.query

  const sanityzeData = (body: ScorerResponse & { score: string }) => {
    let stamp_scores: [any?] = []
      Object.entries(body?.stamp_scores || {}).forEach(([key, value]) => {
        // console.log(key); // 'one'
        // console.log(value); // 1
        stamp_scores.push({ [key]: value })
      });
      return {
        ...body,
        stamp_scores,
      }
  }

  const fetchGitcoinPassport = async () => {
    const response = await fetch(`${GPapiEndpoint}/registry/score/${GPScorer}/${address}`,{
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': process.env.GP_SCORER_API_KEY || '',
      },
    });
    const body = await response.json() as ScorerResponse & { score: string };
    // console.log('body', body)
    if (!body) {
      console.log('empty response from gitcoin')
      return res.status(500).end();
    }

    const data = sanityzeData(body)
    const content = {
      ...data,
      score: parseFloat(body.score),
    }
    if (body.status === 'DONE' || body.status === 'ERROR') {
      // save result to DB if 

      const upsert = await supabase
        .from('passport_sybil_scorer')
        .upsert({
          ...content,
          scorer: GPScorer,
        });
    }
    
    return res.send({...content})
  }

  try {
    const {error, data} = await getDBScore(address as string);
    if(error) {
      // console.log('errors in query', error)
      throw new Error('no data in db')
      // return res.status(404).end();
    }

    if (data.status === 'PROCESSING' || refresh) {
      return fetchGitcoinPassport()
    }
    
    if (!data) return res.status(404).end();
    // @TODO fix typing
    return res.send(data)

  } catch (error) {
    // console.log('challenge error', error)
    if (refresh) {
      return fetchGitcoinPassport()
    }
    return res.status(500).end();
  }
}
