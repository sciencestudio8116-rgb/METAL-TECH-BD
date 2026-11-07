-- ==============================================================================
-- METAL TEK BD - INITIAL PRODUCTION SEED DATA
-- Populates the newly created Supabase tables with initial corporate catalog data
-- ==============================================================================

-- 1. Site Metadata
INSERT INTO public.site_metadata (
  id, name, short_name, tagline, hero_headline, hero_subhead,
  phone, phone_raw, sales_email, engineering_email, global_hq,
  headquarters_address, dhaka_hq_address, plant_address, chittagong_hub,
  response_promise, copyright
) VALUES (
  'default',
  'Metal Tek BD',
  'MetalTek',
  'High-Integrity Centrifugal & Static Alloy Castings',
  'Engineering High-Integrity Castings for Severe Service',
  'High-performance centrifugal, sand, and investment castings engineered for mission-critical industrial applications in petrochemical, marine, defense, and power generation.',
  '+880 2 887 8901',
  '+88028878901',
  'sales@metaltekbd.com',
  'engineering@metaltekbd.com',
  'MetalTek International, Waukesha, WI, USA',
  'Plot 42, Sector 7, Uttara Commercial Area, Dhaka 1230, Bangladesh',
  'Plot 42, Sector 7, Uttara Commercial Area, Dhaka 1230, Bangladesh',
  'Heavy Alloy Casting & Machining Plant, Joydebpur Road, Gazipur Industrial Zone, Bangladesh',
  'Port Support Depot, Strand Road, Agrabad Commercial Area, Chittagong, Bangladesh',
  'Quotes within 24 hours | 100% NDT Radiographic Testing available on all critical pours.',
  '© 2026 Metal Tek BD (Authorized MetalTek International Partner). All rights reserved.'
) ON CONFLICT (id) DO UPDATE SET
  hero_headline = EXCLUDED.hero_headline,
  hero_subhead = EXCLUDED.hero_subhead;

