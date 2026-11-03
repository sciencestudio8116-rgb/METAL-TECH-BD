import React, { useState, useEffect } from 'react';
import { PageRoute, Language } from './types/navigation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { RfqModal } from './components/RfqModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { CookieBanner } from './components/CookieBanner';
import { MobileStickyBar } from './components/MobileStickyBar';
import { AlloyFinder } from './components/AlloyFinder';
import { PageHero } from './components/PageHero';
import { IMAGES } from './assets/images';

import { HomeView } from './views/HomeView';
import { ProcessDetailView } from './views/ProcessDetailView';
import { CapabilityDetailView } from './views/CapabilityDetailView';
import { MarketDetailView } from './views/MarketDetailView';
import { DivisionsView } from './views/DivisionsView';
import { SalesContactsView } from './views/SalesContactsView';
import { ResourcesView } from './views/ResourcesView';
import { ArticleView } from './views/ArticleView';
import { CompanyProfileView } from './views/CompanyProfileView';
import { CareersView } from './views/CareersView';
import { ContactUsView } from './views/ContactUsView';
import { LegalView } from './views/LegalView';
import { AdminDashboardView } from './views/admin/AdminDashboardView';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { AdminFloatingTrigger } from './components/admin/AdminFloatingTrigger';
import { ShieldCheck, Lock, ArrowLeft } from 'lucide-react';

