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
      event_view: {
        Row: {
          count: number | null
          path: string
          ref: string
        }
        Insert: {
          count?: number | null
          path: string
          ref?: string
        }
        Update: {
          count?: number | null
          path?: string
          ref?: string
        }
        Relationships: []
      }
      pact_indexer_logs: {
        Row: {
          account: string
          action: string
          model_id: string | null
          referral: string | null
          stream_id: string
          target: string
        }
        Insert: {
          account: string
          action: string
          model_id?: string | null
          referral?: string | null
          stream_id: string
          target: string
        }
        Update: {
          account?: string
          action?: string
          model_id?: string | null
          referral?: string | null
          stream_id?: string
          target?: string
        }
        Relationships: []
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
        Relationships: []
      }
      turnstile_history: {
        Row: {
          challenge_ts: string
          created_at: string | null
          hostname: string
          token: string
        }
        Insert: {
          challenge_ts: string
          created_at?: string | null
          hostname: string
          token: string
        }
        Update: {
          challenge_ts?: string
          created_at?: string | null
          hostname?: string
          token?: string
        }
        Relationships: []
      }
    }
    Views: {
      pact_all: {
        Row: {
          id: string | null
          image: string | null
          media: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          id?: string | null
          image?: never
          media?: never
          title?: never
          type?: never
        }
        Update: {
          id?: string | null
          image?: never
          media?: never
          title?: never
          type?: never
        }
        Relationships: []
      }
      pact_manifesto: {
        Row: {
          id: string | null
          image: string | null
          media: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          id?: string | null
          image?: never
          media?: never
          title?: never
          type?: never
        }
        Update: {
          id?: string | null
          image?: never
          media?: never
          title?: never
          type?: never
        }
        Relationships: []
      }
      pact_openletter: {
        Row: {
          id: string | null
          image: string | null
          media: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          id?: string | null
          image?: never
          media?: never
          title?: never
          type?: never
        }
        Update: {
          id?: string | null
          image?: never
          media?: never
          title?: never
          type?: never
        }
        Relationships: []
      }
      pact_petition: {
        Row: {
          id: string | null
          image: string | null
          media: string | null
          title: string | null
          type: string | null
        }
        Insert: {
          id?: string | null
          image?: never
          media?: never
          title?: never
          type?: never
        }
        Update: {
          id?: string | null
          image?: never
          media?: never
          title?: never
          type?: never
        }
        Relationships: []
      }
      public_signatures: {
        Row: {
          controller_did: string | null
          created_at: string | null
          custom_pactID: string | null
          name: string | null
          organisation: string | null
          title: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      pacts_per_topic: {
        Args: {
          _topic_id: string
        }
        Returns: {
          id: string
          topic_id: string
          type: string
          title: string
          image: string
          media: string
        }[]
      }
      pacts_per_topics_type: {
        Args: {
          _topic_id: string
          _type: string
        }
        Returns: {
          id: string
          topic_id: string
          type: string
          title: string
          image: string
          media: string
        }[]
      }
      referral_signatures: {
        Args: {
          did: string
        }
        Returns: {
          pactID: string
          count: number
        }[]
      }
      sign_daily_count: {
        Args: {
          actionparam: string
        }
        Returns: Record<string, unknown>[]
      }
      sign_stats_referral: {
        Args: {
          did: string
        }
        Returns: {
          streamid: string
          total: number
          public: number
          private: number
          anon: number
          verified: number
          views: number
        }[]
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
          views: number
          influencers: number
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
          views: number
          influencers: number
        }[]
      }
      sign_stream_daily_count: {
        Args: {
          actionparam: string
          streamid: string
        }
        Returns: Record<string, unknown>[]
      }
      topic_all: {
        Args: Record<PropertyKey, never>
        Returns: {
          topic_id: string
          name: string
          count: number
        }[]
      }
      topic_per_type: {
        Args: {
          _type: string
        }
        Returns: {
          topic_id: string
          name: string
          count: number
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
        Relationships: [
          {
            foreignKeyName: "buckets_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: []
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
          version: string | null
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
          version?: string | null
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
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "objects_owner_fkey"
            columns: ["owner"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
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
        Returns: unknown
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

