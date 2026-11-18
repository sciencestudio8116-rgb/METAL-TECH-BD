import React from 'react';
import { PageRoute } from '../types/navigation';
import { CAPABILITIES, MARKET_SOLUTIONS } from '../data/siteData';
import { IMAGES } from '../assets/images';
import {
  ArrowRight,
  ChevronRight,
  Briefcase,
  Microscope,
} from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { IndustrialIcon } from '../components/IndustrialIcon';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

interface HomeViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: (prefill?: { alloy?: string; process?: string }) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenRfq }) => {
  const { isBn } = useLanguage();
  const { capabilityCards, marketCards } = useAdmin();

  const activeCapabilities = (
    capabilityCards && capabilityCards.length > 0 ? capabilityCards : CAPABILITIES
  ).slice(0, 6);

  const activeMarkets = marketCards && marketCards.length > 0 ? marketCards : MARKET_SOLUTIONS;

  const getCapabilityIconKey = (slug: string) => {
    if (slug === 'metallurgy-engineering' || slug === 'casting-simulation') return 'metallurgy';
    if (slug === 'heat-treatment') return 'heat-treatment';
    if (slug === 'metal-machining' || slug === 'precision-cnc-machining') return 'machining';
    if (slug === 'additive-manufacturing' || slug === '3d-sand-printing') return 'additive';
    if (slug === 'metal-testing-analysis' || slug === 'metallurgical-testing') return 'testing';
    if (slug === 'metal-fabrication' || slug === 'aod-refining') return 'fabrication';
    if (slug === 'training') return 'quality';
    return 'default';
  };

  const getMarketImage = (slug: string) => {
    if (slug === 'railway' || slug === 'locomotive') return IMAGES.railwayCard;
    if (slug === 'navy-marine' || slug === 'ships-and-vessel') return IMAGES.navyMarineCard;
    if (slug === 'heavy-vehicles' || slug === 'buss-and-truck-break') return IMAGES.heavyVehiclesCard;
    if (slug === 'industry' || slug === 'pumps-and-valves') return IMAGES.industryCard;
    return IMAGES.industryCard;
  };

  const getMarketIconKey = (slug: string) => {
    if (slug === 'railway' || slug === 'locomotive') return 'railway';
    if (slug === 'navy-marine' || slug === 'ships-and-vessel') return 'navy-marine';
    if (slug === 'heavy-vehicles' || slug === 'buss-and-truck-break') return 'heavy-vehicles';
    if (slug === 'industry' || slug === 'pumps-and-valves') return 'industry';
    return 'default';
  };

  const secondarySectors = [
    {
      icon: 'power',
      title: isBn ? 'জ্বালানি ও বিদ্যুৎ উৎপাদন' : 'Energy & Power Generation',
      subtitle: isBn ? 'টারবাইন রিং ও হাইড্রো যন্ত্রাংশ' : 'Turbine rings, hydro & power housings',
    },
    {
      icon: 'oil-gas',
      title: isBn ? 'পেট্রোকেমিক্যাল ও তেল-গ্যাস' : 'Petrochemical & Oil / Gas',
      subtitle: isBn ? 'রিফর্মার টিউব ও সাওয়ার-গ্যাস অ্যালয়' : 'Reformer tubes & sour-gas pressure parts',
    },
    {
      icon: 'defense',
      title: isBn ? 'অ্যারোস্পেস ও প্রতিরক্ষা' : 'Aerospace & Defense',
      subtitle: isBn ? 'হাই-ইন্টিগ্রিটি সুপারঅ্যালয় কাস্টিং' : 'High-integrity superalloy castings',
    },
    {
      icon: 'paper-steel',
      title: isBn ? 'খনিজ, কাগজ ও ইস্পাত' : 'Mining, Pulp & Steel Mills',
      subtitle: isBn ? 'ক্ষয়-প্রতিরোধী রোল ও স্লারি পাম্প' : 'Wear-resistant shells & slurry impellers',
    },
  ];

  return (
    <div className="w-full">
      {/* 1. HERO SECTION */}
      <PageHero
        title="Metal Tech BD"
        imageSrc={IMAGES.homeHero}
        imageAlt="Precision molten metal centrifugal and sand casting foundry at Metal Tech BD"
        height="auto"
      />

      {/* 2. "WHAT WE DO" — CAPABILITIES GRID SECTION */}
      <section className="py-16 md:py-24 bg-white border-t border-slate-200/80">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="w-16 h-1 bg-[#F5B800] mb-3" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1B2D] tracking-tight m-0">
                  {isBn ? 'আমাদের কার্যক্রম ও সক্ষমতা' : 'What We Do'}
                </h2>
              </div>

