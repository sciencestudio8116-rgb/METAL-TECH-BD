# Metal Tek BD – Resources Hub: Product Requirements Document

**Version:** 1.0 | **Date:** 3 November 2026 | **Owner:** Product | **Stack:** Next.js (App Router), React, Tailwind CSS, Supabase

> **Hard constraint:** The existing Hero Banners are out of scope and must not be modified, re-styled, re-ordered or re-rendered by any change in this PRD. All work is additive: new routes, new components, new tables.

> **Note on references:** The structure below follows common industry patterns for foundry and metal-casting resource centres, using the metaltek.com "Resources" menu as inspiration for categories. Verify exact menu labels against the live site before finalising copy. Do not copy its text, images or documents; all content must be original or licensed.

---

## 1. Executive Summary & Objectives

### 1.1 Summary

Metal Tek BD serves foundries, OEMs, importers and engineers in Bangladesh's casting and foundry industry. The **Resources Hub** is a self-service knowledge centre that helps visitors evaluate alloys, understand processes, verify quality credentials and see proof of capability, before they contact sales.

### 1.2 Objectives

| # | Objective | Success metric (90 days after launch) |
| --- | --- | --- |
| O1 | Generate qualified leads through gated technical content | 40+ resource-attributed RFQ/contact submissions per month |
| O2 | Reduce repetitive pre-sales questions | 30% fewer basic spec/process enquiries (sales-tracked) |
| O3 | Build trust with certification and case-study evidence | 25% of RFQ visitors view at least one case study or certificate |
| O4 | Capture organic search traffic for casting terms | Top-10 ranking for 15+ target keywords (English and Bangla) |
| O5 | Give engineers a fast alloy lookup tool | Alloy Finder used in 20% of Resources sessions |

### 1.3 Target Users (Personas)

- **Procurement Manager (OEM/manufacturer):** wants certifications, lead times, proof of quality.
- **Design/Process Engineer:** wants alloy composition, mechanical properties, standards equivalents, tolerances.
- **Foundry Owner / Plant Manager:** wants technical papers, process guidance, case studies.
- **Student / Junior Engineer:** wants glossary and FAQs.
- **Internal Admin (Metal Tek BD staff):** needs to publish and update content without developer help.

### 1.4 Non-Goals (v1)

User accounts, e-commerce checkout, live chat, AI assistant, and any change to the home page hero or global navigation styling beyond adding the Resources dropdown entries.

---

## 2. Information Architecture & Sub-menu Hierarchy

### 2.1 Hierarchy

```
Resources  (/resources)
├── Alloy Specifications & Finder   (/resources/alloys)
│     └── Alloy detail               (/resources/alloys/[slug])
├── Technical Papers & Whitepapers  (/resources/technical-papers)
│     └── Paper detail               (/resources/technical-papers/[slug])
├── Case Studies                    (/resources/case-studies)
│     └── Case study detail          (/resources/case-studies/[slug])
├── Quality & Certifications        (/resources/certifications)
├── Casting Processes Guide         (/resources/processes)   [recommended addition]
├── FAQs                            (/resources/faqs)
├── Industry Glossary               (/resources/glossary)
└── Downloads Centre                (/resources/downloads)   [catalogues, datasheets, brochures]
```

The Resources landing page (`/resources`) is an overview hub; it is a **new page** and does not reuse or alter the home page hero.

### 2.2 Sub-menu Detail

#### A. Alloy Specifications & Finder

- **Purpose:** Let engineers look up and compare the alloys Metal Tek BD can cast.
- **Audience:** Design engineers, procurement.
- **Content:** Alloy families (grey iron, ductile iron, carbon and alloy steel, stainless steel, aluminium, brass/bronze, etc.), grades, chemical composition, mechanical properties, equivalent standards (ASTM, EN, DIN, JIS, BS, IS), recommended processes, typical applications.
- **Key features:** Faceted filter, side-by-side comparison (up to 3), spec-sheet PDF download, "Request quote for this alloy" CTA.

#### B. Technical Papers & Whitepapers

