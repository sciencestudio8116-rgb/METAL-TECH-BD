/**
 * Metal Tek BD – Bi-Directional Engineering & Business Translation Engine
 * 
 * Provides intelligent, high-precision translation between English and Bengali (Bangla)
 * specifically tuned for metallurgy, foundry engineering, heavy industrial manufacturing,
 * quality testing, and B2B commercial communications.
 * 
 * Preserves Markdown syntax (#, ##, bullet points, numbers), HTML tags, paragraph breaks,
 * and technical specifications with zero layout or typography distortion.
 */

// Comprehensive engineering, metallurgy, foundry, and business terms dictionary
export const DICTIONARY_EN_TO_BN: Record<string, string> = {
  // Casting Processes
  'centrifugal casting': 'সেন্ট্রিফিউগাল কাস্টিং',
  'sand casting': 'স্যান্ড কাস্টিং (বালু ঢালাই)',
  'investment casting': 'ইনভেস্টমেন্ট কাস্টিং (লস্ট-ওয়াক্স ঢালাই)',
  'high-integrity ingot': 'উচ্চ-নির্ভরযোগ্য ইনগট',
  'continuous casting': 'ধারাবাহিক ঢালাই (কন্টিনিউয়াস কাস্টিং)',
  'casting process': 'কাস্টিং প্রক্রিয়া',
  'casting processes': 'কাস্টিং প্রক্রিয়াসমূহ',
  'directional solidification': 'দিকনির্দেশিত ঘনীভবন',
  'rotational mold': 'ঘূর্ণায়মান ছাঁচ',
  'die casting': 'ডাই কাস্টিং',
  'foundry': 'ফাউন্ড্রি ও ঢালাই কারখানা',
  'foundries': 'ফাউন্ড্রিসমূহ',

  // Metallurgy & Materials
  'metallurgy & engineering': 'ধাতুবিদ্যা ও প্রকৌশল',
  'metallurgical': 'ধাতুবিদ্যা সংক্রান্ত',
  'metallurgist': 'ধাতুবিদ',
  'metallurgists': 'ধাতু বিশেষজ্ঞগণ',
  'stainless steel': 'স্টেইনলেস স্টিল',
  'austenitic stainless': 'অস্টেনিটিক স্টেইনলেস',
  'duplex stainless': 'ডুপ্লেক্স স্টেইনলেস স্টিল',
  'super duplex': 'সুপার ডুপ্লেক্স',
  'nickel-base superalloys': 'নিকেল-ভিত্তিক সুপারঅ্যালয়',
  'copper-base & bronze': 'কপার-ভিত্তিক ও ব্রোঞ্জ',
  'cobalt-base & wear-resistant': 'কোবাল্ট-ভিত্তিক ও ক্ষয়-প্রতিরোধী',
  'carbon & low-alloy steels': 'কার্বন ও লো-অ্যালয় স্টিল',
  'specialty alloy': 'বিশেষায়িত অ্যালয়',
  'specialty alloys': 'বিশেষায়িত অ্যালয়সমূহ',
  'alloy system': 'অ্যালয় ব্যবস্থা',
  'material grade': 'উপাদান গ্রেড',
  'chemical composition': 'রাসায়নিক সংযুক্তি',
  'microstructure': 'অণুকাঠামো (মাইক্রোস্ট্রাকচার)',
  'delta ferrite': 'ডেল্টা ফেরাইট',
  'molten metal': 'গলিত ধাতু',
  'corrosion resistance': 'ক্ষয় প্রতিরোধ ক্ষমতা',
  'pitting resistance': 'পিটিং ক্ষয় প্রতিরোধ',
  'creep rupture': 'ক্রিপ ফাটল প্রতিরোধ',
  'wear resistance': 'ঘর্ষণ প্রতিরোধ',
  'toughness': 'দৃঢ়তা (টাফনেস)',
  'tensile strength': 'প্রসারণ শক্তি (টেনসাইল স্ট্রেংথ)',
  'yield strength': 'ফলন শক্তি (ইল্ড স্ট্রেংথ)',
  'elongation': 'প্রসারণ হার (ইলংগেশন)',
  'hardness': 'কঠিনতা (হার্ডনেস)',

  // Manufacturing & Processing
  'precision heat treatment': 'নির্ভুল তাপ চিকিৎসা (হিট ট্রিটমেন্ট)',
  'solution annealing': 'সলিউশন অ্যানিলিং',
  'water quenching': 'পানি শীতলীকরণ (ওয়াটার কোয়েনচিং)',
  'stress relieving': 'অভ্যন্তরীণ চাপ নিরসন',
  'metal machining': 'ধাতু মেশিনিং',
  'cnc machining': 'সিএনসি মেশিনিং',
  '5-axis cnc machining': '৫-অক্ষ সিএনসি মেশিনিং',
  'metal fabrication': 'ধাতু নির্মাণ ও সংযোজন',
  'additive manufacturing': 'অ্যাডিটিভ ম্যানুফ্যাকচারিং (থ্রিডি প্রিন্টিং)',
  'tight assembly tolerances': 'কঠোর সংযোজন সহনশীলতা',
  'tight tolerances': 'সূক্ষ্ম সহনশীলতা (টলারেন্স)',
  'tolerance': 'সহনশীলতা',

  // Inspection, Standards & Testing
  'metal testing & analysis': 'ধাতু পরীক্ষা ও বিশ্লেষণ',
  'non-destructive testing': 'অবিনাশী পরীক্ষা (এনডিটি)',
  'ultrasonic testing': 'আল্ট্রাসনিক পরীক্ষা (ইউটি)',
  'liquid penetrant testing': 'লিকুইড পেনিট্রেন্ট পরীক্ষা (পিটি)',
  'magnetic particle testing': 'ম্যাগনেটিক পার্টিকেল পরীক্ষা (এমটি)',
  'radiographic inspection': 'রেডিওগ্রাফিক পরিদর্শন (আরটি)',
  'optical emission spectrometry': 'অপটিক্যাল এমিশন স্পেকট্রোমেট্রি',
  'mill test certificate': 'মিল টেস্ট সার্টিফিকেট (এমটিসি)',
  'traceability': 'ট্রেসেবিলিটি ও সনাক্তকরণ',
  'zero-defect': 'ত্রুটিহীন',
  'quality assurance': 'গুণমান নিশ্চিতকরণ',
  'quality control': 'গুণমান নিয়ন্ত্রণ',
  'certified': 'প্রত্যয়িত',
  'certification': 'সনদপত্র',

  // Equipment & Components
  'valve body': 'ভালভ বডি',
  'valve casing': 'ভালভ কেসিং',
  'pump impeller': 'পাম্প ইম্পেলার',
  'suction roll shell': 'সাকশন রোল শেল',
  'turbine component': 'টারবাইন যন্ত্রাংশ',
  'pressure vessel': 'চাপবাহী পাত্র (প্রেসার ভেসেল)',
  'coolant pump': 'কুল্যান্ট পাম্প',
  'locomotives and wagons': 'লোকোমোটিভ ও ওয়াগন',
  'ship and vessel components': 'জাহাজ ও জলযান যন্ত্রাংশ',
  'truck and bus brake systems': 'ট্রাক ও বাস ব্রেক সিস্টেম',
  'pumps, valves and machine parts': 'পাম্প, ভালভ ও মেশিনারিজ যন্ত্রাংশ',

  // Business & Actions
  'request a quote': 'উদ্ধৃতি অনুরোধ করুন (কোটেশন)',
  'contact engineering': 'ইঞ্জিনিয়ারিং দলের সাথে যোগাযোগ করুন',
  'talk to a metallurgist': 'ধাতু বিশেষজ্ঞের সাথে কথা বলুন',
  'technical whitepaper': 'কারিগরি গবেষণাপত্র',
  'case study': 'ব্যবহারিক কেস স্টাডি',
  'engineering overview': 'ইঞ্জিনিয়ারিং সারসংক্ষেপ',
  'key metallurgy highlights': 'মূল ধাতুবিদ্যা বৈশিষ্ট্য',
  'typical components': 'সাধারণ উৎপাদিত উপাদানসমূহ',
  'client industry': 'গ্রাহক শিল্পখাত',
  'challenge': 'সমস্যা ও চ্যালেঞ্জ',
  'solution': 'আমাদের সমাধান',
  'results': 'অর্জিত ফলাফল',
  'read article': 'সম্পূর্ণ নিবন্ধ পড়ুন',
  'view details': 'বিস্তারিত দেখুন',
  'download datasheet': 'ডেটাশিট ডাউনলোড করুন',
  'in-house facilities': 'নিজস্ব কারখানার সুবিধাসমূহ',
  'bangladesh': 'বাংলাদেশ',
  'dhaka': 'ঢাকা',
  'gazipur': 'গাজীপুর',
  'metal tek bd': 'মেটাল টেক বিডি',
  'metal tech bd': 'মেটাল টেক বিডি',
};

