import { createClient } from '@supabase/supabase-js';

// Supabase project credentials for Metal Tek BD
// Configured to dynamically read from Vite environment variables during deployment (Vercel)
// with resilient fallback to project default credentials
export const SUPABASE_URL = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) ||
  'https://jqxdzkekcmqhytcdayhq.supabase.co';

export const SUPABASE_ANON_KEY = 
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
  'sb_publishable_2BsxSk0IHRkSsSgxbQWzvQ_ZhNCQwHS';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

/**
 * Uploads an image or document to Supabase Storage bucket 'metaltek-media'
 * and returns the public URL.
 */
export async function uploadMediaToSupabase(
  file: File,
  folder: 'images' | 'thumbnails' | 'datasheets' = 'images'
): Promise<{ url: string | null; error: string | null }> {
  try {
    const fileExt = file.name.split('.').pop();
    const cleanFileName = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `${folder}/${cleanFileName}`;

    const { error: uploadError } = await supabase.storage
      .from('metaltek-media')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (uploadError) {
      console.warn('Supabase storage upload error:', uploadError.message);
      return { url: null, error: uploadError.message };
    }

    const { data } = supabase.storage
      .from('metaltek-media')
      .getPublicUrl(filePath);

    return { url: data.publicUrl, error: null };
  } catch (err: any) {
    return { url: null, error: err.message || 'Unknown upload error' };
  }
}

/**
 * Helper to check connection health to Supabase
 */
export async function checkSupabaseConnection(): Promise<boolean> {
  try {
    const { error } = await supabase.from('site_metadata').select('id').limit(1);
    // If the table exists or error is not a network failure, connection is active
    return !error || error.code !== 'PGRST301';
  } catch {
    return false;
  }
}
