import React, { useState } from 'react';
import {
  LayoutDashboard,
  Settings,
  Layers,
  FileText,
  Briefcase,
  HelpCircle,
  Download,
  BookOpen,
  Users,
  ChevronRight,
  ChevronDown,
  Plus,
  Edit2,
  Trash2,
  FolderOpen,
  Flame,
  Wrench,
  Building,
  Mail,
  ShieldCheck,
  Database
} from 'lucide-react';
import { NavigationMenuItem, NavigationSubItem, ContentItem } from '../../context/AdminContext';

interface AdminSidebarProps {
  menus: NavigationMenuItem[];
  contentItems: ContentItem[];
  activeView: 'hierarchy' | 'overview' | 'settings' | 'alloys' | 'faqs' | 'downloads' | 'case-studies' | 'leads' | 'backup';
  activeMenuId: string;
  activeSubItemId: string;
  onSelectSubItem: (menuId: string, subItemId: string) => void;
  onSelectSystemTab: (tab: 'overview' | 'settings' | 'alloys' | 'faqs' | 'downloads' | 'case-studies' | 'leads' | 'backup') => void;
  onOpenAddSubMenu: (menuId: string) => void;
  onOpenEditSubMenu: (menuId: string, subItem: NavigationSubItem) => void;
  onDeleteSubMenu: (menuId: string, subItemId: string) => void;
  leadsCount: number;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  menus,
  contentItems,
  activeView,
  activeMenuId,
  activeSubItemId,
  onSelectSubItem,
  onSelectSystemTab,
  onOpenAddSubMenu,
  onOpenEditSubMenu,
  onDeleteSubMenu,
  leadsCount,
  mobileOpen,
  onCloseMobile,
}) => {
  // Collapsed state for each menu category
  const [expandedMenus, setExpandedMenus] = useState<{ [key: string]: boolean }>({
    casting: true,
    capabilities: true,
    alloys: true,
    markets: true,
    resources: true,
    about: true,
  });

  const toggleExpand = (menuId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedMenus((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  const getMenuIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4 text-[#F5B800]" />;
      case 'Wrench': return <Wrench className="w-4 h-4 text-[#1D4ED8]" />;
      case 'Layers': return <Layers className="w-4 h-4 text-emerald-400" />;
      case 'Briefcase': return <Briefcase className="w-4 h-4 text-purple-400" />;
      case 'BookOpen': return <BookOpen className="w-4 h-4 text-sky-400" />;
      case 'Building': return <Building className="w-4 h-4 text-amber-400" />;
      default: return <FolderOpen className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <aside
      className={`${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 transition-transform duration-200 fixed md:static inset-y-16 left-0 z-30 w-72 bg-[#0F1B2D] border-r border-slate-800 flex flex-col justify-between overflow-y-auto font-sans select-none text-slate-200`}
    >
      <div className="p-4 space-y-6">
        {/* Section 1: Live Navigation Hierarchy & Sub-menus */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <span>Site Menu & Content Tree</span>
            </span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded-[3px] font-mono">
              6 Sections
            </span>
          </div>

          <div className="space-y-1.5">
            {menus.map((menu) => {
              const isExpanded = !!expandedMenus[menu.id];
              const menuSubCount = menu.subItems.length;

              return (
                <div key={menu.id} className="rounded-[4px] bg-[#142338]/60 border border-slate-800/80 overflow-hidden">
                  {/* Category Header */}
                  <div
                    onClick={(e) => toggleExpand(menu.id, e)}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-white hover:bg-slate-800/80 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-2 truncate">
                      {getMenuIcon(menu.iconName)}
                      <span className="truncate">{menu.label}</span>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.2 rounded bg-slate-800">
                        {menuSubCount}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenAddSubMenu(menu.id);
                        }}
                        className="p-1 rounded text-slate-400 hover:text-white hover:bg-[#1D4ED8] transition-colors cursor-pointer"
                        title={`Add sub-menu under ${menu.label}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      {isExpanded ? (
                        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                      ) : (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </div>
                  </div>

                  {/* Sub-Items List */}
                  {isExpanded && (
                    <div className="px-2 pb-2 pt-0.5 space-y-1 border-t border-slate-800/60 bg-[#0C1726]/80">
                      {menu.subItems.length === 0 ? (
                        <div className="px-3 py-2 text-[11px] text-slate-500 italic flex items-center justify-between">
                          <span>No sub-menus configured</span>
                          <button
                            onClick={() => onOpenAddSubMenu(menu.id)}
                            className="text-[#F5B800] hover:underline font-semibold"
                          >
                            + Add
                          </button>
                        </div>
                      ) : (
                        menu.subItems.map((sub) => {
                          const isSelected =
                            activeView === 'hierarchy' &&
                            activeMenuId === menu.id &&
                            activeSubItemId === sub.id;
                          
                          // Count content items for this sub-menu
                          const count = contentItems.filter(
                            (c) => c.menuId === menu.id && c.subItemId === sub.id
                          ).length;

                          return (
                            <div
                              key={sub.id}
                              onClick={() => {
                                onSelectSubItem(menu.id, sub.id);
                                onCloseMobile();
                              }}
                              className={`group flex items-center justify-between px-2.5 py-1.5 rounded-[4px] text-xs transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#1D4ED8] text-white font-bold shadow-[0_2px_8px_rgba(29,78,216,.3)]'
                                  : 'text-slate-300 hover:text-white hover:bg-slate-800/70'
                              }`}
                            >
                              <div className="flex items-center gap-2 truncate">
                                <span
                                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                    isSelected ? 'bg-[#F5B800]' : 'bg-slate-600 group-hover:bg-[#F5B800]'
                                  }`}
                                />
                                <span className="truncate">{sub.label}</span>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <span
                                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                                    isSelected
                                      ? 'bg-[#163A9E] text-white'
                                      : 'bg-slate-800 text-slate-400 group-hover:text-slate-200'
                                  }`}
                                  title={`${count} content items`}
                                >
                                  {count}
                                </span>

                                {/* Quick Actions */}
                                <div className="hidden group-hover:flex items-center gap-0.5 ml-1">
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      onOpenEditSubMenu(menu.id, sub);
                                    }}
                                    className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                                    title="Edit sub-menu properties"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (confirm(`Delete sub-menu "${sub.label}"? All attached content will be removed.`)) {
                                        onDeleteSubMenu(menu.id, sub.id);
                                      }
                                    }}
                                    className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                                    title="Delete sub-menu"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })
                      )}

                      {/* Add sub-menu inline trigger */}
                      <button
                        onClick={() => onOpenAddSubMenu(menu.id)}
                        className="w-full text-left px-2.5 py-1 text-[11px] text-[#F5B800] hover:text-[#FFD700] hover:bg-slate-800/40 rounded-[3px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer mt-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Sub-Menu under {menu.label}</span>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 2: Dedicated Specialized Managers */}
        <div>
          <div className="px-2 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Specialized Modules & Data
            </span>
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => { onSelectSystemTab('overview'); onCloseMobile(); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
                activeView === 'overview'
                  ? 'bg-[#1D4ED8] text-white shadow-xs font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-[#F5B800]" />
                <span>Executive Overview</span>
              </div>
            </button>

            <button
              onClick={() => { onSelectSystemTab('alloys'); onCloseMobile(); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
                activeView === 'alloys'
                  ? 'bg-[#1D4ED8] text-white shadow-xs font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Alloys Database Matrix</span>
              </div>
            </button>

            <button
              onClick={() => { onSelectSystemTab('faqs'); onCloseMobile(); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
                activeView === 'faqs'
                  ? 'bg-[#1D4ED8] text-white shadow-xs font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-sky-400" />
                <span>Technical FAQs</span>
              </div>
            </button>

            <button
              onClick={() => { onSelectSystemTab('downloads'); onCloseMobile(); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
                activeView === 'downloads'
                  ? 'bg-[#1D4ED8] text-white shadow-xs font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Download className="w-4 h-4 text-amber-400" />
                <span>Datasheets & Downloads</span>
              </div>
            </button>

            <button
              onClick={() => { onSelectSystemTab('case-studies'); onCloseMobile(); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
                activeView === 'case-studies'
                  ? 'bg-[#1D4ED8] text-white shadow-xs font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-4 h-4 text-purple-400" />
                <span>Case Studies Hub</span>
              </div>
            </button>

            <button
              onClick={() => { onSelectSystemTab('leads'); onCloseMobile(); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
                activeView === 'leads'
                  ? 'bg-[#1D4ED8] text-white shadow-xs font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-rose-400" />
                <span>RFQ Inquiries & Leads</span>
              </div>
              {leadsCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[10px] font-bold">
                  {leadsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => { onSelectSystemTab('settings'); onCloseMobile(); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
                activeView === 'settings'
                  ? 'bg-[#1D4ED8] text-white shadow-xs font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-slate-300" />
                <span>Settings & Global Metadata</span>
              </div>
            </button>

            <button
              onClick={() => { onSelectSystemTab('backup'); onCloseMobile(); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-[4px] text-xs font-semibold transition-all cursor-pointer ${
                activeView === 'backup'
                  ? 'bg-[#1D4ED8] text-white shadow-xs font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Database className="w-4 h-4 text-cyan-400" />
                <span>Backup & JSON Sync</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Footer Branding */}
      <div className="p-4 border-t border-slate-800 bg-[#0B1525] text-[11px] text-slate-400 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Local Storage V1 Active</span>
        </div>
        <span className="text-[#F5B800] font-mono text-[10px]">Ready</span>
      </div>
    </aside>
  );
};