- **Purpose:** Demonstrate expertise and capture leads.
- **Audience:** Engineers, plant managers.
- **Content:** Articles and PDFs on casting design, defects and remedies, heat treatment, material selection, cost reduction, local industry insights.
- **Key features:** Topic and industry filters, abstract preview, optional gated download (name, company, email), related papers.

#### C. Case Studies

- **Purpose:** Provide proof of capability.
- **Audience:** Procurement, OEM decision makers.
- **Content:** Challenge, solution, process, alloy used, results (metrics), customer industry, optional testimonial, images.
- **Key features:** Industry, process and alloy filters, metrics highlight bar, PDF version, CTA to RFQ.

#### D. Quality & Certifications

- **Purpose:** Establish credibility and support vendor audits.
- **Audience:** Procurement, QA auditors.
- **Content:** ISO 9001 and other held certificates, test capabilities (spectrometer, tensile, hardness, NDT, CMM), inspection reports samples, quality policy, validity dates, issuing body.
- **Key features:** Certificate cards with expiry status, in-page PDF viewer, downloadable certificate pack. Show only certificates the company actually holds.

#### E. Casting Processes Guide *(recommended)*

- **Purpose:** Explain sand casting, investment casting, die casting, centrifugal casting, shell moulding, etc. and when to use each.
- **Audience:** Engineers, students, buyers.
- **Key features:** Process cards with tolerance range, surface finish, min/max weight, typical volumes, link to compatible alloys.

#### F. FAQs

- **Purpose:** Deflect repetitive questions and support SEO.
- **Audience:** All.
- **Key features:** Categorised accordion, search, "Was this helpful?", FAQ structured data.

#### G. Industry Glossary

- **Purpose:** Define casting and metallurgy terms (English with optional Bangla).
- **Audience:** Students, buyers, junior engineers.
- **Key features:** A–Z index, live search, related terms, deep links per term (`/resources/glossary#gating-system`).

#### H. Downloads Centre

- **Purpose:** One place for catalogues, datasheets, brochures, drawings guidelines and RFQ templates.
- **Key features:** Type filter, file size and format labels, download tracking.

### 2.3 Navigation Rules

- Desktop: "Resources" dropdown (mega-menu) listing the sub-menus above, each with a one-line description.
- Mobile: accordion within the existing hamburger menu.
- Breadcrumbs on every Resources page: Home > Resources > Sub-menu > Item.
- Every page ends with a standard CTA band ("Need a custom casting? Request a Quote").

---

## 3. Content & Data Structure

### 3.1 Shared Conventions

- All tables use `uuid` primary keys, `created_at`, `updated_at`, `is_published boolean default false`, and `slug text unique` where a detail page exists.
- Bilingual support: text fields that need Bangla have a `_bn` twin (e.g. `title_bn`).
- Files stored in Supabase Storage bucket `resources` (public for open files) and `resources-gated` (private; signed URLs).
- SEO fields on public content: `seo_title`, `seo_description`, `og_image_url`.

### 3.2 Field Requirements by Sub-menu

**Alloys**

- Identity: name, grade/designation, family, slug, short description.
- Composition (per element, min/max %): C, Si, Mn, P, S, Cr, Ni, Mo, Cu, Mg, Al, etc.
- Mechanical properties: tensile strength (MPa), yield strength (MPa), elongation (%), hardness (HB/HRC), impact (J), density.
- Standards equivalents: standard body, designation.
- Process compatibility (many-to-many), industries served (many-to-many), typical applications, heat treatment options, weldability/machinability ratings.
- Spec-sheet PDF, images.

**Technical Papers**

- Title, slug, abstract, body (rich text/MDX), authors, publish date, topic tags, industry tags, cover image, PDF file, `is_gated`, reading time, related papers.

**Case Studies**

- Title, slug, customer name (optional anonymisation flag), industry, challenge, solution, process used, alloy used, results summary, metrics (label, value, unit), gallery images, testimonial (quote, name, role), PDF, publish date.

**Certifications**

- Name, issuing body, certificate number, scope, issue date, expiry date, status (active/expired/in renewal), PDF, thumbnail, display order.

