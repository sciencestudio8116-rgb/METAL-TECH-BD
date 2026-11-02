import React from 'react';
import { PageRoute } from '../types/navigation';
import { ChevronRight } from 'lucide-react';

import { IMAGES } from '../assets/images';
import { PageHero } from '../components/PageHero';

interface LegalViewProps {
  type: 'privacy' | 'accessibility' | 'terms';
  onNavigate: (route: PageRoute) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ type, onNavigate }) => {
  const title = 
    type === 'privacy' ? 'Privacy Policy' : 
    type === 'accessibility' ? 'Accessibility Statement' : 
    'Terms & Conditions';

  return (
    <div className="pb-16 bg-white space-y-8">
      {/* Full-width 400px Hero */}
      <PageHero
        title={title}
        badge="Compliance & Governance"
        subtitle="Corporate policies, terms of trade, and industrial compliance certifications"
        imageSrc={IMAGES.legal}
        imageAlt={`${title} at Metal Tech BD`}
      />

      <div className="max-w-[850px] mx-auto px-4 sm:px-6 space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <button onClick={() => onNavigate({ view: 'home' })} className="hover:text-[#1D4ED8]">Home</button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">{title}</span>
        </nav>

        {type === 'privacy' && (
          <article className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <h1 className="text-3xl font-extrabold text-[#0F1B2D] m-0">
              Corporate Privacy & Data Protection Policy
            </h1>
            <p className="text-xs text-slate-500">Last Reviewed: October 31, 2026</p>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#0F1B2D]">1. Information We Collect</h2>
              <p>
                Metal Tech BD collects information voluntarily provided during the Request for Quote (RFQ), technical consultation, and careers application processes. This includes corporate contact details (name, business email, telephone, company name) and technical engineering drawings (CAD, PDF, STEP).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#0F1B2D]">2. Use of Technical & Proprietary Data</h2>
              <p>
                All drawings, CAD models, and alloy specifications uploaded to our systems are treated with strict confidentiality. Engineering files are accessible exclusively by our certified metallurgists and tooling engineers for quotation and casting solidification simulations. We execute mutual Non-Disclosure Agreements (NDAs) upon request prior to CAD dissemination.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#0F1B2D]">3. Non-Sale of Personal Information</h2>
              <p>
                Metal Tech BD does not sell, lease, or monetize personal or commercial contact information to third-party data brokers. Information is processed strictly for fulfilling B2B manufacturing inquiries, industrial audits, and contractual obligations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#0F1B2D]">4. Data Retention & Security Protocols</h2>
              <p>
                We implement enterprise-grade TLS encryption, parameterized server endpoints, and isolated file storage to protect technical data. Inactive quotation records are retained in compliance with standard commercial manufacturing records requirements (up to 7 years for certified Mill Test Certificate archives).
              </p>
            </section>
          </article>
        )}

        {type === 'accessibility' && (
          <article className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <h1 className="text-3xl font-extrabold text-[#0F1B2D] m-0">
              Accessibility Statement (WCAG 2.2 AA)
            </h1>
            <p className="text-xs text-slate-500">Effective: October 31, 2026</p>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#0F1B2D]">Our Commitment to Digital Inclusion</h2>
              <p>
                Metal Tech BD is dedicated to ensuring digital accessibility for all engineers, procurement specialists, and visitors with disabilities. We continually conform our web experiences to the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#0F1B2D]">Technical Measures Implemented</h2>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600">
                <li><strong>Contrast Compliance:</strong> Text elements maintain at least 4.5:1 contrast against backdrops (royal blue on white exceeds 6.7:1).</li>
                <li><strong>Full Keyboard Operability:</strong> All mega-menus, multi-step RFQ inputs, modal dialogs, and alloy filter chips are operable via keyboard Tab, Enter, and Escape keys.</li>
                <li><strong>Visible Focus Rings:</strong> Interactive elements display clear visible focus rings.</li>
                <li><strong>Screen Reader Semantics:</strong> Correct ARIA attributes (`aria-expanded`, `aria-modal`, table headings, descriptive alt text) implemented across all templates.</li>
                <li><strong>Responsive Scalability:</strong> Pages reflow smoothly up to 200% browser zoom without text clipping or horizontal page breaks.</li>
              </ul>
            </section>
          </article>
        )}

        {type === 'terms' && (
          <article className="space-y-6 text-sm text-slate-700 leading-relaxed">
            <h1 className="text-3xl font-extrabold text-[#0F1B2D] m-0">
              Website Terms & Conditions
            </h1>
            <p className="text-xs text-slate-500">Published: October 31, 2026</p>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#0F1B2D]">1. Intellectual Property & Specification Accuracy</h2>
              <p>
                Material properties, typical chemical compositions, and mechanical tensile/yield values listed in our Alloy Guide represent typical industry guidelines and baseline test results. Formal engineering specifications are established only upon contract signing and certified on EN 10204 Type 3.1 Mill Test Certificates.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#0F1B2D]">2. Commercial Proposals & Quotations</h2>
              <p>
                Quotations provided via this website constitute non-binding estimates until drawings, material grades, tolerance classifications, and NDT requirements are fully audited and confirmed in writing by Metal Tech BD's commercial management.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-[#0F1B2D]">3. Governing Jurisdiction</h2>
              <p>
                These terms are governed by the laws of Bangladesh. Export transactions and marine castings are subject to international maritime and commercial trading terms (Incoterms 2020).
              </p>
            </section>
          </article>
        )}
      </div>
    </div>
  );
};
