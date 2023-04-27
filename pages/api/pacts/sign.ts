import { NextApiRequest, NextApiResponse } from 'next'
import getIpfsClient from '../../../lib/getIpfsClient';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { jwe } = req.body;
    
    if (!jwe) return res.status(500).end();
    const ipfs = await getIpfsClient();

    const cid = await ipfs.dag.put(jwe, {
      storeCodec: 'dag-jose',
      hashAlg: 'sha2-256',
    });
    
    const jweCid = cid.toV1().toString();
    
    return res.status(200).json({jweCid})
  } else {
    return res.status(500).end()
  }
}
