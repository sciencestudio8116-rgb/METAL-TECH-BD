/**
 * MetalTek International - Master Site Data Architecture
 * Accurately mirrors official MetalTek International structure, sitemap, capabilities, and divisions.
 */

export interface Alloy {
  id: string;
  slug: string;
  name: string;
  family: 'Stainless Steel' | 'Nickel-Base Superalloy' | 'Cobalt-Base' | 'Carbon & Low-Alloy' | 'Copper-Base & Bronze' | 'Wear-Resistant';
  castUNS: string;
  castGrade: string;
  castASTM: string;
  equivalentDIN: string;
  wroughtEquiv: string;
  description: string;
  composition: { element: string; min?: number; max?: number; typical?: string }[];
  mechanical: {
    tensileStrengthMpa: number;
    yieldStrengthMpa: number;
    elongationPct: number;
    hardnessHB: number | string;
    condition: string;
  };
  suitableProcesses: ('Centrifugal Casting' | 'Sand Casting' | 'Investment Casting')[];
  applications: string[];
  keyAttributes: string[];
}

export interface ProcessItem {
  slug: string;
  title: string;
  titleBn?: string;
  summary: string;
  summaryBn?: string;
  description: string;
  descriptionBn?: string;
  heroHeadline: string;
  heroHeadlineBn?: string;
  sizeLimits: string;
  sizeLimitsBn?: string;
  weightRange: string;
  weightRangeBn?: string;
  tolerances: string;
  tolerancesBn?: string;
  typicalComponents: string[];
  typicalComponentsBn?: string[];
  suitableAlloys: string[];
  industriesServed: string[];
}

export interface CapabilityItem {
  slug: string;
  title: string;
  titleBn?: string;
  iconName: string;
  summary: string;
  summaryBn?: string;
  description: string;
  descriptionBn?: string;
  equipmentHighlights: string[];
  equipmentHighlightsBn?: string[];
  specifications: string[];
  specificationsBn?: string[];
  standards: string[];
}

export interface MarketItem {
  slug: string;
  title: string;
  titleBn?: string;
  categoryTag?: string;
  categoryTagBn?: string;
  summary: string;
  summaryBn?: string;
  challenges: string;
  challengesBn?: string;
  solutions: string;
  solutionsBn?: string;
  componentsSupplied: string[];
  componentsSuppliedBn?: string[];
  recommendedAlloys: string[];
  salesContactMarketSlug: string;
}

export interface DivisionItem {
  slug: string;
  name: string;
  location: string;
  area: string;
  specialties: string;
  equipment: string[];
  phone: string;
  email: string;
}

export interface SalesContact {
  id: string;
  marketSlug: string;
  marketName: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  territory: string;
  experience: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  titleBn?: string;
  clientIndustry: string;
  clientIndustryBn?: string;
  challenge: string;
  challengeBn?: string;
  solution: string;
  solutionBn?: string;
  results: string[];
  resultsBn?: string[];
  alloysUsed: string;
  process: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  titleBn?: string;
  date: string;
  author: string;
  readTime: string;
  excerpt: string;
  excerptBn?: string;
  content: string[];
  contentBn?: string[];
  category: string;
  categoryBn?: string;
  imageUrl?: string;
}

export interface GlossaryTerm {
  term: string;
  category: 'Casting' | 'Metallurgy' | 'Testing' | 'Heat Treatment';
  definition: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'Casting Processes' | 'Alloys & Specifications' | 'RFQ & Orders' | 'Quality & Testing';
}

export const SITE_METADATA = {
  name: 'Metal Tech BD',
  shortName: 'Metal Tech BD',
  tagline: 'High-Integrity Metal Castings & Engineered Solutions',
  heroHeadline: 'High-Integrity Metal Castings',
  heroSubhead: 'South Asia’s premier centrifugal, sand, and precision investment casting foundry.',
  phone: '+880 2 9884521',
  phoneRaw: '88029884521',
  salesEmail: 'sales@metaltechbd.com',
  engineeringEmail: 'engineering@metaltechbd.com',
  globalHq: 'Metal Tech BD Corporate Headquarters',
  headquartersAddress: 'Plot 48, Tejgaon Industrial Area, Dhaka-1208, Bangladesh',
  dhakaHqAddress: 'Plot 48, Tejgaon Industrial Area, Dhaka-1208, Bangladesh',
  plantAddress: 'Mouchak, Kaliakair Industrial Zone, Gazipur-1750, Bangladesh',
  chittagongHub: 'Plot 12-14, Export Processing Zone, Halishahar, Chittagong-4223, Bangladesh',
  responsePromise: 'We reply within one business day with full technical review',
  copyright: '© 2026 Metal Tech BD. All Rights Reserved.',
};

