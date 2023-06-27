import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';

export const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const NEXT_PUBLIC_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY

export const supportedChains = [
  mainnet,
  polygon,
  optimism,
  // arbitrum,
]
