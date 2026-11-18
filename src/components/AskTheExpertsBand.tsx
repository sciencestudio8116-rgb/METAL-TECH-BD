import React from 'react';
import { Phone, ArrowRight, ShieldCheck, Clock, Award, Microscope } from 'lucide-react';
import { SITE_METADATA } from '../data/siteData';
import { useLanguage } from '../context/LanguageContext';

interface AskTheExpertsBandProps {
  onContactClick: () => void;
  onRfqClick?: () => void;
  embedded?: boolean;
}

export const AskTheExpertsBand: React.FC<AskTheExpertsBandProps> = ({
  onContactClick,
  onRfqClick,
  embedded = false,
}) => {
  const { isBn } = useLanguage();

  const cardContent = (
    <div className="bg-white border border-slate-200/90 rounded-xl shadow-[0_18px_42px_-14px_rgba(15,27,45,0.12)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
      {/* Left Zone: Structured Consultation Overview (7 columns) */}
      <div className="lg:col-span-7 p-8 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
        <div className="space-y-3 text-center lg:text-left">
          <div className="inline-flex items-center justify-center lg:justify-start gap-2 text-xs font-bold uppercase tracking-widest text-[#1D4ED8]">
            <ShieldCheck className="w-4 h-4 text-[#1D4ED8]" />
            <span>{isBn ? 'সরাসরি ইঞ্জিনিয়ারিং পরামর্শ' : 'Metal Tek Expert Consultation'}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0F1B2D] m-0">
            {isBn ? 'মেটাল টেক বিশেষজ্ঞদের পরামর্শ নিন' : 'Ask The Metal Tek Experts'}
          </h2>

          <p className="text-[#475569] text-sm sm:text-base m-0 leading-relaxed max-w-xl mx-auto lg:mx-0">
            {isBn
              ? 'উচ্চ তাপমাত্রা, অ্যাসিড-গ্যাস বা ক্ষয়প্রতিরোধী যন্ত্রাংশের চ্যালেঞ্জ রয়েছে? আমাদের ধাতু বিশেষজ্ঞ এবং ফাউন্ড্রি প্রকৌশলীদের সাথে সরাসরি কথা বলুন।'
              : 'Have a challenging high-temperature, sour-gas, or wear-intensive application? Speak directly with our PhD metallurgists and foundry engineers.'}
          </p>
        </div>

        {/* Structured Engineering Assurance Metrics */}
        <div className="pt-5 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center lg:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-bold text-[#0F1B2D]">
              <Clock className="w-3.5 h-3.5 text-[#1D4ED8]" />
              <span>{isBn ? '১ কার্যদিবস' : '1 Business Day'}</span>
            </div>
            <p className="text-xs text-slate-500 m-0">
              {isBn ? 'দ্রুত টেকনিক্যাল রিভিউ' : 'Engineering Review SLA'}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-bold text-[#0F1B2D]">
              <Award className="w-3.5 h-3.5 text-[#F5B800]" />
              <span>ASTM · EN · NACE</span>
            </div>
            <p className="text-xs text-slate-500 m-0">
              {isBn ? 'অ্যালয় গ্রেড পরামর্শ' : 'Alloy Grade Selection'}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-center lg:justify-start gap-1.5 text-xs font-bold text-[#0F1B2D]">
              <Microscope className="w-3.5 h-3.5 text-[#1D4ED8]" />
              <span>{isBn ? 'লেভেল ৩ এনডিটি' : 'ASNT Level III'}</span>
            </div>
            <p className="text-xs text-slate-500 m-0">
              {isBn ? 'সিমুলেশন ও ফেলিওর সাপোর্ট' : 'MagmaSoft & NDT Desk'}
            </p>
          </div>
        </div>
      </div>

      {/* Right Zone: Dedicated Metallurgical Desk Action Panel (5 columns) */}
      <div className="lg:col-span-5 bg-[#0F1B2D] text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-between gap-6 relative overflow-hidden">
        {/* Subtle top accent stripe */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1D4ED8] to-[#F5B800]" />

        <div className="space-y-1.5 text-center lg:text-left">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#F5B800] block">
            {isBn ? 'মেটালার্জিক্যাল হেল্পডেস্ক' : 'Metallurgical Advisory Desk'}
          </span>
          <h3 className="text-lg font-bold text-white m-0">
            {isBn ? 'সরাসরি প্রকৌশলীর সাথে যোগাযোগ করুন' : 'Connect With Our Foundry Engineers'}
          </h3>
          <p className="text-xs text-slate-300 m-0">
            {isBn ? 'ঢাকা হেডকোয়ার্টার ও গাজীপুর প্ল্যান্ট টেকনিক্যাল হাব' : 'Dhaka HQ & Gazipur Heavy Foundry Hub'}
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={onRfqClick || onContactClick}
            className="w-full py-3.5 px-5 rounded-lg bg-[#1D4ED8] hover:bg-[#2563EB] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 transition-all duration-200 active:scale-[0.98] cursor-pointer group"
          >
            <span>{isBn ? 'বিশেষজ্ঞের সাথে যোগাযোগ করুন' : 'Consult Metal Tek Experts'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={`tel:${SITE_METADATA.phone.replace(/\s+/g, '')}`}
            className="w-full py-3 px-5 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-slate-100 text-sm font-semibold border border-slate-700 hover:border-[#F5B800]/60 flex items-center justify-center gap-2.5 transition-all duration-200"
          >
            <Phone className="w-4 h-4 text-[#F5B800]" />
            <span>{SITE_METADATA.phone}</span>
          </a>
        </div>

        <p className="text-[11px] text-slate-400 text-center lg:text-left m-0">
          {isBn ? 'ক্যাড ফাইল ও স্পেসিফিকেশন রিভিউয়ের জন্য এনডিএ সুরক্ষা প্রযোজ্য।' : 'Mutual NDA & CAD feasibility review available upon request.'}
        </p>
      </div>
    </div>
  );

  if (embedded) {
    return cardContent;
  }

  return (
    <section className="relative bg-[#F1F5F9] py-16 md:py-20 border-t border-slate-200/90">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        {cardContent}
      </div>
    </section>
  );
};