export const CASTING_PROCESSES: ProcessItem[] = [
  {
    slug: 'centrifugal-casting',
    title: 'Centrifugal Casting',
    titleBn: 'সেন্ট্রিফিউগাল কাস্টিং (ঘূর্ণন ঢালাই)',
    summary: 'High-density cylindrical castings with superior directional solidification and structural integrity.',
    summaryBn: 'উচ্চ-ঘনত্বের নলাকার কাস্টিং যা উৎকৃষ্ট দিকনির্দেশক ঘনীভবন ও কাঠামোগত অখণ্ডতা প্রদান করে।',
    heroHeadline: 'Dense, Defect-Free Cylindrical Components for Severe Operating Demands',
    heroHeadlineBn: 'কঠিন অপারেটিং পরিবেশের জন্য ত্রুটিমুক্ত ও টেকসই নলাকার উপাদান',
    description: 'Using high G-force rotational molds, centrifugal casting forces molten metal outward against the mold wall, achieving optimal directional solidification from outside in. Impurities and gas porosities migrate to the inner bore, which is cleanly machined out, yielding forging-quality microstructures without porosity or center-line shrinkage.',
    descriptionBn: 'উচ্চ জি-ফোর্স ঘূর্ণমান ছাঁচ ব্যবহার করে গলিত ধাতু ছাঁচের দেয়ালে চাপ প্রয়োগের মাধ্যমে বাইরে থেকে ভেতরে নিখুঁত ঘনীভবন অর্জন করে। অপদ্রব্য এবং গ্যাস বুদবুদ ভেতরের বোরের দিকে চলে আসে যা পরবর্তীতে সিএনসি মেশিনিং দিয়ে পরিষ্কার করা হয়, ফলে ফোরজিং মানের নিখুঁত মাইক্রোস্ট্রাকচার পাওয়া যায়।',
    sizeLimits: 'Outside diameters from 75 mm (3 in) up to 3,000 mm (118 in); lengths up to 6,000 mm (20 ft)',
    sizeLimitsBn: 'বাইরের ব্যাস ৭৫ মিমি (৩ ইঞ্চি) থেকে ৩,০০০ মিমি (১১৮ ইঞ্চি); দৈর্ঘ্য ৬,০০০ মিমি পর্যন্ত',
    weightRange: 'Up to 22,000 kg (48,500 lbs) per single pour',
    weightRangeBn: 'একক ঢালাইয়ে ২২,০০০ কেজি (৪৮,৫০০ পাউন্ড) পর্যন্ত',
    tolerances: 'Rough machined to ±0.25 mm; finish machined to ±0.015 mm',
    tolerancesBn: 'রাফ মেশিনিং ±০.২৫ মিমি; ফিনিশ মেশিনিং ±০.০১৫ মিমি',
    typicalComponents: ['Hydro-turbine wear rings', 'Offshore drill riser liners', 'Furnace radiant coils & reformer tubes', 'Paper mill suction roll shells', 'Pump casings & high-pressure sleeves'],
    typicalComponentsBn: ['হাইড্রো-টারবাইন ওয়্যার রিংস', 'অফশোর ড্রিল রাইজার লাইনার্স', 'ফার্নেস রেডিয়েন্ট কয়েলস ও রিফর্মার টিউবস', 'কাগজ কলের সাকশন রোল শেল', 'পাম্প কেসিং ও উচ্চ-চাপের স্লিভস'],
    suitableAlloys: ['CF8M / 316 Stainless', 'HP-Nb Micro-alloyed', 'HK40 Heat Resistant', 'Inconel 625', 'Aluminum Bronze C95400'],
    industriesServed: ['Energy', 'Petrochemical', 'Turbine Engine', 'Process Equipment', 'Defense'],
  },
  {
    slug: 'sand-casting',
    title: 'Sand Casting',
    titleBn: 'স্যান্ড কাস্টিং (বালি ছাঁচ ঢালাই)',
    summary: 'Versatile, heavy-section net-shape casting for intricate and large industrial geometries.',
    summaryBn: 'জটিল এবং বৃহৎ শিল্প যন্ত্রাংশের জন্য অত্যন্ত নির্ভরযোগ্য ও টেকসই ভারী সেকশন কাস্টিং।',
    heroHeadline: 'Complex Large-Scale Castings with Robust Dimensional Repeatability',
    heroHeadlineBn: 'উচ্চ মাত্রাগত পুনরাবৃত্তির সাথে বৃহৎ ও জটিল শিল্প কাস্টিং',
    description: 'Our chemically-bonded resin sand and no-bake molding systems deliver high dimensional repeatability for complex heavy industrial geometries. Backed by computational MagmaSoft solidification simulation, we design optimal gating and risering to guarantee sound, radiographically clean metal sections.',
    descriptionBn: 'আমাদের কেমিক্যালি-বন্ডেড রেজিন স্যান্ড ও নো-বেক মোল্ডিং সিস্টেম জটিল ভারী শিল্প যন্ত্রাংশের জন্য উচ্চ ডাইমেনশনাল নির্ভুলতা নিশ্চিত করে। ম্যাগমাসফট কম্পিউটার সিমুলেশনের সহায়তায় আমরা নিখুঁত গেটিং ও রাইজার ডিজাইন করি যা সম্পূর্ণ ত্রুটিমুক্ত ধাতব উপাদান তৈরি করে।',
    sizeLimits: 'Part envelopes up to 4,500 mm × 3,800 mm × 2,200 mm',
    sizeLimitsBn: 'যন্ত্রাংশের আকার ৪,৫০০ মিমি × ৩,৮০০ মিমি × ২,২০০ মিমি পর্যন্ত',
    weightRange: '50 kg to 18,000 kg finished weight',
    weightRangeBn: '৫০ কেজি থেকে ১৮,০০০ কেজি সমাপ্ত ওজন',
    tolerances: 'Conforms to ISO 8062-3 Grade DGT8 to DGT10',
    tolerancesBn: 'ISO 8062-3 গ্রেড DGT8 থেকে DGT10 অনুযায়ী',
    typicalComponents: ['Severe service valve bodies & bonnets', 'Centrifugal slurry pump volutes', 'Marine rudder pintle brackets', 'Compressor cylinder blocks', 'Pelton runner buckets'],
    typicalComponentsBn: ['উচ্চ-চাপ ভালভ বডি ও বনেটস', 'সেন্ট্রিফিউগাল স্লাজ পাম্প ভলিউটস', 'জাহাজের রাডার পিন্টল ব্র্যাকেটস', 'কম্প্রেসার সিলিন্ডার ব্লকস', 'পেলটন রানার বাকেটস'],
    suitableAlloys: ['CA6NM Martensitic Stainless', 'CF3M Extra Low Carbon', 'Hastelloy C-276', 'High-Chrome White Iron', 'Carbon Steel WCB/WCC'],
    industriesServed: ['Petrochemical', 'Energy', 'Process Equipment', 'Marine & Shipbuilding', 'Defense'],
  },
  {
    slug: 'investment-casting',
    title: 'Investment Casting',
    titleBn: 'ইনভেস্টমেন্ট কাস্টিং (লস্ট-ওয়াক্স ঢালাই)',
    summary: 'Precision lost-wax casting for tight tolerances, intricate details, and near-net shapes.',
    summaryBn: 'সূক্ষ্ম সহনশীলতা ও জটিল আকারের জন্য প্রিসিশন লস্ট-ওয়াক্স কাস্টিং।',
    heroHeadline: 'Precision Lost-Wax Metallurgy for Complex Geometries Requiring Minimal Machining',
    heroHeadlineBn: 'ন্যূনতম মেশিনিং সুবিধাযুক্ত জটিল জ্যামিতির জন্য প্রিসিশন লস্ট-ওয়াক্স প্রযুক্তি',
    description: 'Utilizing automated multi-layer robotic ceramic shell dipping and vacuum-assisted induction pouring, our investment casting delivers exceptional surface finish (Ra 3.2 µm) and near-net shape detail in superalloys and stainless grades.',
    descriptionBn: 'স্বয়ংক্রিয় রোবোটিক সিরামিক শেল কোটিং এবং ভ্যাকুয়াম-সহায়ক ইন্ডাকশন ঢালাইয়ের মাধ্যমে আমাদের ইনভেস্টমেন্ট কাস্টিং চমৎকার সারফেস ফিনিশ (Ra 3.2 µm) এবং সুপারঅ্যালয় ও স্টেইনলেস গ্রেডের নিখুঁত আকার দেয়।',
    sizeLimits: 'Envelope up to 600 mm × 600 mm × 500 mm',
    sizeLimitsBn: 'সর্বোচ্চ আকার ৬০০ মিমি × ৬০০ মিমি × ৫০০ মিমি',
    weightRange: '0.1 kg to 65 kg',
    weightRangeBn: '০.১ কেজি থেকে ৬৫ কেজি',
    tolerances: 'Linear tolerances to ±0.13 mm per 25 mm (ISO 8062-3 DGT5/6)',
    tolerancesBn: 'প্রতি ২৫ মিমিতে ±০.১৩ মিমি পর্যন্ত রৈখিক সহনশীলতা',
    typicalComponents: ['Turbine guide vanes & nozzles', 'Aerospace brackets & fittings', 'Food-grade stainless pump impellers', 'Defense ordnance trigger housings', 'Surgical instrument blanks'],
    typicalComponentsBn: ['টারবাইন গাইড ভেন ও নজলস', 'মহাকাশযান ব্র্যাকেট ও ফিটিংস', 'ফুড-গ্রেড স্টেইনলেস পাম্প ইম্পেলার', 'প্রতিরক্ষা সমরাস্ত্র ট্রিগার হাউজিং', 'সার্জিক্যাল ইন্সট্রুমেন্ট ব্লাঙ্কস'],
    suitableAlloys: ['17-4PH Precipitation Hardening', 'M-Tek 440C Tool Steel', 'Inconel 718', 'Stellite 6 Cobalt Alloy', '316L Stainless'],
    industriesServed: ['Aerospace', 'Turbine Engine', 'Defense', 'Process Equipment'],
  },
  {
    slug: 'ingot',
    title: 'High-Integrity Ingot',
    titleBn: 'হাই-ইন্টিগ্রিটি ইনগট ও মেটালিক বার',
    summary: 'Consistently refined remelt ingots and forging stock for critical re-processing.',
    summaryBn: 'গুরুত্বপূর্ণ ফোরজিং ও রি-মেল্টিংয়ের জন্য পরিশোধিত ইনগট ও কাঁচামাল।',
    heroHeadline: 'Homogeneous Master Melts and Remelt Ingots for Critical Forgings',
    heroHeadlineBn: 'সংকটপূর্ণ ফোরজিংয়ের জন্য উচ্চ-বিশুদ্ধতার মাস্টার মেল্ট এবং ইনগট',
    description: 'Formulated with certified virgin raw materials and secondary Argon Oxygen Decarburization (AOD) refining, MetalTek supplies certified round and polygonal ingots with minimal tramp elements (S ≤ 0.005%, P ≤ 0.010%) and low dissolved hydrogen/nitrogen.',
    descriptionBn: 'সার্টিফায়েড ভার্জিন কাঁচামাল এবং এওডি (Argon Oxygen Decarburization) সেকেন্ডারি রিফাইনিং দ্বারা মেটাল টেক সরবরাহ করে অত্যন্ত কম সালফার (S ≤ 0.005%) এবং ফসফরাস (P ≤ 0.010%) সমৃদ্ধ উচ্চ বিশুদ্ধতার ইনগট।',
    sizeLimits: 'Ingot diameters from 200 mm to 900 mm; custom ingot lengths',
    sizeLimitsBn: 'ইনগট ব্যাস ২০০ মিমি থেকে ৯০০ মিমি; কাস্টম দৈর্ঘ্য',
    weightRange: '500 kg to 12,000 kg ingots',
    weightRangeBn: '৫০০ কেজি থেকে ১২,০০০ কেজি ইনগট',
    tolerances: 'Cropped and scalped as required, 100% UT tested',
    tolerancesBn: 'প্রয়োজন অনুযায়ী ক্রপড এবং ১০০% আল্ট্রাসনিক টেস্টেড',
    typicalComponents: ['Closed-die forging billets', 'Extrusion billets for tubing', 'Re-melt master stock for aerospace foundries'],
    typicalComponentsBn: ['ক্লোজড-ডাই ফোরজিং বিলেতস', 'টিউবিংয়ের জন্য এক্সট্রুশন বিলেতস', 'অ্যারোস্পেস ফাউন্ড্রির রি-মেল্ট স্টক'],
    suitableAlloys: ['Super Duplex 2507', 'Inconel 625', 'Alloy 20', 'AISI 4140 Modified', 'Nitronic 50'],
    industriesServed: ['Energy', 'Defense', 'Aerospace'],
  },
];

