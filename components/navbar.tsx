import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ReactNode, useState } from "react"
import { useCeramicContext } from "../context"
import { logoutCeramic } from "../utils"
import { useAccount } from 'wagmi'
import Link from 'next/link';
import useAuthCeramic from '../hooks/useAuthCeramic';
import LogoBrand from './svg/logoBrand';
import Footer from './footer';
import useLit from '../hooks/useLit';
import { useRouter } from 'next/router';
import { ProfileProvider } from '../context/profile';

type NavbarProps = {
  children: ReactNode;
}

export default function NavBar({ children }: NavbarProps) {
  const { ceramic, composeClient } = useCeramicContext()
  const {connectCeramic} = useAuthCeramic()
  const { connect: connectLit } = useLit()

  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const toggle = () => setDrawerOpen(!isDrawerOpen);

  useAccount({
    async onConnect({ address, connector, isReconnected }) {
      await connectCeramic()
      await connectLit()
    },
    async onDisconnect() {
      await logoutCeramic(ceramic, composeClient)
    },
  });


  /**
   * On load check if there is a DID-Session in local storage.
   * If there is a DID-Session we can immediately authenticate the user.
   * For more details on how we do this check the 'authenticateCeramic function in`../utils`.
   */
  
  return (
    <div className="drawer">
      <input id="main-mobile-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={toggle} /> 
      <div className="drawer-content flex flex-col" 
      >
        <div className="navbar bg-black text-neutral-content sticky top-0 z-50 min-h-[5rem]">
          <div className="container">
            <div className="navbar-start flex lg:w-auto xl:flex-1">
              <div className="flex-none lg:hidden">
                <label htmlFor="main-mobile-drawer" className="btn btn-square btn-ghost">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
              </div> 
              <Link 
                className="btn btn-ghost normal-case text-xl text-primary"
                href="/"
              >
                <LogoBrand height={24} white></LogoBrand>
              </Link>
            </div>
            <div className="flex-none hidden lg:flex lg:flex-1 lg:navbar-center">
              <ul className="menu menu-horizontal text-neutral-content px-1 bg-black" data-theme="dark">
                <MenuItems/>
              </ul>
            </div>
            <div className="navbar-end flex-none hidden md:flex md:flex-1">
              <ConnectButton chainStatus="icon" />
            </div>
          </div>
        </div>
        {/* Page Content */}
        {ceramic.did && 
          <ProfileProvider did={ceramic.did}>{children}</ProfileProvider>
        }
        {!ceramic.did && 
          <>{children}</>
        }

        <Footer />
      </div>
      <div className="drawer-side">
        <label htmlFor="main-mobile-drawer" className="drawer-overlay"></label> 
        <ul className="menu p-4 w-80 h-full backdrop-blur-lg bg-black/60 text-neutral-content" data-theme="dark">
          {/* Sidebar content here */}
          <Link 
            className="normal-case text-xl text-primary my-4 mb-8"
            href="/"
            onClick={toggle}
          >
            <LogoBrand height={24} white></LogoBrand>
          </Link>
          <ConnectButton showBalance={false} chainStatus="icon"/>
          <div className="mt-4 menu">
            <MenuItems onClick={toggle}/>
          </div>
        </ul>
        
      </div>
    </div>
  )
}

type MenuItemsProps = {
  onClick?: () => void;
}
const MenuItems = ({ onClick }: MenuItemsProps) => {
  const router = useRouter()

  return (
    <>
      <li>
        <Link
          href={'/m/create'}
          onClick={onClick}
          className={`${/^\/m\/create.*$/.test(router.pathname) && 'active bg-secondary text-slate-50'}`}
        >
          Start a Pact
        </Link>
      </li>
      <li>
        <Link
          href={'/p/my-profile'}
          onClick={onClick}
          className={`${/^\/p\/my-profile.*$/.test(router.pathname) && 'active bg-secondary text-slate-50'}`}
        >
          My Profile
        </Link>
      </li>
      <li>
        <Link
          href={'/explore/petition'}
          onClick={onClick}
          className={`${/^\/explore.*$/.test(router.pathname) && 'active bg-secondary text-slate-50'}`}
        >
          Explore
        </Link>
      </li>
      <li>
        <Link
          href={'/about-us'}
          onClick={onClick}
          className={`${/^\/about-us.*$/.test(router.pathname) && 'active bg-secondary text-slate-50'}`}
        >
          About us
        </Link>
      </li>
    </>
  )
}