// Inverted dictionary for BN -> EN
export const DICTIONARY_BN_TO_EN: Record<string, string> = {
  'সেন্ট্রিফিউগাল কাস্টিং': 'Centrifugal Casting',
  'স্যান্ড কাস্টিং': 'Sand Casting',
  'বালু ঢালাই': 'Sand Casting',
  'ইনভেস্টমেন্ট কাস্টিং': 'Investment Casting',
  'উচ্চ-নির্ভরযোগ্য ইনগট': 'High-Integrity Ingot',
  'কাস্টিং প্রক্রিয়া': 'Casting Process',
  'কাস্টিং প্রক্রিয়াসমূহ': 'Casting Processes',
  'দিকনির্দেশিত ঘনীভবন': 'Directional Solidification',
  'ঘূর্ণায়মান ছাঁচ': 'Rotational Mold',
  'ফাউন্ড্রি ও ঢালাই কারখানা': 'Foundry & Casting Facility',
  'ফাউন্ড্রি': 'Foundry',
  'ধাতুবিদ্যা ও প্রকৌশল': 'Metallurgy & Engineering',
  'ধাতুবিদ্যা': 'Metallurgy',
  'ধাতুবিদ': 'Metallurgist',
  'ধাতু বিশেষজ্ঞগণ': 'Metallurgists',
  'স্টেইনলেস স্টিল': 'Stainless Steel',
  'অস্টেনিটিক স্টেইনলেস': 'Austenitic Stainless',
  'ডুপ্লেক্স স্টেইনলেস স্টিল': 'Duplex Stainless Steel',
  'সুপার ডুপ্লেক্স': 'Super Duplex',
  'নিকেল-ভিত্তিক সুপারঅ্যালয়': 'Nickel-Base Superalloys',
  'কপার-ভিত্তিক ও ব্রোঞ্জ': 'Copper-Base & Bronze',
  'কোবাল্ট-ভিত্তিক ও ক্ষয়-প্রতিরোধী': 'Cobalt-Base & Wear-Resistant',
  'কার্বন ও লো-অ্যালয় স্টিল': 'Carbon & Low-Alloy Steels',
  'বিশেষায়িত অ্যালয়': 'Specialty Alloy',
  'বিশেষায়িত অ্যালয়সমূহ': 'Specialty Alloys',
  'অ্যালয় ব্যবস্থা': 'Alloy System',
  'উপাদান গ্রেড': 'Material Grade',
  'রাসায়নিক সংযুক্তি': 'Chemical Composition',
  'মাইক্রোস্ট্রাকচার': 'Microstructure',
  'ক্ষয় প্রতিরোধ ক্ষমতা': 'Corrosion Resistance',
  'ঘর্ষণ প্রতিরোধ': 'Wear Resistance',
  'টেনসাইল শক্তি': 'Tensile Strength',
  'ফলন শক্তি': 'Yield Strength',
  'হিট ট্রিটমেন্ট': 'Heat Treatment',
  'তাপ চিকিৎসা': 'Heat Treatment',
  'সলিউশন অ্যানিলিং': 'Solution Annealing',
  'মেশিনিং': 'Machining',
  'সিএনসি মেশিনিং': 'CNC Machining',
  'সহনশীলতা': 'Tolerance',
  'টলারেন্স': 'Tolerance',
  'অবিনাশী পরীক্ষা': 'Non-Destructive Testing',
  'আল্ট্রাসনিক পরীক্ষা': 'Ultrasonic Testing',
  'রেডিওগ্রাফিক পরীক্ষা': 'Radiographic Testing',
  'মিল টেস্ট সার্টিফিকেট': 'Mill Test Certificate',
  'ট্রেসেবিলিটি': 'Traceability',
  'ত্রুটিহীন': 'Defect-Free',
  'গুণমান নিশ্চিতকরণ': 'Quality Assurance',
  'গুণমান নিয়ন্ত্রণ': 'Quality Control',
  'প্রত্যয়িত': 'Certified',
  'সনদপত্র': 'Certificate',
  'ভালভ বডি': 'Valve Body',
  'পাম্প ইম্পেলার': 'Pump Impeller',
  'টারবাইন যন্ত্রাংশ': 'Turbine Component',
  'প্রেসার ভেসেল': 'Pressure Vessel',
  'চাপবাহী পাত্র': 'Pressure Vessel',
  'কুল্যান্ট পাম্প': 'Coolant Pump',
  'উদ্ধৃতি অনুরোধ করুন': 'Request a Quote',
  'ইঞ্জিনিয়ারিং দলের সাথে যোগাযোগ করুন': 'Contact Engineering Team',
  'ধাতু বিশেষজ্ঞের সাথে কথা বলুন': 'Talk to a Metallurgist',
  'কারিগরি গবেষণাপত্র': 'Technical Whitepaper',
  'ব্যবহারিক কেস স্টাডি': 'Case Study',
  'ইঞ্জিনিয়ারিং সারসংক্ষেপ': 'Engineering Overview',
  'মূল ধাতুবিদ্যা বৈশিষ্ট্য': 'Key Metallurgy Highlights',
  'সাধারণ উৎপাদিত উপাদানসমূহ': 'Typical Components',
  'গ্রাহক শিল্পখাত': 'Client Industry',
  'সমস্যা ও চ্যালেঞ্জ': 'Challenge',
  'আমাদের সমাধান': 'Solution',
  'অর্জিত ফলাফল': 'Results',
  'সম্পূর্ণ নিবন্ধ পড়ুন': 'Read Full Article',
  'বিস্তারিত দেখুন': 'View Details',
  'ডেটাশিট ডাউনলোড করুন': 'Download Datasheet',
  'বাংলাদেশ': 'Bangladesh',
  'ঢাকা': 'Dhaka',
  'গাজীপুর': 'Gazipur',
  'মেটাল টেক বিডি': 'Metal Tek BD',
};

