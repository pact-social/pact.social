import type { NextPage } from 'next'
import Image from 'next/image';
import Hero from '../components/hero';
import Highlights from '../components/highlights';
import Layout from '../components/layout';

const ShareLink = ({ label, imageSrc, shape }: {label: string; imageSrc: string; shape?: string;}) => {
  return (
    <div className='flex flex-col gap-2 items-center hover:scale-110 transition-all'>
        <figure
          className='drop-shadow-xl'
        >
        <img 
          src={imageSrc}
          // height={100}
          // width={100}
          className={`mask mask-${shape || 'squircle'} max-h-24`}
          alt=''
        />
        </figure>
        <a className='text-violet-500 font-bold'>{label}</a>
      </div>
  )
}

const Home: NextPage = () => {
  
  return (
    <Layout metas={{
      title: 'pact.social',
      description: 'decentralized petition and manifest for change and impact'
    }}>

      <div className='container max-w-2xl  flex flex-col gap-5 my-12'>
      <h1 className='text-5xl font-extrabold'>About us</h1>
      <div className='divider'></div>
      <p>
        this app is for manifest, for people to make petitions.
      </p>
      <p>
      For example: human rights, laws, justice, conflicts, petitions to save the planet,...ETC
      </p>
      <div className='divider my-16'></div>
      <p>
        now that you know what we are about you can send this  to someone or post this somewhere!
      </p>
      <a className='btn btn-primary'>send/post</a>
      
      <div className='flex justify-center gap-3'>  
        <ShareLink 
          label='Twitter'
          imageSrc='https://images.unsplash.com/photo-1676715051398-ce7f932dcd5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3063&q=80'
          shape='heart'
        />
        <ShareLink 
          label='Facebook'
          imageSrc='https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3276&q=80'
        />
        <ShareLink 
          label='Snapchat'
          imageSrc='https://images.unsplash.com/photo-1611162617263-4ec3060a058e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2748&q=80'
          shape='heart'
        />
        <ShareLink 
          label='Etc'
          imageSrc='https://images.unsplash.com/photo-1679189789181-06448aa7c382?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=4228&q=80'
          shape='heart'
        />
      </div>
  

      {/* https://images.unsplash.com/photo-1611162617263-4ec3060a058e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2748&q=80 */}
      </div>

    </Layout>
  );
}

export default Home
