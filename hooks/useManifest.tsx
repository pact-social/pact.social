import { ComposeClient } from '@composedb/client';
// import { graphql } from 'graphql';
import useSWR from 'swr'
import { useCeramicContext } from '../context';
import { GetManifestQuery, Manifest } from '../src/gql';
// import GetManifest from '../graphql/queries/manifest.graphql';

interface useStreamProps {
  __typename: string;
  stream?: string;
}

const query = `
query GetManifest($streamID: ID!) {
  node(id: $streamID) {
    ... on Manifest {
      __typename
      id
      title
      content
      scope
      picture
      author {
        id
      }
      topic {
        name
      }
    }
  }
}
`;


const fetch = async ({stream, composeClient}: {stream: string; composeClient: ComposeClient}) => {
  if(!stream) throw new Error('no stream provided');

  const { data, errors } = await composeClient.executeQuery<GetManifestQuery>(query, {streamID: stream});

  if (errors || !data) {
    console.error('composedb query error', query, errors);
    throw new Error('an error occured')
  }
  
  if (data.node && data.node?.__typename !== 'Manifest' && "title" in data?.node ) {
    throw new Error('Result is not a manifest.')
  }
  
  return data.node as Manifest;
}

export default function useManifest({ __typename, stream}: useStreamProps) {
  const { composeClient } = useCeramicContext();

  const { data, error, isLoading, mutate } = useSWR({stream, composeClient},
    fetch,
    // {
    //   dedupingInterval: 30000,
    //   focusThrottleInterval: 60000,
    // }
  )

  return {
    isLoading,
    error,
    data,
    mutate,
  };
}
