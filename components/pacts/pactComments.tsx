import "@orbisclub/components/dist/index.modern.css";
import dynamic from 'next/dynamic'
import Head from "next/head";

const Discussion = dynamic(() => import('@orbisclub/components').then((mod) => mod.Discussion), {
  ssr: false,
});

type CommentsProps = {
  context: string;
}

export default function PactComments ({context}: CommentsProps) {

  return (
    <>
      <Head>
        <style>
          @import url(https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap);
        </style>
      </Head>
      <div className="lg:min-w-[38rem]">

        <Discussion 
          theme="kjzl6cwe1jw146ux7whrbgbovzyadihatxoqmp7vvaajym0bsdiw4zurbeik0g2"
          context={`${process.env.NEXT_PUBLIC_ORBIS_CONTEXT}:${context}`}
        />
      </div>
    </>
  );  
}
