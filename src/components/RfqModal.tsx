import React, { useState, useEffect } from 'react';
import { 
  X, Check, ChevronRight, ChevronLeft, Upload, FileText, 
  Clock, CheckCircle2, Printer
} from 'lucide-react';
import { MARKET_SOLUTIONS } from '../data/siteData';

interface RfqModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefill?: {
    alloy?: string;
    process?: string;
  };
}

interface RfqFormData {
  // Step 1: Contact
  fullName: string;
  companyName: string;
  jobTitle: string;
  businessEmail: string;
  phoneWhatsapp: string;
  countryCity: string;

  // Step 2: Project
  industry: string;
  processes: string[];
  projectType: string;
  projectDescription: string;

  // Step 3: Technical Specs
  alloyGrade: string;
  standardSpec: string;
  weightValue: string;
  weightUnit: 'kg' | 'lb';
  dimensions: string;
  quantityFirstOrder: string;
  quantityAnnual: string;
  heatTreatmentRequired: boolean;
  machiningRequired: boolean;
  testingRequired: string[];
  targetDeliveryDate: string;
  deliveryLocation: string;

  // Step 4: Attachments & Consent
  ndaRequested: boolean;
  consentAgreed: boolean;
  honeypot: string; // Bot protection
  uploadedFiles: { name: string; size: string }[];
}

const INITIAL_FORM: RfqFormData = {
  fullName: '',
  companyName: '',
  jobTitle: '',
  businessEmail: '',
  phoneWhatsapp: '',
  countryCity: '',

  industry: 'Power & Energy',
  processes: [],
  projectType: 'New Part Development',
  projectDescription: '',

  alloyGrade: '',
  standardSpec: '',
  weightValue: '',
  weightUnit: 'kg',
  dimensions: '',
  quantityFirstOrder: '',
  quantityAnnual: '',
  heatTreatmentRequired: true,
  machiningRequired: true,
  testingRequired: ['Mill Test Certificate (EN 10204 3.1)'],
  targetDeliveryDate: '',
  deliveryLocation: '',

  ndaRequested: false,
  consentAgreed: false,
  honeypot: '',
  uploadedFiles: [],
};

