# Metal Tech BD: Pre-launch QA Checklist

Pass rule: every Blocker passes; no open failures. Mark `[x]` when passed.

Priority: B = Blocker, H = High, M = Medium.

## Responsive & multi-device


### Viewports

- [ ] R01 [B] Android phone 360x800. Pass: No horizontal scroll; all content inside viewport; no clipped text. How: Chrome DevTools + real Android phone.
- [ ] R02 [B] Small iPhone 375x667 (SE). Pass: Layout intact; CTAs and menu visible without overlap. How: DevTools + real device.
- [ ] R03 [B] iPhone 390x844 / 430x932 with notch. Pass: Content clear of notch and home bar (safe-area insets). How: Real iPhone, Safari.
- [ ] R04 [H] Large Android 412x915. Pass: Same as above; images not oversized. How: DevTools + real device.
- [ ] R05 [B] iPad portrait 768x1024 and 820x1180. Pass: 2-column grids; menu behaves per design; no cramped text. How: Real iPad, Safari.
- [ ] R06 [H] iPad landscape 1024x768 and 1366x1024. Pass: Desktop-style nav or tablet nav works, no overlap. How: Real iPad.
- [ ] R07 [M] Android tablet 800x1280. Pass: Layout intact. How: DevTools or real tablet.
- [ ] R08 [H] Desktop 1280, 1440, 1920, 2560. Pass: Container max-width centered; images not stretched; no huge gaps. How: Browser resize.
- [ ] R09 [H] Drag width from 320 to 1920 px. Pass: No broken layout at any width, especially 768/769 and 1024/1025. How: Responsive mode slow drag.
- [ ] R10 [H] Rotate portrait and landscape (phone, tablet). Pass: Layout reflows; open menu/form state kept. How: Real devices.

### Navigation

- [ ] R11 [B] Hamburger opens and closes. Pass: Tap, close button, Esc and outside tap all close it; focus returns to button. How: Manual.
- [ ] R12 [B] Mobile sub-menus (accordion). Pass: Each parent expands/collapses; parent link still reachable. How: Manual.
- [ ] R13 [H] Background scroll while menu open. Pass: Page behind does not scroll; menu scrolls if taller than screen. How: Manual.
- [ ] R14 [B] Desktop mega-menu and tablet touch. Pass: Opens on hover/focus (desktop) and on tap (tablet); no hover-only access. How: Mouse, keyboard, touch.
- [ ] R15 [M] Sticky header and anchor links. Pass: Header never hides headings; scroll offset correct. How: Manual.
- [ ] R16 [M] Utility bar on mobile. Pass: Items remain reachable (collapsed or scrollable) without overflow. How: Manual.

### Touch

- [ ] R17 [H] Touch target size. Pass: All tap targets at least 44x44 px with 8 px spacing (never below 24x24). How: DevTools overlay / manual.
- [ ] R18 [B] No hover-only interactions. Pass: Every hover feature has a tap or focus equivalent. How: Touch device.
- [ ] R19 [H] Form keyboards and iOS zoom. Pass: email/tel/number keyboards correct; input font-size 16 px+ so iOS does not zoom. How: Real iPhone.
- [ ] R20 [H] tel: and mailto: links. Pass: Tap launches dialer or mail app with correct number/address. How: Real phone.
- [ ] R21 [H] Pinch-zoom allowed. Pass: Viewport does not disable zoom (no user-scalable=no). How: Check meta viewport.

### Text & images

