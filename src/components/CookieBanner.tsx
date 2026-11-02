import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface CookieBannerProps {
  forceOpen?: boolean;
  onCloseForce?: () => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ forceOpen, onCloseForce }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('metaltech_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (forceOpen) {
      setIsVisible(true);
      setShowPreferences(true);
    }
  }, [forceOpen]);

  const handleAcceptAll = () => {
    localStorage.setItem('metaltech_cookie_consent', JSON.stringify({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
    setShowPreferences(false);
    onCloseForce?.();
  };

  const handleRejectNonEssential = () => {
    localStorage.setItem('metaltech_cookie_consent', JSON.stringify({
      necessary: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
    setShowPreferences(false);
    onCloseForce?.();
  };

  const handleSavePreferences = () => {
    localStorage.setItem('metaltech_cookie_consent', JSON.stringify({
      ...preferences,
      necessary: true,
      timestamp: new Date().toISOString(),
    }));
    setIsVisible(false);
    setShowPreferences(false);
    onCloseForce?.();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6 bg-transparent pointer-events-none">
      <div className="max-w-4xl mx-auto bg-[#1C2541] text-white border border-[#2B3E50] rounded-md shadow-2xl p-5 sm:p-6 pointer-events-auto animate-in slide-in-from-bottom-4 duration-300">
        {!showPreferences ? (
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#4CC9F0]" />
                <h4 className="text-sm font-bold text-white m-0">
                  Data Privacy & Cookie Preferences
                </h4>
              </div>
              <p className="text-xs text-[#8D99AE] leading-relaxed m-0">
                We use cookies and analytical tokens to guarantee RFQ session security, optimize technical alloy datasheets, and measure site performance. You can customize your preferences.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => setShowPreferences(true)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white border border-[#2B3E50] rounded hover:bg-[#223055] transition-colors cursor-pointer"
              >
                Customize
              </button>
              <button
                onClick={handleRejectNonEssential}
                className="px-3.5 py-2 text-xs font-semibold text-slate-300 hover:text-white border border-[#2B3E50] rounded hover:bg-[#223055] transition-colors cursor-pointer"
              >
                Reject Non-Essential
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold rounded shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-colors cursor-pointer"
              >
                Accept All
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#2B3E50]">
              <h4 className="text-sm font-bold text-white m-0">Granular Cookie Consent</h4>
              <button 
                onClick={() => { setShowPreferences(false); onCloseForce?.(); }}
                className="text-[#8D99AE] hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 bg-[#0B132B] rounded border border-[#2B3E50]">
                <div className="flex items-center justify-between font-bold text-white mb-1">
                  <span>Strictly Necessary</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Always On</span>
                </div>
                <p className="text-[#8D99AE] m-0">Required for multi-step RFQ drafts, secure token handling, and navigation routing.</p>
              </div>

              <div className="p-3.5 bg-[#0B132B] rounded border border-[#2B3E50]">
                <label className="flex items-center justify-between font-bold text-white mb-1 cursor-pointer">
                  <span>Technical Analytics</span>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences(p => ({ ...p, analytics: e.target.checked }))}
                    className="rounded accent-[#3B82F6]"
                  />
                </label>
                <p className="text-[#8D99AE] m-0">Allows measurement of alloy filter usage, datasheet downloads, and page latency.</p>
              </div>

              <div className="p-3.5 bg-[#0B132B] rounded border border-[#2B3E50]">
                <label className="flex items-center justify-between font-bold text-white mb-1 cursor-pointer">
                  <span>B2B Market Insights</span>
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={(e) => setPreferences(p => ({ ...p, marketing: e.target.checked }))}
                    className="rounded accent-[#3B82F6]"
                  />
                </label>
                <p className="text-[#8D99AE] m-0">Customizes relevant industrial case studies and Key Account Manager suggestions.</p>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2 border-t border-[#2B3E50]">
              <button
                onClick={handleSavePreferences}
                className="px-5 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold rounded shadow-md transition-colors cursor-pointer"
              >
                Save Cookie Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
