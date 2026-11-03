import React from 'react';
import { PageRoute } from '../types/navigation';
import { MARKET_SOLUTIONS, MarketItem } from '../data/siteData';
import { AskTheExpertsBand } from '../components/AskTheExpertsBand';
import { ChevronRight, ArrowRight, ShieldCheck, Globe, Check, Phone, Mail } from 'lucide-react';

import { IMAGES } from '../assets/images';
import { PageHero } from '../components/PageHero';
import { IndustrialIcon } from '../components/IndustrialIcon';

interface MarketDetailViewProps {
  slug?: string;
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: (prefill?: { alloy?: string; process?: string }) => void;
}

export const MarketDetailView: React.FC<MarketDetailViewProps> = ({ slug, onNavigate, onOpenRfq }) => {
  const currentMarket: MarketItem | undefined = MARKET_SOLUTIONS.find(
    m =>
      m.slug === slug ||
      (slug === 'locomotives-and-wagons' && m.slug === 'railway') ||
      (slug === 'locomotive' && m.slug === 'railway') ||
      (slug === 'ships-and-vessel' && m.slug === 'navy-marine') ||
      (slug === 'marine-defense' && m.slug === 'navy-marine') ||
      (slug === 'buss-and-truck-break' && m.slug === 'heavy-vehicles') ||
      (slug === 'truck-bus-brake' && m.slug === 'heavy-vehicles') ||
      (slug === 'pumps-and-valves' && m.slug === 'industry') ||
      (slug === 'industrial-equipment' && m.slug === 'industry')
  );

  // If no slug, show Market Solutions Hub
  if (!slug || !currentMarket) {
    return (
      <div className="space-y-8 pb-12">
        {/* Full-width 400px Hero */}
        <PageHero
          title="Market Solutions"
          badge="Industry Sectors"
          subtitle="Specialized metallurgical components engineered for the world's most demanding applications"
          imageSrc={IMAGES.marketSolutionsOverview}
          imageAlt="Engineered Heavy Market Solutions at Metal Tech BD"
        />

        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-6">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8]">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">Market Solutions</span>
          </nav>

          {/* Market Solutions Grid (Center-Aligned) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {MARKET_SOLUTIONS.map((mkt) => {
              const iconKey = 
                mkt.slug === 'railway' ? 'railway' :
                mkt.slug === 'navy-marine' ? 'navy-marine' :
                mkt.slug === 'heavy-vehicles' ? 'heavy-vehicles' :
                mkt.slug === 'industry' ? 'industry' : 'default';

              return (
                <div
                  key={mkt.slug}
                  onClick={() => onNavigate({ view: 'market-solutions', subSlug: mkt.slug })}
                  className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-7 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center group"
                >
                  <div className="flex flex-col items-center text-center w-full">
                    <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      <IndustrialIcon name={iconKey} className="w-16 h-16 sm:w-20 sm:h-20" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#1D4ED8] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100 block mb-2">
                      {mkt.categoryTag || 'Sector Solution'}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight leading-snug min-h-[48px] flex items-center justify-center">
                      {mkt.title}
                    </h3>
                    <div className="w-16 h-[2px] bg-[#004B87] my-3 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                    <p className="text-xs sm:text-sm text-[#5B6470] leading-relaxed m-0 text-center">
                      {mkt.summary}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D4ED8] group-hover:text-[#004B87]">
                    <span>Explore Sector Specs</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <AskTheExpertsBand
          onContactClick={() => onNavigate({ view: 'contact-us' })}
          onRfqClick={() => onOpenRfq()}
        />
      </div>
    );
  }

  // Determine market-specific photography asset
  const marketImage = 
    currentMarket.slug === 'railway' ? IMAGES.railway :
    currentMarket.slug === 'navy-marine' ? IMAGES.navyMarine :
    currentMarket.slug === 'heavy-vehicles' ? IMAGES.heavyVehicles :
    currentMarket.slug === 'industry' ? IMAGES.industry :
    IMAGES.marketSolutionsOverview;

  // Market Detail Page
  return (
    <div className="space-y-8 pb-12">
      {/* Full-width 400px Hero strictly matching rules */}
      <PageHero
        title={currentMarket.title}
        badge={currentMarket.categoryTag || "Sector Solution"}
        subtitle={currentMarket.summary}
        imageSrc={marketImage}
        imageAlt={`${currentMarket.title} solutions at Metal Tech BD`}
      />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb & Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8]">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button onClick={() => onNavigate({ view: 'market-solutions' })} className="hover:text-[#1D4ED8]">Market Solutions</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">{currentMarket.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenRfq({ process: currentMarket.title })}
              className="px-4 py-2 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer"
            >
              Request a Quote
            </button>
            <button
              onClick={() => onNavigate({ view: 'sales-contacts', marketSlug: currentMarket.salesContactMarketSlug })}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F1B2D] text-xs font-semibold rounded-sm transition-colors"
            >
              Account Manager
            </button>
          </div>
        </div>

        {/* Market Content: Challenges vs Solutions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-red-50/60 border border-red-100 rounded-sm p-5 space-y-2">
                <span className="text-xs font-bold uppercase text-red-700 block">Critical Operating Challenges</span>
                <p className="text-xs text-slate-700 leading-relaxed m-0">
                  {currentMarket.challenges}
                </p>
              </div>

              <div className="bg-blue-50/60 border border-blue-100 rounded-sm p-5 space-y-2">
                <span className="text-xs font-bold uppercase text-[#1D4ED8] block">Metal Tech BD Solutions</span>
                <p className="text-xs text-slate-700 leading-relaxed m-0">
                  {currentMarket.solutions}
                </p>
              </div>
            </div>

            {/* Typical Components Supplied */}
            <div className="bg-white border border-[#D9DCE1] rounded-sm p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] pb-2 border-b border-slate-100 m-0">
                Components Regularly Supplied for {currentMarket.title}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentMarket.componentsSupplied.map((comp, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 bg-[#F3F4F6] rounded-sm text-xs text-slate-800">
                    <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Alloys */}
            <div className="bg-white border border-[#D9DCE1] rounded-sm p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] pb-2 border-b border-slate-100 m-0">
                Recommended Metallurgical Alloys
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentMarket.recommendedAlloys.map((alloy, idx) => (
                  <button
                    key={idx}
                    onClick={() => onNavigate({ view: 'alloys' })}
                    className="px-3 py-1.5 bg-slate-100 hover:bg-[#1D4ED8] hover:text-white rounded-sm text-xs font-medium text-slate-700 transition-colors"
                  >
                    {alloy} →
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Rail: Direct Account Manager Connection */}
          <div className="space-y-6">
            <div className="bg-[#0F1B2D] text-white p-5 rounded-sm space-y-3">
              <span className="text-xs font-bold text-[#F5B800] uppercase block">
                Dedicated Sector Lead
              </span>
              <p className="text-xs text-slate-300 m-0 leading-relaxed">
                Our {currentMarket.title} engineering sales division provides rapid RFQ turnaround and direct CAD review.
              </p>
              <button
                onClick={() => onNavigate({ view: 'sales-contacts', marketSlug: currentMarket.salesContactMarketSlug })}
                className="w-full py-2.5 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer"
              >
                View Key Account Manager
              </button>
            </div>

            <div className="bg-white border border-[#D9DCE1] rounded-sm p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] pb-2 border-b border-slate-100 m-0">
                Other Market Sectors
              </h3>
              <div className="space-y-1 text-xs">
                {MARKET_SOLUTIONS.filter(m => m.slug !== slug).map((m) => (
                  <button
                    key={m.slug}
                    onClick={() => onNavigate({ view: 'market-solutions', subSlug: m.slug })}
                    className="w-full text-left p-2 rounded hover:bg-slate-50 text-slate-700 hover:text-[#1D4ED8] font-medium flex items-center justify-between"
                  >
                    <span>{m.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AskTheExpertsBand
        onContactClick={() => onNavigate({ view: 'contact-us' })}
        onRfqClick={() => onOpenRfq({ process: currentMarket.title })}
      />
    </div>
  );
};