-- 2. Initial Process Cards
INSERT INTO public.process_cards (
  slug, title, title_bn, summary, summary_bn, description, description_bn,
  size_limits, size_limits_bn, weight_range, weight_range_bn, tolerances, tolerances_bn,
  typical_components, typical_components_bn, suitable_alloys, industries_served
) VALUES 
(
  'centrifugal-casting',
  'Centrifugal Casting',
  'সেন্ট্রিফিউগাল কাস্টিং',
  'True centrifugal casting generates up to 80 Gs of centrifugal force, driving impurities into the inner bore for defect-free, directional solidification.',
  'প্রকৃত সেন্ট্রিফিউগাল কাস্টিং ৮০ জি পর্যন্ত বল তৈরি করে ধাতুর ভেতরের ত্রুটি দূর করে এবং নিখুঁত দিকনির্দেশক শীতলীকরণ নিশ্চিত করে।',
  'Centrifugal casting utilizes a permanent metal mold rotating at high speeds around its central axis. Molten alloy poured into the die is forced outward against the mold wall under intense centrifugal pressure.',
  'সেন্ট্রিফিউগাল কাস্টিং প্রক্রিয়ায় একটি স্থায়ী ধাতব ছাঁচ উচ্চ গতিতে আবর্তিত হয়। ছাঁচে ঢালা গলিত ধাতু তীব্র কেন্দ্রাতিগ বলের কারণে ছাঁচের ভেতরের দেয়ালে সমানভাবে বিন্যস্ত হয়।',
  'OD up to 130 in (3,300 mm); Length to 200 in (5,080 mm)',
  'ব্যাস সর্বোচ্চ ১৩০ ইঞ্চি (৩,৩০০ মিমি); দৈর্ঘ্য ২০০ ইঞ্চি (৫,০৮০ মিমি)',
  '10 lbs (4.5 kg) to 80,000 lbs (36,287 kg)',
  '১০ পাউন্ড (৪.৫ কেজি) থেকে ৮০,০০০ পাউন্ড (৩৬,২৮৭ কেজি)',
  '±0.005 in (0.127 mm) per inch of diameter',
  '±০.০০৫ ইঞ্চি (০.১২৭ মিমি) প্রতি ইঞ্চি ব্যাসে',
  '["Reformer tubes", "Pump casings", "Roll shells", "Bearing bushings", "Furnace rollers"]'::jsonb,
  '["রিফরমার টিউব", "পাম্প কেসিং", "রোল শেল", "বেয়ারিং বুশিং", "ফার্নেস রোলার"]'::jsonb,
  '["Stainless Steel", "Nickel-Base Superalloys", "Cobalt-Base Alloys", "Wear-Resistant Alloys"]'::jsonb,
  '["Petrochemical & Refining", "Power Generation", "Marine & Naval Propulsion", "Mining & Minerals Processing"]'::jsonb
),
(
  'sand-casting',
  'Air-Set & No-Bake Sand Casting',
  'নো-বেক স্যান্ড কাস্টিং',
  'Large, intricate, structural alloy castings with complex internal coring produced through chemically bonded no-bake sand molds.',
  'রাসায়নিকভাবে আবদ্ধ নো-বেক বালির ছাঁচ ব্যবহার করে জটিল অভ্যন্তরীণ কোরযুক্ত ভারী স্ট্রাকচারাল অ্যালয় কাস্টিং।',
  'Our no-bake air-set sand casting facility accommodates large structural castings weighing up to 25,000 lbs. Computerized sand reclamation and automated mixer heads maintain precise binder ratios.',
  'আমাদের নো-বেক এয়ার-সেট স্যান্ড কাস্টিং সুবিধায় ২৫,০০০ পাউন্ড ওজনের ভারী স্ট্রাকচারাল যন্ত্রাংশ ঢালাই করা সম্ভব। কম্পিউটার নিয়ন্ত্রিত বালি পুনর্ব্যবহার ব্যবস্থা উচ্চ নির্ভুলতা রক্ষা করে।',
  'Molds up to 18 ft x 18 ft (5.5 m x 5.5 m)',
  'ছাঁচ সর্বোচ্চ ১৮ ফুট x ১৮ ফুট (৫.৫ মি x ৫.৫ মি)',
  '50 lbs (23 kg) to 25,000 lbs (11,340 kg)',
  '৫০ পাউন্ড (২৩ কেজি) থেকে ২৫,০০০ পাউন্ড (১১,৩৪০ কেজি)',
  '±0.030 in (0.76 mm) up to 12 in; ±0.060 in above',
  '±০.০৩০ ইঞ্চি (০.৭৬ মিমি) ১২ ইঞ্চি পর্যন্ত; তদুর্ধে ±০.০৬০ ইঞ্চি',
  '["Impellers", "Valve bodies", "Turbine exhaust casings", "Hydro power vanes", "Pump volutes"]'::jsonb,
  '["ইম্পেলার", "ভালভ বডি", "টারবাইন এগজস্ট কেসিং", "হাইড্রো পাওয়ার ভ্যান", "পাম্প ভলিউট"]'::jsonb,
  '["Duplex Stainless", "Super Duplex", "Austenitic Stainless", "Nickel Alloys", "Carbon Steel"]'::jsonb,
  '["Petrochemical", "Hydroelectric Power", "Naval Defense", "Chemical Processing"]'::jsonb
),
(
  'investment-casting',
  'Investment (Lost Wax) Casting',
  'ইনভেস্টমেন্ট (লস্ট ওয়াক্স) কাস্টিং',
  'Near-net-shape precision casting for intricate, tight-tolerance components minimizing expensive subsequent machining on tough alloys.',
  'জটিল ও সংকীর্ণ টলারেন্সের ক্ষুদ্র যন্ত্রাংশের জন্য নিয়ার-নেট-শেপ প্রিসিশন কাস্টিং, যা ব্যয়বহুল মেশিনিং খরচ কমায়।',
  'Using automated ceramic shell robotic dipping and fast dewax autoclaves, our investment casting delivers exceptional surface finishes and fine metallurgical grain structures.',
  'স্বয়ংক্রিয় রোবোটিক সিরামিক শেল কোটিং এবং আধুনিক ডি-ওয়াক্স প্রক্রিয়ায় ইনভেস্টমেন্ট কাস্টিং মসৃণ ফিনিশ ও সূক্ষ্ম ধাতুবিদ্যাগত গ্রেইন তৈরি করে।',
  'Components up to 40 in x 40 in (1,000 mm x 1,000 mm)',
  'যন্ত্রাংশ সর্বোচ্চ ৪০ ইঞ্চি x ৪০ ইঞ্চি (১,০০০ মিমি x ১,০০০ মিমি)',
  '0.5 oz (14 g) to 500 lbs (227 kg)',
  '০.৫ আউন্স (১৪ গ্রাম) থেকে ৫০০ পাউন্ড (২২৭ কেজি)',
  '±0.005 in (0.127 mm) per inch',
  '±০.০০৫ ইঞ্চি (০.১২৭ মিমি) প্রতি ইঞ্চিতে',
  '["Turbine blades", "Impellers", "Instrumentation manifolds", "Biomedical prosthetics", "Aerospace brackets"]'::jsonb,
  '["টারবাইন ব্লেড", "ইম্পেলার", "ইন্সট্রুমেন্টেশন ম্যানিফোল্ড", "বায়োমেডিকেল সামগ্রী", "মহাকাশ ব্র্যাকেট"]'::jsonb,
  '["Inconel 718", "Cobalt Alloy 6", "17-4 PH Stainless", "Hastelloy C-276"]'::jsonb,
  '["Aerospace & Defense", "Turbomachinery", "Medical Equipment", "High-Performance Fluid Control"]'::jsonb
)
ON CONFLICT (slug) DO NOTHING;

