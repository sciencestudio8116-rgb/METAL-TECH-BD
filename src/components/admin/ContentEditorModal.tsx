import React, { useState, useEffect } from 'react';
import { 
  X, 
  Save, 
  FileText, 
  Image as ImageIcon, 
  FileDown, 
  Plus, 
  Trash2, 
  Sparkles, 
  Check, 
  AlertCircle,
  Eye,
  Edit3,
  ListPlus,
  Globe,
  Languages,
  Wand2
} from 'lucide-react';
import { ContentItem, NavigationMenuItem } from '../../context/AdminContext';
import { detectLanguage, translateBiDirectional } from '../../lib/translator';

interface ContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: ContentItem) => void;
  menus: NavigationMenuItem[];
  initialItem?: ContentItem | null;
  defaultMenuId?: string;
  defaultSubItemId?: string;
}

const PRESET_IMAGES = [
  { label: 'Centrifugal Casting', url: '/assets/aistudio/Centrifugal__casting__0584978e.png' },
  { label: 'Sand Casting', url: '/assets/aistudio/Metal_sand_casting_4d25d893.png' },
  { label: 'Investment Casting', url: '/assets/aistudio/Investment_casting__b923e0f0.png' },
  { label: 'High Integrity Ingot', url: '/assets/aistudio/High_integrity_ignot_089b6e6b.png' },
  { label: 'CNC Machining', url: '/assets/aistudio/Metal_machining_9dfa6c81.png' },
  { label: 'Testing Lab', url: '/assets/aistudio/Metal_testing_6ac21440.png' },
  { label: 'Heat Treatment', url: '/assets/aistudio/Metal_Heat_treatment__73e71848.png' },
  { label: 'Fabrication', url: '/assets/aistudio/Metal_fabrication_14c46be9.png' },
  { label: 'Pumps & Valves', url: '/assets/aistudio/pumps_and_valves__65955ac2.png' },
  { label: 'Marine & Vessel', url: '/assets/aistudio/ships_and_vessel__fb80a7a4.png' },
  { label: 'Locomotive', url: '/assets/aistudio/locomotive__bcd6c17c.png' },
  { label: 'Truck & Bus Brake', url: '/assets/aistudio/buss_and_truck_break_1e1168c0.png' },
  { label: 'Quality Standards', url: '/assets/aistudio/quality_standerd_and_certificate__b7a6ec92.png' },
  { label: 'Downloads Hub', url: '/assets/aistudio/downloads_bafb8c6c.png' },
  { label: 'Case Studies', url: '/assets/aistudio/case_studies_16f79833.png' },
  { label: 'FAQs Center', url: '/assets/aistudio/FAQs_fdca449a.png' },
];

