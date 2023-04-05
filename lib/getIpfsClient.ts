import * as IPFS from 'ipfs-http-client';

export default async function getIpfsClient () {
  const ipfs = await IPFS.create({url: 'http://localhost:5011/api/v0'});
  return ipfs;
}
