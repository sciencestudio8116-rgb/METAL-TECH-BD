import React, { useState, useRef, useEffect } from 'react';
import { PageRoute, Language } from '../types/navigation';
import { CASTING_PROCESSES, CAPABILITIES, MARKET_SOLUTIONS, DIVISIONS, SITE_METADATA } from '../data/siteData';
import { 
  Phone, Mail, Search, Menu, X, ChevronDown, 
  ArrowRight, Globe
} from 'lucide-react';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: (prefill?: { alloy?: string; process?: string }) => void;
  onOpenSearch: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  onOpenRfq,
  onOpenSearch,
  language,
  onToggleLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<{ [key: string]: boolean }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileSub = (key: string) => {
    setMobileExpanded(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isBn = language === 'bn';

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#D9DCE1] shadow-xs" ref={dropdownRef}>
      {/* 1.1 Utility Top Bar */}
      <div className="bg-[#0F1B2D] text-white text-[13px] border-b border-slate-800">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
          {/* Left: Contact Direct */}
          <div className="flex items-center gap-5 text-slate-300">
            <a 
              href={`tel:${SITE_METADATA.phone.replace(/\s+/g, '')}`} 
              className="flex items-center gap-1.5 hover:text-white transition-colors"
              title="Call Metal Tech BD"
            >
              <Phone className="w-3.5 h-3.5 text-[#F5B800]" />
              <span className="font-medium hidden sm:inline">{SITE_METADATA.phone}</span>
              <span className="font-medium sm:hidden">Call</span>
            </a>
            <a 
              href={`mailto:${SITE_METADATA.salesEmail}`} 
              className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors"
              title="Email Sales Desk"
            >
              <Mail className="w-3.5 h-3.5 text-[#F5B800]" />
              <span>{SITE_METADATA.salesEmail}</span>
            </a>
            <span className="hidden lg:inline-block text-slate-500">|</span>
            <span className="hidden lg:inline-block text-slate-300 text-xs">
              Dhaka Foundry · Gazipur Plant · Chittagong Port Hub
            </span>
          </div>

          {/* Right: Quick Links & Language */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => onNavigate({ view: 'why-metal-tech-bd' })}
              className="hover:text-white text-slate-300 transition-colors whitespace-nowrap text-xs sm:text-[13px] cursor-pointer"
            >
              {isBn ? 'কেন মেটাল টেক?' : 'Why Metal Tech BD?'}
            </button>
            <button 
              onClick={() => onNavigate({ view: 'resources', subTab: 'case-studies' })}
              className="hidden sm:inline-block hover:text-white text-slate-300 transition-colors whitespace-nowrap text-xs sm:text-[13px] cursor-pointer"
            >
              {isBn ? 'কেস স্টাডিজ' : 'Case Studies'}
            </button>
            <button 
              onClick={() => onNavigate({ view: 'careers' })}
              className="hidden md:inline-block hover:text-white text-slate-300 transition-colors whitespace-nowrap text-xs sm:text-[13px] cursor-pointer"
            >
              {isBn ? 'ক্যারিয়ার' : 'Careers'}
            </button>

            {/* Language Switcher */}
            <button 
              onClick={onToggleLanguage}
              className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[#F5B800] border border-slate-700 text-xs font-semibold transition-colors cursor-pointer"
              title="Toggle English / বাংলা"
            >
              <Globe className="w-3 h-3" />
              <span>{isBn ? 'English' : 'বাংলা'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1.2 Main Navigation Bar */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-4">
        {/* Brand Wordmark (Single Text Element per Top Bar Contract) */}
        <button 
          onClick={() => { setActiveDropdown(null); onNavigate({ view: 'home' }); }}
          className="text-left group flex items-center gap-2.5 focus:outline-hidden shrink-0 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-sm bg-[#1D4ED8] flex items-center justify-center text-white font-extrabold text-xl shadow-xs group-hover:bg-[#163A9E] transition-colors">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-[20px] font-black tracking-tight text-[#0F1B2D] leading-none">
              METAL TECH BD
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#1D4ED8] mt-0.5">
              High-Integrity Castings
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[15px] font-semibold text-[#1F2933]">
          {/* Metal Casting */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'casting' ? null : 'casting')}
              className={`flex items-center gap-1 px-3 py-2 rounded-sm hover:text-[#1D4ED8] transition-colors cursor-pointer ${
                currentRoute.view === 'metal-casting' ? 'text-[#1D4ED8]' : ''
              }`}
            >
              <span>{isBn ? 'মেটাল কাস্টিং' : 'Metal Casting'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'casting' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'casting' && (
              <div className="absolute top-full left-0 mt-1 w-[320px] bg-white border border-[#D9DCE1] rounded-sm shadow-xl p-3 z-50 flex flex-col gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isBn ? 'কাস্টিং প্রক্রিয়া' : 'Engineered Casting Processes'}
                  </span>
                  <button 
                    onClick={() => { setActiveDropdown(null); onNavigate({ view: 'metal-casting' }); }}
                    className="text-xs text-[#1D4ED8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {isBn ? 'সব দেখুন' : 'Overview Hub'} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                {CASTING_PROCESSES.map((proc) => (
                  <button
                    key={proc.slug}
                    onClick={() => {
                      setActiveDropdown(null);
                      onNavigate({ view: 'metal-casting', subSlug: proc.slug });
                    }}
                    className="w-full text-left px-3 py-2 rounded-sm hover:bg-[#F3F4F6] text-sm font-semibold text-[#0F1B2D] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                  >
                    {proc.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Capabilities */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'capabilities' ? null : 'capabilities')}
              className={`flex items-center gap-1 px-3 py-2 rounded-sm hover:text-[#1D4ED8] transition-colors cursor-pointer ${
                currentRoute.view === 'capabilities' ? 'text-[#1D4ED8]' : ''
              }`}
            >
              <span>{isBn ? 'দক্ষতা ও সেবা' : 'Capabilities'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'capabilities' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'capabilities' && (
              <div className="absolute top-full left-0 mt-1 w-[320px] bg-white border border-[#D9DCE1] rounded-sm shadow-xl p-3 z-50 flex flex-col gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isBn ? 'উত্পাদন ও ইঞ্জিনিয়ারিং সেবা' : 'Manufacturing & Engineering Services'}
                  </span>
                  <button 
                    onClick={() => { setActiveDropdown(null); onNavigate({ view: 'capabilities' }); }}
                    className="text-xs text-[#1D4ED8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {isBn ? 'সব দেখুন' : 'View Hub'} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                {CAPABILITIES.map((cap) => (
                  <button
                    key={cap.slug}
                    onClick={() => {
                      setActiveDropdown(null);
                      onNavigate({ view: 'capabilities', subSlug: cap.slug });
                    }}
                    className="w-full text-left px-3 py-2 rounded-sm hover:bg-[#F3F4F6] text-sm font-semibold text-[#0F1B2D] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                  >
                    {cap.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Alloys */}
          <button
            onClick={() => { setActiveDropdown(null); onNavigate({ view: 'alloys' }); }}
            className={`px-3 py-2 rounded-sm hover:text-[#1D4ED8] transition-colors cursor-pointer ${
              currentRoute.view === 'alloys' ? 'text-[#1D4ED8] font-bold' : ''
            }`}
          >
            {isBn ? 'অ্যালয় ও উপাদান' : 'Alloys & Materials'}
          </button>

          {/* Market Solutions */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'markets' ? null : 'markets')}
              className={`flex items-center gap-1 px-3 py-2 rounded-sm hover:text-[#1D4ED8] transition-colors cursor-pointer ${
                currentRoute.view === 'market-solutions' ? 'text-[#1D4ED8]' : ''
              }`}
            >
              <span>{isBn ? 'শিল্প সমাধান' : 'Market Solutions'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'markets' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'markets' && (
              <div className="absolute top-full left-0 mt-1 w-[320px] bg-white border border-[#D9DCE1] rounded-sm shadow-xl p-3 z-50 flex flex-col gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isBn ? 'শিল্প খাত' : 'Key Industry Sectors'}
                  </span>
                  <button 
                    onClick={() => { setActiveDropdown(null); onNavigate({ view: 'market-solutions' }); }}
                    className="text-xs text-[#1D4ED8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {isBn ? 'সব দেখুন' : 'All Markets'} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                {MARKET_SOLUTIONS.map((mkt) => (
                  <button
                    key={mkt.slug}
                    onClick={() => {
                      setActiveDropdown(null);
                      onNavigate({ view: 'market-solutions', subSlug: mkt.slug });
                    }}
                    className="w-full text-left px-3 py-2 rounded-sm hover:bg-[#F3F4F6] text-sm font-semibold text-[#0F1B2D] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                  >
                    {mkt.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* About Us Dropdown (Replaces Divisions and Facilities) */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'about' ? null : 'about')}
              className={`flex items-center gap-1 px-3 py-2 rounded-sm hover:text-[#1D4ED8] transition-colors cursor-pointer ${
                currentRoute.view === 'about-us' || currentRoute.view === 'why-metal-tech-bd' || currentRoute.view === 'company-history' || currentRoute.view === 'certifications' ? 'text-[#1D4ED8] font-bold' : ''
              }`}
            >
              <span>{isBn ? 'আমাদের সম্পর্কে' : 'About Us'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'about' && (
              <div className="absolute top-full left-0 mt-1 w-[320px] bg-white border border-[#D9DCE1] rounded-sm shadow-xl p-3 z-50 flex flex-col gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isBn ? 'প্রতিষ্ঠান পরিচিতি' : 'Corporate Identity'}
                  </span>
                  <button 
                    onClick={() => { setActiveDropdown(null); onNavigate({ view: 'about-us', subSection: 'overview' }); }}
                    className="text-xs text-[#1D4ED8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {isBn ? 'মূল পাতা' : 'Overview'} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <button
                  onClick={() => { setActiveDropdown(null); onNavigate({ view: 'about-us', subSection: 'overview' }); }}
                  className="w-full text-left px-3 py-2 rounded-sm hover:bg-[#F3F4F6] text-sm font-semibold text-[#0F1B2D] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Company Overview / Who We Are
                </button>
                <button
                  onClick={() => { setActiveDropdown(null); onNavigate({ view: 'about-us', subSection: 'history' }); }}
                  className="w-full text-left px-3 py-2 rounded-sm hover:bg-[#F3F4F6] text-sm font-semibold text-[#0F1B2D] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Our History / Legacy
                </button>
                <button
                  onClick={() => { setActiveDropdown(null); onNavigate({ view: 'about-us', subSection: 'mission-vision' }); }}
                  className="w-full text-left px-3 py-2 rounded-sm hover:bg-[#F3F4F6] text-sm font-semibold text-[#0F1B2D] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Mission & Vision
                </button>
                <button
                  onClick={() => { setActiveDropdown(null); onNavigate({ view: 'about-us', subSection: 'leadership' }); }}
                  className="w-full text-left px-3 py-2 rounded-sm hover:bg-[#F3F4F6] text-sm font-semibold text-[#0F1B2D] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Leadership & Team
                </button>
                <button
                  onClick={() => { setActiveDropdown(null); onNavigate({ view: 'about-us', subSection: 'certifications' }); }}
                  className="w-full text-left px-3 py-2 rounded-sm hover:bg-[#F3F4F6] text-sm font-semibold text-[#0F1B2D] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Quality Standards & Certifications
                </button>
              </div>
            )}
          </div>

          {/* Resources */}
          <div className="relative">
            <button
              onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
              className={`flex items-center gap-1 px-3 py-2 rounded-sm hover:text-[#1D4ED8] transition-colors cursor-pointer ${
                currentRoute.view === 'resources' ? 'text-[#1D4ED8]' : ''
              }`}
            >
              <span>{isBn ? 'রিসোর্স' : 'Resources'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
            </button>

            {activeDropdown === 'resources' && (
              <div className="absolute top-full right-0 mt-1 w-[260px] bg-white border border-[#D9DCE1] rounded-sm shadow-xl p-3 z-50 flex flex-col gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="pb-2 mb-1 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {isBn ? 'কারিগরি রিসোর্স' : 'Technical Resources'}
                  </span>
                  <button 
                    onClick={() => { setActiveDropdown(null); onNavigate({ view: 'resources', subTab: 'blog' }); }}
                    className="text-xs text-[#1D4ED8] font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    {isBn ? 'সব দেখুন' : 'Resource Hub'} <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                <button 
                  onClick={() => { setActiveDropdown(null); onNavigate({ view: 'resources', subTab: 'blog' }); }}
                  className="w-full text-left px-3 py-2 rounded-sm hover:bg-[#F3F4F6] text-sm font-semibold text-[#0F1B2D] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Technical Blog
                </button>
                <button 
                  onClick={() => { setActiveDropdown(null); onNavigate({ view: 'resources', subTab: 'case-studies' }); }}
                  className="w-full text-left px-3 py-2 rounded-sm hover:bg-[#F3F4F6] text-sm font-semibold text-[#0F1B2D] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Engineering Case Studies
                </button>
                <button 
                  onClick={() => { setActiveDropdown(null); onNavigate({ view: 'resources', subTab: 'faqs' }); }}
                  className="w-full text-left px-3 py-2 rounded-sm hover:bg-[#F3F4F6] text-sm font-semibold text-[#0F1B2D] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Technical FAQs
                </button>
                <button 
                  onClick={() => { setActiveDropdown(null); onNavigate({ view: 'resources', subTab: 'glossary' }); }}
                  className="w-full text-left px-3 py-2 rounded-sm hover:bg-[#F3F4F6] text-sm font-semibold text-[#0F1B2D] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Metallurgy Glossary
                </button>
                <button 
                  onClick={() => { setActiveDropdown(null); onNavigate({ view: 'resources', subTab: 'downloads' }); }}
                  className="w-full text-left px-3 py-2 rounded-sm hover:bg-[#F3F4F6] text-sm font-semibold text-[#0F1B2D] hover:text-[#1D4ED8] transition-colors cursor-pointer"
                >
                  Downloads & Brochures
                </button>
              </div>
            )}
          </div>

          {/* Contact Us Menu Link */}
          <button
            onClick={() => { setActiveDropdown(null); onNavigate({ view: 'contact-us' }); }}
            className={`px-3 py-2 rounded-sm hover:text-[#1D4ED8] transition-colors cursor-pointer ${
              currentRoute.view === 'contact-us' ? 'text-[#1D4ED8] font-bold' : ''
            }`}
          >
            {isBn ? 'যোগাযোগ' : 'Contact Us'}
          </button>
        </nav>

        {/* Right Action: Search Icon + Primary RFQ Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={onOpenSearch}
            className="p-2.5 rounded-sm text-[#5B6470] hover:text-[#0F1B2D] hover:bg-[#F3F4F6] transition-colors cursor-pointer"
            title="Search alloys, processes, products"
            aria-label="Search site"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => onOpenRfq()}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-[15px] font-bold rounded-sm shadow-xs transition-all active:scale-[0.98] whitespace-nowrap cursor-pointer"
          >
            {isBn ? 'কোটেশন অনুরোধ' : 'Request a Quote'}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#0F1B2D] hover:bg-[#F3F4F6] rounded-sm cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[108px] bottom-0 bg-white z-50 overflow-y-auto border-t border-[#D9DCE1] p-4 flex flex-col justify-between">
          <div className="space-y-2 pb-6">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-slate-400">Navigation</span>
              <button 
                onClick={onToggleLanguage}
                className="text-xs font-semibold text-[#1D4ED8] px-2 py-1 rounded bg-slate-100 cursor-pointer"
              >
                {isBn ? 'English version' : 'বাংলা সংস্করণ'}
              </button>
            </div>

            {/* Mobile: Metal Casting */}
            <div>
              <button
                onClick={() => toggleMobileSub('casting')}
                className="w-full flex items-center justify-between py-2.5 font-bold text-[#0F1B2D] text-base cursor-pointer"
              >
                <span>{isBn ? 'মেটাল কাস্টিং' : 'Metal Casting'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['casting'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['casting'] && (
                <div className="pl-4 pb-2 space-y-1.5 border-l-2 border-slate-200 ml-2">
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'metal-casting' }); }}
                    className="block py-1 text-sm font-semibold text-[#1D4ED8] cursor-pointer"
                  >
                    → Casting Overview Hub
                  </button>
                  {CASTING_PROCESSES.map((proc) => (
                    <button
                      key={proc.slug}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate({ view: 'metal-casting', subSlug: proc.slug });
                      }}
                      className="block py-1 text-sm text-[#5B6470] hover:text-[#1D4ED8] cursor-pointer"
                    >
                      {proc.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile: Capabilities */}
            <div>
              <button
                onClick={() => toggleMobileSub('capabilities')}
                className="w-full flex items-center justify-between py-2.5 font-bold text-[#0F1B2D] text-base cursor-pointer"
              >
                <span>{isBn ? 'দক্ষতা ও প্রযুক্তি' : 'Capabilities'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['capabilities'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['capabilities'] && (
                <div className="pl-4 pb-2 space-y-1.5 border-l-2 border-slate-200 ml-2">
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'capabilities' }); }}
                    className="block py-1 text-sm font-semibold text-[#1D4ED8] cursor-pointer"
                  >
                    → Capabilities Overview
                  </button>
                  {CAPABILITIES.map((cap) => (
                    <button
                      key={cap.slug}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate({ view: 'capabilities', subSlug: cap.slug });
                      }}
                      className="block py-1 text-sm text-[#5B6470] hover:text-[#1D4ED8] cursor-pointer"
                    >
                      {cap.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile: Alloys */}
            <button
              onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'alloys' }); }}
              className="w-full text-left py-2.5 font-bold text-[#0F1B2D] text-base cursor-pointer"
            >
              {isBn ? 'অ্যালয় ও উপকরণ' : 'Alloys (Guide & Finder)'}
            </button>

            {/* Mobile: Market Solutions */}
            <div>
              <button
                onClick={() => toggleMobileSub('markets')}
                className="w-full flex items-center justify-between py-2.5 font-bold text-[#0F1B2D] text-base cursor-pointer"
              >
                <span>{isBn ? 'শিল্প সমাধান' : 'Market Solutions'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['markets'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['markets'] && (
                <div className="pl-4 pb-2 space-y-1.5 border-l-2 border-slate-200 ml-2">
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'market-solutions' }); }}
                    className="block py-1 text-sm font-semibold text-[#1D4ED8] cursor-pointer"
                  >
                    → Market Solutions Hub
                  </button>
                  {MARKET_SOLUTIONS.map((mkt) => (
                    <button
                      key={mkt.slug}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        onNavigate({ view: 'market-solutions', subSlug: mkt.slug });
                      }}
                      className="block py-1 text-sm text-[#5B6470] hover:text-[#1D4ED8] cursor-pointer"
                    >
                      {mkt.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile: About Us Accordion */}
            <div>
              <button
                onClick={() => toggleMobileSub('about')}
                className="w-full flex items-center justify-between py-2.5 font-bold text-[#0F1B2D] text-base cursor-pointer"
              >
                <span>{isBn ? 'আমাদের সম্পর্কে' : 'About Us'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['about'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['about'] && (
                <div className="pl-4 pb-2 space-y-1.5 border-l-2 border-slate-200 ml-2">
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'about-us', subSection: 'overview' }); }}
                    className="block py-1 text-sm text-[#5B6470] hover:text-[#1D4ED8] cursor-pointer"
                  >
                    Company Overview / Who We Are
                  </button>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'about-us', subSection: 'history' }); }}
                    className="block py-1 text-sm text-[#5B6470] hover:text-[#1D4ED8] cursor-pointer"
                  >
                    Our History / Legacy
                  </button>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'about-us', subSection: 'mission-vision' }); }}
                    className="block py-1 text-sm text-[#5B6470] hover:text-[#1D4ED8] cursor-pointer"
                  >
                    Mission & Vision
                  </button>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'about-us', subSection: 'leadership' }); }}
                    className="block py-1 text-sm text-[#5B6470] hover:text-[#1D4ED8] cursor-pointer"
                  >
                    Leadership & Team
                  </button>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'about-us', subSection: 'certifications' }); }}
                    className="block py-1 text-sm text-[#5B6470] hover:text-[#1D4ED8] cursor-pointer"
                  >
                    Quality Standards & Certifications
                  </button>
                </div>
              )}
            </div>

            {/* Mobile: Resources */}
            <div>
              <button
                onClick={() => toggleMobileSub('resources')}
                className="w-full flex items-center justify-between py-2.5 font-bold text-[#0F1B2D] text-base cursor-pointer"
              >
                <span>{isBn ? 'রিসোর্স ও তথ্য' : 'Resources'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpanded['resources'] ? 'rotate-180' : ''}`} />
              </button>
              {mobileExpanded['resources'] && (
                <div className="pl-4 pb-2 space-y-1.5 border-l-2 border-slate-200 ml-2">
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'resources', subTab: 'blog' }); }}
                    className="block py-1 text-sm text-[#5B6470] hover:text-[#1D4ED8] cursor-pointer"
                  >
                    Technical Blog
                  </button>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'resources', subTab: 'case-studies' }); }}
                    className="block py-1 text-sm text-[#5B6470] hover:text-[#1D4ED8] cursor-pointer"
                  >
                    Case Studies
                  </button>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'resources', subTab: 'faqs' }); }}
                    className="block py-1 text-sm text-[#5B6470] hover:text-[#1D4ED8] cursor-pointer"
                  >
                    FAQs
                  </button>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'resources', subTab: 'glossary' }); }}
                    className="block py-1 text-sm text-[#5B6470] hover:text-[#1D4ED8] cursor-pointer"
                  >
                    Metallurgy Glossary
                  </button>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'resources', subTab: 'downloads' }); }}
                    className="block py-1 text-sm text-[#5B6470] hover:text-[#1D4ED8] cursor-pointer"
                  >
                    Downloads
                  </button>
                </div>
              )}
            </div>


            <button
              onClick={() => { setMobileMenuOpen(false); onNavigate({ view: 'contact-us' }); }}
              className="w-full text-left py-2.5 font-bold text-[#0F1B2D] text-base cursor-pointer"
            >
              {isBn ? 'যোগাযোগ' : 'Contact Us'}
            </button>
          </div>

          {/* Bottom Mobile Action Buttons */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenRfq(); }}
              className="w-full py-3 bg-[#1D4ED8] text-white font-bold text-center rounded-sm shadow-sm cursor-pointer"
            >
              Request a Quote
            </button>
            <a
              href={`tel:${SITE_METADATA.phone.replace(/\s+/g, '')}`}
              className="w-full py-2.5 bg-slate-100 text-[#0F1B2D] font-semibold text-center rounded-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#1D4ED8]" /> Call Engineering Desk
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
