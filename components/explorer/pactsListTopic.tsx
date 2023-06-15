import usePactListTopic from "../../hooks/usePactListTopic";
import TopicFacets from "./topicFacets";
import Pagination, { usePagination } from "../pagination";
import PactList from "./pactsList";
import type { Pact } from "../../src/gql";

export default function PactsListTopic ({
  type,
  topic,
  page,
  count,
}: {
  type: string;
  topic: string;
  page: number;
  count: number;
}) {

  const { allPages, currentPage, setCurrentPageNumber } = usePagination(count || 0, page)
  const { data } = usePactListTopic(type, topic, currentPage || page)
  
  return (
    <div className="mb-12">
      <div className="text-3xl font-title font-bold">Topics</div>
      <div className="flex gap-4 py-4 flex-wrap">
        <TopicFacets type={type} currentTopic={topic} />
      </div>
      {count > 0 &&
        <div>{count} results</div>
      }
      <div className="divider divider-vertical"></div>
      <div className="my-8">
        <PactList data={data?.data} />
      </div>
      {allPages.length > 1 &&
        <div className="flex justify-end">
          <Pagination
            allPages={allPages}
            currentPage={currentPage}
            onPageChange={setCurrentPageNumber}
            getPath={(page) => `/explore/${type}/${page}`}
          />
        </div>
      }
    </div>
  )
}
