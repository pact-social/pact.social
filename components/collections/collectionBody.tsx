import { XMarkIcon } from "@heroicons/react/24/outline"
import { useCeramicContext } from "../../context"
import UseCollectionPacts from "../../hooks/useCollectionPacts"
import type { Mutation, Pact } from "../../src/gql"
import PactCardH from "../pacts/pactCardH"

export default function CollectionBody ({ collectionID }: { collectionID: string }) {
  const { data } = UseCollectionPacts(collectionID)
  const { composeClient, state: { did } } = useCeramicContext()

  const remove = async (id: string) => {
    const { data: res, errors } = await composeClient.executeQuery<Mutation>(`
      mutation updateCollectionPact($input: UpdateCollectionPactInput!) {
        updateCollectionPact(input: $input) {
          document {
            id
          }
        }
      }
    `, {
      input: {
        id,
        content: {
          deleted: true,
        }
      }
    })
  }
  return (
  <>
    <div 
      className="hero bg-gradient-to-t from-[#F3e0ff] to-[#f1faf0] h-48" 
      style={(data?.media && data?.media?.length > 0) ? {backgroundImage: `url(${data?.media?.at(0)?.item})`} : {}}
    >
      {(data?.media && data?.media?.length > 0) &&
        <div className="hero-overlay bg-opacity-40"></div>
      }
      <div className={`hero-content text-center flex-col ${(data?.media && data?.media?.length > 0) ? 'text-base-200' : ''}`}>
        <h1 className=" text-4xl font-title font-bold">{data?.name}</h1>
        {data?.collectionPactsCount && data?.collectionPactsCount > 0 &&
          <div>{data?.collectionPactsCount} pacts</div>
        }
      </div>
    </div>
    <div className="mb-12">
      <div className="my-8">
        {data?.collectionPacts?.edges && data.collectionPacts.edges.length === 0 &&
          <div>No Results</div>
        }
        <div className="grid gap-4 lg:grid-cols-2 justify-center">
          {data && data.collectionPacts?.edges?.map((item, index) => {
            return (
              <div
                key={index} 
                className="relative"
              >
                {!item?.node?.deleted &&
                  <>
                  {did?.parent === item?.node?.author?.id &&
                    <button 
                      onClick={() => remove(item?.node?.id as string)}
                      className="btn btn-circle btn-xs absolute left-2 top-2 z-10"
                    >
                      <XMarkIcon className="h-3 w-3" />
                    </button>
                  }
                  
                  <PactCardH 
                    pact={item?.node?.pact as Pact} 
                  />
                  </>
                }
              </div>

            )
          })}
        </div>
      </div>
    </div>
  </>
  )
}
