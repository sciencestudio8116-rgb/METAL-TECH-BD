import React, { useState } from 'react';
import { PageRoute } from '../types/navigation';
import { SITE_METADATA, DIVISIONS } from '../data/siteData';
import { AskTheExpertsBand } from '../components/AskTheExpertsBand';
import { 
  Phone, Mail, MapPin, Send, CheckCircle2, ChevronRight, 
  ArrowRight, Users, Clock, ShieldCheck, Loader2 
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface ContactUsViewProps {
  isQuoteRequest?: boolean;
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: () => void;
}

import { IMAGES } from '../assets/images';
import { PageHero } from '../components/PageHero';

export const ContactUsView: React.FC<ContactUsViewProps> = ({ isQuoteRequest = false, onNavigate, onOpenRfq }) => {
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    department: 'Sales & RFQ',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      return;
    }
    setIsSubmitting(true);
    try {
      await supabase.from('rfq_leads').insert({
        full_name: formData.name.trim(),
        company_name: formData.company.trim() || null,
        email: formData.email.trim(),
        phone: formData.phone.trim() || null,
        detailed_specifications: `Department: ${formData.department} | Inquiry: ${formData.message.trim()}`,
        status: 'new'
      });
    } catch (err: any) {
      console.warn('Network issue during contact inquiry submit:', err?.message);
    } finally {
      setIsSubmitting(false);
      setFormSent(true);
    }
  };

  const pageTitle = isQuoteRequest ? 'Request a Quote' : 'Contact Us';

  return (
    <div className="space-y-8 pb-12">
      {/* Full-width 400px Hero */}
      <PageHero
        title={pageTitle}
        badge="Direct Inquiries"
        subtitle="We're here to help. Reach out to our metallurgical and sales engineering team for any inquiry, quote, or technical consultation."
        imageSrc={IMAGES.contactUs}
        imageAlt={`${pageTitle} at Metal Tech BD`}
      />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8]">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Contact Us</span>
        </nav>

        {/* Key Account Manager Prompt Box (observed in reference sitemap) */}
        <div className="bg-[#F3F4F6] border border-[#D9DCE1] rounded-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-[#0F1B2D] m-0">
              Looking for your industry's dedicated Key Account Manager?
            </h3>
            <p className="text-xs text-slate-600 m-0">
              Direct phone lines and emails for Energy, Petrochemical, Turbine Engine, Aerospace, and Defense managers.
            </p>
          </div>
          <button
            onClick={() => onNavigate({ view: 'sales-contacts' })}
            className="px-5 py-2.5 bg-slate-900 hover:bg-[#1D4ED8] text-white text-xs font-bold rounded-sm transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            View Key Account Managers
          </button>
        </div>

        {/* Main Content Split: Form & Locations */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* General Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-[#D9DCE1] rounded-sm p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold text-[#0F1B2D] m-0">
                  Send a General Inquiry
                </h3>
                <p className="text-xs text-slate-500 m-0">
                  For formal multi-part drawings and CAD review, use our{' '}
                  <button onClick={onOpenRfq} className="text-[#1D4ED8] font-bold underline">
                    Multi-Step RFQ form
                  </button>
                  .
                </p>
              </div>
              <button
                onClick={onOpenRfq}
                className="hidden sm:inline-block px-3 py-1.5 bg-blue-50 text-[#1D4ED8] hover:bg-blue-100 font-bold text-xs rounded"
              >
                Launch RFQ Modal
              </button>
            </div>

            {formSent ? (
              <div className="p-8 text-center space-y-3 bg-emerald-50 rounded border border-emerald-200">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-900 m-0">Inquiry Received</h4>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto">
                  Thank you, {formData.name}. Our central technical desk will respond to <strong>{formData.email}</strong> within 1 business day.
                </p>
                <button
                  onClick={() => setFormSent(false)}
                  className="px-4 py-2 bg-emerald-700 text-white text-xs font-bold rounded hover:bg-emerald-800"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                      placeholder="e.g. Tariq Ahmed"
                      className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-hidden focus:border-[#1D4ED8]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Company Name
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                      placeholder="e.g. Apex Engineering Ltd"
                      className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-hidden focus:border-[#1D4ED8]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                      placeholder="name@company.com"
                      className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-hidden focus:border-[#1D4ED8]"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                      placeholder="+880 17..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-hidden focus:border-[#1D4ED8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Department to Route To
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData(p => ({ ...p, department: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-sm bg-white focus:outline-hidden focus:border-[#1D4ED8]"
                  >
                    <option value="Sales & RFQ">Sales & Quotations Desk</option>
                    <option value="Metallurgy Engineering">Metallurgical Engineering & Design</option>
                    <option value="Quality Inspection">Quality Assurance & Certification Audits</option>
                    <option value="Supply Chain">Procurement & Raw Material Vendors</option>
                    <option value="Careers HR">Human Resources & Recruitment</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Message / Inquiry <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
                    placeholder="Describe your component inquiry, requested tolerances, or questions..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-sm focus:outline-hidden focus:border-[#1D4ED8]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#1D4ED8] hover:bg-[#163A9E] disabled:opacity-50 text-white font-bold rounded-sm transition-colors cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Inquiry...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Plant Locations (5 cols per reference sitemap: "Our Locations") */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-lg font-bold text-[#0F1B2D] m-0">
              Our Locations & Production Facilities
            </h3>

            {/* Location 1: Dhaka HQ */}
            <div className="bg-white border border-[#D9DCE1] rounded-sm p-4 space-y-2 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-[#1D4ED8] tracking-wider block">
                Central Complex & Headquarters
              </span>
              <h4 className="text-sm font-bold text-[#0F1B2D] m-0">Dhaka Central Foundry Complex</h4>
              <p className="text-xs text-slate-500 m-0">
                {SITE_METADATA.dhakaHqAddress}
              </p>
              <div className="pt-1 text-xs text-slate-600 space-y-0.5">
                <div>PH: <a href={`tel:${SITE_METADATA.phone.replace(/\s+/g, '')}`} className="font-semibold hover:text-[#1D4ED8]">{SITE_METADATA.phone}</a></div>
                <div>FX: +880 2 9884522</div>
                <div>EM: <a href={`mailto:${SITE_METADATA.salesEmail}`} className="font-semibold text-[#1D4ED8]">{SITE_METADATA.salesEmail}</a></div>
              </div>
            </div>

            {/* Location 2: Gazipur Heavy Plant */}
            <div className="bg-white border border-[#D9DCE1] rounded-sm p-4 space-y-2 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-[#1D4ED8] tracking-wider block">
                Heavy Casting & Heat Treat Hub
              </span>
              <h4 className="text-sm font-bold text-[#0F1B2D] m-0">Gazipur Precision Investcast & AOD Plant</h4>
              <p className="text-xs text-slate-500 m-0">
                {SITE_METADATA.plantAddress}
              </p>
              <div className="pt-1 text-xs text-slate-600 space-y-0.5">
                <div>PH: +880 2 9291044</div>
                <div>EM: gazipur.plant@metaltechbd.com</div>
              </div>
            </div>

            {/* Location 3: Chittagong Port Gateway */}
            <div className="bg-white border border-[#D9DCE1] rounded-sm p-4 space-y-2 shadow-xs">
              <span className="text-[11px] font-bold uppercase text-[#1D4ED8] tracking-wider block">
                Deepwater Export Gateway
              </span>
              <h4 className="text-sm font-bold text-[#0F1B2D] m-0">Chittagong Heavy Machining & Marine Terminal</h4>
              <p className="text-xs text-slate-500 m-0">
                {SITE_METADATA.chittagongHub}
              </p>
              <div className="pt-1 text-xs text-slate-600 space-y-0.5">
                <div>PH: +880 31 716890</div>
                <div>EM: ctg.machining@metaltechbd.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AskTheExpertsBand
        onContactClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onRfqClick={() => onOpenRfq()}
      />
    </div>
  );
};