**Processes**

- Name, slug, summary, how it works, advantages, limitations, tolerance, surface finish, weight range, volume suitability, diagram image, compatible alloys.

**FAQs**

- Question, answer (rich text), category, display order, related resource links, helpful/unhelpful counters.

**Glossary**

- Term, slug, definition, Bangla term and definition (optional), first letter (generated), related terms, related resource link.

**Downloads**

- Title, description, file type, file size, file URL, category, version, `is_gated`, download count.

**Leads from gated content**

- Name, email, phone, company, role, resource referenced, consent flag, source page, timestamp.

### 3.3 Supabase Schema (PostgreSQL)

```sql
-- Extensions
create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

-- Reusable updated_at trigger
create or replace function set_updated_at() returns trigger as $$
begin new.updated_at = now(); return new; end; $$ language plpgsql;

-- Taxonomies
create table industries (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  name_bn text,
  slug text not null unique
);

create table casting_processes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  name_bn text,
  slug text not null unique,
  summary text,
  how_it_works text,
  advantages text[],
  limitations text[],
  tolerance text,
  surface_finish text,
  min_weight_kg numeric,
  max_weight_kg numeric,
  volume_suitability text,
  diagram_url text,
  display_order int default 0,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table alloy_families (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,   -- e.g. Ductile Iron
  slug text not null unique,
  display_order int default 0
);

-- Alloys
create table alloys (
  id uuid primary key default gen_random_uuid(),
  family_id uuid references alloy_families(id),
  name text not null,
  grade text not null,
  slug text not null unique,
  description text,
  composition jsonb not null default '{}'::jsonb,
    -- e.g. {"C":{"min":3.2,"max":3.8},"Si":{"min":1.8,"max":2.8}}
  tensile_mpa_min numeric,
  yield_mpa_min numeric,
  elongation_pct_min numeric,
  hardness_value text,          -- e.g. "170-241"
  hardness_scale text,          -- HB, HRC
  impact_joules numeric,
  density_g_cm3 numeric,
  machinability text,
  weldability text,
  heat_treatments text[],
  typical_applications text[],
  spec_sheet_url text,
  image_url text,
  seo_title text,
  seo_description text,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index alloys_family_idx on alloys(family_id);
create index alloys_search_idx on alloys using gin ((name || ' ' || grade) gin_trgm_ops);

create table alloy_standards (
  id uuid primary key default gen_random_uuid(),
  alloy_id uuid references alloys(id) on delete cascade,
  standard_body text not null,       -- ASTM, EN, DIN, JIS, BS, IS
  designation text not null
);

create table alloy_processes (
  alloy_id uuid references alloys(id) on delete cascade,
  process_id uuid references casting_processes(id) on delete cascade,
  primary key (alloy_id, process_id)
);

create table alloy_industries (
  alloy_id uuid references alloys(id) on delete cascade,
  industry_id uuid references industries(id) on delete cascade,
  primary key (alloy_id, industry_id)
);

-- Technical papers
create table technical_papers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  title_bn text,
  slug text not null unique,
  abstract text,
  body_mdx text,
  authors text[],
  topics text[],
  cover_image_url text,
  file_path text,                 -- storage path
  is_gated boolean default false,
  reading_time_min int,
  published_at date,
  seo_title text,
  seo_description text,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table paper_industries (
  paper_id uuid references technical_papers(id) on delete cascade,
  industry_id uuid references industries(id) on delete cascade,
  primary key (paper_id, industry_id)
);

-- Case studies
create table case_studies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  customer_name text,
  anonymise_customer boolean default false,
  industry_id uuid references industries(id),
  process_id uuid references casting_processes(id),
  alloy_id uuid references alloys(id),
  challenge text,
  solution text,
  results_summary text,
  metrics jsonb default '[]'::jsonb,
    -- e.g. [{"label":"Scrap reduction","value":"18","unit":"%"}]
  gallery jsonb default '[]'::jsonb,
  testimonial jsonb,              -- {quote, name, role}
  pdf_url text,
  cover_image_url text,
  published_at date,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Certifications
create table certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuing_body text not null,
  certificate_number text,
  scope text,
  issued_on date,
  expires_on date,
  status text check (status in ('active','expired','in_renewal')) default 'active',
  pdf_url text,
  thumbnail_url text,
  display_order int default 0,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- FAQs
create table faq_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  display_order int default 0
);
create table faqs (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references faq_categories(id),
  question text not null,
  answer text not null,
  display_order int default 0,
  helpful_count int default 0,
  unhelpful_count int default 0,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Glossary
create table glossary_terms (
  id uuid primary key default gen_random_uuid(),
  term text not null,
  slug text not null unique,
  definition text not null,
  term_bn text,
  definition_bn text,
  first_letter char(1) generated always as (upper(left(term,1))) stored,
  related_term_ids uuid[] default '{}',
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create index glossary_search_idx on glossary_terms using gin (term gin_trgm_ops);

-- Downloads
create table downloads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,                  -- catalogue, datasheet, brochure, template
  file_path text not null,
  file_type text,                 -- pdf, xlsx, zip
  file_size_kb int,
  version text,
  is_gated boolean default false,
  download_count int default 0,
  is_published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Leads from gated downloads
create table resource_leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  company text,
  job_role text,
  resource_type text not null,    -- paper, download, case_study
  resource_id uuid not null,
  consent boolean not null default false,
  source_url text,
  created_at timestamptz default now()
);

-- Attach updated_at trigger to every table with updated_at
-- (repeat per table)
create trigger trg_alloys_updated before update on alloys
  for each row execute function set_updated_at();
```

