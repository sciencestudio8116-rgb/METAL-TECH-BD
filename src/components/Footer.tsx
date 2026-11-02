import React from 'react';
import { PageRoute } from '../types/navigation';
import { SITE_METADATA } from '../data/siteData';
import { MapPin, Phone, Mail, Shield, Linkedin, Youtube, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenCookies: () => void;
  onOpenRfq: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCookies, onOpenRfq }) => {
  return (
    <footer className="bg-[#070D1E] text-[#8D99AE] border-t border-[#2B3E50] pt-16 pb-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        {/* Main Grid: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1E293B]">
          {/* Column 1: Brand & Global Headquarters (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-md bg-[#1D4ED8] flex items-center justify-center text-white font-black text-xl shadow-[0_0_20px_rgba(29,78,216,0.45)]">
                M
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">
                  METAL TECH BD
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#F5B800] mt-1">
                  {SITE_METADATA.tagline}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#8D99AE] leading-relaxed max-w-sm">
              Metal Tech BD manufactures precision metal castings and engineered components for the most demanding industrial applications that power, protect, and connect our world.
            </p>

            {/* Headquarters Block */}
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Metal Tech BD Corporate Headquarters:</span>
                  <span className="text-[#8D99AE]">{SITE_METADATA.headquartersAddress}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <a href={`tel:${SITE_METADATA.phoneRaw}`} className="text-white hover:text-[#4CC9F0] font-semibold transition-colors">
                  {SITE_METADATA.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#3B82F6] shrink-0" />
                <a href={`mailto:${SITE_METADATA.salesEmail}`} className="text-slate-300 hover:text-[#4CC9F0] transition-colors">
                  {SITE_METADATA.salesEmail}
                </a>
              </div>
            </div>

            {/* Social Icons (LinkedIn, YouTube, Facebook) */}
            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://www.linkedin.com/company/metaltek-international" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="MetalTek International on LinkedIn"
                className="w-9 h-9 rounded-md bg-[#1C2541] border border-[#2B3E50] hover:bg-[#3B82F6] hover:border-[#3B82F6] flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://www.youtube.com/channel/UCX-CeG7lDg6WVnNYsc9nvaA" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="MetalTek International on YouTube"
                className="w-9 h-9 rounded-md bg-[#1C2541] border border-[#2B3E50] hover:bg-[#3B82F6] hover:border-[#3B82F6] flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://www.facebook.com/MetalTekInternational" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="MetalTek International on Facebook"
                className="w-9 h-9 rounded-md bg-[#1C2541] border border-[#2B3E50] hover:bg-[#3B82F6] hover:border-[#3B82F6] flex items-center justify-center text-slate-300 hover:text-white transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Our Capabilities */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Our Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Metal Casting', route: { view: 'metal-casting' as const } },
                { label: 'Additive Manufacturing', route: { view: 'capabilities' as const, subSlug: 'additive-manufacturing' } },
                { label: 'Metallurgy & Engineering', route: { view: 'capabilities' as const, subSlug: 'metallurgy-engineering' } },
                { label: 'Precision Metal Heat Treatment', route: { view: 'capabilities' as const, subSlug: 'heat-treatment' } },
                { label: 'Metal Machining', route: { view: 'capabilities' as const, subSlug: 'metal-machining' } },
                { label: 'Metal Fabrication', route: { view: 'capabilities' as const, subSlug: 'metal-fabrication' } },
                { label: 'Metal Testing & Analysis', route: { view: 'capabilities' as const, subSlug: 'metal-testing-analysis' } },
                { label: 'TekSession Training', route: { view: 'capabilities' as const, subSlug: 'training' } },
              ].map((item, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => onNavigate(item.route)}
                    className="hover:text-[#4CC9F0] text-[#8D99AE] transition-colors duration-200 text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: About Us */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              About Us
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Company Overview / Who We Are', route: { view: 'about-us' as const, subSection: 'overview' as const } },
                { label: 'Our History / Legacy', route: { view: 'about-us' as const, subSection: 'history' as const } },
                { label: 'Mission & Vision', route: { view: 'about-us' as const, subSection: 'mission-vision' as const } },
                { label: 'Leadership & Team', route: { view: 'about-us' as const, subSection: 'leadership' as const } },
                { label: 'Quality Standards & Certifications', route: { view: 'about-us' as const, subSection: 'certifications' as const } },
                { label: 'Careers & Training', route: { view: 'careers' as const } },
                { label: 'Technical Case Studies', route: { view: 'resources' as const, subTab: 'case-studies' as const } },
              ].map((item, idx) => (
                <li key={idx}>
                  <button 
                    onClick={() => onNavigate(item.route)}
                    className="hover:text-[#4CC9F0] text-[#8D99AE] transition-colors duration-200 text-left cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Ask The Metal Experts / Fast Action */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Ask The Metal Experts
            </h4>
            <p className="text-xs text-[#8D99AE] leading-relaxed">
              Connect directly with our metallurgists and key account engineering team.
            </p>
            <button
              onClick={() => onNavigate({ view: 'contact-us' })}
              className="w-full py-2.5 px-3 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold rounded-md shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all duration-300 cursor-pointer text-center"
            >
              Contact Us
            </button>
            <div className="pt-3 border-t border-[#1E293B] space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Shield className="w-3.5 h-3.5 text-[#4CC9F0]" />
                <span>ISO 9001:2015 Registered</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Shield className="w-3.5 h-3.5 text-[#4CC9F0]" />
                <span>Nadcap & AS9100D</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Row & Compliance Links */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#8D99AE]">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-5 gap-y-2">
            <button 
              onClick={() => onNavigate({ view: 'privacy-policy' })}
              className="hover:text-[#4CC9F0] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={onOpenCookies}
              className="hover:text-[#4CC9F0] transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
            <button 
              onClick={() => onNavigate({ view: 'accessibility-statement' })}
              className="hover:text-[#4CC9F0] transition-colors cursor-pointer"
            >
              Accessibility Statement
            </button>
            <button 
              onClick={() => onNavigate({ view: 'terms-conditions' })}
              className="hover:text-[#4CC9F0] transition-colors cursor-pointer"
            >
              Website Terms & Conditions
            </button>
            <span className="text-[#2B3E50] hidden sm:inline">•</span>
            <span className="text-[#8D99AE]">EEO Posting</span>
            <span className="text-[#8D99AE]">Pay Transparency</span>
            <span className="text-[#8D99AE]">Do Not Sell or Share My Personal Information</span>
            <button 
              onClick={onOpenCookies}
              className="hover:text-[#4CC9F0] transition-colors underline decoration-dotted cursor-pointer"
            >
              Consent Preferences
            </button>
          </div>

          <div className="text-center md:text-right text-[#8D99AE]">
            {SITE_METADATA.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};
