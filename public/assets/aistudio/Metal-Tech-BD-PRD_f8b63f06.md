# Metal Tech BD Website: Product Requirements Document (PRD)

| Field | Value |
|---|---|
| Project name | Metal Tech BD Website Development |
| Document version | 1.0 (draft for stakeholder review) |
| Date | 31 October 2026 |
| Reference site | https://www.metaltek.com/ (structure and business logic only; no content, imagery, or branding to be copied) |
| Audience | Business owner, web development team, AI coding environment |
| Status | Draft. Items marked **[TBC]** need confirmation from Metal Tech BD |

---

## 0. How to Read This Document

### 0.1 Reference site analysis: what was actually observed

The following was observed on the live reference homepage and used as the basis of this PRD.

| Area | Observed on reference site |
|---|---|
| Utility bar | Careers, Blogs, Case Studies, Why MetalTek?, Sales Contacts |
| Main navigation (dropdowns) | **Metal Casting** (Centrifugal, Sand, Investment, High-Integrity Ingot, AOD) · **Capabilities** (Additive Manufacturing, Metallurgy & Engineering, Heat Treatment, Machining, Fabrication, Testing & Analysis, Training) · **Alloys** · **Market Solutions** (Aerospace, Defense, Energy, Petrochemical, Process Equipment, Turbine Engine) · **Divisions** (five foundry/site pages) · **Resources** (Blog, Case Studies, Videos, FAQs, Glossary, Downloads) · **Contact Us** |
| Homepage flow | Hero (eyebrow, H1, subhead, "Contact Us" CTA, "Talk to a Metal Expert" label) → "What we do" with six capability cards → "Our Markets" with six market cards plus a "Don't see your market?" prompt → latest blog posts (two cards) → careers teaser with photo gallery → "Ask the Metal Experts" contact CTA → footer |
| Footer | Global HQ address and phone, social links (LinkedIn, YouTube, Facebook), capability links, resource links (FAQ, Blog, Case Studies, Careers, Locations, Certifications, Company History), legal links, cookie consent preferences, site search |
| Platform signals | WordPress with a page-builder plugin |

### 0.2 Deliberate differences from the reference site

| Request in your brief | Finding | PRD decision |
|---|---|---|
| "Continuous Cast" category | Not listed on the reference site (it lists centrifugal, sand, investment, ingot, AOD) | Included as an **optional** category, enabled only if Metal Tech BD actually offers it **[TBC]** |
| Hero **slider** | The reference homepage shows a single static hero | PRD specifies a hero that supports 1–4 slides. Default is one slide. A slider is optional for launch |
| Client testimonials | Not observed on the reference homepage (it uses case studies instead) | Included as a **Should-have** module, shown only when approved testimonials exist |
| Online RFQ multi-step form | The reference exposes a Contact Us page and sales contacts, not a documented multi-step RFQ | PRD adds a full RFQ workflow, a differentiator suited to a B2B lead-generation goal |
| Alloy Finder with composition tables | The reference has an Alloys section; depth of data tooling unverified | PRD defines a searchable alloy database with data-sheet downloads |

### 0.3 Content and legal ground rules

- Metal Tech BD must **not** reuse MetalTek's copy, photography, logos, icons, or alloy datasheets. Structure and feature logic only.
- All certifications, capabilities, equipment counts, and customer names must come from Metal Tech BD's own verified records. No claim may be published without a supporting document (certificate, test report, customer permission).
- Alloy standards references (ASTM, EN, ISO, etc.) must be checked by a qualified metallurgist before publication.

---

## 1. Executive Summary and Project Objectives

### 1.1 Project name
**Metal Tech BD Website Development**

### 1.2 Core business purpose
Present Metal Tech BD as a credible industrial manufacturing partner by:

1. Showcasing manufacturing capabilities (casting, machining, heat treatment, fabrication, testing) and engineering expertise.
2. Presenting custom alloy and metal-processing offerings through a searchable, specification-rich catalog.
3. Building trust through certifications, facilities, case studies, and quality documentation.
4. **Driving B2B inquiries and Requests for Quote (RFQ)**, which is the primary conversion goal.

### 1.3 Target audience (personas)

| Persona | Role | Primary need | Key content | Success action |
|---|---|---|---|---|
| **Procurement Manager** (Priya-type) | Sourcing buyer at an industrial firm | Verify supplier credibility, lead time, certification, get quotes fast | Certifications, capabilities, RFQ, contacts | Submits RFQ |
| **Design / Structural Engineer** | Specifies materials and tolerances | Alloy properties, composition, standards, tolerances | Alloy Finder, datasheets, glossary | Downloads datasheet, contacts engineer |
| **Plant / Maintenance Manager** | Needs wear/heat/corrosion-resistant parts | Match component to harsh environment | Market solutions, case studies | Calls or submits inquiry |
| **Technical Evaluator / Quality Lead** | Audits suppliers | Quality system evidence, test capability | Quality page, certifications, testing lab | Requests audit or facility visit |
| **Export / Overseas Buyer** | International sourcing agent | Capacity, compliance, shipping, communication | English content, global contact info | Submits RFQ |
| **Job Seeker** | Engineer, technician, graduate | Careers and culture | Careers page | Applies / emails HR |

### 1.4 Business goals and KPIs

