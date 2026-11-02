import React from 'react';
import { PageRoute } from '../types/navigation';
import { DIVISIONS, DivisionItem } from '../data/siteData';
import { AskTheExpertsBand } from '../components/AskTheExpertsBand';
import { IMAGES } from '../assets/images';
import { MapPin, Phone, Mail, Factory, ChevronRight, Check } from 'lucide-react';

import { PageHero } from '../components/PageHero';

interface DivisionsViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: () => void;
}

export const DivisionsView: React.FC<DivisionsViewProps> = ({ onNavigate, onOpenRfq }) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Full-width 400px Hero */}
      <PageHero
        title="Divisions & Plants"
        badge="Operational Infrastructure"
        subtitle="Specialized foundry, centrifugal casting lines, and high-precision CNC machining plants"
        imageSrc={IMAGES.divisionsFacilities}
        imageAlt="Specialized foundry and heavy machining facilities at Metal Tech BD"
      />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8]">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Divisions & Plants</span>
        </nav>

        {/* Facilities List */}
        <div className="space-y-8">
          {DIVISIONS.map((div, index) => (
            <div
              key={div.slug}
              className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                    Facility #{index + 1}
                  </span>
                  <h2 className="text-2xl font-bold text-[#0F1B2D] m-0">
                    {div.name}
                  </h2>
                  <div className="flex items-center gap-2 text-xs text-slate-500 pt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#1D4ED8]" />
                    <span>{div.location}</span>
                    <span>·</span>
                    <span className="font-semibold text-slate-700">{div.area}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <a href={`tel:${div.phone.replace(/[^0-9+]/g, '')}`} className="flex items-center gap-1 hover:text-[#1D4ED8]">
                    <Phone className="w-3.5 h-3.5 text-[#1D4ED8]" /> {div.phone}
                  </a>
                  <a href={`mailto:${div.email}`} className="flex items-center gap-1 hover:text-[#1D4ED8]">
                    <Mail className="w-3.5 h-3.5 text-[#1D4ED8]" /> {div.email}
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-3">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] m-0">
                    Plant Specialties & Capabilities
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed m-0">
                    {div.specialties}
                  </p>

                  <div className="pt-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] block mb-2">
                      Key Installed Equipment & Furnace Lines
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {div.equipment.map((eq, idx) => (
                        <div key={idx} className="flex items-center gap-2 p-2 bg-[#F3F4F6] rounded-sm text-xs text-slate-800">
                          <Check className="w-3.5 h-3.5 text-[#1D4ED8] shrink-0" />
                          <span>{eq}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Plant Action Card */}
                <div className="bg-slate-50 p-5 rounded-sm border border-slate-200 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-xs font-bold text-[#0F1B2D] block">Facility Audits & Site Visits</span>
                    <p className="text-xs text-slate-500 mt-1 m-0">
                      We welcome qualified procurement teams, EPC auditors, and marine classification surveyors to tour our operations.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenRfq()}
                    className="w-full py-2 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer"
                  >
                    Schedule a Facility Visit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AskTheExpertsBand
        onContactClick={() => onNavigate({ view: 'contact-us' })}
        onRfqClick={() => onOpenRfq()}
      />
    </div>
  );
};
