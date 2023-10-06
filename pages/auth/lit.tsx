import { useEffect } from "react"
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { useCeramicContext } from "../../context";

export default function AuthLit () {
  const { push } = useRouter()
  const { state: { isAuthenticated }} = useCeramicContext()

  useEffect(() => {
    if (isAuthenticated) {
      push('/')
    }
  }, [isAuthenticated, push])

  return (
    <Layout 
      metas={{
        title: 'pact.social',
        description: 'decentralized petitions, manifestos and open-letters for change and impact',
        // imageSrc: `${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/og/default`
      }}
    >
      <div className="flex items-center justify-center h-full">
        <div className="flex gap-3 items-center">
          <span className="loading loading-ring loading-lg"></span>
          <span>Securing your account</span>
        </div>
      </div>
    </Layout>
  )
}