export const CAPABILITIES: CapabilityItem[] = [
  {
    slug: 'metallurgy-engineering',
    title: 'Metallurgy & Engineering',
    titleBn: 'মেটালার্জি ও ইঞ্জিনিয়ারিং',
    iconName: 'Microscope',
    summary: 'Integrated alloy and process expertise of more than 100 metallurgists and engineers.',
    summaryBn: '১০০ জনেরও বেশি ধাতুবিজ্ঞানী এবং প্রকৌশলীর সমন্বিত অ্যালয় ও প্রক্রিয়াগত দক্ষতা।',
    description: 'Our metallurgical team collaborates with client designers from initial material selection through solidification simulation and stress analysis, eliminating premature field failures in high-corrosion, high-heat, and high-wear environments.',
    descriptionBn: 'আমাদের ধাতুবিজ্ঞান দল প্রাথমিক উপাদান নির্বাচন থেকে শুরু করে সলিডিফিকেশন সিমুলেশন ও স্ট্রেস অ্যানালাইসিস পর্যন্ত গ্রাহক প্রকৌশলীদের সাথে কাজ করে, যা ক্ষয়কারী ও উচ্চ তাপমাত্রার ক্ষেত্রে ব্যর্থতা দূর করে।',
    equipmentHighlights: ['MagmaSoft Solidification & Mold Flow Modeling suite', 'Ansys FEA Stress & Thermal Gradient Analysis', 'Olympus Optical & SEM Metallurgical Microstructure Analyzers'],
    specifications: ['Solidification modeling for 100% shrinkage predictability', 'Phase transformation prediction', 'Custom chemistry formulation'],
    standards: ['ASTM E45', 'ASTM E112', 'NACE MR0175 / ISO 15156'],
  },
  {
    slug: 'additive-manufacturing',
    title: 'Additive Manufacturing',
    titleBn: 'অ্যাডিটিভ ম্যানুফ্যাকচারিং (৩ডি স্যান্ড প্রিন্টিং)',
    iconName: 'Cpu',
    summary: '3D printed sand molds and rapid wax patterns for prototype-to-production speed without tooling delays.',
    summaryBn: 'টুলিং বিলম্ব ছাড়া প্রোটোটাইপ থেকে দ্রুত উৎপাদনে যাওয়ার জন্য ৩ডি প্রিন্টেড বালি ছাঁচ এবং ওয়াক্স প্যাটার্ন।',
    description: 'We integrate Binder-Jet 3D sand printing and stereolithography wax printing to produce complex casting cores and molds in hours rather than weeks. Ideal for rapid prototyping, complex internal cooling channels, and low-volume legacy component replacement.',
    descriptionBn: 'আমরা বাইন্ডার-জেট ৩ডি স্যান্ড প্রিন্টিং প্রযুক্তির মাধ্যমে সপ্তাহের পরিবর্তে কয়েক ঘণ্টার মধ্যে জটিল কাস্টিং কোর ও ছাঁচ তৈরি করি। দ্রুত প্রোটোটাইপিং এবং জটিল কুলিং চ্যানেলের জন্য আদর্শ।',
    equipmentHighlights: ['ExOne S-Max Industrial Sand 3D Printer (1,800 × 1,000 × 700 mm build volume)', 'Large-format SLA wax pattern generator', 'Integrated MagmaSoft 3D additive flow verification'],
    specifications: ['Sand layer resolution: 280 µm', 'Direct pouring into printed molds without pattern drafts'],
    standards: ['ASTM B883', 'ISO/ASTM 52900'],
  },
  {
    slug: 'heat-treatment',
    title: 'Heat Treatment',
    titleBn: 'প্রিসিশন হিট ট্রিটমেন্ট (তাপ চিকিৎসা)',
    iconName: 'Flame',
    summary: 'Technical expertise to give customers the material properties that they need.',
    summaryBn: 'গ্রাহকদের চাহিদামতো ধাতব বৈশিষ্ট্য অর্জনের জন্য উন্নত প্রযুক্তিগত দক্ষতা।',
    description: 'Precise mechanical properties demand tight thermal control. Our calibrated furnaces feature automated programmable temperature controllers maintaining tight uniformity across working zones up to 1,250°C.',
    descriptionBn: 'নিখুঁত মেকানিক্যাল বৈশিষ্ট্যের জন্য সূক্ষ্ম তাপ নিয়ন্ত্রণ প্রয়োজন। আমাদের ১,২৫০°সে. পর্যন্ত ক্যালিব্রেটেড ফার্নেস স্বয়ংক্রিয় কন্ট্রোলারের মাধ্যমে সমরূপ তাপমাত্রা বজায় রাখে।',
    equipmentHighlights: ['Car-bottom gas furnaces (up to 7,000 mm length)', 'Agitated 120,000-liter rapid water quench tank with <15 sec transfer time', 'Cryogenic sub-zero stabilizing chambers (-80°C)'],
    specifications: ['Solution annealing, Solution & Aging, Quench & Temper, Stress Relieving, Normalizing'],
    standards: ['AMS 2750G (Pyrometry)', 'API 6A Appendix M', 'ASTM A380'],
  },
  {
    slug: 'metal-machining',
    title: 'Metal Machining',
    titleBn: 'মেটাল মেশিনিং (সিএনসি টার্নিং ও মিলিং)',
    iconName: 'Settings',
    summary: 'Over 200 machining centers to meet exact customer specifications.',
    summaryBn: 'গ্রাহকের নির্দিষ্ট চাহিদা পূরণের জন্য ২০০টিরও বেশি সিএনসি মেশিনিং সেন্টার।',
    description: 'Delivering finish-machined components ready for immediate assembly. We specialize in hard-to-machine nickel superalloys, cobalt alloys, and work-hardening austenitic steels across horizontal boring mills and vertical turning centers.',
    descriptionBn: 'সরাসরি অ্যাসেম্বলযোগ্য ফিনিশ-মেশিনযুক্ত যন্ত্রাংশ সরবরাহ। আমরা হরাইজন্টাল বোরিং মিল ও ভার্টিক্যাল টার্নিং সেন্টারের মাধ্যমে কঠিন নিকেল সুপারঅ্যালয় ও স্টেইনলেস স্টিল নিখুঁতভাবে মেশিনিং করি।',
    equipmentHighlights: ['Toshiba 5-Axis CNC Horizontal Boring Mills', 'Hankook CNC Vertical Turret Lathes up to 3,200 mm swing diameter', 'Okuma 4-Axis CNC Horizontal Machining Centers'],
    specifications: ['Diametrical accuracy down to 0.010 mm', 'Surface finishes to Ra 0.4 µm'],
    standards: ['ISO 2768-mK', 'ASME Y14.5 GD&T'],
  },
  {
    slug: 'metal-fabrication',
    title: 'Metal Fabrication',
    titleBn: 'মেটাল ফ্যাব্রিকেশন ও ওয়েল্ডিং',
    iconName: 'Wrench',
    summary: 'Tight-tolerance fabrication for petrochemical and other demanding markets.',
    summaryBn: 'পেট্রোকেমিক্যাল এবং অন্যান্য চাহিদাসম্পন্ন বাজারের জন্য টাইট-টলারেন্স ফ্যাব্রিকেশন।',
    description: 'Full-service fabrication qualified for ASME Boiler & Pressure Vessel construction. Our automated submerged arc weld overlay systems apply corrosion-resistant overlays (Inconel 625, Stellite) onto heavy structural substrates.',
    descriptionBn: 'ASME বয়লার ও প্রেসার ভেসেল মানের পূর্ণাঙ্গ ফ্যাব্রিকেশন সেবা। আমাদের অটোমেটেড সাবমার্জড আর্ক ওয়েল্ডিং ক্ষয়-প্রতিরোধী ওভারলে (Inconel 625, Stellite) প্রয়োগে সক্ষম।',
    equipmentHighlights: ['Automated Twin-Wire Submerged Arc Welding (SAW) boom', 'TIG, MIG, and Flux-Cored Arc Welding stations', 'Post-weld heat treatment local induction units'],
    specifications: ['ASME Sec IX certified weld procedures for over 60 alloy combinations'],
    standards: ['ASME Sec IX', 'AWS D1.1 / D1.6', 'EN ISO 15614-1'],
  },
  {
    slug: 'metal-testing-analysis',
    title: 'Metal Testing & Analysis',
    titleBn: 'মেটাল টেস্টিং ও ল্যাবরেটরি অ্যানালাইসিস',
    iconName: 'ShieldCheck',
    summary: 'Quality assurance to the strictest customer and industry standards.',
    summaryBn: 'কঠোর গ্রাহক ও আন্তর্জাতিক শিল্প মান অনুযায়ী সম্পূর্ণ গুণগত নিশ্চয়তা।',
    description: 'Full traceability and testing under one roof. We certify every melt with Mill Test Certificates (MTC) to EN 10204 Type 3.1 or independent third-party 3.2 inspection.',
    descriptionBn: 'একই ছাদের নিচে সম্পূর্ণ ট্র্যাসিবিলিটি ও ল্যাব টেস্টিং। আমরা প্রতিটি ধাতব ব্যাচকে EN 10204 টাইপ ৩.১ মিল টেস্ট সার্টিফিকেট এবং ৩.২ পরিদর্শন দ্বারা প্রত্যয়ন করি।',
    equipmentHighlights: ['Thermo Scientific Optical Emission Spectrometers (OES)', 'LECO Carbon & Sulfur Determinators', 'Computerized Tensile Testers with Extensometer', 'Charpy V-Notch Impact Rig with liquid nitrogen bath down to -196°C', 'ASNT Level III Radiographic (X-Ray / Gamma), Ultrasonic, Magnetic Particle & Dye Penetrant testing'],
    specifications: ['100% melt chemistry verification before pouring', 'Cryogenic impact verification for LNG service'],
    standards: ['ISO/IEC 17025', 'ASTM E8/E8M', 'ASTM E23', 'ASTM E165', 'ASTM E709'],
  },
  {
    slug: 'training',
    title: 'TekSession Training',
    titleBn: 'টেকসেশন টেকনিক্যাল ট্রেনিং',
    iconName: 'GraduationCap',
    summary: 'Proprietary training on alloy selection, casting processes, and component design.',
    summaryBn: 'অ্যালয় নির্বাচন, কাস্টিং প্রক্রিয়া এবং উপাদান ডিজাইনের ওপর বিশেষায়িত ইঞ্জিনিয়ারিং প্রশিক্ষণ।',
    description: 'Our proprietary TekSession program offers structured in-person and virtual engineering workshops covering alloy selection, defect prevention, casting process trade-offs, and cost-reduction design practices.',
    descriptionBn: 'আমাদের টেকসেশন প্রোগ্রাম অ্যালয় নির্বাচন, ডিফেক্ট প্রতিরোধ এবং সাশ্রয়ী ডিজাইনের ওপর পেশাদার ওয়ার্কশপ প্রদান করে।',
    equipmentHighlights: ['Dedicated Technical Training Centers', 'Interactive foundry virtual tour & metallurgical failure case analysis library'],
    specifications: ['Earn Professional Development Hours (PDH)', 'Customized sessions for OEM design engineering teams'],
    standards: ['ASME & ASM International continuing education syllabus'],
  },
];