### 3.4 Row Level Security (RLS)

```sql
alter table alloys enable row level security;
create policy "public read published alloys" on alloys
  for select using (is_published = true);
-- Repeat for all content tables.

alter table resource_leads enable row level security;
create policy "anyone can submit lead" on resource_leads
  for insert with check (consent = true);
-- No public select. Admin role reads via service key or an admin policy.
```

Admin writes happen only via authenticated admin users (Supabase Auth with an `admin` role claim) or the Supabase dashboard. Never expose the service-role key to the browser.

---

## 4. UI/UX & Component Specifications

### 4.1 Global Resources Layout

- Page shell: breadcrumb, page title block (a plain heading section, **not** a hero banner), content area, CTA band.
- Two-column layout on desktop for listing pages: filter sidebar (280px) and results grid. Filters collapse into a bottom-sheet drawer on mobile.
- Max content width 1200px, 8px spacing grid, WCAG 2.1 AA contrast, keyboard-navigable.
- Design tokens: reuse the existing site colour, font and button tokens. Do not introduce a new global theme.

### 4.2 Search & Filtering

**Global Resources search** (top of `/resources`): single input with debounced (300ms) typeahead across alloys, papers, case studies, FAQs and glossary. Results grouped by type. Implementation: Postgres full-text search plus `pg_trgm` for typo tolerance, exposed via a Supabase RPC `search_resources(query text)`.

**Alloy Finder filters**

| Filter | Control | Source |
| --- | --- | --- |
| Alloy family | Checkbox list | `alloy_families` |
| Grade / designation | Text search | `alloys.grade` |
| Casting process | Checkbox list | `alloy_processes` |
| Industry | Checkbox list | `alloy_industries` |
| Standard (ASTM, EN, DIN, JIS, IS) | Multi-select | `alloy_standards` |
| Tensile strength (MPa) | Range slider | `tensile_mpa_min` |
| Hardness | Range slider | `hardness_value` |
| Element contains (e.g. Ni > 8%) | Advanced panel | `composition` jsonb |

Behaviour: filters apply instantly, state is stored in the URL query string (`?family=ductile-iron&process=sand`) so results are shareable; show active filter chips and a "Clear all" action; show result count; empty state suggests nearby filters and a contact CTA.

**Other listing filters**

- Papers: topic, industry, gated/free, year, sort by newest or most downloaded.
- Case studies: industry, process, alloy.
- Downloads: category, file type.
- FAQs: category tabs plus in-page search.
- Glossary: A–Z bar plus search.

