import Head from "next/head";
import { FC } from "react";

export interface MetaProps {
  title?: string;
  description?: string;
  imageSrc?: string;
}

export const Metas: FC<MetaProps> = ({ title, description, imageSrc }) => {
  if (!imageSrc) imageSrc = `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/og/default`
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}/>
      <meta
        property="og:image"
        content={imageSrc} />
      <meta
        property="og:type"
        content="website" />
      <meta
        property="og:title"
        content={title} />
      <meta
        property="og:description"
        content={description}
      />

      <meta
        name="twitter:card"
        content="summary_large_image" />
      <meta
        name="twitter:site"
        content="@doingud" />
      <meta
        name="twitter:title"
        content={title} />
      <meta
        name="twitter:description"
        content={description}
      />
      <meta
        name="twitter:image"
        content={imageSrc} />
      {/* <meta property="twitter:domain" content="testnet.pact.social" /> */}

      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  )
}
