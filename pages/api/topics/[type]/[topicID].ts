import { NextApiRequest, NextApiResponse } from 'next'
import getPactsByTopicType from '../../../../lib/supabase/getPactsByTopicType';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const type = req.query.type as string;
  const topicID = req.query.topicID as string;
  const page = req.query.page as string;

  const { data, count, error } = await getPactsByTopicType(topicID, type, parseInt(page))
  
  res.status(200).json({ data, count, error })
}
