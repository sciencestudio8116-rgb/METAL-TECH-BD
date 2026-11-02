# Metal Tech BD: Sitemap & Page Architecture Document

Master blueprint for a developer or AI coding tool. Modeled on the structure of https://www.metaltek.com/ (verified 2026-10-31). Machine-readable twin: `metal-tech-bd-sitemap.json`.

## 0. Reading Guide

| Status | Meaning |
|---|---|
| `observed` | route and layout seen on reference |
| `route_observed` | URL seen in reference nav; internal layout not fetched, template inferred |
| `inferred_layout` | template inferred from reference patterns |
| `added` | not in reference; recommended for Metal Tech BD |

**Scope of verification:** I opened the homepage, Contact Us, Alloys (Alloy Guide & Finder) and several Sales Contacts pages. Menu routes for process, capability, market and division pages come from the live navigation, but their inner layouts were not opened, so their sections are inferred from the patterns on the pages I did read. Treat them as a starting template.

**Do not copy** MetalTek's text, photos, logos, alloy data or contact names. Only structure and logic are reused; content must be Metal Tech BD's own.

## 1. Header & Global Navigation

### 1.1 Top (utility) bar

| Item | Route | Status |
|---|---|---|
| Careers | `/careers/` | observed |
| Blogs | `/resources/blog/` | observed |
| Case Studies | `/resources/case-studies/` | observed |
| Why MetalTek? | `/why-metaltek/` | observed |
| Sales Contacts | `/sales-contacts/` | observed |

Not present on the reference but recommended for Metal Tech BD: phone number, sales email, language switcher (EN / বাংলা), social icons. No language or region selector was observed on the reference.

### 1.2 Main navbar and dropdown hierarchy

Logo links to `/`. Each parent label is also a link to its hub page. The last item, **Contact Us**, is a plain menu link (no separate Request-a-Quote button was observed).

```text
Metal Casting  ->  /metal-casting/
  - Centrifugal Casting  ->  /metal-casting/centrifugal-casting/
  - Sand Casting  ->  /metal-casting/sand-casting/
  - Investment Casting  ->  /metal-casting/investment-casting/
  - High-Integrity Ingot  ->  /metal-casting/ingot/
  - Argon Oxygen Decarburization (AOD)  ->  /metal-casting/aod/
Capabilities  ->  /capabilities/
  - Additive Manufacturing  ->  /capabilities/additive-manufacturing/
  - Metallurgy & Engineering  ->  /capabilities/metallurgy-engineering/
  - Metal Heat Treatment  ->  /capabilities/heat-treatment/
  - Metal Machining  ->  /capabilities/metal-machining/
  - Metal Fabrication  ->  /capabilities/metal-fabrication/
  - Metal Testing & Analysis  ->  /capabilities/metal-testing-analysis/
  - TekSession Training  ->  /capabilities/training/
Alloys  ->  /alloys/
Market Solutions  ->  /market-solutions/
  - Aerospace  ->  /market-solutions/aerospace/
  - Defense  ->  /market-solutions/defense/
  - Energy  ->  /market-solutions/energy/
  - Petrochemical  ->  /market-solutions/petrochemical/
  - Process Equipment  ->  /market-solutions/process-equipment/
  - Turbine Engine  ->  /market-solutions/turbine-engine/
Divisions  ->  /divisions/
  - Carondelet  ->  /divisions/carondelet/
  - Sandusky International  ->  /divisions/sandusky-international/
  - Wisconsin Centrifugal  ->  /divisions/wisconsin-centrifugal/
  - Wisconsin Investcast  ->  /divisions/wisconsin-investcast/
  - Oil Systems  ->  /divisions/oil-systems/
Resources  ->  /resources/
  - Blog  ->  /resources/blog/
  - Case Studies  ->  /resources/case-studies/
  - Videos  ->  /resources/videos/
  - FAQs  ->  /resources/faqs/
  - Glossary  ->  /resources/glossary/
  - Downloads  ->  /resources/downloads/
Contact Us  ->  /contact-us/
```

Other global elements: skip-to-content link; breadcrumbs `Home » Parent » Current` on inner pages; a search element exists in the footer block (header search not confirmed); an **Ask The Metal Experts** band with a Contact Us button appears above the footer on content pages.

## 2. Page Inventory & Routing

Routes below are the recommended Metal Tech BD routes. Where the reference differs, `reference_route` is shown.

