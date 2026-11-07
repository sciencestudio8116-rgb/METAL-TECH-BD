import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  SITE_METADATA,
  ALLOY_DATABASE,
  CASE_STUDIES,
  BLOG_POSTS,
  FAQ_ITEMS,
  GLOSSARY_TERMS,
  CASTING_PROCESSES,
  CAPABILITIES,
  MARKET_SOLUTIONS,
  Alloy,
  CaseStudy,
  BlogPost,
  FAQItem,
  GlossaryTerm,
  ProcessItem,
  CapabilityItem,
  MarketItem,
} from '../data/siteData';
import {
  autoTranslateContentItemFields,
  autoTranslateBlogPostFields,
  autoTranslateVideoFields,
  autoTranslateProcessFields,
  autoTranslateCapabilityFields,
  autoTranslateMarketFields,
} from '../lib/translator';
import { supabase } from '../lib/supabase';
import {
  toProcessCardRow, fromProcessCardRow,
  toCapabilityCardRow, fromCapabilityCardRow,
  toMarketCardRow, fromMarketCardRow,
  toVideoRow, fromVideoRow,
  toLeadRow, fromLeadRow,
  toSiteMetadataRow, fromSiteMetadataRow
} from '../lib/supabaseTransformers';

export interface VideoItem {
  id: string;
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: string;
  categoryBn?: string;
  tags?: string[];
  duration?: string;
  isPublished?: boolean;
}

export const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Centrifugal Rotational Casting Pouring Process',
    titleBn: 'সেন্ট্রিফিউগাল রোটেশনাল কাস্টিং ঢালাই প্রক্রিয়া',
    description: 'Watch 80 G-force rotational mold filling and directional cooling in our Gazipur heavy casting plant.',
    descriptionBn: 'গাজীপুর ভারী কাস্টিং প্ল্যান্টে ৮০ জি-ফোর্স ঘূর্ণমান ছাঁচ ভরাট এবং দিকনির্দেশক শীতলীকরণ পর্যবেক্ষণ করুন।',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    category: 'Foundry Process',
    categoryBn: 'ফাউন্ড্রি প্রক্রিয়া',
    duration: '03:45',
    tags: ['Centrifugal', 'Pouring', 'Foundry', 'Heavy Industry'],
    isPublished: true,
  },
  {
    id: 'vid-2',
    title: '10-Ton AOD Vessel Secondary Refining Cycle',
    titleBn: '১০-টন এওডি ভেসেল সেকেন্ডারি রিফাইনিং চক্র',
    description: 'Argon-oxygen bubbling sequence for ultra-low carbon stainless steel decarburization.',
    descriptionBn: 'আল্ট্রা-লো কার্বন স্টেইনলেস স্টিলের জন্য আর্গন-অক্সিজেন বাবলিং ও সেকেন্ডারি রিফাইনিং সিকোয়েন্স।',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    category: 'Metallurgy & Refining',
    categoryBn: 'ধাতুবিদ্যা ও পরিশোধন',
    duration: '04:15',
    tags: ['AOD', 'Refining', 'Stainless Steel', 'Decarburization'],
    isPublished: true,
  },
  {
    id: 'vid-3',
    title: '5-Axis CNC Machining of Severe Service Valve Bodies',
    titleBn: 'সিভিয়ার সার্ভিস ভালভ বডির ৫-অ্যাক্সিস সিএনসি মেশিনিং',
    description: 'Toshiba horizontal boring mill executing high-precision assembly tolerances on duplex stainless components.',
    descriptionBn: 'তোশিবা হরাইজন্টাল বোরিং মিলের মাধ্যমে ডুপ্লেক্স স্টেইনলেস স্টিলে উচ্চ নির্ভুলতা সম্পন্ন সিএনসি মেশিনিং।',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    category: 'Precision Machining',
    categoryBn: 'প্রিসিশন মেশিনিং',
    duration: '02:50',
    tags: ['CNC', '5-Axis', 'Machining', 'Tolerances'],
    isPublished: true,
  },
  {
    id: 'vid-4',
    title: 'Cryogenic Charpy Impact Testing at -196°C',
    titleBn: 'মাইনাস ১৯৬° সে. তাপমাত্রায় ক্রায়োজেনিক চার্পি ইমপ্যাক্ট টেস্ট',
    description: 'Quality assurance protocol demonstrating high fracture toughness for LNG service.',
    descriptionBn: 'এলএনজি সার্ভিসের জন্য উচ্চ ফ্র্যাকচার বলিষ্ঠতা প্রমাণকারী কোয়ালিটি অ্যাসিউরেন্স প্রোটোকল।',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    category: 'Quality & Testing',
    categoryBn: 'মান নিয়ন্ত্রণ ও পরীক্ষা',
    duration: '02:10',
    tags: ['Cryogenic', 'Testing', 'NDT', 'Charpy Impact'],
    isPublished: true,
  },
];

export interface DownloadItem {
  title: string;
  category: string;
  format: string;
  size: string;
  version: string;
  description: string;
}

export const INITIAL_DOWNLOADS: DownloadItem[] = [
  { title: '2026 Metal Tech BD Master Alloy Specification Guide', category: 'Master Guide', format: 'PDF', size: '4.8 MB', version: '2026.1', description: 'Complete chemical and mechanical data sheets for 60+ casting grades.' },
  { title: 'ISO 9001:2015 Quality Certificate (Bureau Veritas)', category: 'Certificate', format: 'PDF', size: '1.2 MB', version: '2026', description: 'Current certified scope for foundry, machining, and thermal treatment.' },
  { title: 'ASME Section VIII Pressure Vessel Qualification', category: 'Certificate', format: 'PDF', size: '2.1 MB', version: '2026', description: 'Pressure boundary casting authorization and audit approval.' },
  { title: 'Lloyd’s Register Approval for Marine Castings', category: 'Certificate', format: 'PDF', size: '1.5 MB', version: '2026', description: 'Duplex stainless and nickel aluminum bronze marine propulsion certification.' },
  { title: 'Centrifugal vs Sand Casting Technical Comparison Guide', category: 'Engineering Whitepaper', format: 'PDF', size: '3.1 MB', version: '2026', description: 'Design engineers handbook on solidification defects and cost trade-offs.' },
  { title: 'NACE MR0175 / ISO 15156 Sour Gas Compliance Whitepaper', category: 'Technical Guide', format: 'PDF', size: '2.4 MB', version: '2026', description: 'Hardness and stress corrosion cracking thresholds for upstream oil & gas.' },
];

export type FaqItem = FAQItem;

export interface AdminUser {
  email: string;
  name: string;
  role: 'superadmin' | 'editor';
  loginTime: string;
}

export interface HeroContent {
  headline: string;
  subhead: string;
  badge?: string;
  ctaText?: string;
}

export interface RfqLead {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  source: string;
  alloyOrProcess?: string;
  estimatedQuantity?: string;
  message?: string;
  createdAt: string;
}

export interface NavigationSubItem {
  id: string;
  label: string;
  slug: string;
  description?: string;
  routeView: 'metal-casting' | 'capabilities' | 'alloys' | 'market-solutions' | 'resources' | 'about-us' | 'contact-us';
  subSlug?: string;
  subTab?: string;
  subSection?: string;
}

export interface NavigationMenuItem {
  id: string;
  label: string;
  labelBn?: string;
  iconName: string;
  routeView: 'metal-casting' | 'capabilities' | 'alloys' | 'market-solutions' | 'resources' | 'about-us' | 'contact-us';
  description?: string;
  subItems: NavigationSubItem[];
}

