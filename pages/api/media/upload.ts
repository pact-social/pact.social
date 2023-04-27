import type { NextApiRequest, NextApiResponse } from 'next'
import formidable from 'formidable';
import { promises as fs } from 'fs'
import { create } from 'ipfs-http-client'

const ipfsApi = process.env.IPFS_API
const ipfsGateway = process.env.NEXT_PUBLIC_IPFS_GATEWAY

const ipfs = create({
  url: ipfsApi
})

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

  const form = new formidable.IncomingForm({
    keepExtensions: true,
    // uploadDir: './public/files/'
  });

  form.parse(req, async (err, fields, files) => {
    if (err) res.status(500).send(err)
    try {
      let filepath;

      if (Array.isArray(files?.fileInput)) {
        filepath = files?.fileInput[0].filepath
      } else {
        filepath = files?.fileInput.filepath
      }
      const content = await fs.readFile(filepath)
      const { cid } = await ipfs.add(
        content,
        // {
        //   progress: (prog) => console.log(`received: ${prog}`)
        // }
      );

      res.status(200).json({ 
        cid: cid.toV1().toString(),
        url: `${ipfsGateway}/ipfs/${cid.toString()}`,
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
  if (req.method === 'POST') {
    return uploadfilePOST(req, res)
  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
