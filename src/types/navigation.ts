export type PageRoute =
  | { view: 'home' }
  | { view: 'metal-casting'; subSlug?: string }
  | { view: 'capabilities'; subSlug?: string }
  | { view: 'alloys'; selectedAlloyId?: string }
  | { view: 'market-solutions'; subSlug?: string }
  | { view: 'about-us'; subSection?: 'overview' | 'history' | 'mission-vision' | 'leadership' | 'certifications' }
  | { view: 'divisions'; subSlug?: string }
  | { view: 'resources'; subTab?: 'blog' | 'case-studies' | 'videos' | 'faqs' | 'glossary' | 'downloads' }
  | { view: 'blog-post'; slug: string }
  | { view: 'case-study'; slug: string }
  | { view: 'sales-contacts'; marketSlug?: string }
  | { view: 'why-metal-tech-bd' }
  | { view: 'careers' }
  | { view: 'certifications' }
  | { view: 'company-history' }
  | { view: 'contact-us' }
  | { view: 'request-a-quote' }
  | { view: 'privacy-policy' }
  | { view: 'accessibility-statement' }
  | { view: 'terms-conditions' }
  | { view: 'search'; query?: string }
  | { view: 'admin'; subSection?: string };

export type Language = 'en' | 'bn';
