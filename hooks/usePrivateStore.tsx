import useSWR from 'swr'
import { Mutation, Pact, PactProfileEncryptedLitContent, PactSignature, PrivateStore, Query, UpdatePactProfilePayload } from '../src/gql';
import { useCeramicContext } from '../context';
import { generateAccessControlConditionsForRecipients } from '../lib/litUtils';
import { useEffect, useState } from 'react';
import { Store } from '../lib/store';
import { useLitContext } from '../context/lit';

const query = `
query getPrivateStore {
  viewer {
    ... on CeramicAccount {
      id
      privateStoreList(first: 100) {
        edges {
          node {
            id
            archived
            encryptedContent {
              dataToEncryptHash
              ciphertext
              chain
              accessControlConditions
              accessControlConditionType
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
  const [ ready, setReady ] = useState<boolean | undefined>();
  const { litClient: lit, connect, isConnected, isLoading: isLitLoading } = useLitContext()
  const [ pactSignatures, setPactSignatures ] = useState<PactSignature[]>()
  const [ drafts, setDrafts ] = useState<Pact[]>()
  
  const { data, error, isLoading, mutate } = useSWR<PrivateType[] | undefined>(query,
    fetcher,
    {
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
    }
  )

  // refresh datas when connected to lit
  useEffect(() => {
    // if(ready === false && isConnected || !ready && isConnected) {
    if(!ready && isConnected) {
      mutate()
      setReady(true)
      return
    }
  }, [ready, isConnected])

  useEffect(() => {
    if(data) {
      try {
        const newPactSignatures = data.reduce<PactSignature[]>((acc, current) => {
          if (current.__typename === 'PactSignature' || current.content?.signedAt) {
            acc.push(current.content as PactSignature);
          }
          return acc
        }, [])
        setPactSignatures(newPactSignatures);
      } catch (error) {
        console.log('error', error)
      }
      
      const draftsPact = data.reduce<Pact[]>((acc, current) => {
        if (current.__typename === 'Pact') {
          acc.push({
            ...current.content as Pact,
            id: current.id
          });
        }
        return acc
      }, [])
  
      setDrafts(draftsPact)
    }
  }, [data])

  async function fetcher (query: string): Promise<PrivateType[] | undefined> {
    const {data: storeData, errors} = await composeClient.executeQuery<Query>(query, {})
    if (!isConnected && !isLitLoading && storeData) {
      // will fetch once lit connected
      if(ready !== false) setReady(false)
      return;
    }
    // if (errors) throw new Error('')
    const list = storeData?.viewer?.privateStoreList?.edges || [];
    const resProms: Promise<PrivateType>[] = [];
    
    for (const item of list) {

      const prom = lit?.decryptString(item?.node?.encryptedContent).then((res) => {
        if (res) {
          const content = JSON.parse(res.decryptedString)
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
    }
    const res = await Promise.all(resProms)
    try {
      const newPactSignatures = res.reduce<PactSignature[]>((acc, current) => {
        if (current.__typename === 'PactSignature' || current.content?.signedAt) {
          acc.push(current.content as PactSignature);
        }
        return acc
      }, [])
      setPactSignatures(newPactSignatures);
    } catch (error) {
      console.log('error', error)
    }
    
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
    setReady(true)
    return res;
  }

  const add = async (input: any, __typename: string, id: string, recipients?: string[]) => {
    await lit.connect()
    const defaultRecipients = [did?.parent]
    const {accessControlConditions} = generateAccessControlConditionsForRecipients(recipients ? [...recipients, ...defaultRecipients] : [...defaultRecipients])
    const newClearStream = {...input, __typename, id}
    const encryptedContent = await lit.encryptString(JSON.stringify(newClearStream), 'ethereum', accessControlConditions)

    const personalStore = await composeClient.executeQuery<Mutation>(`
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

    if (__typename === 'PactSignature') {
      const newSigs = pactSignatures ? [...pactSignatures, input] : [input];
      setPactSignatures(newSigs)
    }
    if (data && personalStore.data?.createPrivateStore) {
      mutate([...data, { content: input, type: __typename, id: personalStore.data?.createPrivateStore?.document.id} ])
    } else if (personalStore.data?.createPrivateStore) {
      mutate([{ content: input, type: __typename, id:  personalStore.data?.createPrivateStore?.document.id }])
    }

    return personalStore
  }

  const update = async (input: PactSignature, __typename: string, id: string, archived: boolean = false) => {
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
          archived,
        },
        id: id,
      }
    });

    if (__typename === 'PactSignature') {
      const newSigs = pactSignatures?.map((current) => {
        if(current.id === id) {
          current = input
        }
        return current
      })
      if(newSigs) {
        setPactSignatures(newSigs)
        if (data) {
          mutate([...data, { content: input, type: __typename, id:  newClearStream.id} ])
        }
      }
    }

    return personalStore
  }

  async function encryptContent(__typename: string, id: string, content: any, recipients: [string]) {
    // await lit.connect()
    const {accessControlConditions} = generateAccessControlConditionsForRecipients([did?.parent, ...recipients])
    const newClearStream = {...content, __typename, id}
    const encryptedContent = await lit.encryptString(JSON.stringify(newClearStream), 'ethereum', accessControlConditions)
    return encryptedContent
  }
  
  async function decryptContent(data: PactProfileEncryptedLitContent | undefined, id?: string) {
    if (!data) throw new Error('no data provided')

    const decryptedContent = await lit.decryptString(data).then((res) => {
      if(res) {
        const content = JSON.parse(res.decryptedString)
        return {...content, _id: id}
      }
    })
    return decryptedContent
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
    encryptContent,
    decryptContent,
  };
}
