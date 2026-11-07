import React from 'react';
import { PageRoute } from '../types/navigation';
import { BLOG_POSTS, CASE_STUDIES, BlogPost, CaseStudy } from '../data/siteData';
import { AskTheExpertsBand } from '../components/AskTheExpertsBand';
import { ChevronRight, ArrowLeft, Calendar, User, Clock, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAdmin } from '../context/AdminContext';

import { IMAGES } from '../assets/images';
import { PageHero } from '../components/PageHero';

interface ArticleViewProps {
  slug: string;
  type: 'blog' | 'case-study';
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: (prefill?: { alloy?: string; process?: string }) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ slug, type, onNavigate, onOpenRfq }) => {
  const { isBn } = useLanguage();
  const { blogPosts, caseStudies } = useAdmin();

  const blogPost: BlogPost | undefined = type === 'blog' 
    ? (blogPosts.find(b => b.slug === slug) || BLOG_POSTS.find(b => b.slug === slug))
    : undefined;
  const caseStudy: CaseStudy | undefined = type === 'case-study' 
    ? (caseStudies.find(c => c.slug === slug) || CASE_STUDIES.find(c => c.slug === slug))
    : undefined;

  if (type === 'blog' && blogPost) {
    const displayTitle = isBn ? (blogPost.titleBn || blogPost.title) : blogPost.title;
    const displayCategory = isBn ? (blogPost.categoryBn || blogPost.category) : blogPost.category;
    const displayContent = (isBn && blogPost.contentBn && blogPost.contentBn.length > 0)
      ? blogPost.contentBn
      : blogPost.content;

    return (
      <div className="w-full m-0 p-0 pb-12">
        {/* Responsive Hero Banner Container - 100% Width, Auto Height, Zero Gaps, Full Preview */}
        <div 
          className="w-full h-auto m-0 p-0 relative overflow-hidden bg-transparent block"
          style={{ width: '100%', height: 'auto', margin: 0, padding: 0 }}
        >
          <PageHero
            title={displayTitle}
            imageSrc={IMAGES.technicalBlog}
            imageAlt={displayTitle}
            objectFit="contain"
            className="m-0 p-0 bg-transparent w-full h-auto"
            showTextOverlay={false}
          />
        </div>

        <div className="max-w-[800px] mx-auto px-4 sm:px-6 pt-6 space-y-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8]">
              {isBn ? 'হোম' : 'Home'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button onClick={() => onNavigate({ view: 'resources', subTab: 'blog' })} className="hover:text-[#1D4ED8]">
              {isBn ? 'ব্লগ ও গবেষণা' : 'Blog'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800 line-clamp-1">{displayTitle}</span>
          </nav>

          {/* Article Header info */}
          <div className="space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
              {displayCategory}
            </span>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-200 pb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                {blogPost.date}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-slate-400" />
                {blogPost.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                {blogPost.readTime}
              </span>
            </div>
          </div>

          {/* Body Prose */}
          <div className="space-y-4 text-slate-700 text-base leading-relaxed">
            {displayContent.map((paragraph, idx) => (
              <p key={idx} className="m-0">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Post Action */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-[#0F1B2D] m-0">
                {isBn ? 'এই কারিগরি বিষয়ে কোনো প্রশ্ন আছে?' : 'Have a question regarding this technical topic?'}
              </h4>
              <p className="text-xs text-slate-500 m-0 mt-0.5">
                {isBn ? 'আপনার কম্পোনেন্ট ড্রয়িং মূল্যায়নের জন্য আমাদের প্রকৌশল দলের সাথে যোগাযোগ করুন।' : 'Contact our engineering team to evaluate your component drawings.'}
              </p>
            </div>
            <button
              onClick={() => onOpenRfq()}
              className="px-5 py-2.5 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors whitespace-nowrap cursor-pointer"
            >
              {isBn ? 'ধাতু বিশেষজ্ঞের সাথে কথা বলুন' : 'Talk to a Metallurgist'}
            </button>
          </div>
        </div>

        <AskTheExpertsBand
          onContactClick={() => onNavigate({ view: 'contact-us' })}
          onRfqClick={() => onOpenRfq()}
        />
      </div>
    );
  }

  const caseTitle = caseStudy 
    ? (isBn ? (caseStudy.titleBn || caseStudy.title) : caseStudy.title)
    : (isBn ? 'ইঞ্জিনিয়ারিং কেস স্টাডি' : 'Engineering Case Study');
  const caseIndustry = caseStudy 
    ? (isBn ? (caseStudy.clientIndustryBn || caseStudy.clientIndustry) : caseStudy.clientIndustry)
    : '';
  const caseChallenge = caseStudy 
    ? (isBn ? (caseStudy.challengeBn || caseStudy.challenge) : caseStudy.challenge)
    : '';
  const caseSolution = caseStudy 
    ? (isBn ? (caseStudy.solutionBn || caseStudy.solution) : caseStudy.solution)
    : '';

  return (
    <div className="w-full m-0 p-0 pb-12">
      {/* Responsive Hero Banner Container - 100% Width, Auto Height, Zero Gaps, Full Preview */}
      <div 
        className="w-full h-auto m-0 p-0 relative overflow-hidden bg-transparent block"
        style={{ width: '100%', height: 'auto', margin: 0, padding: 0 }}
      >
        <PageHero
          title={caseTitle}
          imageSrc={IMAGES.caseStudies}
          imageAlt={caseTitle}
          objectFit="contain"
          className="m-0 p-0 bg-transparent w-full h-auto"
          showTextOverlay={false}
        />
      </div>
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 pt-6 space-y-8">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8]">
            {isBn ? 'হোম' : 'Home'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button onClick={() => onNavigate({ view: 'resources', subTab: 'case-studies' })} className="hover:text-[#1D4ED8]">
            {isBn ? 'কেস স্টাডিজ' : 'Case Studies'}
          </button>
        </nav>
        {caseStudy && (
          <div className="space-y-6">
            <div className="bg-slate-50 p-6 rounded-sm border border-slate-200 space-y-3">
              <span className="text-xs font-bold uppercase text-[#1D4ED8]">
                {isBn ? 'শিল্পখাত' : 'Industry'}: {caseIndustry}
              </span>
              <p className="text-sm text-slate-700">
                <strong>{isBn ? 'চ্যালেঞ্জ:' : 'Challenge:'}</strong> {caseChallenge}
              </p>
              <p className="text-sm text-slate-700">
                <strong>{isBn ? 'আমাদের সমাধান:' : 'Solution:'}</strong> {caseSolution}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