export const MARKET_SOLUTIONS: MarketItem[] = [
  {
    slug: 'railway',
    categoryTag: 'Railway',
    categoryTagBn: 'রেলওয়ে খাত',
    title: 'Locomotives and wagons',
    titleBn: 'লোকোমোটিভ ও ওয়াগন যন্ত্রাংশ',
    summary: 'Brake blocks, axle box housings and cast bogie parts.',
    summaryBn: 'ব্রেক ব্লক, এক্সেল বক্স হাউজিং এবং কাস্ট বগি যন্ত্রাংশ।',
    challenges: 'Severe cyclic mechanical impact, dynamic fatigue, high-temperature friction wear, and intense rail vibrations under heavy axle loads.',
    challengesBn: 'ভারী এক্সেল লোডের নিচে তীব্র মেকানিক্যাল ইমপ্যাক্ট, ডায়নামিক ফ্যাটিগ, উচ্চ তাপমাত্রার ঘর্ষণ ক্ষয় এবং রেল ভাইব্রেশন।',
    solutions: 'Impact-resistant spheroidal graphite cast iron, high-manganese cast steel, and precision-machined axle box assemblies engineered for zero brittle fracture.',
    solutionsBn: 'ঘাত-সহনশীল নমনীয় ডাক্টাইল আয়রন, উচ্চ-ম্যাঙ্গানিজ স্টিল এবং শূন্য-ভাঙন নিশ্চয়তাসম্পন্ন সিএনসি প্রিসিশন এক্সেল বক্স।',
    componentsSupplied: [
      'High-friction railway brake blocks',
      'Locomotive axle box housings',
      'Cast bogie side frames & bolsters',
      'Center pivots & side bearer assemblies',
      'Draft gear housings & railway couplers',
    ],
    recommendedAlloys: [
      'Ductile Iron EN-GJS-500-7',
      'Austenitic Manganese Steel (Hadfield Steel)',
      'Cast Carbon Steel WCB / WCC',
      'Pearlitic Grey Iron EN-GJL-250',
    ],
    salesContactMarketSlug: 'railway',
  },
  {
    slug: 'navy-marine',
    categoryTag: 'Navy and marine',
    categoryTagBn: 'নৌ ও সামুদ্রিক খাত',
    title: 'Ship and vessel components',
    titleBn: 'জাহাজ ও সামুদ্রিক নৌযান উপাদান',
    summary: 'Bronze and aluminium bronze propellers, pump housings, valve bodies and deck fittings.',
    summaryBn: 'ব্রোঞ্জ ও অ্যালুমিনিয়াম ব্রোঞ্জ প্রপেলার, পাম্প হাউজিং, ভালভ বডি ও ডেক ফিটিংস।',
    challenges: 'Aggressive saltwater galvanic corrosion, cavitation erosion on hydrodynamic surfaces, bio-fouling, and strict naval shock survivability standards.',
    challengesBn: 'লবণাক্ত পানির ক্ষয়, ক্যাভিটেশন ইরোশন, সামুদ্রিক শ্যাওলা আক্রমণ এবং কঠোর নেভাল শক স্ট্যান্ডার্ড।',
    solutions: 'Demagnetized high-strength nickel aluminium bronze (NAB) casting, duplex stainless steels, and centrifugal stern-tube bearing liners certified by marine classification societies.',
    solutionsBn: 'উচ্চ-শক্তির নিকেল অ্যালুমিনিয়াম ব্রোঞ্জ (NAB) কাস্টিং, ডুপ্লেক্স স্টেইনলেস স্টিল এবং মেরিন ক্লাসিফিকেশন অনুমোদিত সেন্ট্রিফিউগাল স্টার্ন টিউব লাইনার।',
    componentsSupplied: [
      'Bronze & aluminium bronze vessel propellers',
      'High-volume seawater cooling pump housings',
      'Corrosion-resistant marine valve bodies',
      'Heavy-duty deck fittings, cleats & hawse pipes',
      'Centrifugally cast stern tube & rudder pintle bushes',
    ],
    recommendedAlloys: [
      'Nickel Aluminium Bronze C95800',
      'Aluminium Bronze C95400',
      'Super Duplex Stainless 2507',
      'Monel 400',
      'Marine Gunmetal LG2',
    ],
    salesContactMarketSlug: 'navy-marine',
  },
  {
    slug: 'heavy-vehicles',
    categoryTag: 'Heavy vehicles',
    categoryTagBn: 'ভারী বাণিজ্যিক যানবাহন',
    title: 'Truck and bus brake systems',
    titleBn: 'ট্রাক ও বাস ব্রেক সিস্টেম',
    summary: 'Brake drums, discs, shoes and flywheels in grey cast iron.',
    summaryBn: 'গ্রে কাস্ট আয়রনের উচ্চ-মানের ব্রেক ড্রাম, ডিস্ক, শু এবং ফ্লাইহুইল।',
    challenges: 'Extreme thermal cyclic shock, heat fade, micro-craze thermal cracking, and torsional stress across commercial bus, coach, and haulage duty cycles.',
    challengesBn: 'চরম থার্মাল সাইক্লিক শক, তাপ অপচয়, মাইক্রো-থার্মাল ক্র্যাকিং এবং টরশনাল স্ট্রেস।',
    solutions: 'High-thermal-conductivity lamellar grey iron with controlled pearlitic matrix, uniform graphite distribution, and precision CNC balance with tight dynamic runout.',
    solutionsBn: 'উচ্চ তাপ পরিবাহী ল্যামেলার গ্রে আয়রন যা পার্লিটিক ম্যাট্রিক্স ও সুষম গ্রাফাইট বিন্যাসের মাধ্যমে নিখুঁত ব্রেকিং প্রদান করে।',
    componentsSupplied: [
      'Heavy commercial truck brake drums',
      'Ventilated bus & coach brake discs',
      'Cast brake shoes & backing cores',
      'Heavy engine flywheels & clutch pressure plates',
      'Drive axle wheel hub castings',
    ],
    recommendedAlloys: [
      'Grey Cast Iron EN-GJL-250 / Grade 35',
      'High-Carbon Grey Iron EN-GJL-300',
      'Austempered Ductile Iron (ADI)',
      'Ductile Iron 65-45-12 / EN-GJS-450-10',
    ],
    salesContactMarketSlug: 'heavy-vehicles',
  },
  {
    slug: 'industry',
    categoryTag: 'Industry',
    categoryTagBn: 'শিল্প খাত',
    title: 'Pumps, valves and machine parts',
    titleBn: 'পাম্প, ভালভ ও ভারী যন্ত্রাংশ',
    summary: 'Custom castings from drawing to delivery.',
    summaryBn: 'ইঞ্জিনিয়ারিং ড্রয়িং থেকে সরাসরি ডেলিভারি পর্যন্ত কাস্টম কাস্টিং।',
    challenges: 'Intricate internal hydraulic passages, abrasive industrial slurries, high-pressure boundary integrity, and tight CNC machining tolerances on critical mating surfaces.',
    challengesBn: 'জটিল অভ্যন্তরীণ হাইড্রোলিক প্যাসেজ, ক্ষয়কারী স্লারি, উচ্চ চাপের সীমানা অখণ্ডতা এবং অত্যন্ত সংবেদনশীল সিএনসি টলারেন্স।',
    solutions: 'Integrated MagmaSoft computational solidification simulation, chemically bonded no-bake sand & investment casting, 5-axis CNC machining, and 100% hydrostatic and MTC 3.1 inspection.',
    solutionsBn: 'ম্যাগমাসফট সিমুলেশন, কেমিক্যালি বন্ডেড নো-বেক ও ইনভেস্টমেন্ট কাস্টিং, ৫-অ্যাক্সিস সিএনসি মেশিনিং এবং ১০০% হাইড্রোস্ট্যাটিক টেস্ট।',
    componentsSupplied: [
      'Industrial centrifugal pump volutes & impellers',
      'High-pressure gate, globe & ball valve bodies',
      'Precision machine gear blanks & drive shafts',
      'Heavy compressor cylinder heads & crankcases',
      'Turnkey custom castings engineered from drawing to delivery',
    ],
    recommendedAlloys: [
      'CF8M / 316 Stainless Steel',
      'Duplex Stainless 2205',
      'High-Chromium White Iron (28% Cr)',
      'Cast Carbon Steel LCC / WCB',
      'Ductile Iron EN-GJS-400-15',
    ],
    salesContactMarketSlug: 'industry',
  },
];

export const SALES_CONTACTS: SalesContact[] = [
  {
    id: 'sc-1',
    marketSlug: 'railway',
    marketName: 'Railway (Locomotives & Wagons)',
    name: 'Engr. Tanvir Ahmed',
    role: 'Senior Key Account Manager - Railway Systems',
    phone: '+880 2 9884521 ext 210',
    email: 'railway@metaltechbd.com',
    territory: 'National & Regional Railway Engineering Programs',
    experience: '18+ years in rolling stock bogie casting, brake block metallurgy, and EN-GJS ductile iron specification.',
  },
  {
    id: 'sc-2',
    marketSlug: 'navy-marine',
    marketName: 'Navy & Marine (Ship & Vessel Components)',
    name: 'Cdr. (Ret.) Ashraf Uddin',
    role: 'Director - Naval Marine & Vessel Defense',
    phone: '+880 2 9884521 ext 220',
    email: 'marine@metaltechbd.com',
    territory: 'Naval Shipyards, Marine EPCs & Port Authorities',
    experience: 'Specializing in nickel aluminium bronze (NAB) propellers, cavitation erosion resistance, and marine classification.',
  },
  {
    id: 'sc-3',
    marketSlug: 'heavy-vehicles',
    marketName: 'Heavy Vehicles (Truck & Bus Brake Systems)',
    name: 'Rafiqul Haque',
    role: 'Technical Account Manager - Commercial Vehicles',
    phone: '+880 2 9884521 ext 215',
    email: 'heavyvehicles@metaltechbd.com',
    territory: 'Commercial Transport OEMs & Fleet Engineering',
    experience: 'Leading high-thermal grey iron formulation for brake drums, rotors, discs, and engine flywheels.',
  },
  {
    id: 'sc-4',
    marketSlug: 'industry',
    marketName: 'Industry (Pumps, Valves & Machine Parts)',
    name: 'Dr. Shahabuddin Malik',
    role: 'Head of Industrial Equipment Engineering',
    phone: '+880 2 9884521 ext 230',
    email: 'industry@metaltechbd.com',
    territory: 'Heavy Machinery, Chemical, Slurry & Process OEMs',
    experience: 'Expert in custom pattern-to-finished component delivery, stainless casting simulation, and 5-axis CNC finishing.',
  },
];

