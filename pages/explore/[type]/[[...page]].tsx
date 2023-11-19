import { GetStaticPaths, GetStaticProps, NextPage } from "next/types";
import { SWRConfig } from "swr";

import Layout from "../../../components/layout";
import getPactsByType from "../../../lib/supabase/getPactsByType";
import PactsListType from "../../../components/explorer/pactsListType";

import ExplorerHeader from "../../../components/explorer/header";

export const getStaticPaths: GetStaticPaths<{ type: string }> = async () => {
  return {
    paths: [], //indicates that no page needs be created at build time
    fallback: 'blocking' //indicates the type of fallback
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  if (!params?.type) {
    return {
      notFound: true,
    }
  }
  const { type } = params;
  const [ page ] = params.page as Array<string> || ['1'];
  
  try {
    const resp = await getPactsByType(params.type as string, parseInt(page as string))

    return { 
      props: {
        fallback: {
          [`/api/type/${type}?page=${page || 1}`]: resp
        },
        count: resp.count,
        page,
        type,
      }, 
      revalidate: 30
    }
  } catch(err) {
    return {
      notFound: true,
    }
  }

}

export const Explore: NextPage<{fallback: Object; count: number; page: string; type: string}> = ({ fallback, count, page, type }) => {
  return (
    <Layout 
      metas={{
        title: `pact.social - Explore ${type}`,
        description: 'Explore petitions, manifestos and open-letters'
      }}
    >
      <SWRConfig value={{ fallback }}>
        <ExplorerHeader type={type} />
        <PactsListType type={type as string} page={parseInt(page as string)} count={count} />
      </SWRConfig>
    </Layout>
  )
}

export default Explore
