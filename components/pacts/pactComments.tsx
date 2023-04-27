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
    <div className=" min-w-[38rem]">
      <Discussion context={context}/>
    </div>
  );  
}