- [ ] R22 [B] Base font and heading scaling. Pass: Body 16 px+ on mobile; headings scale smoothly; no overlap or truncation. How: Visual.
- [ ] R23 [H] Browser zoom 200% and OS large text. Pass: No lost content or overlapping; still operable. How: Zoom to 200%.
- [ ] R24 [B] Image resizing. Pass: Images fit container (max-width 100%), keep aspect ratio, no stretching or blur. How: Visual all templates.
- [ ] R25 [H] Responsive image sources. Pass: srcset/sizes deliver smaller files to phones. How: Network tab.
- [ ] R26 [B] Wide tables (specs, alloy data). Pass: Scroll inside own container; page body never scrolls sideways. How: Manual.
- [ ] R27 [M] Video and map embeds. Pass: Keep 16:9, fit width, controls usable by touch. How: Manual.
- [ ] R28 [H] Card grids and footer. Pass: 3 to 2 to 1 columns; footer columns stack in order. How: Resize.
- [ ] R29 [H] Cookie banner and modals. Pass: Do not cover key content on small screens; can be dismissed; no layout shift. How: Manual.
- [ ] R30 [M] Long words, Bengali text, long titles. Pass: Wrap correctly; no overflow; Bengali glyphs render (if bilingual). How: Paste long strings.

### Overflow

- [ ] R31 [B] Horizontal scrollbar check on every template. Pass: document.scrollWidth equals viewport width on Home, hubs, process, alloys, blog, contact. How: DevTools console.

## Browser & platform compatibility


### Coverage

- [ ] B01 [B] Chrome latest and previous (Windows, macOS, Android). Pass: Renders and works as designed. How: Real browsers or BrowserStack.
- [ ] B02 [B] Safari latest (macOS and iOS). Pass: Same as Chrome; no WebKit-only breakage. How: Real Mac and iPhone.
- [ ] B03 [B] Firefox latest and previous. Pass: Same as Chrome. How: Real browser.
- [ ] B04 [B] Edge latest (Windows). Pass: Same as Chrome. How: Real browser.
- [ ] B05 [M] Samsung Internet (optional, common on Android). Pass: Same as Chrome. How: Real Galaxy device.

### CSS

- [ ] B06 [B] Flexbox and Grid layouts. Pass: Alignment, gaps, wrapping and ordering identical across browsers. How: Visual diff.
- [ ] B07 [H] Safari-specific: flex gap, aspect-ratio, sticky, 100vh vs dvh. Pass: No clipped sections or jumping bars when the URL bar collapses. How: Real iPhone.
- [ ] B08 [H] Variables, clamp(), backdrop-filter and fallbacks. Pass: Fallback styles appear if feature missing. How: DevTools / old versions.
- [ ] B09 [M] Autoprefixer and browserslist. Pass: Build targets match supported browsers; prefixes present. How: Check build config.
- [ ] B10 [H] Form control styling (select, file, date). Pass: Consistent look and usable in every browser. How: Visual.

### JS

- [ ] B11 [B] Console errors. Pass: Zero errors on all templates in all four browsers. How: DevTools console.
- [ ] B12 [H] Console warnings (mixed content, CSP, deprecations). Pass: None that indicate real defects. How: DevTools.
- [ ] B13 [H] Modern JS features transpiled. Pass: No syntax errors in older supported versions. How: Test previous versions.
- [ ] B14 [B] Menus, accordions, sliders, filters. Pass: Work identically in every browser. How: Manual.
- [ ] B15 [H] Lazy loading and intersection observers. Pass: Images load as they scroll in; none missing. How: Scroll test.
- [ ] B16 [M] JavaScript disabled. Pass: Core content, navigation and contact info still readable. How: Disable JS.

### Media

- [ ] B17 [M] Video: autoplay muted playsinline on iOS. Pass: Plays or shows poster; no fullscreen hijack. How: Real iPhone.
- [ ] B18 [H] Fonts load with fallbacks. Pass: No invisible text; fallback font acceptable. How: Throttle network.

### Files

- [ ] B19 [H] PDF downloads and previews. Pass: Open/download correctly in each browser and phone. How: Manual.
- [ ] B20 [B] File upload (RFQ) on iOS and Android. Pass: Camera/file picker works; selected file shown. How: Real devices.

### State

- [ ] B21 [H] Back/forward navigation. Pass: Alloy filters and form state kept or restored sensibly. How: Manual.
- [ ] B22 [H] Cookie consent in Safari (ITP) and Firefox privacy mode. Pass: Choice remembered; scripts respect it. How: Manual.

### Third-party

