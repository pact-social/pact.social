import { GetStaticPaths, GetStaticProps, NextPage } from "next/types";
import Layout from "../../../../../components/layout";
import getPactsByTopicType from "../../../../../lib/supabase/getPactsByTopicType";
import { SWRConfig } from "swr";
import ExplorerHeader from "../../../../../components/explorer/header";
import PactsListTopic from "../../../../../components/explorer/pactsListTopic";

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
  const type = params.type as string;
  const topicID = params.topicID as string;
  const [ page ] = params.page as Array<string> || ['1'];
  
  try {
    const { data, count, error } = await getPactsByTopicType(topicID, type, parseInt(page))

    return { 
      props: {
        fallback: {
          [`/api/topics/${type}/${topicID}?page=${page || 1}`]: { data, count }
        },
        count: count,
        page,
        type,
        topicID,
      }, 
      revalidate: 30
    }
  } catch(err) {
    return {
      notFound: true,
    }
  }

}

export const ExploreByTopic: NextPage<{
  fallback: Object; 
  count: number; 
  page: string; 
  type: string; 
  topicID: string
}> = ({ fallback, count, page, type, topicID }) => {
  
  return (
    <Layout 
      metas={{
        title: `pact.social - Explore ${type}`,
        description: 'Explore petitions, manifestos and open-letters'
      }}
    >
      <SWRConfig value={{ fallback }}>
        <ExplorerHeader type={type} />
        <PactsListTopic 
          type={type as string} 
          topic={topicID}
          page={parseInt(page as string)} 
          count={count} 
        />
      </SWRConfig>
    </Layout>
  )
}

export default ExploreByTopic;
