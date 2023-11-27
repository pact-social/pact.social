import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
import localFont from 'next/font/local'
import { Roboto } from 'next/font/google'
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import localizedFormat from 'dayjs/plugin/localizedFormat';
import {
  RainbowKitProvider,
  getDefaultWallets,
  darkTheme,
  connectorsForWallets,
  DisclaimerComponent,
} from '@rainbow-me/rainbowkit';
import { walletConnectWallet } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, goerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { AnalyticsProvider } from 'use-analytics'

import { StytchProvider } from '@stytch/nextjs';
import { createStytchUIClient } from '@stytch/nextjs/ui';

import {CeramicWrapper} from "../context";
import NavBar from '../components/navbar';
import { LitProvider, litClient } from '../context/lit';
import analytics from '../context/analytics';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import { type NextPage } from 'next';
import { AuthenticationProvider } from '../context/authentication';
import { PKPGoogleConnector } from '../lib/pkpGoogleConnector';
import { PKPStytchConnector } from '../lib/pactOtpProvider';
// import { WalletConnectConnectorOptions } from '@rainbow-me/rainbowkit/dist/wallets/getWalletConnectConnector';
// import { WalletConnectWalletOptions } from '@rainbow-me/rainbowkit/dist/wallets/walletConnectors/walletConnectWallet/walletConnectWallet';
import EmojiAvatar from '../components/avatar/emojiAvatar';


dayjs.extend(relativeTime)
dayjs.extend(localizedFormat)

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string

const { chains, publicClient } = configureChains(
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
  projectId,
  chains,
});

const defaultWallets = wallets[0].wallets.filter((wall) => wall.id !== 'walletConnect')

defaultWallets.push(
  walletConnectWallet({
    projectId,
    chains,
    options: {
      projectId,
      qrModalOptions: {
        themeMode: 'dark',
        themeVariables: {
          '--wcm-z-index': '1000',
          // '--wcm-background-color': 'pink',
          // '--w3m-z-index': '10000'
        },
      }
    },
  })
)
wallets[0].wallets = defaultWallets

const appInfo = {
  appName: 'pact.social',
  learnMoreUrl: 'https://pact-social.gitbook.io/pact.social/faq/how-to-connect',
};
const stytchConnector = new PKPStytchConnector({
  chains,
  options: {
    lit: litClient
  },
})

const connectors = connectorsForWallets([
  {
    groupName: 'Easy',
    wallets: [
      {
        id: 'google-pkp',
        name: 'sign-in with Google',
        iconUrl: '/google.svg',
        iconBackground: '',
        installed: true,
        createConnector: () => {
          return {
            connector: new PKPGoogleConnector({
              chains,
              options: {
                lit: litClient
              },
            }),
            mobile: {
              getUri: async () => {
                await litClient.googleLogin()
                return ''
              },
            },
            desktop: {
              getUri: async () => {
                await litClient.googleLogin()
                return ''
              },
            },
            qrCode: {
              getUri: async () => {
                await litClient.googleLogin()
                return ''
              },
            },
          }
        }
      },
      {
        id: 'email-pkp',
        name: 'sign-in with email',
        iconUrl: '/email.svg',
        iconBackground: '',
        installed: true,
        createConnector: () => {
          return {
            connector: stytchConnector,
            mobile: {
              getUri: async () => {
                return stytchConnector.getUri()
              },
            },
            desktop: {
              getUri: async () => {
                return stytchConnector.getUri()
              },
            },
            qrCode: {
              getUri: async () => {
                return stytchConnector.getUri()
              },
            },
          }
        }
      }
    ],
  },
  ...wallets,
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
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

const stytch = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || ''
);

const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
  <Text>
    By connecting your wallet, you agree to the{' '}
    <Link href="https://pact.social/privacy">Personal Data Protection Policy</Link> and
    acknowledge you have read and understand the protocol{' '}
    <Link href="https://pact-social.gitbook.io/pact.social/legal-stuff/code-of-conduct">Code of Conduct</Link>
  </Text>
);

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  
  const getLayout = Component.getLayout ?? ((page) => page)
  
  return (
    <main className={`${roboto.variable} ${arrayFont.variable} ${chillaxFont.variable} font-sans`}>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider 
            appInfo={{
              ...appInfo,
              disclaimer: Disclaimer,
            }}
            chains={chains}
            theme={darkTheme({
              accentColor: '#f000b8',
            })}
            avatar={EmojiAvatar}
          >
            <CeramicWrapper>
              <LitProvider>
                <StytchProvider stytch={stytch}>
                  <AuthenticationProvider>
                    <AnalyticsProvider instance={analytics}>
                      <NavBar>
                        {getLayout(<Component {...pageProps} ceramic />)}
                      </NavBar>
                      <div id="portal"></div>
                    </AnalyticsProvider>
                  </AuthenticationProvider>
                </StytchProvider>
              </LitProvider>
            </CeramicWrapper>
          </RainbowKitProvider>
        </WagmiConfig>
    </main>
  );
}

export default MyApp