| Route | Title | Template | Status |
|---|---|---|---|
| `/` | Home | home | observed |
| `/why-metal-tech-bd/` (ref `/why-metaltek/`) | Why Metal Tech BD? | static | route_observed |
| `/careers/` (ref `/careers/`) | Careers | static | route_observed |
| `/sales-contacts/` | Sales Contacts | static | observed |
| `/sales-contacts/energy/` | Energy Sales Contacts | static | observed |
| `/sales-contacts/turbine-engine/` (ref `/sales-contacts/turbineengine/`) | Turbine Engine Sales Contacts | static | observed |
| `/sales-contacts/paper/` | Paper Sales Contacts | static | observed |
| `/sales-contacts/process-industries/` (ref `/sales-contacts/processindustries`) | Process Industries Sales Contacts | static | observed |
| `/sales-contacts/defense/` | Defense Sales Contacts | static | observed |
| `/sales-contacts/aerospace/` | Aerospace Sales Contacts | static | added |
| `/sales-contacts/petrochemical/` | Petrochemical Sales Contacts | static | added |
| `/metal-casting/` (ref `/metal-casting/`) | Metal Casting | hub | observed |
| `/metal-casting/centrifugal-casting/` | Centrifugal Casting | process | route_observed |
| `/metal-casting/sand-casting/` | Sand Casting | process | route_observed |
| `/metal-casting/investment-casting/` | Investment Casting | process | route_observed |
| `/metal-casting/ingot/` | High-Integrity Ingot | process | route_observed |
| `/metal-casting/aod/` | Argon Oxygen Decarburization (AOD) | process | route_observed |
| `/capabilities/` | Capabilities | hub | observed |
| `/capabilities/additive-manufacturing/` | Additive Manufacturing | capability | route_observed |
| `/capabilities/metallurgy-engineering/` | Metallurgy & Engineering | capability | route_observed |
| `/capabilities/heat-treatment/` | Metal Heat Treatment | capability | route_observed |
| `/capabilities/metal-machining/` | Metal Machining | capability | route_observed |
| `/capabilities/metal-fabrication/` | Metal Fabrication | capability | route_observed |
| `/capabilities/metal-testing-analysis/` | Metal Testing & Analysis | capability | route_observed |
| `/capabilities/training/` | TekSession Training | capability | route_observed |
| `/alloys/` | Non-Ferrous, Stainless & Specialty Alloys (Alloy Guide & Finder) | listing | observed |
| `/alloys/page/{n}/` (ref `/alloys/paged-2/{n}/`) | Alloys listing, page n | listing | observed |
| `/alloys/{slug}/` (ref `/alloy/{slug}/`) | Alloy detail | static | route_observed |
| `/alloy-guide/` | Alloy Guide (download) | static | route_observed |
| `/market-solutions/` | Market Solutions | hub | observed |
| `/market-solutions/aerospace/` | Aerospace | market | route_observed |
| `/market-solutions/defense/` | Defense | market | route_observed |
| `/market-solutions/energy/` | Energy | market | route_observed |
| `/market-solutions/petrochemical/` | Petrochemical | market | route_observed |
| `/market-solutions/process-equipment/` | Process Equipment | market | route_observed |
| `/market-solutions/turbine-engine/` | Turbine Engine | market | route_observed |
| `/divisions/` | Divisions | hub | observed |
| `/divisions/carondelet/` | Carondelet | division | route_observed |
| `/divisions/sandusky-international/` | Sandusky International | division | route_observed |
| `/divisions/wisconsin-centrifugal/` | Wisconsin Centrifugal | division | route_observed |
| `/divisions/wisconsin-investcast/` | Wisconsin Investcast | division | route_observed |
| `/divisions/oil-systems/` | Oil Systems | division | route_observed |
| `/resources/` | Resources | hub | observed |
| `/resources/blog/` | Blog | listing | observed |
| `/blog/{slug}/` | Blog post | post | observed |
| `/resources/case-studies/` | Case Studies | listing | route_observed |
| `/resources/case-studies/{slug}/` | Case study | post | added |
| `/resources/videos/` | Videos | listing | route_observed |
| `/resources/faqs/` | FAQs | static | observed |
| `/resources/glossary/` | Glossary | listing | route_observed |
| `/resources/downloads/` | Downloads | listing | route_observed |
| `/contact-us/` | Contact Us and Request for Quote | static | observed |
| `/certifications/` | Certifications | static | route_observed |
| `/company-history/` | Company History | static | route_observed |
| `/privacy-policy/` | Privacy Policy | legal | route_observed |
| `/accessibility-statement/` | Accessibility Statement | legal | route_observed |
| `/website-terms-conditions/` | Website Terms & Conditions | legal | route_observed |
| `/do-not-sell-or-share-my-personal-information/` | Do Not Sell or Share My Personal Information | legal | route_observed |
| `/contact-us/thank-you/` | Thank you (contact / RFQ) | static | added |
| `/search/` | Search results | listing | added |
| `/404` | Page not found | static | added |

