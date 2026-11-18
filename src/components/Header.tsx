import React, { useState, useRef, useEffect } from 'react';
import { PageRoute, Language } from '../types/navigation';
import { SITE_METADATA } from '../data/siteData';
import { useAdmin, NavigationMenuItem, NavigationSubItem } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  Phone, Mail, Menu, X, ChevronDown, 
  Globe
} from 'lucide-react';

interface HeaderProps {
  currentRoute: PageRoute;
  onNavigate: (route: PageRoute) => void;
  onOpenRfq?: (prefill?: { alloy?: string; process?: string }) => void;
  onOpenSearch?: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  onNavigate,
  language,
  onToggleLanguage,
}) => {
  const { navigationMenu } = useAdmin();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<{ [key: string]: boolean }>({});
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isBn = language === 'bn';

  const getSubLabel = (sub: NavigationSubItem) => {
    if (isBn && t.header.subMenus[sub.id]) {
      return t.header.subMenus[sub.id];
    }
    return sub.label;
  };

  const getMenuLabel = (menu: NavigationMenuItem) => {
    if (isBn) {
      if (menu.id === 'casting') return 'মেটাল কাস্টিং';
      if (menu.id === 'capabilities') return 'দক্ষতা ও সেবা';
      if (menu.id === 'alloys') return 'অ্যালয় ও উপাদান';
      if (menu.id === 'markets') return 'শিল্প সমাধান';
      if (menu.id === 'about') return 'আমাদের সম্পর্কে';
      if (menu.id === 'resources') return 'রিসোর্স';
    }
    if (menu.id === 'resources' && menu.label === 'Resources Hub') {
      return 'Resources';
    }
    return menu.label;
  };

  const castingMenu = navigationMenu.find(m => m.id === 'casting');
  const capabilitiesMenu = navigationMenu.find(m => m.id === 'capabilities');
  const alloysMenu = navigationMenu.find(m => m.id === 'alloys');
  const marketsMenu = navigationMenu.find(m => m.id === 'markets');
  const aboutMenu = navigationMenu.find(m => m.id === 'about');
  const resourcesMenu = navigationMenu.find(m => m.id === 'resources');

  const coreMenuIds = new Set(['casting', 'capabilities', 'alloys', 'markets', 'about', 'resources']);
  const customMenus = navigationMenu.filter(m => !coreMenuIds.has(m.id));

  const castingSubItems = castingMenu?.subItems || [];
  const capabilitiesSubItems = capabilitiesMenu?.subItems || [];
  const alloysSubItems = alloysMenu?.subItems || [];
  const marketsSubItems = marketsMenu?.subItems || [];
  const aboutSubItems = aboutMenu?.subItems || [];
  const resourcesSubItems = resourcesMenu?.subItems || [];

  const handleSubItemClick = (sub: NavigationSubItem) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    if (sub.routeView === 'about-us') {
      onNavigate({ view: 'about-us', subSection: (sub.subSection as any) || 'overview' });
    } else if (sub.routeView === 'resources') {
      onNavigate({ view: 'resources', subTab: (sub.subTab as any) || 'blog' });
    } else if (sub.routeView === 'metal-casting') {
      onNavigate({ view: 'metal-casting', subSlug: sub.subSlug });
    } else if (sub.routeView === 'capabilities') {
      onNavigate({ view: 'capabilities', subSlug: sub.subSlug });
    } else if (sub.routeView === 'market-solutions') {
      onNavigate({ view: 'market-solutions', subSlug: sub.subSlug });
    } else if (sub.routeView === 'alloys') {
      onNavigate({ view: 'alloys' });
    } else if (sub.routeView === 'contact-us') {
      onNavigate({ view: 'contact-us' });
    } else {
      onNavigate({ view: 'home' });
    }
  };

  const handleMainMenuClick = (route: PageRoute) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(route);
  };

  const handleCustomMenuClick = (menu: NavigationMenuItem) => {
    const view = menu.routeView as PageRoute['view'];
    if (view === 'about-us') {
      handleMainMenuClick({ view: 'about-us', subSection: 'overview' });
    } else if (view === 'resources') {
      handleMainMenuClick({ view: 'resources', subTab: 'blog' });
    } else if (view === 'metal-casting' || view === 'capabilities' || view === 'market-solutions') {
      handleMainMenuClick({ view });
    } else if (view === 'alloys' || view === 'contact-us' || view === 'careers' || view === 'divisions') {
      handleMainMenuClick({ view });
    } else if (menu.subItems && menu.subItems.length > 0) {
      handleSubItemClick(menu.subItems[0]);
    } else {
      handleMainMenuClick({ view: 'home' });
    }
  };

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

  const desktopNavItems: {
    key: string;
    label: string;
    isActive: boolean;
    onMainClick: () => void;
    subItems: NavigationSubItem[];
    alignRight?: boolean;
  }[] = [
    {
      key: 'casting',
      label: castingMenu ? getMenuLabel(castingMenu) : (isBn ? 'মেটাল কাস্টিং' : 'Metal Casting'),
      isActive: currentRoute.view === 'metal-casting',
      onMainClick: () => handleMainMenuClick({ view: 'metal-casting' }),
      subItems: castingSubItems,
    },
    {
      key: 'capabilities',
      label: capabilitiesMenu ? getMenuLabel(capabilitiesMenu) : (isBn ? 'দক্ষতা ও সেবা' : 'Capabilities'),
      isActive: currentRoute.view === 'capabilities',
      onMainClick: () => handleMainMenuClick({ view: 'capabilities' }),
      subItems: capabilitiesSubItems,
    },
    {
      key: 'alloys',
      label: alloysMenu ? getMenuLabel(alloysMenu) : (isBn ? 'অ্যালয় ও উপাদান' : 'Alloys & Materials'),
      isActive: currentRoute.view === 'alloys',
      onMainClick: () => handleMainMenuClick({ view: 'alloys' }),
      subItems: alloysSubItems,
    },
    {
      key: 'markets',
      label: marketsMenu ? getMenuLabel(marketsMenu) : (isBn ? 'শিল্প সমাধান' : 'Market Solutions'),
      isActive: currentRoute.view === 'market-solutions',
      onMainClick: () => handleMainMenuClick({ view: 'market-solutions' }),
      subItems: marketsSubItems,
    },
    {
      key: 'resources',
      label: resourcesMenu ? getMenuLabel(resourcesMenu) : (isBn ? 'রিসোর্স' : 'Resources'),
      isActive: currentRoute.view === 'resources',
      onMainClick: () => handleMainMenuClick({ view: 'resources', subTab: 'blog' }),
      subItems: resourcesSubItems,
    },
    {
      key: 'about',
      label: aboutMenu ? getMenuLabel(aboutMenu) : (isBn ? 'আমাদের সম্পর্কে' : 'About Us'),
      isActive:
        currentRoute.view === 'about-us' ||
        currentRoute.view === 'why-metal-tech-bd' ||
        currentRoute.view === 'company-history' ||
        currentRoute.view === 'certifications',
      onMainClick: () => handleMainMenuClick({ view: 'about-us', subSection: 'overview' }),
      subItems: aboutSubItems,
      alignRight: true,
    },
    ...customMenus.map((cm) => ({
      key: cm.id,
      label: getMenuLabel(cm),
      isActive: currentRoute.view === cm.routeView,
      onMainClick: () => handleCustomMenuClick(cm),
      subItems: cm.subItems || [],
      alignRight: true,
    })),
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-xs" ref={dropdownRef}>
      {/* 1.1 Utility Top Bar */}
      <div className="bg-[#0F1B2D] text-white text-[13px] border-b border-slate-800">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between">
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
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[74px] flex items-center justify-between gap-6 lg:gap-10">
        {/* Brand Wordmark aligned to extreme left */}
        <button 
          onClick={() => handleMainMenuClick({ view: 'home' })}
          className="text-left group flex items-center gap-3 focus:outline-hidden shrink-0 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-md bg-[#1D4ED8] flex items-center justify-center text-white font-black text-xl shadow-xs group-hover:bg-[#163A9E] transition-colors">
            M
          </div>
          <div className="flex flex-col">
            <span className="text-[20px] font-black tracking-tight text-[#0F1B2D] leading-none">
              METAL TECH BD
            </span>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#1D4ED8] mt-1">
              High-Integrity Castings
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links — Evenly Spaced & Hover-Activated */}
        <nav className="hidden lg:flex flex-1 items-center justify-evenly xl:justify-between max-w-5xl ml-auto text-[14.5px] xl:text-[15px] font-semibold text-[#1F2933]">
          {desktopNavItems.map((item) => {
            const isOpen = activeDropdown === item.key;
            const hasSubItems = item.subItems.length > 0;
            const isHighlighted = item.isActive || isOpen;

            return (
              <div
                key={item.key}
                className="relative group"
                onMouseEnter={() => hasSubItems && setActiveDropdown(item.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={item.onMainClick}
                  className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-[3px] whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isHighlighted
                      ? 'bg-[#0F1B2D] text-[#F5B800] shadow-xs'
                      : 'text-[#1F2933] hover:bg-[#0F1B2D] hover:text-[#F5B800]'
                  }`}
                >
                  <span>{item.label}</span>
                  {hasSubItems && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen
                          ? 'rotate-180 text-[#F5B800]'
                          : isHighlighted
                          ? 'text-[#F5B800]'
                          : 'text-slate-400 group-hover:text-[#F5B800]'
                      }`}
                    />
                  )}
                </button>

                {/* Hover-Activated Dropdown Panel */}
                {hasSubItems && (
                  <div
                    className={`absolute top-full pt-1.5 z-50 transition-all duration-200 ease-out ${
                      item.alignRight ? 'right-0' : 'left-0'
                    } ${
                      isOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-1.5 pointer-events-none'
                    }`}
                  >
                    <div className="w-[275px] bg-white border border-slate-200/95 rounded-[4px] shadow-[0_16px_36px_-8px_rgba(15,27,45,0.22)] p-1.5 ring-1 ring-slate-900/5">
                      <div className="flex flex-col gap-0.5">
                        {item.subItems.map((sub) => {
                          const isSubActive =
                            (sub.routeView === 'metal-casting' && currentRoute.view === 'metal-casting' && currentRoute.subSlug === sub.subSlug) ||
                            (sub.routeView === 'capabilities' && currentRoute.view === 'capabilities' && currentRoute.subSlug === sub.subSlug) ||
                            (sub.routeView === 'market-solutions' && currentRoute.view === 'market-solutions' && currentRoute.subSlug === sub.subSlug) ||
                            (sub.routeView === 'about-us' && currentRoute.view === 'about-us' && currentRoute.subSection === sub.subSection) ||
                            (sub.routeView === 'resources' && currentRoute.view === 'resources' && currentRoute.subTab === sub.subTab);

                          return (
                            <button
                              key={sub.id}
                              onClick={() => handleSubItemClick(sub)}
                              className={`w-full text-left px-4 py-2.5 rounded-[3px] text-[13.5px] font-semibold transition-all duration-200 cursor-pointer block leading-snug ${
                                isSubActive
                                  ? 'bg-[#0F1B2D] text-[#F5B800]'
                                  : 'text-[#0F1B2D] hover:bg-[#0F1B2D] hover:text-[#F5B800]'
                              }`}
                            >
                              {getSubLabel(sub)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Contact Us Direct Menu Link */}
          <button
            onClick={() => handleMainMenuClick({ view: 'contact-us' })}
            className={`px-3.5 py-2.5 rounded-[3px] whitespace-nowrap transition-all duration-200 cursor-pointer ${
              currentRoute.view === 'contact-us'
                ? 'bg-[#0F1B2D] text-[#F5B800] shadow-xs'
                : 'text-[#1F2933] hover:bg-[#0F1B2D] hover:text-[#F5B800]'
            }`}
          >
            <span>{isBn ? 'যোগাযোগ' : 'Contact Us'}</span>
          </button>
        </nav>

        {/* Mobile Hamburger Toggle (Only visible below lg breakpoint) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#0F1B2D] hover:bg-slate-100 rounded-md cursor-pointer transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[111px] bottom-0 bg-white z-50 overflow-y-auto border-t border-slate-200 p-4 flex flex-col justify-between">
          <div className="space-y-1.5 pb-6">
            <div className="pb-3 mb-2 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Navigation</span>
              <button 
                onClick={onToggleLanguage}
                className="text-xs font-semibold text-[#1D4ED8] px-2.5 py-1 rounded bg-blue-50 cursor-pointer"
              >
                {isBn ? 'English version' : 'বাংলা সংস্করণ'}
              </button>
            </div>

            {desktopNavItems.map((item) => {
              const isExpanded = !!mobileExpanded[item.key];
              const hasSubItems = item.subItems.length > 0;

              return (
                <div key={item.key} className="border-b border-slate-100/80 last:border-b-0 py-1">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={item.onMainClick}
                      className={`flex-1 text-left font-bold text-base px-3 py-2 rounded-[3px] cursor-pointer transition-all duration-200 ${
                        item.isActive
                          ? 'bg-[#0F1B2D] text-[#F5B800]'
                          : 'text-[#0F1B2D] hover:bg-[#0F1B2D] hover:text-[#F5B800]'
                      }`}
                    >
                      {item.label}
                    </button>
                    {hasSubItems && (
                      <button
                        onClick={() => toggleMobileSub(item.key)}
                        className="p-2 rounded-[3px] text-slate-500 hover:bg-[#0F1B2D] hover:text-[#F5B800] transition-colors cursor-pointer"
                        aria-label={`Expand ${item.label}`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180 text-[#F5B800]' : ''}`} />
                      </button>
                    )}
                  </div>

                  {hasSubItems && isExpanded && (
                    <div className="pl-3 pt-1.5 pb-2 space-y-1 border-l-2 border-[#0F1B2D]/20 ml-2">
                      {item.subItems.map((sub) => {
                        const isSubActive =
                          (sub.routeView === 'metal-casting' && currentRoute.view === 'metal-casting' && currentRoute.subSlug === sub.subSlug) ||
                          (sub.routeView === 'capabilities' && currentRoute.view === 'capabilities' && currentRoute.subSlug === sub.subSlug) ||
                          (sub.routeView === 'market-solutions' && currentRoute.view === 'market-solutions' && currentRoute.subSlug === sub.subSlug) ||
                          (sub.routeView === 'about-us' && currentRoute.view === 'about-us' && currentRoute.subSection === sub.subSection) ||
                          (sub.routeView === 'resources' && currentRoute.view === 'resources' && currentRoute.subTab === sub.subTab);

                        return (
                          <button
                            key={sub.id}
                            onClick={() => handleSubItemClick(sub)}
                            className={`block w-full text-left py-2 px-3 rounded-[3px] text-sm font-semibold transition-all duration-200 cursor-pointer ${
                              isSubActive
                                ? 'bg-[#0F1B2D] text-[#F5B800]'
                                : 'text-[#0F1B2D] hover:bg-[#0F1B2D] hover:text-[#F5B800]'
                            }`}
                          >
                            {getSubLabel(sub)}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-1">
              <button
                onClick={() => handleMainMenuClick({ view: 'contact-us' })}
                className={`w-full text-left px-3 py-2 rounded-[3px] font-bold text-base transition-all duration-200 cursor-pointer ${
                  currentRoute.view === 'contact-us'
                    ? 'bg-[#0F1B2D] text-[#F5B800]'
                    : 'text-[#0F1B2D] hover:bg-[#0F1B2D] hover:text-[#F5B800]'
                }`}
              >
                {isBn ? 'যোগাযোগ' : 'Contact Us'}
              </button>
            </div>
          </div>

          {/* Bottom Mobile Direct Contact Link */}
          <div className="pt-4 border-t border-slate-200">
            <a
              href={`tel:${SITE_METADATA.phone.replace(/\s+/g, '')}`}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-[#0F1B2D] font-semibold text-center rounded-[3px] flex items-center justify-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#1D4ED8]" /> {isBn ? 'ইঞ্জিনিয়ারিং ডেস্কে কল করুন' : 'Call Engineering Desk'}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
