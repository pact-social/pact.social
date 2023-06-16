import "@orbisclub/components/dist/index.modern.css";
import dynamic from 'next/dynamic'

const Discussion = dynamic(() => import('@orbisclub/components').then((mod) => mod.Discussion), {
  ssr: false,
});

type CommentsProps = {
  context: string;
}

export default function PactComments ({context}: CommentsProps) {
  return (
    <div className="lg:min-w-[38rem]">
      <style>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');
      </style>

      <Discussion 
        theme="kjzl6cwe1jw146ux7whrbgbovzyadihatxoqmp7vvaajym0bsdiw4zurbeik0g2"
        context={`${process.env.NEXT_PUBLIC_ORBIS_CONTEXT}:${context}`}
      />
    </div>
  );  
}