Total route definitions: 61 (templates with `{slug}` expand to many pages). Also required: `/sitemap.xml`, `/robots.txt`, PDF assets for legal documents.

### 2.1 Page templates (sections)

**home**: hero (eyebrow, H1, subhead, CTA, helper label); what_we_do: 6 capability cards; our_markets: 6 market cards + 'Don't see your market?' prompt; latest_blogs: 2 cards + View All Blogs; careers_teaser + photo gallery; ask_the_metal_experts_band

**hub**: breadcrumb; H1 + intro; child card grid (image/icon, title, one-line description, link); related blogs or case studies (optional); ask_the_metal_experts_band

**process**: breadcrumb; H1 + hero image; process overview; specifications / size & weight ranges; suitable alloys (links to /alloys/); typical components + industries served; related blogs / case studies; ask_the_metal_experts_band

**capability**: breadcrumb; H1 + hero image; service overview; equipment / expertise highlights; related processes and markets; related blogs; ask_the_metal_experts_band

**market**: breadcrumb; H1 + hero image; market challenges and requirements; components and alloys for this market; related case studies / blogs; link to market sales contact (/sales-contacts/{market}/); ask_the_metal_experts_band

**division**: breadcrumb; H1 + facility image; division overview and specialties; location and contact block; equipment / processes list; ask_the_metal_experts_band

**listing**: breadcrumb; H1 + intro; card grid (banner image, title, date, excerpt, Read More >>); pagination or load more; ask_the_metal_experts_band

**post**: breadcrumb; H1 + banner image + publish date; article body; related posts; CTA to /contact-us/; ask_the_metal_experts_band

**static**: breadcrumb; H1 + intro; body content blocks; ask_the_metal_experts_band

**legal**: breadcrumb; H1; long-form text; (no pre-footer band required)

### 2.2 Page objectives and special layouts

