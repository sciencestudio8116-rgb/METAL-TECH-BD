-- ==============================================================================
-- Metal Tek BD - Production PostgreSQL & Supabase Dual-Language Schema
-- ==============================================================================
-- Description: Supports bi-directional English and Bengali storage for articles,
-- component specifications, and customer RFQs with Row-Level Security (RLS).
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Articles & Technical Papers Table (Dual-Language)
CREATE TABLE IF NOT EXISTS public.articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(255) UNIQUE NOT NULL,
    -- English Content
    title_en TEXT NOT NULL,
    excerpt_en TEXT,
    content_en JSONB NOT NULL DEFAULT '[]'::jsonb, -- Array of paragraphs
    category_en VARCHAR(100) DEFAULT 'Technical Metallurgy',
    -- Bengali Content
    title_bn TEXT,
    excerpt_bn TEXT,
    content_bn JSONB DEFAULT '[]'::jsonb, -- Array of Bengali paragraphs
    category_bn VARCHAR(100) DEFAULT 'প্রকৌশল ও ধাতুবিদ্যা',
    -- Metadata
    author VARCHAR(150) DEFAULT 'MetalTek Engineering Team',
    read_time VARCHAR(50) DEFAULT '5 min read',
    image_url TEXT,
    is_published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Dynamic Sub-Menu Component Content & Specifications (Dual-Language)
CREATE TABLE IF NOT EXISTS public.content_items (
    id VARCHAR(100) PRIMARY KEY,
    menu_id VARCHAR(100) NOT NULL,
    sub_item_id VARCHAR(100) NOT NULL,
    -- English Content
    title_en TEXT NOT NULL,
    subtitle_en TEXT,
    eyebrow_en TEXT,
    body_mdx_en TEXT NOT NULL,
    -- Bengali Content
    title_bn TEXT,
    subtitle_bn TEXT,
    eyebrow_bn TEXT,
    body_mdx_bn TEXT,
    -- Media & Specs
    image_url TEXT,
    pdf_url TEXT,
    pdf_size VARCHAR(50) DEFAULT '1.5 MB',
    specs JSONB DEFAULT '[]'::jsonb, -- Array of { "key": string, "value": string }
    is_published BOOLEAN DEFAULT true,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Customer RFQs & Engineering Inquiries Table
CREATE TABLE IF NOT EXISTS public.rfq_leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(200) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(100),
    company VARCHAR(255),
    source VARCHAR(100) DEFAULT 'Website RFQ Form',
    alloy_or_process TEXT,
    estimated_quantity VARCHAR(100),
    message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Row Level Security (RLS) Policies
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rfq_leads ENABLE ROW LEVEL SECURITY;

-- Public can read published articles & content items in any language
CREATE POLICY "Public can view published articles"
    ON public.articles FOR SELECT
    USING (is_published = true);

CREATE POLICY "Public can view published content items"
    ON public.content_items FOR SELECT
    USING (is_published = true);

-- Anyone can submit RFQ inquiries/leads
CREATE POLICY "Public can insert RFQ leads"
    ON public.rfq_leads FOR INSERT
    WITH CHECK (true);

-- Authenticated admins have full CRUD access
CREATE POLICY "Admins full access to articles"
    ON public.articles FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins full access to content items"
    ON public.content_items FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Admins full access to rfq leads"
    ON public.rfq_leads FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 6. Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_articles_slug ON public.articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_published ON public.articles(is_published);
CREATE INDEX IF NOT EXISTS idx_content_menu_sub ON public.content_items(menu_id, sub_item_id);