### 4.3 Component Library

| Component | Used on | Specification |
| --- | --- | --- |
| `ResourceCard` | Papers, case studies, downloads | Image (16:9), type badge, title (2-line clamp), excerpt, meta row, CTA |
| `AlloyCard` | Alloy finder | Grade, family badge, 3 key properties, compare checkbox |
| `AlloyDataTable` | Alloy detail | Composition table (element, min %, max %) and mechanical properties table; horizontally scrollable on mobile; sticky first column; units in headers |
| `CompareTray` | Alloy finder | Sticky bottom tray, 2 to 3 alloys, "Compare" opens side-by-side table |
| `FilterPanel` | All listings | Accordion groups, counts per option, URL-synced |
| `MetricsBar` | Case studies | 3 to 4 large metric values with labels |
| `CertificateCard` | Certifications | Thumbnail, name, issuer, validity, status chip (green/amber/red), "View" and "Download" |
| `PdfViewerModal` | Certificates, papers | Accessible modal with embedded viewer (iframe or `react-pdf`), download button, focus trap, ESC to close |
| `GatedDownloadModal` | Gated papers/downloads | Form: name, email, phone (optional), company, consent checkbox. On submit, insert lead then issue a signed URL |
| `FaqAccordion` | FAQs | ARIA-compliant accordion, deep link per question, helpful buttons |
| `GlossaryList` | Glossary | A–Z anchor bar, sticky letters, term anchors |
| `ProcessCard` | Processes | Diagram, spec chips (tolerance, finish, weight) |
| `CtaBand` | All pages | Consistent RFQ call to action |
| `Breadcrumbs` | All pages | Schema.org `BreadcrumbList` markup |

### 4.4 Key Interaction Flows

1. **Alloy lookup:** Resources > Alloys > apply filters > open alloy > view tables > download spec sheet or "Request quote for this alloy" (pre-fills the RFQ form with the grade).
2. **Gated whitepaper:** Open paper > read abstract > click Download > modal form > success state with immediate download and confirmation > lead stored.
3. **Certificate check:** Certifications > card > modal viewer > download pack.
4. **Glossary:** Type term > instant results > open related term or linked process.

### 4.5 States & Edge Cases

- Loading: skeleton cards matching card dimensions (avoid layout shift).
- Empty, error and offline states with retry action.
- Expired certificate shown with a clear "Expired" status, never hidden silently. Admin gets a reminder 60 days before expiry.
- Large PDFs: show file size; open in a new tab on mobile if the embedded viewer fails.
- Images use `next/image` with alt text; tables have captions.

### 4.6 SEO, Performance & Analytics

- Server-rendered or statically generated pages with ISR (`revalidate` 3600s or on-demand revalidation when admin publishes).
- Structured data: `FAQPage`, `Article`, `BreadcrumbList`, `Organization`; `DefinedTerm` for glossary.
- Sitemap entries for all published resource pages; `hreflang` if Bangla pages ship.
- Targets: LCP under 2.5s on 4G, CLS under 0.1, Lighthouse accessibility 90+.
- Events: `resource_view`, `filter_applied`, `alloy_compare`, `download_click`, `gated_form_submit`, `rfq_from_resource`.

### 4.7 Acceptance Criteria (Summary)

- [ ] All eight sub-menus are reachable from the Resources dropdown on desktop and mobile.
- [ ] Alloy Finder filters work individually and in combination; URL reflects state.
- [ ] Gated download stores a lead with consent and only then returns a signed URL.
- [ ] Unpublished records are never visible publicly (verified via RLS test).
- [ ] Existing hero banners are pixel-identical before and after release (visual regression test passes).
- [ ] Pages pass keyboard-only navigation and screen-reader checks.

---

## 5. Implementation Guidelines (Google AI Studio / Next.js / Tailwind)

### 5.1 Golden Rules to Protect the Hero

