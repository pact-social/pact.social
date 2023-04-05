import Image from 'next/image';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BasicProfile } from "@datamodels/identity-profile-basic"
import { useState } from "react"
import { useCeramicContext } from "../context"
import { authenticateCeramic, logoutCeramic } from "../utils"
import { useAccount } from 'wagmi'
import Link from 'next/link';
import { getMySignatures } from '../lib/getMySignature';

export default function NavBar() {
  const { ceramic, composeClient, dispatch} = useCeramicContext()
  const [profile, setProfile] = useState<BasicProfile | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  const account = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      const provider = await connector?.getProvider()
      const did = await authenticateCeramic(address, provider, ceramic, composeClient)
      dispatch({
        type: 'setDID',
        payload: { did }
      })
      // TODO: if user reject siwe message, add a place/button/banner for him to sign again later
      // on mobile, a button is required before triggering a wallet signature. Best way would be to implement rainbowkit custom auth
      await getProfile()
    },
    async onDisconnect() {
      await logoutCeramic(ceramic, composeClient)
      setProfile(undefined)
    },
  });

  const getProfile = async () => {
    setLoading(true)
    if(ceramic.did !== undefined) {
      const profileResult = await composeClient.executeQuery(`
        query {
          viewer {
            basicProfile {
              id
              name
              description
              gender
              emoji
            }
          }
        }
      `);
      const signs = await getMySignatures();
      const ceramicAccount = profileResult?.data?.viewer as any
      setProfile(ceramicAccount?.basicProfile || { name: 'anon' })
      setLoading(false);
    }
  }

  /**
   * On load check if there is a DID-Session in local storage.
   * If there is a DID-Session we can immediately authenticate the user.
   * For more details on how we do this check the 'authenticateCeramic function in`../utils`.
   */
  
  return (
    <div className="navbar glass sticky top-0 z-50">
      <div className="container">
        <div className="navbar-start">
          <Link 
            className="btn btn-ghost normal-case text-xl text-primary"
            href="/"
          >
            <Image
              priority
              src={'/logo.svg'}
              height={32}
              width={32}
              alt="pact.social"
              className="mr-3"
            />
            pact.social
          </Link>
        </div>
        <div className="navbar-center lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                href={'/m/create'}
              >
                Start Petition
              </Link>
            </li>
            <li>
              <Link
                href={'/p/my-petitions'}
              >
                My Petitions
              </Link>
            </li>
            <li><a>Explore</a></li>
            <li>
              <Link
                href={'/about-us'}
                className='btn btn-accent'
              >
                <span >about us</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex">
          <ConnectButton/>
        </div>
      </div>
    </div>
  )
}