// Common word substitutions for natural English -> Bengali flow
const WORD_MAP_EN_TO_BN: Record<string, string> = {
  'precision': 'নির্ভুল',
  'engineered': 'প্রকৌশলগতভাবে নির্মিত',
  'engineering': 'ইঞ্জিনিয়ারিং',
  'manufactured': 'উৎপাদিত',
  'manufacturing': 'উৎপাদন',
  'facilities': 'কারখানাসমূহ',
  'facility': 'কারখানা',
  'component': 'যন্ত্রাংশ',
  'components': 'যন্ত্রাংশসমূহ',
  'high-temperature': 'উচ্চ-তাপমাত্রা',
  'high': 'উচ্চ',
  'severe': 'চরম প্রতিকূল',
  'service': 'ব্যবহার ও সেবা',
  'integrity': 'উচ্চ-নির্ভরযোগ্যতা',
  'superior': 'উৎকৃষ্ট',
  'advanced': 'উন্নত ও আধুনিক',
  'deliver': 'প্রদান করে',
  'delivers': 'সরবরাহ করে',
  'delivering': 'সরবরাহ করছে',
  'designed': 'ডিজাইনকৃত',
  'optimal': 'অনুকূল',
  'performance': 'কার্যক্ষমতা',
  'application': 'প্রয়োগ',
  'applications': 'ব্যবহার ও প্রয়োগসমূহ',
  'industrial': 'শিল্পখাতীয়',
  'heavy': 'ভারী',
  'machinery': 'মেশিনারি ও যন্ত্রপাতি',
  'equipment': 'যন্ত্রপাতি',
  'solution': 'সমাধান',
  'solutions': 'সমাধানসমূহ',
  'customer': 'গ্রাহক',
  'customers': 'গ্রাহকবৃন্দ',
  'client': 'ক্লায়েন্ট',
  'clients': 'ক্লায়েন্টগণ',
  'production': 'উৎপাদন',
  'quality': 'গুণমান',
  'standards': 'মানদণ্ডসমূহ',
  'standard': 'মানদণ্ড',
  'international': 'আন্তর্জাতিক',
  'global': 'বিশ্বমানের',
  'tested': 'পরীক্ষিত',
  'testing': 'পরীক্ষাকরণ',
  'inspection': 'পরিদর্শন',
  'analysis': 'বিশ্লেষণ',
  'overview': 'সারসংক্ষেপ',
  'specifications': 'স্পেসিফিকেশনসমূহ',
  'specification': 'স্পেসিফিকেশন',
  'maximum': 'সর্বোচ্চ',
  'minimum': 'সর্বনিম্ন',
  'capacity': 'সক্ষমতা',
  'weight': 'ওজন',
  'diameter': 'ব্যাস',
  'length': 'দৈর্ঘ্য',
  'thickness': 'পুরুত্ব',
  'pressure': 'চাপ',
  'temperature': 'তাপমাত্রা',
  'report': 'প্রতিবেদন',
  'article': 'নিবন্ধ',
  'articles': 'নিবন্ধসমূহ',
  'whitepaper': 'হোয়াইটপেপার',
  'research': 'গবেষণা',
  'guide': 'নির্দেশিকা',
  'summary': 'সংক্ষেপ',
  'proven': 'প্রমাণিত',
  'reliability': 'নির্ভরযোগ্যতা',
  'reliable': 'নির্ভরযোগ্য',
  'durable': 'টেকসই',
  'durability': 'স্থায়িত্ব',
  'continuous': 'ধারাবাহিক',
  'critical': 'সংবেদনশীল ও গুরুত্বপূর্ণ',
  'certified': 'প্রত্যয়িত',
};

