import {
  ProcessItem,
  CapabilityItem,
  MarketItem,
  Alloy,
  BlogPost,
  CaseStudy,
  FAQItem,
  GlossaryTerm
} from '../data/siteData';
import {
  NavigationMenuItem,
  ContentItem,
  SiteMetadata,
  VideoItem,
  RfqLead,
  FaqItem,
  DownloadItem
} from '../context/AdminContext';

// --- Process Cards ---
export function toProcessCardRow(item: ProcessItem) {
  return {
    slug: item.slug,
    title: item.title,
    title_bn: item.titleBn || null,
    summary: item.summary,
    summary_bn: item.summaryBn || null,
    description: item.description,
    description_bn: item.descriptionBn || null,
    hero_headline: item.heroHeadline || null,
    hero_headline_bn: item.heroHeadlineBn || null,
    size_limits: item.sizeLimits || null,
    size_limits_bn: item.sizeLimitsBn || null,
    weight_range: item.weightRange || null,
    weight_range_bn: item.weightRangeBn || null,
    tolerances: item.tolerances || null,
    tolerances_bn: item.tolerancesBn || null,
    typical_components: item.typicalComponents || [],
    typical_components_bn: item.typicalComponentsBn || [],
    suitable_alloys: item.suitableAlloys || [],
    industries_served: item.industriesServed || [],
    updated_at: new Date().toISOString()
  };
}

export function fromProcessCardRow(row: any): ProcessItem {
  return {
    slug: row.slug,
    title: row.title,
    titleBn: row.title_bn || undefined,
    summary: row.summary,
    summaryBn: row.summary_bn || undefined,
    description: row.description,
    descriptionBn: row.description_bn || undefined,
    heroHeadline: row.hero_headline || undefined,
    heroHeadlineBn: row.hero_headline_bn || undefined,
    sizeLimits: row.size_limits || undefined,
    sizeLimitsBn: row.size_limits_bn || undefined,
    weightRange: row.weight_range || undefined,
    weightRangeBn: row.weight_range_bn || undefined,
    tolerances: row.tolerances || undefined,
    tolerancesBn: row.tolerances_bn || undefined,
    typicalComponents: Array.isArray(row.typical_components) ? row.typical_components : [],
    typicalComponentsBn: Array.isArray(row.typical_components_bn) ? row.typical_components_bn : [],
    suitableAlloys: Array.isArray(row.suitable_alloys) ? row.suitable_alloys : [],
    industriesServed: Array.isArray(row.industries_served) ? row.industries_served : []
  };
}

// --- Capability Cards ---
export function toCapabilityCardRow(item: CapabilityItem) {
  return {
    slug: item.slug,
    title: item.title,
    title_bn: item.titleBn || null,
    icon_name: item.iconName || 'Flame',
    summary: item.summary,
    summary_bn: item.summaryBn || null,
    description: item.description,
    description_bn: item.descriptionBn || null,
    equipment_highlights: item.equipmentHighlights || [],
    equipment_highlights_bn: item.equipmentHighlightsBn || [],
    specifications: item.specifications || [],
    specifications_bn: item.specificationsBn || [],
    standards: item.standards || [],
    updated_at: new Date().toISOString()
  };
}

export function fromCapabilityCardRow(row: any): CapabilityItem {
  return {
    slug: row.slug,
    title: row.title,
    titleBn: row.title_bn || undefined,
    iconName: row.icon_name || 'Flame',
    summary: row.summary,
    summaryBn: row.summary_bn || undefined,
    description: row.description,
    descriptionBn: row.description_bn || undefined,
    equipmentHighlights: Array.isArray(row.equipment_highlights) ? row.equipment_highlights : [],
    equipmentHighlightsBn: Array.isArray(row.equipment_highlights_bn) ? row.equipment_highlights_bn : [],
    specifications: Array.isArray(row.specifications) ? row.specifications : [],
    specificationsBn: Array.isArray(row.specifications_bn) ? row.specifications_bn : [],
    standards: Array.isArray(row.standards) ? row.standards : []
  };
}

