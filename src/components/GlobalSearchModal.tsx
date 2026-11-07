import React, { useState, useMemo } from 'react';
import { PageRoute } from '../types/navigation';
import { ALLOY_DATABASE, CASTING_PROCESSES, CAPABILITIES, MARKET_SOLUTIONS, BLOG_POSTS, CASE_STUDIES, GLOSSARY_TERMS } from '../data/siteData';
import { Search, X, ArrowRight, Layers, Settings, Globe, BookOpen, Factory } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (route: PageRoute) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { isBn } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const results = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    if (!q) return null;

    const matchedAlloys = ALLOY_DATABASE.filter(a => 
      a.name.toLowerCase().includes(q) || 
      a.castUNS.toLowerCase().includes(q) || 
      a.castGrade.toLowerCase().includes(q) || 
      a.wroughtEquiv.toLowerCase().includes(q) ||
      a.description.toLowerCase().includes(q)
    ).slice(0, 4);

    const matchedProcesses = CASTING_PROCESSES.filter(p => 
      p.title.toLowerCase().includes(q) || 
      p.summary.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );

    const matchedCapabilities = CAPABILITIES.filter(c => 
      c.title.toLowerCase().includes(q) || 
      c.summary.toLowerCase().includes(q)
    );

    const matchedMarkets = MARKET_SOLUTIONS.filter(m => 
      m.title.toLowerCase().includes(q) || 
      m.summary.toLowerCase().includes(q)
    );

    const matchedGlossary = GLOSSARY_TERMS.filter(g => 
      g.term.toLowerCase().includes(q) || 
      g.definition.toLowerCase().includes(q)
    ).slice(0, 3);

    const matchedArticles = [
      ...BLOG_POSTS.map(b => ({ ...b, type: 'blog' })),
      ...CASE_STUDIES.map(c => ({ ...c, type: 'case-study' })),
    ].filter(a => a.title.toLowerCase().includes(q)).slice(0, 3);

    const totalCount = 
      matchedAlloys.length + 
      matchedProcesses.length + 
      matchedCapabilities.length + 
      matchedMarkets.length + 
      matchedGlossary.length + 
      matchedArticles.length;

    return {
      alloys: matchedAlloys,
      processes: matchedProcesses,
      capabilities: matchedCapabilities,
      markets: matchedMarkets,
      glossary: matchedGlossary,
      articles: matchedArticles,
      totalCount,
    };
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/85 animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-[#1C2541] rounded-lg shadow-2xl border border-[#2B3E50] overflow-hidden flex flex-col max-h-[80vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#2B3E50] flex items-center gap-3 bg-[#0B132B]">
          <Search className="w-5 h-5 text-[#4CC9F0] shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isBn ? "সমস্ত উপাদান, অ্যালয় (যেমন ৩১৬, সিএফ৮এম), কাস্টিং প্রক্রিয়া খুঁজুন..." : "Search all materials, alloys (e.g. 316, CF8M), casting processes, markets..."}
            className="w-full bg-transparent text-base text-white placeholder-[#8D99AE] focus:outline-hidden"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="text-xs text-[#8D99AE] hover:text-white px-2 py-0.5 rounded cursor-pointer"
            >
              {isBn ? 'মুছুন' : 'Clear'}
            </button>
          )}
          <button 
            onClick={onClose}
            className="p-1 text-[#8D99AE] hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="p-5 overflow-y-auto space-y-5 divide-y divide-[#2B3E50]/60">
          {!results ? (
            <div className="py-8 text-center text-xs text-[#8D99AE] space-y-3">
              <p>{isBn ? 'মেটালটেক ইঞ্জিনিয়ারিং নলেজ বেস অনুসন্ধানের জন্য কীওয়ার্ড টাইপ করুন।' : "Type keywords to search through MetalTek's engineering knowledge base."}</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="text-[#8D99AE]">{isBn ? 'জনপ্রিয়:' : 'Popular:'}</span>
                {['Centrifugal Casting', 'CF8M Stainless', 'Inconel 625', 'Nadcap Heat Treatment', 'Nuclear SMR', 'AOD Refining'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="px-2.5 py-1 bg-[#0B132B] hover:bg-[#3B82F6] hover:text-white border border-[#2B3E50] rounded text-slate-300 text-xs transition-colors cursor-pointer"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.totalCount === 0 ? (
            <div className="py-8 text-center text-sm text-[#8D99AE]">
              {isBn ? 'কোনো ফলাফল পাওয়া যায়নি: ' : 'No results found for '} "<strong className="text-white">{searchTerm}</strong>".
            </div>
          ) : (
            <div className="space-y-4">
              {/* Alloys Group */}
              {results.alloys.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4CC9F0] flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
                    {isBn ? 'অ্যালয় এবং স্পেসিফিকেশন' : 'Alloys & Specifications'} ({results.alloys.length})
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {results.alloys.map(alloy => (
                      <button
                        key={alloy.id}
                        onClick={() => {
                          onClose();
                          onNavigate({ view: 'alloys', selectedAlloyId: alloy.id });
                        }}
                        className="text-left p-3 rounded-md hover:bg-[#223055] border border-transparent hover:border-[#2B3E50] flex items-center justify-between group transition-all duration-200 cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-[#4CC9F0] transition-colors">
                            {alloy.name}
                          </div>
                          <div className="text-xs text-[#8D99AE]">
                            UNS {alloy.castUNS} · {alloy.castASTM} · {alloy.family}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#8D99AE] group-hover:text-[#4CC9F0] group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Processes Group */}
              {results.processes.length > 0 && (
                <div className="space-y-2 pt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4CC9F0] flex items-center gap-1.5">
                    <Factory className="w-3.5 h-3.5 text-[#3B82F6]" />
                    {isBn ? 'কাস্টিং প্রক্রিয়া' : 'Casting Processes'} ({results.processes.length})
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {results.processes.map(proc => (
                      <button
                        key={proc.slug}
                        onClick={() => {
                          onClose();
                          onNavigate({ view: 'metal-casting', subSlug: proc.slug });
                        }}
                        className="text-left p-3 rounded-md hover:bg-[#223055] border border-transparent hover:border-[#2B3E50] flex items-center justify-between group transition-all duration-200 cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-[#4CC9F0] transition-colors">
                            {proc.title}
                          </div>
                          <div className="text-xs text-[#8D99AE] line-clamp-1">
                            {proc.summary}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#8D99AE] group-hover:text-[#4CC9F0] group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Capabilities Group */}
              {results.capabilities.length > 0 && (
                <div className="space-y-2 pt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4CC9F0] flex items-center gap-1.5">
                    <Settings className="w-3.5 h-3.5 text-[#3B82F6]" />
                    {isBn ? 'সক্ষমতা ও প্রক্রিয়াজাতকরণ' : 'Capabilities & Processing'} ({results.capabilities.length})
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {results.capabilities.map(cap => (
                      <button
                        key={cap.slug}
                        onClick={() => {
                          onClose();
                          onNavigate({ view: 'capabilities', subSlug: cap.slug });
                        }}
                        className="text-left p-3 rounded-md hover:bg-[#223055] border border-transparent hover:border-[#2B3E50] flex items-center justify-between group transition-all duration-200 cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-[#4CC9F0] transition-colors">
                            {cap.title}
                          </div>
                          <div className="text-xs text-[#8D99AE] line-clamp-1">
                            {cap.summary}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#8D99AE] group-hover:text-[#4CC9F0] group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Markets Group */}
              {results.markets.length > 0 && (
                <div className="space-y-2 pt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4CC9F0] flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-[#3B82F6]" />
                    {isBn ? 'শিল্প সমাধান' : 'Market Solutions'} ({results.markets.length})
                  </span>
                  <div className="grid grid-cols-1 gap-1.5">
                    {results.markets.map(mkt => (
                      <button
                        key={mkt.slug}
                        onClick={() => {
                          onClose();
                          onNavigate({ view: 'market-solutions', subSlug: mkt.slug });
                        }}
                        className="text-left p-3 rounded-md hover:bg-[#223055] border border-transparent hover:border-[#2B3E50] flex items-center justify-between group transition-all duration-200 cursor-pointer"
                      >
                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-[#4CC9F0] transition-colors">
                            {mkt.title}
                          </div>
                          <div className="text-xs text-[#8D99AE] line-clamp-1">
                            {mkt.summary}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#8D99AE] group-hover:text-[#4CC9F0] group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Glossary Terms */}
              {results.glossary.length > 0 && (
                <div className="space-y-2 pt-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#4CC9F0] flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#3B82F6]" />
                    {isBn ? 'কারিগরি শব্দকোষ' : 'Technical Glossary'}
                  </span>
                  <div className="grid grid-cols-1 gap-2">
                    {results.glossary.map(item => (
                      <div key={item.term} className="p-3 bg-[#0B132B] border border-[#2B3E50] rounded-md text-xs">
                        <strong className="text-white block">{item.term}</strong>
                        <p className="text-[#8D99AE] m-0 mt-1 line-clamp-2">{item.definition}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
