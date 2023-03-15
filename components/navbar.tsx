import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BasicProfile } from "@datamodels/identity-profile-basic"
import { useEffect, useState } from "react"
import { useCeramicContext } from "../context"
import { authenticateCeramic, logoutCeramic } from "../utils"
import { useAccount } from 'wagmi'

export default function NavBar() {
  const clients = useCeramicContext()
  const { ceramic, composeClient } = clients
  const [profile, setProfile] = useState<BasicProfile | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  const account = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
      const provider = await connector?.getProvider()
      await authenticateCeramic(address, provider, ceramic, composeClient)
      // TODO: if user reject siwe message, add a place/button/banner for him to sign again later
      await getProfile()
      // console.log('ceramic authenticated', ceramic, composeClient)
    },
    async onDisconnect() {
      console.log('Disconnected')
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
    <div className="navbar bg-primary text-primary-content shadow-xl rounded-box mb-4 sticky top-0 z-10">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Pact.Social</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li><a>Item 1</a></li>
          <li tabIndex={0}>
            <a>
              Parent
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
            </a>
            <ul className="p-2 bg-base-100 text-black">
              <li><a>Submenu 1</a></li>
              <li><a>Submenu 2</a></li>
            </ul>
          </li>
          <li><a>Item 3</a></li>
        </ul>
        <ConnectButton/>
      </div>
    </div>
  )
}
