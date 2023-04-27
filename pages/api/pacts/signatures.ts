import { NextApiRequest, NextApiResponse } from 'next'
import getPublicSignatures from '../../../lib/supabase/getPublicSignatures'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { streamID, page } = req.body;
    
    if (!streamID) return res.status(500).end();

    const { data, error, count } = await getPublicSignatures(streamID as string, page)
    console.log('getPublicSignatures', data)
    if (error) return res.status(500).json(error);
    return res.status(200).json({data, count})
  } else {
    return res.status(500).end()
  }
}
