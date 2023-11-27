import { useRouter } from "next/router";
import { useCeramicContext } from "../context";
import { useProfileContext } from "../context/profile";
import { htmlToMarkdown } from "../lib/mdUtils";
import type { Mutation, PactInput } from "../src/gql";
import usePact from "./usePact";

export default function useMutatePact (pactID?: string) {
  const { push } = useRouter();
  const { add, update } = useProfileContext()
  const { composeClient } = useCeramicContext()
  const { mutate } = usePact({stream: pactID})
  
  const saveDraft = async (values: PactInput, pactID?: string) => {
    try {
      if(values.image === '') {
        delete values.image;
      }
      values.createdAt = values.createdAt || (new Date()).toISOString()
      values.content = htmlToMarkdown(values?.content as string)

      const content = {
        ...values,
        // type: values.type,
        author: {
          id: composeClient.did?.parent
        }
      }
      if(!add) throw new Error('profile probably not connected')

      if (pactID && update) {
        await update({content}, 'Pact', pactID)
      } else {
        const res = await add({content}, 'Pact', `draft-${content.title.replace(' ', '')}`)
        pactID = res?.data?.createPrivateStore?.document.id
      }
      return push({
        pathname: `/p/drafts/[pactID]`,
        query: {
          pactID: pactID
        }
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  const publish = async (data: PactInput, pactID?: string, create: boolean = false) => {
    try {
      if(data.image === '') {
        delete data.image;
      }
      if (create) {
        data.createdAt = (new Date()).toISOString()
        data.content = htmlToMarkdown(data?.content as string)
        
        const { data: res, errors } = await composeClient.executeQuery<Mutation>(`
        mutation newPact($input: CreatePactInput!) {
          createPact(input: $input) {
            document {
              id
            }
          }
        }
        `, {
          input: {
            content: {
              ...{
                content: data.content,
                description: data.description,
                media: data.media,
                title: data.title,
                topicID: data.topicID,
                type: data.type,
                createdAt: data.createdAt,
              },
              // type: PactType[data.type]
            }
          }
        })

        if(pactID && update) {
          // put draft as archive
          await update({}, 'Pact', pactID, true)
        }
  
        if (!errors) {
          return push(`/m/${res?.createPact?.document.id}`)
        }
      } else {
        data.updatedAt = (new Date()).toISOString()
        data.content = htmlToMarkdown(data?.content as string)
        const { data: res, errors } = await composeClient.executeQuery<Mutation>(`
        mutation update($input: UpdatePactInput!) {
          updatePact(input: $input) {
            document {
              id
            }
          }
        }
        `, {
          input: {
            id: pactID,
            content: {
              ...{
                content: data.content,
                description: data.description,
                media: data.media,
                title: data.title,
                topicID: data.topicID,
                type: data.type,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
              },
              // type: PactType[data.type]
            }
          }
        })
        if (!errors) {
          mutate()
          return push(`/m/${res?.updatePact?.document.id}`)
        }
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return {
    saveDraft,
    publish,
  }
}
