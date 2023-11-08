import type { NextPage } from 'next'
import Layout from '../components/layout';
import Image from 'next/image';
import Link from 'next/link';

const Custom404: NextPage = () => {
  
  return (
    <Layout 
      metas={{
        title: 'pact.social 404',
        description: 'decentralized petition and manifest for change and impact'
      }}
      noContainer
    >
      <div className="container min-h-[calc(100dvh-11.5rem)] flex flex-col items-center justify-center gap-10">
        <div className="flex max-h-56">
          <Image 
            src={`${process.env.NEXT_PUBLIC_APP_DOMAIN}/404.svg`}
            alt="404, page not found"
            width="1252"
            height="696"
          />
        </div>
        <div className="font-title font-bold text-3xl max-w-xl text-center">
          Sorry, We couldn&apos;t find what you are looking for!
        </div>
        <Link
          href="/"
          className="btn btn-secondary"
        >
          Home
        </Link>
      </div>

    </Layout>
  );
}

export default Custom404