- [ ] B23 [B] CAPTCHA, maps, analytics, chat. Pass: Load and work in all browsers; fail gracefully when blocked. How: Manual.
- [ ] B24 [M] Ad blockers and privacy extensions. Pass: Forms and navigation still work. How: Install uBlock.

### Platform

- [ ] B25 [H] Windows, macOS, iOS, Android (and Linux Firefox optional). Pass: Tested at least once on each. How: Test matrix sheet.

## Functional


### Links

- [ ] F01 [B] All header, utility and footer links. Pass: Return 200; correct destination; no 404. How: Crawl with Screaming Frog or linkchecker.
- [ ] F02 [B] Dropdown hierarchy. Pass: Matches sitemap exactly; parent label links to hub. How: Compare with sitemap.
- [ ] F03 [H] Breadcrumbs. Pass: Correct path; each level clickable. How: Manual.
- [ ] F04 [M] Logo, skip link, anchor links. Pass: Logo to home; skip link focuses main; anchors scroll to right place. How: Manual.
- [ ] F05 [H] External links. Pass: Open correctly; use rel noopener noreferrer; social links valid. How: Manual.
- [ ] F06 [B] Redirects and 404. Pass: Old URLs 301 once (no chains); custom 404 shows search and links with 404 status. How: curl -I.

### CTAs

- [ ] F07 [B] Hero and header quote CTA. Pass: Go to contact/quote form. How: Click.
- [ ] F08 [B] Card links (capability, market, blog) and Read More. Pass: Every card opens the right page. How: Click all.
- [ ] F09 [H] Ask The Metal Experts band on content pages. Pass: Button goes to Contact Us on each page. How: Spot-check templates.
- [ ] F10 [M] Button states. Pass: Hover, focus, active, disabled visible and correct. How: Manual.

### Forms

- [ ] F11 [B] Required fields and messages. Pass: Empty submit shows clear inline errors; focus moves to first error. How: Manual.
- [ ] F12 [B] Format validation. Pass: Bad email, phone, long text rejected; good input accepted. How: Manual.
- [ ] F13 [B] Successful submit. Pass: Redirects to thank-you page with reference ID. How: Submit test.
- [ ] F14 [B] Notification and auto-reply emails. Pass: Delivered within 1 minute to correct routed recipient; not in spam. How: Test inbox.
- [ ] F15 [B] Record stored. Pass: Submission visible in admin/CRM with all fields and attachments. How: Check backend.
- [ ] F16 [B] Spam protection. Pass: Bot or no-token submission rejected; honeypot works. How: Test script.
- [ ] F17 [B] File upload rules. Pass: Allowed types and size accepted; .exe and oversize rejected with message. How: Upload tests.
- [ ] F18 [B] Multi-step RFQ. Pass: Next/Back keep data; refresh keeps progress; step validation works. How: Manual.
- [ ] F19 [H] Double submit and slow network. Pass: Button disabled after click; error keeps entered data. How: Throttle, click twice.
- [ ] F20 [B] Server-side validation. Pass: Still enforced with JS disabled or tampered requests. How: Postman/curl.
- [ ] F21 [H] Special characters and Bengali input. Pass: Saved and emailed correctly; no corruption. How: Test strings.
- [ ] F22 [H] Consent checkbox and prefill. Pass: Required; alloy/process prefill carries from alloy page. How: Manual.

### Alloy finder

- [ ] F23 [B] Search and each filter. Pass: Relevant results; each filter works alone. How: Manual.
- [ ] F24 [B] Combined filters, reset, pagination. Pass: Correct counts; reset clears all; page links work; URL keeps state. How: Manual.
- [ ] F25 [M] Empty state. Pass: Helpful message and contact link. How: Search nonsense.
- [ ] F26 [B] Alloy detail data accuracy. Pass: Composition and properties match verified datasheet; last-reviewed date shown. How: Compare with datasheet.
- [ ] F27 [H] Datasheet and Alloy Guide downloads. Pass: Correct PDF opens; gated guide emails or serves file. How: Manual.

### Site features

