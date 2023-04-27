import * as IPFS from 'ipfs-http-client';

export default async function getIpfsClient () {
  const ipfs = await IPFS.create({url: `${process.env.IPFS_API}/api/v0`});
  return ipfs;
}
