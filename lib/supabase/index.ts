import { createClient } from '@supabase/supabase-js'
import type { Database } from '../../types/database.types';
import DBScore from './getDBScore';

export const getDBScore = DBScore;

const supabaseUrl = process.env.SUPABASE_HOST as string;
const supabaseKey = process.env.SUPABASE_KEY as string;

export const GPapiEndpoint = 'https://api.scorer.gitcoin.co'
export const GPScorer = '139'

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase;
