import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local'
import { Roboto } from 'next/font/google'

import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
  darkTheme,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { AnalyticsProvider } from 'use-analytics'

import {CeramicWrapper} from "../context";
import NavBar from '../components/navbar';
import { LitProvider } from '../context/lit';
import analytics from '../context/analytics';
import { ReactElement, ReactNode } from 'react';
import { type NextPage } from 'next';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { wallets } = getDefaultWallets({
  appName: 'pact.social',
  chains,
});

const appInfo = {
  appName: 'pact.social',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ chains }),
      trustWallet({ chains }),
      ledgerWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

const arrayFont = localFont({
  src: [
    {
      path: '../public/fonts/array/Fonts/WEB/fonts/Array-Wide.woff2',
      weight: '400',
      style: 'normal',
    }
  ],
  variable: '--font-array'
})

const chillaxFont = localFont({
  src: [
    {
      path: '../public/fonts/chillax/Fonts/WEB/fonts/Chillax-Variable.woff2',
      weight: '200 700',
      style: 'normal',
    }
  ],
  variable: '--font-chillax'
})
const roboto = Roboto({
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  
  const getLayout = Component.getLayout ?? ((page) => page)
  
  return (
    <main className={`${roboto.variable} ${arrayFont.variable} ${chillaxFont.variable} font-sans`}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider appInfo={appInfo} chains={chains} theme={darkTheme({
          accentColor: '#f000b8',
        })}>
          <CeramicWrapper>
            <AnalyticsProvider instance={analytics}>
            <LitProvider>
              <NavBar>
                {getLayout(<Component {...pageProps} ceramic />)}
              </NavBar>
              <div id="portal"></div>
            </LitProvider>
            </AnalyticsProvider>
          </CeramicWrapper>
        </RainbowKitProvider>
      </WagmiConfig>
    </main>
  );
}

export default MyApp
