export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      compose_indexer: {
        Row: {
          created_at: string | null
          cursor: string | null
          key: string
          last_indexed: string | null
        }
        Insert: {
          created_at?: string | null
          cursor?: string | null
          key: string
          last_indexed?: string | null
        }
        Update: {
          created_at?: string | null
          cursor?: string | null
          key?: string
          last_indexed?: string | null
        }
      }
      pact_indexer_logs: {
        Row: {
          account: string
          action: string
          first_commit: string | null
          first_indexed_at: string | null
          last_commit: string | null
          last_indexed_at: string | null
          model_id: string | null
          stream_id: string
          target: string
        }
        Insert: {
          account: string
          action: string
          first_commit?: string | null
          first_indexed_at?: string | null
          last_commit?: string | null
          last_indexed_at?: string | null
          model_id?: string | null
          stream_id: string
          target: string
        }
        Update: {
          account?: string
          action?: string
          first_commit?: string | null
          first_indexed_at?: string | null
          last_commit?: string | null
          last_indexed_at?: string | null
          model_id?: string | null
          stream_id?: string
          target?: string
        }
      }
      passport_sybil_scorer: {
        Row: {
          address: string
          error: string | null
          evidence: string | null
          last_score_timestamp: string | null
          score: number | null
          scorer: string
          status: string | null
        }
        Insert: {
          address: string
          error?: string | null
          evidence?: string | null
          last_score_timestamp?: string | null
          score?: number | null
          scorer: string
          status?: string | null
        }
        Update: {
          address?: string
          error?: string | null
          evidence?: string | null
          last_score_timestamp?: string | null
          score?: number | null
          scorer?: string
          status?: string | null
        }
      }
      "petition-stats": {
        Row: {
          created_at: string | null
          id: string
          influencers: number | null
          signatures_private: number | null
          signatures_public: number | null
          signatures_total: number | null
          signatures_verified: number | null
          updated_at: string | null
          views: number | null
        }
        Insert: {
          created_at?: string | null
          id: string
          influencers?: number | null
          signatures_private?: number | null
          signatures_public?: number | null
          signatures_total?: number | null
          signatures_verified?: number | null
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          influencers?: number | null
          signatures_private?: number | null
          signatures_public?: number | null
          signatures_total?: number | null
          signatures_verified?: number | null
          updated_at?: string | null
          views?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      sign_daily_count: {
        Args: {
          actionparam: string
        }
        Returns: Record<string, unknown>[]
      }
      sign_stats_stream: {
        Args: {
          _streamid: string
        }
        Returns: {
          streamid: string
          total: number
          public: number
          private: number
          anon: number
          verified: number
        }[]
      }
      sign_stats_top: {
        Args: Record<PropertyKey, never>
        Returns: {
          streamid: string
          total: number
          public: number
          private: number
          anon: number
          verified: number
        }[]
      }
      sign_stream_daily_count: {
        Args: {
          actionparam: string
          streamid: string
        }
        Returns: Record<string, unknown>[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

