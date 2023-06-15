import supabase from ".";

export default async function getPactsByTopicType(topic: string, type: string, page?: number) {
  
  if (!type || ['openletter', 'petition', 'manifesto', 'all'].indexOf(type) === -1) {
    throw new Error('invalid pact type')
  }
  const limit = 6;
  const queryPage = page || 1;

  if(type === 'all') {
    const { data, count, error } = await supabase
      .rpc('pacts_per_topic', { _topic_id: topic },  { count: 'exact'})
      .range(limit * (queryPage - 1), limit * queryPage)
      .limit(limit)

    const hydrated = data?.map((current) => {
      if (current?.media) current.media = JSON.parse(current.media)
      return current
    })
    return {
      data: hydrated,
      count,
      error,
    };
  }
  const { data, count, error } = await supabase
    .rpc('pacts_per_topics_type', { _topic_id: topic, _type: type },  { count: 'exact'})
    .range(limit * (queryPage - 1), limit * queryPage)
    .limit(limit)
  const hydrated = data?.map((current) => {
    if (current?.media) current.media = JSON.parse(current.media)
    return current
  })
  return {
    data: hydrated,
    count,
    error,
  };
}
