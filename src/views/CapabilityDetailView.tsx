import React from 'react';
import { PageRoute } from '../types/navigation';
import { CAPABILITIES, CapabilityItem } from '../data/siteData';
import { AskTheExpertsBand } from '../components/AskTheExpertsBand';
import { 
  ChevronRight, ArrowRight, ShieldCheck, Cpu, Microscope, 
  Flame, Settings, Wrench, GraduationCap, CheckCircle 
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';

import { IMAGES } from '../assets/images';
import { PageHero } from '../components/PageHero';
import { IndustrialIcon } from '../components/IndustrialIcon';

interface CapabilityDetailViewProps {
  slug?: string;
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: (prefill?: { alloy?: string; process?: string }) => void;
}

export const CapabilityDetailView: React.FC<CapabilityDetailViewProps> = ({ slug, onNavigate, onOpenRfq }) => {
  const { isBn } = useLanguage();
  const { capabilityCards } = useAdmin();
  const activeCapabilities = capabilityCards && capabilityCards.length > 0 ? capabilityCards : CAPABILITIES;

  const currentCap: CapabilityItem | undefined = activeCapabilities.find(
    c =>
      c.slug === slug ||
      (slug === 'large-scale-machining' && c.slug === 'metal-machining') ||
      (slug === 'precision-cnc-machining' && c.slug === 'metal-machining') ||
      (slug === 'cad-solidification-modeling' && c.slug === 'metallurgy-engineering') ||
      (slug === 'metallurgical-testing-lab' && c.slug === 'metal-testing-analysis') ||
      (slug === 'thermal-heat-treatment' && c.slug === 'heat-treatment') ||
      (slug === '3d-sand-printing' && c.slug === 'additive-manufacturing')
  );

  // If no slug, show Capabilities Overview Hub
  if (!slug || !currentCap) {
    return (
      <div className="space-y-8 pb-12">
        {/* Full-width 400px Hero */}
        <PageHero
          title={isBn ? 'উৎপাদন ও ইঞ্জিনিয়ারিং সক্ষমতা' : 'Capabilities'}
          badge={isBn ? 'ইঞ্জিনিয়ারিং ও ম্যানুফ্যাকচারিং' : 'Engineering & Manufacturing'}
          subtitle={
            isBn
              ? 'একই ছাদের নিচে মেটালার্জিক্যাল, সিএনসি মেশিনিং, ৩ডি প্রিন্টিং ও ল্যাব টেস্টিং সুবিধা'
              : 'Comprehensive metallurgical, machining, 3D printing, and testing facilities under one roof'
          }
          imageSrc={IMAGES.capabilitiesOverview}
          imageAlt="Manufacturing and Engineering Capabilities at Metal Tech BD"
        />

        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8] cursor-pointer">
              {isBn ? 'নীড়পাতা' : 'Home'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">{isBn ? 'সক্ষমতাসমূহ' : 'Capabilities'}</span>
          </nav>

          {/* Capabilities Grid (Center-Aligned) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {activeCapabilities.map((cap) => {
              const iconKey = 
                cap.slug === 'metallurgy-engineering' || cap.slug === 'casting-simulation' ? 'metallurgy' :
                cap.slug === 'heat-treatment' ? 'heat-treatment' :
                cap.slug === 'metal-machining' || cap.slug === 'precision-cnc-machining' ? 'machining' :
                cap.slug === 'additive-manufacturing' || cap.slug === '3d-sand-printing' ? 'additive' :
                cap.slug === 'metal-testing-analysis' || cap.slug === 'metallurgical-testing' ? 'testing' :
                cap.slug === 'metal-fabrication' || cap.slug === 'aod-refining' ? 'fabrication' :
                cap.slug === 'training' ? 'quality' : 'default';

              const title = isBn && cap.titleBn ? cap.titleBn : cap.title;
              const summary = isBn && cap.summaryBn ? cap.summaryBn : cap.summary;

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
                      {isBn ? 'কারিগরি সক্ষমতা' : 'Technical Capability'}
                    </span>
                    <h3 className="text-xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                      {title}
                    </h3>
                    <div className="w-16 h-[2px] bg-[#004B87] my-3.5 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                    <p className="text-xs sm:text-sm text-[#5B6470] leading-relaxed m-0 text-center max-w-xs">
                      {summary}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D4ED8] group-hover:text-[#004B87]">
                    <span>{isBn ? 'সেবা বিস্তারিত দেখুন' : 'Explore Service'}</span>
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

  const currentTitle = isBn && currentCap.titleBn ? currentCap.titleBn : currentCap.title;
  const currentSummary = isBn && currentCap.summaryBn ? currentCap.summaryBn : currentCap.summary;
  const currentDesc = isBn && currentCap.descriptionBn ? currentCap.descriptionBn : currentCap.description;

  // Capability Detail Page
  return (
    <div className="space-y-8 pb-12">
      {/* Full-width 400px Hero strictly matching rules */}
      <PageHero
        title={currentTitle}
        badge={isBn ? 'কারিগরি সক্ষমতা' : 'Technical Capability'}
        subtitle={currentSummary}
        imageSrc={capImage}
        imageAlt={`${currentTitle} at Metal Tech BD`}
      />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb & Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8] cursor-pointer">
              {isBn ? 'নীড়পাতা' : 'Home'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button onClick={() => onNavigate({ view: 'capabilities' })} className="hover:text-[#1D4ED8] cursor-pointer">
              {isBn ? 'সক্ষমতাসমূহ' : 'Capabilities'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">{currentTitle}</span>
          </nav>

          <button
            onClick={() => onOpenRfq({ process: currentCap.title })}
            className="px-4 py-2 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer self-start sm:self-auto"
          >
            {isBn ? 'প্রস্তাবনা অনুরোধ করুন' : 'Request a Proposal'}
          </button>
        </div>

        {/* Main Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F1B2D] m-0">
                {isBn ? 'সেবা পর্যালোচনা ও শিল্প মানদণ্ড' : 'Service Overview & Industrial Standards'}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed m-0">
                {currentDesc}
              </p>
            </div>

            {/* Equipment Highlights */}
            <div className="bg-white border border-[#D9DCE1] rounded-sm p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] pb-2 border-b border-slate-100 m-0">
                {isBn ? 'প্ল্যান্টের সরঞ্জাম ও টুলিং হাইলাইটস' : 'Plant Equipment & Tooling Highlights'}
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
                <span className="text-xs font-bold uppercase text-[#0F1B2D] block">
                  {isBn ? 'মূল স্পেসিফিকেশনসমূহ' : 'Key Specifications'}
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {currentCap.specifications.map((spec, idx) => (
                    <li key={idx}>• {spec}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#F3F4F6] rounded-sm p-4 space-y-2">
                <span className="text-xs font-bold uppercase text-[#0F1B2D] block">
                  {isBn ? 'অনুমোদিত মানদণ্ডসমূহ' : 'Governing Standards'}
                </span>
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
                {isBn ? 'অন্যান্য সক্ষমতাসমূহ' : 'Other Capabilities'}
              </h3>
              <div className="space-y-1 text-xs">
                {activeCapabilities.filter(c => c.slug !== slug).map((c) => {
                  const otherTitle = isBn && c.titleBn ? c.titleBn : c.title;
                  return (
                    <button
                      key={c.slug}
                      onClick={() => onNavigate({ view: 'capabilities', subSlug: c.slug })}
                      className="w-full text-left p-2 rounded hover:bg-slate-50 text-slate-700 hover:text-[#1D4ED8] font-medium flex items-center justify-between cursor-pointer"
                    >
                      <span>{otherTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#0F1B2D] text-white p-5 rounded-sm space-y-3">
              <span className="text-xs font-bold text-[#F5B800] uppercase block">
                {isBn ? 'কারিগরি সহায়তা প্রয়োজন?' : 'Need Technical Assistance?'}
              </span>
              <p className="text-xs text-slate-300 m-0">
                {isBn
                  ? 'টার্নকি প্রসেসিং কোটেশন এবং ক্যাপাসিটি বুকিংয়ের জন্য আমাদের লিয়াজোঁর সাথে যোগাযোগ করুন।'
                  : 'Contact our engineering liaison for turnkey processing quotes and capacity booking.'}
              </p>
              <button
                onClick={() => onOpenRfq({ process: currentCap.title })}
                className="w-full py-2.5 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer"
              >
                {isBn ? `${currentTitle}-এর জন্য অনুসন্ধান করুন` : `Inquire for ${currentCap.title}`}
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
