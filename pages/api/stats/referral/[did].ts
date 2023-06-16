import { NextApiRequest, NextApiResponse } from 'next'
import getReferralStats from '../../../../lib/supabase/getReferralStats'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { did } = req.query
  const { data, error } = await getReferralStats(did as string)

  res.status(200).json({ data, error })
}
