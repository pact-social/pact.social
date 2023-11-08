import { supabase, GPScorer } from "."

export default async function getDBScore(address: string, scorer: string = GPScorer) {
  const dbRecord = await supabase
    .from('passport_sybil_scorer')
    .select('*')
    .eq('address', address.toLowerCase())
    .eq('scorer', scorer)
    .single()
  ;
  return dbRecord
}
