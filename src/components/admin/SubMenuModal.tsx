import React, { useState, useEffect } from 'react';
import { X, Layers, Plus, Check, AlertCircle } from 'lucide-react';
import { NavigationMenuItem, NavigationSubItem } from '../../context/AdminContext';

interface SubMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (menuId: string, subItem: NavigationSubItem, isEdit: boolean, originalSubItemId?: string) => void;
  menus: NavigationMenuItem[];
  initialMenuId?: string;
  initialSubItem?: NavigationSubItem | null;
}

export const SubMenuModal: React.FC<SubMenuModalProps> = ({
  isOpen,
  onClose,
  onSave,
  menus,
  initialMenuId,
  initialSubItem,
}) => {
  const [selectedMenuId, setSelectedMenuId] = useState<string>(initialMenuId || menus[0]?.id || 'casting');
  const [label, setLabel] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [routeView, setRouteView] = useState<NavigationSubItem['routeView']>('metal-casting');
  const [subSlug, setSubSlug] = useState('');
  const [subTab, setSubTab] = useState('');
  const [subSection, setSubSection] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialSubItem) {
      setSelectedMenuId(initialMenuId || menus[0]?.id || 'casting');
      setLabel(initialSubItem.label);
      setSlug(initialSubItem.slug);
      setDescription(initialSubItem.description || '');
      setRouteView(initialSubItem.routeView);
      setSubSlug(initialSubItem.subSlug || '');
      setSubTab(initialSubItem.subTab || '');
      setSubSection(initialSubItem.subSection || '');
      setAutoSlug(false);
    } else {
      setSelectedMenuId(initialMenuId || menus[0]?.id || 'casting');
      setLabel('');
      setSlug('');
      setDescription('');
      const targetMenu = menus.find(m => m.id === (initialMenuId || menus[0]?.id));
      setRouteView(targetMenu ? targetMenu.routeView : 'metal-casting');
      setSubSlug('');
      setSubTab('');
      setSubSection('');
      setAutoSlug(true);
    }
    setError(null);
  }, [initialSubItem, initialMenuId, isOpen, menus]);

  if (!isOpen) return null;

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setLabel(val);
    if (autoSlug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setSlug(generatedSlug);
      
      // Auto-assign sub-parameter depending on parent menu route
      if (routeView === 'metal-casting' || routeView === 'capabilities' || routeView === 'market-solutions') {
        setSubSlug(generatedSlug);
      } else if (routeView === 'resources') {
        setSubTab(generatedSlug);
      } else if (routeView === 'about-us') {
        setSubSection(generatedSlug);
      }
    }
  };

  const handleParentMenuChange = (menuId: string) => {
    setSelectedMenuId(menuId);
    const parent = menus.find(m => m.id === menuId);
    if (parent) {
      setRouteView(parent.routeView);
      if (slug) {
        if (parent.routeView === 'metal-casting' || parent.routeView === 'capabilities' || parent.routeView === 'market-solutions') {
          setSubSlug(slug);
          setSubTab('');
          setSubSection('');
        } else if (parent.routeView === 'resources') {
          setSubTab(slug);
          setSubSlug('');
          setSubSection('');
        } else if (parent.routeView === 'about-us') {
          setSubSection(slug);
          setSubSlug('');
          setSubTab('');
        }
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!label.trim()) {
      setError('Sub-menu title is required.');
      return;
    }
    if (!slug.trim()) {
      setError('Slug identifier is required.');
      return;
    }

    const subItemData: NavigationSubItem = {
      id: initialSubItem ? initialSubItem.id : slug.trim(),
      label: label.trim(),
      slug: slug.trim(),
      description: description.trim(),
      routeView,
      subSlug: subSlug.trim() || undefined,
      subTab: subTab.trim() || undefined,
      subSection: subSection.trim() || undefined,
    };

    onSave(selectedMenuId, subItemData, !!initialSubItem, initialSubItem?.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1B2D]/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-[8px] border border-[#D9DCE1] shadow-[0_8px_24px_rgba(15,27,45,.16)] overflow-hidden flex flex-col font-sans"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-[#0F1B2D] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[4px] bg-[#1D4ED8] flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">
                {initialSubItem ? 'Edit Sub-Menu Item' : 'Add New Sub-Menu Item'}
              </h2>
              <p className="text-xs text-slate-300">
                Mirrors immediately to the live website navbar & content directory
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

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-50 border-l-4 border-rose-500 rounded-[4px] text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {/* Parent Menu Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
              Parent Navigation Menu <span className="text-rose-500">*</span>
            </label>
            <select
              value={selectedMenuId}
              onChange={(e) => handleParentMenuChange(e.target.value)}
              disabled={!!initialSubItem}
              className="w-full px-3.5 py-2.5 bg-white border border-[#D9DCE1] rounded-[4px] text-sm text-[#1F2933] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent cursor-pointer disabled:bg-[#F3F4F6] disabled:cursor-not-allowed"
            >
              {menus.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label} ({m.subItems.length} sub-menus)
                </option>
              ))}
            </select>
            <p className="text-[11px] text-[#5B6470] mt-1">
              The top-level navbar section this sub-menu will appear under.
            </p>
          </div>

          {/* Sub-menu Label */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
              Sub-Menu Title / Label <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={label}
              onChange={handleLabelChange}
              placeholder="e.g. Centrifugal Casting, Technical Blog, etc."
              className="w-full px-3.5 py-2.5 bg-white border border-[#D9DCE1] rounded-[4px] text-sm text-[#1F2933] font-semibold focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
              autoFocus
            />
          </div>

          {/* Slug Identifier */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
                URL Slug / Identifier <span className="text-rose-500">*</span>
              </label>
              <button
                type="button"
                onClick={() => setAutoSlug(!autoSlug)}
                className={`text-[11px] font-semibold cursor-pointer ${
                  autoSlug ? 'text-[#1D4ED8]' : 'text-[#5B6470]'
                }`}
              >
                {autoSlug ? '✓ Auto-sync enabled' : 'Manual slug mode'}
              </button>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs text-[#5B6470] font-mono select-none">
                /
              </span>
              <input
                type="text"
                value={slug}
                onChange={(e) => {
                  setAutoSlug(false);
                  setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''));
                }}
                placeholder="slug-name"
                className="w-full pl-6 pr-3.5 py-2.5 bg-white border border-[#D9DCE1] rounded-[4px] text-sm text-[#1F2933] font-mono focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent"
              />
            </div>
            <p className="text-[11px] text-[#5B6470] mt-1 font-mono">
              Target path: <span className="text-[#1D4ED8]">/{routeView}{slug ? `?slug=${slug}` : ''}</span>
            </p>
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-1.5">
              Subtitle / Description
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief summary displayed in dropdown previews or hero descriptions..."
              className="w-full px-3.5 py-2 bg-white border border-[#D9DCE1] rounded-[4px] text-xs text-[#1F2933] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] focus:border-transparent resize-none"
            />
          </div>

          {/* Route Target Configuration */}
          <div className="bg-[#F3F4F6] p-3.5 rounded-[4px] border border-[#D9DCE1] space-y-3">
            <span className="block text-xs font-bold uppercase tracking-wider text-[#0F1B2D]">
              Routing Architecture
            </span>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-[#5B6470] mb-1">Target Page View</label>
                <input
                  type="text"
                  readOnly
                  value={routeView}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#D9DCE1] rounded-[4px] text-xs font-mono text-[#0F1B2D] select-all cursor-default"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#5B6470] mb-1">Sub-Parameter</label>
                <input
                  type="text"
                  value={subSlug || subTab || subSection || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (routeView === 'resources') setSubTab(val);
                    else if (routeView === 'about-us') setSubSection(val);
                    else setSubSlug(val);
                  }}
                  placeholder="e.g. centrifugal-casting"
                  className="w-full px-2.5 py-1.5 bg-white border border-[#D9DCE1] rounded-[4px] text-xs font-mono text-[#0F1B2D] focus:outline-none focus:ring-1 focus:ring-[#1D4ED8]"
                />
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="pt-4 border-t border-[#D9DCE1] flex items-center justify-end gap-3">
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
              <Check className="w-4 h-4" />
              <span>{initialSubItem ? 'Save Sub-Menu Changes' : 'Create Sub-Menu'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
