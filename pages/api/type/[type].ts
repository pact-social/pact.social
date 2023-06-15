import { NextApiRequest, NextApiResponse } from 'next'
import getPactsByType from '../../../lib/supabase/getPactsByType';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const type = req.query.type as ("openletter" | "manifesto" | "petition" | "all");
  const page = req.query.page as string;
  
  try {
    const result = await getPactsByType(type, parseInt(page || '1'))
    return res.status(200).json(result)
  } catch (error) {
    return res.status(404).send('');
  }
  
}
