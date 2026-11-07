-- ==============================================================================
-- METAL TEK BD - MASTER SUPABASE POSTGRESQL PRODUCTION SCHEMA
-- Project ID: jqxdzkekcmqhytcdayhq
-- Project URL: https://jqxdzkekcmqhytcdayhq.supabase.co
-- Description: Complete production schema, tables, triggers, RLS, storage & realtime
-- ==============================================================================

-- 1. Enable Required Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 2. TRIGGER FUNCTION: AUTOMATIC UPDATED_AT TIMESTAMP
-- ==============================================================================
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 3. TABLE DEFINITIONS
-- ==============================================================================

-- 3.1 Corporate Site Metadata (Singleton)
CREATE TABLE IF NOT EXISTS public.site_metadata (
  id TEXT PRIMARY KEY DEFAULT 'default',
  name TEXT NOT NULL DEFAULT 'Metal Tek BD',
  short_name TEXT NOT NULL DEFAULT 'MetalTek',
  tagline TEXT DEFAULT 'High-Integrity Centrifugal & Static Alloy Castings',
  hero_headline TEXT DEFAULT 'Engineering High-Integrity Castings for Severe Service',
  hero_subhead TEXT DEFAULT 'High-performance centrifugal, sand, and investment castings engineered for mission-critical industrial applications.',
  phone TEXT DEFAULT '+880 2 887 8901',
  phone_raw TEXT DEFAULT '+88028878901',
  sales_email TEXT DEFAULT 'sales@metaltekbd.com',
  engineering_email TEXT DEFAULT 'engineering@metaltekbd.com',
  global_hq TEXT DEFAULT 'MetalTek International, Waukesha, WI, USA',
  headquarters_address TEXT DEFAULT 'Plot 42, Sector 7, Uttara Commercial Area, Dhaka 1230, Bangladesh',
  dhaka_hq_address TEXT DEFAULT 'Plot 42, Sector 7, Uttara Commercial Area, Dhaka 1230, Bangladesh',
  plant_address TEXT DEFAULT 'Heavy Alloy Casting & Machining Plant, Joydebpur Road, Gazipur Industrial Zone, Bangladesh',
  chittagong_hub TEXT DEFAULT 'Port Support Depot, Strand Road, Agrabad Commercial Area, Chittagong, Bangladesh',
  response_promise TEXT DEFAULT 'Quotes within 24 hours | 100% NDT Radiographic Testing available on all critical pours.',
  copyright TEXT DEFAULT '© 2026 Metal Tek BD (Authorized MetalTek International Partner). All rights reserved.',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.2 Navigation Menu Hierarchy
CREATE TABLE IF NOT EXISTS public.navigation_menus (
  id TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  label_bn TEXT,
  icon_name TEXT NOT NULL DEFAULT 'Layers',
  route_view TEXT NOT NULL DEFAULT 'metal-casting',
  description TEXT,
  sub_items JSONB NOT NULL DEFAULT '[]'::jsonb,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.3 Casting Processes Cards
CREATE TABLE IF NOT EXISTS public.process_cards (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_bn TEXT,
  summary TEXT NOT NULL,
  summary_bn TEXT,
  description TEXT NOT NULL,
  description_bn TEXT,
  hero_headline TEXT,
  hero_headline_bn TEXT,
  size_limits TEXT,
  size_limits_bn TEXT,
  weight_range TEXT,
  weight_range_bn TEXT,
  tolerances TEXT,
  tolerances_bn TEXT,
  typical_components JSONB DEFAULT '[]'::jsonb,
  typical_components_bn JSONB DEFAULT '[]'::jsonb,
  suitable_alloys JSONB DEFAULT '[]'::jsonb,
  industries_served JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.4 Foundry Capabilities Cards
CREATE TABLE IF NOT EXISTS public.capability_cards (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_bn TEXT,
  icon_name TEXT NOT NULL DEFAULT 'Flame',
  summary TEXT NOT NULL,
  summary_bn TEXT,
  description TEXT NOT NULL,
  description_bn TEXT,
  equipment_highlights JSONB DEFAULT '[]'::jsonb,
  equipment_highlights_bn JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '[]'::jsonb,
  specifications_bn JSONB DEFAULT '[]'::jsonb,
  standards JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.5 Market & Sector Solutions Cards
CREATE TABLE IF NOT EXISTS public.market_cards (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_bn TEXT,
  category_tag TEXT,
  category_tag_bn TEXT,
  summary TEXT NOT NULL,
  summary_bn TEXT,
  challenges TEXT NOT NULL,
  challenges_bn TEXT,
  solutions TEXT NOT NULL,
  solutions_bn TEXT,
  components_supplied JSONB DEFAULT '[]'::jsonb,
  components_supplied_bn JSONB DEFAULT '[]'::jsonb,
  recommended_alloys JSONB DEFAULT '[]'::jsonb,
  sales_contact_market_slug TEXT DEFAULT 'general',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.6 Technical Process Videos
CREATE TABLE IF NOT EXISTS public.videos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_bn TEXT,
  category TEXT DEFAULT 'Foundry Process',
  category_bn TEXT DEFAULT 'ফাউন্ড্রি প্রক্রিয়া',
  description TEXT NOT NULL,
  description_bn TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration TEXT DEFAULT '03:45',
  tags JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.7 Metallurgy & Alloy Grades Catalog
CREATE TABLE IF NOT EXISTS public.alloys (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  family TEXT NOT NULL,
  cast_uns TEXT,
  cast_grade TEXT,
  cast_astm TEXT,
  equivalent_din TEXT,
  wrought_equiv TEXT,
  description TEXT,
  composition JSONB DEFAULT '[]'::jsonb,
  mechanical JSONB DEFAULT '{}'::jsonb,
  suitable_processes JSONB DEFAULT '[]'::jsonb,
  applications JSONB DEFAULT '[]'::jsonb,
  key_attributes JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.8 Technical Whitepapers & Blog Posts
CREATE TABLE IF NOT EXISTS public.blog_posts (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_bn TEXT,
  excerpt TEXT,
  excerpt_bn TEXT,
  category TEXT DEFAULT 'Technical Metallurgy',
  category_bn TEXT DEFAULT 'প্রকৌশল ও ধাতুবিদ্যা',
  content JSONB DEFAULT '[]'::jsonb,
  content_bn JSONB DEFAULT '[]'::jsonb,
  date TEXT,
  author TEXT DEFAULT 'MetalTek Engineering Team',
  read_time TEXT DEFAULT '5 min read',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.9 Industrial Case Studies
CREATE TABLE IF NOT EXISTS public.case_studies (
  slug TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  title_bn TEXT,
  client_industry TEXT NOT NULL,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  results JSONB DEFAULT '[]'::jsonb,
  alloys_used TEXT,
  process TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.10 Frequently Asked Questions (FAQs)
CREATE TABLE IF NOT EXISTS public.faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  question_bn TEXT,
  answer TEXT NOT NULL,
  answer_bn TEXT,
  category TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.11 Technical Downloads & Datasheets
CREATE TABLE IF NOT EXISTS public.downloads (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  title_bn TEXT,
  category TEXT NOT NULL,
  format TEXT DEFAULT 'PDF',
  size TEXT DEFAULT '1.2 MB',
  version TEXT DEFAULT '2026.1',
  description TEXT,
  file_url TEXT,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.12 Metallurgy Glossary Dictionary
CREATE TABLE IF NOT EXISTS public.glossary_terms (
  id SERIAL PRIMARY KEY,
  term TEXT NOT NULL,
  definition TEXT NOT NULL,
  definition_bn TEXT,
  sort_order INT DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.13 RFQ Inquiries & Prospective Leads
CREATE TABLE IF NOT EXISTS public.rfq_leads (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  source TEXT DEFAULT 'Website RFQ Form',
  alloy_or_process TEXT,
  estimated_quantity TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.14 Custom Dynamic Content Items
CREATE TABLE IF NOT EXISTS public.content_items (
  id TEXT PRIMARY KEY,
  menu_id TEXT NOT NULL,
  sub_item_id TEXT NOT NULL,
  title TEXT NOT NULL,
  title_bn TEXT,
  subtitle TEXT,
  subtitle_bn TEXT,
  eyebrow TEXT,
  eyebrow_bn TEXT,
  body_mdx TEXT NOT NULL,
  body_mdx_bn TEXT,
  image_url TEXT,
  pdf_url TEXT,
  pdf_size TEXT,
  specs JSONB DEFAULT '[]'::jsonb,
  is_published BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.15 Admin Audit & Activity Logs
CREATE TABLE IF NOT EXISTS public.admin_action_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  performed_by TEXT DEFAULT 'admin@metaltekbd.com',
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. TRIGGERS: AUTOMATIC TIMESTAMP MAINTENANCE
-- ==============================================================================
DROP TRIGGER IF EXISTS trg_site_metadata_updated_at ON public.site_metadata;
CREATE TRIGGER trg_site_metadata_updated_at BEFORE UPDATE ON public.site_metadata FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_navigation_menus_updated_at ON public.navigation_menus;
CREATE TRIGGER trg_navigation_menus_updated_at BEFORE UPDATE ON public.navigation_menus FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_process_cards_updated_at ON public.process_cards;
CREATE TRIGGER trg_process_cards_updated_at BEFORE UPDATE ON public.process_cards FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_capability_cards_updated_at ON public.capability_cards;
CREATE TRIGGER trg_capability_cards_updated_at BEFORE UPDATE ON public.capability_cards FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_market_cards_updated_at ON public.market_cards;
CREATE TRIGGER trg_market_cards_updated_at BEFORE UPDATE ON public.market_cards FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_videos_updated_at ON public.videos;
CREATE TRIGGER trg_videos_updated_at BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_alloys_updated_at ON public.alloys;
CREATE TRIGGER trg_alloys_updated_at BEFORE UPDATE ON public.alloys FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER trg_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_case_studies_updated_at ON public.case_studies;
CREATE TRIGGER trg_case_studies_updated_at BEFORE UPDATE ON public.case_studies FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_faqs_updated_at ON public.faqs;
CREATE TRIGGER trg_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_downloads_updated_at ON public.downloads;
CREATE TRIGGER trg_downloads_updated_at BEFORE UPDATE ON public.downloads FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_glossary_terms_updated_at ON public.glossary_terms;
CREATE TRIGGER trg_glossary_terms_updated_at BEFORE UPDATE ON public.glossary_terms FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_content_items_updated_at ON public.content_items;
CREATE TRIGGER trg_content_items_updated_at BEFORE UPDATE ON public.content_items FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- ==============================================================================
-- 5. INDEXES FOR HIGH-SPEED QUERY PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_process_cards_slug ON public.process_cards(slug);
CREATE INDEX IF NOT EXISTS idx_capability_cards_slug ON public.capability_cards(slug);
CREATE INDEX IF NOT EXISTS idx_market_cards_slug ON public.market_cards(slug);
CREATE INDEX IF NOT EXISTS idx_alloys_family ON public.alloys(family);
CREATE INDEX IF NOT EXISTS idx_alloys_slug ON public.alloys(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_videos_category ON public.videos(category);
CREATE INDEX IF NOT EXISTS idx_content_items_parent ON public.content_items(menu_id, sub_item_id);
CREATE INDEX IF NOT EXISTS idx_rfq_leads_created_at ON public.rfq_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_action_logs_created_at ON public.admin_action_logs(created_at DESC);

-- ==============================================================================
-- 6. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS across all tables
ALTER TABLE public.site_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.capability_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alloys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glossary_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rfq_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_action_logs ENABLE ROW LEVEL SECURITY;

-- 6.1 Public Read Access
DROP POLICY IF EXISTS "Public Read Site Metadata" ON public.site_metadata;
CREATE POLICY "Public Read Site Metadata" ON public.site_metadata FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Navigation" ON public.navigation_menus;
CREATE POLICY "Public Read Navigation" ON public.navigation_menus FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Process Cards" ON public.process_cards;
CREATE POLICY "Public Read Process Cards" ON public.process_cards FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Capability Cards" ON public.capability_cards;
CREATE POLICY "Public Read Capability Cards" ON public.capability_cards FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Market Cards" ON public.market_cards;
CREATE POLICY "Public Read Market Cards" ON public.market_cards FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Videos" ON public.videos;
CREATE POLICY "Public Read Videos" ON public.videos FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Alloys" ON public.alloys;
CREATE POLICY "Public Read Alloys" ON public.alloys FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Blog Posts" ON public.blog_posts;
CREATE POLICY "Public Read Blog Posts" ON public.blog_posts FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Case Studies" ON public.case_studies;
CREATE POLICY "Public Read Case Studies" ON public.case_studies FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read FAQs" ON public.faqs;
CREATE POLICY "Public Read FAQs" ON public.faqs FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Downloads" ON public.downloads;
CREATE POLICY "Public Read Downloads" ON public.downloads FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Glossary" ON public.glossary_terms;
CREATE POLICY "Public Read Glossary" ON public.glossary_terms FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public Read Content Items" ON public.content_items;
CREATE POLICY "Public Read Content Items" ON public.content_items FOR SELECT USING (is_published = true);

-- 6.2 Public Insert Access for Customer RFQs
DROP POLICY IF EXISTS "Public Insert RFQ Leads" ON public.rfq_leads;
CREATE POLICY "Public Insert RFQ Leads" ON public.rfq_leads FOR INSERT WITH CHECK (true);

-- 6.3 Full Admin / Backend Operations Access
DROP POLICY IF EXISTS "Admin Full Site Metadata" ON public.site_metadata;
CREATE POLICY "Admin Full Site Metadata" ON public.site_metadata FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Navigation" ON public.navigation_menus;
CREATE POLICY "Admin Full Navigation" ON public.navigation_menus FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Process Cards" ON public.process_cards;
CREATE POLICY "Admin Full Process Cards" ON public.process_cards FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Capability Cards" ON public.capability_cards;
CREATE POLICY "Admin Full Capability Cards" ON public.capability_cards FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Market Cards" ON public.market_cards;
CREATE POLICY "Admin Full Market Cards" ON public.market_cards FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Videos" ON public.videos;
CREATE POLICY "Admin Full Videos" ON public.videos FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Alloys" ON public.alloys;
CREATE POLICY "Admin Full Alloys" ON public.alloys FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Blog Posts" ON public.blog_posts;
CREATE POLICY "Admin Full Blog Posts" ON public.blog_posts FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Case Studies" ON public.case_studies;
CREATE POLICY "Admin Full Case Studies" ON public.case_studies FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full FAQs" ON public.faqs;
CREATE POLICY "Admin Full FAQs" ON public.faqs FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Downloads" ON public.downloads;
CREATE POLICY "Admin Full Downloads" ON public.downloads FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Glossary" ON public.glossary_terms;
CREATE POLICY "Admin Full Glossary" ON public.glossary_terms FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Content Items" ON public.content_items;
CREATE POLICY "Admin Full Content Items" ON public.content_items FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full RFQ Leads" ON public.rfq_leads;
CREATE POLICY "Admin Full RFQ Leads" ON public.rfq_leads FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Admin Full Action Logs" ON public.admin_action_logs;
CREATE POLICY "Admin Full Action Logs" ON public.admin_action_logs FOR ALL USING (true) WITH CHECK (true);

-- ==============================================================================
-- 7. SUPABASE STORAGE BUCKET CONFIGURATION
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('metaltek-media', 'metaltek-media', true)
ON CONFLICT (id) DO UPDATE SET public = true;

DROP POLICY IF EXISTS "Public Access Media Bucket" ON storage.objects;
CREATE POLICY "Public Access Media Bucket" ON storage.objects
  FOR SELECT USING (bucket_id = 'metaltek-media');

DROP POLICY IF EXISTS "Admin Upload Media Bucket" ON storage.objects;
CREATE POLICY "Admin Upload Media Bucket" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'metaltek-media');

DROP POLICY IF EXISTS "Admin Update Media Bucket" ON storage.objects;
CREATE POLICY "Admin Update Media Bucket" ON storage.objects
  FOR UPDATE USING (bucket_id = 'metaltek-media');

DROP POLICY IF EXISTS "Admin Delete Media Bucket" ON storage.objects;
CREATE POLICY "Admin Delete Media Bucket" ON storage.objects
  FOR DELETE USING (bucket_id = 'metaltek-media');

-- ==============================================================================
-- 8. REALTIME REPLICATION CONFIGURATION (SAFE IDEMPOTENT BLOCK)
-- ==============================================================================
DO $$
DECLARE
  tbl_name text;
  tables_to_add text[] := ARRAY[
    'site_metadata',
    'navigation_menus',
    'process_cards',
    'capability_cards',
    'market_cards',
    'videos',
    'alloys',
    'blog_posts',
    'case_studies',
    'faqs',
    'downloads',
    'content_items',
    'rfq_leads',
    'admin_action_logs'
  ];
BEGIN
  FOREACH tbl_name IN ARRAY tables_to_add LOOP
    IF NOT EXISTS (
      SELECT 1 FROM pg_publication_tables 
      WHERE pubname = 'supabase_realtime' 
        AND schemaname = 'public' 
        AND tablename = tbl_name
    ) THEN
      EXECUTE format('ALTER PUBLICATION supabase_realtime ADD TABLE public.%I;', tbl_name);
    END IF;
  END LOOP;
END $$;