export const DIVISIONS: DivisionItem[] = [
  {
    slug: 'carondelet',
    name: 'Carondelet',
    location: 'Pevely, Missouri, USA',
    area: '150,000+ sq ft facility',
    specialties: 'High-alloy sand castings, heat-resistant and corrosion-resistant alloys, severe wear and erosion components.',
    equipment: ['Induction melting furnaces up to 10,000 lbs', 'Chemically bonded no-bake sand lines', 'Complete heat treating and on-site machine shop', 'Full NDT and metallurgical lab'],
    phone: '+1-636-479-4499',
    email: 'carondelet@metaltek.com',
  },
  {
    slug: 'sandusky-international',
    name: 'Sandusky International',
    location: 'Sandusky, Ohio, USA',
    area: '250,000+ sq ft facility',
    specialties: 'Large centrifugal castings, papermaking suction roll shells, marine propulsion sleeves, and heavy industrial cylinders.',
    equipment: ['World-class horizontal centrifugal casters up to 60 in OD & 400 in length', 'Deep-hole gun drilling and precision roll grinding', 'Large-diameter vertical turning mills', 'ASME Section VIII vessel welding'],
    phone: '+1-419-626-5340',
    email: 'sandusky@metaltek.com',
  },
  {
    slug: 'wisconsin-centrifugal',
    name: 'Wisconsin Centrifugal',
    location: 'Waukesha, Wisconsin, USA',
    area: '300,000+ sq ft world headquarters & complex',
    specialties: 'Industry leader in centrifugal casting in nickel, cobalt, copper, and stainless alloys. Over 200 CNC machining centers.',
    equipment: ['Horizontal and vertical centrifugal casting machines', 'Argon Oxygen Decarburization (AOD) refining', 'Over 200 CNC vertical turret lathes and horizontal boring mills', 'Comprehensive Nadcap accredited heat treat & NDT labs'],
    phone: '+1-262-544-7777',
    email: 'wisconsin.centrifugal@metaltek.com',
  },
  {
    slug: 'wisconsin-investcast',
    name: 'Wisconsin Investcast',
    location: 'Watertown, Wisconsin, USA',
    area: '100,000+ sq ft investment casting facility',
    specialties: 'Precision lost-wax investment casting for aerospace, defense, energy, and medical markets.',
    equipment: ['Robotic ceramic shell dipping systems', 'Vacuum induction melting (VIM) furnaces for superalloys', 'Rapid wax 3D pattern prototyping', 'In-house digital radiography & Level III inspection'],
    phone: '+1-920-261-9595',
    email: 'wisconsin.investcast@metaltek.com',
  },
  {
    slug: 'oil-systems',
    name: 'Oil Systems',
    location: 'Houston, Texas, USA / Global',
    area: 'Integrated engineering & supply operations',
    specialties: 'Specialized tubular components, riser liners, drill string components, and subsea severe-service flowline solutions.',
    equipment: ['High-alloy centrifugal lining and bi-metallic bonding', 'Full length deep-hole boring and honing', 'Cladding and weld overlay stations', 'API 6A / 17D verification testing'],
    phone: '+1-713-937-6700',
    email: 'oil.systems@metaltek.com',
  },
];

