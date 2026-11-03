import React from 'react';
import { PageRoute } from '../types/navigation';
import { CASTING_PROCESSES, ProcessItem } from '../data/siteData';
import { IMAGES } from '../assets/images';
import { AskTheExpertsBand } from '../components/AskTheExpertsBand';
import { ChevronRight, ArrowRight, ShieldCheck, Factory, Check } from 'lucide-react';

import { PageHero } from '../components/PageHero';
import { IndustrialIcon } from '../components/IndustrialIcon';

interface ProcessDetailViewProps {
  slug?: string;
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: (prefill?: { alloy?: string; process?: string }) => void;
}

export const ProcessDetailView: React.FC<ProcessDetailViewProps> = ({ slug, onNavigate, onOpenRfq }) => {
  // If no slug, show the Metal Casting Overview Hub
  const currentProcess: ProcessItem | undefined = CASTING_PROCESSES.find(
    p => p.slug === slug || (slug === 'continuous-casting' && p.slug === 'ingot')
  );

  if (!slug || !currentProcess) {
    return (
      <div className="space-y-8 pb-12">
        {/* Full-width 400px Hero */}
        <PageHero
          title="Metal Casting"
          badge="Foundry Processes"
          subtitle="Centrifugal, sand, and investment casting as well as high-integrity ingot manufacturing"
          imageSrc={IMAGES.castingOverview}
          imageAlt="High-Integrity Metal Casting Processes at Metal Tech BD"
        />

        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8]">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">Metal Casting</span>
          </nav>

          {/* Process Grid (Center-Aligned) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {CASTING_PROCESSES.map((proc) => {
              const iconKey = 
                proc.slug === 'centrifugal-casting' ? 'centrifugal' :
                proc.slug === 'sand-casting' ? 'sand-casting' :
                proc.slug === 'investment-casting' ? 'investment' :
                (proc.slug === 'continuous-casting' || proc.slug === 'ingot') ? 'alloys' : 'casting';

              return (
                <div
                  key={proc.slug}
                  onClick={() => onNavigate({ view: 'metal-casting', subSlug: proc.slug })}
                  className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center group"
                >
                  <div className="flex flex-col items-center text-center w-full">
                    <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      <IndustrialIcon name={iconKey} className="w-16 h-16 sm:w-20 sm:h-20" />
                    </div>
                    <span className="text-[11px] font-bold uppercase text-[#1D4ED8] tracking-wider block mb-1">
                      Casting Method
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                      {proc.title}
                    </h3>
                    <div className="w-16 h-[2px] bg-[#004B87] my-3.5 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                    <p className="text-sm text-[#5B6470] leading-relaxed m-0 text-center max-w-sm">
                      {proc.summary}
                    </p>
                    <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
                      <span className="bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                        <strong>Max Weight:</strong> {proc.weightRange}
                      </span>
                      <span className="bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                        <strong>Limits:</strong> {proc.sizeLimits}
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D4ED8] group-hover:text-[#004B87]">
                    <span>View Process Specifications</span>
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

  // Determine process-specific high-resolution photography asset
  const processImage = 
    currentProcess.slug === 'centrifugal-casting' ? IMAGES.centrifugalCasting :
    currentProcess.slug === 'sand-casting' ? IMAGES.sandCasting :
    currentProcess.slug === 'investment-casting' ? IMAGES.investmentCasting :
    (currentProcess.slug === 'continuous-casting' || currentProcess.slug === 'ingot') ? IMAGES.continuousCasting :
    IMAGES.castingOverview;

  // Individual Process Template (Centrifugal, Sand, Investment, Continuous)
  return (
    <div className="space-y-8 pb-12">
      {/* Full-width 400px Hero strictly matching rules */}
      <PageHero
        title={currentProcess.title}
        badge="Engineered Casting Process"
        subtitle={currentProcess.summary}
        imageSrc={processImage}
        imageAlt={`${currentProcess.title} at Metal Tech BD`}
      />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb & Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8]">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button onClick={() => onNavigate({ view: 'metal-casting' })} className="hover:text-[#1D4ED8]">Metal Casting</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">{currentProcess.title}</span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenRfq({ process: currentProcess.title })}
              className="px-4 py-2 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer"
            >
              Request a Quote
            </button>
            <button
              onClick={() => onNavigate({ view: 'alloys' })}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F1B2D] text-xs font-semibold rounded-sm transition-colors"
            >
              Suitable Alloys
            </button>
          </div>
        </div>

        {/* Process Overview & Mechanical Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Description (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#0F1B2D] m-0">
                Process Overview & Metallurgical Principle
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed m-0">
                {currentProcess.description}
              </p>
            </div>

            {/* Specifications Table */}
            <div className="bg-white border border-[#D9DCE1] rounded-sm p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] pb-2 border-b border-slate-100 m-0">
                Dimensional & Capacity Envelope
              </h3>
              <table className="w-full text-xs text-left">
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-500 w-1/3">Envelope / Size Limits</td>
                    <td className="py-2.5 text-slate-800 font-medium">{currentProcess.sizeLimits}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-500">Weight Capacity</td>
                    <td className="py-2.5 text-slate-800 font-medium">{currentProcess.weightRange}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-500">Standard Tolerances</td>
                    <td className="py-2.5 text-slate-800 font-medium">{currentProcess.tolerances}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Typical Components */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] m-0">
                Typical Components Manufactured
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {currentProcess.typicalComponents.map((comp, idx) => (
                  <div key={idx} className="flex items-center gap-2 p-2.5 bg-[#F3F4F6] rounded-sm text-xs text-slate-800">
                    <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Rail: Suitable Alloys & Industries */}
          <div className="space-y-6">
            {/* Suitable Alloys */}
            <div className="bg-white border border-[#D9DCE1] rounded-sm p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] pb-2 border-b border-slate-100 m-0">
                Common Suitable Alloys
              </h3>
              <ul className="space-y-2 text-xs">
                {currentProcess.suitableAlloys.map((alloy, idx) => (
                  <li key={idx} className="flex items-center justify-between text-slate-700">
                    <span className="font-semibold">{alloy}</span>
                    <button 
                      onClick={() => onNavigate({ view: 'alloys' })}
                      className="text-[#1D4ED8] hover:underline"
                    >
                      View Specs
                    </button>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate({ view: 'alloys' })}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-[#0F1B2D] text-xs font-semibold rounded-sm text-center"
                >
                  Browse Full Alloy Catalog
                </button>
              </div>
            </div>

            {/* Industries Served */}
            <div className="bg-white border border-[#D9DCE1] rounded-sm p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] pb-2 border-b border-slate-100 m-0">
                Target Industries
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {currentProcess.industriesServed.map((ind, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-sm">
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Consultation Box */}
            <div className="bg-[#0F1B2D] text-white p-5 rounded-sm space-y-3">
              <span className="text-xs font-bold text-[#F5B800] uppercase block">Need Technical Sizing?</span>
              <p className="text-xs text-slate-300 m-0">
                Our tooling engineers provide solidification analysis and casting mold recommendations for this process.
              </p>
              <button
                onClick={() => onOpenRfq({ process: currentProcess.title })}
                className="w-full py-2.5 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer"
              >
                Request a Proposal
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Pre-Footer Band */}
      <AskTheExpertsBand
        onContactClick={() => onNavigate({ view: 'contact-us' })}
        onRfqClick={() => onOpenRfq({ process: currentProcess.title })}
      />
    </div>
  );
};
