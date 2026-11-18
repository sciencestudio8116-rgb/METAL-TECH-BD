import React, { useState } from 'react';
import { PageRoute } from '../types/navigation';
import { Briefcase, MapPin, Clock, ChevronRight, CheckCircle2, Send, X } from 'lucide-react';

interface CareersViewProps {
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: () => void;
}

const OPEN_POSITIONS = [
  {
    id: 'job-1',
    title: 'Lead Metallurgist – AOD Secondary Refining',
    location: 'Gazipur Heavy Foundry Complex',
    type: 'Full-time · Permanent',
    dept: 'Metallurgical Engineering',
    desc: 'Oversee secondary refining heats on our 10-ton AOD vessel, formulate custom chemistries, and verify optical emission spectroscopy test records.',
  },
  {
    id: 'job-2',
    title: 'Senior 5-Axis CNC Machinist & Programmer',
    location: 'Chittagong Heavy Machining Hub',
    type: 'Full-time · Permanent',
    dept: 'Precision CNC Machining',
    desc: 'Operate Toshiba 5-axis horizontal boring mills and Hankook vertical turning lathes for high-spec nickel superalloy valve and pump assemblies.',
  },
  {
    id: 'job-3',
    title: 'ASNT Level III NDT Quality Inspector',
    location: 'Dhaka Central Plant',
    type: 'Full-time · Permanent',
    dept: 'Quality Assurance & Testing',
    desc: 'Lead radiographic (RT), ultrasonic (UT), and liquid penetrant (PT) inspections. Certify Mill Test Certificates to EN 10204 Type 3.1.',
  },
  {
    id: 'job-4',
    title: 'MagmaSoft Solidification Modeling Engineer',
    location: 'Dhaka Technical Headquarters',
    type: 'Full-time · Permanent',
    dept: 'Tooling & CAD Engineering',
    desc: 'Simulate mold filling, thermal cooling gradients, and risering for heavy sand and centrifugal castings to guarantee zero shrinkage defects.',
  },
];

import { IMAGES } from '../assets/images';
import { PageHero } from '../components/PageHero';

export const CareersView: React.FC<CareersViewProps> = ({ onNavigate }) => {
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);
  const [candidate, setCandidate] = useState({ name: '', email: '', phone: '', cvNote: '' });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setApplied(true);
  };

  return (
    <div className="w-full">
      {/* Full-width 400px Hero */}
      <PageHero
        title="Careers & Culture"
        badge="Join Our Team"
        subtitle="Shape the future of heavy industry, advanced casting, and precision metallurgical craftsmanship"
        imageSrc={IMAGES.careers}
        imageAlt="Careers and engineering opportunities at Metal Tech BD"
      />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-14 md:py-20 space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8]">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Careers</span>
        </nav>

        {/* Open Positions Grid */}
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#0F1B2D] m-0">
              Current Open Engineering &amp; Foundry Positions
            </h2>
            <p className="text-sm text-slate-600 m-0">
              Explore specialized career opportunities across our foundry, CNC machining, and metallurgical testing complexes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OPEN_POSITIONS.map((job) => (
              <div
                key={job.id}
                className="aspect-square rounded-xl border border-slate-200 hover:border-[#1D4ED8] hover:ring-1 hover:ring-[#1D4ED8]/20 bg-white p-5 sm:p-6 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="space-y-2.5 min-h-0">
                  <span className="inline-block text-[11px] font-bold text-[#1D4ED8] uppercase tracking-wider">
                    {job.dept}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 leading-snug">
                    {job.title}
                  </h3>
                  <div className="w-10 h-[2px] bg-[#F5B800] rounded-full" />
                  <p className="text-xs text-slate-600 m-0 leading-relaxed text-justify">
                    {job.desc}
                  </p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  <div className="space-y-1 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{job.type}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => { setSelectedJob(job.title); setApplied(false); }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-lg shadow-xs transition-all duration-200 active:scale-[0.98] cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Apply Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Culture & Benefits Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="bg-white border border-slate-200 hover:border-[#1D4ED8] hover:ring-1 hover:ring-[#1D4ED8]/20 rounded-xl p-6 space-y-2.5 shadow-sm transition-all duration-300 hover:shadow-md">
            <h4 className="text-sm font-bold text-[#0F1B2D] m-0">Global Quality Exposure</h4>
            <p className="text-xs text-slate-600 m-0 leading-relaxed text-justify">
              Direct exposure to international aerospace standards (AS9100), nuclear codes (ASME Section III), and marine classification societies.
            </p>
          </div>
          <div className="bg-white border border-slate-200 hover:border-[#1D4ED8] hover:ring-1 hover:ring-[#1D4ED8]/20 rounded-xl p-6 space-y-2.5 shadow-sm transition-all duration-300 hover:shadow-md">
            <h4 className="text-sm font-bold text-[#0F1B2D] m-0">Continuous Training (TekSession)</h4>
            <p className="text-xs text-slate-600 m-0 leading-relaxed text-justify">
              Company-funded certifications for ASNT Level II/III NDT, Six Sigma green/black belt, and computational CFD modeling.
            </p>
          </div>
          <div className="bg-white border border-slate-200 hover:border-[#1D4ED8] hover:ring-1 hover:ring-[#1D4ED8]/20 rounded-xl p-6 space-y-2.5 shadow-sm transition-all duration-300 hover:shadow-md">
            <h4 className="text-sm font-bold text-[#0F1B2D] m-0">Comprehensive Care</h4>
            <p className="text-xs text-slate-600 m-0 leading-relaxed text-justify">
              Competitive compensation, full health coverage, performance bonuses, and safe industrial workplace environments adhering to ISO 45001.
            </p>
          </div>
        </div>
      </div>

      {/* Application Dialog */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
          <div className="w-full max-w-lg bg-white rounded-md shadow-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-bold text-[#1D4ED8] uppercase">Submit Application</span>
                <h3 className="text-base font-bold text-[#0F1B2D] m-0">{selectedJob}</h3>
              </div>
              <button onClick={() => setSelectedJob(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {applied ? (
              <div className="p-6 text-center space-y-2 bg-emerald-50 rounded">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Application Submitted</h4>
                <p className="text-xs text-emerald-700">
                  Thank you, {candidate.name}. Our talent acquisition team will review your qualifications and contact you.
                </p>
                <button
                  onClick={() => setSelectedJob(null)}
                  className="mt-2 px-4 py-1.5 bg-emerald-700 text-white text-xs font-bold rounded"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={candidate.name}
                    onChange={e => setCandidate(p => ({ ...p, name: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                    placeholder="e.g. Asif Mahmud"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={candidate.email}
                    onChange={e => setCandidate(p => ({ ...p, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                    placeholder="asif@email.com"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={candidate.phone}
                    onChange={e => setCandidate(p => ({ ...p, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                    placeholder="+880 17..."
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Summary of Qualifications & Experience</label>
                  <textarea
                    rows={3}
                    required
                    value={candidate.cvNote}
                    onChange={e => setCandidate(p => ({ ...p, cvNote: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded"
                    placeholder="Briefly state your education, years of metallurgy or CNC experience, and certifications..."
                  />
                </div>
                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 border border-slate-300 rounded text-slate-700 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1D4ED8] text-white font-bold rounded hover:bg-[#163A9E]"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
