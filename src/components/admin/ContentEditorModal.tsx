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
  ListPlus
} from 'lucide-react';
import { ContentItem, NavigationMenuItem } from '../../context/AdminContext';

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
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [eyebrow, setEyebrow] = useState('');
  const [bodyMdx, setBodyMdx] = useState('');
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

  // Available sub-items based on selected menu
  const activeParentMenu = menus.find((m) => m.id === menuId) || menus[0];
  const availableSubItems = activeParentMenu?.subItems || [];

  useEffect(() => {
    if (initialItem) {
      setMenuId(initialItem.menuId);
      setSubItemId(initialItem.subItemId);
      setTitle(initialItem.title);
      setSubtitle(initialItem.subtitle || '');
      setEyebrow(initialItem.eyebrow || '');
      setBodyMdx(initialItem.bodyMdx);
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
      setTitle('');
      setSubtitle('');
      setEyebrow('ENGINEERED FOUNDRY SPECIFICATION');
      setBodyMdx(
        '### Engineering Overview\n\n' +
        'Precision engineered in our Dhaka foundry facilities using specialized metallurgical control. ' +
        'This component delivers exceptional directional solidification, dense micro-structure, and severe-service longevity.\n\n' +
        '#### Key Metallurgy Highlights\n' +
        '- In-house optical emission spectrometry\n' +
        '- Complete solution annealing and water quenching\n' +
        '- Certified to EN 10204 3.1 inspection'
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
    setError(null);
  }, [initialItem, defaultMenuId, defaultSubItemId, isOpen, menus]);

  if (!isOpen) return null;

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

  const handleLoadPresetSpecs = (type: 'foundry' | 'ndt' | 'tolerance') => {
    if (type === 'foundry') {
      setSpecs([
        { key: 'Alloy Grade', value: 'CF8M / 316 Stainless / Inconel 625' },
        { key: 'Melting Process', value: 'Induction Furnace (Medium Frequency)' },
        { key: 'Max Pouring Weight', value: '15,000 kg (15 Metric Tons)' },
        { key: 'Solidification', value: 'Computer-Simulated MagmaSoft modeling' },
      ]);
    } else if (type === 'ndt') {
      setSpecs([
        { key: 'Ultrasonic Testing (UT)', value: 'ASTM A609 Level 1 / ISO 4992-1' },
        { key: 'Dye Penetrant (PT)', value: 'ASTM E165 / ASME Section V' },
        { key: 'Magnetic Particle (MT)', value: 'ASTM E709 / EN 1369' },
        { key: 'Material Cert', value: 'EN 10204 Type 3.1 & 3.2' },
      ]);
    } else {
      setSpecs([
        { key: 'Machining Tolerance', value: '± 0.012 mm (CNC 5-Axis)' },
        { key: 'Surface Finish', value: 'Ra 0.8 µm - 1.6 µm' },
        { key: 'Balancing', value: 'ISO 1940 Grade G2.5 Dynamic' },
        { key: 'Pressure Test', value: 'Hydrostatic up to 15,000 PSI' },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Article / Component Title is required.');
      return;
    }

    const item: ContentItem = {
      id: initialItem ? initialItem.id : `content-${Date.now()}`,
      menuId,
      subItemId,
      title: title.trim(),
      subtitle: subtitle.trim(),
      eyebrow: eyebrow.trim(),
      bodyMdx,
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
                Foundry Article, Engineering Specs, Media Attachments & MDX Body
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
                {menus.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
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

          {/* Titles & Eyebrows */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
                  Component / Article Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Centrifugal Cast High-Temperature Radiant Tubes"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9DCE1] rounded-[4px] text-sm text-[#0F1B2D] font-bold focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
                  Eyebrow / Category Tag
                </label>
                <input
                  type="text"
                  value={eyebrow}
                  onChange={(e) => setEyebrow(e.target.value)}
                  placeholder="e.g. DIRECTIONAL SOLIDIFICATION"
                  className="w-full px-3.5 py-2.5 bg-white border border-[#D9DCE1] rounded-[4px] text-xs font-bold text-[#F5B800] uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
                Sub-Heading / Lead Summary
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="High-integrity net-shape alloy castings with micro-defect elimination for petrochemical furnaces..."
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

              {/* Live Preview */}
              {imageUrl && (
                <div className="relative h-28 bg-slate-900 rounded-[4px] overflow-hidden border border-[#D9DCE1] flex items-center justify-center">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Document / PDF attachment */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-1.5">
                  <FileDown className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  <span>PDF / Technical Datasheet Attachment</span>
                </label>
                <span className="text-[10px] text-[#5B6470]">Brochure or QA Cert</span>
              </div>
              <input
                type="text"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                placeholder="/assets/docs/... or https://..."
                className="w-full px-3 py-2 bg-white border border-[#D9DCE1] rounded-[4px] text-xs font-mono text-[#1F2933] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
              />

              <div>
                <label className="block text-[11px] font-bold text-[#5B6470] mb-1">
                  File Size Badge (e.g. 1.8 MB, 3.2 MB)
                </label>
                <input
                  type="text"
                  value={pdfSize}
                  onChange={(e) => setPdfSize(e.target.value)}
                  placeholder="2.4 MB"
                  className="w-full px-3 py-1.5 bg-white border border-[#D9DCE1] rounded-[4px] text-xs font-mono text-[#1F2933] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
                />
              </div>

              <div className="p-2.5 bg-[#F3F4F6] rounded-[4px] border border-[#D9DCE1] text-[11px] text-[#5B6470] flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-[10px]">
                  PDF
                </div>
                <div className="truncate flex-1">
                  <span className="font-semibold text-[#0F1B2D]">Live Attachment:</span>{' '}
                  <span className="font-mono">{pdfUrl || 'No file linked'}</span> ({pdfSize})
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Key-Value Specifications Table */}
          <div className="bg-white p-4 rounded-[6px] border border-[#D9DCE1] space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-[#D9DCE1]">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] flex items-center gap-1.5">
                  <ListPlus className="w-3.5 h-3.5 text-[#1D4ED8]" />
                  <span>Foundry Engineering & Chemical Specifications Table</span>
                </h3>
                <p className="text-[11px] text-[#5B6470]">
                  Dynamic key-value pairs rendered in product cards and technical sheets
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleLoadPresetSpecs('foundry')}
                  className="px-2 py-1 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#0F1B2D] text-[11px] font-semibold rounded-[4px] transition-colors cursor-pointer"
                >
                  + Foundry Presets
                </button>
                <button
                  type="button"
                  onClick={() => handleLoadPresetSpecs('ndt')}
                  className="px-2 py-1 bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#0F1B2D] text-[11px] font-semibold rounded-[4px] transition-colors cursor-pointer"
                >
                  + NDT QA Presets
                </button>
                <button
                  type="button"
                  onClick={handleAddSpecRow}
                  className="px-2.5 py-1 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-[11px] font-bold rounded-[4px] flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Spec Row</span>
                </button>
              </div>
            </div>

            {specs.length === 0 ? (
              <div className="p-4 text-center text-xs text-[#5B6470] bg-[#F3F4F6] rounded-[4px]">
                No specifications added yet. Click &quot;Add Spec Row&quot; or choose a preset above.
              </div>
            ) : (
              <div className="space-y-2">
                {specs.map((spec, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={spec.key}
                      onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                      placeholder="e.g. Tensile Strength"
                      className="w-1/3 px-3 py-1.5 bg-white border border-[#D9DCE1] rounded-[4px] text-xs font-semibold text-[#0F1B2D] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8]"
                    />
                    <input
                      type="text"
                      value={spec.value}
                      onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                      placeholder="e.g. 580 MPa min / ASTM A609 Level 1"
                      className="flex-1 px-3 py-1.5 bg-white border border-[#D9DCE1] rounded-[4px] text-xs text-[#1F2933] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8]"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSpec(index)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-[4px] hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete row"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Markdown / Rich Text Body Editor */}
          <div className="bg-white p-4 rounded-[6px] border border-[#D9DCE1] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#D9DCE1]">
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
                  <span>Markdown Editor</span>
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
              <span className="text-[11px] text-[#5B6470]">Supports headings, bullet points, and code</span>
            </div>

            {activeTab === 'edit' ? (
              <textarea
                rows={9}
                value={bodyMdx}
                onChange={(e) => setBodyMdx(e.target.value)}
                placeholder="Write article overview, metallurgical analysis, chemical compositions, and foundry guarantees..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#D9DCE1] rounded-[4px] text-xs text-[#1F2933] font-mono focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] leading-relaxed resize-y"
              />
            ) : (
              <div className="p-4 bg-[#F3F4F6] rounded-[4px] border border-[#D9DCE1] prose prose-sm max-w-none text-xs text-[#1F2933] leading-relaxed max-h-64 overflow-y-auto whitespace-pre-line">
                {bodyMdx || 'No content written yet.'}
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#D9DCE1] flex items-center justify-between">
            <span className="text-xs text-[#5B6470]">
              All changes persist instantly in localStorage and live frontend views
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
                <span>Save Component / Article</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
