/**
 * Metal Tek BD – Resources Hub Types
 * Strict implementation of PRD Schema (PostgreSQL / Supabase)
 * Single Source of Truth for Resources Content & Entities
 */

export interface Industry {
  id: string;
  name: string;
  name_bn?: string;
  slug: string;
}

export interface CastingProcess {
  id: string;
  name: string;
  name_bn?: string;
  slug: string;
  summary?: string;
  how_it_works?: string;
  advantages?: string[];
  limitations?: string[];
  tolerance?: string;
  surface_finish?: string;
  min_weight_kg?: number;
  max_weight_kg?: number;
  volume_suitability?: string;
  diagram_url?: string;
  display_order?: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AlloyFamily {
  id: string;
  name: string;
  slug: string;
  display_order?: number;
}

export interface AlloyCompositionElement {
  min?: number;
  max?: number;
}

export type AlloyComposition = Record<string, AlloyCompositionElement>;

export interface AlloyStandard {
  id?: string;
  alloy_id?: string;
  standard_body: 'ASTM' | 'EN' | 'DIN' | 'JIS' | 'BS' | 'IS' | string;
  designation: string;
}

export interface Alloy {
  id: string;
  family_id: string;
  name: string;
  grade: string;
  slug: string;
  description?: string;
  composition: AlloyComposition;
  tensile_mpa_min?: number;
  yield_mpa_min?: number;
  elongation_pct_min?: number;
  hardness_value?: string;
  hardness_scale?: 'HB' | 'HRC' | string;
  impact_joules?: number;
  density_g_cm3?: number;
  machinability?: string;
  weldability?: string;
  heat_treatments?: string[];
  typical_applications?: string[];
  spec_sheet_url?: string;
  image_url?: string;
  seo_title?: string;
  seo_description?: string;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
  // Joined relations
  family?: AlloyFamily;
  standards?: AlloyStandard[];
  processes?: CastingProcess[];
  industries?: Industry[];
}

export interface TechnicalPaper {
  id: string;
  title: string;
  title_bn?: string;
  slug: string;
  abstract?: string;
  body_mdx?: string;
  authors?: string[];
  topics?: string[];
  cover_image_url?: string;
  file_path?: string;
  is_gated: boolean;
  reading_time_min?: number;
  published_at?: string;
  seo_title?: string;
  seo_description?: string;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
  industries?: Industry[];
}

export interface CaseStudyMetric {
  label: string;
  value: string;
  unit?: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  name: string;
  role: string;
  company?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  slug: string;
  customer_name?: string;
  anonymise_customer: boolean;
  industry_id?: string;
  process_id?: string;
  alloy_id?: string;
  challenge?: string;
  solution?: string;
  results_summary?: string;
  metrics?: CaseStudyMetric[];
  gallery?: string[];
  testimonial?: CaseStudyTestimonial;
  pdf_url?: string;
  cover_image_url?: string;
  published_at?: string;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
  // Joined relations
  industry?: Industry;
  process?: CastingProcess;
  alloy?: Alloy;
}

export interface Certification {
  id: string;
  name: string;
  issuing_body: string;
  certificate_number: string;
  scope?: string;
  issued_on?: string;
  expires_on?: string;
  status: 'active' | 'expired' | 'in_renewal';
  pdf_url?: string;
  thumbnail_url?: string;
  display_order?: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FaqCategory {
  id: string;
  name: string;
  slug: string;
  display_order?: number;
}

export interface Faq {
  id: string;
  category_id: string;
  question: string;
  answer: string;
  display_order?: number;
  helpful_count?: number;
  unhelpful_count?: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
  category?: FaqCategory;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  slug: string;
  definition: string;
  term_bn?: string;
  definition_bn?: string;
  first_letter: string;
  related_term_ids?: string[];
  related_terms?: Array<{ term: string; slug: string }>;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  description?: string;
  category: 'catalogue' | 'datasheet' | 'brochure' | 'template' | string;
  file_path: string;
  file_type?: 'pdf' | 'xlsx' | 'zip' | string;
  file_size_kb?: number;
  version?: string;
  is_gated: boolean;
  download_count?: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface ResourceLead {
  id?: string;
  full_name: string;
  email: string;
  phone?: string;
  company?: string;
  job_role?: string;
  resource_type: 'paper' | 'download' | 'case_study';
  resource_id: string;
  consent: boolean;
  source_url?: string;
  created_at?: string;
}

// Filter States
export interface AlloyFilterState {
  familyId?: string;
  search?: string;
  processId?: string;
  industryId?: string;
  standardBody?: string;
  minTensile?: number;
  maxTensile?: number;
  hardnessScale?: string;
  elementKey?: string;
  minElementPct?: number;
}

export interface PaperFilterState {
  topic?: string;
  industryId?: string;
  isGated?: boolean;
  search?: string;
  sortBy?: 'newest' | 'reading_time';
}

export interface CaseStudyFilterState {
  industryId?: string;
  processId?: string;
  alloyId?: string;
  search?: string;
}

export interface DownloadFilterState {
  category?: string;
  fileType?: string;
  search?: string;
}