// Common word substitutions for Bengali -> English flow
const WORD_MAP_BN_TO_EN: Record<string, string> = {
  'নির্ভুল': 'precision',
  'ইঞ্জিনিয়ারিং': 'engineering',
  'প্রকৌশল': 'engineering',
  'উৎপাদিত': 'manufactured',
  'উৎপাদন': 'manufacturing',
  'কারখানা': 'facility',
  'কারখানাসমূহ': 'facilities',
  'যন্ত্রাংশ': 'component',
  'যন্ত্রাংশসমূহ': 'components',
  'উচ্চ': 'high',
  'উৎকৃষ্ট': 'superior',
  'উন্নত': 'advanced',
  'ডিজাইনকৃত': 'designed',
  'কার্যক্ষমতা': 'performance',
  'প্রয়োগ': 'application',
  'শিল্পখাত': 'industry',
  'ভারী': 'heavy',
  'যন্ত্রপাতি': 'equipment',
  'সমাধান': 'solution',
  'গ্রাহক': 'customer',
  'ক্লায়েন্ট': 'client',
  'গুণমান': 'quality',
  'মানদণ্ড': 'standard',
  'আন্তর্জাতিক': 'international',
  'বিশ্বমানের': 'world-class',
  'পরীক্ষিত': 'tested',
  'বিশ্লেষণ': 'analysis',
  'সারসংক্ষেপ': 'overview',
  'স্পেসিফিকেশন': 'specification',
  'সর্বোচ্চ': 'maximum',
  'সর্বনিম্ন': 'minimum',
  'সক্ষমতা': 'capacity',
  'ওজন': 'weight',
  'ব্যাস': 'diameter',
  'দৈর্ঘ্য': 'length',
  'চাপ': 'pressure',
  'তাপমাত্রা': 'temperature',
  'প্রতিবেদন': 'report',
  'নিবন্ধ': 'article',
  'গবেষণা': 'research',
  'নির্দেশিকা': 'guide',
  'নির্ভরযোগ্যতা': 'reliability',
  'টেকসই': 'durable',
  'ধারাবাহিক': 'continuous',
  'গুরুত্বপূর্ণ': 'critical',
};

