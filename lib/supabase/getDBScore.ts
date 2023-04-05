import { supabase, GPScorer } from ".";

export default async function getDBScore(address: string) {
  const dbRecord = await supabase
    .from('passport_sybil_scorer')
    .select('*')
    .eq('address', (address as string).toLowerCase())
    .eq('scorer', GPScorer)
    .single()
  ;
  return dbRecord;
}
