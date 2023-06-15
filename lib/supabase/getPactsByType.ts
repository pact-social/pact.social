import supabase from ".";

export default async function getPactsByType(type: string, page: number) {

  if (!type || ['openletter', 'petition', 'manifesto', 'all'].indexOf(type) === -1) {
    throw new Error('invalid pact type')
  }
  const limit = 6;
  const queryPage = page || 1;

  const { data, count, error} = await supabase
    .from(`pact_${type}`)
    .select('*', { count: 'exact'})
    .range(limit * (queryPage - 1), limit * queryPage)
    .limit(limit)
  ;
  
  if (error) throw error
  
  const hydrated = data.map((current) => {
    if (current.media) current.media = JSON.parse(current.media)
    return current
  })
  
  return {
    data: hydrated,
    count
  };

}
