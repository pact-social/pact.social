import { supabase } from ".";

export default async function getReferralStats(did: string, page?: number, limit?: number) {
  limit = limit || 10;
  page = page || 1;
  const dbRecord = await supabase.rpc('sign_stats_referral', { did })
    .range(limit * (page - 1), limit * page)
    .limit(limit)
  ;

  console.log(dbRecord)
  return dbRecord;
}