| Goal | KPI | Target (first 6 months after launch) |
|---|---|---|
| Generate qualified leads | RFQ submissions per month | **[TBC]** baseline; aim for steady month-over-month growth |
| Improve lead quality | % of RFQs with complete specs/attachments | ≥ 60% |
| Engage technical audience | Datasheet downloads per month | **[TBC]** |
| Organic visibility | Non-branded organic sessions | Growth tracked monthly via Search Console |
| Site quality | Lighthouse mobile score (Performance, Accessibility, SEO, Best Practices) | ≥ 90 each |
| Responsiveness to leads | Median first response time to an RFQ | ≤ 1 business day |

### 1.5 Scope

**In scope (Release 1.0):** public corporate website, bilingual-ready content model, CMS, RFQ system, alloy/product database, resource library, blog/case studies, careers page, contact and map, SEO, analytics, security, hosting setup, training.

**Out of scope (Release 1.0):** e-commerce checkout or online payment, customer portal / order tracking, ERP integration, live chat with human agents (a WhatsApp click-to-chat link is in scope), mobile app.

**Future (Release 2.0):** customer portal with RFQ history, CAD file preview, multilingual full rollout, ERP/CRM deep integration.

---

## 2. Comprehensive Feature and Functionality Matrix

**Priority legend (MoSCoW):** M = Must have, S = Should have, C = Could have. **Phase:** P1 = launch, P2 = post-launch.

### 2.1 Header and navigation

| ID | Feature | Description | Pri | Phase |
|---|---|---|---|---|
| NAV-01 | Utility bar | Top strip with phone, email, location/address link, language toggle (EN / বাংলা), and quick links (Careers, Blog, Case Studies, Contact Sales) | M | P1 |
| NAV-02 | Mega-menu | Multi-column dropdown for **Products & Casting**, **Capabilities**, **Alloys**, **Industries**; each panel shows sub-links, short descriptions, and one featured link or image. Opens on hover/focus (desktop), accordion on mobile | M | P1 |
| NAV-03 | Sticky header | Header remains visible on scroll, shrinks in height after 80px | S | P1 |
| NAV-04 | Request-a-Quote CTA | Persistent primary button in the header on all pages, linking to `/request-a-quote/` | M | P1 |
| NAV-05 | Global search | Search icon opens overlay; searches pages, alloys, products, blog, downloads; typeahead suggestions (top 5); results grouped by content type | M | P1 |
| NAV-06 | Mobile navigation | Hamburger opens full-height drawer with accordion sub-menus, prominent Call and RFQ buttons | M | P1 |
| NAV-07 | Breadcrumbs | On all inner pages, with schema markup | M | P1 |
| NAV-08 | Skip link and keyboard nav | "Skip to content" link; full keyboard operation of mega-menu | M | P1 |
| NAV-09 | Language switcher | English default, Bengali for key pages (Home, About, Contact, RFQ) | S | P2 |

**Proposed main navigation structure**

```
Casting & Products     Capabilities          Alloys & Materials     Industries
├─ Centrifugal Casting ├─ Metallurgy & Eng.  ├─ Alloy Finder        ├─ Power & Energy
├─ Sand Casting        ├─ Heat Treatment     ├─ Stainless Steels    ├─ Petrochemical
├─ Investment Casting  ├─ Machining          ├─ Nickel & Cobalt     ├─ Cement & Mining
├─ Continuous Cast*    ├─ Fabrication        ├─ Carbon & Low-Alloy  ├─ Process Equipment
└─ Custom Alloys       ├─ Testing & Analysis └─ Wear-Resistant      ├─ Marine & Shipbuilding
                       └─ Training (opt.)                           └─ Defense & Infrastructure [TBC]
Resources              About                 Contact
├─ Blog                ├─ Company Profile    └─ Request a Quote (button)
├─ Case Studies        ├─ Quality & Certs
├─ Datasheets          ├─ Facilities
├─ Videos              ├─ Careers
├─ FAQs                └─ Leadership
└─ Glossary
* only if offered [TBC]
```

### 2.2 Homepage features

| ID | Feature | Description | Pri | Phase |
|---|---|---|---|---|
| HOME-01 | Hero banner / slider | Eyebrow, H1, subhead, primary CTA (Request a Quote), secondary CTA (View Capabilities). 1–4 slides, auto-rotate off by default, pause control, respects reduced-motion | M | P1 |
| HOME-02 | Trust strip | Row of certification badges (e.g., ISO 9001 **[TBC]**), years in business, key capacity figures, each linked to proof | M | P1 |
| HOME-03 | Company overview | Short "What we do" narrative plus link to About | M | P1 |
| HOME-04 | Capabilities showcase | 6 cards (icon, title, one-line description), each linking to its capability page | M | P1 |
| HOME-05 | Alloy / product categories | Card grid with image, category name, short description, "Explore" link | M | P1 |
| HOME-06 | Industries served | Card grid of target markets, plus "Don't see your industry? Talk to us" prompt | M | P1 |
| HOME-07 | Case studies / news | Two or three latest items, auto-pulled from CMS | M | P1 |
| HOME-08 | Testimonials | Rotating quotes with name, role, company (with written permission) | S | P1 |
| HOME-09 | Facility highlight | Image/video strip or short video of the foundry/workshop | S | P1 |
| HOME-10 | Careers teaser | Short pitch with photo gallery and link to Careers | C | P1 |
| HOME-11 | "Ask the Metal Experts" CTA band | Contact CTA with phone, email, and RFQ button | M | P1 |
| HOME-12 | Global footer | Address, phone, email, social links, capability and resource links, certifications, legal links, newsletter signup, cookie preferences | M | P1 |

### 2.3 Interactive B2B tools

