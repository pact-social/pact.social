import type { GetStaticPaths, GetStaticProps, NextPage } from "next/types";
import { SWRConfig, unstable_serialize } from "swr";
import Layout from "../../components/layout";
import { getCollectionPacts } from "../../lib/getCollectionPacts";
import CollectionBody from "../../components/collections/collectionBody";

export const getStaticPaths: GetStaticPaths<{ type: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  if (!params?.collectionID) {
    return {
      notFound: true,
    }
  }
  const collectionID = params.collectionID as string;
  
  try {
    const resp = await getCollectionPacts({ collectionID })
    
    return { 
      props: {
        fallback: {
          [unstable_serialize({
            path: '/collections',
            collectionID,
          }
          )]: resp
        },
        collectionID,
        title: resp.name,
        description: resp.description,
        image: resp.media?.at(0)?.item || ''
      }, 
      revalidate: 30
    }
  } catch(err) {
    return {
      notFound: true,
    }
  }

}

export const CollectionPage: NextPage<{
  fallback: Object;
  collectionID: string;
  title?: string;
  description?: string;
  image?: string;
}> = ({ fallback, collectionID, title, description, image }) => {

  return (
    <Layout metas={{
      title: `${title} - pacts collection`,
      description: description || 'decentralized petition and manifest for change and impact',
      imageSrc: image,
    }}>
      <SWRConfig value={{ fallback }}>
        <div>
          <CollectionBody collectionID={collectionID} />
        </div>
      </SWRConfig>
    </Layout>
  )
}

export default CollectionPage
