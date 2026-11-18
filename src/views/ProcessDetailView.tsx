import React from 'react';
import { PageRoute } from '../types/navigation';
import { CASTING_PROCESSES, ProcessItem } from '../data/siteData';
import { IMAGES } from '../assets/images';
import { ChevronRight, ArrowRight, ShieldCheck, Factory, Check } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useLanguage } from '../context/LanguageContext';

import { PageHero } from '../components/PageHero';
import { IndustrialIcon } from '../components/IndustrialIcon';

interface ProcessDetailViewProps {
  slug?: string;
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: (prefill?: { alloy?: string; process?: string }) => void;
}

export const ProcessDetailView: React.FC<ProcessDetailViewProps> = ({ slug, onNavigate, onOpenRfq }) => {
  const { isBn } = useLanguage();
  const { processCards } = useAdmin();
  const ingotFallback = CASTING_PROCESSES.find(p => p.slug === 'ingot');
  const baseProcesses = processCards && processCards.length > 0 ? processCards : CASTING_PROCESSES;
  const activeProcesses =
    ingotFallback && !baseProcesses.some(p => p.slug === 'ingot' || p.slug === 'continuous-casting')
      ? [...baseProcesses, ingotFallback]
      : baseProcesses;

  // If no slug, show the Metal Casting Overview Hub
  const currentProcess: ProcessItem | undefined = activeProcesses.find(
    p => p.slug === slug || (slug === 'continuous-casting' && p.slug === 'ingot')
  );

  if (!slug || !currentProcess) {
    return (
      <div className="w-full">
        {/* Full-width 400px Hero */}
        <PageHero
          title={isBn ? 'মেটাল কাস্টিং ও ঢালাই' : 'Metal Casting'}
          badge={isBn ? 'ফাউন্ড্রি প্রক্রিয়াসমূহ' : 'Foundry Processes'}
          subtitle={
            isBn
              ? 'সেন্ট্রিফিউগাল, স্যান্ড ও ইনভেস্টমেন্ট কাস্টিং এবং হাই-ইন্টিগ্রিটি ইনগট ম্যানুফ্যাকচারিং'
              : 'Centrifugal, sand, and investment casting as well as high-integrity ingot manufacturing'
          }
          imageSrc={IMAGES.castingOverview}
          imageAlt="High-Integrity Metal Casting Processes at Metal Tech BD"
        />

        <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-14 md:py-20 space-y-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8] cursor-pointer">
              {isBn ? 'নীড়পাতা' : 'Home'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">{isBn ? 'মেটাল কাস্টিং' : 'Metal Casting'}</span>
          </nav>

          {/* Process Grid (Center-Aligned) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {activeProcesses.map((proc) => {
              const iconKey = 
                proc.slug === 'centrifugal-casting' ? 'centrifugal' :
                proc.slug === 'sand-casting' ? 'sand-casting' :
                proc.slug === 'investment-casting' ? 'investment' :
                (proc.slug === 'continuous-casting' || proc.slug === 'ingot') ? 'alloys' : 'casting';

              const cardTitle = isBn && proc.titleBn ? proc.titleBn : proc.title;
              const cardSummary = isBn && proc.summaryBn ? proc.summaryBn : proc.summary;
              const cardWeight = isBn && proc.weightRangeBn ? proc.weightRangeBn : proc.weightRange;
              const cardLimits = isBn && proc.sizeLimitsBn ? proc.sizeLimitsBn : proc.sizeLimits;

              return (
                <div
                  key={proc.slug}
                  onClick={() => onNavigate({ view: 'metal-casting', subSlug: proc.slug })}
                  className="bg-white border border-[#D9DCE1] hover:border-[#1D4ED8] hover:ring-1 hover:ring-[#1D4ED8]/20 rounded-sm p-6 sm:p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center justify-between text-center group"
                >
                  <div className="flex flex-col items-center text-center w-full">
                    <div className="mb-4 transform group-hover:scale-105 transition-transform duration-300">
                      <IndustrialIcon name={iconKey} className="w-16 h-16 sm:w-20 sm:h-20" />
                    </div>
                    <span className="text-[11px] font-bold uppercase text-[#1D4ED8] tracking-wider block mb-1">
                      {isBn ? 'কাস্টিং মেথড' : 'Casting Method'}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#0F1B2D] group-hover:text-[#1D4ED8] transition-colors m-0 tracking-tight">
                      {cardTitle}
                    </h3>
                    <div className="w-16 h-[2px] bg-[#004B87] my-3.5 mx-auto rounded-full group-hover:w-20 transition-all duration-300" />
                    <p className="text-sm text-[#5B6470] leading-relaxed m-0 text-center max-w-sm">
                      {cardSummary}
                    </p>
                    <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600">
                      <span className="bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                        <strong>{isBn ? 'সর্বোচ্চ ওজন:' : 'Max Weight:'}</strong> {cardWeight}
                      </span>
                      <span className="bg-slate-50 px-2.5 py-1 rounded border border-slate-200">
                        <strong>{isBn ? 'সীমাবদ্ধতা:' : 'Limits:'}</strong> {cardLimits}
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 flex items-center justify-center gap-1.5 text-xs font-bold text-[#1D4ED8] group-hover:text-[#004B87]">
                    <span>{isBn ? 'প্রসেস স্পেসিফিকেশন দেখুন' : 'View Process Specifications'}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Understanding Metal Casting & Comparison Table Section */}
          <section className="mt-12 mb-4 space-y-10">
            {/* Part 1: Overview Content ("Understanding Metal Casting") */}
            <div className="bg-white border border-gray-200 rounded-sm px-6 py-8 sm:px-10 sm:py-10 shadow-xs text-left text-[#1F2933]">
              <div className="max-w-4xl text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F1B2D] tracking-tight mb-6">
                  {isBn ? 'মেটাল কাস্টিং সম্পর্কে বিস্তারিত ধারণা' : 'Understanding Metal Casting'}
                </h2>

                <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                  <p className="m-0">
                    {isBn
                      ? 'মেটাল কাস্টিং একটি মৌলিক উৎপাদন প্রক্রিয়া যেখানে গলিত ধাতু চূড়ান্ত যন্ত্রাংশের কাঙ্ক্ষিত আকৃতির একটি ছাঁচের গহ্বরে (mold cavity) ঢালা হয়। এরপর ধাতু ছাঁচের ভেতরে ঠান্ডা হয়ে কঠিন আকার ধারণ করে। কঠিন হয়ে গেলে ছাঁচ থেকে কাস্টিং বের করা হয় এবং চূড়ান্ত স্পেসিফিকেশন অর্জনের জন্য মেশিনিংয়ের মতো পরবর্তী প্রক্রিয়াকরণ করা হতে পারে। এই বহুমুখী প্রক্রিয়া ছোট সূক্ষ্ম যন্ত্রাংশ থেকে শুরু করে বিশাল শিল্প যন্ত্রাংশ পর্যন্ত জটিল ও নিখুঁত আকৃতি তৈরির সুযোগ দেয়।'
                      : 'Metal casting is a fundamental manufacturing process where molten metal is poured into a mold cavity that has the desired shape of the final part. The metal is then allowed to solidify within the mold. Once solidified, the casting is removed from the mold, and may undergo further processing, such as machining, to achieve the final specifications. This versatile process allows for the creation of complex and intricate shapes, ranging from small, detailed components to very large industrial parts.'}
                  </p>

                  <p className="font-medium m-0">
                    {isBn
                      ? 'বিভিন্ন ধরনের শিল্প চাহিদা পূরণের জন্য আমরা নানা উন্নত মেটাল কাস্টিং প্রযুক্তি ব্যবহার করি, যার মধ্যে রয়েছে:'
                      : 'We leverage a variety of advanced metal casting techniques to cater to a wide spectrum of needs, including:'}
                  </p>

                  <ul className="list-disc pl-6 my-4 space-y-2 text-sm sm:text-base text-slate-700 leading-relaxed">
                    <li>
                      <strong className="text-[#0F1B2D] font-bold">
                        {isBn ? 'সেন্ট্রিফিউগাল কাস্টিং:' : 'Centrifugal Casting:'}
                      </strong>{' '}
                      {isBn
                        ? 'উচ্চ শক্তি ও নির্ভরযোগ্যতাসম্পন্ন সিলিন্ড্রিক্যাল যন্ত্রাংশ উৎপাদনের জন্য আদর্শ।'
                        : 'Ideal for producing cylindrical components with high strength and reliability.'}
                    </li>
                    <li>
                      <strong className="text-[#0F1B2D] font-bold">
                        {isBn ? 'স্যান্ড কাস্টিং:' : 'Sand Casting:'}
                      </strong>{' '}
                      {isBn
                        ? 'বৃহৎ যন্ত্রাংশসহ বিভিন্ন আকার ও পরিমাণের উৎপাদনের জন্য একটি বহুমুখী ও সাশ্রয়ী পদ্ধতি।'
                        : 'A versatile and cost-effective method for producing various sizes and volumes, including larger parts.'}
                    </li>
                    <li>
                      <strong className="text-[#0F1B2D] font-bold">
                        {isBn ? 'ইনভেস্টমেন্ট কাস্টিং (লস্ট-ওয়াক্স কাস্টিং):' : 'Investment Casting (Lost-Wax Casting):'}
                      </strong>{' '}
                      {isBn
                        ? 'চমৎকার সারফেস ফিনিশ ও সূক্ষ্ম টলারেন্সসহ জটিল এবং নিখুঁত যন্ত্রাংশ তৈরির জন্য উপযুক্ত।'
                        : 'Well-suited for creating complex and intricate parts with excellent surface finishes and tight tolerances.'}
                    </li>
                  </ul>

                  <p className="m-0">
                    {isBn
                      ? 'গভীর ধাতুবিদ্যাগত জ্ঞান এবং দীর্ঘ প্রক্রিয়াগত অভিজ্ঞতার মাধ্যমে আমরা এমন উচ্চমানের মেটাল কাস্টিং উৎপাদন নিশ্চিত করি যা অ্যারোস্পেস, প্রতিরক্ষা, জ্বালানি ও পেট্রোকেমিক্যাল শিল্পের কঠোর মানদণ্ড পূরণ বা অতিক্রম করে। মান, উদ্ভাবন এবং গ্রাহক সন্তুষ্টির প্রতি আমাদের অঙ্গীকার আমাদের বিশ্বব্যাপী সেন্ট্রিফিউগাল, ইনভেস্টমেন্ট, স্যান্ড, ইনগট এবং এওডি কাস্টিং সমাধানের অন্যতম শীর্ষ সরবরাহকারী হিসেবে প্রতিষ্ঠিত করেছে।'
                      : 'With deep metallurgical knowledge and extensive process expertise, we ensure the production of high-quality metal castings that meet or exceed the stringent requirements of industries such as aerospace, defense, energy, and petrochemical. Our commitment to quality, innovation, and customer satisfaction makes us a leading provider of centrifugal, investment, sand, ingot, and AOD casting solutions worldwide.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Part 2: Industrial Comparison Table (5 Columns, Crisp Borders) */}
            <div className="overflow-x-auto shadow-xs rounded-sm border border-slate-400 bg-white">
              <table className="w-full min-w-[760px] border-collapse border border-slate-400 text-left text-sm">
                <thead>
                  <tr className="bg-[#4A4A4A] text-white">
                    <th className="p-4 font-semibold border border-slate-400 w-[16%]">
                      {isBn ? 'বৈশিষ্ট্য' : 'Feature'}
                    </th>
                    <th className="p-4 font-semibold border border-slate-400 w-[21%]">
                      {isBn ? 'সেন্ট্রিফিউগাল কাস্টিং' : 'Centrifugal Casting'}
                    </th>
                    <th className="p-4 font-semibold border border-slate-400 w-[21%]">
                      {isBn ? 'ইনভেস্টমেন্ট কাস্টিং' : 'Investment Casting'}
                    </th>
                    <th className="p-4 font-semibold border border-slate-400 w-[21%]">
                      {isBn ? 'স্যান্ড কাস্টিং' : 'Sand Casting'}
                    </th>
                    <th className="p-4 font-semibold border border-slate-400 w-[21%]">
                      {isBn ? 'ইনগট কাস্টিং' : 'Ingot Casting'}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-4 font-bold text-gray-900 bg-[#D4D442] border border-slate-400 align-top">
                      {isBn ? 'প্রক্রিয়ার সংক্ষিপ্ত বিবরণ' : 'Process Overview'}
                    </td>
                    <td className="p-4 bg-white text-gray-800 border border-slate-400 align-top leading-relaxed">
                      {isBn
                        ? 'ঘূর্ণায়মান ছাঁচে গলিত ধাতু ঢালা হয় এবং ধাতু ছড়িয়ে দিতে সেন্ট্রিফিউগাল বল ব্যবহার করা হয়।'
                        : 'Molten metal poured into a rotating mold, using centrifugal force to distribute the metal.'}
                    </td>
                    <td className="p-4 bg-white text-gray-800 border border-slate-400 align-top leading-relaxed">
                      {isBn
                        ? 'মোমের প্যাটার্ন তৈরি করে সিরামিক স্লারি দিয়ে আবৃত করা হয়, এরপর মোম গলিয়ে বের করে ওই ছাঁচে গলিত ধাতু ঢালা হয়।'
                        : 'Wax patterns are created, coated with a ceramic slurry, the wax is melted out, and molten metal is poured into the resulting mold.'}
                    </td>
                    <td className="p-4 bg-white text-gray-800 border border-slate-400 align-top leading-relaxed">
                      {isBn
                        ? 'বালি দিয়ে তৈরি ছাঁচে গলিত ধাতু ঢালা হয়।'
                        : 'Molten metal is poured into a mold made of sand.'}
                    </td>
                    <td className="p-4 bg-white text-gray-800 border border-slate-400 align-top leading-relaxed">
                      {isBn
                        ? 'ধাতুর বড় ব্লক (ইনগট) তৈরি করার জন্য একটি বড় ছাঁচে (ইনগট মোল্ড) গলিত ধাতু ঢালা হয়।'
                        : 'Molten metal is poured into a large mold (ingot mold) to produce a large block of metal (ingot).'}
                    </td>
                  </tr>
                  <tr>
                    <td className="p-4 font-bold text-gray-900 bg-[#D4D442] border border-slate-400 align-top">
                      {isBn ? 'সাধারণ ব্যবহার' : 'Typical Applications'}
                    </td>
                    <td className="p-4 bg-gray-50 text-gray-800 border border-slate-400 align-top leading-relaxed">
                      {isBn
                        ? 'সিলিন্ড্রিক্যাল যন্ত্রাংশ, পাইপ, বুশিং, রিং এবং উচ্চ ম্যাটেরিয়াল সাউন্ডনেস প্রয়োজন এমন নির্ভরযোগ্য পার্টস।'
                        : 'Cylindrical components, pipes, bushings, rings, high-reliability parts requiring high material soundness.'}
                    </td>
                    <td className="p-4 bg-gray-50 text-gray-800 border border-slate-400 align-top leading-relaxed">
                      {isBn
                        ? 'সূক্ষ্ম নকশাসহ জটিল আকৃতি, নিখুঁত টলারেন্স, চমৎকার সারফেস ফিনিশ এবং ছোট থেকে মাঝারি আকারের যন্ত্রাংশ।'
                        : 'Complex shapes with fine details, tight tolerances, excellent surface finish, small to medium-sized parts.'}
                    </td>
                    <td className="p-4 bg-gray-50 text-gray-800 border border-slate-400 align-top leading-relaxed">
                      {isBn
                        ? 'বড় যন্ত্রাংশ, জটিল বাহ্যিক আকৃতি, অভ্যন্তরীণ প্যাসেজওয়ে, প্রোটোটাইপ এবং স্বল্প থেকে মাঝারি উৎপাদন ব্যাচ।'
                        : 'Large parts, complex external shapes, internal passageways, prototypes, short to medium production runs.'}
                    </td>
                    <td className="p-4 bg-gray-50 text-gray-800 border border-slate-400 align-top leading-relaxed">
                      {isBn
                        ? 'বিভিন্ন আকৃতি ও পণ্য তৈরিতে পরবর্তী প্রক্রিয়াকরণের (যেমন ফোর্জিং, রোলিং) জন্য কাঁচামাল উৎপাদন।'
                        : 'Production of raw material for further processing (e.g., forging, rolling) into various shapes and products.'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    );
  }

  // Determine process-specific high-resolution photography asset
  const processImage = 
    currentProcess.slug === 'centrifugal-casting' ? IMAGES.centrifugalCasting :
    currentProcess.slug === 'sand-casting' ? IMAGES.sandCasting :
    currentProcess.slug === 'investment-casting' ? IMAGES.investmentCasting :
    (currentProcess.slug === 'continuous-casting' || currentProcess.slug === 'ingot') ? IMAGES.continuousCasting :
    IMAGES.castingOverview;

  const currentTitle = isBn && currentProcess.titleBn ? currentProcess.titleBn : currentProcess.title;
  const currentSummary = isBn && currentProcess.summaryBn ? currentProcess.summaryBn : currentProcess.summary;
  const currentDesc = isBn && currentProcess.descriptionBn ? currentProcess.descriptionBn : currentProcess.description;
  const currentSize = isBn && currentProcess.sizeLimitsBn ? currentProcess.sizeLimitsBn : currentProcess.sizeLimits;
  const currentWeight = isBn && currentProcess.weightRangeBn ? currentProcess.weightRangeBn : currentProcess.weightRange;
  const currentTolerances = isBn && currentProcess.tolerancesBn ? currentProcess.tolerancesBn : currentProcess.tolerances;
  const currentComponents = isBn && currentProcess.typicalComponentsBn ? currentProcess.typicalComponentsBn : currentProcess.typicalComponents;

  // Individual Process Template (Centrifugal, Sand, Investment, Continuous)
  return (
    <div className="w-full">
      {/* Full-width 400px Hero strictly matching rules */}
      <PageHero
        title={currentTitle}
        badge={isBn ? 'ইঞ্জিনিয়ার্ড কাস্টিং প্রক্রিয়া' : 'Engineered Casting Process'}
        subtitle={currentSummary}
        imageSrc={processImage}
        imageAlt={`${currentTitle} at Metal Tech BD`}
      />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 py-14 md:py-20 space-y-10">
        {/* Breadcrumb & Action Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <nav className="flex items-center gap-1.5 text-xs text-slate-500">
            <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8] cursor-pointer">
              {isBn ? 'নীড়পাতা' : 'Home'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <button onClick={() => onNavigate({ view: 'metal-casting' })} className="hover:text-[#1D4ED8] cursor-pointer">
              {isBn ? 'মেটাল কাস্টিং' : 'Metal Casting'}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-800">{currentTitle}</span>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenRfq({ process: currentProcess.title })}
              className="px-4 py-2 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer"
            >
              {isBn ? 'কোটেশন অনুরোধ করুন' : 'Request a Quote'}
            </button>
            <button
              onClick={() => onNavigate({ view: 'alloys' })}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F1B2D] text-xs font-semibold rounded-sm transition-colors cursor-pointer"
            >
              {isBn ? 'উপযুক্ত অ্যালয়' : 'Suitable Alloys'}
            </button>
          </div>
        </div>

        {/* Process Overview & Mechanical Specs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Description (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white border border-slate-200 rounded-sm p-6 sm:p-7 shadow-xs space-y-3">
              <h2 className="text-xl font-bold text-[#0F1B2D] m-0">
                {isBn ? 'প্রক্রিয়া পর্যালোচনা ও ধাতুবিদ্যার মূলনীতি' : 'Process Overview & Metallurgical Principle'}
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed m-0 text-justify">
                {currentDesc}
              </p>
            </div>

            {/* Specifications Table */}
            <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] pb-2 border-b border-slate-100 m-0">
                {isBn ? 'মাত্রাগত ও উৎপাদন সক্ষমতা' : 'Dimensional & Capacity Envelope'}
              </h3>
              <table className="w-full text-xs text-left">
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-500 w-1/3">
                      {isBn ? 'আকার সীমা / এনভেলপ' : 'Envelope / Size Limits'}
                    </td>
                    <td className="py-2.5 text-slate-800 font-medium">{currentSize}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-500">
                      {isBn ? 'ওজন সক্ষমতা' : 'Weight Capacity'}
                    </td>
                    <td className="py-2.5 text-slate-800 font-medium">{currentWeight}</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 font-semibold text-slate-500">
                      {isBn ? 'স্ট্যান্ডার্ড টলারেন্স' : 'Standard Tolerances'}
                    </td>
                    <td className="py-2.5 text-slate-800 font-medium">{currentTolerances}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Typical Components */}
            <div className="bg-white border border-slate-200 rounded-sm p-6 space-y-4 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] m-0 pb-2 border-b border-slate-100">
                {isBn ? 'উৎপাদিত সাধারণ উপাদানসমূহ' : 'Typical Components Manufactured'}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentComponents.map((comp, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 p-3 bg-[#F3F4F6] border border-slate-200 rounded-sm text-xs text-slate-800">
                    <Check className="w-4 h-4 text-[#1D4ED8] shrink-0" />
                    <span>{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Rail: Suitable Alloys & Industries */}
          <div className="space-y-6">
            {/* Suitable Alloys */}
            <div className="bg-white border border-[#D9DCE1] rounded-sm p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] pb-2 border-b border-slate-100 m-0">
                {isBn ? 'সাধারণ উপযুক্ত অ্যালয়' : 'Common Suitable Alloys'}
              </h3>
              <ul className="space-y-2 text-xs">
                {currentProcess.suitableAlloys.map((alloy, idx) => (
                  <li key={idx} className="flex items-center justify-between text-slate-700">
                    <span className="font-semibold">{alloy}</span>
                    <button 
                      onClick={() => onNavigate({ view: 'alloys' })}
                      className="text-[#1D4ED8] hover:underline cursor-pointer"
                    >
                      {isBn ? 'স্পেক্স দেখুন' : 'View Specs'}
                    </button>
                  </li>
                ))}
              </ul>
              <div className="pt-2">
                <button
                  onClick={() => onNavigate({ view: 'alloys' })}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-[#0F1B2D] text-xs font-semibold rounded-sm text-center cursor-pointer"
                >
                  {isBn ? 'সম্পূর্ণ অ্যালয় ক্যাটালগ দেখুন' : 'Browse Full Alloy Catalog'}
                </button>
              </div>
            </div>

            {/* Industries Served */}
            <div className="bg-white border border-[#D9DCE1] rounded-sm p-5 space-y-3 shadow-xs">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#0F1B2D] pb-2 border-b border-slate-100 m-0">
                {isBn ? 'লক্ষ্যভুক্ত শিল্প খাত' : 'Target Industries'}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {currentProcess.industriesServed.map((ind, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs rounded-sm">
                    {ind}
                  </span>
                ))}
              </div>
            </div>

            {/* Direct Consultation Box */}
            <div className="bg-[#0F1B2D] border border-slate-800 text-white p-6 rounded-sm space-y-3 shadow-xs">
              <span className="text-xs font-bold text-[#F5B800] uppercase block">
                {isBn ? 'কারিগরি পরামর্শ প্রয়োজন?' : 'Need Technical Sizing?'}
              </span>
              <p className="text-xs text-slate-300 m-0">
                {isBn
                  ? 'আমাদের টুলিং ইঞ্জিনিয়াররা এই প্রক্রিয়ার জন্য সলিডিফিকেশন বিশ্লেষণ এবং মোল্ড সুপারিশ প্রদান করেন।'
                  : 'Our tooling engineers provide solidification analysis and casting mold recommendations for this process.'}
              </p>
              <button
                onClick={() => onOpenRfq({ process: currentProcess.title })}
                className="w-full py-2.5 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-sm transition-colors cursor-pointer"
              >
                {isBn ? 'একটি প্রস্তাবনা অনুরোধ করুন' : 'Request a Proposal'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
