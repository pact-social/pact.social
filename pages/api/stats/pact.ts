import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase.rpc('sign_stats_top')

  res.status(200).json({ data, error })
}
