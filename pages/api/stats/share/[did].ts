import { NextApiRequest, NextApiResponse } from 'next'
import getShareStats from '../../../../lib/supabase/getShareStats'


export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { did } = req.query
  const { data, error } = await getShareStats(did as string)
  let views
  if (data) {
    views = data.map((view) => {
      const pactID = view.path.split('/').pop()
      console.log('pactID', pactID)
      return {
        ...view,
        pactID
      }
    })
  }
  res.status(200).json({ data: views, error })
}
