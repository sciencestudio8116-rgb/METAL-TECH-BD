import React, { useState } from 'react';
import { PageRoute } from '../types/navigation';
import { 
  BLOG_POSTS, CASE_STUDIES, GLOSSARY_TERMS, FAQ_ITEMS, 
  BlogPost, CaseStudy, GlossaryTerm, FAQItem, CERTIFICATIONS 
} from '../data/siteData';
import { AskTheExpertsBand } from '../components/AskTheExpertsBand';
import { 
  ChevronRight, ArrowRight, BookOpen, FileText, Video, 
  HelpCircle, Download, Check, Search, ShieldCheck, ChevronDown, Play, X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin, VideoItem } from '../context/AdminContext';

import { IMAGES } from '../assets/images';
import { PageHero } from '../components/PageHero';
import { IndustrialIcon } from '../components/IndustrialIcon';

interface ResourcesViewProps {
  initialTab?: 'blog' | 'case-studies' | 'videos' | 'faqs' | 'glossary' | 'downloads';
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: () => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = ({ 
  initialTab = 'blog', 
  onNavigate, 
  onOpenRfq 
}) => {
  const { isBn } = useLanguage();
  const { blogPosts, caseStudies, videos } = useAdmin();
  const [activeTab, setActiveTab] = useState<'blog' | 'case-studies' | 'videos' | 'faqs' | 'glossary' | 'downloads'>(initialTab);
  const [glossarySearch, setGlossarySearch] = useState('');
  const [selectedFaqCat, setSelectedFaqCat] = useState('All');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState<number | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  // Sync tab if initialTab changes from navbar
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Dynamic hero title and imagery for each sub-menu
  const heroConfig = {
    'blog': { title: 'Technical Blog', image: IMAGES.technicalBlog },
    'case-studies': { title: 'Engineering Case Studies', image: IMAGES.caseStudies },
    'faqs': { title: 'Technical FAQs', image: IMAGES.faqs },
    'glossary': { title: 'Metallurgy Glossary', image: IMAGES.glossary },
    'downloads': { title: 'Downloads & Brochures', image: IMAGES.downloads },
    'videos': { title: 'Technical Videos', image: IMAGES.resourcesOverview },
  }[activeTab] || { title: 'Technical Resources', image: IMAGES.resourcesOverview };

  // Filter glossary
  const filteredGlossary = GLOSSARY_TERMS.filter(g => 
    !glossarySearch || 
    g.term.toLowerCase().includes(glossarySearch.toLowerCase()) || 
    g.definition.toLowerCase().includes(glossarySearch.toLowerCase())
  );

  // Filter FAQ
  const filteredFaqs = selectedFaqCat === 'All' 
    ? FAQ_ITEMS 
    : FAQ_ITEMS.filter(f => f.category === selectedFaqCat);

  return (
    <div className="w-full m-0 p-0 pb-12">
      {/* Responsive Hero Banner Container - 100% Width, Auto Height, Zero Gaps, Full Preview */}
      <div 
        className="w-full h-auto m-0 p-0 relative overflow-hidden bg-transparent block"
        style={{ width: '100%', height: 'auto', margin: 0, padding: 0 }}
      >
        <PageHero
          title={heroConfig.title}
          imageSrc={heroConfig.image}
          imageAlt={`${heroConfig.title} at Metal Tech BD`}
          objectFit="contain"
          className="m-0 p-0 bg-transparent w-full h-auto"
          showTextOverlay={false}
        />
      </div>

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 pt-6 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8]">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">{heroConfig.title}</span>
        </nav>

        {/* Tab Navigation Strip */}
        <div className="flex overflow-x-auto gap-2 pb-2 border-b border-slate-200 scrollbar-none">
          {[
            { id: 'blog', label: 'Technical Blog', icon: BookOpen },
            { id: 'case-studies', label: 'Case Studies', icon: FileText },
            { id: 'faqs', label: 'Technical FAQs', icon: HelpCircle },
            { id: 'glossary', label: 'A-Z Glossary', icon: Search },
            { id: 'videos', label: 'Process Videos', icon: Video },
            { id: 'downloads', label: 'Downloads & Certs', icon: Download },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-sm text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'bg-[#1D4ED8] text-white shadow-xs' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: TECHNICAL BLOG */}
        {activeTab === 'blog' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(blogPosts && blogPosts.length > 0 ? blogPosts : BLOG_POSTS).map(post => {
                const postTitle = isBn ? (post.titleBn || post.title) : post.title;
                const postCategory = isBn ? (post.categoryBn || post.category) : post.category;
                const postExcerpt = isBn ? (post.excerptBn || post.excerpt) : post.excerpt;

                return (
                  <div
                    key={post.slug}
                    onClick={() => onNavigate({ view: 'blog-post', slug: post.slug })}
                    className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center group"
                  >
                    <div className="flex flex-col items-center text-center w-full space-y-3">
                      <div className="mb-2 transform group-hover:scale-105 transition-transform duration-300">
                        <IndustrialIcon name="traceability" className="w-14 h-14" />
                      </div>
                      <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                        <span className="text-[#1D4ED8] font-bold">{postCategory}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 leading-snug">
                        {postTitle}
                      </h3>
                      <div className="w-16 h-[2px] bg-[#004B87] my-2 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                      <p className="text-xs text-[#5B6470] leading-relaxed m-0 text-center">
                        {postExcerpt}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 flex items-center justify-center gap-1.5 text-xs text-[#1D4ED8] font-bold group-hover:text-[#004B87]">
                      <span>{isBn ? 'নিবন্ধটি পড়ুন >>' : 'Read Article >>'}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: CASE STUDIES */}
        {activeTab === 'case-studies' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="space-y-6">
              {CASE_STUDIES.map(cs => (
                <div
                  key={cs.slug}
                  className="bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                      Case Study · {cs.clientIndustry}
                    </span>
                    <span className="text-xs text-slate-500">
                      Alloy: <strong>{cs.alloysUsed}</strong>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F1B2D] m-0">
                    {cs.title}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
                    <div className="p-4 bg-red-50/60 rounded border border-red-100 space-y-1">
                      <strong className="text-red-800 block uppercase">Industrial Challenge:</strong>
                      <p className="text-slate-700 m-0 leading-relaxed">{cs.challenge}</p>
                    </div>

                    <div className="p-4 bg-blue-50/60 rounded border border-blue-100 space-y-1">
                      <strong className="text-[#1D4ED8] block uppercase">Metallurgical Solution:</strong>
                      <p className="text-slate-700 m-0 leading-relaxed">{cs.solution}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="p-4 bg-[#F3F4F6] rounded-sm space-y-2">
                    <span className="text-xs font-bold uppercase text-[#0F1B2D] block">
                      Quantified Project Results:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {cs.results.map((res, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-800">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{res}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FAQS */}
        {activeTab === 'faqs' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex flex-wrap items-center gap-2 pb-2">
              <span className="text-xs font-bold text-slate-500 mr-2">Categories:</span>
              {['All', 'Casting Processes', 'Alloys & Specifications', 'RFQ & Orders', 'Quality & Testing'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedFaqCat(cat)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors cursor-pointer ${
                    selectedFaqCat === cat 
                      ? 'bg-[#1D4ED8] text-white' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => {
                const isOpen = expandedFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#D9DCE1] rounded-sm overflow-hidden bg-white shadow-xs"
                  >
                    <button
                      onClick={() => setExpandedFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 text-left flex items-center justify-between font-bold text-[#0F1B2D] text-sm sm:text-base hover:bg-slate-50 transition-colors"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50">
                        <p className="m-0 pt-3">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: GLOSSARY */}
        {activeTab === 'glossary' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={glossarySearch}
                onChange={(e) => setGlossarySearch(e.target.value)}
                placeholder="Search metallurgical terms (e.g. AOD, Ferrite, NDT)..."
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-sm focus:outline-hidden focus:border-[#1D4ED8]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredGlossary.map((item) => (
                <div key={item.term} className="bg-white border border-[#D9DCE1] rounded-sm p-4 space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#0F1B2D] m-0">
                      {item.term}
                    </h4>
                    <span className="text-[10px] uppercase font-bold text-[#1D4ED8] bg-blue-50 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed m-0">
                    {item.definition}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PROCESS VIDEOS */}
        {activeTab === 'videos' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <span className="text-xs text-slate-500">
                {isBn
                  ? `মোট ${videos.length}টি কারিগরি ও ফাউন্ড্রি প্রসেস ভিডিও প্রদর্শিত হচ্ছে`
                  : `Showing ${videos.length} technical foundry & machining process videos`}
              </span>
              <button
                onClick={() => onOpenRfq()}
                className="text-xs font-bold text-[#1D4ED8] hover:underline"
              >
                {isBn ? 'প্রস্তাবনার জন্য যোগাযোগ করুন →' : 'Request Custom Video Demonstration →'}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {videos.map((vid) => {
                const title = isBn && vid.titleBn ? vid.titleBn : vid.title;
                const desc = isBn && vid.descriptionBn ? vid.descriptionBn : vid.description;
                const category = isBn && vid.categoryBn ? vid.categoryBn : vid.category;

                return (
                  <div
                    key={vid.id}
                    onClick={() => setSelectedVideo(vid)}
                    className="bg-white border border-[#D9DCE1] rounded-sm overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 group cursor-pointer flex flex-col justify-between"
                  >
                    <div className="h-48 bg-[#0F1B2D] flex items-center justify-center text-white relative overflow-hidden">
                      {vid.thumbnailUrl ? (
                        <img
                          src={vid.thumbnailUrl}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-90"
                        />
                      ) : (
                        <div className="w-full h-full bg-linear-to-br from-[#0F1B2D] to-[#162744]" />
                      )}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors" />

                      <div className="w-13 h-13 rounded-full bg-[#1D4ED8] group-hover:scale-110 flex items-center justify-center transition-transform shadow-xl relative z-10">
                        <Play className="w-6 h-6 ml-0.5 text-white" />
                      </div>

                      {category && (
                        <span className="absolute top-3 left-3 px-2 py-0.5 bg-[#0F1B2D]/85 backdrop-blur-xs text-[10px] font-bold uppercase tracking-wider text-[#F5B800] rounded-xs border border-white/10">
                          {category}
                        </span>
                      )}

                      {vid.duration && (
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-[10px] font-mono text-slate-200 rounded-xs">
                          {vid.duration}
                        </span>
                      )}
                    </div>

                    <div className="p-4 space-y-2">
                      <h4 className="text-sm sm:text-base font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 leading-snug">
                        {title}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 m-0 leading-relaxed">
                        {desc}
                      </p>

                      {vid.tags && vid.tags.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1">
                          {vid.tags.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 6: DOWNLOADS & CERTS */}
        {activeTab === 'downloads' && (
          <div className="space-y-6 animate-in fade-in duration-150">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: '2026 Metal Tech BD Master Alloy Specification Guide', size: '4.8 MB PDF', desc: 'Complete chemical and mechanical data sheets for 60+ casting grades.' },
                { title: 'ISO 9001:2015 Quality Certificate (Bureau Veritas)', size: '1.2 MB PDF', desc: 'Current certified scope for foundry, machining, and thermal treatment.' },
                { title: 'ASME Section VIII Pressure Vessel Qualification', size: '2.1 MB PDF', desc: 'Pressure boundary casting authorization and audit approval.' },
                { title: 'Lloyd’s Register Approval for Marine Castings', size: '1.5 MB PDF', desc: 'Duplex stainless and nickel aluminum bronze marine propulsion certification.' },
                { title: 'Centrifugal vs Sand Casting Technical Comparison Guide', size: '3.1 MB PDF', desc: 'Design engineers handbook on solidification defects and cost trade-offs.' },
                { title: 'NACE MR0175 / ISO 15156 Sour Gas Compliance Whitepaper', size: '2.4 MB PDF', desc: 'Hardness and stress corrosion cracking thresholds for upstream oil & gas.' },
              ].map((doc, idx) => (
                <div key={idx} className="bg-white border border-[#D9DCE1] rounded-sm p-5 flex items-start justify-between gap-4 shadow-xs">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-[#1D4ED8] uppercase">Technical Document</span>
                    <h4 className="text-sm font-bold text-[#0F1B2D] m-0">{doc.title}</h4>
                    <p className="text-xs text-slate-500 m-0">{doc.desc}</p>
                    <span className="text-[11px] text-slate-400 block pt-1">{doc.size}</span>
                  </div>
                  <button
                    onClick={() => {
                      alert(`Downloading "${doc.title}" (PDF)`);
                    }}
                    className="p-2.5 rounded-sm bg-slate-100 hover:bg-[#1D4ED8] hover:text-white text-slate-700 transition-colors shrink-0 cursor-pointer"
                    title="Download PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="w-full max-w-3xl bg-[#0F1B2D] border border-slate-700 rounded-sm overflow-hidden shadow-2xl space-y-0 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 flex items-center justify-between border-b border-slate-800 bg-[#0C1525]">
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F5B800]">
                  {isBn && selectedVideo.categoryBn ? selectedVideo.categoryBn : selectedVideo.category || 'Foundry Video'}
                </span>
                <h3 className="text-base font-bold text-white m-0 truncate max-w-xl">
                  {isBn && selectedVideo.titleBn ? selectedVideo.titleBn : selectedVideo.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Frame */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {selectedVideo.videoUrl && selectedVideo.videoUrl.includes('youtube') ? (
                <iframe
                  src={`${selectedVideo.videoUrl}?autoplay=1`}
                  title={selectedVideo.title}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : selectedVideo.videoUrl && selectedVideo.videoUrl.endsWith('.mp4') ? (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full"
                />
              ) : (
                <div className="text-center p-8 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-600/20 text-[#1D4ED8] flex items-center justify-center mx-auto border border-blue-500/40">
                    <Play className="w-8 h-8 ml-1" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {isBn ? 'হাই-ডেফিনিশন প্রক্রিয়া স্ট্রিমিং' : 'High-Definition Process Stream'}
                    </h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                      {isBn
                        ? 'ভিডিও লিঙ্ক সক্রিয়। প্রোডাকশন লাইভ ফিড বা ইউটিউব/ভিমিও এম্বেড ইউআরএল সাপোর্ট করে।'
                        : 'Active streaming link configured. Supports embedded YouTube, Vimeo, or direct MP4 streams.'}
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenRfq()}
                    className="px-4 py-2 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-xs cursor-pointer"
                  >
                    {isBn ? 'কাস্টিং স্পেক্স আলোচনা করুন' : 'Schedule Foundry Inspection'}
                  </button>
                </div>
              )}
            </div>

            {/* Modal Info Footer */}
            <div className="p-4 bg-[#0C1525] border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <p className="text-slate-300 m-0 leading-relaxed max-w-xl">
                {isBn && selectedVideo.descriptionBn ? selectedVideo.descriptionBn : selectedVideo.description}
              </p>
              <div className="flex items-center gap-2 shrink-0">
                {selectedVideo.duration && (
                  <span className="font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded-xs">
                    {selectedVideo.duration}
                  </span>
                )}
                <button
                  onClick={() => {
                    setSelectedVideo(null);
                    onOpenRfq();
                  }}
                  className="px-3 py-1.5 bg-[#1D4ED8] hover:bg-[#163A9E] text-white font-semibold rounded-xs cursor-pointer"
                >
                  {isBn ? 'আরএফকিউ পাঠান' : 'Request RFQ'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <AskTheExpertsBand
        onContactClick={() => onNavigate({ view: 'contact-us' })}
        onRfqClick={() => onOpenRfq()}
      />
    </div>
  );
};
