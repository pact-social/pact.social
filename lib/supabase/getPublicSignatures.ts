import { supabase } from ".";

export default async function getPublicSignatures(streamID: string, page?: number, limit?: number) {
  limit = limit || 10;
  page = page || 1;
  const dbRecord = await supabase
    .from('public_signatures')
    .select('*', { count: 'exact'})
    .eq('custom_pactID', streamID)
    .range(limit * (page - 1), limit * page)
    .limit(limit)
  ;

  return dbRecord;
}
