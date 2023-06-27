import useSWR from 'swr'
import { Pact, PactSignature, Query, UpdatePactProfilePayload } from '../src/gql';
import { useCeramicContext } from '../context';
import { generateAccessControlConditionsForRecipients } from '../lib/litUtils';
import { useState } from 'react';
import { Store } from '../lib/store';
import useLit from './useLit';

const query = `
query getPrivateStore {
  viewer {
    ... on CeramicAccount {
      id
      privateStoreList(first: 100) {
        edges {
          node {
            id
            encryptedContent {
              accessControlConditions
              encryptedString
              encryptedSymmetricKey
            }
          }
        }
      }
    }
  }
}
`
export type PrivateType = {
  content: any;
  type: string;
  __typename?: string;
  id: string;
}


export default function usePrivateStore() {
  const { composeClient, state: {isAuthenticated, did} } = useCeramicContext();
  const [ ready, setReady ] = useState(false);
  const { lit, connect, isConnected, isLoading: isLitLoading } = useLit()
  const [ pactSignatures, setPactSignatures ] = useState<PactSignature[]>()
  const [ drafts, setDrafts ] = useState<Pact[]>()
  
  const { data, error, isLoading, mutate } = useSWR<PrivateType[]>(query,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )

  async function fetcher (query: string): Promise<PrivateType[]> {
    const {data: storeData, errors} = await composeClient.executeQuery<Query>(query, {})
    if (!isConnected && !isLitLoading && storeData) {
      // await connect()
      // open lit modal to connect
    }
    console.log('fetcher privateStore', storeData, errors)
    // if (errors) throw new Error('')
    const list = storeData?.viewer?.privateStoreList?.edges || [];
    const resProms: Promise<PrivateType>[] = [];
    
    for (const item of list) {
      const prom = lit?.decryptString(item?.node?.encryptedContent, 'ethereum', new Store()).then(sig => {
        if (sig.status === 200) {
          const content = JSON.parse(sig.result)
          return {...content, id: item?.node?.id}
        }
      })
      resProms.push(prom)
      // const sig = await lit?.decryptString(item?.node?.encryptedContent, 'ethereum', new Store())
      // if (sig.status === 200) {
      //   const content = JSON.parse(sig.result)
      //   res.push(content)
      // }
      // // const raw = await composeClient.did?.decryptJWE(JSON.parse(item?.node?.jwe as string))
      // // res.push(JSON.parse(new TextDecoder().decode(raw)) as PrivateType)
      // console.log('sig', sig)
    }
    const res = await Promise.all(resProms)
    
    const newPactSignatures = res.reduce<PactSignature[]>((acc, current) => {
      if (current.__typename === 'PactSignature' || current.content.signature) {
        acc.push(current.content as PactSignature);
      }
      return acc
    }, [])
    
    setPactSignatures(newPactSignatures);
    
    const draftsPact = res.reduce<Pact[]>((acc, current) => {
      if (current.__typename === 'Pact') {
        acc.push({
          ...current.content as Pact,
          id: current.id
        });
      }
      return acc
    }, [])
    
    setDrafts(draftsPact)
    // console.log('privateStore data fetch success', newPactSignatures, draftsPact)
    return res;
  }

  const add = async (input: PactSignature, __typename: string, id: string) => {
    const {accessControlConditions} = generateAccessControlConditionsForRecipients([did?.parent])
    const newClearStream = {...input, __typename, id}
    const encryptedContent = await lit.encryptString(JSON.stringify(newClearStream), 'ethereum', accessControlConditions)

    const personalStore = await composeClient.executeQuery(`
    mutation RecordPrivateStore($input: CreatePrivateStoreInput!) {
      createPrivateStore(input: $input) {
        clientMutationId
        document {
          id
        }
      }
    }
    `, {
      input: {
        content: {
          encryptedContent
        },
      }
    });

    const newSigs = pactSignatures ? [...pactSignatures, input] : [input];
    setPactSignatures(newSigs)
    mutate([...data, { content: input, type: __typename, id:  newClearStream.id} ])
  }

  const update = async (input: PactSignature, __typename: string, id: string) => {
    const {accessControlConditions} = generateAccessControlConditionsForRecipients([did?.parent])
    const newClearStream = {...input, __typename, id}
    const encryptedContent = await lit.encryptString(JSON.stringify(newClearStream), 'ethereum', accessControlConditions)

    const personalStore = await composeClient.executeQuery<UpdatePactProfilePayload>(`
    mutation UpdatePrivateStore($input: UpdatePrivateStoreInput!) {
      updatePrivateStore(input: $input) {
        clientMutationId
        document {
          id
        }
      }
    }
    `, {
      input: {
        content: {
          encryptedContent,
        },
        id: id,
      }
    });

    const newSigs = pactSignatures?.map((current) => {
      if(current.id === id) {
        current = input
      }
      return current
    })

    if(newSigs) {
      setPactSignatures(newSigs)
      mutate([...data, { content: input, type: __typename, id:  newClearStream.id} ])
    }
    return personalStore
  }

  return {
    isLoading,
    error,
    privateStore: data,
    pactSignatures,
    drafts,
    mutate,
    add,
    update,
  };
}