| ID | Feature | Description | Pri | Phase |
|---|---|---|---|---|
| B2B-01 | **RFQ multi-step form** | 4 steps: Contact → Project → Technical specs → Attachments and review. Progress bar, per-step validation, save-as-draft in browser, confirmation page with reference number | M | P1 |
| B2B-02 | RFQ attachments | Upload drawings and specs (PDF, DWG, DXF, STEP/STP, IGES/IGS, XLSX, DOCX, JPG, PNG), up to 5 files, 25 MB total, server-side validation and virus scan | M | P1 |
| B2B-03 | RFQ auto-routing | Routes by selected process or industry to the right sales contact; email notification plus CRM/spreadsheet record | M | P1 |
| B2B-04 | Auto-reply | Instant confirmation email with reference ID and expected response time | M | P1 |
| B2B-05 | Quote-from-product button | "Request a quote" on any alloy or product page pre-fills RFQ (alloy, process) | M | P1 |
| B2B-06 | **Alloy Finder** | Search and filter alloys by family, standard/grade, process, application, corrosion/heat/wear rating, and composition ranges | M | P1 |
| B2B-07 | Datasheet library | Filterable list of downloadable PDFs with file size, revision date, and optional email gate | M | P1 |
| B2B-08 | Compare alloys | Select up to 3 alloys and view side-by-side properties | C | P2 |
| B2B-09 | Product search and filter | Faceted filters (category, process, material, industry), sort, URL-persisted state | M | P1 |
| B2B-10 | Technical glossary | A–Z searchable glossary with anchor links used for tooltips on alloy pages | S | P1 |
| B2B-11 | Callback request | Short form: name, phone, preferred time | S | P1 |
| B2B-12 | WhatsApp click-to-chat | Floating button on mobile linking to the sales WhatsApp number | S | P1 |
| B2B-13 | Newsletter signup | Double opt-in, segmented by interest | C | P2 |

### 2.4 Platform and admin features

| ID | Feature | Pri | Phase |
|---|---|---|---|
| PLT-01 | Headless or traditional CMS with role-based editing (see §6.4) | M | P1 |
| PLT-02 | Admin dashboard for RFQ list, status (New / In review / Quoted / Won / Lost), notes, CSV export | M | P1 |
| PLT-03 | Redirect manager (301s) | M | P1 |
| PLT-04 | Media library with automatic image optimization | M | P1 |
| PLT-05 | Cookie consent manager | M | P1 |
| PLT-06 | Analytics and event tracking (see §7.4) | M | P1 |
| PLT-07 | Scheduled publishing and content preview | S | P1 |
| PLT-08 | Automated backups with restore test | M | P1 |

---

## 3. Detailed Page-by-Page Requirements

### 3.1 Home Page (`/`)

**Purpose:** Establish credibility in 5 seconds, route each persona to the right path, and push toward an RFQ.

| Section | Content | Required behavior |
|---|---|---|
| Hero | Eyebrow (brand promise), H1 (core value proposition), subhead, 2 CTAs | CTA buttons tracked as events; image is LCP-optimized and preloaded |
| Trust strip | Certification logos, years in operation, capacity highlights | Each item links to proof (certificate PDF or Quality page) |
| What we do | 6 capability cards | Entire card clickable; keyboard focus ring |
| Products / alloys | 4–6 category cards | Links to category pages |
| Industries | 6 market cards plus "Don't see your industry?" prompt | Prompt links to Contact |
| Proof | Latest case studies / news; testimonials | Pulled dynamically from CMS |
| Facility | Photo/video strip | Video lazy-loaded, no autoplay with sound |
| CTA band | "Ask the Metal Experts" with phone, email, RFQ | Phone number is `tel:` link on mobile |

**Required CTAs:** Request a Quote (primary, repeated at least 3 times), View Capabilities, Download Company Profile (PDF), Contact an Engineer.

### 3.2 About Us / Company Profile (`/about/`)

| Sub-page | Route | Requirements |
|---|---|---|
| Company profile | `/about/` | Mission, vision, value proposition, founding story, leadership summary, key figures **[TBC]** |
| History | `/about/history/` | Timeline component (year, milestone, image) |
| Quality & certifications | `/about/quality-certifications/` | Quality policy statement; certificate cards (ISO 9001, ISO 14001, ISO 45001, others **[TBC]**) each with issuing body, scope, validity dates, downloadable PDF; list of inspection and test methods |
| Facilities | `/about/facilities/` | Overview of foundry/workshop: location, area, equipment list (furnaces, machines, test equipment) **[TBC]**; photo gallery; optional embedded video tour; "Request a facility visit" button |
| Leadership | `/about/leadership/` | Photo, name, role, short bio |
| Why Metal Tech BD | `/about/why-metal-tech-bd/` | Differentiators with evidence; customer logos only with permission |
| Careers | `/careers/` | Open positions list, culture section, application form (name, email, CV upload, position) with spam protection |

**Acceptance note:** Every certification claim requires a linked certificate or a documented approval from management before it appears on the site.

### 3.3 Products and Capabilities

#### 3.3.1 Structure

- **Casting hub** `/casting/` with one page per process:
  - `/casting/centrifugal-casting/`
  - `/casting/sand-casting/`
  - `/casting/investment-casting/`
  - `/casting/continuous-casting/` *(optional [TBC])*
  - `/casting/custom-alloys/`
- **Capabilities hub** `/capabilities/` with:
  - `/capabilities/metallurgy-engineering/`
  - `/capabilities/heat-treatment/`
  - `/capabilities/machining/`
  - `/capabilities/fabrication/`
  - `/capabilities/testing-analysis/`
- **Industries hub** `/industries/` with one page per industry.

#### 3.3.2 Standard process / capability page template

