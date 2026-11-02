import React from 'react';
import { PageRoute } from '../types/navigation';
import { CAPABILITIES, CapabilityItem } from '../data/siteData';
import { AskTheExpertsBand } from '../components/AskTheExpertsBand';
import { 
  ChevronRight, ArrowRight, ShieldCheck, Cpu, Microscope, 
  Flame, Settings, Wrench, GraduationCap, CheckCircle 
} from 'lucide-react';

import { IMAGES } from '../assets/images';
import { PageHero } from '../components/PageHero';
import { IndustrialIcon } from '../components/IndustrialIcon';

interface CapabilityDetailViewProps {
  slug?: string;
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: (prefill?: { alloy?: string; process?: string }) => void;
}

export const CapabilityDetailView: React.FC<CapabilityDetailViewProps> = ({ slug, onNavigate, onOpenRfq }) => {
  const currentCap: CapabilityItem | undefined = CAPABILITIES.find(c => c.slug === slug);

  // If no slug, show Capabilities Overview Hub
  if (!slug || !currentCap) {
    return (
      <div className="space-y-8 pb-12">
        {/* Full-width 400px Hero */}
        <PageHero
          title="Capabilities"
          badge="Engineering & Manufacturing"
          subtitle="Comprehensive metallurgical, machining, 3D printing, and testing facilities under one roof"
          imageSrc={IMAGES.capabilitiesOverview}
          imageAlt="Manufacturing and Engineering Capabilities at Metal Tech BD"
        />

        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8]">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">Capabilities</span>
          </nav>

          {/* Capabilities Grid (Center-Aligned) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {CAPABILITIES.map((cap) => {
              const iconKey = 
                cap.slug === 'metallurgy-engineering' || cap.slug === 'casting-simulation' ? 'metallurgy' :
                cap.slug === 'heat-treatment' ? 'heat-treatment' :
                cap.slug === 'metal-machining' || cap.slug === 'precision-cnc-machining' ? 'machining' :
                cap.slug === 'additive-manufacturing' || cap.slug === '3d-sand-printing' ? 'additive' :
                cap.slug === 'metal-testing-analysis' || cap.slug === 'metallurgical-testing' ? 'testing' :
                cap.slug === 'metal-fabrication' || cap.slug === 'aod-refining' ? 'fabrication' :
                cap.slug === 'training' ? 'quality' : 'default';

              return (
                <div
                  key={cap.slug}
                  onClick={() => onNavigate({ view: 'capabilities', subSlug: cap.slug })}
                  className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center group"
                >
                  <div className="flex flex-col items-center text-center w-full">
                    <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      <IndustrialIcon name={iconKey} className="w-16 h-16 sm:w-20 sm:h-20" />
                    </div>
                    <span className="text-[11px] font-bold uppercase text-[#1D4ED8] tracking-wider block mb-1">
                      Technical Capability
                    </span>
                    <h3 className="text-xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                      {cap.title}
                    </h3>
                    <div className="w-16 h-[2px] bg-[#004B87] my-3.5 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                    <p className="text-xs sm:text-sm text-[#5B6470] leading-relaxed m-0 text-center max-w-xs">
                      {cap.summary}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D4ED8] group-hover:text-[#004B87]">
                    <span>Explore Service</span>
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

  // Determine capability-specific high-resolution photography asset
  const capImage = 
    currentCap.slug === 'additive-manufacturing' || currentCap.slug === '3d-sand-printing' ? IMAGES.sandPrinting3D :
    currentCap.slug === 'metal-machining' || currentCap.slug === 'precision-cnc-machining' ? IMAGES.precisionCnc :
    currentCap.slug === 'heat-treatment' ? IMAGES.heatTreatment :
    currentCap.slug === 'metal-testing-analysis' || currentCap.slug === 'metallurgical-testing' ? IMAGES.metallurgicalTesting :
    currentCap.slug === 'metallurgy-engineering' || currentCap.slug === 'casting-simulation' ? IMAGES.castingSimulation :
    currentCap.slug === 'metal-fabrication' || currentCap.slug === 'aod-refining' ? IMAGES.aodRefining :
    currentCap.slug === 'training' ? IMAGES.careersTraining :
    IMAGES.capabilitiesOverview;

  // Capability Detail Page
  return (
    <div className="space-y-8 pb-12">
      {/* Full-width 400px Hero strictly matching rules */}
      <PageHero
        title={currentCap.title}
        badge="Technical Capability"
        subtitle={currentCap.summary}
        imageSrc={capImage}
        imageAlt={`${currentCap.title} at Metal Tech BD`}
      />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb & Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8]">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button onClick={() => onNavigate({ view: 'capabilities' })} className="hover:text-[#1D4ED8]">Capabilities</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">{currentCap.title}</span>
          </nav>

          <button
            onClick={() => onOpenRfq({ process: currentCap.title })}
            className="px-4 py-2 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer self-start sm:self-auto"
          >
            Request a Proposal
          </button>
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F1B2D] m-0">
                Service Overview & Industrial Standards
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed m-0">
                {currentCap.description}
              </p>
            </div>

            {/* Equipment Highlights */}
            <div className="bg-white border border-[#D9DCE1] rounded-sm p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] pb-2 border-b border-slate-100 m-0">
                Plant Equipment & Tooling Highlights
              </h3>
              <ul className="space-y-2 text-xs">
                {currentCap.equipmentHighlights.map((eq, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700">
                    <CheckCircle className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5" />
                    <span className="font-medium">{eq}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications & Standards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#F3F4F6] rounded-sm p-4 space-y-2">
                <span className="text-xs font-bold uppercase text-[#0F1B2D] block">Key Specifications</span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {currentCap.specifications.map((spec, idx) => (
                    <li key={idx}>• {spec}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F3F4F6] rounded-sm p-4 space-y-2">
                <span className="text-xs font-bold uppercase text-[#0F1B2D] block">Governing Standards</span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {currentCap.standards.map((std, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-white border border-slate-200 rounded text-xs font-semibold text-slate-800">
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Rail */}
          <div className="space-y-6">
            <div className="bg-white border border-[#D9DCE1] rounded-sm p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] pb-2 border-b border-slate-100 m-0">
                Other Capabilities
              </h3>
              <div className="space-y-1 text-xs">
                {CAPABILITIES.filter(c => c.slug !== slug).map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => onNavigate({ view: 'capabilities', subSlug: c.slug })}
                    className="w-full text-left p-2 rounded hover:bg-slate-50 text-slate-700 hover:text-[#1D4ED8] font-medium flex items-center justify-between"
                  >
                    <span>{c.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#0F1B2D] text-white p-5 rounded-sm space-y-3">
              <span className="text-xs font-bold text-[#F5B800] uppercase block">Need Technical Assistance?</span>
              <p className="text-xs text-slate-300 m-0">
                Contact our engineering liaison for turnkey processing quotes and capacity booking.
              </p>
              <button
                onClick={() => onOpenRfq({ process: currentCap.title })}
                className="w-full py-2.5 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer"
              >
                Inquire for {currentCap.title}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AskTheExpertsBand
        onContactClick={() => onNavigate({ view: 'contact-us' })}
        onRfqClick={() => onOpenRfq({ process: currentCap.title })}
      />
    </div>
  );
};