export const ALLOY_DATABASE: Alloy[] = [
  {
    id: 'alloy-cf8m',
    slug: 'stainless-cf8m-316',
    name: 'CF8M (Cast 316 Stainless)',
    family: 'Stainless Steel',
    castUNS: 'J92900',
    castGrade: 'CF8M',
    castASTM: 'ASTM A351 / A743 / A744',
    equivalentDIN: '1.4408 (GX5CrNiMo19-11-2)',
    wroughtEquiv: 'AISI 316',
    description: 'The standard molybdenum-bearing austenitic stainless casting alloy. Delivers exceptional resistance to pitting and crevice corrosion in chloride and marine environments.',
    composition: [
      { element: 'Carbon (C)', max: 0.08 },
      { element: 'Chromium (Cr)', min: 18.0, max: 21.0 },
      { element: 'Nickel (Ni)', min: 9.0, max: 12.0 },
      { element: 'Molybdenum (Mo)', min: 2.0, max: 3.0 },
      { element: 'Manganese (Mn)', max: 1.5 },
      { element: 'Silicon (Si)', max: 1.5 },
      { element: 'Iron (Fe)', typical: 'Balance' },
    ],
    mechanical: {
      tensileStrengthMpa: 485,
      yieldStrengthMpa: 205,
      elongationPct: 30,
      hardnessHB: 160,
      condition: 'Water Quenched from 1040°C min.',
    },
    suitableProcesses: ['Centrifugal Casting', 'Sand Casting', 'Investment Casting'],
    applications: ['Severe service valve bodies & bonnets', 'Marine pump impellers', 'Chemical process piping', 'Food handling equipment'],
    keyAttributes: ['Excellent general corrosion resistance', 'High toughness down to -196°C', 'Superior weldability with low ferrite control'],
  },
  {
    id: 'alloy-cf3m',
    slug: 'stainless-cf3m-316l',
    name: 'CF3M (Cast 316L Extra-Low Carbon)',
    family: 'Stainless Steel',
    castUNS: 'J92800',
    castGrade: 'CF3M',
    castASTM: 'ASTM A351 / A743',
    equivalentDIN: '1.4409 (GX2CrNiMo19-11-2)',
    wroughtEquiv: 'AISI 316L',
    description: 'Extra-low carbon version of CF8M. Eliminates chromium carbide precipitation during welding, providing peak resistance to intergranular corrosion in as-welded assemblies.',
    composition: [
      { element: 'Carbon (C)', max: 0.03 },
      { element: 'Chromium (Cr)', min: 17.0, max: 21.0 },
      { element: 'Nickel (Ni)', min: 9.0, max: 13.0 },
      { element: 'Molybdenum (Mo)', min: 2.0, max: 3.0 },
      { element: 'Silicon (Si)', max: 1.5 },
      { element: 'Iron (Fe)', typical: 'Balance' },
    ],
    mechanical: {
      tensileStrengthMpa: 485,
      yieldStrengthMpa: 205,
      elongationPct: 30,
      hardnessHB: 155,
      condition: 'Solution Annealed & Water Quenched',
    },
    suitableProcesses: ['Centrifugal Casting', 'Sand Casting', 'Investment Casting'],
    applications: ['Pharmaceutical reactors', 'High-purity chemical valves', 'Offshore seawater injection flanges', 'Fertilizer production nozzles'],
    keyAttributes: ['Intergranular corrosion immune', 'No post-weld heat treatment needed', 'Exceptional cryogenic ductility'],
  },
  {
    id: 'alloy-inconel625',
    slug: 'nickel-superalloy-625',
    name: 'M-Tek 625 (Alloy 625 / CW6MC)',
    family: 'Nickel-Base Superalloy',
    castUNS: 'N26625',
    castGrade: 'CW6MC',
    castASTM: 'ASTM A494',
    equivalentDIN: '2.4856 (NiCr22Mo9Nb)',
    wroughtEquiv: 'Inconel 625',
    description: 'High-strength nickel-chromium-molybdenum alloy with niobium addition. High resistance to pitting, crevice corrosion, and chloride stress cracking from cryogenic up to 980°C.',
    composition: [
      { element: 'Nickel (Ni)', min: 58.0 },
      { element: 'Chromium (Cr)', min: 20.0, max: 23.0 },
      { element: 'Molybdenum (Mo)', min: 8.0, max: 10.0 },
      { element: 'Niobium (Nb)', min: 3.15, max: 4.15 },
      { element: 'Iron (Fe)', max: 5.0 },
      { element: 'Carbon (C)', max: 0.06 },
    ],
    mechanical: {
      tensileStrengthMpa: 690,
      yieldStrengthMpa: 345,
      elongationPct: 25,
      hardnessHB: 220,
      condition: 'Solution Treated',
    },
    suitableProcesses: ['Centrifugal Casting', 'Investment Casting', 'Sand Casting'],
    applications: ['Subsea choke valve trims', 'Aerospace gas turbine exhaust ducting', 'Sour gas flare tips', 'Chemical scrubber spray nozzles'],
    keyAttributes: ['Virtually immune to chloride stress cracking', 'High fatigue & thermal fatigue strength', 'No grain boundary sensitization'],
  },
  {
    id: 'alloy-ca6nm',
    slug: 'martensitic-ca6nm',
    name: 'CA6NM (13Cr-4Ni Martensitic)',
    family: 'Stainless Steel',
    castUNS: 'J91540',
    castGrade: 'CA6NM',
    castASTM: 'ASTM A743 / A487 Class A',
    equivalentDIN: '1.4313 (GX4CrNi13-4)',
    wroughtEquiv: 'F6NM',
    description: 'Hardened martensitic stainless steel with added nickel to suppress delta ferrite and maximize impact toughness and cavitation erosion resistance.',
    composition: [
      { element: 'Carbon (C)', max: 0.06 },
      { element: 'Chromium (Cr)', min: 11.5, max: 14.0 },
      { element: 'Nickel (Ni)', min: 3.5, max: 4.5 },
      { element: 'Molybdenum (Mo)', min: 0.4, max: 1.0 },
      { element: 'Iron (Fe)', typical: 'Balance' },
    ],
    mechanical: {
      tensileStrengthMpa: 755,
      yieldStrengthMpa: 550,
      elongationPct: 15,
      hardnessHB: 255,
      condition: 'Normalized & Double Tempered',
    },
    suitableProcesses: ['Sand Casting', 'Centrifugal Casting'],
    applications: ['Hydroelectric turbine Francis runners', 'Kaplan turbine blades', 'High-pressure boiler feed pumps', 'Steam valve internals'],
    keyAttributes: ['Exceptional cavitation wear resistance', 'High yield strength under heavy hydraulic loads', 'Superior weld repairability compared to 410'],
  },
  {
    id: 'alloy-stellite6',
    slug: 'cobalt-stellite-6',
    name: 'Stellite 6 Equiv (Cobalt-Base Hardfacing & Cast)',
    family: 'Cobalt-Base',
    castUNS: 'R30006',
    castGrade: 'Alloy 6',
    castASTM: 'AWS A5.13 RCoCr-A',
    equivalentDIN: '2.4964',
    wroughtEquiv: 'Stellite 6',
    description: 'The industry-standard cobalt-base alloy for resisting extreme wear, galling, cavitation, and thermal shock while maintaining high hardness above 500°C.',
    composition: [
      { element: 'Cobalt (Co)', typical: 'Balance (~60%)' },
      { element: 'Chromium (Cr)', min: 27.0, max: 32.0 },
      { element: 'Tungsten (W)', min: 4.0, max: 6.0 },
      { element: 'Carbon (C)', min: 0.9, max: 1.4 },
      { element: 'Iron (Fe)', max: 3.0 },
    ],
    mechanical: {
      tensileStrengthMpa: 895,
      yieldStrengthMpa: 650,
      elongationPct: 2,
      hardnessHB: '40 - 45 HRC',
      condition: 'As-Cast / Stress Relieved',
    },
    suitableProcesses: ['Investment Casting', 'Centrifugal Casting'],
    applications: ['Steam turbine valve seats', 'Fluid catalytic cracking slide valves', 'Hot shear extrusion blades', 'Bearing sleeves in molten zinc'],
    keyAttributes: ['Red hardness up to 600°C', 'High resistance to metal-to-metal galling', 'Corrosion-erosion synergy resistance'],
  },
  {
    id: 'alloy-hp45nb',
    slug: 'heat-resistant-hp-nb',
    name: 'HP-Nb Micro-alloyed (25Cr-35Ni-Nb)',
    family: 'Wear-Resistant',
    castUNS: 'N08705',
    castGrade: 'HP-45Nb Mod',
    castASTM: 'ASTM A297 / A608',
    equivalentDIN: '1.4852 (GX40NiCrSiNb35-25)',
    wroughtEquiv: 'Cast Special',
    description: 'High-alloy modified heat-resistant steel with niobium and titanium micro-additions. Provides supreme creep rupture strength at furnace temperatures up to 1,150°C.',
    composition: [
      { element: 'Nickel (Ni)', min: 33.0, max: 37.0 },
      { element: 'Chromium (Cr)', min: 24.0, max: 27.0 },
      { element: 'Carbon (C)', min: 0.40, max: 0.48 },
      { element: 'Niobium (Nb)', min: 0.8, max: 1.5 },
      { element: 'Silicon (Si)', min: 1.2, max: 1.8 },
      { element: 'Iron (Fe)', typical: 'Balance' },
    ],
    mechanical: {
      tensileStrengthMpa: 550,
      yieldStrengthMpa: 260,
      elongationPct: 8,
      hardnessHB: 195,
      condition: 'As-Cast (Optimum Creep Life)',
    },
    suitableProcesses: ['Centrifugal Casting', 'Sand Casting'],
    applications: ['Ethylene cracking reformer tubes', 'Methanol synthesis furnace coils', 'Direct reduction iron (DRI) feed pipes', 'Radiant heater tubes'],
    keyAttributes: ['Supreme 1,000°C+ creep rupture strength', 'High carburization resistance', 'Thermal shock cycling stability'],
  },
  {
    id: 'alloy-superduplex2507',
    slug: 'super-duplex-2507-ce3mn',
    name: 'Super Duplex 2507 (CE3MN / 25Cr)',
    family: 'Stainless Steel',
    castUNS: 'J93404',
    castGrade: 'CE3MN',
    castASTM: 'ASTM A890 / A995 Grade 5A',
    equivalentDIN: '1.4469 (GX2CrNiMoN26-7-4)',
    wroughtEquiv: 'UNS S32750',
    description: '50/50 austenitic-ferritic microstructure with PREN > 42. Yields double the mechanical strength of standard 316 stainless and near immunity to pitting in hot seawater.',
    composition: [
      { element: 'Chromium (Cr)', min: 24.0, max: 26.0 },
      { element: 'Nickel (Ni)', min: 6.0, max: 8.0 },
      { element: 'Molybdenum (Mo)', min: 4.0, max: 5.0 },
      { element: 'Nitrogen (N)', min: 0.20, max: 0.30 },
      { element: 'Carbon (C)', max: 0.03 },
    ],
    mechanical: {
      tensileStrengthMpa: 690,
      yieldStrengthMpa: 515,
      elongationPct: 18,
      hardnessHB: 250,
      condition: 'Solution Annealed (1,120°C) & Water Quenched',
    },
    suitableProcesses: ['Centrifugal Casting', 'Sand Casting'],
    applications: ['Seawater reverse osmosis (SWRO) high-pressure pumps', 'Offshore firewater deluge valves', 'Flue gas desulfurization (FGD) agitators'],
    keyAttributes: ['PREN ≥ 42 pitting resistance', 'High yield strength allows lighter wall thicknesses', 'Superior erosion-corrosion velocity thresholds'],
  },
  {
    id: 'alloy-c95400',
    slug: 'aluminum-bronze-c95400',
    name: 'Aluminum Bronze (C95400 / 9C)',
    family: 'Copper-Base & Bronze',
    castUNS: 'C95400',
    castGrade: 'Alloy 9C',
    castASTM: 'ASTM B148 / B271 / B505',
    equivalentDIN: '2.0975 (CuAl10Fe5Ni5)',
    wroughtEquiv: 'C63000',
    description: 'Premier heavy-duty copper-base casting alloy. Combines high tensile strength comparable to medium carbon steel with great bearing wear and seawater bio-fouling resistance.',
    composition: [
      { element: 'Copper (Cu)', min: 83.0 },
      { element: 'Aluminum (Al)', min: 10.0, max: 11.5 },
      { element: 'Iron (Fe)', min: 3.0, max: 5.0 },
      { element: 'Nickel (Ni)', max: 1.5 },
    ],
    mechanical: {
      tensileStrengthMpa: 585,
      yieldStrengthMpa: 220,
      elongationPct: 12,
      hardnessHB: 170,
      condition: 'Heat Treated (TQ60) or As-Cast',
    },
    suitableProcesses: ['Centrifugal Casting', 'Sand Casting'],
    applications: ['Marine propulsion stern tube bearings', 'Worm gears & high-load wear plates', 'Pickling tank hooks', 'Steel mill screw-down nuts'],
    keyAttributes: ['Non-sparking for explosive zones', 'Natural resistance to marine barnacle adhesion', 'Self-repairing aluminum oxide surface film'],
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'nuclear-smr-coolant-casings',
    title: 'Nuclear-Grade Micro-Alloyed Casings for Small Modular Reactors (SMR)',
    clientIndustry: 'Nuclear Power Generation',
    challenge: 'A global SMR designer required zero-porosity, high-fracture-toughness primary coolant pump casings operating continuously at 320°C and 15.5 MPa without field inspection access for 10-year intervals.',
    solution: 'MetalTek executed secondary AOD metallurgical refining to achieve carbon ≤ 0.022% and cobalt ≤ 0.05%, paired with vertical centrifugal casting and 100% volumetric radiographic inspection to ASME Section III Class 1 standards.',
    results: ['100% pass rate on ASME Level 1 Radiography', 'Impact energy exceeded 180 Joules at -40°C', 'Component delivery 6 weeks ahead of international procurement baseline'],
    alloysUsed: 'CF3M Nuclear Grade (Cast 316L Modified)',
    process: 'Centrifugal Casting + AOD Secondary Refining',
  },
  {
    slug: 'deepwater-subsea-choke-valves',
    title: 'High-Pressure Subsea Choke Valve Bodies for Severe Sour Gas',
    clientIndustry: 'Petrochemical & Offshore Oil & Gas',
    challenge: 'Offshore operator encountered rapid pitting failure on competitor valve casings exposed to 10,000 PSI sour crude containing 12% H2S and 35,000 ppm chlorides.',
    solution: 'Engineered a monolithic sand-cast Super Duplex CE3MN (UNS J93404) valve body with computer-modeled gating to prevent hot-tearing. Full solution annealing at 1,120°C with automated 12-second water tank transfer ensured precise 50/50 phase balance.',
    results: ['Zero pitting or stress corrosion cracking after 36 months subsea', 'Replaced expensive welded forging construction, saving 38% component cost', 'Full NACE MR0175 / ISO 15156 hardness compliance (<28 HRC) verified'],
    alloysUsed: 'Super Duplex CE3MN (25Cr Grade 5A)',
    process: 'Chemically Bonded Sand Casting + 5-Axis CNC Machining',
  },
  {
    slug: 'cement-clinker-cooler-grates',
    title: 'Extended-Life Clinker Cooler Grate Plates for High-Abrasion Cement Kilns',
    clientIndustry: 'Process Equipment & Cement Manufacturing',
    challenge: 'Heavy industrial plant experienced unscheduled shutdowns every 4 months due to thermal cracking and clinker clumping on standard heat-resistant grates operating at 950°C under abrasive sliding clinker.',
    solution: 'Supplied precision investment-cast grate plates in proprietary HP-45Nb modified alloy with titanium grain-refiners, providing 4× higher creep resistance and zero hot distortion.',
    results: ['Continuous operational run extended from 4 to 18 months', 'Prevented an estimated $420,000 in unscheduled downtime', 'Contract expanded across 6 regional production lines'],
    alloysUsed: 'HP-45Nb Mod Heat-Resistant Superalloy',
    process: 'Precision Investment Casting',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'nuclear-metal-castings-smrs-microreactors',
    title: 'Nuclear Metal Castings for Small Modular Reactors and Microreactors',
    titleBn: 'স্মল মডুলার রিঅ্যাক্টর (এসএমআর) এবং মাইক্রোরিঅ্যাক্টরের জন্য পারমাণবিক ধাতু ঢালাই',
    date: 'September 22, 2026',
    author: 'MetalTek Engineering Team',
    readTime: '6 min read',
    excerpt: 'Rising global energy demand is giving new attention to nuclear energy as a dependable, carbon-free source of baseload power.',
    excerptBn: 'ক্রমবর্ধমান বৈশ্বিক জ্বালানি চাহিদা নির্ভরযোগ্য ও কার্বনমুক্ত বেসলোড শক্তির উৎস হিসেবে পারমাণবিক শক্তির দিকে নতুন দৃষ্টি আকর্ষণ করছে।',
    content: [
      'Rising global energy demand is giving new attention to nuclear energy as a dependable, carbon-free source of baseload power. As clean energy mandates push baseload generation toward next-generation Small Modular Reactors (SMRs) and microreactors, structural metallurgists face unprecedented demands for material integrity and long-life reliability.',
      'Centrifugal casting technology has emerged as a proven method for cylindrical SMR pressure boundaries, primary coolant pump barrels, and penetration sleeves. By spinning molds at rotational speeds producing intense centrifugal force, the liquid alloy is subjected to extreme pressure that drives directional solidification.',
      'This gravitational pressure forces lighter non-metallic inclusions, dissolved gases, and oxides inward toward the inner bore. Once cooled, the inner diameter is cleanly machined away by CNC turning, leaving a dense, isotropic cylinder exhibiting mechanical properties that rival forged equivalents in all three planes.',
      'When combined with secondary Argon Oxygen Decarburization (AOD), carbon levels can be maintained consistently below 0.020%, and trace residual cobalt is limited to strict nuclear thresholds, minimizing long-term radioactive activation during the plant’s operating lifetime.',
    ],
    contentBn: [
      'ক্রমবর্ধমান বৈশ্বিক জ্বালানি চাহিদা নির্ভরযোগ্য ও কার্বনমুক্ত বেসলোড শক্তির উৎস হিসেবে পারমাণবিক শক্তির দিকে নতুন দৃষ্টি আকর্ষণ করছে। পরিবেশবান্ধব জ্বালানি নীতি যখন পরবর্তী প্রজন্মের স্মল মডুলার রিঅ্যাক্টর (এসএমআর) এবং মাইক্রোরিঅ্যাক্টরের দিকে অগ্রসর হচ্ছে, তখন কাঠামোগত ধাতুবিদরা উপাদানের নির্ভরযোগ্যতা ও দীর্ঘস্থায়িত্ব নিশ্চিতকরণে নজিরবিহীন চ্যালেঞ্জের মুখোমুখি হচ্ছেন।',
      'সেন্ট্রিফিউগাল কাস্টিং প্রযুক্তি বেলনাকার এসএমআর প্রেসার বাউন্ডারি, প্রাইমারি কুল্যান্ট পাম্প ব্যারেল এবং পেনিট্রেশন স্লিভের জন্য একটি প্রমাণিত পদ্ধতি হিসেবে প্রতিষ্ঠিত হয়েছে। উচ্চ ঘূর্ণন গতিতে ছাঁচ ঘোরানোর মাধ্যমে উৎপন্ন তীব্র সেন্ট্রিফিউগাল বলের প্রভাবে গলিত ধাতু অত্যন্ত উচ্চ চাপে দিকনির্দেশিত ঘনীভবন লাভ করে।',
      'এই মাধ্যাকর্ষণ বল তুলনামূলক হালকা নন-মেটালিক অপদ্রব্য, দ্রবীভূত গ্যাস ও অক্সাইডকে ভেতরের বোরের দিকে ঠেলে দেয়। শীতল হওয়ার পর ভেতরের ব্যাসটি নিখুঁতভাবে সিএনসি টার্নিংয়ের মাধ্যমে কেটে ফেলা হয়, ফলে একটি ঘন ও সমসত্ব সিলিন্ডার অবশিষ্ট থাকে যার যান্ত্রিক বৈশিষ্ট্য ফোরজিংয়ের সাথে তুলনীয়।',
      'সেকেন্ডারি আর্গন অক্সিজেন ডিকার্বুরাইজেশন (এওডি) প্রক্রিয়ার সমন্বয়ে কার্বনের মাত্রা ০.০২০% এর নিচে বজায় রাখা সম্ভব হয় এবং অবশিষ্ট কোবাল্টের পরিমাণ কঠোর পারমাণবিক মানদণ্ডে সীমাবদ্ধ থাকে, যা চুল্লির কার্যকালীন দীর্ঘমেয়াদী তেজস্ক্রিয় সক্রিয়করণ হ্রাস করে।',
    ],
    category: 'Nuclear & Energy',
    categoryBn: 'পারমাণবিক ও শক্তি খাত',
  },
  {
    slug: 'metaltek-names-david-bacon-ceo',
    title: 'MetalTek Names David Bacon CEO',
    titleBn: 'মেটালটেক ডেভিড বেকনকে নতুন প্রধান নির্বাহী কর্মকর্তা (সিইও) হিসেবে ঘোষণা করেছে',
    date: 'August 10, 2026',
    author: 'Corporate Communications',
    readTime: '4 min read',
    excerpt: 'David Bacon, Chief Executive Officer, MetalTek International. MetalTek International today announced the appointment of David Bacon as Chief Executive Officer.',
    excerptBn: 'মেটালটেক ইন্টারন্যাশনাল ডেভিড বেকনকে তাদের নতুন প্রধান নির্বাহী কর্মকর্তা (সিইও) হিসেবে নিয়োগের আনুষ্ঠানিক ঘোষণা দিয়েছে।',
    content: [
      'MetalTek International today announced the appointment of David Bacon as Chief Executive Officer. Mr. Bacon brings extensive executive leadership and manufacturing expertise across high-specification industrial and aerospace sectors.',
      'In his new role, David will guide MetalTek through its next chapter of global growth, advancing the company’s manufacturing footprint across centrifugal, sand, and investment casting operations while expanding turnkey CNC machining capabilities.',
      'MetalTek continues its relentless focus on customer collaboration, from initial metallurgical consultation through finished delivery, making a lasting difference for mission-critical industrial applications worldwide.',
    ],
    contentBn: [
      'মেটালটেক ইন্টারন্যাশনাল ডেভিড বেকনকে প্রধান নির্বাহী কর্মকর্তা হিসেবে নিয়োগের ঘোষণা দিয়েছে। তিনি উচ্চমানের শিল্প ও মহাকাশ প্রযুক্তি খাতে দীর্ঘদিনের নির্বাহী নেতৃত্ব ও উৎপাদন দক্ষতার অভিজ্ঞতা বহন করছেন।',
      'নতুন দায়িত্বে ডেভিড মেটালটেকের বৈশ্বিক প্রবৃদ্ধির পরবর্তী ধাপ পরিচালনা করবেন এবং সেন্ট্রিফিউগাল, স্যান্ড ও ইনভেস্টমেন্ট কাস্টিং অপারেশনের পরিধি আরও বিস্তৃত করার পাশাপাশি টার্নকি সিএনসি মেশিনিং সক্ষমতা বৃদ্ধি করবেন।',
      'মেটালটেক ধাতুবিদ্যা সংক্রান্ত প্রাথমিক পরামর্শ থেকে শুরু করে পণ্য ডেলিভারি পর্যন্ত গ্রাহকদের সাথে নিবিড় অংশীদারিত্বের উপর নিরবচ্ছিন্ন গুরুত্ব দিয়ে যাচ্ছে, যা বৈশ্বিক শিল্পখাতে নির্ভরযোগ্য পরিবর্তন আনছে।',
    ],
    category: 'Company Announcement',
    categoryBn: 'প্রাতিষ্ঠানিক ঘোষণা',
  },
  {
    slug: 'cf8m-vs-cf3m-austenitic-casting-guide',
    title: 'CF8M vs CF3M: Choosing the Right Cast Stainless Grade for Sour Service',
    titleBn: 'সিএফ৮এম বনাম সিএফ৩এম: ক্ষয়কারী পরিবেশের জন্য সঠিক স্টেইনলেস কাস্টিং গ্রেড নির্বাচন',
    date: 'July 14, 2026',
    author: 'Lead Metallurgist',
    readTime: '8 min read',
    excerpt: 'Understanding the crucial metallurgical trade-offs between standard carbon CF8M and extra-low carbon CF3M in welded pressure vessels and marine service.',
    excerptBn: 'ওয়েল্ডেড প্রেসার ভেসেল ও সামুদ্রিক ব্যবহারের ক্ষেত্রে স্ট্যান্ডার্ড কার্বন সিএফ৮এম এবং এক্সট্রা-লো কার্বন সিএফ৩এম-এর ধাতুবিদ্যাগত পার্থক্য অনুধাবন।',
    content: [
      'Design engineers frequently specify CF8M (the casting equivalent of wrought 316 stainless) as an automatic default for corrosive service. However, when the component requires fabrication welding or high-temperature field assembly, failure to understand carbon solubility can lead to catastrophic intergranular corrosion.',
      'During slow cooling from welding temperatures (between 425°C and 850°C), carbon in standard CF8M (up to 0.08% C) binds with chromium at grain boundaries to form chromium carbides. This depletes the adjacent matrix of chromium below the 12% threshold necessary for passivation.',
      'By selecting CF3M (maximum 0.03% C), carbon remains in solid solution, preserving corrosion resistance in the heat-affected zone (HAZ) without the expense of post-weld solution annealing.',
    ],
    contentBn: [
      'ডিজাইন ইঞ্জিনিয়াররা ক্ষয়কারী পরিবেশের জন্য স্বাভাবিকভাবেই সিএফ৮এম (রট ৩১৬ স্টেইনলেসের কাস্টিং সমতুল্য) নির্ধারণ করেন। তবে যন্ত্রাংশটিতে যখন ওয়েল্ডিং বা উচ্চ-তাপমাত্রার ফিল্ড অ্যাসেম্বলি প্রয়োজন হয়, তখন কার্বনের দ্রবণীয়তা যথাযথভাবে মূল্যায়ন না করলে মারাত্মক ইন্টারগ্র্যানুলার ক্ষয় হতে পারে।',
      'ওয়েল্ডিং তাপমাত্রা (৪২৫° সে. থেকে ৮৫০° সে.) থেকে ধীরে ধীরে শীতল হওয়ার সময় স্ট্যান্ডার্ড সিএফ৮এম-এর কার্বন (০.০৮% পর্যন্ত) গ্রেইন বাউন্ডারিতে ক্রোমিয়ামের সাথে যুক্ত হয়ে ক্রোমিয়াম কার্বাইড তৈরি করে। ফলে সংলগ্ন ম্যাট্রিক্সে প্যাসিভেশনের জন্য প্রয়োজনীয় ১২% ন্যূনতম সীমার নিচে ক্রোমিয়াম হ্রাস পায়।',
      'সিএফ৩এম (সর্বোচ্চ ০.০৩% কার্বন) নির্বাচনের মাধ্যমে কার্বন সলিড দ্রবণে বজায় থাকে, যা পোস্ট-ওয়েল্ড সলিউশন অ্যানিলিং ছাড়াই হিট-অ্যাফেক্টেড জোনে (এইচএজেড) ক্ষয় প্রতিরোধ ক্ষমতা অটুট রাখে।',
    ],
    category: 'Technical Metallurgy',
    categoryBn: 'প্রকৌশল ও ধাতুবিদ্যা',
  },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    term: 'Argon Oxygen Decarburization (AOD)',
    category: 'Metallurgy',
    definition: 'A secondary refining process for stainless steels and superalloys where argon and oxygen gas mixtures are bubbled through molten metal to selectively burn out carbon without oxidizing expensive chromium.',
  },
  {
    term: 'Centrifugal Casting',
    category: 'Casting',
    definition: 'A casting process where molten metal is poured into a rotating mold spinning at 60 to 120 Gs. The resulting centrifugal force compresses the metal against the wall, creating dense, defect-free cylindrical shapes with all inclusions driven to the inner bore.',
  },
  {
    term: 'Delta Ferrite',
    category: 'Metallurgy',
    definition: 'A magnetic, high-temperature phase of iron retained in austenitic stainless steel castings (typically 5% to 15%) that prevents hot cracking and micro-fissuring during solidification and welding.',
  },
  {
    term: 'Directional Solidification',
    category: 'Casting',
    definition: 'Progressive freezing of molten metal from the coldest parts of the mold toward risers or feeding reserves, preventing internal shrinkage cavities.',
  },
  {
    term: 'Liquid Penetrant Testing (PT / DPI)',
    category: 'Testing',
    definition: 'A non-destructive testing method where fluorescent or visible liquid dye is applied to a clean component to reveal surface-breaking cracks, porosity, and seam defects under inspection lighting.',
  },
  {
    term: 'MagmaSoft Solidification Simulation',
    category: 'Casting',
    definition: 'Advanced computational fluid dynamics (CFD) and thermal modeling software used to simulate metal mold filling, velocity, cooling rates, and shrinkage porosity prior to pattern tooling manufacturing.',
  },
  {
    term: 'Mill Test Certificate (MTC / EN 10204 3.1)',
    category: 'Testing',
    definition: 'A formal legal document issued by an authorized quality authority confirming that the delivered metal product conforms to ordered specifications, including chemical analysis and mechanical test values.',
  },
  {
    term: 'NACE MR0175 / ISO 15156',
    category: 'Metallurgy',
    definition: 'An international metallurgical standard establishing material requirements, heat treatments, and maximum hardness limits for metallic components exposed to sour oil and gas containing hydrogen sulfide (H2S).',
  },
  {
    term: 'PREN (Pitting Resistance Equivalent Number)',
    category: 'Metallurgy',
    definition: 'A calculated index quantifying an alloy’s resistance to localized pitting corrosion in chloride environments: PREN = %Cr + 3.3(%Mo + 0.5%W) + 16(%N). Alloys with PREN ≥ 40 are classified as Super Duplex or Super Austenitic.',
  },
  {
    term: 'Radiographic Examination (RT / X-Ray)',
    category: 'Testing',
    definition: 'Volumetric non-destructive testing using X-ray or gamma-ray radiation to inspect the internal integrity of thick metal castings for gas pockets, slag inclusions, shrinkage, or internal tears.',
  },
  {
    term: 'Solution Annealing',
    category: 'Heat Treatment',
    definition: 'Heating an austenitic or duplex stainless casting above 1,040°C to dissolve all precipitated carbides into solid solution, followed by rapid water quenching to lock in the single-phase corrosion-resistant matrix.',
  },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is the typical turnaround time for a custom casting quote?',
    answer: 'Standard requests with technical drawings (PDF, DWG, STEP) receive an engineering-reviewed proposal within 1 business day. Complex multi-part tenders or custom alloy formulations with MagmaSoft mold flow simulation take 2 to 3 business days.',
    category: 'RFQ & Orders',
  },
  {
    question: 'What minimum order quantities (MOQ) does MetalTek support?',
    answer: 'Because we operate 3D sand printing and rapid wax pattern tooling alongside high-volume automated molding lines, we support prototype lots from 1 piece up to multi-thousand production runs.',
    category: 'RFQ & Orders',
  },
  {
    question: 'How do you guarantee radiographic sound metal in centrifugal castings?',
    answer: 'Centrifugal casting naturally produces dense, directional solidification from mold wall inward. Inclusions and gas migrate to the inner bore due to density differentials under 80+ G centrifugal force. We cast an intentional machining allowance on the bore and machine it out, followed by 100% ultrasonic and liquid penetrant inspection.',
    category: 'Casting Processes',
  },
  {
    question: 'Can you formulate custom chemical compositions outside standard ASTM specs?',
    answer: 'Yes. Thanks to our in-house Argon Oxygen Decarburization (AOD) vessels and induction melting furnaces, our metallurgical team routinely melts proprietary customer chemistries with tailored ferrite numbers, micro-alloyed additions, and ultra-low tramp elements.',
    category: 'Alloys & Specifications',
  },
  {
    question: 'What quality certifications and inspection documentation accompany shipments?',
    answer: 'Every shipment includes a certified EN 10204 Type 3.1 Mill Test Certificate providing optical emission spectroscopy heat chemistry, tensile, yield, elongation, Charpy impact toughness (including cryogenic down to -196°C), and hardness values. Independent third-party inspection (TUV, DNV, Lloyd’s Register, Bureau Veritas) for 3.2 certification is regularly accommodated.',
    category: 'Quality & Testing',
  },
  {
    question: 'How do you handle global export shipping and logistics?',
    answer: 'MetalTek ships to customers in over 35 countries. We handle export documentation, sea-worthy vapor-corrosion-inhibitor (VCI) packing, custom wooden crating (ISPM-15 heat-treated), and CIF/DDP delivery terms globally.',
    category: 'RFQ & Orders',
  },
];