| Block | Content |
|---|---|
| Hero | Title, one-line benefit, image, RFQ button |
| Overview | 2–3 paragraphs: what the process is, why it matters |
| Specifications table | Size range, weight range, tolerance, surface finish, quantity range, lead time guidance **[TBC]** |
| Suitable alloys | Linked list to Alloy Finder entries |
| Typical components | Image cards (e.g., rolls, sleeves, housings, valve bodies) |
| Industries served | Linked chips |
| Process steps | Visual step sequence (only if the process is genuinely sequential) |
| Quality & testing | Inspection methods applicable to this process |
| Related case studies | 2–3 cards |
| Downloads | Datasheets and brochures |
| FAQ | Accordion with FAQ schema |
| CTA | Request a Quote (prefilled with process) |

#### 3.3.3 Product / component listing

- Grid or list toggle, 12 items per page, pagination or "Load more".
- Filters: process, material family, industry, size class. Active filters shown as removable chips; result count; clear-all.
- Product detail page: name, gallery, description, applicable alloys, process, size range, standards, downloads, "Request a quote for this item" button.

### 3.4 Technical Resources and Alloy Finder

**Routes:** `/alloys/` (finder), `/alloys/{slug}/` (detail), `/resources/datasheets/`, `/resources/glossary/`.

#### 3.4.1 Alloy detail page

| Section | Data |
|---|---|
| Header | Alloy name/trade designation, family, standard equivalents (ASTM / EN / ISO / UNS), status badges (heat-resistant, corrosion-resistant, wear-resistant) |
| Description | Characteristics and typical uses |
| **Chemical composition table** | Element, min %, max %, notes. Elements as rows (C, Mn, Si, P, S, Cr, Ni, Mo, Cu, Nb, Co, Fe, others) |
| **Mechanical properties table** | Property, condition (as-cast / heat-treated), value or range, unit, test standard. Properties: tensile strength, yield strength, elongation, hardness, impact energy, max service temperature |
| Physical properties | Density, melting range, thermal conductivity, thermal expansion (optional) |
| Available processes | Linked to casting process pages |
| Heat treatment | Typical heat-treatment condition notes |
| Applications | Components and industries |
| Downloads | Datasheet PDF (with revision date) |
| CTA | "Request a quote for this alloy" |
| Disclaimer | "Values are typical and not a specification; contact engineering for certified requirements." |

#### 3.4.2 Alloy Finder behavior

| Capability | Requirement |
|---|---|
| Search | Keyword search over name, grade, and standard (e.g., "CF8M", "1.4408") with synonyms |
| Filters | Family (stainless, nickel-base, cobalt-base, carbon/low-alloy, wear-resistant), process, industry, property flags, element range sliders (e.g., Cr 18–26%) |
| Results | Cards or table; sortable; export result list to CSV (S) |
| Performance | Results update ≤ 300 ms after filter change for up to 500 alloys |
| URL state | Filter state encoded in query string for shareable links |
| Compare | Up to 3 alloys, side-by-side tables (P2) |
| Empty state | Message explaining no match, with "Ask our metallurgists" button |

**Data accuracy rule:** All composition and property values must be entered from Metal Tech BD's verified datasheets, with a "last reviewed" date and reviewer name stored in the CMS.

#### 3.4.3 Other resources

| Resource | Requirement |
|---|---|
| Datasheet library | Title, category, language, file size, revision date; filter by type (alloy, process, brochure, certificate) |
| Download gating | Public by default; optional email capture for premium docs (admin switch per file) |
| Blog | Categories, tags, author, reading time, related posts, share links |
| Case studies | Challenge → Solution → Result structure; metrics; industry and process tags; downloadable PDF |
| Videos | Embedded privacy-enhanced video with transcript |
| FAQs | Categorized accordion with FAQ schema |
| Glossary | A–Z with search; terms deep-linkable |

### 3.5 Contact and Quote Request

#### 3.5.1 Contact page (`/contact/`)

| Element | Requirement |
|---|---|
| Contact form | Name, company, email, phone, department (Sales / Technical / Careers / Other), message; spam-protected; success and error states |
| Sales contacts | Directory by region/product with name, role, phone, email **[TBC]** |
| Head office and plant | Address cards, business hours, `tel:` and `mailto:` links |
| Interactive map | Embedded map with markers for office and plant, "Get directions" link, lazy-loaded after interaction to protect performance |
| Social and chat | LinkedIn, Facebook, YouTube, WhatsApp |
| Response promise | Visible statement of expected response time |

#### 3.5.2 Request a Quote page (`/request-a-quote/`): multi-step RFQ

**Step 1: Contact details**

| Field | Type | Required |
|---|---|---|
| Full name | Text | Yes |
| Company name | Text | Yes |
| Job title | Text | No |
| Business email | Email (warn on free-mail domains, do not block) | Yes |
| Phone / WhatsApp | Tel with country code | Yes |
| Country / city | Select / text | Yes |

**Step 2: Project overview**

| Field | Type | Required |
|---|---|---|
| Industry | Select (from Industries list) | Yes |
| Process of interest | Multi-select (casting types, machining, heat treatment, fabrication, testing, not sure) | Yes |
| Project type | Radio: New part / Repeat order / Replacement / Development / R&D | Yes |
| Short project description | Textarea (max 2,000 chars) | Yes |

**Step 3: Technical specifications**