- **Home** (`/`): Establish credibility in seconds and route each visitor to the right capability, market or contact path.
- **Why Metal Tech BD?** (`/why-metal-tech-bd/`): Differentiate the company with evidence-backed reasons to buy.
- **Careers** (`/careers/`): Attract technicians and engineers; list openings and application path.
- **Sales Contacts** (`/sales-contacts/`): Let buyers pick their market and reach the right Key Account Manager.
- **Energy Sales Contacts** (`/sales-contacts/energy/`): Show the Energy sales team with direct phone and email.
- **Turbine Engine Sales Contacts** (`/sales-contacts/turbine-engine/`): Show the Turbine Engine sales team with direct phone and email.
- **Paper Sales Contacts** (`/sales-contacts/paper/`): Show the Paper sales team with direct phone and email.
- **Process Industries Sales Contacts** (`/sales-contacts/process-industries/`): Show the Process Industries sales team with direct phone and email.
- **Defense Sales Contacts** (`/sales-contacts/defense/`): Show the Defense sales team with direct phone and email.
- **Aerospace Sales Contacts** (`/sales-contacts/aerospace/`): Show the Aerospace sales team with direct phone and email.
- **Petrochemical Sales Contacts** (`/sales-contacts/petrochemical/`): Show the Petrochemical sales team with direct phone and email.
- **Metal Casting** (`/metal-casting/`): Introduce all casting processes and route to each.
- **Centrifugal Casting** (`/metal-casting/centrifugal-casting/`): Explain the Centrifugal Casting process, size limits, alloys and typical parts, and drive an inquiry.
- **Sand Casting** (`/metal-casting/sand-casting/`): Explain the Sand Casting process, size limits, alloys and typical parts, and drive an inquiry.
- **Investment Casting** (`/metal-casting/investment-casting/`): Explain the Investment Casting process, size limits, alloys and typical parts, and drive an inquiry.
- **High-Integrity Ingot** (`/metal-casting/ingot/`): Explain the High-Integrity Ingot process, size limits, alloys and typical parts, and drive an inquiry.
- **Argon Oxygen Decarburization (AOD)** (`/metal-casting/aod/`): Explain the Argon Oxygen Decarburization (AOD) process, size limits, alloys and typical parts, and drive an inquiry.
- **Capabilities** (`/capabilities/`): Overview of all engineering, processing and quality services.
- **Additive Manufacturing** (`/capabilities/additive-manufacturing/`): Describe Additive Manufacturing capability and convert to inquiry.
- **Metallurgy & Engineering** (`/capabilities/metallurgy-engineering/`): Describe Metallurgy & Engineering capability and convert to inquiry.
- **Metal Heat Treatment** (`/capabilities/heat-treatment/`): Describe Metal Heat Treatment capability and convert to inquiry.
- **Metal Machining** (`/capabilities/metal-machining/`): Describe Metal Machining capability and convert to inquiry.
- **Metal Fabrication** (`/capabilities/metal-fabrication/`): Describe Metal Fabrication capability and convert to inquiry.
- **Metal Testing & Analysis** (`/capabilities/metal-testing-analysis/`): Describe Metal Testing & Analysis capability and convert to inquiry.
- **TekSession Training** (`/capabilities/training/`): Describe TekSession Training capability and convert to inquiry.
- **Non-Ferrous, Stainless & Specialty Alloys (Alloy Guide & Finder)** (`/alloys/`): Let engineers find an alloy grade by search and filters, then request details.
- **Alloys listing, page n** (`/alloys/page/{n}/`): Paginated alloy results. *Note: Reference showed 16 pages.*
- **Alloy detail** (`/alloys/{slug}/`): Show composition, properties, standards and applications for one grade; capture a lead. *Note: Reference uses singular /alloy/{slug}/ (e.g. /alloy/stainless-steel-martensitic-mtek-440c/). Plural form recommended for consistency.*
- **Alloy Guide (download)** (`/alloy-guide/`): Offer the alloy guide PDF in exchange for contact details.
- **Market Solutions** (`/market-solutions/`): Show every industry served and route to each.
- **Aerospace** (`/market-solutions/aerospace/`): Prove capability in the Aerospace market.
- **Defense** (`/market-solutions/defense/`): Prove capability in the Defense market.
- **Energy** (`/market-solutions/energy/`): Prove capability in the Energy market.
- **Petrochemical** (`/market-solutions/petrochemical/`): Prove capability in the Petrochemical market.
- **Process Equipment** (`/market-solutions/process-equipment/`): Prove capability in the Process Equipment market.
- **Turbine Engine** (`/market-solutions/turbine-engine/`): Prove capability in the Turbine Engine market.
- **Divisions** (`/divisions/`): Introduce each production site and specialty. *Note: Rename to /facilities/ if Metal Tech BD has no separate divisions.*
- **Carondelet** (`/divisions/carondelet/`): Describe the Carondelet site (replace with Metal Tech BD plants).
- **Sandusky International** (`/divisions/sandusky-international/`): Describe the Sandusky International site (replace with Metal Tech BD plants).
- **Wisconsin Centrifugal** (`/divisions/wisconsin-centrifugal/`): Describe the Wisconsin Centrifugal site (replace with Metal Tech BD plants).
- **Wisconsin Investcast** (`/divisions/wisconsin-investcast/`): Describe the Wisconsin Investcast site (replace with Metal Tech BD plants).
- **Oil Systems** (`/divisions/oil-systems/`): Describe the Oil Systems site (replace with Metal Tech BD plants).
- **Resources** (`/resources/`): Gateway to learning and download content.
- **Blog** (`/resources/blog/`): Publish expertise that earns search traffic and trust.
- **Blog post** (`/blog/{slug}/`): Educate and link readers to a relevant capability or contact. *Note: Posts live under /blog/ while the listing is /resources/blog/. Recommend /resources/blog/{slug}/ for Metal Tech BD.*
- **Case Studies** (`/resources/case-studies/`): Prove results with real projects.
- **Case study** (`/resources/case-studies/{slug}/`): Tell challenge, solution and result for one project.
- **Videos** (`/resources/videos/`): Show processes and facilities on video.
- **FAQs** (`/resources/faqs/`): Answer common buying and technical questions and push to Contact Us.
- **Glossary** (`/resources/glossary/`): Define technical terms for search and buyers.
- **Downloads** (`/resources/downloads/`): Host brochures, alloy guide and where-used guide.
- **Contact Us and Request for Quote** (`/contact-us/`): Single conversion page for questions and RFQs.
- **Certifications** (`/certifications/`): Display quality certificates and standards.
- **Company History** (`/company-history/`): Tell the company story and milestones.
- **Privacy Policy** (`/privacy-policy/`): Legal and compliance.
- **Accessibility Statement** (`/accessibility-statement/`): Legal and compliance.
- **Website Terms & Conditions** (`/website-terms-conditions/`): Legal and compliance.
- **Do Not Sell or Share My Personal Information** (`/do-not-sell-or-share-my-personal-information/`): Legal and compliance.
- **Thank you (contact / RFQ)** (`/contact-us/thank-you/`): Confirm submission, show reference, suggest next steps.
- **Search results** (`/search/`): Show results for the site search (footer 'Search' in reference).
- **Page not found** (`/404`): Recover lost visitors.

