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
