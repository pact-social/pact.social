import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../../lib/supabase'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { streamID } = req.query;
  const { data, error } = await supabase.rpc('sign_stats_stream', { _streamid: streamID as string})

  res.status(200).json({ data, error })
}
