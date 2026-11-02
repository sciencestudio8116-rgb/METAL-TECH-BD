import React from 'react';
import { PageRoute } from '../types/navigation';
import { 
  CASTING_PROCESSES, CAPABILITIES, MARKET_SOLUTIONS, 
  BLOG_POSTS, CASE_STUDIES, SITE_METADATA 
} from '../data/siteData';
import { IMAGES } from '../assets/images';
import { AskTheExpertsBand } from '../components/AskTheExpertsBand';
import { 
  ArrowRight, Shield, Award, CheckCircle2, Factory, 
  ExternalLink, Phone, FileText, ChevronRight, Download, Layers
} from 'lucide-react';

import { PageHero } from '../components/PageHero';
import { IndustrialIcon } from '../components/IndustrialIcon';

interface HomeViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: (prefill?: { alloy?: string; process?: string }) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate, onOpenRfq }) => {
  return (
    <div className="space-y-0">
      {/* 1. HERO SECTION - Clean Responsive Banner Display */}
      <PageHero
        title="Metal Tech BD"
        imageSrc={IMAGES.homeHero}
        imageAlt="Precision molten metal centrifugal and sand casting foundry at Metal Tech BD"
        height="auto"
      />

      {/* 2. TRUST STRIP & CAPACITY FIGURES */}
      <section className="bg-[#F3F4F6] border-b border-[#D9DCE1] py-8">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0F1B2D] tabular-nums block">
                22,000 kg
              </span>
              <span className="text-xs text-[#5B6470] font-medium block">
                Single Pour Pouring Capacity
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0F1B2D] tabular-nums block">
                10-Ton AOD
              </span>
              <span className="text-xs text-[#5B6470] font-medium block">
                Argon Oxygen Decarburization
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0F1B2D] tabular-nums block">
                ISO 9001:2015
              </span>
              <span className="text-xs text-[#5B6470] font-medium block">
                Bureau Veritas & ASME Certified
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#0F1B2D] tabular-nums block">
                100% MTC
              </span>
              <span className="text-xs text-[#5B6470] font-medium block">
                EN 10204 Type 3.1 Traceability
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "WHAT WE DO" - CAPABILITY CARDS (Center-Aligned with Vector Icons & Sleek Dividers) */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="space-y-3">
            <div className="w-16 h-1 bg-[#F5B800] mb-3"></div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1B2D] tracking-tight m-0">
              What We Do
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl m-0 leading-relaxed">
              Metal Tech BD manufactures critical metal components for the most demanding applications that power, protect, and connect our world. With unmatched capabilities and depth of experience, we work relentlessly with our customers throughout their entire journey – from design collaboration through delivery.
            </p>
          </div>

          {/* 6 Capability Cards Grid (Strictly center-aligned with top vector icon, title, divider, text, explore link) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Metallurgy & Engineering */}
            <div 
              onClick={() => onNavigate({ view: 'capabilities', subSlug: 'metallurgy-engineering' })}
              className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center group"
            >
              <div className="flex flex-col items-center text-center w-full">
                <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <IndustrialIcon name="metallurgy" className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
                <h3 className="text-xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                  Metallurgy & Engineering
                </h3>
                <div className="w-16 h-[2px] bg-[#004B87] my-3.5 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                <p className="text-sm text-[#5B6470] leading-relaxed m-0 text-center max-w-xs">
                  Integrated alloy and process expertise of more than 100 metallurgists and engineers
                </p>
              </div>
              <div className="mt-6 pt-2 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D4ED8] group-hover:text-[#004B87]">
                <span>Explore Metallurgy</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 2: Metal Casting */}
            <div 
              onClick={() => onNavigate({ view: 'metal-casting' })}
              className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center group"
            >
              <div className="flex flex-col items-center text-center w-full">
                <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <IndustrialIcon name="casting" className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
                <h3 className="text-xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                  Metal Casting
                </h3>
                <div className="w-16 h-[2px] bg-[#004B87] my-3.5 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                <p className="text-sm text-[#5B6470] leading-relaxed m-0 text-center max-w-xs">
                  Centrifugal, sand, and investment casting as well as high-integrity ingot
                </p>
              </div>
              <div className="mt-6 pt-2 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D4ED8] group-hover:text-[#004B87]">
                <span>Explore Metal Casting</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 3: Heat Treatment */}
            <div 
              onClick={() => onNavigate({ view: 'capabilities', subSlug: 'heat-treatment' })}
              className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center group"
            >
              <div className="flex flex-col items-center text-center w-full">
                <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <IndustrialIcon name="heat-treatment" className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
                <h3 className="text-xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                  Heat Treatment
                </h3>
                <div className="w-16 h-[2px] bg-[#004B87] my-3.5 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                <p className="text-sm text-[#5B6470] leading-relaxed m-0 text-center max-w-xs">
                  Technical expertise to give customers the material properties that they need
                </p>
              </div>
              <div className="mt-6 pt-2 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D4ED8] group-hover:text-[#004B87]">
                <span>Explore Heat Treatment</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 4: Metal Machining */}
            <div 
              onClick={() => onNavigate({ view: 'capabilities', subSlug: 'metal-machining' })}
              className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center group"
            >
              <div className="flex flex-col items-center text-center w-full">
                <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <IndustrialIcon name="machining" className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
                <h3 className="text-xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                  Metal Machining
                </h3>
                <div className="w-16 h-[2px] bg-[#004B87] my-3.5 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                <p className="text-sm text-[#5B6470] leading-relaxed m-0 text-center max-w-xs">
                  Over 200 machining centers to meet exact customer specifications
                </p>
              </div>
              <div className="mt-6 pt-2 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D4ED8] group-hover:text-[#004B87]">
                <span>Explore Metal Machining</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 5: Additive Manufacturing */}
            <div 
              onClick={() => onNavigate({ view: 'capabilities', subSlug: 'additive-manufacturing' })}
              className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center group"
            >
              <div className="flex flex-col items-center text-center w-full">
                <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <IndustrialIcon name="additive" className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
                <h3 className="text-xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                  Additive Manufacturing
                </h3>
                <div className="w-16 h-[2px] bg-[#004B87] my-3.5 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                <p className="text-sm text-[#5B6470] leading-relaxed m-0 text-center max-w-xs">
                  Rapid 3D sand printing and hybrid metal additive manufacturing for complex prototypes & tooling
                </p>
              </div>
              <div className="mt-6 pt-2 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D4ED8] group-hover:text-[#004B87]">
                <span>Explore Additive</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Card 6: Metal Testing & Analysis */}
            <div 
              onClick={() => onNavigate({ view: 'capabilities', subSlug: 'metal-testing-analysis' })}
              className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center group"
            >
              <div className="flex flex-col items-center text-center w-full">
                <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <IndustrialIcon name="testing" className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
                <h3 className="text-xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                  Metal Testing & Analysis
                </h3>
                <div className="w-16 h-[2px] bg-[#004B87] my-3.5 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                <p className="text-sm text-[#5B6470] leading-relaxed m-0 text-center max-w-xs">
                  ISO 17025 accredited laboratory with ASNT Level III non-destructive & cryogenic testing
                </p>
              </div>
              <div className="mt-6 pt-2 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D4ED8] group-hover:text-[#004B87]">
                <span>Explore Testing & Lab</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. "SECTORS WE SERVE" / "OUR MARKETS" - 4 EXACT SECTOR CARDS */}
      <section className="py-20 bg-[#F3F4F6] border-t border-b border-[#D9DCE1]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="space-y-3">
            <div className="w-16 h-1 bg-[#F5B800] mb-3"></div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F1B2D] tracking-tight m-0">
              Sectors We Serve
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl m-0 leading-relaxed">
              Supplying high-integrity castings and engineered components across critical rail, naval, commercial vehicle, and heavy industrial operations.
            </p>
          </div>

          {/* 4 Sector Cards - Center Aligned Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MARKET_SOLUTIONS.map((market) => {
              const iconKey = 
                market.slug === 'railway' ? 'railway' :
                market.slug === 'navy-marine' ? 'navy-marine' :
                market.slug === 'heavy-vehicles' ? 'heavy-vehicles' :
                market.slug === 'industry' ? 'industry' : 'default';

              return (
                <div
                  key={market.slug}
                  onClick={() => onNavigate({ view: 'market-solutions', subSlug: market.slug })}
                  className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center group"
                >
                  <div className="flex flex-col items-center text-center w-full">
                    {/* Top Vector Illustration / Icon */}
                    <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      <IndustrialIcon name={iconKey} className="w-16 h-16 sm:w-20 sm:h-20" />
                    </div>

                    {/* Category Tag */}
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 block mb-2">
                      {market.categoryTag}
                    </span>

                    {/* Card Title */}
                    <h3 className="text-lg sm:text-xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight leading-snug min-h-[48px] flex items-center justify-center">
                      {market.title}
                    </h3>

                    {/* Accent Divider Bar */}
                    <div className="w-16 h-[2px] bg-[#004B87] my-3 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-[#5B6470] leading-relaxed m-0 text-center">
                      {market.summary}
                    </p>
                  </div>

                  {/* Explore Link */}
                  <div className="pt-6 mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D4ED8] group-hover:text-[#004B87]">
                    <span>Explore Sector Specs</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Prompt: Don't see your market? */}
          <div className="p-6 bg-white border border-[#D9DCE1] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-base font-bold text-[#0F1B2D] m-0">
                Don't see your specific market or equipment application?
              </h4>
              <p className="text-xs text-slate-500 m-0 mt-0.5">
                We engineer custom castings for pulp & paper, mining slurry pumps, nuclear research, and defense ordnance.
              </p>
            </div>
            <button
              onClick={() => onNavigate({ view: 'sales-contacts' })}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              Take Me To More Markets
            </button>
          </div>
        </div>
      </section>

      {/* 5. VISUAL FOUNDRY SPOTLIGHT (With generated images) */}
      <section className="py-20 bg-white">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">
                Advanced Manufacturing Floor
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F1B2D] m-0">
                Precision Equipment & Plant Assets
              </h2>
            </div>
            <button
              onClick={() => onNavigate({ view: 'divisions' })}
              className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1"
            >
              <span>Tour All Facilities</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 3 Visual Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-[#D9DCE1] rounded-sm overflow-hidden bg-white shadow-xs hover:shadow-lg transition-all group flex flex-col items-center text-center">
              <div className="h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={IMAGES.centrifugalCasting}
                  alt="Precision centrifugal casting tube cylinder machining"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col items-center text-center w-full">
                <h4 className="text-base font-bold text-[#0F1B2D] m-0">
                  Centrifugal Casting Line
                </h4>
                <div className="w-12 h-[2px] bg-[#004B87] my-2.5 mx-auto rounded-full group-hover:w-16 transition-all duration-300" />
                <p className="text-xs text-slate-500 m-0 leading-relaxed text-center">
                  Horizontal and vertical spinners up to 3.0 m outer diameter for defect-free alloy tubes.
                </p>
              </div>
            </div>

            <div className="border border-[#D9DCE1] rounded-sm overflow-hidden bg-white shadow-xs hover:shadow-lg transition-all group flex flex-col items-center text-center">
              <div className="h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={IMAGES.machiningFacility}
                  alt="Heavy 5-axis CNC machining center milling valve casing"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col items-center text-center w-full">
                <h4 className="text-base font-bold text-[#0F1B2D] m-0">
                  5-Axis CNC Machining
                </h4>
                <div className="w-12 h-[2px] bg-[#004B87] my-2.5 mx-auto rounded-full group-hover:w-16 transition-all duration-300" />
                <p className="text-xs text-slate-500 m-0 leading-relaxed text-center">
                  Toshiba horizontal boring and Hankook vertical turning lathes for tight assembly tolerances.
                </p>
              </div>
            </div>

            <div className="border border-[#D9DCE1] rounded-sm overflow-hidden bg-white shadow-xs hover:shadow-lg transition-all group flex flex-col items-center text-center">
              <div className="h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={IMAGES.metallurgyLab}
                  alt="Optical emission spectrometer testing laboratory at Metal Tech BD"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col items-center text-center w-full">
                <h4 className="text-base font-bold text-[#0F1B2D] m-0">
                  Metallurgical Testing Lab
                </h4>
                <div className="w-12 h-[2px] bg-[#004B87] my-2.5 mx-auto rounded-full group-hover:w-16 transition-all duration-300" />
                <p className="text-xs text-slate-500 m-0 leading-relaxed text-center">
                  In-house optical emission spectrometry, LECO carbon/sulfur, and cryogenic impact rigs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. LATEST BLOGS & CASE STUDIES */}
      <section className="py-20 bg-[#F3F4F6] border-t border-[#D9DCE1]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">
                Technical Knowledge
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F1B2D] m-0">
                Latest Metallurgical Insights
              </h2>
            </div>
            <button
              onClick={() => onNavigate({ view: 'resources', subTab: 'blog' })}
              className="text-xs font-bold text-[#1D4ED8] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All Blogs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BLOG_POSTS.slice(0, 2).map((post) => (
              <div
                key={post.slug}
                onClick={() => onNavigate({ view: 'blog-post', slug: post.slug })}
                className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center group"
              >
                <div className="flex flex-col items-center text-center w-full space-y-3">
                  <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                    <span className="text-[#1D4ED8] font-bold">{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 leading-snug">
                    {post.title}
                  </h3>
                  <div className="w-16 h-[2px] bg-[#004B87] my-2 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                  <p className="text-xs sm:text-sm text-[#5B6470] leading-relaxed m-0 text-center max-w-md">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 mt-4 flex items-center justify-center gap-1.5 text-xs text-[#1D4ED8] font-bold group-hover:text-[#004B87]">
                  <span>Read Article &gt;&gt;</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CAREERS TEASER */}
      <section className="py-16 bg-white border-t border-[#D9DCE1]">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
          <div className="bg-[#0F1B2D] text-white rounded-sm p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#F5B800]">
                Engineering Culture
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white m-0">
                Join South Asia's Premier Foundry Engineering Team
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed m-0">
                We are continually recruiting metallurgists, CNC machinists, quality inspectors, and CAD tooling specialists for our expanding Gazipur and Dhaka operations.
              </p>
            </div>
            <button
              onClick={() => onNavigate({ view: 'careers' })}
              className="px-6 py-3 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors whitespace-nowrap cursor-pointer shrink-0"
            >
              Explore Open Careers
            </button>
          </div>
        </div>
      </section>

      {/* 8. PRE-FOOTER "ASK THE METAL EXPERTS" BAND */}
      <AskTheExpertsBand
        onContactClick={() => onNavigate({ view: 'contact-us' })}
        onRfqClick={() => onOpenRfq()}
      />
    </div>
  );
};
