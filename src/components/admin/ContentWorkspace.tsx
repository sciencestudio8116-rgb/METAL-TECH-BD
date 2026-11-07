import React, { useState } from 'react';
import {
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  FileText,
  Image as ImageIcon,
  FileDown,
  Layers,
  CheckCircle2,
  AlertCircle,
  Eye,
  SlidersHorizontal,
  Check,
  X
} from 'lucide-react';
import { ContentItem, NavigationMenuItem, NavigationSubItem } from '../../context/AdminContext';
import { useLanguage } from '../../context/LanguageContext';
import { PageRoute } from '../../types/navigation';

interface ContentWorkspaceProps {
  parentMenu: NavigationMenuItem;
  subItem: NavigationSubItem;
  contentItems: ContentItem[];
  onOpenCreateContent: () => void;
  onOpenEditContent: (item: ContentItem) => void;
  onDeleteContent: (id: string) => void;
  onTogglePublish: (item: ContentItem) => void;
  onOpenEditSubMenu: (menuId: string, subItem: NavigationSubItem) => void;
  onNavigateLive: (route: PageRoute) => void;
}

export const ContentWorkspace: React.FC<ContentWorkspaceProps> = ({
  parentMenu,
  subItem,
  contentItems,
  onOpenCreateContent,
  onOpenEditContent,
  onDeleteContent,
  onTogglePublish,
  onOpenEditSubMenu,
  onNavigateLive,
}) => {
  const { isBn, t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [selectedItemForPreview, setSelectedItemForPreview] = useState<ContentItem | null>(null);

  // Filter content items for this specific menu and sub-menu
  const items = contentItems.filter(
    (item) => item.menuId === parentMenu.id && item.subItemId === subItem.id
  );

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subtitle && item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.eyebrow && item.eyebrow.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.specs.some(
        (s) =>
          s.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.value.toLowerCase().includes(searchTerm.toLowerCase())
      );

    const matchesStatus =
      statusFilter === 'all'
        ? true
        : statusFilter === 'published'
        ? item.isPublished
        : !item.isPublished;

    return matchesSearch && matchesStatus;
  });

  const handleLivePreview = () => {
    onNavigateLive({
      view: subItem.routeView,
      subSlug: subItem.subSlug,
      subTab: subItem.subTab,
      subSection: subItem.subSection,
    } as any);
  };

  const localizedSubLabel = isBn && t.header.subMenus[subItem.id] ? t.header.subMenus[subItem.id] : subItem.label;
  const localizedParentLabel = isBn && (t.header.menus as any)[parentMenu.id] ? (t.header.menus as any)[parentMenu.id] : parentMenu.label;

  return (
    <div className="space-y-6 font-sans">
      {/* 1. Sub-Menu Header Banner Card */}
      <div className="bg-white rounded-[8px] border border-[#D9DCE1] shadow-[0_2px_8px_rgba(15,27,45,.08)] p-6 transition-all">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            {/* Breadcrumb & Eyebrow */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-semibold text-[#5B6470]">{localizedParentLabel}</span>
              <span className="text-slate-300">/</span>
              <span className="font-bold text-[#1D4ED8]">{localizedSubLabel}</span>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#F5B800]/15 text-[#B45309] font-bold text-[10px] tracking-wider uppercase">
                {subItem.slug}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-[#0F1B2D] tracking-tight">
              {localizedSubLabel}
            </h1>

            <p className="text-sm text-[#5B6470] leading-relaxed">
              {subItem.description ||
                (isBn
                  ? `${localizedSubLabel}-এর অধীন সমস্ত শিল্প আর্টিকেল, ইঞ্জিনিয়ারিং স্পেসিফিকেশন ও মিডিয়া ডেটা পরিচালনা করুন।`
                  : `Manage all industrial articles, engineering specs, media assets, and data sheets configured under ${subItem.label}.`)}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={handleLivePreview}
              className="px-3 py-2 bg-white hover:bg-[#F3F4F6] border border-[#1D4ED8] text-[#1D4ED8] hover:text-[#163A9E] text-xs font-bold rounded-[4px] shadow-xs flex items-center gap-1.5 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              title="Preview sub-menu page on the live website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{isBn ? 'লাইভ প্রিভিউ দেখুন' : 'Preview Live Page'}</span>
            </button>

            <button
              onClick={() => onOpenEditSubMenu(parentMenu.id, subItem)}
              className="px-3 py-2 bg-[#F3F4F6] hover:bg-[#E5E7EB] border border-[#D9DCE1] text-[#0F1B2D] text-xs font-semibold rounded-[4px] flex items-center gap-1.5 transition-all cursor-pointer"
              title="Edit sub-menu title, slug, and description"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{isBn ? 'সাব-মেনু সম্পাদনা' : 'Edit Sub-Menu'}</span>
            </button>

            <button
              onClick={onOpenCreateContent}
              className="px-4 py-2 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-[4px] shadow-[0_2px_8px_rgba(15,27,45,.08)] flex items-center gap-1.5 transition-all hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-3 focus-visible:outline-[#F5B800] cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{isBn ? '+ নতুন কনটেন্ট / স্পেক্স যোগ করুন' : 'Add New Content / Spec'}</span>
            </button>
          </div>
        </div>

        {/* Quick Metadata Bar */}
        <div className="mt-5 pt-4 border-t border-[#D9DCE1] flex flex-wrap items-center justify-between text-xs text-[#5B6470] gap-4">
          <div className="flex items-center gap-4">
            <div>
              <span className="font-semibold text-[#0F1B2D]">Total Items:</span>{' '}
              <span className="font-mono font-bold text-[#1D4ED8]">{items.length}</span>
            </div>
            <div>
              <span className="font-semibold text-[#0F1B2D]">Live Published:</span>{' '}
              <span className="font-mono text-emerald-600 font-bold">
                {items.filter((i) => i.isPublished).length}
              </span>
            </div>
            <div>
              <span className="font-semibold text-[#0F1B2D]">Drafts:</span>{' '}
              <span className="font-mono text-amber-600 font-bold">
                {items.filter((i) => !i.isPublished).length}
              </span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-500">
            Route: <span className="text-[#0F1B2D] font-bold">/{subItem.routeView}</span>
            {subItem.subSlug && `?slug=${subItem.subSlug}`}
            {subItem.subTab && `?tab=${subItem.subTab}`}
            {subItem.subSection && `?section=${subItem.subSection}`}
          </div>
        </div>
      </div>

      {/* 2. Content Filters & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-[8px] border border-[#D9DCE1] shadow-xs">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#5B6470] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search titles, specs, alloys..."
            className="w-full pl-9 pr-3 py-1.5 bg-[#F3F4F6] border border-[#D9DCE1] rounded-[4px] text-xs text-[#1F2933] focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <span className="text-xs text-[#5B6470] font-semibold flex items-center gap-1">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Status:</span>
          </span>
          <div className="flex items-center bg-[#F3F4F6] p-0.5 rounded-[4px] border border-[#D9DCE1] text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1 rounded-[3px] font-semibold transition-colors cursor-pointer ${
                statusFilter === 'all' ? 'bg-white text-[#1D4ED8] shadow-xs font-bold' : 'text-[#5B6470]'
              }`}
            >
              All ({items.length})
            </button>
            <button
              onClick={() => setStatusFilter('published')}
              className={`px-2.5 py-1 rounded-[3px] font-semibold transition-colors cursor-pointer ${
                statusFilter === 'published' ? 'bg-white text-emerald-700 shadow-xs font-bold' : 'text-[#5B6470]'
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setStatusFilter('draft')}
              className={`px-2.5 py-1 rounded-[3px] font-semibold transition-colors cursor-pointer ${
                statusFilter === 'draft' ? 'bg-white text-amber-700 shadow-xs font-bold' : 'text-[#5B6470]'
              }`}
            >
              Drafts
            </button>
          </div>
        </div>
      </div>

      {/* 3. Content Items List / Table */}
      {filteredItems.length === 0 ? (
        <div className="bg-white rounded-[8px] border border-[#D9DCE1] p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#F3F4F6] border border-[#D9DCE1] flex items-center justify-center mx-auto text-[#1D4ED8]">
            <FileText className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#0F1B2D]">
              {searchTerm ? 'No content matching your search' : `No content items yet for ${subItem.label}`}
            </h3>
            <p className="text-xs text-[#5B6470] max-w-md mx-auto">
              Create your first foundry article, component technical specifications table, or engineering datasheet.
            </p>
          </div>
          <button
            onClick={onOpenCreateContent}
            className="px-4 py-2 bg-[#1D4ED8] hover:bg-[#163A9E] text-white text-xs font-bold rounded-[4px] shadow-xs inline-flex items-center gap-1.5 transition-all hover:-translate-y-0.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create First Component Article</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[8px] border border-[#D9DCE1] shadow-[0_2px_8px_rgba(15,27,45,.08)] hover:shadow-[0_8px_24px_rgba(15,27,45,.16)] transition-all overflow-hidden p-5 flex flex-col md:flex-row items-start gap-5"
            >
              {/* Media Thumbnail */}
              {item.imageUrl && (
                <div className="w-full md:w-44 h-32 bg-[#0F1B2D] rounded-[4px] overflow-hidden border border-[#D9DCE1] shrink-0 flex items-center justify-center relative">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 bg-black/70 text-white text-[10px] rounded font-mono">
                    HD
                  </span>
                </div>
              )}

              {/* Information Body */}
              <div className="flex-1 space-y-2 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {item.eyebrow && (
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5B800]">
                        {item.eyebrow}
                      </span>
                    )}
                    <span className="text-slate-300">·</span>
                    <span className="text-[11px] font-mono text-[#5B6470]">
                      Updated: {item.updatedAt}
                    </span>
                  </div>

                  {/* Status Toggle Switch */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onTogglePublish(item)}
                      className={`px-2.5 py-1 rounded-[4px] text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                        item.isPublished
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                          : 'bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100'
                      }`}
                      title="Click to toggle publish status"
                    >
                      {item.isPublished ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Published</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 text-amber-600" />
                          <span>Draft</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <h2 className="text-base font-bold text-[#0F1B2D] hover:text-[#1D4ED8] transition-colors leading-snug">
                  {isBn ? (item.titleBn || item.title) : item.title}
                </h2>

                {(item.subtitle || item.subtitleBn) && (
                  <p className="text-xs text-[#5B6470] line-clamp-2 leading-relaxed">
                    {isBn ? (item.subtitleBn || item.subtitle) : (item.subtitle || item.subtitleBn)}
                  </p>
                )}

                {/* Engineering Specifications Badges */}
                {item.specs && item.specs.length > 0 && (
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {item.specs.slice(0, 4).map((spec, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#F3F4F6] border border-[#D9DCE1] text-[11px] text-[#1F2933]"
                      >
                        <span className="font-semibold text-[#0F1B2D]">{spec.key}:</span>
                        <span className="text-[#1D4ED8] font-mono">{spec.value}</span>
                      </span>
                    ))}
                    {item.specs.length > 4 && (
                      <span className="text-[10px] text-[#5B6470] self-center">
                        +{item.specs.length - 4} more specs
                      </span>
                    )}
                  </div>
                )}

                {/* PDF and Attachment indicator */}
                {item.pdfUrl && (
                  <div className="pt-1 flex items-center gap-2 text-xs text-[#5B6470]">
                    <span className="flex items-center gap-1 text-rose-700 font-semibold">
                      <FileDown className="w-3.5 h-3.5" />
                      <span>Datasheet Attached ({item.pdfSize || 'PDF'})</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons Column */}
              <div className="flex md:flex-col items-center justify-end gap-2 shrink-0 w-full md:w-auto pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                <button
                  onClick={() => setSelectedItemForPreview(item)}
                  className="p-2 text-slate-500 hover:text-[#1D4ED8] hover:bg-[#F3F4F6] rounded-[4px] transition-colors cursor-pointer"
                  title="Quick View Content"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onOpenEditContent(item)}
                  className="p-2 text-slate-500 hover:text-[#1D4ED8] hover:bg-[#F3F4F6] rounded-[4px] transition-colors cursor-pointer"
                  title="Edit Content & Specifications"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete content article "${item.title}"?`)) {
                      onDeleteContent(item.id);
                    }
                  }}
                  className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-[4px] transition-colors cursor-pointer"
                  title="Delete Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Quick Preview Modal */}
      {selectedItemForPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F1B2D]/70 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl bg-white rounded-[8px] border border-[#D9DCE1] shadow-[0_8px_24px_rgba(15,27,45,.16)] overflow-hidden flex flex-col max-h-[85vh]">
            <div className="bg-[#0F1B2D] text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#F5B800] uppercase tracking-wider">
                  Content Preview
                </span>
                <h3 className="text-base font-bold text-white truncate max-w-md">
                  {isBn ? (selectedItemForPreview.titleBn || selectedItemForPreview.title) : selectedItemForPreview.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedItemForPreview(null)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto">
              {selectedItemForPreview.imageUrl && (
                <div className="h-48 bg-slate-900 rounded-[4px] overflow-hidden flex items-center justify-center">
                  <img
                    src={selectedItemForPreview.imageUrl}
                    alt={isBn ? (selectedItemForPreview.titleBn || selectedItemForPreview.title) : selectedItemForPreview.title}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}

              {(selectedItemForPreview.subtitle || selectedItemForPreview.subtitleBn) && (
                <p className="text-sm font-semibold text-[#0F1B2D]">
                  {isBn ? (selectedItemForPreview.subtitleBn || selectedItemForPreview.subtitle) : (selectedItemForPreview.subtitle || selectedItemForPreview.subtitleBn)}
                </p>
              )}

              {selectedItemForPreview.specs && selectedItemForPreview.specs.length > 0 && (
                <div className="bg-[#F3F4F6] p-4 rounded-[4px] border border-[#D9DCE1]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F1B2D] mb-2">
                    {isBn ? 'ইঞ্জিনিয়ারিং স্পেসিফিকেশন ও মানদণ্ড' : 'Engineering Specifications'}
                  </h4>
                  <table className="w-full text-xs">
                    <tbody>
                      {selectedItemForPreview.specs.map((s, idx) => (
                        <tr key={idx} className="border-b border-slate-200/80">
                          <td className="py-1.5 font-semibold text-[#0F1B2D] w-1/2">{s.key}</td>
                          <td className="py-1.5 font-mono text-[#1D4ED8]">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="prose prose-sm max-w-none text-xs text-[#1F2933] leading-relaxed whitespace-pre-line">
                {isBn ? (selectedItemForPreview.bodyMdxBn || selectedItemForPreview.bodyMdx) : selectedItemForPreview.bodyMdx}
              </div>
            </div>

            <div className="px-6 py-3 bg-[#F3F4F6] border-t border-[#D9DCE1] flex items-center justify-end">
              <button
                onClick={() => setSelectedItemForPreview(null)}
                className="px-4 py-1.5 bg-[#0F1B2D] text-white text-xs font-bold rounded-[4px] cursor-pointer"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
