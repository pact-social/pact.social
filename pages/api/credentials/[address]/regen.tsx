import {type NextApiRequest,type NextApiResponse } from "next";
import { ScorerResponse } from "../challenge";

async function getRegenScore(address: string) {
  try {
    const res = await fetch(
      'https://regenscore.io/api/myscore',
      {
        method: 'POST',
        headers: {
          // 'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({address})
      }
    )
    const body = await res.json()
    return body
  } catch (error) {
    console.log('error', error)
  }
}

export default async function getScore(
  req: NextApiRequest,
  res: NextApiResponse<ScorerResponse>
) {
  const { address, refresh } = req.query
  
  if(!address) return res.status(500).end()

  // serve score from db first
  const data = await getRegenScore(address as string)
  // check if score is sufficient
  // if score match, issue credential
  // verify signatures that are from the x last hours
  // store aggregated  result in db
  if (!data) return res.status(404).end()
  return res.send(data)
}