function AppContent() {
  const { isAuthenticated } = useAdmin();
  const [currentRoute, setCurrentRoute] = useState<PageRoute>({ view: 'home' });
  const [language, setLanguage] = useState<Language>('en');
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);

  // Modals
  const [rfqOpen, setRfqOpen] = useState(false);
  const [rfqPrefill, setRfqPrefill] = useState<{ alloy?: string; process?: string } | undefined>(undefined);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  // Check for /admin URL route or hash on mount/popstate
  useEffect(() => {
    const checkAdminRoute = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || hash === '#admin') {
        setCurrentRoute({ view: 'admin' });
      }
    };
    checkAdminRoute();
    window.addEventListener('popstate', checkAdminRoute);
    window.addEventListener('hashchange', checkAdminRoute);
    return () => {
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('hashchange', checkAdminRoute);
    };
  }, []);

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute]);

  const handleNavigate = (route: PageRoute) => {
    setCurrentRoute(route);
  };

  const handleOpenRfq = (prefill?: { alloy?: string; process?: string }) => {
    setRfqPrefill(prefill);
    setRfqOpen(true);
  };

  const handleToggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'bn' : 'en'));
  };

  // Dedicated full-screen Admin View when view is 'admin'
  if (currentRoute.view === 'admin') {
    if (isAuthenticated) {
      return <AdminDashboardView onNavigate={handleNavigate} />;
    }

    return (
      <div className="min-h-screen bg-[#070D1E] text-slate-100 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-[#0C1527] border border-cyan-500/30 rounded-lg p-8 shadow-2xl text-center space-y-5 animate-in fade-in duration-200">
          <div className="w-16 h-16 mx-auto rounded-full bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400 shadow-inner">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">Administrator Portal</h1>
            <p className="text-xs text-slate-400 mt-1">Metal Tek BD Master Content Management System</p>
          </div>
          <div className="p-3 rounded bg-slate-900 border border-slate-800 text-xs text-slate-300">
            Authentication required to access website management, alloy specs, and customer inquiries.
          </div>
          <div className="space-y-2.5">
            <button
              onClick={() => setAdminLoginOpen(true)}
              className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold rounded text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Unlock Admin Console</span>
            </button>
            <button
              onClick={() => handleNavigate({ view: 'home' })}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>

        <AdminLoginModal
          isOpen={adminLoginOpen}
          onClose={() => setAdminLoginOpen(false)}
          onSuccessRedirect={() => handleNavigate({ view: 'admin' })}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#1F2933] font-sans antialiased">
      {/* WCAG Skip to Main Content Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1D4ED8] focus:text-white focus:rounded focus:outline-hidden"
      >
        Skip to main content
      </a>

      {/* Global Header */}
      <Header
        currentRoute={currentRoute}
        onNavigate={handleNavigate}
        onOpenRfq={handleOpenRfq}
        onOpenSearch={() => setSearchOpen(true)}
        language={language}
        onToggleLanguage={handleToggleLanguage}
      />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {currentRoute.view === 'home' && (
          <HomeView 
            onNavigate={handleNavigate} 
            onOpenRfq={handleOpenRfq} 
          />
        )}

        {currentRoute.view === 'metal-casting' && (
          <ProcessDetailView
            slug={currentRoute.subSlug}
            onNavigate={handleNavigate}
            onOpenRfq={handleOpenRfq}
          />
        )}

        {currentRoute.view === 'capabilities' && (
          <CapabilityDetailView
            slug={currentRoute.subSlug}
            onNavigate={handleNavigate}
            onOpenRfq={handleOpenRfq}
          />
        )}

        {currentRoute.view === 'alloys' && (
          <div className="space-y-8 pb-12">
            <PageHero
              title="Alloys & Materials"
              badge="Metallurgy Guide"
              subtitle="Comprehensive alloy compositions, mechanical properties, and ASTM/EN international specifications"
              imageSrc={IMAGES.alloysGuide}
              imageAlt="High-Performance Specialty Alloys & Metallurgy Guide at Metal Tech BD"
            />
            <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-8">
              <AlloyFinder
                onSelectAlloyForQuote={(alloyName) => handleOpenRfq({ alloy: alloyName })}
                onOpenAlloyGuideDownload={() => handleOpenRfq({ alloy: 'All Alloy Master Guide' })}
              />
            </div>
          </div>
        )}

        {currentRoute.view === 'market-solutions' && (
          <MarketDetailView
            slug={currentRoute.subSlug}
            onNavigate={handleNavigate}
            onOpenRfq={handleOpenRfq}
          />
        )}

        {currentRoute.view === 'divisions' && (
          <DivisionsView
            onNavigate={handleNavigate}
            onOpenRfq={() => handleOpenRfq()}
          />
        )}

        {currentRoute.view === 'sales-contacts' && (
          <SalesContactsView
            initialMarketSlug={currentRoute.marketSlug}
            onNavigate={handleNavigate}
            onOpenRfq={handleOpenRfq}
          />
        )}

        {currentRoute.view === 'resources' && (
          <ResourcesView
            initialTab={currentRoute.subTab}
            onNavigate={handleNavigate}
            onOpenRfq={() => handleOpenRfq()}
          />
        )}

        {currentRoute.view === 'blog-post' && (
          <ArticleView
            slug={currentRoute.slug}
            type="blog"
            onNavigate={handleNavigate}
            onOpenRfq={handleOpenRfq}
          />
        )}

        {currentRoute.view === 'case-study' && (
          <ArticleView
            slug={currentRoute.slug}
            type="case-study"
            onNavigate={handleNavigate}
            onOpenRfq={handleOpenRfq}
          />
        )}

        {currentRoute.view === 'about-us' && (
          <CompanyProfileView
            section={currentRoute.subSection || 'overview'}
            onNavigate={handleNavigate}
            onOpenRfq={() => handleOpenRfq()}
          />
        )}

        {currentRoute.view === 'why-metal-tech-bd' && (
          <CompanyProfileView
            section="why-us"
            onNavigate={handleNavigate}
            onOpenRfq={() => handleOpenRfq()}
          />
        )}

        {currentRoute.view === 'certifications' && (
          <CompanyProfileView
            section="certifications"
            onNavigate={handleNavigate}
            onOpenRfq={() => handleOpenRfq()}
          />
        )}

        {currentRoute.view === 'company-history' && (
          <CompanyProfileView
            section="history"
            onNavigate={handleNavigate}
            onOpenRfq={() => handleOpenRfq()}
          />
        )}

        {currentRoute.view === 'careers' && (
          <CareersView
            onNavigate={handleNavigate}
            onOpenRfq={() => handleOpenRfq()}
          />
        )}

        {(currentRoute.view === 'contact-us' || currentRoute.view === 'request-a-quote') && (
          <ContactUsView
            isQuoteRequest={currentRoute.view === 'request-a-quote'}
            onNavigate={handleNavigate}
            onOpenRfq={() => handleOpenRfq()}
          />
        )}

        {currentRoute.view === 'privacy-policy' && (
          <LegalView type="privacy" onNavigate={handleNavigate} />
        )}

        {currentRoute.view === 'accessibility-statement' && (
          <LegalView type="accessibility" onNavigate={handleNavigate} />
        )}

        {currentRoute.view === 'terms-conditions' && (
          <LegalView type="terms" onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCookies={() => setCookieSettingsOpen(true)}
        onOpenRfq={() => handleOpenRfq()}
      />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar onOpenRfq={() => handleOpenRfq()} />

      {/* 4-Step RFQ Modal */}
      <RfqModal
        isOpen={rfqOpen}
        onClose={() => setRfqOpen(false)}
        prefill={rfqPrefill}
      />

      {/* Instant Global Search Modal */}
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Cookie Consent Banner & Settings Modal */}
      <CookieBanner
        forceOpen={cookieSettingsOpen}
        onCloseForce={() => setCookieSettingsOpen(false)}
      />

      {/* Temporary Testing Feature: Discreet Floating Admin Access Button */}
      <AdminFloatingTrigger
        onOpenLogin={() => setAdminLoginOpen(true)}
        onNavigateToAdmin={() => handleNavigate({ view: 'admin' })}
      />

      {/* Admin Login Security Dialog */}
      <AdminLoginModal
        isOpen={adminLoginOpen}
        onClose={() => setAdminLoginOpen(false)}
        onSuccessRedirect={() => handleNavigate({ view: 'admin' })}
      />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}
