import { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from '../../../lib/supabase'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.query;
  if(type === 'all') {
    const { data, error } = await supabase.rpc('topic_all')
    return res.status(200).json({ data, error })
  }
  const { data, error } = await supabase.rpc('topic_per_type', { _type: type as string})
  
  return  res.status(200).json({ data, error })
}