export const RfqModal: React.FC<RfqModalProps> = ({ isOpen, onClose, prefill }) => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<RfqFormData>(() => {
    const saved = sessionStorage.getItem('metaltech_rfq_draft');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_FORM;
      }
    }
    return INITIAL_FORM;
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [generatedRfqId, setGeneratedRfqId] = useState<string>('');

  useEffect(() => {
    if (prefill?.alloy) {
      setFormData(prev => ({ ...prev, alloyGrade: prefill.alloy || prev.alloyGrade }));
    }
    if (prefill?.process) {
      setFormData(prev => ({
        ...prev,
        processes: prev.processes.includes(prefill.process!) 
          ? prev.processes 
          : [...prev.processes, prefill.process!]
      }));
    }
  }, [prefill]);

  useEffect(() => {
    sessionStorage.setItem('metaltech_rfq_draft', JSON.stringify(formData));
  }, [formData]);

  if (!isOpen) return null;

  const validateStep = (currentStep: number): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required.';
      if (!formData.companyName.trim()) newErrors.companyName = 'Company Name is required.';
      if (!formData.businessEmail.trim()) {
        newErrors.businessEmail = 'Business Email is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.businessEmail)) {
        newErrors.businessEmail = 'Please enter a valid business email address.';
      }
      if (!formData.phoneWhatsapp.trim()) newErrors.phoneWhatsapp = 'Phone or WhatsApp number is required.';
      if (!formData.countryCity.trim()) newErrors.countryCity = 'Country and City are required.';
    }

    if (currentStep === 2) {
      if (!formData.industry) newErrors.industry = 'Please select your target industry.';
      if (formData.processes.length === 0) newErrors.processes = 'Select at least one process of interest.';
      if (!formData.projectDescription.trim() || formData.projectDescription.trim().length < 10) {
        newErrors.projectDescription = 'Please provide a brief project summary (min 10 characters).';
      }
    }

    if (currentStep === 3) {
      if (!formData.quantityFirstOrder.trim()) {
        newErrors.quantityFirstOrder = 'Please specify initial order quantity.';
      }
    }

    if (currentStep === 4) {
      if (!formData.consentAgreed) {
        newErrors.consentAgreed = 'You must agree to the data processing & privacy policy.';
      }
      if (formData.honeypot) {
        newErrors.honeypot = 'Spam submission detected.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) return;

    const randomSeq = Math.floor(100000 + Math.random() * 900000);
    const rfqId = `RFQ-2026-${randomSeq}`;
    setGeneratedRfqId(rfqId);
    setIsSubmitted(true);
    sessionStorage.removeItem('metaltech_rfq_draft');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      }));
      setFormData(prev => ({
        ...prev,
        uploadedFiles: [...prev.uploadedFiles, ...newFiles].slice(0, 5)
      }));
    }
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uploadedFiles: prev.uploadedFiles.filter((_, i) => i !== index)
    }));
  };

  const toggleProcess = (p: string) => {
    setFormData(prev => ({
      ...prev,
      processes: prev.processes.includes(p)
        ? prev.processes.filter(x => x !== p)
        : [...prev.processes, p]
    }));
  };

  const toggleTesting = (t: string) => {
    setFormData(prev => ({
      ...prev,
      testingRequired: prev.testingRequired.includes(t)
        ? prev.testingRequired.filter(x => x !== t)
        : [...prev.testingRequired, t]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-[#1C2541] rounded-lg shadow-2xl border border-[#2B3E50] overflow-hidden my-auto text-white"
        role="dialog" 
        aria-modal="true"
        aria-labelledby="rfq-title"
      >
        {/* Header bar */}
        <div className="bg-[#0B132B] px-6 py-4 flex items-center justify-between border-b border-[#2B3E50]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#3B82F6] flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(59,130,246,0.5)]">
              RFQ
            </div>
            <div>
              <h2 id="rfq-title" className="text-lg font-bold text-white m-0">
                Request for Proposal & Technical Quote
              </h2>
              <p className="text-xs text-[#8D99AE] m-0">
                Guaranteed engineering review within 1 business day
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded text-[#8D99AE] hover:text-white hover:bg-[#223055] transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Screen */}
        {isSubmitted ? (
          <div className="p-8 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#4CC9F0]">
                RFQ Transmitted Successfully
              </span>
              <h3 className="text-2xl font-bold text-white">
                Quote Request {generatedRfqId}
              </h3>
              <p className="text-sm text-[#8D99AE] max-w-md mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Your technical specifications and drawings have been assigned to our lead foundry metallurgical engineering team.
              </p>
            </div>

            {/* SLA Promise Box */}
            <div className="bg-[#0B132B] border border-[#2B3E50] rounded-md p-5 max-w-lg mx-auto text-left flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#3B82F6] shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 space-y-1">
                <span className="font-bold block text-sm text-white">What Happens Next:</span>
                <p>1. Confirmation sent to <strong className="text-[#4CC9F0]">{formData.businessEmail}</strong>.</p>
                <p>2. A dedicated Key Account Metallurgist is reviewing solidification feasibility.</p>
                <p>3. Formal proposal with pricing, lead times, and MTC test scope delivered within 24 business hours.</p>
              </div>
            </div>

            {/* Submission Summary Card */}
            <div className="border border-[#2B3E50] rounded-md p-4 max-w-lg mx-auto text-left text-xs space-y-2 bg-[#0B132B]">
              <div className="font-bold text-slate-200 pb-1.5 border-b border-[#2B3E50] flex justify-between">
                <span>Summary of Specs</span>
                <span className="text-[#4CC9F0] font-mono">Ref: {generatedRfqId}</span>
              </div>
              <div><span className="text-[#8D99AE]">Company:</span> {formData.companyName}</div>
              <div><span className="text-[#8D99AE]">Alloy / Grade:</span> {formData.alloyGrade || 'To be recommended by Metallurgist'}</div>
              <div><span className="text-[#8D99AE]">Processes:</span> {formData.processes.join(', ')}</div>
              <div><span className="text-[#8D99AE]">Quantity:</span> {formData.quantityFirstOrder} pieces (Initial)</div>
              {formData.uploadedFiles.length > 0 && (
                <div><span className="text-[#8D99AE]">Drawings:</span> {formData.uploadedFiles.map(f => f.name).join(', ')}</div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 border border-[#2B3E50] rounded text-xs font-semibold text-slate-200 hover:bg-[#223055] transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" /> Print Summary
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold rounded shadow-md transition-colors cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          </div>
        ) : (
          /* Multi-Step Wizard */
          <div>
            {/* Step Progress Bar */}
            <div className="bg-[#0B132B]/70 px-6 py-3 border-b border-[#2B3E50]">
              <div className="flex items-center justify-between text-xs font-semibold text-[#8D99AE]">
                <div className={`flex items-center gap-2 ${step === 1 ? 'text-[#4CC9F0] font-bold' : step > 1 ? 'text-emerald-400' : ''}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 1 ? 'bg-[#3B82F6] text-white' : step > 1 ? 'bg-emerald-600 text-white' : 'bg-[#2B3E50] text-[#8D99AE]'}`}>
                    {step > 1 ? <Check className="w-3 h-3" /> : '1'}
                  </span>
                  <span>Contact</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#2B3E50]" />
                <div className={`flex items-center gap-2 ${step === 2 ? 'text-[#4CC9F0] font-bold' : step > 2 ? 'text-emerald-400' : ''}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 2 ? 'bg-[#3B82F6] text-white' : step > 2 ? 'bg-emerald-600 text-white' : 'bg-[#2B3E50] text-[#8D99AE]'}`}>
                    {step > 2 ? <Check className="w-3 h-3" /> : '2'}
                  </span>
                  <span>Project</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#2B3E50]" />
                <div className={`flex items-center gap-2 ${step === 3 ? 'text-[#4CC9F0] font-bold' : step > 3 ? 'text-emerald-400' : ''}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 3 ? 'bg-[#3B82F6] text-white' : step > 3 ? 'bg-emerald-600 text-white' : 'bg-[#2B3E50] text-[#8D99AE]'}`}>
                    {step > 3 ? <Check className="w-3 h-3" /> : '3'}
                  </span>
                  <span>Specs</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#2B3E50]" />
                <div className={`flex items-center gap-2 ${step === 4 ? 'text-[#4CC9F0] font-bold' : ''}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 4 ? 'bg-[#3B82F6] text-white' : 'bg-[#2B3E50] text-[#8D99AE]'}`}>
                    4
                  </span>
                  <span>Review</span>
                </div>
              </div>
            </div>

            {/* Form Content */}
            <form onSubmit={handleSubmit} className="p-6">
              <input 
                type="text" 
                name="user_verification_token" 
                value={formData.honeypot} 
                onChange={(e) => setFormData(p => ({ ...p, honeypot: e.target.value }))} 
                style={{ display: 'none' }} 
                tabIndex={-1} 
                autoComplete="off" 
              />

              {/* STEP 1: CONTACT DETAILS */}
              {step === 1 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-[#2B3E50] pb-2">
                    <h3 className="text-base font-bold text-white m-0">Step 1: Contact & Company Profile</h3>
                    <p className="text-xs text-[#8D99AE] m-0">Please provide your corporate details for formal quotation routing.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData(p => ({ ...p, fullName: e.target.value }))}
                        placeholder="e.g. Engr. Michael Vance"
                        className={`w-full px-3 py-2 text-sm bg-[#0B132B] text-white border rounded-md focus:outline-hidden focus:border-[#3B82F6] ${errors.fullName ? 'border-red-500' : 'border-[#2B3E50]'}`}
                      />
                      {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Company Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData(p => ({ ...p, companyName: e.target.value }))}
                        placeholder="e.g. Apex Industrial Valves Corp"
                        className={`w-full px-3 py-2 text-sm bg-[#0B132B] text-white border rounded-md focus:outline-hidden focus:border-[#3B82F6] ${errors.companyName ? 'border-red-500' : 'border-[#2B3E50]'}`}
                      />
                      {errors.companyName && <p className="text-red-400 text-xs mt-1">{errors.companyName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Job Title / Engineering Role
                      </label>
                      <input
                        type="text"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData(p => ({ ...p, jobTitle: e.target.value }))}
                        placeholder="e.g. Lead Sourcing Engineer"
                        className="w-full px-3 py-2 text-sm bg-[#0B132B] text-white border border-[#2B3E50] rounded-md focus:outline-hidden focus:border-[#3B82F6]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Corporate Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.businessEmail}
                        onChange={(e) => setFormData(p => ({ ...p, businessEmail: e.target.value }))}
                        placeholder="name@company.com"
                        className={`w-full px-3 py-2 text-sm bg-[#0B132B] text-white border rounded-md focus:outline-hidden focus:border-[#3B82F6] ${errors.businessEmail ? 'border-red-500' : 'border-[#2B3E50]'}`}
                      />
                      {errors.businessEmail && <p className="text-red-400 text-xs mt-1">{errors.businessEmail}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Phone / WhatsApp <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phoneWhatsapp}
                        onChange={(e) => setFormData(p => ({ ...p, phoneWhatsapp: e.target.value }))}
                        placeholder="+1 (555) 019-2834 or +880 17..."
                        className={`w-full px-3 py-2 text-sm bg-[#0B132B] text-white border rounded-md focus:outline-hidden focus:border-[#3B82F6] ${errors.phoneWhatsapp ? 'border-red-500' : 'border-[#2B3E50]'}`}
                      />
                      {errors.phoneWhatsapp && <p className="text-red-400 text-xs mt-1">{errors.phoneWhatsapp}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Country & City / Shipping Port <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.countryCity}
                        onChange={(e) => setFormData(p => ({ ...p, countryCity: e.target.value }))}
                        placeholder="e.g. Singapore / Jurong or USA / Houston"
                        className={`w-full px-3 py-2 text-sm bg-[#0B132B] text-white border rounded-md focus:outline-hidden focus:border-[#3B82F6] ${errors.countryCity ? 'border-red-500' : 'border-[#2B3E50]'}`}
                      />
                      {errors.countryCity && <p className="text-red-400 text-xs mt-1">{errors.countryCity}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: PROJECT OVERVIEW */}
              {step === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-[#2B3E50] pb-2">
                    <h3 className="text-base font-bold text-white m-0">Step 2: Project Scope & Application</h3>
                    <p className="text-xs text-[#8D99AE] m-0">Routes this request directly to the appropriate Key Account Engineer.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Target Market / Industry <span className="text-red-400">*</span>
                      </label>
                      <select
                        value={formData.industry}
                        onChange={(e) => setFormData(p => ({ ...p, industry: e.target.value }))}
                        className="w-full px-3 py-2 text-sm bg-[#0B132B] text-white border border-[#2B3E50] rounded-md focus:outline-hidden focus:border-[#3B82F6]"
                      >
                        {MARKET_SOLUTIONS.map(m => (
                          <option key={m.slug} value={m.title} className="bg-[#0B132B] text-white">{m.title}</option>
                        ))}
                        <option value="General Industrial" className="bg-[#0B132B] text-white">General Industrial / Heavy Machinery</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData(p => ({ ...p, projectType: e.target.value }))}
                        className="w-full px-3 py-2 text-sm bg-[#0B132B] text-white border border-[#2B3E50] rounded-md focus:outline-hidden focus:border-[#3B82F6]"
                      >
                        <option value="New Part Development" className="bg-[#0B132B] text-white">New Part Development</option>
                        <option value="Repeat Order / Established Drawing" className="bg-[#0B132B] text-white">Repeat Order / Established Drawing</option>
                        <option value="Replacement of Failed Component" className="bg-[#0B132B] text-white">Replacement of Failed Component</option>
                        <option value="Cast-to-Weldment Conversion" className="bg-[#0B132B] text-white">Cast-to-Weldment Conversion</option>
                        <option value="R&D Prototype" className="bg-[#0B132B] text-white">R&D Prototype</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                        Process(es) of Interest <span className="text-red-400">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {[
                          'Centrifugal Casting', 
                          'Chemically Bonded Sand Casting', 
                          'Precision Investment Casting', 
                          'High-Integrity Ingot / Billets', 
                          'AOD Secondary Refining',
                          'Precision CNC Machining Only'
                        ].map(proc => (
                          <button
                            type="button"
                            key={proc}
                            onClick={() => toggleProcess(proc)}
                            className={`px-3 py-2.5 text-xs rounded-md border text-left flex items-center justify-between transition-all duration-200 cursor-pointer ${
                              formData.processes.includes(proc)
                                ? 'border-[#3B82F6] bg-[#3B82F6]/20 text-[#4CC9F0] font-semibold'
                                : 'border-[#2B3E50] bg-[#0B132B] hover:border-[#3B82F6]/60 text-slate-300'
                            }`}
                          >
                            <span>{proc}</span>
                            {formData.processes.includes(proc) && <Check className="w-3.5 h-3.5 text-[#4CC9F0]" />}
                          </button>
                        ))}
                      </div>
                      {errors.processes && <p className="text-red-400 text-xs mt-1">{errors.processes}</p>}
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Component Description & Operating Environment <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        rows={3}
                        value={formData.projectDescription}
                        onChange={(e) => setFormData(p => ({ ...p, projectDescription: e.target.value }))}
                        placeholder="Detail component function (e.g., severe service choke valve body, 350°C sour gas, continuous slurry wear, outer diameter ~450mm)..."
                        className={`w-full px-3 py-2 text-sm bg-[#0B132B] text-white border rounded-md focus:outline-hidden focus:border-[#3B82F6] ${errors.projectDescription ? 'border-red-500' : 'border-[#2B3E50]'}`}
                      />
                      {errors.projectDescription && <p className="text-red-400 text-xs mt-1">{errors.projectDescription}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: TECHNICAL SPECIFICATIONS */}
              {step === 3 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-[#2B3E50] pb-2">
                    <h3 className="text-base font-bold text-white m-0">Step 3: Metallurgical & Dimensional Specs</h3>
                    <p className="text-xs text-[#8D99AE] m-0">Optional if fully described in your attached drawings.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Alloy / Material Grade (or UNS / ASTM)
                      </label>
                      <input
                        type="text"
                        value={formData.alloyGrade}
                        onChange={(e) => setFormData(p => ({ ...p, alloyGrade: e.target.value }))}
                        placeholder="e.g. CF8M, Inconel 625, CA6NM, or Unsure"
                        className="w-full px-3 py-2 text-sm bg-[#0B132B] text-white border border-[#2B3E50] rounded-md focus:outline-hidden focus:border-[#3B82F6]"
                      />
                      <div className="flex flex-wrap gap-1.5 mt-1.5 text-[11px] text-[#8D99AE]">
                        <span className="text-[#8D99AE]">Quick-pick:</span>
                        {['CF8M (316)', 'CF3M (316L)', 'Inconel 625', 'CA6NM', 'Stellite 6', 'Super Duplex 2507'].map(a => (
                          <button
                            type="button"
                            key={a}
                            onClick={() => setFormData(p => ({ ...p, alloyGrade: a }))}
                            className="underline hover:text-[#4CC9F0] cursor-pointer"
                          >
                            {a}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Governing Standard (ASTM, ASME, EN, DIN)
                      </label>
                      <input
                        type="text"
                        value={formData.standardSpec}
                        onChange={(e) => setFormData(p => ({ ...p, standardSpec: e.target.value }))}
                        placeholder="e.g. ASTM A351 / ASME Sec VIII"
                        className="w-full px-3 py-2 text-sm bg-[#0B132B] text-white border border-[#2B3E50] rounded-md focus:outline-hidden focus:border-[#3B82F6]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Approx. Weight per Piece
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          value={formData.weightValue}
                          onChange={(e) => setFormData(p => ({ ...p, weightValue: e.target.value }))}
                          placeholder="e.g. 120"
                          className="w-full px-3 py-2 text-sm bg-[#0B132B] text-white border border-[#2B3E50] rounded-md focus:outline-hidden focus:border-[#3B82F6]"
                        />
                        <select
                          value={formData.weightUnit}
                          onChange={(e) => setFormData(p => ({ ...p, weightUnit: e.target.value as 'kg' | 'lb' }))}
                          className="px-3 py-2 text-sm bg-[#0B132B] text-white border border-[#2B3E50] rounded-md"
                        >
                          <option value="kg">kg</option>
                          <option value="lb">lbs</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Key Dimensions (OD × ID × Length or Envelope)
                      </label>
                      <input
                        type="text"
                        value={formData.dimensions}
                        onChange={(e) => setFormData(p => ({ ...p, dimensions: e.target.value }))}
                        placeholder="e.g. Ø450mm OD × Ø380mm ID × 1200mm L"
                        className="w-full px-3 py-2 text-sm bg-[#0B132B] text-white border border-[#2B3E50] rounded-md focus:outline-hidden focus:border-[#3B82F6]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Initial Order Quantity <span className="text-red-400">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.quantityFirstOrder}
                        onChange={(e) => setFormData(p => ({ ...p, quantityFirstOrder: e.target.value }))}
                        placeholder="e.g. 5 pieces or 50 pieces"
                        className={`w-full px-3 py-2 text-sm bg-[#0B132B] text-white border rounded-md focus:outline-hidden focus:border-[#3B82F6] ${errors.quantityFirstOrder ? 'border-red-500' : 'border-[#2B3E50]'}`}
                      />
                      {errors.quantityFirstOrder && <p className="text-red-400 text-xs mt-1">{errors.quantityFirstOrder}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-200 mb-1">
                        Estimated Annual Requirement
                      </label>
                      <input
                        type="text"
                        value={formData.quantityAnnual}
                        onChange={(e) => setFormData(p => ({ ...p, quantityAnnual: e.target.value }))}
                        placeholder="e.g. 100 - 250 pieces / year"
                        className="w-full px-3 py-2 text-sm bg-[#0B132B] text-white border border-[#2B3E50] rounded-md focus:outline-hidden focus:border-[#3B82F6]"
                      />
                    </div>

                    {/* Secondary Operations */}
                    <div className="sm:col-span-2 pt-2 border-t border-[#2B3E50]">
                      <span className="block text-xs font-bold text-slate-200 mb-2">Scope of Supply:</span>
                      <div className="flex flex-wrap gap-4 text-xs">
                        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                          <input
                            type="checkbox"
                            checked={formData.heatTreatmentRequired}
                            onChange={(e) => setFormData(p => ({ ...p, heatTreatmentRequired: e.target.checked }))}
                            className="rounded accent-[#3B82F6]"
                          />
                          <span>Solution Anneal / Quench & Temper Heat Treatment</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                          <input
                            type="checkbox"
                            checked={formData.machiningRequired}
                            onChange={(e) => setFormData(p => ({ ...p, machiningRequired: e.target.checked }))}
                            className="rounded accent-[#3B82F6]"
                          />
                          <span>Finish CNC Machining (Assembly-Ready)</span>
                        </label>
                      </div>
                    </div>

                    {/* Testing Requirements */}
                    <div className="sm:col-span-2">
                      <span className="block text-xs font-bold text-slate-200 mb-1.5">Required Testing & Certifications:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {[
                          'Mill Test Certificate (EN 10204 3.1)',
                          'Radiographic Examination (RT / X-Ray)',
                          'Ultrasonic Testing (UT)',
                          'Liquid Dye Penetrant (PT / DPI)',
                          'Cryogenic Charpy Impact Test (-196°C)',
                          'Third-Party Inspection (TUV / DNV / BV 3.2)'
                        ].map(test => (
                          <label key={test} className="flex items-center gap-2 cursor-pointer text-slate-300">
                            <input
                              type="checkbox"
                              checked={formData.testingRequired.includes(test)}
                              onChange={() => toggleTesting(test)}
                              className="rounded accent-[#3B82F6]"
                            />
                            <span>{test}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: ATTACHMENTS & REVIEW */}
              {step === 4 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div className="border-b border-[#2B3E50] pb-2">
                    <h3 className="text-base font-bold text-white m-0">Step 4: Engineering Drawings & Submission</h3>
                    <p className="text-xs text-[#8D99AE] m-0">Attach CAD / 2D drawings for fastest precision turnaround.</p>
                  </div>

                  {/* Drag and Drop Box */}
                  <div className="border-2 border-dashed border-[#2B3E50] hover:border-[#3B82F6] rounded-md p-6 text-center bg-[#0B132B]/50 hover:bg-[#0B132B] transition-all duration-300">
                    <Upload className="w-8 h-8 text-[#4CC9F0] mx-auto mb-2" />
                    <p className="text-sm font-semibold text-slate-200 mb-1">
                      Drag & Drop Engineering Files Here
                    </p>
                    <p className="text-xs text-[#8D99AE] mb-3">
                      Supported formats: PDF, DWG, DXF, STEP, STP, IGES, XLSX (Max 5 files, 25MB total)
                    </p>
                    <label className="inline-block px-4 py-2 bg-[#1C2541] hover:bg-[#223055] border border-[#2B3E50] rounded-md text-xs font-semibold text-slate-200 cursor-pointer transition-colors">
                      Browse Files
                      <input 
                        type="file" 
                        multiple 
                        accept=".pdf,.dwg,.dxf,.step,.stp,.iges,.igs,.xlsx,.docx,.jpg,.png"
                        onChange={handleFileUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>

                  {/* File List */}
                  {formData.uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-200">Selected Attachments:</span>
                      {formData.uploadedFiles.map((file, idx) => (
                        <div key={idx} className="flex items-center justify-between px-3 py-2 bg-[#0B132B] border border-[#2B3E50] rounded text-xs">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#4CC9F0]" />
                            <span className="font-medium text-white">{file.name}</span>
                            <span className="text-[#8D99AE]">({file.size})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="text-red-400 hover:text-red-300 font-bold px-1"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Summary Recap with Edit triggers */}
                  <div className="bg-[#0B132B] border border-[#2B3E50] rounded-md p-4 text-xs space-y-2">
                    <div className="flex items-center justify-between font-bold text-white pb-1.5 border-b border-[#2B3E50]">
                      <span>Quick Submission Audit</span>
                      <button 
                        type="button" 
                        onClick={() => setStep(1)} 
                        className="text-[#4CC9F0] hover:underline"
                      >
                        Edit Details
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-300">
                      <div><strong className="text-white">Contact:</strong> {formData.fullName} ({formData.companyName})</div>
                      <div><strong className="text-white">Email:</strong> {formData.businessEmail}</div>
                      <div><strong className="text-white">Industry:</strong> {formData.industry}</div>
                      <div><strong className="text-white">Processes:</strong> {formData.processes.join(', ') || 'Not specified'}</div>
                      <div><strong className="text-white">Alloy Grade:</strong> {formData.alloyGrade || 'Engineering default'}</div>
                      <div><strong className="text-white">Quantity:</strong> {formData.quantityFirstOrder} pcs</div>
                    </div>
                  </div>

                  {/* Legal and Compliance Checkboxes */}
                  <div className="space-y-2 pt-2 border-t border-[#2B3E50] text-xs">
                    <label className="flex items-start gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={formData.ndaRequested}
                        onChange={(e) => setFormData(p => ({ ...p, ndaRequested: e.target.checked }))}
                        className="rounded accent-[#3B82F6] mt-0.5"
                      />
                      <span>
                        <strong className="text-white">Request Mutual Non-Disclosure Agreement (NDA):</strong> Check this if your drawings contain proprietary patents or proprietary OEM geometry. MetalTek International will countersign prior to full CAD dissemination.
                      </span>
                    </label>

                    <label className="flex items-start gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={formData.consentAgreed}
                        onChange={(e) => setFormData(p => ({ ...p, consentAgreed: e.target.checked }))}
                        className="rounded accent-[#3B82F6] mt-0.5"
                      />
                      <span>
                        <span className="text-red-400">*</span> I agree to MetalTek International's corporate data privacy terms and authorize technical engineers to contact me regarding this proposal.
                      </span>
                    </label>
                    {errors.consentAgreed && <p className="text-red-400 text-xs">{errors.consentAgreed}</p>}
                  </div>
                </div>
              )}

              {/* Modal Action Controls */}
              <div className="mt-6 pt-4 border-t border-[#2B3E50] flex items-center justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white border border-[#2B3E50] rounded-md hover:bg-[#223055] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : (
                  <div />
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-6 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-bold rounded-md shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all cursor-pointer"
                  >
                    <span>Proceed to Next Step</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-2.5 bg-[#3B82F6] hover:bg-[#2563EB] text-white text-xs font-extrabold rounded-md shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all cursor-pointer"
                  >
                    <span>Transmit RFQ to Metallurgists</span>
                    <CheckCircle2 className="w-4 h-4 text-[#4CC9F0]" />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