// --- Market Cards ---
export function toMarketCardRow(item: MarketItem) {
  return {
    slug: item.slug,
    title: item.title,
    title_bn: item.titleBn || null,
    category_tag: item.categoryTag || null,
    category_tag_bn: item.categoryTagBn || null,
    summary: item.summary,
    summary_bn: item.summaryBn || null,
    challenges: item.challenges || '',
    challenges_bn: item.challengesBn || null,
    solutions: item.solutions || '',
    solutions_bn: item.solutionsBn || null,
    components_supplied: item.componentsSupplied || [],
    components_supplied_bn: item.componentsSuppliedBn || [],
    recommended_alloys: item.recommendedAlloys || [],
    sales_contact_market_slug: item.salesContactMarketSlug || 'general',
    updated_at: new Date().toISOString()
  };
}

export function fromMarketCardRow(row: any): MarketItem {
  return {
    slug: row.slug,
    title: row.title,
    titleBn: row.title_bn || undefined,
    categoryTag: row.category_tag || undefined,
    categoryTagBn: row.category_tag_bn || undefined,
    summary: row.summary,
    summaryBn: row.summary_bn || undefined,
    challenges: row.challenges || '',
    challengesBn: row.challenges_bn || undefined,
    solutions: row.solutions || '',
    solutionsBn: row.solutions_bn || undefined,
    componentsSupplied: Array.isArray(row.components_supplied) ? row.components_supplied : [],
    componentsSuppliedBn: Array.isArray(row.components_supplied_bn) ? row.components_supplied_bn : [],
    recommendedAlloys: Array.isArray(row.recommended_alloys) ? row.recommended_alloys : [],
    salesContactMarketSlug: row.sales_contact_market_slug || 'general'
  };
}

// --- Videos ---
export function toVideoRow(video: VideoItem) {
  return {
    id: video.id,
    title: video.title,
    title_bn: video.titleBn || null,
    category: video.category || 'Foundry Process',
    category_bn: video.categoryBn || null,
    description: video.description,
    description_bn: video.descriptionBn || null,
    video_url: video.videoUrl,
    thumbnail_url: video.thumbnailUrl || null,
    duration: video.duration || '03:45',
    tags: video.tags || [],
    is_published: video.isPublished !== false,
    updated_at: new Date().toISOString()
  };
}

export function fromVideoRow(row: any): VideoItem {
  return {
    id: row.id,
    title: row.title,
    titleBn: row.title_bn || undefined,
    category: row.category || 'Foundry Process',
    categoryBn: row.category_bn || undefined,
    description: row.description,
    descriptionBn: row.description_bn || undefined,
    videoUrl: row.video_url,
    thumbnailUrl: row.thumbnail_url || undefined,
    duration: row.duration || '03:45',
    tags: Array.isArray(row.tags) ? row.tags : [],
    isPublished: row.is_published !== false
  };
}

// --- RFQ Leads ---
export function toLeadRow(lead: RfqLead) {
  return {
    id: lead.id,
    full_name: lead.fullName,
    email: lead.email,
    phone: lead.phone || null,
    company: lead.company || null,
    source: lead.source || 'Website RFQ Form',
    alloy_or_process: lead.alloyOrProcess || null,
    estimated_quantity: lead.estimatedQuantity || null,
    message: lead.message || null,
    status: 'new',
    created_at: lead.createdAt || new Date().toISOString()
  };
}

export function fromLeadRow(row: any): RfqLead {
  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone || undefined,
    company: row.company || undefined,
    source: row.source || 'Website RFQ Form',
    alloyOrProcess: row.alloy_or_process || undefined,
    estimatedQuantity: row.estimated_quantity || undefined,
    message: row.message || undefined,
    createdAt: row.created_at || new Date().toISOString()
  };
}

// --- Site Metadata ---
export function toSiteMetadataRow(meta: SiteMetadata) {
  return {
    id: 'default',
    name: meta.name,
    short_name: meta.shortName,
    tagline: meta.tagline,
    hero_headline: meta.heroHeadline,
    hero_subhead: meta.heroSubhead,
    phone: meta.phone,
    phone_raw: meta.phoneRaw,
    sales_email: meta.salesEmail,
    engineering_email: meta.engineeringEmail,
    global_hq: meta.globalHq,
    headquarters_address: meta.headquartersAddress,
    dhaka_hq_address: meta.dhakaHqAddress,
    plant_address: meta.plantAddress,
    chittagong_hub: meta.chittagongHub,
    response_promise: meta.responsePromise,
    copyright: meta.copyright,
    updated_at: new Date().toISOString()
  };
}

