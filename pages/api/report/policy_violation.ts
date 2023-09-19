import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { getPact } from '../../../lib/getPact';
import { ReportPolicyType } from '../../../lib/reportPolicy';
import { type DagJWSResult, DID } from 'dids';
import { Cacao } from '@didtools/cacao'
import * as KeyResolver from 'key-did-resolver'
import { getEIP191Verifier } from '@didtools/pkh-ethereum'
import * as Block from 'multiformats/block'
import * as codec from '@ipld/dag-cbor'
import { sha256 as hasher } from 'multiformats/hashes/sha2'
import { CID } from 'multiformats/cid'

type PayloadType = {
  reason: ReportPolicyType;
  pactID: string;
}

const verifiers = {
	...getEIP191Verifier()
}

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
  const did = new DID({ resolver: KeyResolver.getResolver() })

  const channelHook = process.env.DISCORD_POLICY_VIOLATION_HOOK as string
  const dagJws = req.body as DagJWSResult

  if (!dagJws.cacaoBlock) {
    return res.status(400).end('Invalid cacao block')
  }

  const cacaoBlock = Uint8Array.from(Object.values(dagJws.cacaoBlock))
  const linkedBlock = Uint8Array.from(Object.values(dagJws.linkedBlock))

  const block = await Block.decode<PayloadType, number, number>({ bytes: linkedBlock, codec, hasher })
  
  if (block.cid.toString() !== dagJws.jws.link?.['/'].toString()) {
    return res.status(400).end('Invalid linked block')
  }

  try {
    const decodedCacaoBlock = await Cacao.fromBlockBytes(cacaoBlock)
    await Cacao.verify(decodedCacaoBlock, { verifiers })
    await did.verifyJWS(dagJws.jws, { capability: decodedCacaoBlock, verifiers })
    
    const { 
      reason,
      pactID,
    } = block.value

    const pact = await getPact({ streamID: pactID})
  
    if (!pact) {
      console.log('cannot find pact')
      return res.status(400).end(`Invalid arguments provided`)
    }
  
    const discord = await fetch(channelHook, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "username": "policy bot",
        "content": `🛑 New user policy report **${reason}** \nfrom 👉 ${decodedCacaoBlock.p.iss} \npact 👉 [${pact?.title}](${process.env.NEXT_PUBLIC_APP_DOMAIN}/m/${pact.id})`
      })
    });

    if (!discord.ok) {
      return res.status(400).end('Bad Request')
    }

    return res.end()

  } catch (error) {
    console.log('error', error)
    return res.status(400).end('Invalid report')
  }
  

}
