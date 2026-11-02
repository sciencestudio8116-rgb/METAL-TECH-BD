import React from 'react';
import { Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import { SITE_METADATA } from '../data/siteData';

interface AskTheExpertsBandProps {
  onContactClick: () => void;
  onRfqClick?: () => void;
}

export const AskTheExpertsBand: React.FC<AskTheExpertsBandProps> = ({ onContactClick, onRfqClick }) => {
  return (
    <section className="relative bg-[#070D1E] text-white py-16 border-t border-b border-[#2B3E50] overflow-hidden">
      {/* Subtle ambient lighting with zero blur overhead */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.15)_0%,_transparent_70%)] pointer-events-none" />

      <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6">
        <div className="bg-[#1C2541]/90 border border-[#2B3E50] rounded-lg p-8 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 transition-all duration-300 hover:border-[#3B82F6]/50">
          {/* Text Info */}
          <div className="space-y-2.5 text-center lg:text-left max-w-xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#4CC9F0] flex items-center justify-center lg:justify-start gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#3B82F6]" />
              Direct Engineering Consultation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white m-0">
              Ask The Metal Experts
            </h2>
            <p className="text-[#8D99AE] text-sm sm:text-base m-0 leading-relaxed">
              Have a challenging high-temperature, sour-gas, or wear-intensive application? Speak directly with our PhD metallurgists and foundry engineers.
            </p>
          </div>

          {/* Action Hub */}
          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <a
              href={`tel:${SITE_METADATA.phone.replace(/\s+/g, '')}`}
              className="flex items-center gap-2 px-5 py-3 rounded-md bg-[#0B132B] hover:bg-[#223055] text-white text-sm font-semibold border border-[#2B3E50] hover:border-[#3B82F6] transition-all duration-300 shadow-sm"
            >
              <Phone className="w-4 h-4 text-[#4CC9F0]" />
              <span className="text-slate-200">{SITE_METADATA.phone}</span>
            </a>

            <button
              onClick={onRfqClick || onContactClick}
              className="flex items-center gap-2 px-6 py-3 rounded-md bg-[#3B82F6] hover:bg-[#2563EB] text-white text-sm font-bold shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_25px_rgba(59,130,246,0.55)] transition-all duration-300 active:scale-[0.98] cursor-pointer"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
