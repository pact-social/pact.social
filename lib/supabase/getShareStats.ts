import { supabase } from ".";

export default async function getShareStats(did: string, page?: number, limit?: number) {
  limit = limit || 10;
  page = page || 1;
  const dbRecord = await supabase
    .from('event_view')
    .select('*', { count: 'exact'})
    .eq('ref', did)
    .range(limit * (page - 1), limit * page)
    .limit(limit)
  ;
  console.log('share views list query', page, limit, did)
  console.log(dbRecord)
  return dbRecord;
}
