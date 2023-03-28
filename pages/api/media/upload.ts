import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable';
import { promises as fs } from 'fs'
import os from 'os'
import { create, globSource } from 'kubo-rpc-client'

const ipfsApi = 'http://127.0.0.1:5011'
const ipfsGateway = 'http://localhost:9011'

const ipfs = create({
  url: ipfsApi
})

console.log('uploading file', os.tmpdir());

// first we need to disable the default body parser
export const config = {
  api: {
    bodyParser: false,
  }
};


type Data = {
  cid: string;
  url: string;
}

async function uploadfilePOST (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log('uploading file', os.tmpdir());
  const form = new formidable.IncomingForm({
    keepExtensions: true,
    // uploadDir: './public/files/'
  });

  form.parse(req, async (err, fields, files) => {
    if (err) res.status(500).send(err)
    try {
      const { cid } = await ipfs.add(globSource(files?.fileInput.filepath,  '**/*'))
      console.log('ipfs cid', cid.toV1().toString())
      res.status(200).json({ 
        cid: cid.toV1().toString(),
        url: `${ipfsGateway}/ipfs/${cid.toV1().toString()}`
      })
    } catch (error) {
      console.log('cannot publish to ipfs', error)
      return res.status(500).send(err)
    }
  })
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // console.log('media upload api', req.method)
  if (req.method === 'POST') {
    return uploadfilePOST(req, res)
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  
  // res.status(200).json({ name: 'John Doe' })
}
