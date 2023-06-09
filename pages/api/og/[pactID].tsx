import fs from 'fs';
import satori from 'satori';
import sharp from 'sharp';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
import { type IncomingMessage,  get as unsecureGet  } from 'http';
import { get } from 'https';
import { Maybe, Pact, PactType } from '../../../src/gql';
import { getPact } from '../../../lib/getPact';
import supabase from '../../../lib/supabase';
import { Resvg } from '@resvg/resvg-js'
import { formatNumber } from '../../../utils/stats';
import LogoBrand from '../../../components/svg/logoBrand';
import IconSig from '../../../components/svg/noun-signature';
import VerifiedIcon from '../../../components/svg/verifiedIcon';
import ViewIcon from '../../../components/svg/viewIcon';

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  const tR = performance.now()
  const pactID = req.query.pactID as string;
  const output = req.query.output as string;
  const pact = await getPact({streamID: pactID})
  
  const roboto = fs.readFileSync('./public/fonts/roboto/Roboto-Bold.ttf')
  const robotoLight = fs.readFileSync('./public/fonts/roboto/Roboto-Light.ttf')
  const chillax = fs.readFileSync('./public/fonts/chillax/Fonts/WEB/fonts/Chillax-Bold.ttf')
  const tT = performance.now()
  const content = await template(pact)
  // console.info('✨ Template Done in', performance.now() - tT, 'ms')

  const svg = await satori(
    content,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Roboto',
          data: roboto,
          weight: 700,
          style: 'normal',
        },
        {
          name: 'Roboto',
          data: robotoLight,
          weight: 300,
          style: 'normal',
        },
        {
          name: 'Chillax',
          data: chillax,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );
  // console.info('✨ SVG Done in', performance.now() - tR, 'ms')
  
  if (output === 'svg') {
    res.setHeader("Content-Type", "image/svg+xml");
    if (process.env.NODE_ENV === 'production') {
      res.setHeader(
        "Cache-Control",
        "public, no-transform, s-maxage=60, max-age=60"
      );
    }
    return res.end(svg);
  }

  const tResvg = performance.now()
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 2400,
    },
  })
  const pngData = resvg.render()
  // console.info('✨ resvg Done in', performance.now() - tResvg, 'ms')
  const tPng = performance.now()
  const pngBuffer = pngData.asPng()
  // console.info('✨ resvg png Done in', performance.now() - tPng, 'ms')
  const t1 = performance.now()
  const data = await sharp(pngBuffer)
  .resize(2400)
  .jpeg(
    {
    quality: 80,
    chromaSubsampling: '4:4:4'
    }
  )
  .toBuffer();
  // console.info('✨ PNG to JPEG Done in', performance.now() - t1, 'ms')
  res.statusCode = 200;
  res.setHeader("Content-Type", "image/jpeg");
  // if (process.env.NODE_ENV === 'production') {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=60, max-age=60"
    );
  // }
  // console.info('✨ Done in', performance.now() - tR, 'ms')
  return res.end(data);
}


function getReadStream(url: string): Promise<IncomingMessage> {
  return new Promise((resolve, reject) => {
    const req = process.env.NODE_ENV === 'production' ? get(url) : unsecureGet(url);
    req.on('response', (response) => {
      response.pause(); // -> this solves the issue
      if (response.statusCode === 200) {
        resolve(response);
      } else {
        reject(new Error('Error ' + response.statusCode));
      }
    });
    req.on('error', reject);
  });
}