export interface ContentItem {
  id: string;
  menuId: string;
  subItemId: string;
  title: string;
  titleBn?: string;
  subtitle?: string;
  subtitleBn?: string;
  eyebrow?: string;
  eyebrowBn?: string;
  bodyMdx: string;
  bodyMdxBn?: string;
  imageUrl?: string;
  pdfUrl?: string;
  pdfSize?: string;
  specs: Array<{ key: string; value: string }>;
  isPublished: boolean;
  updatedAt: string;
}

export interface ToastNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

export interface SiteMetadata {
  name: string;
  shortName: string;
  tagline: string;
  heroHeadline: string;
  heroSubhead: string;
  phone: string;
  phoneRaw: string;
  salesEmail: string;
  engineeringEmail: string;
  globalHq: string;
  headquartersAddress: string;
  dhakaHqAddress: string;
  plantAddress: string;
  chittagongHub: string;
  responsePromise: string;
  copyright: string;
}

interface AdminContextType {
  // Auth
  isAuthenticated: boolean;
  adminUser: AdminUser | null;
  login: (usernameOrEmail: string, password: string) => { success: boolean; error?: string };
  logout: () => void;

  // Dynamic Navigation & Main/Sub-menus Mirror
  navigationMenu: NavigationMenuItem[];
  addMainMenu: (menu: NavigationMenuItem) => void;
  updateMainMenu: (menuId: string, updated: Partial<NavigationMenuItem>) => void;
  deleteMainMenu: (menuId: string) => void;
  addSubMenu: (menuId: string, subItem: NavigationSubItem) => void;
  updateSubMenu: (menuId: string, subItemId: string, updated: Partial<NavigationSubItem>) => void;
  deleteSubMenu: (menuId: string, subItemId: string) => void;

  // Process, Capability & Market Sector Cards (Universal Editable State)
  processCards: ProcessItem[];
  addProcessCard: (card: ProcessItem) => void;
  updateProcessCard: (slug: string, card: Partial<ProcessItem>) => void;
  deleteProcessCard: (slug: string) => void;

  capabilityCards: CapabilityItem[];
  addCapabilityCard: (card: CapabilityItem) => void;
  updateCapabilityCard: (slug: string, card: Partial<CapabilityItem>) => void;
  deleteCapabilityCard: (slug: string) => void;

  marketCards: MarketItem[];
  addMarketCard: (card: MarketItem) => void;
  updateMarketCard: (slug: string, card: Partial<MarketItem>) => void;
  deleteMarketCard: (slug: string) => void;

  // Videos
  videos: VideoItem[];
  addVideo: (video: VideoItem) => void;
  updateVideo: (id: string, updated: Partial<VideoItem>) => void;
  deleteVideo: (id: string) => void;

  // Content, Article & Media Workspace Items
  contentItems: ContentItem[];
  addContentItem: (item: ContentItem) => void;
  updateContentItem: (id: string, item: Partial<ContentItem>) => void;
  deleteContentItem: (id: string) => void;

  // Live Data Store
  siteMetadata: SiteMetadata;
  updateSiteMetadata: (data: Partial<SiteMetadata>) => void;

  heroContents: Record<string, HeroContent>;
  updateHeroContent: (pageKey: string, content: Partial<HeroContent>) => void;

  alloys: Alloy[];
  addAlloy: (alloy: Alloy) => void;
  updateAlloy: (id: string, alloy: Partial<Alloy>) => void;
  deleteAlloy: (id: string) => void;

