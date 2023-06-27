import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';

export const NEXT_PUBLIC_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const NEXT_PUBLIC_SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY

export const SESSION_DAYS = process.env.NEXT_PUBLIC_SESSION_DAYS ? parseInt(process.env.NEXT_PUBLIC_SESSION_DAYS) : 7

export const supportedChains = [
  mainnet,
  polygon,
  optimism,
  // arbitrum,
]
