import usePactListType from "../../hooks/usePactListType";
import TopicFacets from "./topicFacets";
import Pagination, { usePagination } from "../pagination";
import PactList from "./pactsList";

export default function PactsListType ({
  type,
  page,
  count,
}: {
  type: string;
  page: number;
  count: number;
}) {

  const { allPages, currentPage, setCurrentPageNumber } = usePagination(count || 0, page)
  const { data } = usePactListType(type, currentPage)
  
  return (
    <div className="mb-12">
      <div className="text-3xl font-title font-bold">Topics</div>
      <div className="flex gap-4 py-4">
        <TopicFacets type={type} />
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
