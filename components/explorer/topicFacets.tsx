import Link from "next/link";
import useFetchQuery from "../../hooks/useFetchQuery";
import type { Database } from "../../types/database.types";

type TopicsFacet = Database['public']['Functions']['topic_per_type']['Returns']

export default function TopicFacets({
  type,
  currentTopic,
} : {
  type: string;
  currentTopic?: string;
}) {
  
  const { data: topicsFacet } = useFetchQuery<TopicsFacet>(`/api/topics/${type}`)

  return (
    <>
    {topicsFacet && topicsFacet.map((data, index) => {
      return (
        <Link
          key={`topic-tag-${index}`}
          href={`/explore/${type}/topic/${data.topic_id}`} 
          className={`btn btn-xs ${currentTopic === data.topic_id && 'btn-secondary'}`}
        >
          {data?.name}
        </Link>
      )
    })}
    </>
  )
}
