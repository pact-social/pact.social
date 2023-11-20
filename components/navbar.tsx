import { ReactNode, useState } from "react"
import { useCeramicContext } from "../context"
import Link from 'next/link';
import LogoBrand from './svg/logoBrand';
import Footer from './footer';
import { useRouter } from 'next/router';
import { ProfileProvider } from '../context/profile';
import CustomConnectButton from './connect/customConnectButton';

type NavbarProps = {
  children: ReactNode;
}

export default function NavBar({ children }: NavbarProps) {
  const { ceramic, composeClient } = useCeramicContext()

  const [isDrawerOpen, setDrawerOpen] = useState<boolean>(false);
  const toggle = () => setDrawerOpen(!isDrawerOpen);

  /**
   * On load check if there is a DID-Session in local storage.
   * If there is a DID-Session we can immediately authenticate the user.
   * For more details on how we do this check the 'authenticateCeramic function in`../utils`.
   */
  
  return (
    <ProfileWrapper>
      <div className="flex flex-col sm:flex-row w-full items-center justify-center p-2 bg-manifesto gap-2 sticky top-0">
        <div className="text-white">🔥 Support us on Gitcoin GG19 🔥</div>
        <div className="flex gap-4 flex-col min-[320px]:flex-row flex-wrap justify-center">
          <a
            href="https://explorer.gitcoin.co/#/round/424/0x98720dd1925d34a2453ebc1f91c9d48e7e89ec29/0x98720dd1925d34a2453ebc1f91c9d48e7e89ec29-169"
            className="underline normal-case text-white"
            target="_blank"
          >
            Web3 Community Round
          </a>
          <a
            href="https://explorer.gitcoin.co/#/round/424/0xe60a569ec8aac2045d9fda306dc2a16cc1e52a90/0xe60a569ec8aac2045d9fda306dc2a16cc1e52a90-11"
            className="underline normal-case text-white"
            target="_blank"
          >
            OpenCivics Round
          </a>
        </div>
      </div>
      <div className="drawer">
        <input id="main-mobile-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} onChange={toggle} /> 
        <div className="drawer-content flex flex-col">
          <div className="sticky top-0 z-20">
            {/* infos bar */}
            {/* <div className="flex flex-col sm:flex-row w-full items-center justify-center p-2 bg-manifesto gap-2 sticky top-0">
              <div className="text-white">🔥 Support us on Gitcoin GG19 🔥</div>
              <div className="flex gap-4 flex-col min-[320px]:flex-row flex-wrap justify-center text-center">
                <a
                  href="https://explorer.gitcoin.co/#/round/424/0x98720dd1925d34a2453ebc1f91c9d48e7e89ec29/0x98720dd1925d34a2453ebc1f91c9d48e7e89ec29-169"
                  className=" underline normal-case text-white"
                  target="_blank"
                >
                  Web3 Community Round
                </a>
                <a
                  href="https://explorer.gitcoin.co/#/round/424/0xe60a569ec8aac2045d9fda306dc2a16cc1e52a90/0xe60a569ec8aac2045d9fda306dc2a16cc1e52a90-11"
                  className="underline normal-case text-white"
                  target="_blank"
                >
                  OpenCivics Round
                </a>
              </div>
            </div> */}
            {/* navbar */}
            <div className="navbar bg-black text-neutral-content min-h-[5rem]">
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
              <div className="flex-none hidden lg:flex lg:flex-1 lg:navbar-center justify-center">
                <ul className="menu menu-horizontal text-neutral-content px-1 bg-black" data-theme="dark">
                  <MenuItems/>
                </ul>
              </div>
              <div className="navbar-end flex-none hidden md:flex md:flex-1">
                <CustomConnectButton 
                  chainStatus="icon" 
                  showBalance={false} 
                  label="Connect"
                />
              </div>
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
        <div className="drawer-side z-30">
          <label htmlFor="main-mobile-drawer" className="drawer-overlay"></label> 
          <ul className="menu p-4 w-80 h-full backdrop-blur-lg bg-black/60 text-neutral-content" data-theme="dark">
            {/* Sidebar content here */}
            <li>
              <Link 
                className="normal-case text-xl text-primary my-4 mb-8"
                href="/"
                onClick={toggle}
              >
                <LogoBrand height={24} white></LogoBrand>
              </Link>
            </li>
            <li className="block">
              {/* <ConnectButton showBalance={false} chainStatus="icon" label="Connect"/> */}
              <CustomConnectButton 
                chainStatus="icon" 
                showBalance={false} 
                label="Connect"
              />
            </li>
            <li>
              <ul className="mt-4 menu">
                <MenuItems onClick={toggle}/>
              </ul>
            </li>
          </ul>
          
        </div>
      </div>
    </ProfileWrapper>
  )
}

const ProfileWrapper = ({ children, ...props}: NavbarProps) => {
  const { ceramic } = useCeramicContext()
  if (ceramic.did) {
    return <ProfileProvider did={ceramic.did}>{children}</ProfileProvider>
  }
  return (
    <>{children}</>
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
          href={'/explore/manifesto'}
          onClick={onClick}
          className={`${/^\/explore.*$/.test(router.pathname) && 'active bg-secondary text-slate-50'}`}
        >
          Explore
        </Link>
      </li>
      {/* <li>
        <Link
          href={'/about-us'}
          onClick={onClick}
          className={`${/^\/about-us.*$/.test(router.pathname) && 'active bg-secondary text-slate-50'}`}
        >
          About us
        </Link>
      </li> */}
    </>
  )
}
