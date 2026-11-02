import React, { useState } from 'react';
import { PageRoute } from '../types/navigation';
import { SALES_CONTACTS, SalesContact, SITE_METADATA } from '../data/siteData';
import { AskTheExpertsBand } from '../components/AskTheExpertsBand';
import { Phone, Mail, MapPin, ChevronRight, ArrowRight, UserCheck, Shield } from 'lucide-react';

import { IMAGES } from '../assets/images';
import { PageHero } from '../components/PageHero';

interface SalesContactsViewProps {
  initialMarketSlug?: string;
  onNavigate: (route: PageRoute) => void;
  onOpenRfq: (prefill?: { alloy?: string; process?: string }) => void;
}

export const SalesContactsView: React.FC<SalesContactsViewProps> = ({ 
  initialMarketSlug, 
  onNavigate, 
  onOpenRfq 
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(initialMarketSlug || 'all');

  const filteredContacts = selectedFilter === 'all' 
    ? SALES_CONTACTS 
    : SALES_CONTACTS.filter(sc => sc.marketSlug === selectedFilter);

  return (
    <div className="space-y-8 pb-12">
      {/* Full-width 400px Hero */}
      <PageHero
        title="Sales Contacts"
        badge="Global Reach"
        subtitle="Direct key account engineering managers and regional technical sales specialists"
        imageSrc={IMAGES.salesContacts}
        imageAlt="Direct sales contacts and key account engineering managers at Metal Tech BD"
      />

      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8]">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">Sales Contacts Directory</span>
        </nav>

        {/* Market Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-slate-200">
          <span className="text-xs font-bold text-slate-500 mr-2">Filter by Industry:</span>
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors cursor-pointer ${
              selectedFilter === 'all' 
                ? 'bg-[#1D4ED8] text-white' 
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Sectors ({SALES_CONTACTS.length})
          </button>
          {SALES_CONTACTS.map((sc) => (
            <button
              key={sc.marketSlug}
              onClick={() => setSelectedFilter(sc.marketSlug)}
              className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-colors cursor-pointer ${
                selectedFilter === sc.marketSlug 
                  ? 'bg-[#1D4ED8] text-white' 
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {sc.marketName}
            </button>
          ))}
        </div>

        {/* Sales Contacts Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white border border-[#D9DCE1] rounded-sm p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1D4ED8]">
                    {contact.marketName}
                  </span>
                  <span className="text-[11px] text-slate-400">Territory: {contact.territory}</span>
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-xl font-bold text-[#0F1B2D] m-0">
                    {contact.name}
                  </h3>
                  <p className="text-xs font-semibold text-slate-600 m-0">
                    {contact.role}
                  </p>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed m-0">
                  {contact.experience}
                </p>
              </div>

              {/* Direct Reach Out Actions */}
              <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#1D4ED8]" /> Phone:
                  </span>
                  <a 
                    href={`tel:${contact.phone.replace(/[^0-9+]/g, '')}`} 
                    className="font-bold text-[#0F1B2D] hover:text-[#1D4ED8]"
                  >
                    {contact.phone}
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#1D4ED8]" /> Email:
                  </span>
                  <a 
                    href={`mailto:${contact.email}`} 
                    className="font-bold text-[#1D4ED8] hover:underline"
                  >
                    {contact.email}
                  </a>
                </div>

                <button
                  onClick={() => onOpenRfq({ process: contact.marketName })}
                  className="w-full mt-2 py-2 bg-slate-900 hover:bg-[#1D4ED8] text-white font-bold rounded-sm text-center transition-colors cursor-pointer"
                >
                  Send RFQ Directly to {contact.name.split(' ')[0]}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Central Switchboard Note */}
        <div className="bg-[#F3F4F6] border border-[#D9DCE1] rounded-sm p-6 text-center space-y-2">
          <h4 className="text-base font-bold text-[#0F1B2D] m-0">
            Unsure which Key Account Manager covers your inquiry?
          </h4>
          <p className="text-xs text-slate-600 max-w-lg mx-auto m-0">
            Our Central Engineering Desk routes all general inquiries to the right metallurgist within 2 hours. Call <strong>{SITE_METADATA.phone}</strong> or email <strong>{SITE_METADATA.salesEmail}</strong>.
          </p>
        </div>
      </div>

      <AskTheExpertsBand
        onContactClick={() => onNavigate({ view: 'contact-us' })}
        onRfqClick={() => onOpenRfq()}
      />
    </div>
  );
};
