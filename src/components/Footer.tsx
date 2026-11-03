import React from 'react';
import { PageRoute } from '../types/navigation';
import { SITE_METADATA } from '../data/siteData';
import { MapPin, Phone, Mail, ShieldCheck, ArrowRight, Linkedin, Youtube, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate: (route: PageRoute) => void;
  onOpenCookies: () => void;
  onOpenRfq: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenCookies, onOpenRfq }) => {
  return (
    <footer className="bg-[#070D1E] text-slate-400 border-t border-slate-800/80">
      {/* Upper Footer: 4-Column Structured Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-[#1D4ED8] flex items-center justify-center text-white font-black text-lg tracking-tight shadow-md shadow-blue-900/30">
                M
              </div>
              <div>
                <span className="text-lg font-black tracking-tight text-white block leading-tight">
                  METAL TEK BD
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-[#F5B800] block">
                  Foundry & Heavy Engineering
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              High-integrity centrifugal, sand, and investment castings engineered for mission-critical industrial applications across South Asia and global markets.
            </p>

            {/* Direct Contact Details */}
            <div className="space-y-2.5 text-xs pt-1">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#F5B800] shrink-0 mt-0.5" />
                <span className="text-slate-300 leading-snug">
                  {SITE_METADATA.headquartersAddress}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a 
                  href={`tel:${SITE_METADATA.phoneRaw}`} 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {SITE_METADATA.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a 
                  href={`mailto:${SITE_METADATA.salesEmail}`} 
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  {SITE_METADATA.salesEmail}
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded bg-slate-900 border border-slate-800 hover:border-sky-500 hover:bg-sky-500/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded bg-slate-900 border border-slate-800 hover:border-red-500 hover:bg-red-500/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
              >
                <Youtube className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded bg-slate-900 border border-slate-800 hover:border-blue-500 hover:bg-blue-500/10 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-200"
              >
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Casting Processes */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#F5B800] rounded-full inline-block"></span>
              Casting Processes
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'Centrifugal Casting', route: { view: 'metal-casting' as const, subSlug: 'centrifugal-casting' } },
                { label: 'Sand Casting', route: { view: 'metal-casting' as const, subSlug: 'sand-casting' } },
                { label: 'Investment Casting', route: { view: 'metal-casting' as const, subSlug: 'investment-casting' } },
                { label: 'Continuous & Ingot Casting', route: { view: 'metal-casting' as const, subSlug: 'ingot-casting' } },
                { label: 'Alloy Finder & Materials', route: { view: 'alloys' as const } },
                { label: 'Market Solutions', route: { view: 'market-solutions' as const } },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(item.route)}
                    className="hover:text-white hover:translate-x-0.5 text-slate-400 transition-all duration-150 text-left cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Capabilities & Engineering */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-sky-400 rounded-full inline-block"></span>
              Engineering & Lab
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'Precision CNC Machining', route: { view: 'capabilities' as const, subSlug: 'metal-machining' } },
                { label: 'Precision Heat Treatment', route: { view: 'capabilities' as const, subSlug: 'heat-treatment' } },
                { label: 'Metallurgical Testing & NDT Lab', route: { view: 'capabilities' as const, subSlug: 'metal-testing-analysis' } },
                { label: 'Fabrication & Welding', route: { view: 'capabilities' as const, subSlug: 'metal-fabrication' } },
                { label: 'Additive Manufacturing', route: { view: 'capabilities' as const, subSlug: 'additive-manufacturing' } },
                { label: 'Quality Standards & Testing', route: { view: 'about-us' as const, subSection: 'certifications' as const } },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(item.route)}
                    className="hover:text-white hover:translate-x-0.5 text-slate-400 transition-all duration-150 text-left cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources & Fast RFQ */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full inline-block"></span>
              Resources & Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              {[
                { label: 'Company Overview', route: { view: 'about-us' as const, subSection: 'overview' as const } },
                { label: 'Technical Case Studies', route: { view: 'resources' as const, subTab: 'case-studies' as const } },
                { label: 'Technical Blog & Insights', route: { view: 'resources' as const, subTab: 'blog' as const } },
                { label: 'Metallurgy Glossary', route: { view: 'resources' as const, subTab: 'glossary' as const } },
                { label: 'Frequently Asked Questions', route: { view: 'resources' as const, subTab: 'faqs' as const } },
                { label: 'Technical Downloads', route: { view: 'resources' as const, subTab: 'downloads' as const } },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(item.route)}
                    className="hover:text-white hover:translate-x-0.5 text-slate-400 transition-all duration-150 text-left cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Quick RFQ CTA Button */}
            <div className="pt-2">
              <button
                onClick={onOpenRfq}
                className="w-full py-2.5 px-3 bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white text-xs font-semibold rounded flex items-center justify-center gap-2 shadow-sm transition-all duration-200 cursor-pointer"
              >
                <span>Request a Quote (RFQ)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Sub-Footer: Legal, Compliance, & Copyright */}
      <div className="border-t border-slate-800/80 bg-[#050A17]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          
          {/* Legal Navigation Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-1.5">
            <button
              onClick={() => onNavigate({ view: 'privacy-policy' })}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <button
              onClick={() => onNavigate({ view: 'terms-conditions' })}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <button
              onClick={() => onNavigate({ view: 'accessibility-statement' })}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Accessibility
            </button>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <button
              onClick={onOpenCookies}
              className="hover:text-slate-200 transition-colors cursor-pointer"
            >
              Cookie Settings
            </button>
          </div>

          {/* Certifications & Copyright */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>ISO 9001:2015 Certified</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="text-[11px] text-slate-400">
              {SITE_METADATA.copyright}
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};