| Field | Type | Required |
|---|---|---|
| Alloy / grade (search-as-you-type from Alloy Finder, plus free text) | Autocomplete | No |
| Standard / specification | Text | No |
| Approx. weight per piece | Number plus unit (kg / lb) | No |
| Key dimensions | Text | No |
| Quantity (first order / annual) | Number | Yes |
| Heat treatment / machining required | Checkboxes | No |
| Testing / certification required (e.g., MTC, NDT) | Checkboxes | No |
| Target delivery date | Date | No |
| Delivery location | Text | No |

**Step 4: Attachments and review**

| Field | Type | Required |
|---|---|---|
| File upload | Drag and drop, max 5 files / 25 MB | No |
| NDA needed? | Checkbox | No |
| Consent to be contacted and privacy policy | Checkbox | Yes |
| Bot protection | Invisible or checkbox challenge | Yes |
| Review summary | Read-only recap with "Edit" per step | n/a |

**Behavior**
- Progress indicator ("Step 2 of 4"); Back and Next without data loss; field-level validation with clear messages.
- Progress saved in `sessionStorage` so a refresh does not lose entries.
- On submit: server validation, store record, send internal notification (routed per process or industry), send auto-reply, show confirmation with reference ID (e.g., `RFQ-2026-000123`).
- Admin can change status, add notes, assign owner, and export.
- Fully usable on mobile with number/tel keyboards.

---

## 4. Information Architecture and URL Routes

```
/                                  Home
/about/                            Company profile
  /about/history/
  /about/quality-certifications/
  /about/facilities/
  /about/leadership/
  /about/why-metal-tech-bd/
/casting/                          Casting hub
  /casting/centrifugal-casting/
  /casting/sand-casting/
  /casting/investment-casting/
  /casting/continuous-casting/     (optional)
  /casting/custom-alloys/
/capabilities/
  /capabilities/metallurgy-engineering/
  /capabilities/heat-treatment/
  /capabilities/machining/
  /capabilities/fabrication/
  /capabilities/testing-analysis/
/products/                         Product listing (filterable)
  /products/{slug}/
/alloys/                           Alloy Finder
  /alloys/{slug}/
/industries/
  /industries/{slug}/
/resources/
  /resources/blog/  and  /resources/blog/{slug}/
  /resources/case-studies/  and  /resources/case-studies/{slug}/
  /resources/datasheets/
  /resources/videos/
  /resources/faqs/
  /resources/glossary/
/careers/  and  /careers/{slug}/
/contact/
/request-a-quote/
/request-a-quote/thank-you/
/search/?q=
/privacy-policy/   /terms/   /cookie-policy/   /accessibility/
/sitemap.xml   /robots.txt   /404
```

**URL rules:** lowercase, hyphen-separated, no file extensions, no IDs in public URLs, trailing-slash policy applied consistently, canonical tag on every page, 301 redirects for any changed URL.

---

## 5. Content Model and Data Requirements

### 5.1 CMS content types

| Content type | Key fields |
|---|---|
| Page | Title, slug, hero, flexible content blocks, SEO fields |
| Process / Capability | Title, summary, hero image, spec table, suitable alloys (relation), industries (relation), FAQs, downloads |
| Product | Name, slug, images, process, alloys, industries, size range, standards, downloads |
| Alloy | Name, slug, family, standard equivalents, description, composition rows, mechanical rows, physical rows, processes, applications, datasheet file, last-reviewed date/reviewer |
| Industry | Name, slug, intro, challenges, solutions, related products, related case studies |
| Case study | Title, client (optional and anonymizable), industry, process, challenge, solution, result, metrics, images, PDF |
| Blog post | Title, slug, author, category, tags, body, featured image, publish date |
| Datasheet | Title, type, file, language, revision date, gated flag |
| Certification | Name, issuing body, scope, valid from/to, file, logo |
| Testimonial | Quote, name, role, company, permission flag |
| Team member | Name, role, photo, bio |
| Job opening | Title, department, location, description, status |
| Location / contact | Name, address, coordinates, phones, emails, hours |
| Glossary term | Term, definition, related terms |
| FAQ | Question, answer, category |
| RFQ submission | See below |
| Redirect | From, to, type |

### 5.2 RFQ record schema (reference)

```json
{
  "id": "RFQ-2026-000123",
  "createdAt": "2026-11-05T09:30:00+06:00",
  "status": "new",
  "assignedTo": null,
  "contact": { "name": "", "company": "", "title": "", "email": "", "phone": "", "country": "", "city": "" },
  "project": { "industry": "", "processes": [], "type": "", "description": "" },
  "specs": {
    "alloy": "", "standard": "", "weight": { "value": null, "unit": "kg" },
    "dimensions": "", "quantityFirst": null, "quantityAnnual": null,
    "heatTreatment": false, "machining": false, "testing": [], "targetDate": null, "deliveryLocation": ""
  },
  "attachments": [{ "name": "", "size": 0, "mime": "", "storageKey": "" }],
  "consent": { "privacy": true, "timestamp": "", "ipHash": "" },
  "source": { "utm": {}, "referrer": "", "page": "" },
  "notes": []
}
```

---

## 6. Technical Architecture and Recommended Stack

### 6.1 Recommendation