1. **Do not open, edit or refactor** the hero component file(s), its CSS/Tailwind classes, or the home page section that renders it.
2. **Do not change global styles** (`globals.css`, `tailwind.config`) except to *add* new tokens; never rename or override existing ones.
3. Put all new work in **new folders and routes**. Scope any new CSS to components (Tailwind utilities or CSS modules), not global selectors like `h1`, `section` or `.container`.
4. The only existing file you may touch is the navigation component, and only to **append** the Resources dropdown links.
5. Run a screenshot comparison of the home page before and after every merge.

### 5.2 Recommended Folder Structure (additive only)

```
app/
└── resources/
    ├── layout.tsx                  // breadcrumb + shell, no hero
    ├── page.tsx                    // Resources landing
    ├── alloys/
    │   ├── page.tsx                // Finder
    │   └── [slug]/page.tsx
    ├── technical-papers/{page.tsx,[slug]/page.tsx}
    ├── case-studies/{page.tsx,[slug]/page.tsx}
    ├── certifications/page.tsx
    ├── processes/page.tsx
    ├── faqs/page.tsx
    ├── glossary/page.tsx
    └── downloads/page.tsx
components/resources/
    ├── ResourceCard.tsx, AlloyCard.tsx, AlloyDataTable.tsx
    ├── CompareTray.tsx, FilterPanel.tsx, MetricsBar.tsx
    ├── CertificateCard.tsx, PdfViewerModal.tsx
    ├── GatedDownloadModal.tsx, FaqAccordion.tsx
    ├── GlossaryList.tsx, CtaBand.tsx, Breadcrumbs.tsx
lib/resources/
    ├── supabase.ts                 // typed client
    ├── queries.ts                  // data-access functions
    └── types.ts
```

If you use the Pages Router, mirror this under `pages/resources/`. Because `app/resources/layout.tsx` is nested, it wraps only Resources pages and cannot affect the home page.

### 5.3 Step-by-Step Plan

**Step 0: Safety net**

- Create a branch `feature/resources-hub`.
- Capture baseline screenshots of the home page (desktop and mobile) for hero regression checks.
- Back up the current codebase or tag a release.

**Step 1: Database**

- Run the SQL in section 3.3 in the Supabase SQL editor, then apply RLS (3.4).
- Create storage buckets `resources` (public) and `resources-gated` (private).
- Seed 5 to 10 alloys, 3 papers, 2 case studies, your real certificates, 10 FAQs, 20 glossary terms.

**Step 2: Environment and client**

- Add to `.env.local` (names only; use your own values): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and a server-only `SUPABASE_SERVICE_ROLE_KEY`.
- Create `lib/resources/supabase.ts` using `@supabase/supabase-js` (or `@supabase/ssr`). Use the anon key in the browser and the service key only in server actions or route handlers.

**Step 3: Types and data layer**

- Generate types: `npx supabase gen types typescript --project-id <id> > lib/resources/types.ts`.
- Write query helpers, e.g. `getAlloys(filters)`, `getAlloyBySlug(slug)`, `getPublishedPapers()`, `getCertifications()`.

**Step 4: Build shared components first** `Breadcrumbs`, `CtaBand`, `ResourceCard`, `FilterPanel`, `PdfViewerModal`. Style with Tailwind utilities that reuse your existing colour classes.

**Step 5: Build pages in priority order**

1. Alloys (finder, detail, compare): highest value.
2. Certifications.
3. Case Studies.
4. Technical Papers with gated download.
5. FAQs, Glossary, Processes, Downloads.
6. Resources landing page and global search.

**Step 6: Wire up navigation (the only edit to an existing file)**

- In the header/nav component, add a "Resources" item with the sub-links. Do not change header height, positioning or styles, since these can shift the hero.
- Example (append only):

```tsx
const resourcesMenu = [
  { label: 'Alloy Specifications & Finder', href: '/resources/alloys' },
  { label: 'Technical Papers', href: '/resources/technical-papers' },
  { label: 'Case Studies', href: '/resources/case-studies' },
  { label: 'Quality & Certifications', href: '/resources/certifications' },
  { label: 'Casting Processes', href: '/resources/processes' },
  { label: 'FAQs', href: '/resources/faqs' },
  { label: 'Industry Glossary', href: '/resources/glossary' },
  { label: 'Downloads', href: '/resources/downloads' },
];
```

