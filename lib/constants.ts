import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';

export const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const NEXT_PUBLIC_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY

export const supabaseUrl = process.env.SUPABASE_HOST;
export const supabaseKey = process.env.SUPABASE_KEY;

export const supportedChains = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
]