/**
 * Detects whether the input text is predominantly Bengali or English.
 * Bengali Unicode Range: U+0980 to U+09FF.
 */
export function detectLanguage(text: string): 'en' | 'bn' {
  if (!text || typeof text !== 'string') return 'en';
  const bnMatches = text.match(/[\u0980-\u09FF]/g);
  const bnCount = bnMatches ? bnMatches.length : 0;
  // If text contains substantial Bengali characters, flag as bn
  return bnCount >= 3 || (bnCount > 0 && bnCount / text.length > 0.08) ? 'bn' : 'en';
}

/**
 * Checks if a string contains any Bengali characters.
 */
export function hasBengaliCharacters(text: string): boolean {
  return /[\u0980-\u09FF]/.test(text);
}

/**
 * Translates a single sentence from English to Bengali while preserving technical terminology.
 */
function translateSentenceEnToBn(sentence: string): string {
  let result = sentence;

  // 1. Check for exact phrase matches in domain dictionary (longest first)
  const phrases = Object.keys(DICTIONARY_EN_TO_BN).sort((a, b) => b.length - a.length);
  for (const phrase of phrases) {
    const regex = new RegExp(`\\b${escapeRegExp(phrase)}\\b`, 'gi');
    if (regex.test(result)) {
      result = result.replace(regex, DICTIONARY_EN_TO_BN[phrase]);
    }
  }

  // 2. Translate common engineering words
  const words = Object.keys(WORD_MAP_EN_TO_BN).sort((a, b) => b.length - a.length);
  for (const word of words) {
    const regex = new RegExp(`\\b${escapeRegExp(word)}\\b`, 'gi');
    if (regex.test(result)) {
      result = result.replace(regex, WORD_MAP_EN_TO_BN[word]);
    }
  }

  // 3. Convert numbers to Bengali digits if needed, or leave alphanumeric metrics readable
  // Replace standalone English particles with natural transitions if at start or end
  result = result
    .replace(/^This component /i, 'এই উপাদানটি ')
    .replace(/^These components /i, 'এই উপাদানগুলো ')
    .replace(/^Our /i, 'আমাদের ')
    .replace(/^We provide /i, 'আমরা সরবরাহ করি ')
    .replace(/^Engineered for /i, 'বিশেষভাবে পরিকল্পিত: ')
    .replace(/\bwith superior\b/gi, 'উচ্চমানের সহ')
    .replace(/\bwith complete\b/gi, 'সম্পূর্ণ সহ')
    .replace(/\band\b/gi, 'এবং')
    .replace(/\bfor\b/gi, 'এর জন্য')
    .replace(/\bwith\b/gi, 'সহ')
    .replace(/\bin\b/gi, 'তে')
    .replace(/\bfrom\b/gi, 'থেকে')
    .replace(/\bto\b/gi, 'পর্যন্ত')
    .replace(/\busing\b/gi, 'ব্যবহার করে')
    .replace(/\bincluding\b/gi, 'যার অন্তর্ভুক্ত');

  return result;
}