**Pages with verified, non-template layouts**

- `/alloys/`: breadcrumb | H1 + intro (browse, search, filter; custom alloys available) | 'Download Our Alloy Guide' button | search box + filters: Alloys, Alloy Cast Number, MetalTek Grade + Filter Reset | alloy cards: title (grade/UNS + family), Cast UNS, Cast Grade, Cast ASTM, Military/ASM, 'Learn More »' | pagination: 1 2 3 … 16, Next » | related blogs + View All Blogs | ask_the_metal_experts_band
- `/contact-us/`: breadcrumb 'Home » Contact Us' | H1 + 'How can we help?' intro | KAM prompt + 'View Key Account Managers' button (-> /sales-contacts/) | contact form + RFQ form (embedded) | 'Our Locations': 5 cards (name, address, PH, FX) | ask_the_metal_experts_band
- `/sales-contacts/`: breadcrumb | H1 'Find your Key Account Manager' | intro: select your market; phone, sales email and Contact Us form fallback | market selector cards (one per market) | ask_the_metal_experts_band
- `/sales-contacts/energy/`: breadcrumb 'Home » Sales Contacts » Energy Sales Contact' | H1 market name | contact cards: photo, name, role, phone, email, sales coverage note | 'Return to Sales Contacts' link | ask_the_metal_experts_band
- `/resources/faqs/`: breadcrumb | H1 | categorized questions with answers | inline links to casting processes, blog, Contact Us form | ask_the_metal_experts_band

## 3. Footer & Secondary Links

Structure: dark footer with white logo; headquarters block (phone, address); social icons (LinkedIn, YouTube, Facebook); two link columns; legal row; consent preferences; copyright.

**Our Capabilities**

| Label | Route |
|---|---|
| Metal Casting | `/metal-casting/` |
| Additive Manufacturing | `/capabilities/additive-manufacturing/` |
| Metallurgy & Engineering | `/capabilities/metallurgy-engineering/` |
| Precision Metal Heat Treatment | `/capabilities/heat-treatment/` |
| Metal Machining | `/capabilities/metal-machining/` |
| Metal Fabrication | `/capabilities/metal-fabrication/` |
| Metal Testing & Analysis | `/capabilities/metal-testing-analysis/` |
| TekSession Training | `/capabilities/training/` |

**Additional Resources**

| Label | Route |
|---|---|
| FAQ | `/resources/faqs/` |
| Blog | `/resources/blog/` |
| Case Studies | `/resources/case-studies/` |
| Careers | `/careers/` |
| Locations | `/contact-us/` |
| Certifications | `/certifications/` |
| Company History | `/company-history/` |

**Legal row**

| Label | Target |
|---|---|
| Privacy Policy | /privacy-policy/ |
| Cookie Policy | external policy-manager page |
| Accessibility Statement | /accessibility-statement/ |
| Website Terms & Conditions | /website-terms-conditions/ |
| EEO Posting | PDF |
| EEO Supplement | PDF |
| Pay Transparency | PDF |
| Transparency in Coverage Rule (MRFs) | external |
| Do Not Sell or Share My Personal Information | /do-not-sell-or-share-my-personal-information/ |