export function fromSiteMetadataRow(row: any): Partial<SiteMetadata> {
  return {
    name: row.name,
    shortName: row.short_name,
    tagline: row.tagline,
    heroHeadline: row.hero_headline,
    heroSubhead: row.hero_subhead,
    phone: row.phone,
    phoneRaw: row.phone_raw,
    salesEmail: row.sales_email,
    engineeringEmail: row.engineering_email,
    globalHq: row.global_hq,
    headquartersAddress: row.headquarters_address,
    dhakaHqAddress: row.dhaka_hq_address,
    plantAddress: row.plant_address,
    chittagongHub: row.chittagong_hub,
    responsePromise: row.response_promise,
    copyright: row.copyright
  };
}

// --- Navigation Menus ---
export function toNavigationMenuRow(menu: NavigationMenuItem, sortOrder: number = 0) {
  return {
    id: menu.id,
    label: menu.label,
    label_bn: menu.labelBn || null,
    icon_name: menu.iconName || 'Layers',
    route_view: menu.routeView || 'metal-casting',
    description: menu.description || null,
    sub_items: menu.subItems || [],
    sort_order: sortOrder,
    updated_at: new Date().toISOString()
  };
}

export function fromNavigationMenuRow(row: any): NavigationMenuItem {
  return {
    id: row.id,
    label: row.label,
    labelBn: row.label_bn || undefined,
    iconName: row.icon_name || 'Layers',
    routeView: row.route_view || 'metal-casting',
    description: row.description || undefined,
    subItems: Array.isArray(row.sub_items) ? row.sub_items : []
  };
}

// --- Content Workspace Items ---
export function toContentItemRow(item: ContentItem) {
  return {
    id: item.id,
    menu_id: item.menuId,
    sub_item_id: item.subItemId,
    title: item.title,
    title_bn: item.titleBn || null,
    subtitle: item.subtitle || null,
    subtitle_bn: item.subtitleBn || null,
    eyebrow: item.eyebrow || null,
    eyebrow_bn: item.eyebrowBn || null,
    body_mdx: item.bodyMdx,
    body_mdx_bn: item.bodyMdxBn || null,
    image_url: item.imageUrl || null,
    pdf_url: item.pdfUrl || null,
    pdf_size: item.pdfSize || null,
    specs: item.specs || [],
    is_published: item.isPublished !== false,
    updated_at: new Date().toISOString()
  };
}

export function fromContentItemRow(row: any): ContentItem {
  return {
    id: row.id,
    menuId: row.menu_id,
    subItemId: row.sub_item_id,
    title: row.title,
    titleBn: row.title_bn || undefined,
    subtitle: row.subtitle || undefined,
    subtitleBn: row.subtitle_bn || undefined,
    eyebrow: row.eyebrow || undefined,
    eyebrowBn: row.eyebrow_bn || undefined,
    bodyMdx: row.body_mdx,
    bodyMdxBn: row.body_mdx_bn || undefined,
    imageUrl: row.image_url || undefined,
    pdfUrl: row.pdf_url || undefined,
    pdfSize: row.pdf_size || undefined,
    specs: Array.isArray(row.specs) ? row.specs : [],
    isPublished: row.is_published !== false,
    updatedAt: row.updated_at ? row.updated_at.substring(0, 10) : new Date().toISOString().substring(0, 10)
  };
}

// --- Alloys Catalog ---
export function toAlloyRow(alloy: Alloy) {
  return {
    id: alloy.id,
    slug: alloy.slug,
    name: alloy.name,
    family: alloy.family,
    cast_uns: alloy.castUNS || null,
    cast_grade: alloy.castGrade || null,
    cast_astm: alloy.castASTM || null,
    equivalent_din: alloy.equivalentDIN || null,
    wrought_equiv: alloy.wroughtEquiv || null,
    description: alloy.description || null,
    composition: alloy.composition || [],
    mechanical: alloy.mechanical || {},
    suitable_processes: alloy.suitableProcesses || [],
    applications: alloy.applications || [],
    key_attributes: alloy.keyAttributes || [],
    updated_at: new Date().toISOString()
  };
}