- [ ] F28 [H] Global search. Pass: Returns grouped relevant results; typeahead works. How: Manual.
- [ ] F29 [B] Sales contacts per market. Pass: Names, phones and emails correct; Return link works. How: Call/verify numbers.
- [ ] F30 [H] Blog, case studies, FAQ, glossary, videos. Pass: Listings, pagination, templates and accordions work. How: Manual.
- [ ] F31 [M] Careers page and application. Pass: Openings listed; application submits. How: Manual.
- [ ] F32 [H] Map and locations. Pass: Map loads lazily; pins and directions correct. How: Manual.
- [ ] F33 [M] Language switcher (if bilingual). Pass: Switches page and keeps route; hreflang present. How: Manual.
- [ ] F34 [B] Cookie banner. Pass: Accept, reject, preferences saved; analytics blocked until consent. How: Manual.
- [ ] F35 [M] Newsletter (if used). Pass: Double opt-in works; unsubscribe works. How: Manual.

### Content

- [ ] F36 [B] Contact details consistency. Pass: Phone, address, email identical on all pages and schema. How: Search site.
- [ ] F37 [B] No placeholder content. Pass: No lorem ipsum, test pages, TODO or broken images. How: Crawl and read.

### Admin

- [ ] F38 [H] CMS roles and publishing. Pass: Roles limit access; publish, unpublish, schedule work. How: Test each role.
- [ ] F39 [H] RFQ workflow. Pass: Status changes, notes, assignment and CSV export work. How: Manual.

## Speed & performance


### Core Web Vitals

- [ ] P01 [B] LCP on mobile (4G). Pass: 2.5 s or less on Home, process page, alloy list, alloy detail, blog post, contact. How: Lighthouse / PageSpeed Insights.
- [ ] P02 [H] INP. Pass: 200 ms or less. How: Lighthouse / Chrome UX.
- [ ] P03 [B] CLS. Pass: 0.1 or less (cookie banner and fonts cause no shift). How: Lighthouse.
- [ ] P04 [H] TTFB (CDN cached). Pass: 600 ms or less. How: WebPageTest.

### Scores

- [ ] P05 [B] Lighthouse mobile. Pass: 90+ for Performance, Accessibility, Best Practices, SEO on key templates. How: Lighthouse CI.

### Weight

- [ ] P06 [H] Initial page weight and JS. Pass: 1.5 MB or less initial; JS 200 KB or less gzipped on content pages. How: Network tab.

### Images

- [ ] P07 [B] Modern formats. Pass: WebP or AVIF with JPEG/PNG fallback; no oversized originals. How: Network tab.
- [ ] P08 [H] Compression targets. Pass: Hero 200 KB or less; card images 80 KB or less; quality visually acceptable. How: File sizes.
- [ ] P09 [H] Responsive sources and dimensions. Pass: srcset/sizes used; width and height set to prevent layout shift. How: Inspect HTML.
- [ ] P10 [B] Lazy loading. Pass: Below-fold images and iframes lazy-loaded; hero NOT lazy, preloaded with high priority. How: Network + inspect.

### Code

- [ ] P11 [H] Minification and bundling. Pass: CSS and JS minified; unused code removed; source maps not public. How: Build output.
- [ ] P12 [H] Render-blocking resources. Pass: None above the fold except critical CSS. How: Lighthouse.

### Fonts

- [ ] P13 [H] Font loading. Pass: WOFF2, self-hosted or preconnected, font-display swap, 2 families or fewer. How: Network tab.

### Delivery

- [ ] P14 [H] Compression and HTTP version. Pass: Brotli or gzip on; HTTP/2 or HTTP/3. How: Response headers.
- [ ] P15 [H] Cache headers. Pass: Hashed assets cached 1 year immutable; HTML cached at CDN with purge on publish. How: curl -I.
- [ ] P16 [H] CDN and regional latency. Pass: Edge serving works; test from Dhaka, Singapore and Europe. How: WebPageTest locations.

### Third-party

- [ ] P17 [H] Scripts deferred. Pass: Analytics, chat, maps load after consent or on interaction; each justified. How: Coverage tab.

### Media

- [ ] P18 [M] Video. Pass: Poster image; no heavy autoplay; embeds load on interaction. How: Network tab.

