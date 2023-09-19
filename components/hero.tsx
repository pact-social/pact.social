import Image from 'next/image'
import Link from 'next/link'
import Divider from './svg/divider'
import { ReactElement } from 'react'

export type HeroProps = {
  media?: {
    image: string;
    alt: string;
    title: string;
    subtitle: string;
    ratio?: string;
  }
  title?: string;
  description?: string;
  extra?: ReactElement;
}

export default function Hero({ ...props }: HeroProps) {
  return (
    <>
      <div className="hero hero-split">
        <div className="hero-content">
          <div className="hero-img flex-1 relative lg:border-white lg:border-r-[1rem] lg:border-b-[1rem]">
        {props.media &&
            <figure className="relative">
              <Image
                src={props.media?.image} 
                alt=""
                width={800}
                height={800}
                className={`aspect-[${props.media?.ratio || '1/1'}] object-cover`}
              />
            </figure>
          }
            <div className="absolute bottom-0 sm:bottom-10 xl:bottom-20 max-w-full min-w-[80%] lg:max-w-[90%] bg-[#f4fffb]/80 backdrop-blur-md font-sans p-8 py-3">
              <div className="pb-2 font-light">
                <div className="h-[0.875rem] w-[0.875rem] bg-secondary inline-flex rounded-2xl mr-2"></div>
                {props.media?.title}
              </div>
              <h2 className="text-xl font-bold">
              {props.media?.subtitle}
              </h2>
            </div>
          </div>
          <div className="hero-details mb-40 mt-9 sm:mt-12 lg:mt-0">
            <h1 className="text-5xl font-bold">{props.title}</h1>
            <p className="py-3 text-4xl xl:text-5xl font-medium">{props.description}</p>
            {props.extra}
          </div>
        </div>
      </div>
    </>
  )
}