export const CERTIFICATIONS = [
  {
    name: 'ISO 9001:2015',
    title: 'Quality Management System',
    issuer: 'Bureau Veritas Quality International',
    scope: 'Manufacture of Ferrous & Non-Ferrous Sand, Centrifugal & Investment Castings, Precision CNC Machining & Heat Treatment',
    validity: 'Current & Certified',
    certNo: 'BV-QMS-US-88402',
  },
  {
    name: 'AS9100D',
    title: 'Aerospace Quality Management System',
    issuer: 'PRI Registrar / Nadcap',
    scope: 'Aviation, Space and Defense High-Integrity Castings and Precision Machined Assemblies',
    validity: 'Current & Certified',
    certNo: 'AS-9100D-PRI-4412',
  },
  {
    name: 'Nadcap Accreditation',
    title: 'Special Processes: Heat Treating, NDT & Materials Testing',
    issuer: 'Performance Review Institute (PRI)',
    scope: 'Radiography, Liquid Penetrant, Heat Treating, Pyrometry AMS 2750, Metallography',
    validity: 'Current & Certified',
    certNo: 'NADCAP-MT-7740',
  },
  {
    name: 'ISO 14001:2015',
    title: 'Environmental Management System',
    issuer: 'SGS International',
    scope: 'Comprehensive Foundry Operations, Closed-Loop Water Recycling & Industrial Emission Controls',
    validity: 'Current & Certified',
    certNo: 'SGS-EMS-99214',
  },
  {
    name: 'ASME Section III & Section VIII',
    title: 'Boiler & Pressure Vessel Certificate (Nuclear & Commercial)',
    issuer: 'The American Society of Mechanical Engineers',
    scope: 'Pressure Boundary Castings & Certified Welded Assemblies (N-Stamp and U-Stamp qualified)',
    validity: 'Current & Audited',
    certNo: 'ASME-PV-50912',
  },
  {
    name: 'Lloyd’s Register',
    title: 'Approval for Marine Castings',
    issuer: 'Lloyd’s Register of Shipping',
    scope: 'Stainless Steel, Duplex Stainless & Nickel Aluminum Bronze Marine Propulsion Castings',
    validity: 'Current & Audited',
    certNo: 'LR-MAR-60293',
  },
];