### Network

- [ ] P19 [H] Slow 3G / Fast 3G. Pass: Content usable and forms submit on throttled network. How: DevTools throttling.

### Device

- [ ] P20 [M] 4x CPU slowdown. Pass: Menus and filters stay responsive. How: DevTools.

### Backend

- [ ] P21 [H] Alloy finder and search response. Pass: 300 ms or less typical; no timeouts. How: API timing.

### Load

- [ ] P22 [H] Concurrent users. Pass: 100 concurrent users: no errors, response times stable. How: k6 or JMeter.

### Ops

- [ ] P23 [H] Uptime monitoring. Pass: External monitor and alerts active; 99.9% target. How: UptimeRobot etc..

## SEO


### Meta

- [ ] S01 [B] Title tags. Pass: Unique, 60 characters or less, brand at end. How: Crawler export.
- [ ] S02 [H] Meta descriptions. Pass: Unique, 155 characters or less, includes a call to action. How: Crawler export.
- [ ] S03 [H] Open Graph and Twitter cards. Pass: og:title, description, image (1200x630), url, type, site_name present; preview correct. How: Facebook/LinkedIn debugger.
- [ ] S04 [B] Canonical tags. Pass: Self-referencing on every indexable page. How: Crawler.

### Structure

- [ ] S05 [B] One H1 per page and heading order. Pass: Single H1; H2/H3 nested logically. How: Crawler / HeadingsMap.
- [ ] S06 [H] Semantic HTML. Pass: header, nav, main, footer landmarks used; lists for menus. How: Inspect.
- [ ] S07 [B] Image alt text. Pass: Descriptive alt on meaningful images; decorative alt empty. How: Crawler.
- [ ] S08 [M] Link text. Pass: Descriptive, not 'click here'. How: Review.

### URLs

- [ ] S09 [B] Clean URLs. Pass: Lowercase, hyphens, no IDs or extensions; consistent trailing slash. How: Crawler.
- [ ] S10 [B] Canonical host and protocol. Pass: http to https and www/non-www each redirect once to one version. How: curl -I.

### Indexing

- [ ] S11 [B] XML sitemap. Pass: Valid, only 200 canonical URLs, submitted in Search Console. How: Validate + GSC.
- [ ] S12 [B] robots.txt and noindex. Pass: Production allows crawling; admin blocked; staging noindex removed on launch. How: View file, view source.
- [ ] S13 [H] 404 status code. Pass: Missing pages return real 404, not 200. How: curl -I.

### Structured data

- [ ] S14 [H] Schema.org. Pass: Organization, BreadcrumbList, FAQ/Article/Product valid, no errors. How: Rich Results Test.

### Links

- [ ] S15 [H] Internal linking. Pass: No orphan pages; no broken internal links; every page 3 clicks from home. How: Crawler.
- [ ] S16 [M] Hreflang (if bilingual). Pass: Correct language and return tags. How: hreflang checker.

### Assets

- [ ] S17 [M] Favicon and touch icons. Pass: Present and correct. How: Browser tab.

### Analytics

- [ ] S18 [B] GA4, Search Console, Bing Webmaster. Pass: Installed and verified; key events (rfq_submit, downloads, phone clicks) fire. How: GA4 DebugView.

### Content

- [ ] S19 [H] Spelling and unit accuracy. Pass: No typos; units and standards (ASTM etc.) reviewed by metallurgist. How: Proofread + SME.

## Security


### TLS

- [ ] X01 [B] SSL certificate. Pass: Valid, covers www and apex, not expiring within 30 days, auto-renew on. How: SSL Labs (grade A).
- [ ] X02 [B] HTTPS everywhere. Pass: HTTP redirects to HTTPS; no mixed content; TLS 1.2+ only. How: Browser + SSL Labs.
- [ ] X03 [H] HSTS. Pass: Header present with long max-age. How: securityheaders.com.

### Headers

- [ ] X04 [H] Security headers. Pass: CSP, X-Content-Type-Options, frame-ancestors/X-Frame-Options, Referrer-Policy, Permissions-Policy set. How: securityheaders.com (A).

