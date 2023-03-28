import dynamic from 'next/dynamic'

const ConnectButton = dynamic(() => import('./connectButton'), {
  ssr: false,
});

export default ConnectButton