              <button
                onClick={() => onNavigate({ view: 'capabilities' })}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1D4ED8] hover:text-[#0F1B2D] transition-colors whitespace-nowrap cursor-pointer group self-start sm:self-auto"
              >
                <span>{isBn ? 'সকল সক্ষমতা দেখুন' : 'View All Capabilities'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="w-full text-slate-600 text-sm sm:text-base m-0 leading-relaxed text-justify">
              {isBn
                ? 'মেটাল টেক বিডি আধুনিক বৈশ্বিক অবকাঠামো ও ভারী শিল্প খাতের অত্যন্ত চাহিদাসম্পন্ন ও গুরুত্বপূর্ণ অ্যাপ্লিকেশনের জন্য উচ্চ-নির্ভরযোগ্য মেটাল কম্পোনেন্ট উৎপাদন করে। অত্যাধুনিক আর্গন অক্সিজেন ডিকার্বুরাইজেশন (AOD) সেকেন্ডারি রিফাইনিং, ম্যাগমাসফট সলিডিফিকেশন সিমুলেশন, সেন্ট্রিফিউগাল ও স্যান্ড কাস্টিং, ৫-অ্যাক্সিস সিএনসি মেশিনিং এবং এএসএনটি লেভেল-৩ নন-ডেস্ট্রাকটিভ টেস্টিং সুবিধার সমন্বয়ে আমরা প্রাথমিক অ্যালয় নির্বাচন ও ডিজাইন সহযোগিতা থেকে শুরু করে সার্টিফাইড টার্নকি ডেলিভারি পর্যন্ত প্রতিটি ধাপে গ্রাহকদের সাথে নিবিড়ভাবে কাজ করি।'
                : 'Metal Tech BD manufactures critical, high-integrity metal components for the most demanding industrial applications that power, protect, and connect modern global infrastructure. Combining Argon Oxygen Decarburization (AOD) secondary refining, MagmaSoft solidification simulation, centrifugal and sand casting, precision 5-axis CNC machining, and ASNT Level III non-destructive testing under one roof, we collaborate relentlessly with our customers across the entire engineering lifecycle—from initial alloy selection and design optimization through certified turnkey delivery.'}
            </p>
          </div>

          {/* 6 Capability Square Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeCapabilities.map((cap) => {
              const iconKey = getCapabilityIconKey(cap.slug);
              const title = isBn && cap.titleBn ? cap.titleBn : cap.title;
              const summary = isBn && cap.summaryBn ? cap.summaryBn : cap.summary;

              return (
                <div
                  key={cap.slug}
                  onClick={() => onNavigate({ view: 'capabilities', subSlug: cap.slug })}
                  className="aspect-square rounded-xl border border-slate-200 hover:border-[#1D4ED8] hover:ring-1 hover:ring-[#1D4ED8]/20 bg-white p-5 sm:p-6 flex flex-col items-center justify-between text-center shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex flex-col items-center text-center w-full">
                    <div className="mb-3 transform group-hover:scale-105 transition-transform duration-300">
                      <IndustrialIcon name={iconKey} className="w-12 h-12 sm:w-14 sm:h-14" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight leading-snug">
                      {title}
                    </h3>
                    <div className="w-12 h-[2px] bg-[#004B87] my-2.5 mx-auto rounded-full group-hover:w-16 transition-all duration-300" />
                    <p className="text-xs sm:text-[13px] text-[#5B6470] leading-relaxed m-0 text-center max-w-xs">
                      {summary}
                    </p>
                  </div>

                  <div className="pt-2 w-full flex justify-center">
                    <span className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-slate-50 border border-slate-200/80 text-xs font-bold text-[#1D4ED8] group-hover:bg-[#1D4ED8] group-hover:text-white group-hover:border-[#1D4ED8] transition-all duration-200">
                      <span>{isBn ? 'বিস্তারিত দেখুন' : `Explore ${cap.title.split(' ')[0]}`}</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. "SECTORS WE SERVE" — INDUSTRIAL SECTORS & APPLICATIONS */}
      <section className="py-16 md:py-24 bg-[#F3F4F6] border-t border-[#D9DCE1]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="w-16 h-1 bg-[#F5B800] mb-3" />
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1B2D] tracking-tight m-0">
                  {isBn ? 'আমরা যেসব খাতে সেবা দিই' : 'Sectors We Serve'}
                </h2>
              </div>

              <button
                onClick={() => onNavigate({ view: 'market-solutions' })}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#1D4ED8] hover:text-[#0F1B2D] transition-colors whitespace-nowrap cursor-pointer group self-start sm:self-auto"
              >
                <span>{isBn ? 'সব মার্কেট সলিউশন দেখুন' : 'All Market Solutions'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <p className="w-full text-slate-600 text-sm sm:text-base m-0 leading-relaxed text-justify">
              {isBn
                ? 'মেটাল টেক বিডি জ্বালানি, প্রতিরক্ষা, অ্যারোস্পেস, নৌ ও সামুদ্রিক প্রপালশন, জাতীয় রেলওয়ে রোলিং স্টক এবং ভারী শিল্প খাতের সবচেয়ে চাহিদাসম্পন্ন ও ঝুঁকিপূর্ণ পরিবেশের জন্য বিশেষায়িত ধাতব যন্ত্রাংশ ও ইঞ্জিনিয়ারিং সমাধান প্রদান করে। প্রতিটি কাস্টিং ও মেশিনড অ্যাসেম্বলি কঠোর আন্তর্জাতিক মানদণ্ড (ASTM, EN, NACE ও মেরিন ক্লাসিফিকেশন) অনুসারে উৎপাদিত হয়, যা চরম চাপ, ক্ষয় ও তাপমাত্রায় অতুলনীয় স্থায়িত্ব ও কাঠামোগত নির্ভরযোগ্যতা নিশ্চিত করে।'
                : 'Metal Tech BD delivers specialized metallurgical components engineered for the world’s most demanding operating environments across energy, defense, aerospace, marine propulsion, national railway rolling stock, and heavy industrial sectors. Every casting and finish-machined assembly is manufactured and tested to strict international specifications—including ASTM, EN, NACE, and marine classification codes—ensuring unmatched corrosion resistance, thermal stability, and structural durability under extreme service loads.'}
            </p>
          </div>

          {/* Primary 4 Sector Cards with Clean Text-Free Industrial Photography */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeMarkets.map((mkt) => {
              const marketImage = getMarketImage(mkt.slug);
              const iconKey = getMarketIconKey(mkt.slug);
              const title = isBn && mkt.titleBn ? mkt.titleBn : mkt.title;
              const summary = isBn && mkt.summaryBn ? mkt.summaryBn : mkt.summary;
              const categoryTag =
                isBn && mkt.categoryTagBn
                  ? mkt.categoryTagBn
                  : mkt.categoryTag || (isBn ? 'শিল্প খাত' : 'Industry Sector');

              return (
                <div
                  key={mkt.slug}
                  onClick={() => onNavigate({ view: 'market-solutions', subSlug: mkt.slug })}
                  className="bg-white border border-slate-200 hover:border-[#1D4ED8] hover:ring-1 hover:ring-[#1D4ED8]/20 rounded-xl overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col group"
                >
                  {/* Card Visual Banner (Clean Text-Free Industrial Photo + UI Overlay Badge) */}
                  <div className="relative h-44 bg-[#0F1B2D] overflow-hidden shrink-0">
                    <img
                      src={marketImage}
                      alt={title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F1B2D]/75 via-[#0F1B2D]/15 to-transparent" />
                    <div className="absolute top-3 left-3 bg-[#0F1B2D]/90 border border-slate-700/80 text-[#F5B800] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-[3px] shadow-xs">
                      {categoryTag}
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex-1 flex flex-col items-center justify-between text-center">
                    <div className="flex flex-col items-center w-full">
                      <div className="mb-3 -mt-11 relative z-10 w-14 h-14 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                        <IndustrialIcon name={iconKey} className="w-10 h-10" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight leading-snug">
                        {title}
                      </h3>
                      <div className="w-12 h-[2px] bg-[#004B87] my-3 mx-auto rounded-full group-hover:w-16 transition-all duration-300" />
                      <p className="text-xs sm:text-sm text-[#5B6470] leading-relaxed m-0 text-center">
                        {summary}
                      </p>
                    </div>

                    <div className="pt-5 mt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D4ED8] group-hover:text-[#004B87]">
                      <span>{isBn ? 'বিস্তারিত দেখুন' : 'Explore Sector'}</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Critical Sectors Strip (Energy, Petrochemical, Aerospace & Defense, Mining/Steel) */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-6 border-b border-slate-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                {isBn ? 'অন্যান্য গুরুত্বপূর্ণ বৈশ্বিক খাত' : 'Additional Critical Industrial Sectors Served'}
              </span>
              <span className="text-xs text-slate-500">
                {isBn ? 'এএসটিএম, এন ও নেস মানদণ্ড অনুযায়ী' : 'Certified to ASTM, EN & NACE Standards'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {secondarySectors.map((sector, idx) => (
                <div
                  key={idx}
                  onClick={() => onNavigate({ view: 'market-solutions' })}
                  className="flex items-center gap-3.5 p-3.5 rounded-lg bg-slate-50/50 hover:bg-[#F8FAFC] border border-slate-200 hover:border-[#1D4ED8] hover:ring-1 hover:ring-[#1D4ED8]/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="shrink-0 transform group-hover:scale-105 transition-transform duration-200">
                    <IndustrialIcon name={sector.icon} className="w-12 h-12" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 leading-snug">
                      {sector.title}
                    </h4>
                    <p className="text-xs text-[#5B6470] m-0 mt-0.5 leading-snug">
                      {sector.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. STREAMLINED CAREERS & ASK THE METAL EXPERT SECTION (ABOVE FOOTER) */}
      <section className="bg-white py-16 md:py-24 border-t border-slate-200">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1: Careers */}
            <div className="bg-slate-50/70 border border-slate-200 hover:border-[#1D4ED8] hover:ring-1 hover:ring-[#1D4ED8]/20 rounded-xl p-8 sm:p-10 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">
                  <Briefcase className="w-4 h-4 text-[#1D4ED8]" />
                  <span>{isBn ? 'ক্যারিয়ার' : 'Careers'}</span>
                </div>

                <h2 className="text-2xl font-extrabold text-[#0F1B2D] tracking-tight m-0">
                  {isBn
                    ? 'আমাদের ইঞ্জিনিয়ারিং ও ফাউন্ড্রি টিমে যোগ দিন'
                    : 'Join Our Engineering & Foundry Team'}
                </h2>

                <p className="text-sm text-[#475569] leading-relaxed m-0">
                  {isBn
                    ? 'ঢাকা হেডকোয়ার্টার ও গাজীপুর ফাউন্ড্রিতে মেটালার্জি, সিএনসি মেশিনিং এবং কোয়ালিটি ইঞ্জিনিয়ারিংয়ে ক্যারিয়ার গড়ুন।'
                    : 'Build your engineering career across our Dhaka headquarters and Gazipur foundry complex in metallurgy, CNC machining, and quality assurance.'}
                </p>
              </div>

              <div>
                <button
                  onClick={() => onNavigate({ view: 'careers' })}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-sm font-bold rounded-md shadow-xs transition-all duration-200 active:scale-[0.98] cursor-pointer group"
                >
                  <span>{isBn ? 'ক্যারিয়ার সুযোগ দেখুন' : 'Explore Careers'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Card 2: Ask the Metal Expert */}
            <div className="bg-slate-50/70 border border-slate-200 hover:border-[#1D4ED8] hover:ring-1 hover:ring-[#1D4ED8]/20 rounded-xl p-8 sm:p-10 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">
                  <Microscope className="w-4 h-4 text-[#1D4ED8]" />
                  <span>{isBn ? 'ধাতু বিশেষজ্ঞ পরামর্শ' : 'Metal Tek Expert'}</span>
                </div>

                <h2 className="text-2xl font-extrabold text-[#0F1B2D] tracking-tight m-0">
                  {isBn ? 'ধাতু বিশেষজ্ঞকে জিজ্ঞাসা করুন' : 'Ask the Metal Expert'}
                </h2>

                <p className="text-sm text-[#475569] leading-relaxed m-0">
                  {isBn
                    ? 'উচ্চ তাপমাত্রা, ক্ষয়প্রতিরোধী অ্যালয় নির্বাচন বা কাস্টিং ডিজাইন সম্পর্কে আমাদের মেটালার্জিস্টদের সাথে সরাসরি পরামর্শ করুন।'
                    : 'Have questions on alloy selection, high-temperature durability, or casting feasibility? Submit your inquiry directly to our PhD metallurgists.'}
                </p>
              </div>

              <div>
                <button
                  onClick={() => onOpenRfq({ process: 'Metallurgical Expert Consultation' })}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-sm font-bold rounded-md shadow-xs transition-all duration-200 active:scale-[0.98] cursor-pointer group"
                >
                  <span>{isBn ? 'ধাতু বিশেষজ্ঞের পরামর্শ নিন' : 'Ask the Metal Expert'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
