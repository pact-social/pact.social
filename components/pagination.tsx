import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

interface IPage {
  number: number;
  after: number;
}
const defaultPageSize = 6

export default function Pagination ({
  allPages,
  currentPage,
  // onPageChange
  onPageChange,
  // pageSize = defaultPageSize,
  className,
  getPath,
}: {
  allPages: IPage[];
  currentPage: number;
  onPageChange: React.Dispatch<React.SetStateAction<number>>;
  pageSize?: number;
  className?: string;
  getPath?: (pageNumber: number) => string;
}) {
  const { pathname, query } = useRouter()

  return (
    <div className={`btn-group ${className}`}>
      {ellipsizePages(allPages, currentPage).map((page, index) =>
        page === "ellipsis" ? (
          <button key={index} className="btn">
            &hellip;
          </button>
        ) : (
          <Link
            key={index}
            href={{
              pathname: pathname,
              query: {
                ...query,
                page: page.number
              }
            }}
            className={`btn ${ page.number === currentPage ? 'btn-active' : ''}`}
            onClick={() => onPageChange(page.number)}
          >
            {page.number}
          </Link>
        )
      )}
    </div>
  );
}

function ellipsizePages(
  allPages: IPage[],
  currentPage: number
): Array<IPage | "ellipsis"> {
  const fullLimit = 7;

  const sidePages = 5;
  const sideLimit = 4;

  const middlePagesPerSide = 1;

  const firstPage = allPages[0];
  const lastPage = allPages[allPages.length - 1];

  return allPages.length <= fullLimit
    ? allPages
    : currentPage <= sideLimit
    ? [...allPages.slice(0, sidePages), "ellipsis", lastPage]
    : currentPage >= allPages.length - sideLimit + 1
    ? [
        firstPage,
        "ellipsis",
        ...allPages.slice(allPages.length - sidePages, allPages.length),
      ]
    : [
        firstPage,
        "ellipsis",
        ...allPages.slice(
          currentPage - middlePagesPerSide - 1,
          currentPage + middlePagesPerSide
        ),
        "ellipsis",
        lastPage,
      ];
}

export function usePagination(totalCount: number, activePage: number = 1, pageSize: number = defaultPageSize) {
  const allPages = Array.from({ length: Math.ceil(totalCount / pageSize) }).map(
    (unused, index): IPage => ({
      number: index + 1,
      after: (index + 1) * pageSize,
    })
    );
    
  // if (allPages.length === 0) throw new Error(`unexpected empty list`);
  
  const [currentPageNumber, setCurrentPageNumber] = useState(activePage);
  
  if (totalCount === 0) return {
    allPages: [],
    currentPage: 0,
    setCurrentPageNumber
  }
  const currentPage = allPages[currentPageNumber - 1]?.number ?? allPages[0]?.number;

  return {
    allPages,
    currentPage,
    setCurrentPageNumber,
  }
}
