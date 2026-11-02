import React from 'react';
import { Phone, Mail, FileText } from 'lucide-react';
import { SITE_METADATA } from '../data/siteData';

interface MobileStickyBarProps {
  onOpenRfq: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenRfq }) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0B132B] border-t border-[#2B3E50] px-3 py-2 flex items-center justify-between gap-2.5 shadow-2xl">
      {/* Call Button */}
      <a
        href={`tel:${SITE_METADATA.phoneRaw}`}
        className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-md bg-[#1C2541] border border-[#2B3E50] text-slate-200 hover:bg-[#223055] transition-colors"
      >
        <Phone className="w-4 h-4 text-[#4CC9F0] mb-0.5" />
        <span className="text-[10px] font-semibold">Call Us</span>
      </a>

      {/* Email Button */}
      <a
        href={`mailto:${SITE_METADATA.salesEmail}`}
        className="flex-1 flex flex-col items-center justify-center py-2 px-1 rounded-md bg-[#1C2541] border border-[#2B3E50] text-slate-200 hover:bg-[#223055] transition-colors"
      >
        <Mail className="w-4 h-4 text-[#3B82F6] mb-0.5" />
        <span className="text-[10px] font-semibold">Email Desk</span>
      </a>

      {/* Request a Quote Button */}
      <button
        onClick={onOpenRfq}
        className="flex-2 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-md bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold text-xs shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all active:scale-[0.98] cursor-pointer"
      >
        <FileText className="w-3.5 h-3.5 text-[#4CC9F0]" />
        <span>Contact Us</span>
      </button>
    </div>
  );
};