-- 3. Initial Technical Videos
INSERT INTO public.videos (
  id, title, title_bn, category, category_bn, description, description_bn,
  video_url, thumbnail_url, duration, tags, is_published
) VALUES
(
  'vid-1',
  'Centrifugal Casting: Molten Alloy Pouring at 1,600°C',
  'সেন্ট্রিফিউগাল কাস্টিং: ১৬০০ ডিগ্রি সেলসিয়াসে তরল ধাতু ঢালাই প্রক্রিয়া',
  'Foundry Process',
  'ফাউন্ড্রি প্রক্রিয়া',
  'Watch 80 G-force rotational mold filling and directional cooling in our Gazipur heavy casting plant.',
  'গাজীপুর ভারী কাস্টিং প্ল্যান্টে ৮০ জি-ফোর্স ঘূর্ণমান ছাঁচ ভরাট এবং দিকনির্দেশক শীতলীকরণ পর্যবেক্ষণ করুন।',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
  '03:45',
  '["Centrifugal", "Pouring", "Foundry", "Heavy Industry"]'::jsonb,
  true
),
(
  'vid-2',
  '10-Ton AOD Vessel Secondary Refining Cycle',
  '১০-টন এওডি ভেসেল সেকেন্ডারি রিফাইনিং চক্র',
  'Metallurgy & Refining',
  'ধাতুবিদ্যা ও পরিশোধন',
  'Argon-oxygen bubbling sequence for ultra-low carbon stainless steel decarburization.',
  'আল্ট্রা-লো কার্বন স্টেইনলেস স্টিলের জন্য আর্গন-অক্সিজেন বাবলিং ও সেকেন্ডারি রিফাইনিং সিকোয়েন্স।',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80',
  '04:15',
  '["AOD", "Refining", "Stainless Steel", "Decarburization"]'::jsonb,
  true
),
(
  'vid-3',
  '5-Axis CNC Machining of Severe Service Valve Bodies',
  'সিভিয়ার সার্ভিস ভালভ বডির ৫-অ্যাক্সিস সিএনসি মেশিনিং',
  'Precision Machining',
  'প্রিসিশন মেশিনিং',
  'Toshiba horizontal boring mill executing high-precision assembly tolerances on duplex stainless components.',
  'তোশিবা হরাইজন্টাল বোরিং মিলের মাধ্যমে ডুপ্লেক্স স্টেইনলেস স্টিলে উচ্চ নির্ভুলতা সম্পন্ন সিএনসি মেশিনিং।',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
  '05:20',
  '["CNC Machining", "5-Axis", "Valves", "Precision Tooling"]'::jsonb,
  true
),
(
  'vid-4',
  'Cryogenic Charpy V-Notch Impact & Radiographic NDT Testing',
  'ক্রায়োজেনিক চার্পি ভি-নচ ইমপ্যাক্ট ও রেডিওগ্রাফিক এনডিটি টেস্ট',
  'Quality Assurance',
  'গুণমান নিশ্চিতকরণ',
  'Rigorous ASTM E23 sub-zero impact toughness testing down to -196°C and radiographic digital scanning.',
  'মাইনাস ১৯৬ ডিগ্রি সেলসিয়াস পর্যন্ত চার্পি টেস্ট এবং রেডিওগ্রাফিক ডিজিটাল স্ক্যানিংয়ের মাধ্যমে গুণমান পরীক্ষা।',
  'https://www.youtube.com/embed/dQw4w9WgXcQ',
  'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
  '02:50',
  '["Charpy Testing", "Cryogenic", "NDT", "ASTM E23", "Radiography"]'::jsonb,
  true
)
ON CONFLICT (id) DO NOTHING;