**Step 7: Gated download endpoint**

- Route handler `app/api/resources/lead/route.ts`: validate input (zod), insert into `resource_leads`, create a signed URL for the private file (expiry 60s), return it. Add basic rate limiting and a honeypot field against spam.

**Step 8: SEO and performance**

- Add `generateMetadata` per page, JSON-LD scripts, `sitemap.ts` entries, ISR revalidation, `next/image` for all media.

**Step 9: QA and release**

- Run through acceptance criteria (4.7), including the hero screenshot diff.
- Test on mobile widths (360px, 390px), tablet and desktop; test with slow 3G throttling.
- Merge to staging, review, then production.

### 5.4 Prompts for Google AI Studio

Use small, scoped prompts so the model does not rewrite existing files. Start every session with this guardrail:

> *"You are editing an existing Next.js + Tailwind + Supabase project. NEVER modify the hero banner component, home page, or global CSS. Only create new files under `app/resources/`, `components/resources/` and `lib/resources/`. The only existing file you may edit is the navigation component, and only to append a Resources dropdown. Show me a diff before changing any existing file."*

Then run these prompts one at a time:

1. *"Create `lib/resources/queries.ts` with typed Supabase functions for alloys with filters for family, process, industry, standard and tensile range, using this schema: \[paste section 3.3\]."*
2. *"Create `components/resources/FilterPanel.tsx` that syncs checkbox and range filters to the URL query string using `useSearchParams`."*
3. *"Create `app/resources/alloys/page.tsx` as a server component that reads `searchParams`, calls `getAlloys`, and renders `AlloyCard` in a responsive grid with FilterPanel on the left."*
4. *"Create `AlloyDataTable.tsx` that renders the `composition` jsonb as an element / min % / max % table and mechanical properties as a second table, scrollable on mobile."*
5. *"Create `GatedDownloadModal.tsx` and `app/api/resources/lead/route.ts` per section 5.3 step 7."*

After each step, run the app and confirm the home page hero is unchanged before continuing.

### 5.5 Admin & Content Operations

- **v1:** Use the Supabase Table Editor and Storage UI with a short editorial checklist (title, slug, SEO fields, publish toggle).
- **v1.1:** Build a protected `/admin/resources` area with forms, image upload and preview.
- Content workflow: draft > review > publish (`is_published`), with an owner assigned to each sub-menu and a quarterly content audit.

### 5.6 Rollout Plan

| Phase | Scope | Timing (suggested) |
| --- | --- | --- |
| 1 | DB, shared components, Alloys, Certifications | Weeks 1 to 2 |
| 2 | Case Studies, Technical Papers, gated leads | Weeks 3 to 4 |
| 3 | FAQs, Glossary, Processes, Downloads, global search | Weeks 5 to 6 |
| 4 | SEO polish, analytics, Bangla content, admin UI | Weeks 7 to 8 |

### 5.7 Risks & Mitigations

| Risk | Mitigation |
| --- | --- |
| AI-generated code edits the hero or global CSS | Guardrail prompt, branch workflow, screenshot regression, review all diffs |
| Inaccurate alloy data causing engineering or legal issues | Technical review by a metallurgist before publishing; add a disclaimer that values are typical and certificates govern |
| Outdated certificates displayed | Expiry field, admin reminders, auto status badge |
| Spam on gated forms | Rate limiting, honeypot, email validation |
| Data protection of leads | Consent checkbox, privacy policy link, RLS, restricted access |
| Content bottleneck | Start with 10 high-value alloys and 2 case studies; expand iteratively |

---

## Appendix: Open Questions for the Team

1. Which certifications does Metal Tek BD currently hold (ISO 9001, others)? Only real certificates may be displayed.
2. Which alloy families and casting processes are in the live product range?
3. Should whitepapers be gated, open, or mixed?
4. Is Bangla content required at launch?
5. Who owns content review: sales, quality, or a metallurgist?
