import Head from "next/head";
import { FC } from "react";

export interface MetaProps {
  title?: string;
  description?: string;
  imageSrc?: string;
}

export const Metas: FC<MetaProps> = ({ title, description, imageSrc }) => {
  return (
    <Head>
      <title>{title}</title>
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
    </Head>
  )
}