  caseStudies: CaseStudy[];
  addCaseStudy: (caseStudy: CaseStudy) => void;
  updateCaseStudy: (slug: string, caseStudy: Partial<CaseStudy>) => void;
  deleteCaseStudy: (slug: string) => void;

  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (slug: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (slug: string) => void;

  faqs: FaqItem[];
  addFaq: (faq: FaqItem) => void;
  updateFaq: (index: number, faq: Partial<FaqItem>) => void;
  deleteFaq: (index: number) => void;

  downloads: DownloadItem[];
  addDownload: (item: DownloadItem) => void;
  updateDownload: (index: number, item: Partial<DownloadItem>) => void;
  deleteDownload: (index: number) => void;

  glossary: GlossaryTerm[];
  addGlossaryTerm: (term: GlossaryTerm) => void;
  updateGlossaryTerm: (index: number, term: Partial<GlossaryTerm>) => void;
  deleteGlossaryTerm: (index: number) => void;

  leads: RfqLead[];
  recordLead: (lead: Omit<RfqLead, 'id' | 'createdAt'>) => void;
  deleteLead: (id: string) => void;

  // Utilities
  toasts: ToastNotification[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
  resetToDefaults: () => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => { success: boolean; error?: string };

  // Supabase Real-time Cloud Sync
  supabaseConnected: boolean;
  supabaseSyncing: boolean;
  syncWithSupabase: () => Promise<void>;
}

const STORAGE_KEYS = {
  SESSION: 'metaltek_admin_session_v1',
  NAVIGATION_MENU: 'metaltek_navigation_menu_v3',
  CONTENT_ITEMS: 'metaltek_content_items_v2',
  SITE_METADATA: 'metaltek_site_metadata_v1',
  HERO_CONTENTS: 'metaltek_hero_contents_v1',
  ALLOYS: 'metaltek_alloys_v1',
  CASE_STUDIES: 'metaltek_case_studies_v1',
  BLOG_POSTS: 'metaltek_blog_posts_v1',
  FAQS: 'metaltek_faqs_v1',
  DOWNLOADS: 'metaltek_downloads_v1',
  GLOSSARY: 'metaltek_glossary_v1',
  LEADS: 'metaltek_leads_v1',
  PROCESS_CARDS: 'metaltek_process_cards_v1',
  CAPABILITY_CARDS: 'metaltek_capability_cards_v1',
  MARKET_CARDS: 'metaltek_market_cards_v1',
  VIDEOS: 'metaltek_videos_v1',
};

export const INITIAL_NAVIGATION_MENU: NavigationMenuItem[] = [
  {
    id: 'casting',
    label: 'Metal Casting',
    iconName: 'Flame',
    routeView: 'metal-casting',
    subItems: [
      { id: 'centrifugal-casting', label: 'Centrifugal Casting', slug: 'centrifugal-casting', description: 'High-density cylindrical castings with superior directional solidification.', routeView: 'metal-casting', subSlug: 'centrifugal-casting' },
      { id: 'sand-casting', label: 'Sand Casting', slug: 'sand-casting', description: 'Heavy-section net-shape casting for intricate and large industrial geometries.', routeView: 'metal-casting', subSlug: 'sand-casting' },
      { id: 'investment-casting', label: 'Investment Casting', slug: 'investment-casting', description: 'Near net-shape investment casting with micro-tolerances and tight finish.', routeView: 'metal-casting', subSlug: 'investment-casting' },
      { id: 'ingot', label: 'High-Integrity Ingot', slug: 'ingot', description: 'Consistently refined remelt ingots and forging stock for critical re-processing.', routeView: 'metal-casting', subSlug: 'ingot' },
    ],
  },
  {
    id: 'capabilities',
    label: 'Capabilities',
    iconName: 'Wrench',
    routeView: 'capabilities',
    subItems: [
      { id: 'metallurgy-engineering', label: 'Metallurgy & Engineering', slug: 'metallurgy-engineering', description: 'Integrated alloy expertise, MagmaSoft solidification modeling, and defect prevention.', routeView: 'capabilities', subSlug: 'metallurgy-engineering' },
      { id: 'additive-manufacturing', label: 'Additive Manufacturing (3D Sand)', slug: 'additive-manufacturing', description: '3D printed sand molds and rapid wax patterns for prototype-to-production speed.', routeView: 'capabilities', subSlug: 'additive-manufacturing' },
      { id: 'heat-treatment', label: 'Precision Heat Treatment', slug: 'heat-treatment', description: 'Calibrated furnaces for solution annealing, water quenching, and stress relieving.', routeView: 'capabilities', subSlug: 'heat-treatment' },
      { id: 'metal-machining', label: 'Metal Machining', slug: 'metal-machining', description: 'Over 200 CNC vertical turret lathes and horizontal boring mills.', routeView: 'capabilities', subSlug: 'metal-machining' },
      { id: 'metal-fabrication', label: 'Metal Fabrication', slug: 'metal-fabrication', description: 'ASME Boiler & Pressure Vessel qualified welding and automated submerged arc overlay.', routeView: 'capabilities', subSlug: 'metal-fabrication' },
      { id: 'metal-testing-analysis', label: 'Metal Testing & Analysis', slug: 'metal-testing-analysis', description: 'Optical emission spectrometry, cryogenic Charpy impact, and Level III NDT.', routeView: 'capabilities', subSlug: 'metal-testing-analysis' },
      { id: 'training', label: 'TekSession Training', slug: 'training', description: 'Proprietary technical training on alloy selection, casting design, and failure modes.', routeView: 'capabilities', subSlug: 'training' },
    ],
  },
  {
    id: 'alloys',
    label: 'Alloys & Materials',
    iconName: 'Layers',
    routeView: 'alloys',
    subItems: [
      { id: 'alloy-finder', label: 'Specialty Alloy Finder', slug: 'alloy-finder', description: 'Interactive material database with multi-parameter search and standards cross-reference.', routeView: 'alloys' },
      { id: 'stainless-steel', label: 'Stainless Steel', slug: 'stainless-steel', description: 'Austenitic, martensitic, precipitation hardening, and duplex stainless grades.', routeView: 'alloys' },
      { id: 'nickel-superalloys', label: 'Nickel-Base Superalloys', slug: 'nickel-superalloys', description: 'High-temperature corrosion-resistant alloys including Inconel, Hastelloy, and Monel.', routeView: 'alloys' },
      { id: 'bronze-alloys', label: 'Copper-Base & Bronze', slug: 'bronze-alloys', description: 'High-strength nickel aluminium bronze, manganese bronze, and marine gunmetals.', routeView: 'alloys' },
      { id: 'cobalt-wear', label: 'Cobalt-Base & Wear-Resistant', slug: 'cobalt-wear', description: 'Stellite alloys and high-chromium white irons for severe abrasive and erosive wear.', routeView: 'alloys' },
      { id: 'carbon-low-alloy', label: 'Carbon & Low-Alloy Steels', slug: 'carbon-low-alloy', description: 'ASTM A216 WCB/WCC, AISI 4140 modified, and structural casting alloys.', routeView: 'alloys' },
    ],
  },
  {
    id: 'markets',
    label: 'Market Solutions',
    iconName: 'Briefcase',
    routeView: 'market-solutions',
    subItems: [
      { id: 'railway', label: 'Locomotives and Wagons (Railway)', slug: 'railway', description: 'Brake blocks, axle box housings, and cast bogie parts for rolling stock.', routeView: 'market-solutions', subSlug: 'railway' },
      { id: 'navy-marine', label: 'Ship and Vessel Components (Navy & Marine)', slug: 'navy-marine', description: 'NAB propellers, seawater cooling pump housings, valve bodies, and deck fittings.', routeView: 'market-solutions', subSlug: 'navy-marine' },
      { id: 'heavy-vehicles', label: 'Truck and Bus Brake Systems (Heavy Vehicles)', slug: 'heavy-vehicles', description: 'Brake drums, discs, shoes, and flywheels in high-thermal conductivity grey iron.', routeView: 'market-solutions', subSlug: 'heavy-vehicles' },
      { id: 'industry', label: 'Pumps, Valves and Machine Parts (Industry)', slug: 'industry', description: 'High-pressure pump volutes, valve bodies, and turnkey custom machinery parts.', routeView: 'market-solutions', subSlug: 'industry' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources Hub',
    iconName: 'BookOpen',
    routeView: 'resources',
    subItems: [
      { id: 'technical-blog', label: 'Technical Blog', slug: 'blog', description: 'Foundry design papers, casting guides, and metallurgical failure analyses.', routeView: 'resources', subTab: 'blog' },
      { id: 'case-studies', label: 'Case Studies', slug: 'case-studies', description: 'Engineering problem solving, scrap reduction, and component life extensions.', routeView: 'resources', subTab: 'case-studies' },
      { id: 'videos', label: 'Technical Videos', slug: 'videos', description: 'Foundry pouring, AOD vessel refining, and CNC machining process videos.', routeView: 'resources', subTab: 'videos' },
      { id: 'faqs', label: 'Technical FAQs', slug: 'faqs', description: 'Common engineering queries on casting processes, alloys, and lead times.', routeView: 'resources', subTab: 'faqs' },
      { id: 'glossary', label: 'Metallurgy Glossary', slug: 'glossary', description: 'Comprehensive A-Z dictionary of casting, metallurgy, and heat treat terminology.', routeView: 'resources', subTab: 'glossary' },
      { id: 'downloads', label: 'Downloads', slug: 'downloads', description: 'Official alloy specification datasheets, ISO certificates, and company brochures.', routeView: 'resources', subTab: 'downloads' },
    ],
  },
  {
    id: 'about',
    label: 'About Us',
    iconName: 'Building',
    routeView: 'about-us',
    subItems: [
      { id: 'overview', label: 'Company Overview / Who We Are', slug: 'overview', description: 'South Asia’s premier high-integrity metal casting and industrial engineering partner.', routeView: 'about-us', subSection: 'overview' },
      { id: 'history', label: 'Our History / Legacy', slug: 'history', description: 'Over three decades of industrial metallurgy craftsmanship and milestone achievements.', routeView: 'about-us', subSection: 'history' },
      { id: 'mission-vision', label: 'Mission & Vision', slug: 'mission-vision', description: 'Empowering critical global infrastructure through defect-free casting integrity.', routeView: 'about-us', subSection: 'mission-vision' },
      { id: 'leadership', label: 'Leadership & Team', slug: 'leadership', description: 'Led by certified PhD metallurgists, CAD solidification engineers, and machinists.', routeView: 'about-us', subSection: 'leadership' },
      { id: 'certifications', label: 'Quality Standards & Certifications', slug: 'certifications', description: 'ISO 9001:2015, Nadcap, Lloyd’s Register, and EN 10204 3.1 quality management.', routeView: 'about-us', subSection: 'certifications' },
      { id: 'why-us', label: 'Why Metal Tech BD', slug: 'why-us', description: 'Proven metallurgical repeatability, precision casting, and turnkey CNC finishing.', routeView: 'about-us', subSection: 'why-us' },
    ],
  },
];

export const INITIAL_CONTENT_ITEMS: ContentItem[] = [
  {
    id: 'content-1',
    menuId: 'casting',
    subItemId: 'centrifugal-casting',
    title: 'High-Density Centrifugal Casting Specifications',
    subtitle: 'Directional Solidification for Severe Cylindrical Environments',
    eyebrow: 'Engineered Foundry Process',
    bodyMdx: 'Using high G-force rotational permanent molds, centrifugal casting forces molten metal outward against the mold wall, achieving optimal directional solidification from outside in. Impurities and gas porosities migrate to the inner bore, which is cleanly machined out, yielding forging-quality microstructures without porosity or center-line shrinkage.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    pdfUrl: '/downloads/centrifugal-casting-spec.pdf',
    pdfSize: '3.4 MB',
    specs: [
      { key: 'Outside Diameter Range', value: '75 mm to 3,000 mm (3 in to 118 in)' },
      { key: 'Max Single Pour Weight', value: '22,000 kg (48,500 lbs)' },
      { key: 'Machining Tolerance', value: 'Rough ±0.25 mm, Finish ±0.015 mm' },
      { key: 'Inspection Standards', value: 'ASTM A609 Level 1, EN 10228-3' },
    ],
    isPublished: true,
    updatedAt: '2026-11-03',
  },
  {
    id: 'content-2',
    menuId: 'casting',
    subItemId: 'sand-casting',
    title: 'Precision Chemically-Bonded Sand Casting',
    subtitle: 'Complex Heavy-Section Industrial Geometries with MagmaSoft Solidification Control',
    eyebrow: 'Molding & Net-Shape Foundry',
    bodyMdx: 'Our chemically-bonded resin sand and no-bake molding systems deliver high dimensional repeatability for complex heavy industrial geometries. Backed by computational MagmaSoft solidification simulation, we design optimal gating and risering to guarantee sound, radiographically clean metal sections.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
    pdfUrl: '/downloads/sand-casting-technical-guide.pdf',
    pdfSize: '2.8 MB',
    specs: [
      { key: 'Envelope Limits', value: '4,500 mm × 3,800 mm × 2,200 mm' },
      { key: 'Finished Weight Range', value: '50 kg to 18,000 kg' },
      { key: 'Dimensional Standard', value: 'ISO 8062-3 Grade DGT8 to DGT10' },
      { key: 'Surface Roughness', value: 'Ra 12.5 µm to 25 µm' },
    ],
    isPublished: true,
    updatedAt: '2026-11-03',
  },
  {
    id: 'content-3',
    menuId: 'capabilities',
    subItemId: 'metallurgy-engineering',
    title: 'Computational Solidification Modeling & Metallurgy Consulting',
    subtitle: 'MagmaSoft Finite Element Analysis for Defect-Free Production Runs',
    eyebrow: 'Engineering Assurance',
    bodyMdx: 'Our metallurgical engineering department works alongside OEM designers from preliminary alloy selection to finite-element mold flow simulation. We predict phase transformations, thermal gradients, and shrinkage porosity before cutting physical patterns, ensuring 100% first-article acceptance.',
    imageUrl: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80',
    pdfUrl: '/downloads/solidification-modeling-overview.pdf',
    pdfSize: '4.1 MB',
    specs: [
      { key: 'Simulation Platform', value: 'MagmaSoft 5.5 + Ansys Thermal Suite' },
      { key: 'Metallurgy Team', value: 'Certified PhD & Level III ASNT Specialists' },
      { key: 'Standard Compliance', value: 'NACE MR0175, ASTM E45, ASTM E112' },
    ],
    isPublished: true,
    updatedAt: '2026-11-03',
  },
  {
    id: 'content-4',
    menuId: 'capabilities',
    subItemId: 'metal-machining',
    title: 'Over 200 CNC Turning & Milling Centers',
    subtitle: 'Turnkey CNC Machining for Nickel Superalloys & Austenitic Steels',
    eyebrow: 'Precision Machining Facility',
    bodyMdx: 'Equipped with heavy horizontal boring mills, 5-axis vertical machining centers, and CNC vertical turret lathes capable of turning components up to 3,200 mm diameter. We specialize in hard-to-machine nickel superalloys, cobalt alloys, and duplex stainless grades.',
    imageUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    pdfUrl: '/downloads/cnc-machining-capabilities.pdf',
    pdfSize: '3.6 MB',
    specs: [
      { key: 'Max Turning Diameter', value: 'Up to 3,200 mm (126 in)' },
      { key: 'Tightest Tolerance', value: '±0.010 mm (0.0004 in)' },
      { key: 'Coordinate Metrology', value: 'Zeiss Bridge CMM Inspection' },
    ],
    isPublished: true,
    updatedAt: '2026-11-03',
  },
  {
    id: 'content-5',
    menuId: 'markets',
    subItemId: 'railway',
    title: 'Locomotive Bogie & High-Friction Brake Block Castings',
    subtitle: 'High-Impact Spheroidal Graphite & Austenitic Manganese Steel Components',
    eyebrow: 'Railway Sector Solutions',
    bodyMdx: 'Railway rolling stock components operate under severe mechanical shock, continuous cyclic vibrations, and intense friction heating. Metal Tech BD produces EN-GJS-500-7 ductile iron axle box housings, Hadfield manganese steel trackwork, and pearlite grey iron brake blocks meeting international railway standards.',
    imageUrl: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80',
    pdfUrl: '/downloads/railway-casting-catalog.pdf',
    pdfSize: '5.2 MB',
    specs: [
      { key: 'Key Products', value: 'Axle box housings, brake blocks, bogie side frames' },
      { key: 'Primary Metallurgy', value: 'EN-GJS-500-7, Austenitic Manganese Steel' },
      { key: 'Quality Audit', value: 'AAR & UIC railway certified casting process' },
    ],
    isPublished: true,
    updatedAt: '2026-11-03',
  },
  {
    id: 'content-6',
    menuId: 'about',
    subItemId: 'overview',
    title: 'Company Overview & South Asian Industrial Foundry Footprint',
    subtitle: 'World-Class Metallurgical Capability Engineered for Severe Operating Demands',
    eyebrow: 'Corporate Profile',
    bodyMdx: 'Metal Tech BD is South Asia’s premier high-integrity metal casting manufacturer, operating state-of-the-art facilities across Dhaka, Gazipur, and Chittagong. With centrifugal casters, chemically bonded sand molding lines, vacuum investment casting cells, and over 200 CNC machining centers, we serve heavy engineering OEMs worldwide.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    pdfUrl: '/downloads/metaltech-bd-corporate-brochure.pdf',
    pdfSize: '6.5 MB',
    specs: [
      { key: 'Established', value: '1995 (30+ Years Operational Heritage)' },
      { key: 'Foundry Locations', value: 'Dhaka HQ, Gazipur Plant, Chittagong Port Hub' },
      { key: 'Certifications', value: 'ISO 9001:2015, Nadcap, Lloyd’s Register, ASME' },
    ],
    isPublished: true,
    updatedAt: '2026-11-03',
  },
];

const DEFAULT_HERO_CONTENTS: Record<string, HeroContent> = {
  home: {
    headline: 'High-Integrity Metal Castings & Engineered Solutions',
    subhead: 'South Asia’s premier centrifugal, sand, and precision investment casting foundry.',
    badge: 'ISO 9001:2015 & Nadcap Accredited',
    ctaText: 'Request an Engineering Quote',
  },
  resources: {
    headline: 'Technical Resources Hub',
    subhead: 'Foundry whitepapers, alloy specifications, engineering case studies, and metallurgy guidelines.',
    badge: 'Knowledge Centre',
    ctaText: 'Explore Alloy Finder',
  },
  alloys: {
    headline: 'Specialty Alloy Specifications & Interactive Finder',
    subhead: 'Comprehensive alloy compositions, mechanical properties, and ASTM/EN international specifications.',
    badge: 'Metallurgy Guide',
    ctaText: 'Download Master Spec Sheet',
  },
};

const INITIAL_MOCK_LEADS: RfqLead[] = [
  {
    id: 'lead-1',
    fullName: 'Mohammad Rahim',
    email: 'm.rahim@beximcopetroleum.com',
    phone: '+880 1712-345678',
    company: 'Beximco Petroleum & Gas Ltd',
    source: 'Alloy Finder (CF8M Stainless)',
    alloyOrProcess: 'CF8M / 316 Stainless',
    estimatedQuantity: '24 units / month',
    message: 'Require technical specification sheet and delivery quotation for high-pressure pump impeller casings.',
    createdAt: '2026-11-01 14:22',
  },
  {
    id: 'lead-2',
    fullName: 'Engr. Sarah Jenkins',
    email: 's.jenkins@chevron-bangladesh.com',
    phone: '+880 1819-987654',
    company: 'Chevron Bangladesh EPC',
    source: 'Case Study: Offshore Riser Liners',
    alloyOrProcess: 'Centrifugal Casting / Inconel 625',
    estimatedQuantity: '12 liners (3,200 mm length)',
    message: 'Seeking radiographically clean centrifugal sleeves for sour gas service under NACE MR0175.',
    createdAt: '2026-11-02 09:45',
  },
];

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Session State
  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SESSION);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // 1.1 Navigation Menu & Sub-menus Mirror State
  const [navigationMenu, setNavigationMenu] = useState<NavigationMenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NAVIGATION_MENU);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= 6) {
          const cap = parsed.find((m: any) => m.id === 'capabilities');
          const mkt = parsed.find((m: any) => m.id === 'markets');
          if (cap && cap.subItems?.length >= 7 && mkt && mkt.subItems?.some((s: any) => s.id === 'railway')) {
            return parsed;
          }
        }
      }
      return INITIAL_NAVIGATION_MENU;
    } catch {
      return INITIAL_NAVIGATION_MENU;
    }
  });

  // 1.2 Content, Article & Media Workspace State
  const [contentItems, setContentItems] = useState<ContentItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTENT_ITEMS);
      return saved ? JSON.parse(saved) : INITIAL_CONTENT_ITEMS;
    } catch {
      return INITIAL_CONTENT_ITEMS;
    }
  });

  // 2. Content States
  const [siteMetadata, setSiteMetadata] = useState<SiteMetadata>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SITE_METADATA);
      return saved ? { ...SITE_METADATA, ...JSON.parse(saved) } : SITE_METADATA;
    } catch {
      return SITE_METADATA;
    }
  });

  const [heroContents, setHeroContents] = useState<Record<string, HeroContent>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.HERO_CONTENTS);
      return saved ? { ...DEFAULT_HERO_CONTENTS, ...JSON.parse(saved) } : DEFAULT_HERO_CONTENTS;
    } catch {
      return DEFAULT_HERO_CONTENTS;
    }
  });

  const [alloys, setAlloys] = useState<Alloy[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ALLOYS);
      return saved ? JSON.parse(saved) : ALLOY_DATABASE;
    } catch {
      return ALLOY_DATABASE;
    }
  });

  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CASE_STUDIES);
      return saved ? JSON.parse(saved) : CASE_STUDIES;
    } catch {
      return CASE_STUDIES;
    }
  });

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLOG_POSTS);
      return saved ? JSON.parse(saved) : BLOG_POSTS;
    } catch {
      return BLOG_POSTS;
    }
  });

  const [faqs, setFaqs] = useState<FaqItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
      return saved ? JSON.parse(saved) : FAQ_ITEMS;
    } catch {
      return FAQ_ITEMS;
    }
  });

  const [downloads, setDownloads] = useState<DownloadItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DOWNLOADS);
      return saved ? JSON.parse(saved) : INITIAL_DOWNLOADS;
    } catch {
      return INITIAL_DOWNLOADS;
    }
  });

  const [glossary, setGlossary] = useState<GlossaryTerm[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GLOSSARY);
      return saved ? JSON.parse(saved) : GLOSSARY_TERMS;
    } catch {
      return GLOSSARY_TERMS;
    }
  });

  const [leads, setLeads] = useState<RfqLead[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
      return saved ? JSON.parse(saved) : INITIAL_MOCK_LEADS;
    } catch {
      return INITIAL_MOCK_LEADS;
    }
  });

  // Dynamic Universal Cards State (Universal Editable State)
  const [processCards, setProcessCards] = useState<ProcessItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROCESS_CARDS);
      return saved ? JSON.parse(saved) : CASTING_PROCESSES;
    } catch {
      return CASTING_PROCESSES;
    }
  });

  const [capabilityCards, setCapabilityCards] = useState<CapabilityItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CAPABILITY_CARDS);
      return saved ? JSON.parse(saved) : CAPABILITIES;
    } catch {
      return CAPABILITIES;
    }
  });

  const [marketCards, setMarketCards] = useState<MarketItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MARKET_CARDS);
      return saved ? JSON.parse(saved) : MARKET_SOLUTIONS;
    } catch {
      return MARKET_SOLUTIONS;
    }
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VIDEOS);
      return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
    } catch {
      return INITIAL_VIDEOS;
    }
  });

  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  // Toast Handler
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Auth Handlers
  const login = (usernameOrEmail: string, pass: string) => {
    const cleanUser = usernameOrEmail.trim().toLowerCase();
    const cleanPass = pass.trim();

    // Default Authorized Credentials:
    // Usernames: admin@metaltekbd.com | admin
    // Password: MetalTek@2026 | admin123
    const isValidUser = cleanUser === 'admin@metaltekbd.com' || cleanUser === 'admin';
    const isValidPass = cleanPass === 'MetalTek@2026' || cleanPass === 'admin123';

    if (isValidUser && isValidPass) {
      const user: AdminUser = {
        email: cleanUser.includes('@') ? cleanUser : 'admin@metaltekbd.com',
        name: 'Chief Metallurgical Officer / Admin',
        role: 'superadmin',
        loginTime: new Date().toISOString(),
      };
      setAdminUser(user);
      localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
      showToast('Authentication Successful. Welcome to Admin Console.', 'success');
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please enter authorized username/email and password.',
    };
  };

  const logout = () => {
    setAdminUser(null);
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    showToast('Logged out of Admin Console.', 'info');
  };

  // Persistence Effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SITE_METADATA, JSON.stringify(siteMetadata));
  }, [siteMetadata]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.HERO_CONTENTS, JSON.stringify(heroContents));
  }, [heroContents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ALLOYS, JSON.stringify(alloys));
  }, [alloys]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CASE_STUDIES, JSON.stringify(caseStudies));
  }, [caseStudies]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BLOG_POSTS, JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOWNLOADS, JSON.stringify(downloads));
  }, [downloads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NAVIGATION_MENU, JSON.stringify(navigationMenu));
  }, [navigationMenu]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONTENT_ITEMS, JSON.stringify(contentItems));
  }, [contentItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GLOSSARY, JSON.stringify(glossary));
  }, [glossary]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROCESS_CARDS, JSON.stringify(processCards));
  }, [processCards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CAPABILITY_CARDS, JSON.stringify(capabilityCards));
  }, [capabilityCards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MARKET_CARDS, JSON.stringify(marketCards));
  }, [marketCards]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VIDEOS, JSON.stringify(videos));
  }, [videos]);

  // Supabase Real-time Cloud Sync State & Listeners
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(false);
  const [supabaseSyncing, setSupabaseSyncing] = useState<boolean>(false);

  const syncWithSupabase = async () => {
    setSupabaseSyncing(true);
    try {
      // 1. Site Metadata
      const { data: metaData, error: metaErr } = await supabase.from('site_metadata').select('*').limit(1).maybeSingle();
      if (!metaErr && metaData) {
        setSiteMetadata(prev => ({ ...prev, ...fromSiteMetadataRow(metaData) }));
        setSupabaseConnected(true);
      } else if (!metaErr) {
        setSupabaseConnected(true);
      }

      // 2. Process Cards
      const { data: procData, error: procErr } = await supabase.from('process_cards').select('*');
      if (!procErr && procData && procData.length > 0) {
        setProcessCards(procData.map(fromProcessCardRow));
        setSupabaseConnected(true);
      }

      // 3. Capability Cards
      const { data: capData, error: capErr } = await supabase.from('capability_cards').select('*');
      if (!capErr && capData && capData.length > 0) {
        setCapabilityCards(capData.map(fromCapabilityCardRow));
        setSupabaseConnected(true);
      }

      // 4. Market Cards
      const { data: mktData, error: mktErr } = await supabase.from('market_cards').select('*');
      if (!mktErr && mktData && mktData.length > 0) {
        setMarketCards(mktData.map(fromMarketCardRow));
        setSupabaseConnected(true);
      }

      // 5. Videos
      const { data: vidData, error: vidErr } = await supabase.from('videos').select('*');
      if (!vidErr && vidData && vidData.length > 0) {
        setVideos(vidData.map(fromVideoRow));
        setSupabaseConnected(true);
      }

      // 6. RFQ Leads
      const { data: leadData, error: leadErr } = await supabase.from('rfq_leads').select('*').order('created_at', { ascending: false });
      if (!leadErr && leadData && leadData.length > 0) {
        setLeads(leadData.map(fromLeadRow));
        setSupabaseConnected(true);
      }
    } catch (e) {
      console.warn('Supabase sync notice:', e);
    } finally {
      setSupabaseSyncing(false);
    }
  };

  useEffect(() => {
    syncWithSupabase();

    // Setup Supabase Realtime Listener across all tables
    const channel = supabase
      .channel('metaltek_db_realtime')
      .on('postgres_changes', { event: '*', schema: 'public' }, (payload) => {
        if (payload.table === 'process_cards') {
          supabase.from('process_cards').select('*').then(({ data }) => {
            if (data && data.length > 0) setProcessCards(data.map(fromProcessCardRow));
          });
        } else if (payload.table === 'capability_cards') {
          supabase.from('capability_cards').select('*').then(({ data }) => {
            if (data && data.length > 0) setCapabilityCards(data.map(fromCapabilityCardRow));
          });
        } else if (payload.table === 'market_cards') {
          supabase.from('market_cards').select('*').then(({ data }) => {
            if (data && data.length > 0) setMarketCards(data.map(fromMarketCardRow));
          });
        } else if (payload.table === 'videos') {
          supabase.from('videos').select('*').then(({ data }) => {
            if (data && data.length > 0) setVideos(data.map(fromVideoRow));
          });
        } else if (payload.table === 'rfq_leads') {
          supabase.from('rfq_leads').select('*').order('created_at', { ascending: false }).then(({ data }) => {
            if (data && data.length > 0) setLeads(data.map(fromLeadRow));
          });
        } else if (payload.table === 'site_metadata') {
          supabase.from('site_metadata').select('*').limit(1).maybeSingle().then(({ data }) => {
            if (data) setSiteMetadata(prev => ({ ...prev, ...fromSiteMetadataRow(data) }));
          });
        }
      })
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          setSupabaseConnected(true);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Main Menu Handlers
  const addMainMenu = (menu: NavigationMenuItem) => {
    setNavigationMenu(prev => [...prev, menu]);
    showToast(`Main menu "${menu.label}" created!`);
  };

  const updateMainMenu = (menuId: string, updated: Partial<NavigationMenuItem>) => {
    setNavigationMenu(prev => prev.map(m => m.id === menuId ? { ...m, ...updated } : m));
    showToast('Main menu updated!');
  };

  const deleteMainMenu = (menuId: string) => {
    setNavigationMenu(prev => prev.filter(m => m.id !== menuId));
    showToast('Main menu removed from navigation.', 'info');
  };

  // Process Cards CRUD (with Bi-directional Auto-Translation & Supabase Sync)
  const addProcessCard = (card: ProcessItem) => {
    const bilingual = autoTranslateProcessFields(card);
    setProcessCards(prev => [...prev, bilingual]);
    supabase.from('process_cards').upsert(toProcessCardRow(bilingual)).then(({ error }) => {
      if (error) console.warn('Supabase sync process card:', error.message);
    });
    showToast(`Process card "${bilingual.title}" added!`);
  };

  const updateProcessCard = (slug: string, updated: Partial<ProcessItem>) => {
    let targetCard: ProcessItem | undefined;
    setProcessCards(prev => prev.map(p => {
      if (p.slug === slug) {
        targetCard = autoTranslateProcessFields({ ...p, ...updated });
        return targetCard;
      }
      return p;
    }));
    if (targetCard) {
      supabase.from('process_cards').upsert(toProcessCardRow(targetCard)).then(({ error }) => {
        if (error) console.warn('Supabase sync process card update:', error.message);
      });
    }
    showToast('Process card updated with bilingual sync!');
  };

  const deleteProcessCard = (slug: string) => {
    setProcessCards(prev => prev.filter(p => p.slug !== slug));
    supabase.from('process_cards').delete().eq('slug', slug).then(({ error }) => {
      if (error) console.warn('Supabase delete process card:', error.message);
    });
    showToast('Process card removed.', 'info');
  };

  // Capability Cards CRUD (with Bi-directional Auto-Translation & Supabase Sync)
  const addCapabilityCard = (card: CapabilityItem) => {
    const bilingual = autoTranslateCapabilityFields(card);
    setCapabilityCards(prev => [...prev, bilingual]);
    supabase.from('capability_cards').upsert(toCapabilityCardRow(bilingual)).then(({ error }) => {
      if (error) console.warn('Supabase sync capability card:', error.message);
    });
    showToast(`Capability "${bilingual.title}" added!`);
  };

  const updateCapabilityCard = (slug: string, updated: Partial<CapabilityItem>) => {
    let targetCard: CapabilityItem | undefined;
    setCapabilityCards(prev => prev.map(c => {
      if (c.slug === slug) {
        targetCard = autoTranslateCapabilityFields({ ...c, ...updated });
        return targetCard;
      }
      return c;
    }));
    if (targetCard) {
      supabase.from('capability_cards').upsert(toCapabilityCardRow(targetCard)).then(({ error }) => {
        if (error) console.warn('Supabase sync capability card update:', error.message);
      });
    }
    showToast('Capability card updated!');
  };

  const deleteCapabilityCard = (slug: string) => {
    setCapabilityCards(prev => prev.filter(c => c.slug !== slug));
    supabase.from('capability_cards').delete().eq('slug', slug).then(({ error }) => {
      if (error) console.warn('Supabase delete capability card:', error.message);
    });
    showToast('Capability card removed.', 'info');
  };

  // Market Cards CRUD (with Bi-directional Auto-Translation & Supabase Sync)
  const addMarketCard = (card: MarketItem) => {
    const bilingual = autoTranslateMarketFields(card);
    setMarketCards(prev => [...prev, bilingual]);
    supabase.from('market_cards').upsert(toMarketCardRow(bilingual)).then(({ error }) => {
      if (error) console.warn('Supabase sync market card:', error.message);
    });
    showToast(`Market solution "${bilingual.title}" added!`);
  };

  const updateMarketCard = (slug: string, updated: Partial<MarketItem>) => {
    let targetCard: MarketItem | undefined;
    setMarketCards(prev => prev.map(m => {
      if (m.slug === slug) {
        targetCard = autoTranslateMarketFields({ ...m, ...updated });
        return targetCard;
      }
      return m;
    }));
    if (targetCard) {
      supabase.from('market_cards').upsert(toMarketCardRow(targetCard)).then(({ error }) => {
        if (error) console.warn('Supabase sync market card update:', error.message);
      });
    }
    showToast('Market solution updated!');
  };

  const deleteMarketCard = (slug: string) => {
    setMarketCards(prev => prev.filter(m => m.slug !== slug));
    supabase.from('market_cards').delete().eq('slug', slug).then(({ error }) => {
      if (error) console.warn('Supabase delete market card:', error.message);
    });
    showToast('Market solution removed.', 'info');
  };

  // Technical Videos CRUD (with Bi-directional Auto-Translation & Supabase Sync)
  const addVideo = (video: VideoItem) => {
    const bilingual = autoTranslateVideoFields(video);
    setVideos(prev => [bilingual, ...prev]);
    supabase.from('videos').upsert(toVideoRow(bilingual)).then(({ error }) => {
      if (error) console.warn('Supabase sync video:', error.message);
    });
    showToast(`Technical video "${bilingual.title}" added!`);
  };

  const updateVideo = (id: string, updated: Partial<VideoItem>) => {
    let targetVideo: VideoItem | undefined;
    setVideos(prev => prev.map(v => {
      if (v.id === id) {
        targetVideo = autoTranslateVideoFields({ ...v, ...updated });
        return targetVideo;
      }
      return v;
    }));
    if (targetVideo) {
      supabase.from('videos').upsert(toVideoRow(targetVideo)).then(({ error }) => {
        if (error) console.warn('Supabase sync video update:', error.message);
      });
    }
    showToast('Technical video updated!');
  };

  const deleteVideo = (id: string) => {
    setVideos(prev => prev.filter(v => v.id !== id));
    supabase.from('videos').delete().eq('id', id).then(({ error }) => {
      if (error) console.warn('Supabase delete video:', error.message);
    });
    showToast('Technical video removed.', 'info');
  };

  // Navigation Sub-menu Handlers (Syncs directly with header dropdowns)
  const addSubMenu = (menuId: string, subItem: NavigationSubItem) => {
    setNavigationMenu(prev => prev.map(m => {
      if (m.id === menuId) {
        return { ...m, subItems: [...m.subItems, subItem] };
      }
      return m;
    }));
    showToast(`Sub-menu "${subItem.label}" added to ${menuId}!`);
  };

  const updateSubMenu = (menuId: string, subItemId: string, updated: Partial<NavigationSubItem>) => {
    setNavigationMenu(prev => prev.map(m => {
      if (m.id === menuId) {
        return {
          ...m,
          subItems: m.subItems.map(s => s.id === subItemId ? { ...s, ...updated } : s),
        };
      }
      return m;
    }));
    showToast('Sub-menu updated!');
  };

  const deleteSubMenu = (menuId: string, subItemId: string) => {
    setNavigationMenu(prev => prev.map(m => {
      if (m.id === menuId) {
        return {
          ...m,
          subItems: m.subItems.filter(s => s.id !== subItemId),
        };
      }
      return m;
    }));
    showToast('Sub-menu removed from navigation.', 'info');
  };

  // Content, Article & Media Workspace Handlers (with Bi-directional Auto-Translation)
  const addContentItem = (item: ContentItem) => {
    const bilingualItem = autoTranslateContentItemFields(item);
    setContentItems(prev => [bilingualItem, ...prev]);
    showToast(`Content item "${bilingualItem.title}" saved with English & Bengali versions!`);
  };

  const updateContentItem = (id: string, updated: Partial<ContentItem>) => {
    setContentItems(prev => prev.map(c => {
      if (c.id === id) {
        const merged = { ...c, ...updated, updatedAt: new Date().toISOString().substring(0, 10) };
        return autoTranslateContentItemFields(merged);
      }
      return c;
    }));
    showToast('Content item updated with bi-lingual sync!');
  };

  const deleteContentItem = (id: string) => {
    setContentItems(prev => prev.filter(c => c.id !== id));
    showToast('Content item deleted.', 'info');
  };

  // Content Handlers
  const updateSiteMetadata = (data: Partial<SiteMetadata>) => {
    setSiteMetadata(prev => {
      const merged = { ...prev, ...data };
      supabase.from('site_metadata').upsert(toSiteMetadataRow(merged)).then(({ error }) => {
        if (error) console.warn('Supabase sync site metadata:', error.message);
      });
      return merged;
    });
    showToast('General Settings Updated Successfully!');
  };

  const updateHeroContent = (pageKey: string, content: Partial<HeroContent>) => {
    setHeroContents(prev => ({
      ...prev,
      [pageKey]: {
        ...(prev[pageKey] || { headline: '', subhead: '' }),
        ...content,
      },
    }));
    showToast(`Hero content for "${pageKey}" updated!`);
  };

  // Alloys CRUD
  const addAlloy = (alloy: Alloy) => {
    setAlloys(prev => [alloy, ...prev]);
    showToast(`Alloy "${alloy.name}" added to catalog!`);
  };

  const updateAlloy = (id: string, updated: Partial<Alloy>) => {
    setAlloys(prev => prev.map(a => (a.id === id ? { ...a, ...updated } : a)));
    showToast('Alloy specifications updated!');
  };

  const deleteAlloy = (id: string) => {
    setAlloys(prev => prev.filter(a => a.id !== id));
    showToast('Alloy removed from catalog.', 'info');
  };

  // Case Studies CRUD
  const addCaseStudy = (caseStudy: CaseStudy) => {
    setCaseStudies(prev => [caseStudy, ...prev]);
    showToast(`Case study "${caseStudy.title}" published!`);
  };

  const updateCaseStudy = (slug: string, updated: Partial<CaseStudy>) => {
    setCaseStudies(prev => prev.map(c => (c.slug === slug ? { ...c, ...updated } : c)));
    showToast('Case study updated!');
  };

  const deleteCaseStudy = (slug: string) => {
    setCaseStudies(prev => prev.filter(c => c.slug !== slug));
    showToast('Case study deleted.', 'info');
  };

  // Blog Posts & Technical Papers CRUD (with Bi-directional Auto-Translation)
  const addBlogPost = (post: BlogPost) => {
    const bilingualPost = autoTranslateBlogPostFields(post);
    setBlogPosts(prev => [bilingualPost, ...prev]);
    showToast(`Article "${bilingualPost.title}" published with bi-lingual translations!`);
  };

  const updateBlogPost = (slug: string, updated: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(b => {
      if (b.slug === slug) {
        const merged = { ...b, ...updated };
        return autoTranslateBlogPostFields(merged);
      }
      return b;
    }));
    showToast('Technical paper updated!');
  };

  const deleteBlogPost = (slug: string) => {
    setBlogPosts(prev => prev.filter(b => b.slug !== slug));
    showToast('Technical paper deleted.', 'info');
  };

  // FAQs CRUD
  const addFaq = (faq: FaqItem) => {
    setFaqs(prev => [...prev, faq]);
    showToast('New FAQ added!');
  };

  const updateFaq = (index: number, updated: Partial<FaqItem>) => {
    setFaqs(prev => prev.map((f, i) => (i === index ? { ...f, ...updated } : f)));
    showToast('FAQ updated!');
  };

  const deleteFaq = (index: number) => {
    setFaqs(prev => prev.filter((_, i) => i !== index));
    showToast('FAQ removed.', 'info');
  };

  // Downloads CRUD
  const addDownload = (item: DownloadItem) => {
    setDownloads(prev => [item, ...prev]);
    showToast(`Document "${item.title}" added to Downloads!`);
  };

  const updateDownload = (index: number, updated: Partial<DownloadItem>) => {
    setDownloads(prev => prev.map((d, i) => (i === index ? { ...d, ...updated } : d)));
    showToast('Download item updated!');
  };

  const deleteDownload = (index: number) => {
    setDownloads(prev => prev.filter((_, i) => i !== index));
    showToast('Download item removed.', 'info');
  };

  // Glossary CRUD
  const addGlossaryTerm = (term: GlossaryTerm) => {
    setGlossary(prev => [...prev, term].sort((a, b) => a.term.localeCompare(b.term)));
    showToast(`Glossary term "${term.term}" added!`);
  };

  const updateGlossaryTerm = (index: number, updated: Partial<GlossaryTerm>) => {
    setGlossary(prev => prev.map((g, i) => (i === index ? { ...g, ...updated } : g)));
    showToast('Glossary term updated!');
  };

  const deleteGlossaryTerm = (index: number) => {
    setGlossary(prev => prev.filter((_, i) => i !== index));
    showToast('Glossary term removed.', 'info');
  };

  // Leads
  const recordLead = (lead: Omit<RfqLead, 'id' | 'createdAt'>) => {
    const newLead: RfqLead = {
      ...lead,
      id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
    };
    setLeads(prev => [newLead, ...prev]);
    supabase.from('rfq_leads').insert(toLeadRow(newLead)).then(({ error }) => {
      if (error) console.warn('Supabase insert rfq lead:', error.message);
    });
  };

  const deleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    supabase.from('rfq_leads').delete().eq('id', id).then(({ error }) => {
      if (error) console.warn('Supabase delete lead:', error.message);
    });
    showToast('Lead entry removed.', 'info');
  };

  // Factory Reset
  const resetToDefaults = () => {
    setSiteMetadata(SITE_METADATA);
    setHeroContents(DEFAULT_HERO_CONTENTS);
    setNavigationMenu(INITIAL_NAVIGATION_MENU);
    setContentItems(INITIAL_CONTENT_ITEMS);
    setAlloys(ALLOY_DATABASE);
    setCaseStudies(CASE_STUDIES);
    setBlogPosts(BLOG_POSTS);
    setFaqs(FAQ_ITEMS);
    setDownloads(INITIAL_DOWNLOADS);
    setGlossary(GLOSSARY_TERMS);
    setLeads(INITIAL_MOCK_LEADS);
    setProcessCards(CASTING_PROCESSES);
    setCapabilityCards(CAPABILITIES);
    setMarketCards(MARKET_SOLUTIONS);
    setVideos(INITIAL_VIDEOS);

    Object.values(STORAGE_KEYS).forEach(key => {
      if (key !== STORAGE_KEYS.SESSION) {
        localStorage.removeItem(key);
      }
    });

    showToast('All contents reset to factory defaults.', 'info');
  };

  // Export JSON Backup
  const exportDataJson = () => {
    const payload = {
      version: '1.1',
      exportedAt: new Date().toISOString(),
      siteMetadata,
      heroContents,
      navigationMenu,
      contentItems,
      alloys,
      caseStudies,
      blogPosts,
      faqs,
      downloads,
      glossary,
      leads,
      processCards,
      capabilityCards,
      marketCards,
      videos,
    };
    return JSON.stringify(payload, null, 2);
  };

  // Import JSON Backup
  const importDataJson = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.siteMetadata) setSiteMetadata(data.siteMetadata);
      if (data.heroContents) setHeroContents(data.heroContents);
      if (data.navigationMenu) setNavigationMenu(data.navigationMenu);
      if (data.contentItems) setContentItems(data.contentItems);
      if (data.alloys) setAlloys(data.alloys);
      if (data.caseStudies) setCaseStudies(data.caseStudies);
      if (data.blogPosts) setBlogPosts(data.blogPosts);
      if (data.faqs) setFaqs(data.faqs);
      if (data.downloads) setDownloads(data.downloads);
      if (data.glossary) setGlossary(data.glossary);
      if (data.leads) setLeads(data.leads);
      if (data.processCards) setProcessCards(data.processCards);
      if (data.capabilityCards) setCapabilityCards(data.capabilityCards);
      if (data.marketCards) setMarketCards(data.marketCards);
      if (data.videos) setVideos(data.videos);
      showToast('Backup data imported successfully!', 'success');
      return { success: true };
    } catch {
      showToast('Invalid JSON file. Import failed.', 'error');
      return { success: false, error: 'Malformed JSON payload.' };
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated: Boolean(adminUser),
        adminUser,
        login,
        logout,
        navigationMenu,
        addMainMenu,
        updateMainMenu,
        deleteMainMenu,
        addSubMenu,
        updateSubMenu,
        deleteSubMenu,
        processCards,
        addProcessCard,
        updateProcessCard,
        deleteProcessCard,
        capabilityCards,
        addCapabilityCard,
        updateCapabilityCard,
        deleteCapabilityCard,
        marketCards,
        addMarketCard,
        updateMarketCard,
        deleteMarketCard,
        videos,
        addVideo,
        updateVideo,
        deleteVideo,
        contentItems,
        addContentItem,
        updateContentItem,
        deleteContentItem,
        siteMetadata,
        updateSiteMetadata,
        heroContents,
        updateHeroContent,
        alloys,
        addAlloy,
        updateAlloy,
        deleteAlloy,
        caseStudies,
        addCaseStudy,
        updateCaseStudy,
        deleteCaseStudy,
        blogPosts,
        addBlogPost,
        updateBlogPost,
        deleteBlogPost,
        faqs,
        addFaq,
        updateFaq,
        deleteFaq,
        downloads,
        addDownload,
        updateDownload,
        deleteDownload,
        glossary,
        addGlossaryTerm,
        updateGlossaryTerm,
        deleteGlossaryTerm,
        leads,
        recordLead,
        deleteLead,
        toasts,
        showToast,
        dismissToast,
        resetToDefaults,
        exportDataJson,
        importDataJson,
        supabaseConnected,
        supabaseSyncing,
        syncWithSupabase,
      }}
    >
      {children}

      {/* Real-time Floating Toasts Portal */}
      <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-md shadow-xl text-sm font-medium flex items-center justify-between gap-3 border transition-all animate-in slide-in-from-left duration-200 ${
              toast.type === 'success'
                ? 'bg-[#0F1B2D] text-emerald-400 border-emerald-500/40 shadow-emerald-950/40'
                : toast.type === 'error'
                  ? 'bg-[#0F1B2D] text-rose-400 border-rose-500/40 shadow-rose-950/40'
                  : 'bg-[#0F1B2D] text-cyan-300 border-cyan-500/40 shadow-cyan-950/40'
            }`}
          >
            <span>{toast.message}</span>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-white p-0.5 cursor-pointer"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