export function fromAlloyRow(row: any): Alloy {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    family: row.family,
    castUNS: row.cast_uns || '',
    castGrade: row.cast_grade || '',
    castASTM: row.cast_astm || '',
    equivalentDIN: row.equivalent_din || '',
    wroughtEquiv: row.wrought_equiv || '',
    description: row.description || '',
    composition: Array.isArray(row.composition) ? row.composition : [],
    mechanical: row.mechanical || {
      tensileStrengthMpa: 0,
      yieldStrengthMpa: 0,
      elongationPct: 0,
      hardnessHB: '',
      condition: ''
    },
    suitableProcesses: Array.isArray(row.suitable_processes) ? row.suitable_processes : [],
    applications: Array.isArray(row.applications) ? row.applications : [],
    keyAttributes: Array.isArray(row.key_attributes) ? row.key_attributes : []
  };
}

// --- Blog Posts & Whitepapers ---
export function toBlogPostRow(post: BlogPost) {
  return {
    slug: post.slug,
    title: post.title,
    title_bn: post.titleBn || null,
    excerpt: post.excerpt || null,
    excerpt_bn: post.excerptBn || null,
    category: post.category || 'Technical Metallurgy',
    category_bn: post.categoryBn || null,
    content: post.content || [],
    content_bn: post.contentBn || [],
    date: post.date || new Date().toISOString().substring(0, 10),
    author: post.author || 'MetalTek Engineering Team',
    read_time: post.readTime || '5 min read',
    updated_at: new Date().toISOString()
  };
}

export function fromBlogPostRow(row: any): BlogPost {
  return {
    slug: row.slug,
    title: row.title,
    titleBn: row.title_bn || undefined,
    excerpt: row.excerpt || '',
    excerptBn: row.excerpt_bn || undefined,
    category: row.category || 'Technical Metallurgy',
    categoryBn: row.category_bn || undefined,
    content: Array.isArray(row.content) ? row.content : [],
    contentBn: Array.isArray(row.content_bn) ? row.content_bn : undefined,
    date: row.date || '',
    author: row.author || 'MetalTek Engineering Team',
    readTime: row.read_time || '5 min read'
  };
}

// --- Case Studies ---
export function toCaseStudyRow(cs: CaseStudy) {
  return {
    slug: cs.slug,
    title: cs.title,
    title_bn: cs.titleBn || null,
    client_industry: cs.clientIndustry,
    challenge: cs.challenge,
    solution: cs.solution,
    results: cs.results || [],
    alloys_used: cs.alloysUsed || null,
    process: cs.process || null,
    updated_at: new Date().toISOString()
  };
}

export function fromCaseStudyRow(row: any): CaseStudy {
  return {
    slug: row.slug,
    title: row.title,
    titleBn: row.title_bn || undefined,
    clientIndustry: row.client_industry || '',
    challenge: row.challenge || '',
    solution: row.solution || '',
    results: Array.isArray(row.results) ? row.results : [],
    alloysUsed: row.alloys_used || '',
    process: row.process || ''
  };
}

// --- FAQs ---
export function toFaqRow(faq: FaqItem, index: number = 0) {
  return {
    id: index + 1,
    question: faq.question,
    question_bn: (faq as any).questionBn || null,
    answer: faq.answer,
    answer_bn: (faq as any).answerBn || null,
    category: faq.category,
    sort_order: index,
    updated_at: new Date().toISOString()
  };
}

export function fromFaqRow(row: any): FaqItem {
  return {
    question: row.question,
    answer: row.answer,
    category: row.category
  };
}

// --- Downloads ---
export function toDownloadRow(item: DownloadItem, index: number = 0) {
  return {
    id: index + 1,
    title: item.title,
    title_bn: (item as any).titleBn || null,
    category: item.category,
    format: item.format || 'PDF',
    size: item.size || '1.2 MB',
    version: item.version || '2026.1',
    description: item.description || null,
    file_url: (item as any).fileUrl || null,
    sort_order: index,
    updated_at: new Date().toISOString()
  };
}

export function fromDownloadRow(row: any): DownloadItem {
  return {
    title: row.title,
    category: row.category,
    format: row.format || 'PDF',
    size: row.size || '1.2 MB',
    version: row.version || '2026.1',
    description: row.description || ''
  };
}

// --- Glossary ---
export function toGlossaryRow(term: GlossaryTerm, index: number = 0) {
  return {
    id: index + 1,
    term: term.term,
    definition: term.definition,
    definition_bn: (term as any).definitionBn || null,
    sort_order: index,
    updated_at: new Date().toISOString()
  };
}

export function fromGlossaryRow(row: any): GlossaryTerm {
  return {
    term: row.term,
    category: (row.category as any) || 'Casting',
    definition: row.definition
  };
}