const getColors = (type?: Maybe<PactType>) => {
  switch (type) {
    case 'petition':
      return {
        background: 'rgb(252, 245, 249)',
        accent: 'rgb(240, 0, 184)',
      }
    case 'manifesto':
      return {
        background: 'rgb(245, 246, 255)',
        accent: 'rgb(0, 22, 240)',
      }
    case 'openletter':
      return {
        background: 'rgb(244, 255, 251)',
        accent: 'rgb(3, 211, 145)',
      }
    default:
      return {
        background: 'rgb(252, 245, 249)',
        accent: 'rgb(240, 0, 184)',
      }
  }
}

 
const template = async (pact: Pact) => {
  const { data, error } = await supabase.rpc('sign_stats_stream', { _streamid: pact.id})
  const stats = data?.[0];
  const dir = './.next/cache/og'

  let imageName: string | undefined;
  let imageURI: string;
  if (pact.media) {
    imageName = pact.media[0]?.cid;
    imageURI = `${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/${pact.media[0]?.cid}`
  } else {
    imageName = (new URL(pact.image)).pathname.replace(/\//g, '_')
    imageURI = pact.image
  }
  if (pact.media && !imageName) {
    const image = pact.media && pact.media[0]?.item;
    imageName = (new URL(image)).pathname.replace(/\//g, '_')
    imageURI = image
  }

  const cachePicturePath = path.resolve(`${dir}/${imageName}.jpeg`)

  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  if (!fs.existsSync(cachePicturePath)) {
    const resizer = sharp()
      .resize(1120, 840, {
        // kernel: sharp.kernel.nearest,
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
        // background: { r: 255, g: 255, b: 255, alpha: 0.5 }
      })
    const image = await getReadStream(imageURI)
    const resized = image.pipe(resizer)
    await resized.jpeg().toFile(cachePicturePath)
  }
  var base64 = fs.readFileSync(`${dir}/${imageName}.jpeg`).toString('base64');

  const colors = getColors(pact?.type);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: colors.background,
        border: '40px solid black',
        fontSize: 32,
        fontWeight: 600
      }}
    >
      <div style={{ display:'flex', height: '80%', width: '100%', flexDirection: 'row'}}>
        {/* <img style={{display: 'flex', height: '420px', width: '560px'}} src={`${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/${pact.picture}`} /> */}
        <img style={{
            display: 'flex', 
            height: '420px', 
            width: '560px',
            // marginLeft: '-14px',
            // marginTop: '-14px',
          }}
          // width={560}
          // height={420}
          src={`data:image/jpeg;base64,${base64}`} 
          // src={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/og/${imageName}.jpeg`} 
        />
        {/* <div style={{display: 'flex', height: '420px', width: '560px', backgroundImage: `url(${process.env.NEXT_PUBLIC_APP_DOMAIN}/cache/${pact.picture}.jpeg)`}}>
          
        </div> */}
        <div style={{ display: 'flex', flexDirection:'column', width: '500'}}>
          <div
            style={{
              // left: 42,
              // top: 42,
              width: '500',
              display: 'flex',
              flexDirection: 'row',
              // alignContent: 'baseline',
              alignContent: 'center',
              // alignItems: 'stretch',
              alignItems: 'flex-start',
              // alignContent: 'stretch',
              gap: '14',
              justifyContent: 'space-between',
              margin: 30
              // alignItems: 'center',
            }}
          >
          <div style={{display: 'flex', fontSize: 28, color: colors.accent, alignItems: 'baseline', gap: 12}}>
            <span style={{display: 'flex', borderRadius: 40, backgroundColor: colors.accent, height: 24, width: 24}}></span>
            <span style={{display: 'flex', lineHeight: '28px'}}>{pact.type}</span>
          </div>
          <div style={{display: 'flex'}}>
            <LogoBrand height={32} white={false} />
          </div>
        </div>
        <div
          style={{
            // left: 42,
            // top: 42,
            // width: '500',
            display: 'flex',
            fontFamily: 'Chillax',
            // flexDirection: 'row',
            // alignContent: 'baseline',
            // alignContent: 'center',
            // alignItems: 'stretch',
            // alignItems: 'flex-start',
            // alignContent: 'stretch',
            // gap: '14',
            // justifyContent: 'space-between',
            margin: 30,
            fontSize: 38,
            lineHeight: '42px',
            // alignItems: 'center',
          }}
        >
          {pact.title}
        </div>
      </div>
      
    </div>
    <div style={{ 
      display:'flex',
      height: '20%',
      width: '1000px',
      flexDirection: 'row',
      alignItems: 'center',
      margin: '0 40px',
      justifyContent: 'space-between'
    }}>
      <div style={{display: 'flex', gap: 12, alignItems: 'flex-end'}}>
        <IconSig height={24} color={colors.accent} style={{marginBottom: '6px'}} />
        <span style={{color: colors.accent, }}>{formatNumber(stats?.total)}</span>
        <span style={{display: 'flex', fontSize: 18, lineHeight: '30px', fontWeight: 300}}>total signatures</span>
      </div>
      <div style={{display: 'flex', gap: 12, alignItems: 'flex-end'}}>
        <VerifiedIcon height={24} color={colors.accent} style={{marginBottom: '6px'}} />
        <span style={{color: colors.accent, }}>{formatNumber(stats?.verified)}</span>
        <span style={{display: 'flex', fontSize: 18, lineHeight: '30px', fontWeight: 300}}>verified signatures</span>
      </div>
      <div style={{display: 'flex', gap: 12, alignItems: 'flex-end'}}>
        <ViewIcon height={16} color={colors.accent} style={{marginBottom: '10px'}} />
        <span style={{color: colors.accent, }}>{formatNumber(stats?.views)}</span>
        <span style={{display: 'flex', fontSize: 18, lineHeight: '30px', fontWeight: 300}}>total views</span>
      </div>
    </div>
  </div>

  )
}
