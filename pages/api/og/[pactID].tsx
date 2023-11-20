import fs from 'fs';
import satori from 'satori';
import sharp from 'sharp';
import path from 'path';
import type { NextApiRequest, NextApiResponse } from 'next';
// import { type IncomingMessage,  get as unsecureGet  } from 'http';
import fetch from 'node-fetch';
import { Maybe, Pact, PactType } from '../../../src/gql';
import { getPact } from '../../../lib/getPact';
import { Resvg } from '@resvg/resvg-js'
// import { formatNumber } from '../../../utils/stats';
import LogoBrand from '../../../components/svg/logoBrand';
// import IconSig from '../../../components/svg/noun-signature';
import VerifiedIcon from '../../../components/svg/verifiedIcon';
// import ViewIcon from '../../../components/svg/viewIcon';
import Logo from '../../../components/svg/logo';
import Image from 'next/image';

export default async function handle (req: NextApiRequest, res: NextApiResponse) {
  const dir = './.next/cache/og/images'
  const tR = performance.now()
  const pactID = req.query.pactID as string;
  const output = req.query.output as string;
  try {
    const pact = await getPact({streamID: pactID})

    const cachePicturePath = path.resolve(`${dir}/${pact.id}-${pact.version}.jpeg`)
    let data
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(cachePicturePath)) {
      data = await generateOg(pact)
      fs.writeFileSync(cachePicturePath, data)
    } else {
      data = fs.readFileSync(cachePicturePath)
    }
    
    
    res.statusCode = 200;
    res.setHeader("Content-Type", "image/jpeg");
    if (process.env.NODE_ENV === 'production') {
      res.setHeader(
        "Cache-Control",
        "public, s-maxage=3600, max-age=3600, stale-while-revalidate=60"
      );
    }
    // console.info('✨ Done in', performance.now() - tR, 'ms')
    return res.end(data);  
  } catch (error) {
    console.log('error', error)
    return res.status(500).end()
  }
  
}

async function generateOg(pact: Pact) {
  const roboto = fs.readFileSync('./public/fonts/roboto/Roboto-Bold.ttf')
  const robotoLight = fs.readFileSync('./public/fonts/roboto/Roboto-Light.ttf')
  const chillax = fs.readFileSync('./public/fonts/chillax/Fonts/WEB/fonts/Chillax-Bold.ttf')
  // const tT = performance.now()
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
  
  // if (output === 'svg') {
  //   res.setHeader("Content-Type", "image/svg+xml");
  //   if (process.env.NODE_ENV === 'production') {
  //     res.setHeader(
  //       "Cache-Control",
  //       "public, no-transform, s-maxage=3600, max-age=3600"
  //     );
  //   }
  //   return res.end(svg);
  // }

  const tResvg = performance.now()
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  })
  const pngData = resvg.render()
  // console.info('✨ resvg Done in', performance.now() - tResvg, 'ms')
  const tPng = performance.now()
  const pngBuffer = pngData.asPng()
  // console.info('✨ resvg png Done in', performance.now() - tPng, 'ms')
  const t1 = performance.now()
  const data = await sharp(pngBuffer)
  .resize(1200)
  .jpeg(
    {
    quality: 85,
    chromaSubsampling: '4:4:4'
    }
  )
  .toBuffer();
  // console.info('✨ PNG to JPEG Done in', performance.now() - t1, 'ms')
  return data
}


