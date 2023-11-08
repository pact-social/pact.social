import useSWR from 'swr'
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { usePactContext } from "../../context/pact"
import { getAddressFromDid, shortAddress } from "../../utils";
import EmojiAvatar from "../avatar/emojiAvatar";
import { useProfileContext } from "../../context/profile";

const limit = 10;

export default function PactSignatures() {
  const { data, count } = useSignatureListPage(undefined);

  return (
    <>
      {data && count > 0 &&
        <SignatureList data={data} count={count} />
      }
    </>
  )
}

function SignatureList({data, count}: {data: any[], count: number}) {
  const { allPages, currentPage, setCurrentPageNumber } = usePagination(count, limit);

  return (
    <>
      <SignatureListPage page={currentPage.number} />
      {allPages.length > 1 && (
        <div
          className="flex justify-end w-full my-5"
        >
          <SignaturePaginationPanel
            allPages={allPages}
            currentPage={currentPage}
            setCurrentPageNumber={setCurrentPageNumber}
          />
        </div>
      )}
    </>
  )
}

function SignatureListPage({ page }: { page: number | undefined }) {
  const { data, count } = useSignatureListPage(page);

  if (!data) return null;

  return (
    <div className="mt-12">
      <div className="divider"></div>
      <div className="flex justify-between items-center mb-9">
        <h3 className="font-title text-3xl font-bold">Signed by:</h3>
        <div className="text-right">
          <div className="font-alt text-4xl">
          {count}
          </div>
          <span>public signatures</span>
        </div>
      </div>
      <div className="grid">
        {data && data?.map((signature: any, index: any) => (
          <SignatureRow
            key={`signatures-${index}`}
            signature={signature}
            // did={signature.controller_did}
            // datetime={signature.created_at}
          />
        ))}
      </div>
    </div>
  );
}

interface SignaturePage {
  number: number;
  after: number;
}

function usePagination(totalCount: number, pageSize: number) {
  const allPages = Array.from({ length: Math.ceil(totalCount / pageSize) }).map(
    (unused, index): SignaturePage => ({
      number: index + 1,
      after: (index + 1) * pageSize,
    })
  );

  if (allPages.length === 0) throw new Error(`unexpected empty list`);

  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const currentPage = allPages[currentPageNumber - 1] ?? allPages[0];

  return {
    allPages,
    currentPage,
    setCurrentPageNumber,
  }
}

const SignatureRow = ({
  signature
}: {
  signature: any;
}) => {
  // const [profile, setProfile] = useState<any>();
  const address = getAddressFromDid(signature.controller_did).address || 'anon';

  // const getProfile = async (did: string) => {

  //   if(!address) return;

	// 	let { data, error, status } = await orbisIndexer.from("orbis_v_profiles").select().ilike('address', address);
  //   if((data as Array<any>)?.length > 0) {
  //     setProfile(data);
  //   }
	// 	/** Return results */
	// 	return({ data, error, status });
	// }

  // useEffect(() => {
  //   getProfile(did);
  // }, []);

  return (
    <div className="flex items-center my-2">
      <div className="w-10">
        <EmojiAvatar address={address} />
      </div>
      <div className="">
        <div className="flex gap-2 font-bold">
          <span className="hidden lg:block">{signature?.name || address}</span>
          <span className="block lg:hidden">{signature?.name || shortAddress(address)}</span>
        </div>
        <div className="flex gap-2 text-sm">
          {signature?.title && 
            <span className="">{signature?.title}{signature?.organisation ? `, ${signature?.organisation}` : ''}</span>
          }
          {(!signature?.title && signature?.organisation) && 
            <span className="">{signature?.organisation}</span>
          }
        </div>
      </div>
      <span className="flex-1 text-right">{dayjs(signature?.created_at).fromNow()}</span>
    </div>
  )
}

function SignaturePaginationPanel({
  allPages,
  currentPage,
  setCurrentPageNumber,
}: {
  allPages: SignaturePage[];
  currentPage: SignaturePage;
  setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="btn-group">
      {ellipsizePages(allPages, currentPage).map((page, index) =>
        page === "ellipsis" ? (
          <button key={index} className="btn">
            &hellip;
          </button>
        ) : (
          <button
            key={index}
            className={`btn ${ page.number === currentPage.number ? 'btn-neutral' : ''}`}
            onClick={() => setCurrentPageNumber(page.number)}
          >
            {page.number}
          </button>
        )
      )}
    </div>
  );
}

function ellipsizePages(
  allPages: SignaturePage[],
  currentPage: SignaturePage
): Array<SignaturePage | "ellipsis"> {
  const fullLimit = 7;

  const sidePages = 5;
  const sideLimit = 4;

  const middlePagesPerSide = 1;

  const firstPage = allPages[0];
  const lastPage = allPages[allPages.length - 1];

  return allPages.length <= fullLimit
    ? allPages
    : currentPage.number <= sideLimit
    ? [...allPages.slice(0, sidePages), "ellipsis", lastPage]
    : currentPage.number >= allPages.length - sideLimit + 1
    ? [
        firstPage,
        "ellipsis",
        ...allPages.slice(allPages.length - sidePages, allPages.length),
      ]
    : [
        firstPage,
        "ellipsis",
        ...allPages.slice(
          currentPage.number - middlePagesPerSide - 1,
          currentPage.number + middlePagesPerSide
        ),
        "ellipsis",
        lastPage,
      ];
}


export function useSignatureListPage(page: number = 1) {
  const { pact } = usePactContext()
  const [ data, setData ] = useState<any[] | null>(null)
  const [ count, setCount ] = useState<number>(0)
  const [ loading, setLoading ] = useState<boolean>(false)
  const { signatures: mySignatures } = useProfileContext()
  const fetcher = async ({uri, pactID, page}: {uri: string; pactID: string; page: number}) => {
    const res = await fetch(uri, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        streamID: pactID,
        page,
        limit,
      })
    })
    const body =  await res.json()
    return body
  }
  const { data: list, error, isLoading, mutate } = useSWR(
    { 
      uri: `/api/pacts/signatures`,
      pactID: pact?.id, 
      page
    }, 
    fetcher
  )

  useEffect(() => {
    if (mySignatures && mySignatures.size > 0 && !isLoading && !error) {
      mutate()
    }
  }, [mySignatures?.size])

  return {
    ...list,
  }
}