export const ContentEditorModal: React.FC<ContentEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  menus,
  initialItem,
  defaultMenuId,
  defaultSubItemId,
}) => {
  const [menuId, setMenuId] = useState<string>(defaultMenuId || 'casting');
  const [subItemId, setSubItemId] = useState<string>(defaultSubItemId || 'centrifugal-casting');
  
  // Dual-Language Content Fields
  const [activeLangTab, setActiveLangTab] = useState<'en' | 'bn'>('en');
  const [titleEn, setTitleEn] = useState('');
  const [titleBn, setTitleBn] = useState('');
  const [subtitleEn, setSubtitleEn] = useState('');
  const [subtitleBn, setSubtitleBn] = useState('');
  const [eyebrowEn, setEyebrowEn] = useState('');
  const [eyebrowBn, setEyebrowBn] = useState('');
  const [bodyMdxEn, setBodyMdxEn] = useState('');
  const [bodyMdxBn, setBodyMdxBn] = useState('');

  // Media & Metadata
  const [imageUrl, setImageUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [pdfSize, setPdfSize] = useState('1.5 MB');
  const [specs, setSpecs] = useState<Array<{ key: string; value: string }>>([
    { key: 'Material Grade', value: 'ASTM A351 CF8M / 316 Stainless' },
    { key: 'Tensile Strength', value: '550 MPa min' },
    { key: 'NDT Standard', value: 'ASTM A609 Level 1 Ultrasonic' },
  ]);
  const [isPublished, setIsPublished] = useState(true);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [error, setError] = useState<string | null>(null);
  const [translationSuccess, setTranslationSuccess] = useState<string | null>(null);

  // Available sub-items based on selected menu
  const activeParentMenu = menus.find((m) => m.id === menuId) || menus[0];
  const availableSubItems = activeParentMenu?.subItems || [];

  // Detect dominant input language of active tab
  const currentTitle = activeLangTab === 'en' ? titleEn : titleBn;
  const currentBody = activeLangTab === 'en' ? bodyMdxEn : bodyMdxBn;
  const detectedInputLanguage = detectLanguage(currentTitle || currentBody);

  useEffect(() => {
    if (initialItem) {
      setMenuId(initialItem.menuId);
      setSubItemId(initialItem.subItemId);
      setTitleEn(initialItem.title || '');
      setTitleBn(initialItem.titleBn || translateBiDirectional(initialItem.title || '', 'bn'));
      setSubtitleEn(initialItem.subtitle || '');
      setSubtitleBn(initialItem.subtitleBn || (initialItem.subtitle ? translateBiDirectional(initialItem.subtitle, 'bn') : ''));
      setEyebrowEn(initialItem.eyebrow || '');
      setEyebrowBn(initialItem.eyebrowBn || (initialItem.eyebrow ? translateBiDirectional(initialItem.eyebrow, 'bn') : ''));
      setBodyMdxEn(initialItem.bodyMdx || '');
      setBodyMdxBn(initialItem.bodyMdxBn || translateBiDirectional(initialItem.bodyMdx || '', 'bn'));
      setImageUrl(initialItem.imageUrl || '');
      setPdfUrl(initialItem.pdfUrl || '');
      setPdfSize(initialItem.pdfSize || '1.5 MB');
      setSpecs(initialItem.specs && initialItem.specs.length > 0 ? initialItem.specs : [
        { key: 'Standard', value: 'ASTM / DIN / ASME' },
        { key: 'Tolerance', value: 'ISO 8062-3 DCTG 6' },
      ]);
      setIsPublished(initialItem.isPublished);
    } else {
      const initMenu = defaultMenuId || 'casting';
      const parent = menus.find((m) => m.id === initMenu) || menus[0];
      setMenuId(initMenu);
      setSubItemId(defaultSubItemId || parent?.subItems[0]?.id || 'centrifugal-casting');
      setTitleEn('');
      setTitleBn('');
      setSubtitleEn('');
      setSubtitleBn('');
      setEyebrowEn('ENGINEERED FOUNDRY SPECIFICATION');
      setEyebrowBn('ইঞ্জিনিয়ার্ড ফাউন্ড্রি স্পেসিফিকেশন');
      setBodyMdxEn(
        '### Engineering Overview\n\n' +
        'Precision engineered in our Dhaka foundry facilities using specialized metallurgical control. ' +
        'This component delivers exceptional directional solidification, dense micro-structure, and severe-service longevity.\n\n' +
        '#### Key Metallurgy Highlights\n' +
        '- In-house optical emission spectrometry\n' +
        '- Complete solution annealing and water quenching\n' +
        '- Certified to EN 10204 3.1 inspection'
      );
      setBodyMdxBn(
        '### ইঞ্জিনিয়ারিং সারসংক্ষেপ\n\n' +
        'বিশেষায়িত ধাতুবিদ্যা নিয়ন্ত্রণের মাধ্যমে আমাদের ঢাকা ফাউন্ড্রি কারখানায় নির্ভুলভাবে প্রকৌশলকৃত। ' +
        'এই যন্ত্রাংশটি চমৎকার দিকনির্দেশিত ঘনীভবন, ঘন অণুকাঠামো এবং দীর্ঘস্থায়ী স্থায়িত্ব প্রদান করে।\n\n' +
        '#### মূল ধাতুবিদ্যা বৈশিষ্ট্য\n' +
        '- ইন-হাউস অপটিক্যাল এমিশন স্পেকট্রোমেট্রি\n' +
        '- সম্পূর্ণ সলিউশন অ্যানিলিং এবং পানি শীতলীকরণ\n' +
        '- ইএন ১০২০৪ ৩.১ পরিদর্শন মানদণ্ডে প্রত্যয়িত'
      );
      setImageUrl('/assets/aistudio/Centrifugal__casting__0584978e.png');
      setPdfUrl('/assets/docs/metaltek_technical_datasheet.pdf');
      setPdfSize('1.8 MB');
      setSpecs([
        { key: 'Alloy System', value: 'Austenitic / Duplex Stainless' },
        { key: 'Max Diameter', value: '1,600 mm OD' },
        { key: 'Length Capacity', value: 'Up to 4,500 mm' },
        { key: 'Radiography / NDT', value: 'ASTM E446 / ASTM E186' },
      ]);
      setIsPublished(true);
    }
    setActiveTab('edit');
    setActiveLangTab('en');
    setError(null);
    setTranslationSuccess(null);
  }, [initialItem, defaultMenuId, defaultSubItemId, isOpen, menus]);

  if (!isOpen) return null;

  // Manual Trigger: Auto-Translate current tab to opposite language
  const handleAutoTranslate = () => {
    setError(null);
    if (activeLangTab === 'en') {
      // Translate English -> Bengali
      if (!titleEn.trim() && !bodyMdxEn.trim()) {
        setError('Please enter English text first before translating to Bengali.');
        return;
      }
      const newTitleBn = translateBiDirectional(titleEn, 'bn');
      const newSubtitleBn = translateBiDirectional(subtitleEn, 'bn');
      const newEyebrowBn = translateBiDirectional(eyebrowEn, 'bn');
      const newBodyBn = translateBiDirectional(bodyMdxEn, 'bn');
      setTitleBn(newTitleBn);
      setSubtitleBn(newSubtitleBn);
      setEyebrowBn(newEyebrowBn);
      setBodyMdxBn(newBodyBn);
      setActiveLangTab('bn');
      setTranslationSuccess('✨ Successfully translated to polished Bengali! Switched to [বাংলা] tab.');
    } else {
      // Translate Bengali -> English
      if (!titleBn.trim() && !bodyMdxBn.trim()) {
        setError('অনুবাদ করার পূর্বে অনুগ্রহ করে কিছু বাংলা টেক্সট লিখুন।');
        return;
      }
      const newTitleEn = translateBiDirectional(titleBn, 'en');
      const newSubtitleEn = translateBiDirectional(subtitleBn, 'en');
      const newEyebrowEn = translateBiDirectional(eyebrowBn, 'en');
      const newBodyEn = translateBiDirectional(bodyMdxBn, 'en');
      setTitleEn(newTitleEn);
      setSubtitleEn(newSubtitleEn);
      setEyebrowEn(newEyebrowEn);
      setBodyMdxEn(newBodyEn);
      setActiveLangTab('en');
      setTranslationSuccess('✨ Successfully translated to professional English! Switched to [English] tab.');
    }

    setTimeout(() => {
      setTranslationSuccess(null);
    }, 4500);
  };

  const handleAddSpecRow = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
    const updated = [...specs];
    updated[index][field] = value;
    setSpecs(updated);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure at least one language title is provided
    const finalTitleEn = titleEn.trim() || (titleBn.trim() ? translateBiDirectional(titleBn, 'en') : '');
    const finalTitleBn = titleBn.trim() || (titleEn.trim() ? translateBiDirectional(titleEn, 'bn') : '');

    if (!finalTitleEn && !finalTitleBn) {
      setError('Article / Component Title is required in either English or Bengali.');
      return;
    }

    const finalSubtitleEn = subtitleEn.trim() || (subtitleBn.trim() ? translateBiDirectional(subtitleBn, 'en') : '');
    const finalSubtitleBn = subtitleBn.trim() || (subtitleEn.trim() ? translateBiDirectional(subtitleEn, 'bn') : '');

    const finalEyebrowEn = eyebrowEn.trim() || (eyebrowBn.trim() ? translateBiDirectional(eyebrowBn, 'en') : '');
    const finalEyebrowBn = eyebrowBn.trim() || (eyebrowEn.trim() ? translateBiDirectional(eyebrowEn, 'bn') : '');

    const finalBodyEn = bodyMdxEn.trim() || (bodyMdxBn.trim() ? translateBiDirectional(bodyMdxBn, 'en') : '');
    const finalBodyBn = bodyMdxBn.trim() || (bodyMdxEn.trim() ? translateBiDirectional(bodyMdxEn, 'bn') : '');

    const item: ContentItem = {
      id: initialItem ? initialItem.id : `content-${Date.now()}`,
      menuId,
      subItemId,
      title: finalTitleEn,
      titleBn: finalTitleBn,
      subtitle: finalSubtitleEn,
      subtitleBn: finalSubtitleBn,
      eyebrow: finalEyebrowEn,
      eyebrowBn: finalEyebrowBn,
      bodyMdx: finalBodyEn,
      bodyMdxBn: finalBodyBn,
      imageUrl: imageUrl.trim(),
      pdfUrl: pdfUrl.trim(),
      pdfSize: pdfSize.trim(),
      specs: specs.filter((s) => s.key.trim() && s.value.trim()),
      isPublished,
      updatedAt: new Date().toISOString().substring(0, 10),
    };

    onSave(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0F1B2D]/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-[8px] border border-[#D9DCE1] shadow-[0_8px_24px_rgba(15,27,45,.16)] overflow-hidden flex flex-col max-h-[92vh] font-sans"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#0F1B2D] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[4px] bg-[#1D4ED8] flex items-center justify-center text-white">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                {initialItem ? 'Edit Component / Article Content' : 'Create New Content / Specification'}
              </h2>
              <p className="text-xs text-slate-300">
                Bi-Directional English & বাংলা Input, Automatic AI Translation & Formatting Preservation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-[4px] hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          {error && (
            <div className="p-3 bg-rose-50 border-l-4 border-rose-500 rounded-[4px] text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {translationSuccess && (
            <div className="p-3 bg-emerald-50 border-l-4 border-emerald-500 rounded-[4px] text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in duration-200">
              <Sparkles className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{translationSuccess}</span>
            </div>
          )}

          {/* Hierarchy Placement & Publication Toggle */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-[#F3F4F6] p-4 rounded-[6px] border border-[#D9DCE1]">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
                Parent Navigation Menu
              </label>
              <select
                value={menuId}
                onChange={(e) => {
                  const newMenuId = e.target.value;
                  setMenuId(newMenuId);
                  const parent = menus.find((m) => m.id === newMenuId);
                  if (parent && parent.subItems.length > 0) {
                    setSubItemId(parent.subItems[0].id);
                  }
                }}
                className="w-full px-3 py-2 bg-white border border-[#D9DCE1] rounded-[4px] text-xs font-semibold text-[#1F2933] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
              >
                {menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
                Target Sub-Menu Section
              </label>
              <select
                value={subItemId}
                onChange={(e) => setSubItemId(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#D9DCE1] rounded-[4px] text-xs font-semibold text-[#1F2933] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
              >
                {availableSubItems.map((sub) => (
                  <option key={sub.id} value={sub.id}>
                    {sub.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
                Publication Status
              </label>
              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setIsPublished(!isPublished)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                    isPublished ? 'bg-[#1D4ED8]' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isPublished ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <span className={`text-xs font-bold ${isPublished ? 'text-[#1D4ED8]' : 'text-[#5B6470]'}`}>
                  {isPublished ? '● Live Published' : '○ Draft Staged'}
                </span>
              </div>
            </div>
          </div>

          {/* DUAL-LANGUAGE WORKSPACE BAR */}
          <div className="bg-gradient-to-r from-slate-900 to-[#101F3B] p-3.5 rounded-[6px] border border-slate-700 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4CC9F0] flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-[#3B82F6]" />
                Language Workspace:
              </span>
              
              {/* Language Tabs */}
              <div className="inline-flex rounded-md p-1 bg-slate-800/80 border border-slate-700">
                <button
                  type="button"
                  onClick={() => setActiveLangTab('en')}
                  className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeLangTab === 'en'
                      ? 'bg-[#1D4ED8] text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  <span>English (EN)</span>
                  {titleEn && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveLangTab('bn')}
                  className={`px-3 py-1 rounded text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeLangTab === 'bn'
                      ? 'bg-[#1D4ED8] text-white shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
                  }`}
                >
                  <span>বাংলা (BN)</span>
                  {titleBn && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                </button>
              </div>

              {/* Detected Language Tag */}
              <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                Input: {detectedInputLanguage === 'bn' ? 'বাংলা' : 'English'}
              </span>
            </div>

            {/* AUTO-TRANSLATE ONE-CLICK ACTION */}
            <button
              type="button"
              onClick={handleAutoTranslate}
              className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold rounded-[4px] shadow-sm flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              title="Automatically translate title, subtitle, eyebrow and markdown body between English and Bengali"
            >
              <Wand2 className="w-3.5 h-3.5" />
              <span>
                {activeLangTab === 'en'
                  ? '✨ Auto-Translate to বাংলা'
                  : '✨ Auto-Translate to English'}
              </span>
            </button>
          </div>

          {/* Titles & Eyebrows (Dynamically Switched By Language Tab) */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5 flex items-center justify-between">
                  <span>
                    {activeLangTab === 'en' ? 'Article / Component Title (English)' : 'আর্টিকেল / যন্ত্রাংশের শিরোনাম (বাংলা)'}{' '}
                    <span className="text-rose-500">*</span>
                  </span>
                  <span className="text-[10px] font-normal text-slate-400">
                    {activeLangTab === 'en' ? 'EN' : 'BN'}
                  </span>
                </label>
                <input
                  type="text"
                  value={activeLangTab === 'en' ? titleEn : titleBn}
                  onChange={(e) => {
                    if (activeLangTab === 'en') {
                      setTitleEn(e.target.value);
                    } else {
                      setTitleBn(e.target.value);
                    }
                  }}
                  placeholder={
                    activeLangTab === 'en'
                      ? 'e.g. Centrifugal Cast High-Temperature Radiant Tubes'
                      : 'যেমন: সেন্ট্রিফিউগাল কাস্ট উচ্চ-তাপমাত্রা রেডিয়ান্ট টিউব'
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9DCE1] rounded-[4px] text-sm text-[#0F1B2D] font-bold focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
                  {activeLangTab === 'en' ? 'Eyebrow / Tag' : 'ট্যাগ / ক্যাটাগরি'}
                </label>
                <input
                  type="text"
                  value={activeLangTab === 'en' ? eyebrowEn : eyebrowBn}
                  onChange={(e) => {
                    if (activeLangTab === 'en') {
                      setEyebrowEn(e.target.value);
                    } else {
                      setEyebrowBn(e.target.value);
                    }
                  }}
                  placeholder={
                    activeLangTab === 'en'
                      ? 'e.g. DIRECTIONAL SOLIDIFICATION'
                      : 'যেমন: দিকনির্দেশিত ঘনীভবন'
                  }
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9DCE1] rounded-[4px] text-xs font-bold text-[#F5B800] uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
                {activeLangTab === 'en' ? 'Sub-Heading / Lead Summary' : 'সাব-হেডিং / সারসংক্ষেপ'}
              </label>
              <input
                type="text"
                value={activeLangTab === 'en' ? subtitleEn : subtitleBn}
                onChange={(e) => {
                  if (activeLangTab === 'en') {
                    setSubtitleEn(e.target.value);
                  } else {
                    setSubtitleBn(e.target.value);
                  }
                }}
                placeholder={
                  activeLangTab === 'en'
                    ? 'High-integrity net-shape alloy castings with micro-defect elimination...'
                    : 'পেট্রোকেমিক্যাল ফার্নেসের জন্য উচ্চ-নির্ভরযোগ্য অ্যালয় কাস্টিং...'
                }
                className="w-full px-3.5 py-2 bg-white border border-[#D9DCE1] rounded-[4px] text-xs text-[#1F2933] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
              />
            </div>
          </div>

          {/* Media Attachments: Image & PDF */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded-[6px] border border-[#D9DCE1]">
            {/* Image section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-1.5">
                  <ImageIcon className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  <span>Featured Image URL</span>
                </label>
                <span className="text-[10px] text-[#5B6470]">Preset selector below</span>
              </div>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="/assets/aistudio/... or https://"
                className="w-full px-3 py-2 bg-white border border-[#D9DCE1] rounded-[4px] text-xs font-mono text-[#1F2933] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
              />

              {/* Quick Presets dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-[#5B6470] font-semibold">Presets:</span>
                <select
                  onChange={(e) => {
                    if (e.target.value) setImageUrl(e.target.value);
                  }}
                  className="flex-1 text-[11px] px-2 py-1 bg-[#F3F4F6] border border-[#D9DCE1] rounded-[4px] text-[#1F2933] cursor-pointer"
                >
                  <option value="">Select Foundry Asset...</option>
                  {PRESET_IMAGES.map((p) => (
                    <option key={p.label} value={p.url}>
                      {p.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* PDF attachment section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-1.5">
                  <FileDown className="w-3.5 h-3.5 text-rose-600" />
                  <span>Engineering Datasheet (PDF)</span>
                </label>
                <span className="text-[10px] text-[#5B6470]">Optional download</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pdfUrl}
                  onChange={(e) => setPdfUrl(e.target.value)}
                  placeholder="/downloads/technical_spec.pdf"
                  className="flex-1 px-3 py-2 bg-white border border-[#D9DCE1] rounded-[4px] text-xs font-mono text-[#1F2933] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                />
                <input
                  type="text"
                  value={pdfSize}
                  onChange={(e) => setPdfSize(e.target.value)}
                  placeholder="1.5 MB"
                  className="w-20 px-2 py-2 bg-white border border-[#D9DCE1] rounded-[4px] text-xs text-center font-mono text-[#1F2933] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                />
              </div>
              <p className="text-[11px] text-[#5B6470] m-0">
                Allows prospective engineering buyers to download formal CAD and technical data sheets.
              </p>
            </div>
          </div>

          {/* Dynamic Technical Specs Grid */}
          <div className="space-y-3 bg-[#F3F4F6] p-4 rounded-[6px] border border-[#D9DCE1]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] m-0">
                  Engineering Specifications & Tolerances
                </h3>
                <p className="text-[11px] text-[#5B6470] m-0">
                  Key parameters displayed in the specifications table
                </p>
              </div>
              <button
                type="button"
                onClick={handleAddSpecRow}
                className="px-2.5 py-1 bg-white border border-[#D9DCE1] hover:bg-slate-100 text-[#0F1B2D] text-xs font-semibold rounded-[4px] flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Add Row</span>
              </button>
            </div>

            <div className="space-y-2">
              {specs.map((spec, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={spec.key}
                    onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                    placeholder="Parameter (e.g. Tensile Strength)"
                    className="w-1/2 px-3 py-1.5 bg-white border border-[#D9DCE1] rounded-[4px] text-xs font-semibold text-[#0F1B2D] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8]"
                  />
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                    placeholder="Specification value (e.g. 550 MPa)"
                    className="flex-1 px-3 py-1.5 bg-white border border-[#D9DCE1] rounded-[4px] text-xs font-mono text-[#1D4ED8] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8]"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(index)}
                    className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-[4px] cursor-pointer"
                    title="Remove specification"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Article MDX Body with Preview & Markdown Support */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-[#D9DCE1] pb-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('edit')}
                  className={`px-3 py-1 rounded-[4px] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'edit'
                      ? 'bg-[#1D4ED8] text-white'
                      : 'text-[#5B6470] hover:text-[#0F1B2D] hover:bg-[#F3F4F6]'
                  }`}
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>
                    {activeLangTab === 'en' ? 'Markdown Editor (English)' : 'মার্কডাউন এডিটর (বাংলা)'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-[4px] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    activeTab === 'preview'
                      ? 'bg-[#1D4ED8] text-white'
                      : 'text-[#5B6470] hover:text-[#0F1B2D] hover:bg-[#F3F4F6]'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Rendered Preview</span>
                </button>
              </div>
              <span className="text-[11px] text-[#5B6470]">
                Preserves headings, bullet points, numbers & HTML
              </span>
            </div>

            {activeTab === 'edit' ? (
              <textarea
                rows={9}
                value={activeLangTab === 'en' ? bodyMdxEn : bodyMdxBn}
                onChange={(e) => {
                  if (activeLangTab === 'en') {
                    setBodyMdxEn(e.target.value);
                  } else {
                    setBodyMdxBn(e.target.value);
                  }
                }}
                placeholder={
                  activeLangTab === 'en'
                    ? 'Write article overview, metallurgical analysis, chemical compositions, and foundry guarantees...'
                    : 'আর্টিকেলের সারসংক্ষেপ, ধাতুবিদ্যা বিশ্লেষণ, রাসায়নিক সংযুক্তি ও ফাউন্ড্রি গ্যারান্টি লিখুন...'
                }
                className="w-full px-3.5 py-2.5 bg-white border border-[#D9DCE1] rounded-[4px] text-xs text-[#1F2933] font-mono focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] leading-relaxed resize-y"
              />
            ) : (
              <div className="p-4 bg-[#F3F4F6] rounded-[4px] border border-[#D9DCE1] prose prose-sm max-w-none text-xs text-[#1F2933] leading-relaxed max-h-64 overflow-y-auto whitespace-pre-line">
                {(activeLangTab === 'en' ? bodyMdxEn : bodyMdxBn) || 'No content written yet in this language.'}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#D9DCE1] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs text-[#5B6470]">
              Dual-language content is automatically generated and synchronized for the user panel
            </span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#D9DCE1] rounded-[4px] text-xs font-semibold text-[#5B6470] hover:text-[#0F1B2D] hover:bg-[#F3F4F6] transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-[4px] shadow-[0_2px_8px_rgba(15,27,45,.08)] transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-3 focus-visible:outline-[#F5B800] flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Dual-Language Content</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