async function getReadStream(url: string) {
  const req = await fetch(url);
  return req.body
  // return new Promise((resolve, reject) => {
  //   req.on('response', (response) => {
  //     response.pause(); // -> this solves the issue
  //     if (response.statusCode === 200) {
  //       resolve(response);
  //     } else {
  //       reject(new Error('Error ' + response.statusCode));
  //     }
  //   });
  //   req.on('error', reject);
  // });
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
  // const { data, error } = await supabase.rpc('sign_stats_stream', { _streamid: pact.id})
  // const stats = data?.[0];
  const dir = './.next/cache/og'

  let imageName: string | undefined;
  let imageURI: string | undefined;
  if (pact.media) {
    imageName = pact.media[0]?.cid;
    imageURI = `${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/${pact.media[0]?.cid}`
  } else if (pact.image) {
    imageName = (new URL(pact.image)).pathname.replace(/\//g, '_')
    imageURI = pact.image
  }
  if (pact.media && !imageName) {
    const image = pact.media && pact.media[0]?.item;

    if (image) {
      imageName = (new URL(image)).pathname.replace(/\//g, '_')
      imageURI = image
    }
  }
  let base64

  if (imageURI && imageName) {
    const cachePicturePath = path.resolve(`${dir}/${imageName}-${pact.version}.jpeg`)
  
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir, { recursive: true });
    }
    if (!fs.existsSync(cachePicturePath)) {
      const resizer = sharp()
        .resize(600, 600, {
          // kernel: sharp.kernel.nearest,
          fit: sharp.fit.cover,
          position: sharp.strategy.entropy
          // background: { r: 255, g: 255, b: 255, alpha: 0.5 }
        })
      const image = await getReadStream(imageURI)
      const resized = image?.pipe(resizer)
      await resized?.jpeg().toFile(cachePicturePath)
    }
    base64 = fs.readFileSync(`${dir}/${imageName}-${pact.version}.jpeg`).toString('base64');
  
    if (!base64) {
      console.log('empty base64')
    }
  }

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
        backgroundColor: 'black',
        // border: '40px solid black',
        fontSize: 32,
        fontWeight: 600
      }}
    >
      <div style={{
        display: 'flex',
        position: 'absolute',
        height: '100%',
        width: '100%',
        // background: `linear-gradient(125deg, rgba(240,0,184,0.7) 0%, rgba(21,21,236,1) 100%)`,
        background: `${base64 ? `url(data:image/jpeg;base64,${base64})` : 'transparent'}`,
        // backdropFilter: 'blur(12px)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        filter: base64 ? 'blur(32px)' : 'none',
      }}>
        <div style={{
          display: 'flex',
          position: 'absolute',
          height: '100%',
          width: '100%',
          background: `linear-gradient(125deg, rgba(240,0,184,0.6) 0%, rgba(21,21,236,0.6) 100%)`,
          // background: `url(data:image/jpeg;base64,${base64})`,
          // backgroundSize: 'cover',
          // backdropFilter: 'blur(12px)',
          // zIndex: '10'
          // filter: 'blur(12px)',
        }}></div>
      </div>
      <div style={{ 
        display:'flex', 
        height: '100%', 
        width: '100%', 
        flexDirection: 'row',
        
      }}>
        {/* <img style={{display: 'flex', height: '420px', width: '560px'}} src={`${process.env.NEXT_PUBLIC_IPFS_GATEWAY}/${pact.picture}`} /> */}
        <div style={{
          display: 'flex',
          height: '100%',
          width: '50%',
          padding: '40px 40px 40px 40px',
          // padding: '40px 40px 40px 40px',
          // position: 'relative',
          // borderRadius: '48px',
          // objectFit: 'contain',
          // aspectRatio: '2/3',
          alignItems: 'center',
          justifyContent: 'center',
          justifyItems: 'center'
        }}>
          {/* <div style={{display: 'flex', flex: 1, position: 'relative'}}> */}

          {/* <div style={{
              display: 'flex',
              // position: 'absolute',
              // margin: '40px 40px 40px 40px',
              borderRadius: '18px',
              boxShadow: ' 10px 10px 80px rgba(0,0,0,0.4)',
              // maxWidth: '100%',
              // maxHeight: '100%',
              height: '100%',
              width: '100%',
              // height: '100%',
              aspectRatio: '1/2',
              // flex: 1,
              // height: '50%',
              backgroundRepeat: 'no-repeat',
              backgroundImage: `url(data:image/jpeg;base64,${base64})`,
              // backgroundSize: '100% auto',
              objectFit: 'cover',
              backgroundPosition: 'center',
              // height: '420px',
              // width: '560px',
              // marginLeft: '-14px',
              // marginTop: '-14px',
            }}
            // width={560}
            // height={420}
            // src={`data:image/jpeg;base64,${base64}`} 
            // src={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/og/${imageName}.jpeg`} 
          >
          </div> */}
          {base64 &&
            // eslint-disable-next-line @next/next/no-img-element
              // <Image
              //   src={`data:image/jpeg;base64,${base64}`} 
              //   alt=''
              //   height={600}
              //   width={600}
              //   objectFit='cover'
              //   className="flex w-full h-full"
              // />
              <img 
                style={{
                  display: 'flex',
                  // objectFit: 'cover',
                  borderRadius: '18px',
                  boxShadow: ' 10px 10px 80px rgba(0,0,0,0.4)',
                  aspectRatio: '1/1',
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  objectPosition: '50% 50%',
                  backgroundPosition: '100%',
                  // backgroundRepeat: 'no-repeat',
                  // backgroundImage: `url(data:image/jpeg;base64,${base64})`,
                  // backgroundSize: 'cover',
                  // width: '100%',
                }}
                alt=''
                src={`data:image/jpeg;base64,${base64}`} 
              />
          }
          {!base64 &&
            <div style={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              aspectRatio: '1/1',
              background: 'linear-gradient(125deg, rgba(240,0,184,0.6) 0%, rgba(21,21,236,0.6) 100%)',
              borderRadius: '18px',
              boxShadow: ' 10px 10px 80px rgba(0,0,0,0.4)',
              justifyContent: 'center',
            }}>
              <Logo height={120} white />
            </div>

            // <div
            //   style={{
            //     display: 'flex',
            //     background: 'linear-gradient(125deg, rgba(240,0,184,0.7) 0%, rgba(21,21,236,1) 100%)',
            //     height: '100%',
            //     width: '100%',
            //   }}
            // >
            // </div>
          }
            {/* Helloooo */}
          {/* </div> */}
        </div>
        {/* <div style={{display: 'flex', height: '420px', width: '560px', backgroundImage: `url(${process.env.NEXT_PUBLIC_APP_DOMAIN}/cache/${pact.picture}.jpeg)`}}>
          
        </div> */}
        <div style={{ 
          display: 'flex',
          flexDirection:'column',
          width: '50%',
          padding: '80px 30px',
          // justifyItems: 'stretch',
          // alignContent: 'space-between',
          justifyContent:'space-between'
        }}>
          <LogoBrand height={42} white={true} isTestnet={false} />
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
              // margin: 30
              // alignItems: 'center',
            }}
          >
          {/* <div style={{display: 'flex', fontSize: 28, color: colors.accent, alignItems: 'baseline', gap: 12}}>
            <span style={{display: 'flex', borderRadius: 40, backgroundColor: colors.accent, height: 24, width: 24}}></span>
            <span style={{display: 'flex', lineHeight: '28px'}}>{pact.type}</span>
          </div> */}
          
        </div>
        
        <div style={{
          display: 'flex', 
          flexDirection: 'column',
          // marginTop: '-48px',
          width: '100%',
          maxHeight: '100%',
        }}>
          <div style={{
            display: 'flex',
            fontSize: 28,
            color: colors.accent,
            alignItems: 'baseline',
            gap: 12,
            marginBottom: '12px',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              // background: 'white',
              borderRadius: '12px',
              padding: '16px 0px',
              gap: 12,
            }}>

            <span style={{display: 'flex', borderRadius: 40, backgroundColor: colors.accent, height: 24, width: 24}}></span>
            <span style={{display: 'flex', lineHeight: '28px'}}>{pact.type}</span>
            </div>
          </div>
          <div
            style={{
              // left: 42,
              // top: 42,
              // width: '500',
              display: 'flex',
              fontFamily: 'Chillax',
              width: '100%',
              // height: '50%',
              // flexDirection: 'row',
              // alignContent: 'baseline',
              // alignContent: 'center',
              // alignItems: 'stretch',
              // alignItems: 'flex-start',
              // alignContent: 'stretch',
              // gap: '14',
              // justifyContent: 'space-between',
              margin: '0 0 80px',
              paddingRight: '12px',
              fontSize: 58,
              lineHeight: '58px',
              color: 'white',
              lineClamp: 2,
              WebkitLineClamp: 2,
              overflow: 'hidden',
              // wordWrap: 'break-word',
              // alignItems: 'center',
            }}
          >
            {pact.title}
          </div>
        <div style={{
          display: 'flex',
          paddingBottom: '12px',
          justifyContent:'space-between',
          alignItems: 'center',
        }}>
          <div style={{
            display: 'flex',
            gap: 12,
            alignItems: 'baseline',
            // justifyContent: 'center',
            backgroundColor: colors.accent,
            padding: '14px 20px',
            borderRadius: 18,
            fontFamily: 'Roboto',
            boxShadow: ' 10px 10px 80px rgba(0,0,0,0.4)',
          }}>
            <VerifiedIcon height={32} color="white" style={{marginBottom: '8px'}} />
            <span style={{color: 'white', fontSize: 32 }}>Sign Now</span>
          </div>
        </div>
        </div>
      </div>
      
    </div>
    
  </div>

  )
}
