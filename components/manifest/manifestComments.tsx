import "@orbisclub/components/dist/index.modern.css";

import dynamic from 'next/dynamic'

const Discussion = dynamic(() => import('@orbisclub/components').then((mod) => mod.Discussion), {
  ssr: false,
});

export default function ManifestComments () {
  return (
    <div className=" min-w-[38rem]">
      <Discussion />
    </div>
  );  
}
