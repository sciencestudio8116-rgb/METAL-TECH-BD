/**
 * Metal Tek BD – Supabase Client
 * 
 * Safely initialises the Supabase client using client-side public environment variables.
 * Enforces Rule 9: Never expose the Supabase service-role key in client code.
 * Adheres strictly to Row Level Security (RLS) policies as specified in PRD section 3.4.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Resolve environment variables supporting both Vite (VITE_) and Next.js (NEXT_PUBLIC_) conventions
const supabaseUrl = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_SUPABASE_URL) ||
  '';

const supabaseAnonKey = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  (typeof import.meta !== 'undefined' && import.meta.env?.NEXT_PUBLIC_SUPABASE_ANON_KEY) ||
  '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

/**
 * Public client for client-side queries.
 * Limited strictly by Row-Level Security (RLS) policies:
 * - Public users can only read published records (is_published = true).
 * - Anyone can submit leads to `resource_leads` with consent = true.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