- Consent Preferences: opens cookie-preferences dialog (#)
- Newsletter: NOT present on reference; optional add-on (email + consent, double opt-in)
- EEO, Pay Transparency and Transparency in Coverage are US-specific; replace with Bangladesh-applicable policies.

## 4. Interactive Features & Link Interconnectivity

### 4.1 Navigation flows

| From | Via | To |
|---|---|---|
| `/` | hero 'Contact Us' | `/contact-us/` |
| `/` | capability cards (6) | `/capabilities/metallurgy-engineering/`, `/metal-casting/`, `/capabilities/heat-treatment/`, `/capabilities/metal-machining/`, `/capabilities/metal-fabrication/`, `/capabilities/metal-testing-analysis/` |
| `/` | market cards (6) + 'Take Me To More Markets' | `/market-solutions/{market}/`, `/market-solutions/process-equipment/` |
| `/` | latest blogs + 'View All Blogs' | `/blog/{slug}/`, `/resources/blog/` |
| `/` | careers 'Learn More' | `/careers/` |
| `/contact-us/` | 'View Key Account Managers' | `/sales-contacts/` |
| `/sales-contacts/` | market card | `/sales-contacts/{market}/` |
| `/sales-contacts/{market}/` | 'Return to Sales Contacts' | `/sales-contacts/` |
| `/alloys/` | alloy card 'Learn More »' | `/alloys/{slug}/` |
| `/alloys/` | 'Download Our Alloy Guide' | `/alloy-guide/` |
| `any page` | 'Ask The Metal Experts' band | `/contact-us/` |
| `/contact-us/ (submit)` | form success | `/contact-us/thank-you/` |

### 4.2 CTA inventory

| Label | Destination | Location |
|---|---|---|
| Contact Us | `/contact-us/` | Ask The Metal Experts band on every content page |
| Contact Us | `/contact-us/` | / (hero) |
| Take Me To More Markets | `/market-solutions/process-equipment/` | / (markets) |
| View All Blogs | `/resources/blog/` | / (blogs) |
| Learn More | `/careers/` | / (careers) |
| Contact Us | `/contact-us/` | / (expert band) |
| Download Our Alloy Guide | `/alloy-guide/` | /alloys/ |
| contact us | `/contact-us/` | /alloys/ |
| TekSession | `/capabilities/training/` | /alloys/ |
| Learn More About This Alloy | `/contact-us/?alloy={slug}` | /alloys/{slug}/ |
| View Key Account Managers | `/sales-contacts/` | /contact-us/ |
| Back to Home | `/` | /contact-us/thank-you/ |

### 4.3 Forms and redirect paths

- **contact_rfq** on `/contact-us/`: embedded form(s): general contact + RFQ. Success: `/contact-us/thank-you/`. Observed: Intro asks visitors to complete the form for questions or a request for proposal/quote.
- **alloy_inquiry** on `/alloys/{slug}/`: short form: 'Learn more about this alloy'. Success: `/contact-us/thank-you/?src=alloy`. Prefill: alloy={slug}. Observed: Hosted on separate marketing subdomain in reference.
- **alloy_guide_download** on `/alloy-guide/`: gated download. Success: `/alloy-guide/thank-you/ + file link + email copy`. Observed: 'Download Our Alloy Guide' and 'Where Used Guide' offers.

The reference did not expose a thank-you URL to the crawler, so `/contact-us/thank-you/` and the alloy-guide thank-you are **recommended additions**. Each form needs bot protection, server validation, an auto-reply email and an internal notification routed by market.

## 5. Adaptation Notes for Metal Tech BD

- Replace **Divisions** with your real plants, or rename to `/facilities/`; delete pages you do not need rather than leaving empty hubs.
- Keep only casting processes you actually offer; add Continuous Casting if applicable.
- Remove US-only legal items (EEO, Pay Transparency, Transparency in Coverage) and replace with Bangladesh-applicable policies.
- Normalize reference route inconsistencies: use `/alloys/{slug}/` (reference `/alloy/`), `/resources/blog/{slug}/` (reference `/blog/`), and hyphenated sales-contact slugs.
- Add optional features the reference lacks: header search, language switcher, newsletter, testimonials, WhatsApp click-to-chat.
- Alloy Finder: build search + three filters (alloy family, cast number, grade), 12-16 results per page, URL-persisted filters.

## 6. Known Gaps

- Inner-page layouts for process, capability, market and division pages were inferred, not read.
- Case studies, videos, glossary and downloads pages were not opened.
- Form fields and spam tooling on the reference are not visible to a crawler.
- Item counts (e.g. 16 alloy pages) will change as the reference site updates.