### Cookies

- [ ] X05 [H] Cookie flags. Pass: Secure, HttpOnly and SameSite on session cookies. How: DevTools.

### Forms

- [ ] X06 [B] Bot protection and rate limiting. Pass: CAPTCHA/Turnstile active; repeated posts throttled. How: Test script.
- [ ] X07 [B] XSS and SQL injection. Pass: Payloads escaped/rejected; baseline scan has no high findings. How: OWASP ZAP baseline.
- [ ] X08 [H] CSRF protection. Pass: Tokens required on state-changing requests. How: Manual/ZAP.
- [ ] X09 [B] Upload security. Pass: Type allow-list, size limit, antivirus scan, stored outside web root, signed URLs. How: Upload tests.

### Access

- [ ] X10 [B] Admin hardening. Pass: 2FA on, strong passwords, login throttling, non-default admin URL, least-privilege roles. How: Manual audit.
- [ ] X11 [B] Server exposure. Pass: No .git, .env, backups or directory listing public; debug mode off; no default accounts. How: Scan common paths.
- [ ] X12 [H] Error pages. Pass: No stack traces or version info shown. How: Trigger errors.
- [ ] X13 [M] CORS and user enumeration. Pass: CORS restrictive; login/reset do not reveal valid users. How: Manual.

### Supply chain

- [ ] X14 [B] Dependencies, CMS and plugins. Pass: Updated; npm audit/composer audit: no high or critical. How: Audit tools.
- [ ] X15 [H] Third-party scripts. Pass: Pinned versions; SRI where possible; only approved hosts. How: Review source.

### Secrets

- [ ] X16 [B] No secrets in code or client. Pass: API keys in vault/env; repo scan clean. How: gitleaks.

### Resilience

- [ ] X17 [B] Backups and restore. Pass: Daily backups; restore tested; retention 30 days. How: Restore drill.
- [ ] X18 [H] WAF and DDoS protection. Pass: CDN/WAF active in front of origin. How: Cloudflare dashboard.
- [ ] X19 [H] Monitoring and alerts. Pass: Error and uptime alerts reach the owner. How: Trigger test alert.

### Email

- [ ] X20 [H] SPF, DKIM, DMARC. Pass: All pass for the sending domain. How: mail-tester / MXToolbox.

### Privacy

- [ ] X21 [B] Cookie consent and policies. Pass: Scripts blocked until consent; privacy, cookie and terms pages live and legal-reviewed. How: Manual.
- [ ] X22 [M] Data retention and deletion. Pass: Process documented; deletion on request possible. How: Review.

### Testing

- [ ] X23 [B] Pre-launch penetration or security review. Pass: No open high or critical findings. How: Third-party or internal.

## Accessibility (WCAG 2.2 AA)


### Keyboard

- [ ] A01 [B] Full keyboard operation. Pass: Menu, forms, filters and accordions reachable and usable; no focus trap. How: Tab through.
- [ ] A02 [B] Visible focus. Pass: Clear focus ring on all interactive elements. How: Visual.

### Contrast

- [ ] A03 [B] Color contrast. Pass: Text 4.5:1 (large 3:1); check blue on white, white on blue, muted text. How: axe / contrast checker.

### Forms

- [ ] A04 [B] Labels and errors. Pass: Every field labeled; errors explained and announced. How: Screen reader.

### Content

- [ ] A05 [H] Alt text and headings. Pass: Meaningful alt; logical headings (see SEO). How: axe.

### ARIA

- [ ] A06 [H] Menu and accordion roles. Pass: Correct expanded/controls states. How: axe + screen reader.

### Motion

- [ ] A07 [M] Reduced motion. Pass: Animations respect prefers-reduced-motion. How: OS setting.

### Tools

- [ ] A08 [H] Automated scan. Pass: axe / Lighthouse: zero critical issues. How: axe DevTools.

### Screen reader

- [ ] A09 [H] Key flows. Pass: Home, alloy finder and RFQ completable with NVDA or VoiceOver. How: Manual.