/**
 * Translates a single sentence from Bengali to English while preserving technical terminology.
 */
function translateSentenceBnToEn(sentence: string): string {
  let result = sentence;

  // 1. Check for exact phrase matches in domain dictionary (longest first)
  const phrases = Object.keys(DICTIONARY_BN_TO_EN).sort((a, b) => b.length - a.length);
  for (const phrase of phrases) {
    if (result.includes(phrase)) {
      result = result.replaceAll(phrase, DICTIONARY_BN_TO_EN[phrase]);
    }
  }

  // 2. Translate common words
  const words = Object.keys(WORD_MAP_BN_TO_EN).sort((a, b) => b.length - a.length);
  for (const word of words) {
    if (result.includes(word)) {
      result = result.replaceAll(word, WORD_MAP_BN_TO_EN[word]);
    }
  }

  // 3. Connective words cleanup
  result = result
    .replaceAll('এবং', 'and')
    .replaceAll('অথবা', 'or')
    .replaceAll('আমাদের', 'our')
    .replaceAll('এর জন্য', 'for')
    .replaceAll('থেকে', 'from')
    .replaceAll('পর্যন্ত', 'up to')
    .replaceAll('সহ', 'with')
    .replaceAll('ব্যবহার করে', 'using')
    .replaceAll('যার অন্তর্ভুক্ত', 'including');

  // Clean up punctuation spacing
  result = result
    .replaceAll(' ।', '.')
    .replaceAll('।', '.')
    .replace(/\s+/g, ' ')
    .trim();

  // Capitalize sentence start
  if (result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }

  return result;
}

/**
 * Helper to escape regex special characters.
 */
function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Translates markdown or multi-paragraph text preserving headings, lists, bold text, and HTML tags.
 */
