import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BasicProfile } from "@datamodels/identity-profile-basic"
import { useState } from "react"
import { useCeramicContext } from "../context"
import { authenticateCeramic, logoutCeramic } from "../utils"
import { useAccount } from 'wagmi'
import Link from 'next/link';

export default function NavBar() {
  const { ceramic, composeClient, dispatch} = useCeramicContext()
  const [profile, setProfile] = useState<BasicProfile | undefined>()
  const [loading, setLoading] = useState<boolean>(false)

  const account = useAccount({
    async onConnect({ address, connector, isReconnected }) {
      console.log('Connected', { address, connector, isReconnected })
      const provider = await connector?.getProvider()
      const did = await authenticateCeramic(address, provider, ceramic, composeClient)
      dispatch({
        type: 'setDID',
        payload: { did }
      })
      // TODO: if user reject siwe message, add a place/button/banner for him to sign again later
      // on mobile, a button is required before triggering a wallet signature. Best way would be to implement rainbowkit custom auth
      await getProfile()
      console.log('ceramic authenticated', ceramic, composeClient)
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

      // const testTopic = await composeClient.executeQuery(`
      //   mutation newTopic {
      //     createTopic(input: {
      //       content: {
      //         name: "Free Speech"
      //       }
      //     }) {
      //       document {
      //         id
      //       }
      //     }
      //   }        
      // `)
      // const content = `\
      // Julian Assange the founder of WikiLeaks, is a publisher and the worl's foremost freedom of speech campaigner.\
      // Julian stands for informing the public about what their governments do in their name.\
      // WikiLeaks publications have exposed war crimes and corruption and have been used as evidence in court cases around the world.\
      // Since April 2019 Julian has been imprisoned in Belmarsh Prison in London, fighting extradition to the United States.\
      // Assange faces a 175 year prison sentence if extradited to the US merely for receiving and publishing truthful information in the public interest.
      // Who are we?
      // AssangeDAO is a multilingual cross-border collective governed by holders of the $JUSTICE token.\
      // We are united in our mission to Free Julian Assange.\
      // AssangeDAO has completed it's first objective in raising millions of dollars for Julian Assange's legal campaign and now continues forward with it's mission.\
      // We will initiate and support projects that can help directly or indirectly bring about Julian Assange's freedom and support causes that he cares about such as Freedom of Speech, Freedom of Information and Whistleblowing.
      // `;
      // const testManifest = await composeClient.executeQuery(`
      //   mutation newManifest {
      //     createManifest(input: {
      //       content: {
      //         scope: global,
      //         title: "Free Assange",
      //         content: ${JSON.stringify(content)},
      //         topicID: "kjzl6kcym7w8y9hpaet3h6eyiojfjvds1hw7m3g1ecci9gkm2mg281dsoriou4l"
      //       }
      //     }) {
      //       document {
      //         id
      //       }
      //     }
      //   }  
      // `)
      // console.log('new manifest created', testManifest)
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
              Pact.Social
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