| Layer | Primary recommendation | Alternative |
|---|---|---|
| Front end | **Next.js (React) with server-side rendering / static generation**, TypeScript, Tailwind CSS or CSS variables from the design system | WordPress with a block theme (closest to the reference site's likely platform; faster for non-technical teams, weaker for complex Alloy Finder) |
| CMS | Headless CMS (Payload CMS, Strapi, or Sanity) with role-based access | WordPress with custom post types and ACF |
| Database | PostgreSQL | MySQL (if WordPress) |
| Search | Meilisearch or Algolia for site search and Alloy Finder facets | PostgreSQL full-text search for small datasets |
| File storage | S3-compatible object storage with signed URLs for RFQ attachments | Local storage with strict permissions |
| Email | Transactional provider (Postmark, SES, or SMTP) with SPF, DKIM, DMARC | n/a |
| Hosting / CDN | Cloud host (e.g., Vercel, AWS, or a Singapore/India-region VPS) behind **Cloudflare** CDN and WAF | Local Bangladesh hosting plus Cloudflare (verify uptime and bandwidth) |
| Forms bot protection | Cloudflare Turnstile or Google reCAPTCHA v3 | hCaptcha |
| Maps | Google Maps Embed / JS API (lazy-loaded) | OpenStreetMap with Leaflet |
| Analytics | GA4 plus Google Search Console; optional privacy-friendly alternative (Plausible) | n/a |

**Hosting note:** Most visitors may be in Bangladesh and overseas buyers elsewhere. Choose a region with good latency to both and serve static assets via CDN edge nodes.

### 6.2 Environments
Local → Staging (password-protected, `noindex`) → Production. CI/CD pipeline runs lint, type-check, unit tests, build, and automated accessibility and Lighthouse checks on each pull request.

### 6.3 Key components to build

| Component | Notes |
|---|---|
| Mega-menu | Accessible (ARIA, focus trap on mobile), data-driven from CMS |
| Card grid | Reusable, 1/2/3-column responsive |
| Hero / slider | Supports single image, video, or slides |
| Data tables | Responsive with horizontal scroll and sticky first column |
| Filter/facet UI | URL-synchronized |
| Multi-step form | Schema-driven, shared validation client and server |
| File uploader | Chunked, progress, type/size checks |
| Timeline, accordion, tabs, breadcrumbs, pagination, toast, modal | Standard library, all keyboard accessible |

### 6.4 Roles and permissions

| Role | Permissions |
|---|---|
| Super admin | Everything including users, settings, redirects |
| Editor | Create and publish content, manage media |
| Technical reviewer | Approve alloy and datasheet content (required gate before publishing alloy data) |
| Sales | View and manage RFQs and contact submissions; no content editing |
| Viewer / HR | Manage careers content and applications only |

### 6.5 Integrations

| Integration | Purpose | Phase |
|---|---|---|
| Email service | RFQ notifications and auto-replies | P1 |
| CRM (HubSpot, Zoho, or Google Sheets as interim) | Lead sync from RFQ and contact forms | P1 (interim), P2 (full) |
| Google Maps | Location display | P1 |
| WhatsApp Business link | Click-to-chat | P1 |
| Social profiles | Footer links, share buttons | P1 |
| Video (YouTube privacy mode / Vimeo) | Facility and process videos | P1 |
| Newsletter (Mailchimp / Brevo) | Subscriptions | P2 |

---

## 7. Non-Functional Requirements (NFR)

### 7.1 Performance and speed

| ID | Requirement | Target |
|---|---|---|
| NFR-P1 | Largest Contentful Paint (mobile, 4G) | ≤ 2.5 s |
| NFR-P2 | Interaction to Next Paint | ≤ 200 ms |
| NFR-P3 | Cumulative Layout Shift | ≤ 0.1 |
| NFR-P4 | Time to First Byte (cached HTML via CDN) | ≤ 600 ms |
| NFR-P5 | Lighthouse Performance (mobile) | ≥ 90 on Home, a process page, and an alloy page |
| NFR-P6 | Initial page weight (excluding lazy media) | ≤ 1.5 MB; JS ≤ 200 KB gzipped on content pages |
| NFR-P7 | Images | AVIF/WebP with JPEG fallback, responsive `srcset`, explicit width/height, lazy loading below the fold, hero image preloaded |
| NFR-P8 | Fonts | Self-hosted or preconnect, `font-display: swap`, max 2 families and 3 weights |
| NFR-P9 | Video | Lazy-loaded, poster image, no autoplay with sound; embeds load on interaction |
| NFR-P10 | Caching | Long-lived immutable cache for hashed assets; CDN caching for HTML with on-publish purge; Brotli/gzip compression; HTTP/2 or HTTP/3 |
| NFR-P11 | Third-party scripts | Loaded deferred; each new script requires justification |
| NFR-P12 | Availability | ≥ 99.9% monthly uptime with external monitoring and alerts |

### 7.2 Responsiveness and accessibility

| ID | Requirement |
|---|---|
| NFR-R1 | Fully functional and visually correct at 320 px to 2560 px widths |
| NFR-R2 | Layout breakpoints: ≤ 768 px (mobile, 1 column), 769–1024 px (tablet, 2 columns), > 1024 px (desktop, 3 columns), content container 1100 px |
| NFR-R3 | Touch targets ≥ 44 × 44 px; no hover-only functionality |
| NFR-R4 | Tested on latest two versions of Chrome, Safari, Firefox, Edge; iOS Safari and Android Chrome; low-end Android device profile |
| NFR-R5 | Tables, code, and wide content scroll inside their own container; no page-level horizontal scroll |
| NFR-R6 | Meets **WCAG 2.2 AA**: color contrast, keyboard navigation, visible focus, alt text, form labels and error messages, ARIA where needed, reduced-motion support, and a published accessibility statement |
| NFR-R7 | Print stylesheet for alloy datasheets and RFQ confirmation |

### 7.3 Security and privacy

| ID | Requirement |
|---|---|
| NFR-S1 | **TLS 1.2+ (prefer 1.3)** on all pages; HTTP redirects to HTTPS; HSTS enabled |
| NFR-S2 | Security headers: Content-Security-Policy, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, frame protection |
| NFR-S3 | **Form spam protection**: Cloudflare Turnstile or reCAPTCHA, plus honeypot field, server-side rate limiting per IP, and email/domain validation |
| NFR-S4 | Input validation and output encoding on server for every field; parameterized queries; protection against XSS, CSRF, SQL injection, and SSRF |
| NFR-S5 | **File uploads**: allow-list of extensions and MIME types, size limits, randomized storage names, antivirus scan, storage outside web root, access via short-lived signed URLs |
| NFR-S6 | Admin access: unique accounts, strong passwords, **2FA required**, login throttling, audit log of edits and exports |
| NFR-S7 | Data at rest and in backups encrypted; secrets in environment vault, never in code |
| NFR-S8 | WAF and DDoS protection through CDN; automated dependency vulnerability scanning; patching within 14 days for high-severity issues |
| NFR-S9 | Personal data minimization: collect only fields needed; documented retention period (e.g., RFQ data retained **[TBC]** years); deletion on request; IP addresses hashed |
| NFR-S10 | Cookie consent banner with granular choices; analytics and marketing scripts blocked until consent; privacy policy and terms published. Confirm obligations under applicable Bangladeshi law and the laws of key export markets with legal counsel |
| NFR-S11 | Daily automated backups, 30-day retention, quarterly restore test; documented recovery objectives (RPO ≤ 24 h, RTO ≤ 4 h) |
| NFR-S12 | Pre-launch security review or penetration test of forms and admin area |

### 7.4 SEO, metadata, and analytics

| ID | Requirement |
|---|---|
| NFR-E1 | Clean, descriptive URLs per §4; canonical tags; 301 redirects; custom 404 page with search and links |
| NFR-E2 | Unique, editable `<title>` (≤ 60 characters) and meta description (≤ 155 characters) per page, with auto-generated templates as a fallback (e.g., `{Alloy} | Cast Alloy Specifications | Metal Tech BD`) |
| NFR-E3 | One H1 per page; logical heading hierarchy; descriptive alt text; descriptive internal link text |
| NFR-E4 | Open Graph and Twitter Card tags with a default share image and per-page overrides |
| NFR-E5 | Auto-generated `sitemap.xml` (split by content type) and `robots.txt`; staging marked `noindex` |
| NFR-E6 | **Schema.org JSON-LD**: `Organization` / `Manufacturer` (site-wide), `LocalBusiness` (contact page), `WebSite` with `SearchAction`, `BreadcrumbList`, `Product` (product and alloy pages, no price), `FAQPage`, `Article` (blog, case studies), `JobPosting` (careers), `VideoObject` |
| NFR-E7 | `hreflang` tags if Bengali pages are published |
| NFR-E8 | Google Search Console and Bing Webmaster Tools verified; Core Web Vitals monitored |
| NFR-E9 | GA4 events: `rfq_start`, `rfq_step_complete`, `rfq_submit`, `contact_submit`, `datasheet_download`, `alloy_filter_used`, `phone_click`, `whatsapp_click`, `search_used`. RFQ submission is a key event/conversion |
| NFR-E10 | Keyword plan covering terms such as "metal casting Bangladesh", "alloy castings manufacturer", "centrifugal casting", "heat-resistant alloy castings". Final terms to be validated by keyword research |

**Sample Organization schema (adapt after confirming facts)**

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Metal Tech BD",
  "url": "https://www.example.com/",
  "logo": "https://www.example.com/assets/logo.png",
  "description": "Metal casting, alloy manufacturing, and industrial engineering services in Bangladesh.",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[TBC]",
    "addressLocality": "[TBC]",
    "addressCountry": "BD"
  },
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "sales",
    "telephone": "+880-[TBC]",
    "email": "[TBC]",
    "availableLanguage": ["English", "Bengali"]
  }],
  "sameAs": ["https://www.linkedin.com/company/[TBC]", "https://www.facebook.com/[TBC]"]
}
```

### 7.5 Maintainability and operations

| ID | Requirement |
|---|---|
| NFR-M1 | Editors can add or edit pages, alloys, products, and posts without developer help |
| NFR-M2 | Source code in a private Git repository with README, environment setup, and deployment runbook |
| NFR-M3 | Automated tests: unit tests for form validation and filters; end-to-end tests for RFQ submission, search, and Alloy Finder |
| NFR-M4 | Error monitoring (e.g., Sentry) and uptime monitoring with email/SMS alerts |
| NFR-M5 | Design tokens (colors, type, spacing) centralized so a rebrand needs a single change |
| NFR-M6 | Documentation and a 2-hour training session for the Metal Tech BD team |

### 7.6 Localization
English is the launch language. The data model, URL scheme, and templates must support Bengali (বাংলা) from day one, including Unicode-correct fonts (for example Noto Sans Bengali) and right layout behavior. Bengali translations of Home, About, Contact, and RFQ are Phase 2 unless the business decides otherwise.

---

## 8. Design and Brand Requirements

- Visual direction: professional, trustworthy, industrial. Royal-blue primary, deep-navy sections, restrained yellow accent, light-gray surfaces, strong imagery of real facilities and products.
- Use the previously prepared **MetalTek-inspired Design System Guide** as a starting point for tokens and components, but replace the palette, logo, typography, and imagery with Metal Tech BD's own brand identity where one exists **[TBC]**.
- Photography: original photos of Metal Tech BD's foundry, products, and people. Stock imagery only as a temporary fallback and clearly flagged for replacement.
- Dark-mode support is optional (Could have).

---

## 9. Acceptance Criteria and Quality Assurance

### 9.1 Definition of done (per feature)
1. Meets functional requirement and acceptance criteria.
2. Responsive at all breakpoints and passes WCAG 2.2 AA checks.
3. Passes automated tests and code review.
4. Meets performance budget.
5. Content editable in CMS where applicable.
6. Analytics events verified.

### 9.2 Key acceptance tests

| # | Scenario | Expected result |
|---|---|---|
| AT-01 | User completes RFQ with valid data and a 10 MB PDF | Confirmation with reference ID; sales receives routed email; record visible in admin; auto-reply delivered |
| AT-02 | User submits RFQ with missing required field | Inline error on the field, no data loss, focus moved to the first error |
| AT-03 | Bot submits RFQ (no valid token) | Rejected server-side; no email sent |
| AT-04 | Upload of `.exe` or oversize file | Rejected with a clear message |
| AT-05 | Alloy Finder: filter "stainless" + "centrifugal" + Cr 18–26% | Only matching alloys; URL reflects filters; reload keeps the same results |
| AT-06 | Click "Request a quote" on an alloy page | RFQ opens with that alloy prefilled |
| AT-07 | Global search "CF8M" | Alloy appears at the top of grouped results |
| AT-08 | Keyboard-only navigation through mega-menu and RFQ | Fully operable, focus visible, no traps |
| AT-09 | Mobile (360 px) checks on Home, a process page, an alloy page | No horizontal scroll, tap targets ≥ 44 px, readable text |
| AT-10 | Lighthouse mobile on key templates | ≥ 90 Performance, Accessibility, Best Practices, SEO |
| AT-11 | Decline cookies | Analytics and marketing scripts do not load |
| AT-12 | Publish a new alloy via CMS (with reviewer approval) | Appears in finder, sitemap, and search within 5 minutes |
| AT-13 | Old URL requested after a slug change | 301 redirect to the new URL |
| AT-14 | Security scan | No high or critical findings open at launch |

### 9.3 UAT
Business stakeholders test the staging site against this PRD for 5 working days, log defects in the tracker, and sign off in writing before go-live.

---

## 10. Delivery Plan, Risks, and Open Questions

### 10.1 Suggested phases

| Phase | Scope | Indicative duration |
|---|---|---|
| 0. Discovery | Confirm business facts, content inventory, brand assets, keyword research | 1–2 weeks |
| 1. UX and design | Sitemap, wireframes, high-fidelity templates, design system | 3 weeks |
| 2. Build (core) | CMS, templates, navigation, Home, process/capability pages, contact | 5–6 weeks |
| 3. Build (B2B tools) | RFQ system, Alloy Finder, datasheets, search, admin dashboard | 4–5 weeks |
| 4. Content and QA | Data entry, SEO, accessibility, performance, security testing, UAT | 3 weeks |
| 5. Launch and hypercare | Go-live, monitoring, training, 30-day support | 2 weeks plus support |

*Durations are indicative and depend on content readiness and team size.*

### 10.2 Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Delayed or low-quality content (photos, datasheets) | Launch slip, weak credibility | Content owner assigned in Phase 0; shot list for photography; placeholders flagged |
| Unverified technical data published | Reputation and liability | Technical reviewer approval gate; "typical values" disclaimer |
| Copying reference-site assets | Legal exposure | Original content only; review before launch |
| Spam or malicious uploads via RFQ | Security and inbox noise | Bot protection, scanning, rate limits |
| Slow performance for distant visitors | Lost leads | CDN, image optimization, performance budget |
| Scope creep (portal, ERP) | Budget and time | Hold to Release 1.0 scope; Release 2.0 backlog |
| Low RFQ completion rate | Fewer leads | Short steps, optional technical fields, analytics on drop-off |

### 10.3 Open questions for Metal Tech BD

1. Exact services and processes offered (is continuous casting included?), and the alloy families.
2. Certifications held (ISO 9001, 14001, 45001, others), with certificates and validity dates.
3. Company history, founding year, facility locations, and equipment lists.
4. Target markets (domestic Bangladesh only, or export?), and the main industries.
5. Existing brand assets (logo, colors, fonts), domain name, and email setup.
6. Named sales and technical contacts for RFQ routing.
7. Will datasheets be public or gated by email?
8. Is Bengali content required at launch?
9. Preferred CRM and whether any existing systems must integrate.
10. Budget range, preferred hosting region, and launch date.
11. Legal review owner for privacy policy, terms, and data retention.

---

## Appendix A: Content Inventory Checklist (Minimum for Launch)

- [ ] Logo and brand guidelines (vector)
- [ ] 20+ original photos (facility, process, products, team); 1–2 short videos
- [ ] Company profile text and history
- [ ] Certificates (PDF) and quality policy
- [ ] Process and capability descriptions with specification ranges
- [ ] Alloy data (composition and mechanical properties) with verified sources
- [ ] 3+ case studies or project examples
- [ ] Testimonials with written permission (if used)
- [ ] Contact details, map coordinates, business hours
- [ ] Privacy, cookie, and terms text (legal-reviewed)
- [ ] Job openings (if any)
- [ ] 5–10 initial blog topics

## Appendix B: `robots.txt` Baseline

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /request-a-quote/thank-you/
Sitemap: https://www.example.com/sitemap.xml
```

## Appendix C: Document Sign-off

| Name | Role | Decision | Date |
|---|---|---|---|
| | Business owner | | |
| | Project manager | | |
| | Technical lead | | |
| | Quality / metallurgy reviewer | | |
