import React from 'react';
import { PageRoute } from '../types/navigation';
import { CERTIFICATIONS } from '../data/siteData';
import { AskTheExpertsBand } from '../components/AskTheExpertsBand';
import { 
  ChevronRight, Award, ShieldCheck, History, CheckCircle, 
  FileText, Target, Eye, Users, Compass, Globe, Sparkles 
} from 'lucide-react';

import { IMAGES } from '../assets/images';
import { PageHero } from '../components/PageHero';
import { IndustrialIcon } from '../components/IndustrialIcon';

export type AboutSection = 'overview' | 'why-us' | 'history' | 'mission-vision' | 'leadership' | 'certifications';

interface CompanyProfileViewProps {
  section: AboutSection;
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: () => void;
}

export const CompanyProfileView: React.FC<CompanyProfileViewProps> = ({ 
  section, 
  onNavigate, 
  onOpenRfq 
}) => {
  const heroInfo = {
    'overview': {
      title: 'Company Overview / Who We Are',
      subtitle: 'South Asia’s premier high-integrity metal castings and industrial engineering partner',
      image: IMAGES.companyOverview,
      badge: 'About Metal Tech BD',
    },
    'why-us': {
      title: 'Why Metal Tech BD',
      subtitle: 'Proven metallurgical repeatability, precision casting, and turnkey CNC finishing',
      image: IMAGES.companyOverview,
      badge: 'Engineering Excellence',
    },
    'history': {
      title: 'Our History / Legacy',
      subtitle: 'Over three decades of industrial casting craftsmanship and technical innovation',
      image: IMAGES.history,
      badge: 'Heritage & Milestones',
    },
    'mission-vision': {
      title: 'Mission & Vision',
      subtitle: 'Empowering critical global infrastructure through uncompromising metallurgical integrity',
      image: IMAGES.missionVision,
      badge: 'Core Principles',
    },
    'leadership': {
      title: 'Leadership & Team',
      subtitle: 'Led by certified PhD metallurgists, CAD solidification engineers, and precision machinists',
      image: IMAGES.leadership,
      badge: 'Executive Leadership',
    },
    'certifications': {
      title: 'Quality Standards & Certifications',
      subtitle: 'ISO 9001:2015, Nadcap, Lloyd’s Register, and EN 10204 3.1 accredited quality management',
      image: IMAGES.certifications,
      badge: 'Certified Quality',
    },
  }[section] || {
    title: 'Company Overview / Who We Are',
    subtitle: 'High-Integrity Metal Castings & Industrial Engineering',
    image: IMAGES.companyOverview,
    badge: 'About Us',
  };

  return (
    <div className="w-full m-0 p-0 pb-12">
      {/* Responsive Hero Banner Container - 100% Width, Auto Height, Zero Gaps, Full Preview */}
      <div 
        className="w-full h-auto m-0 p-0 relative overflow-hidden bg-transparent block"
        style={{ width: '100%', height: 'auto', margin: 0, padding: 0 }}
      >
        <PageHero
          title={heroInfo.title}
          imageSrc={heroInfo.image}
          imageAlt={`${heroInfo.title} at Metal Tech BD`}
          objectFit="contain"
          className="m-0 p-0 bg-transparent w-full h-auto"
          showTextOverlay={false}
        />
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-6 space-y-8">
        {/* Breadcrumb & Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8] cursor-pointer">Home</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button onClick={() => onNavigate({ view: 'about-us', subSection: 'overview' })} className="hover:text-[#1D4ED8] cursor-pointer">About Us</button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">{heroInfo.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'overview' as const, label: 'Overview' },
              { id: 'history' as const, label: 'History' },
              { id: 'mission-vision' as const, label: 'Mission & Vision' },
              { id: 'leadership' as const, label: 'Leadership' },
              { id: 'certifications' as const, label: 'Certifications' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => onNavigate({ view: 'about-us', subSection: tab.id })}
                className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                  (section === tab.id || (section === 'why-us' && tab.id === 'overview'))
                    ? 'bg-[#1D4ED8] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Section 1: COMPANY OVERVIEW / WHO WE ARE */}
        {(section === 'overview' || section === 'why-us') && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <IndustrialIcon name="metallurgy" className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                  1. Certified Metallurgy
                </h3>
                <div className="w-16 h-[2px] bg-[#004B87] my-3 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0 text-center">
                  Operated by lead PhD metallurgists. We maintain in-house secondary AOD refining, guaranteeing tight carbon control (C ≤ 0.020%) and low tramp elements.
                </p>
              </div>

              <div className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <IndustrialIcon name="traceability" className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                  2. Complete Supply Traceability
                </h3>
                <div className="w-16 h-[2px] bg-[#004B87] my-3 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0 text-center">
                  Every heat is verified with optical emission spectrometry. Mill Test Certificates (MTC) to EN 10204 Type 3.1 accompany every single production batch.
                </p>
              </div>

              <div className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <IndustrialIcon name="turnkey" className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                  3. Turnkey Finishing
                </h3>
                <div className="w-16 h-[2px] bg-[#004B87] my-3 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed m-0 text-center">
                  Eliminate multiple vendor hand-offs. We cast, solution anneal, finish-machine on 5-axis CNCs, and execute ASNT Level III non-destructive testing under one roof.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-sm p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold text-[#0F1B2D] m-0">
                Pioneering Critical Industrial Engineering in South Asia
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed m-0">
                Metal Tech BD is an internationally certified manufacturer of high-integrity metal castings, centrifugal sleeves, chemically bonded sand castings, and precision investment castings. From raw alloy melting in computer-controlled induction furnaces to secondary AOD decarburization and 5-axis CNC machining, we deliver mission-critical solutions to defense, power generation, chemical, marine, and mining enterprises worldwide.
              </p>
            </div>
          </div>
        )}

        {/* Section 2: MISSION & VISION */}
        {section === 'mission-vision' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <IndustrialIcon name="defense" className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                  Our Mission
                </h3>
                <div className="w-16 h-[2px] bg-[#004B87] my-3.5 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                <p className="text-sm text-slate-600 leading-relaxed m-0 text-center max-w-md">
                  To manufacture ultra-reliable, defect-free metal components that endure the world's most severe operating environments—extreme subsea pressure, corrosive acids, and high-temperature thermal cyclings. We are dedicated to providing global industrial leaders with unyielding metallurgy, transparent traceability, and responsive engineering partnerships.
                </p>
              </div>

              <div className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center group">
                <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                  <IndustrialIcon name="quality" className="w-16 h-16 sm:w-20 sm:h-20" />
                </div>
                <h3 className="text-2xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                  Our Vision
                </h3>
                <div className="w-16 h-[2px] bg-[#004B87] my-3.5 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                <p className="text-sm text-slate-600 leading-relaxed m-0 text-center max-w-md">
                  To be South Asia's preeminent metallurgical center of excellence, setting benchmarks in additive sand mold manufacturing, environmentally responsible secondary AOD refining, and digital simulation-driven foundry engineering.
                </p>
              </div>
            </div>

            {/* Core Values (Center-Aligned Cards) */}
            <div className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="text-center">
                <div className="w-12 h-1 bg-[#F5B800] mx-auto mb-2"></div>
                <h3 className="text-xl font-bold text-[#0F1B2D] m-0">
                  Core Guiding Values
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
                  <div className="mb-3 transform group-hover:scale-105 transition-transform">
                    <IndustrialIcon name="quality" className="w-12 h-12" />
                  </div>
                  <h4 className="font-bold text-sm text-[#0F1B2D] m-0">Zero-Defect Quality</h4>
                  <div className="w-10 h-[2px] bg-[#004B87] my-2 mx-auto rounded-full" />
                  <p className="text-xs text-slate-600 leading-relaxed m-0 text-center">
                    Stringent ASNT Level III non-destructive testing, optical spectrometry, and strict compliance with ASTM, ASME, and DIN standards.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-200 rounded-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
                  <div className="mb-3 transform group-hover:scale-105 transition-transform">
                    <IndustrialIcon name="traceability" className="w-12 h-12" />
                  </div>
                  <h4 className="font-bold text-sm text-[#0F1B2D] m-0">Technical Transparency</h4>
                  <div className="w-10 h-[2px] bg-[#004B87] my-2 mx-auto rounded-full" />
                  <p className="text-xs text-slate-600 leading-relaxed m-0 text-center">
                    Open chemical certifications, unvarnished metallurgical test logs, and collaborative design-for-casting (DFC) reviews.
                  </p>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-200 rounded-sm flex flex-col items-center text-center group hover:shadow-md transition-all">
                  <div className="mb-3 transform group-hover:scale-105 transition-transform">
                    <IndustrialIcon name="casting" className="w-12 h-12" />
                  </div>
                  <h4 className="font-bold text-sm text-[#0F1B2D] m-0">Sustainable Practice</h4>
                  <div className="w-10 h-[2px] bg-[#004B87] my-2 mx-auto rounded-full" />
                  <p className="text-xs text-slate-600 leading-relaxed m-0 text-center">
                    High-efficiency induction power grids, 98% sand reclamation systems, and closed-loop cooling towers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Section 3: LEADERSHIP & TEAM */}
        {section === 'leadership' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="w-12 h-1 bg-[#F5B800] mx-auto mb-2"></div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1B2D] m-0">
                Executive Leadership & Engineering Directorate
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 m-0">
                Guided by experienced metallurgists, foundry innovators, and international operations specialists.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: 'Dr. Tariqul Islam, PhD',
                  role: 'Chief Metallurgist & Technical Director',
                  bio: 'PhD in Materials Engineering from RWTH Aachen with 24 years directing secondary AOD refining, duplex stainless steels, and superalloy solidification modeling.',
                  specialty: 'AOD Decarburization & Ingot Refining',
                },
                {
                  name: 'Engr. Mahfuzur Rahman',
                  role: 'Director of Foundry Operations',
                  bio: 'Over 20 years managing heavy centrifugal casting carousels and chemically bonded sand casting facilities for global naval and power infrastructure.',
                  specialty: 'Centrifugal & Heavy Casting',
                },
                {
                  name: 'Nazmul Hossain, ASNT III',
                  role: 'Head of Quality Assurance & Testing',
                  bio: 'Certified ASNT Level III inspector overseeing ISO 17025 accredited laboratories, radiographic testing, and EN 10204 Type 3.1 certification desk.',
                  specialty: 'NDT & Metallurgical Testing',
                },
              ].map((leader) => (
                <div key={leader.name} className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-between group">
                  <div className="flex flex-col items-center text-center w-full space-y-3">
                    <div className="mb-2 transform group-hover:scale-105 transition-transform duration-300">
                      <IndustrialIcon name="engineer" className="w-16 h-16" />
                    </div>
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0">{leader.name}</h4>
                      <span className="text-xs font-semibold text-[#1D4ED8] block mt-1">{leader.role}</span>
                    </div>
                    <div className="w-12 h-[2px] bg-[#004B87] my-2 mx-auto rounded-full group-hover:w-16 transition-all duration-300" />
                    <p className="text-xs text-slate-600 leading-relaxed m-0 text-center">{leader.bio}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 text-[11px] font-semibold text-slate-500 w-full text-center">
                    Specialty: <span className="text-[#0F1B2D] font-bold">{leader.specialty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 4: CERTIFICATIONS (Center-Aligned Cards) */}
        {section === 'certifications' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CERTIFICATIONS.map((cert) => (
                <div key={cert.name} className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center justify-between group">
                  <div className="flex flex-col items-center text-center w-full space-y-3">
                    <div className="mb-2 transform group-hover:scale-105 transition-transform duration-300">
                      <IndustrialIcon name="quality" className="w-16 h-16" />
                    </div>
                    <span className="text-xs font-semibold text-[#1D4ED8] bg-blue-50 px-2.5 py-0.5 rounded border border-blue-100">
                      Validity: {cert.validity}
                    </span>
                    <h3 className="text-lg sm:text-xl font-extrabold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0">
                      {cert.name}
                    </h3>
                    <h4 className="text-xs font-bold text-slate-700 m-0">{cert.title}</h4>
                    <div className="w-16 h-[2px] bg-[#004B87] my-2 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                    <div className="text-xs text-slate-500 space-y-1 text-center">
                      <div><strong>Auditing Body:</strong> {cert.issuer}</div>
                      <div><strong>Certificate #:</strong> {cert.certNo}</div>
                      <p className="text-slate-600 pt-1 leading-relaxed m-0 text-center"><strong>Scope:</strong> {cert.scope}</p>
                    </div>
                  </div>
                  <div className="pt-4 mt-4">
                    <button
                      onClick={() => alert(`Viewing certified audit PDF for ${cert.name}`)}
                      className="text-xs font-bold text-[#1D4ED8] hover:text-[#004B87] flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" /> Download Certificate Copy
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 5: HISTORY */}
        {section === 'history' && (
          <div className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-10 shadow-xs space-y-8">
            <h2 className="text-2xl font-bold text-[#0F1B2D] m-0 pb-4 border-b border-slate-200">
              Company Milestones & Foundry Expansion
            </h2>
            <div className="space-y-6 relative border-l-2 border-[#1D4ED8] pl-6 ml-4 text-xs">
              <div className="space-y-1 relative">
                <span className="w-3 h-3 rounded-full bg-[#1D4ED8] absolute -left-[31px] top-1" />
                <span className="font-bold text-[#1D4ED8] text-sm">1996 · Foundry Foundation</span>
                <p className="text-slate-600 m-0 leading-relaxed">
                  Established initial induction foundry in Tejgaon Industrial Area, focusing on bronze and stainless centrifugal sleeves for the local paper and marine industry.
                </p>
              </div>

              <div className="space-y-1 relative">
                <span className="w-3 h-3 rounded-full bg-[#1D4ED8] absolute -left-[31px] top-1" />
                <span className="font-bold text-[#1D4ED8] text-sm">2008 · Commissioning of Gazipur Heavy Works</span>
                <p className="text-slate-600 m-0 leading-relaxed">
                  Inaugurated 18,500 sq meter Gazipur complex with dual-track Inductotherm furnaces and chemically bonded sand casting lines for pump volutes and valve casings.
                </p>
              </div>

              <div className="space-y-1 relative">
                <span className="w-3 h-3 rounded-full bg-[#1D4ED8] absolute -left-[31px] top-1" />
                <span className="font-bold text-[#1D4ED8] text-sm">2016 · 10-Ton AOD Vessel Commissioned</span>
                <p className="text-slate-600 m-0 leading-relaxed">
                  Became South Asia's premier independent foundry capable of secondary Argon Oxygen Decarburization (AOD) refining for super duplex and superalloy castings.
                </p>
              </div>

              <div className="space-y-1 relative">
                <span className="w-3 h-3 rounded-full bg-[#1D4ED8] absolute -left-[31px] top-1" />
                <span className="font-bold text-[#1D4ED8] text-sm">2024 · Chittagong Marine Export Gateway</span>
                <p className="text-slate-600 m-0 leading-relaxed">
                  Expanded deepwater direct export machining hub with 5-axis CNC horizontal boring mills and direct container loading for European and Middle Eastern customers.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <AskTheExpertsBand
        onContactClick={() => onNavigate({ view: 'contact-us' })}
        onRfqClick={() => onOpenRfq()}
      />
    </div>
  );
};
