import { useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useManifestContext } from "../../context/manifest"
import { getAddressFromDid, shortAddress } from "../../utils";
import { orbisIndexer } from "../../lib/getOrbisIndexer";
import EmojiAvatar from "../avatar/emojiAvatar";

dayjs.extend(relativeTime)

export default function ManifestSignatures() {
  const { data, count } = useSignatureListPage(null);

  return (
    <>
      {data && count > 0 &&
        <SignatureList data={data} count={count} />
      }
    </>
  )
}

function SignatureList({data, count}: {data: any[], count: number}) {
  const { allPages, currentPage, setCurrentPageNumber } = usePagination(count, 1);
  
  return (
    <>
      <SignatureListPage page={currentPage.after} />
    </>
  )
}

function SignatureListPage({ page }: { page: number | null }) {
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
      <div>
        {data && data?.map((signature: any, index) => (
          <SignatureRow
            key={`signatures-${index}`}
            did={signature.controller_did}
            datetime={signature.created_at}
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
  console.log('allPages', allPages);

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
  did,
  datetime
}: {
  did: string;
  datetime: string;
}) => {
  const [profile, setProfile] = useState<any>();
  const address = getAddressFromDid(did).address || 'anon';

  const getProfile = async (did: string) => {

    if(!address) return;

		let { data, error, status } = await orbisIndexer.from("orbis_v_profiles").select().ilike('address', address);
    if((data as Array<any>)?.length > 0) {
      setProfile(data);
    }
		/** Return results */
		return({ data, error, status });
	}

  useEffect(() => {
    getProfile(did);
  }, []);

  return (
    <div className="flex items-center my-2">
      <div className="w-10">
        <EmojiAvatar address={address} />
      </div>
      <div className="">
        <span className="hidden lg:block">{profile?.profile?.username || address}</span>
        <span className="block lg:hidden">{profile?.profile?.username || shortAddress(address)}</span>
      </div>
      <span className="flex-1 text-right">{dayjs(datetime).fromNow()}</span>
    </div>
  )
}

export function useSignatureListPage(page: number | null) {
  const { manifest } = useManifestContext();
  const [ data, setData ] = useState<any[] | null>(null);
  const [ count, setCount ] = useState<number>(0);

  async function getSignatures(streamID: string, page?: number) {
    const params = {
      streamID,
      page,
    }
    const res = await fetch('/api/pacts/signatures', {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const {count, data } = await res.json();
    if (data) {
      console.log('data signatures', data)
      setData(data);
      setCount(count);
    }
  }

  useEffect(() => {
    if (manifest) {
      getSignatures(manifest?.id)
    }
  }, [manifest, page])

  return {
    data,
    count,
  }
}