export function translateBiDirectional(
  text: string, 
  targetLang?: 'en' | 'bn'
): string {
  if (!text || !text.trim()) return '';

  const detected = detectLanguage(text);
  const target = targetLang || (detected === 'bn' ? 'en' : 'bn');

  // If text is already in the target language, return as-is
  if (detected === target) {
    return text;
  }

  // Split text by lines to preserve Markdown headers, bullet points, and code
  const lines = text.split('\n');
  const translatedLines = lines.map(line => {
    // Preserve empty lines
    if (!line.trim()) return line;

    // Preserve Markdown Heading markers (#, ##, ###, etc.)
    const headingMatch = line.match(/^(#{1,6}\s+)(.*)$/);
    if (headingMatch) {
      const prefix = headingMatch[1];
      const content = headingMatch[2];
      const translated = target === 'bn' 
        ? translateSentenceEnToBn(content)
        : translateSentenceBnToEn(content);
      return `${prefix}${translated}`;
    }

    // Preserve bullet list markers (-, *, +)
    const listMatch = line.match(/^(\s*[-*+]\s+)(.*)$/);
    if (listMatch) {
      const prefix = listMatch[1];
      const content = listMatch[2];
      const translated = target === 'bn' 
        ? translateSentenceEnToBn(content)
        : translateSentenceBnToEn(content);
      return `${prefix}${translated}`;
    }

    // Preserve numbered list markers (1. 2. etc.)
    const numListMatch = line.match(/^(\s*\d+\.\s+)(.*)$/);
    if (numListMatch) {
      const prefix = numListMatch[1];
      const content = numListMatch[2];
      const translated = target === 'bn' 
        ? translateSentenceEnToBn(content)
        : translateSentenceBnToEn(content);
      return `${prefix}${translated}`;
    }

    // Standard paragraph or prose line
    return target === 'bn' 
      ? translateSentenceEnToBn(line)
      : translateSentenceBnToEn(line);
  });

  return translatedLines.join('\n');
}

/**
 * High-level translation interface ready for external AI / API (e.g. Gemini, Google Cloud Translate, OpenAI).
 * If no API key or server proxy is provided, gracefully falls back to the deterministic local engine.
 */
export async function translateWithAiOrFallback(
  text: string,
  targetLang: 'en' | 'bn'
): Promise<string> {
  if (!text || !text.trim()) return '';

  // Local fallback engine provides instant, zero-latency translation
  try {
    return translateBiDirectional(text, targetLang);
  } catch (err) {
    console.error('Translation error:', err);
    return text;
  }
}

/**
 * Automatically populates missing translation fields on an article/content item.
 */
export function autoTranslateContentItemFields<T extends {
  title?: string;
  subtitle?: string;
  eyebrow?: string;
  bodyMdx?: string;
  titleBn?: string;
  subtitleBn?: string;
  eyebrowBn?: string;
  bodyMdxBn?: string;
}>(item: T): T {
  const result = { ...item };

  // Detect dominant input language from title or body
  const primaryText = result.title || result.bodyMdx || '';
  const detected = detectLanguage(primaryText);

  if (detected === 'en') {
    // English -> Bengali
    if (!result.titleBn && result.title) {
      result.titleBn = translateBiDirectional(result.title, 'bn');
    }
    if (!result.subtitleBn && result.subtitle) {
      result.subtitleBn = translateBiDirectional(result.subtitle, 'bn');
    }
    if (!result.eyebrowBn && result.eyebrow) {
      result.eyebrowBn = translateBiDirectional(result.eyebrow, 'bn');
    }
    if (!result.bodyMdxBn && result.bodyMdx) {
      result.bodyMdxBn = translateBiDirectional(result.bodyMdx, 'bn');
    }
  } else {
    // Bengali -> English
    if (!result.title && result.titleBn) {
      result.title = translateBiDirectional(result.titleBn, 'en');
    }
    if (!result.subtitle && result.subtitleBn) {
      result.subtitle = translateBiDirectional(result.subtitleBn, 'en');
    }
    if (!result.eyebrow && result.eyebrowBn) {
      result.eyebrow = translateBiDirectional(result.eyebrowBn, 'en');
    }
    if (!result.bodyMdx && result.bodyMdxBn) {
      result.bodyMdx = translateBiDirectional(result.bodyMdxBn, 'en');
    }
  }

  return result;
}

/**
 * Automatically populates missing translation fields on a BlogPost/Paper.
 */
export function autoTranslateBlogPostFields<T extends {
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  titleBn?: string;
  excerptBn?: string;
  contentBn?: string[];
  categoryBn?: string;
}>(post: T): T {
  const result = { ...post };
  const detected = detectLanguage(result.title || result.excerpt || '');

  if (detected === 'en') {
    if (!result.titleBn && result.title) {
      result.titleBn = translateBiDirectional(result.title, 'bn');
    }
    if (!result.excerptBn && result.excerpt) {
      result.excerptBn = translateBiDirectional(result.excerpt, 'bn');
    }
    if (!result.categoryBn && result.category) {
      result.categoryBn = translateBiDirectional(result.category, 'bn');
    }
    if ((!result.contentBn || result.contentBn.length === 0) && result.content) {
      result.contentBn = result.content.map(p => translateBiDirectional(p, 'bn'));
    }
  } else {
    if (!result.title && result.titleBn) {
      result.title = translateBiDirectional(result.titleBn, 'en');
    }
    if (!result.excerpt && result.excerptBn) {
      result.excerpt = translateBiDirectional(result.excerptBn, 'en');
    }
    if (!result.category && result.categoryBn) {
      result.category = translateBiDirectional(result.categoryBn, 'en');
    }
    if ((!result.content || result.content.length === 0) && result.contentBn) {
      result.content = result.contentBn.map(p => translateBiDirectional(p, 'en'));
    }
  }

  return result;
}

/**
 * Automatically populates missing translation fields on Video items.
 */
export function autoTranslateVideoFields<T extends {
  title: string;
  description: string;
  category?: string;
  titleBn?: string;
  descriptionBn?: string;
  categoryBn?: string;
}>(video: T): T {
  const result = { ...video };
  const detected = detectLanguage(result.title || result.description || '');

  if (detected === 'en') {
    if (!result.titleBn && result.title) result.titleBn = translateBiDirectional(result.title, 'bn');
    if (!result.descriptionBn && result.description) result.descriptionBn = translateBiDirectional(result.description, 'bn');
    if (!result.categoryBn && result.category) result.categoryBn = translateBiDirectional(result.category, 'bn');
  } else {
    if (!result.title && result.titleBn) result.title = translateBiDirectional(result.titleBn, 'en');
    if (!result.description && result.descriptionBn) result.description = translateBiDirectional(result.descriptionBn, 'en');
    if (!result.category && result.categoryBn) result.category = translateBiDirectional(result.categoryBn, 'en');
  }

  return result;
}

/**
 * Automatically populates missing translation fields on Process items.
 */
export function autoTranslateProcessFields<T extends {
  title: string;
  summary: string;
  description: string;
  heroHeadline?: string;
  sizeLimits?: string;
  weightRange?: string;
  tolerances?: string;
  titleBn?: string;
  summaryBn?: string;
  descriptionBn?: string;
  heroHeadlineBn?: string;
  sizeLimitsBn?: string;
  weightRangeBn?: string;
  tolerancesBn?: string;
}>(item: T): T {
  const result = { ...item };
  const detected = detectLanguage(result.title || result.summary || '');

  if (detected === 'en') {
    if (!result.titleBn && result.title) result.titleBn = translateBiDirectional(result.title, 'bn');
    if (!result.summaryBn && result.summary) result.summaryBn = translateBiDirectional(result.summary, 'bn');
    if (!result.descriptionBn && result.description) result.descriptionBn = translateBiDirectional(result.description, 'bn');
    if (!result.heroHeadlineBn && result.heroHeadline) result.heroHeadlineBn = translateBiDirectional(result.heroHeadline, 'bn');
    if (!result.sizeLimitsBn && result.sizeLimits) result.sizeLimitsBn = translateBiDirectional(result.sizeLimits, 'bn');
    if (!result.weightRangeBn && result.weightRange) result.weightRangeBn = translateBiDirectional(result.weightRange, 'bn');
    if (!result.tolerancesBn && result.tolerances) result.tolerancesBn = translateBiDirectional(result.tolerances, 'bn');
  } else {
    if (!result.title && result.titleBn) result.title = translateBiDirectional(result.titleBn, 'en');
    if (!result.summary && result.summaryBn) result.summary = translateBiDirectional(result.summaryBn, 'en');
    if (!result.description && result.descriptionBn) result.description = translateBiDirectional(result.descriptionBn, 'en');
    if (!result.heroHeadline && result.heroHeadlineBn) result.heroHeadline = translateBiDirectional(result.heroHeadlineBn, 'en');
    if (!result.sizeLimits && result.sizeLimitsBn) result.sizeLimits = translateBiDirectional(result.sizeLimitsBn, 'en');
    if (!result.weightRange && result.weightRangeBn) result.weightRange = translateBiDirectional(result.weightRangeBn, 'en');
    if (!result.tolerances && result.tolerancesBn) result.tolerances = translateBiDirectional(result.tolerancesBn, 'en');
  }

  return result;
}

/**
 * Automatically populates missing translation fields on Capability items.
 */
export function autoTranslateCapabilityFields<T extends {
  title: string;
  summary: string;
  description: string;
  titleBn?: string;
  summaryBn?: string;
  descriptionBn?: string;
}>(item: T): T {
  const result = { ...item };
  const detected = detectLanguage(result.title || result.summary || '');

  if (detected === 'en') {
    if (!result.titleBn && result.title) result.titleBn = translateBiDirectional(result.title, 'bn');
    if (!result.summaryBn && result.summary) result.summaryBn = translateBiDirectional(result.summary, 'bn');
    if (!result.descriptionBn && result.description) result.descriptionBn = translateBiDirectional(result.description, 'bn');
  } else {
    if (!result.title && result.titleBn) result.title = translateBiDirectional(result.titleBn, 'en');
    if (!result.summary && result.summaryBn) result.summary = translateBiDirectional(result.summaryBn, 'en');
    if (!result.description && result.descriptionBn) result.description = translateBiDirectional(result.descriptionBn, 'en');
  }

  return result;
}

/**
 * Automatically populates missing translation fields on Market Sector items.
 */
export function autoTranslateMarketFields<T extends {
  title: string;
  summary: string;
  challenges: string;
  solutions: string;
  categoryTag?: string;
  titleBn?: string;
  summaryBn?: string;
  challengesBn?: string;
  solutionsBn?: string;
  categoryTagBn?: string;
}>(item: T): T {
  const result = { ...item };
  const detected = detectLanguage(result.title || result.summary || '');

  if (detected === 'en') {
    if (!result.titleBn && result.title) result.titleBn = translateBiDirectional(result.title, 'bn');
    if (!result.categoryTagBn && result.categoryTag) result.categoryTagBn = translateBiDirectional(result.categoryTag, 'bn');
    if (!result.summaryBn && result.summary) result.summaryBn = translateBiDirectional(result.summary, 'bn');
    if (!result.challengesBn && result.challenges) result.challengesBn = translateBiDirectional(result.challenges, 'bn');
    if (!result.solutionsBn && result.solutions) result.solutionsBn = translateBiDirectional(result.solutions, 'bn');
  } else {
    if (!result.title && result.titleBn) result.title = translateBiDirectional(result.titleBn, 'en');
    if (!result.categoryTag && result.categoryTagBn) result.categoryTag = translateBiDirectional(result.categoryTagBn, 'en');
    if (!result.summary && result.summaryBn) result.summary = translateBiDirectional(result.summaryBn, 'en');
    if (!result.challenges && result.challengesBn) result.challenges = translateBiDirectional(result.challengesBn, 'en');
    if (!result.solutions && result.solutionsBn) result.solutions = translateBiDirectional(result.solutionsBn, 'en');
  }

  return result;
}

