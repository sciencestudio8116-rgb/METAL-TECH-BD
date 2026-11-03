import React, { useState } from 'react';
import {
  LayoutDashboard,
  Settings,
  Image as ImageIcon,
  Layers,
  FileText,
  Briefcase,
  HelpCircle,
  Download,
  BookOpen,
  Users,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  Search,
  CheckCircle2,
  DownloadCloud,
  UploadCloud,
  ChevronRight,
  Database,
  Building,
  Mail,
  Phone,
  MapPin,
  X
} from 'lucide-react';
import { useAdmin, DownloadItem, FaqItem, NavigationSubItem, ContentItem } from '../../context/AdminContext';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { ContentWorkspace } from '../../components/admin/ContentWorkspace';
import { SubMenuModal } from '../../components/admin/SubMenuModal';
import { ContentEditorModal } from '../../components/admin/ContentEditorModal';
import { PageRoute } from '../../types/navigation';
import { Alloy, CaseStudy, BlogPost, GlossaryTerm } from '../../data/siteData';

interface AdminDashboardViewProps {
  onNavigate: (route: PageRoute) => void;
}

type AdminTab = 
  | 'hierarchy'
  | 'overview' 
  | 'settings' 
  | 'heroes' 
  | 'alloys' 
  | 'papers' 
  | 'case-studies' 
  | 'faqs' 
  | 'downloads' 
  | 'glossary' 
  | 'leads' 
  | 'backup';

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onNavigate }) => {
  const {
    adminUser,
    logout,
    navigationMenu,
    addSubMenu,
    updateSubMenu,
    deleteSubMenu,
    contentItems,
    addContentItem,
    updateContentItem,
    deleteContentItem,
    siteMetadata,
    updateSiteMetadata,
    heroContents,
    updateHeroContent,
    alloys,
    addAlloy,
    updateAlloy,
    deleteAlloy,
    caseStudies,
    addCaseStudy,
    updateCaseStudy,
    deleteCaseStudy,
    blogPosts,
    addBlogPost,
    updateBlogPost,
    deleteBlogPost,
    faqs,
    addFaq,
    updateFaq,
    deleteFaq,
    downloads,
    addDownload,
    updateDownload,
    deleteDownload,
    glossary,
    addGlossaryTerm,
    updateGlossaryTerm,
    deleteGlossaryTerm,
    leads,
    deleteLead,
    resetToDefaults,
    exportDataJson,
    importDataJson,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<AdminTab>('hierarchy');
  const [activeMenuId, setActiveMenuId] = useState<string>('casting');
  const [activeSubItemId, setActiveSubItemId] = useState<string>('sand-casting');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Sub-Menu Modal State
  const [subMenuModalOpen, setSubMenuModalOpen] = useState(false);
  const [targetMenuIdForSubMenu, setTargetMenuIdForSubMenu] = useState<string>('casting');
  const [editingSubItem, setEditingSubItem] = useState<NavigationSubItem | null>(null);

  // Content Item Modal State
  const [contentModalOpen, setContentModalOpen] = useState(false);
  const [editingContentItem, setEditingContentItem] = useState<ContentItem | null>(null);

  const handleOpenAddSubMenu = (menuId: string) => {
    setTargetMenuIdForSubMenu(menuId);
    setEditingSubItem(null);
    setSubMenuModalOpen(true);
  };

  const handleOpenEditSubMenu = (menuId: string, subItem: NavigationSubItem) => {
    setTargetMenuIdForSubMenu(menuId);
    setEditingSubItem(subItem);
    setSubMenuModalOpen(true);
  };

  const handleSaveSubMenu = (
    menuId: string,
    subItem: NavigationSubItem,
    isEdit: boolean,
    originalSubItemId?: string
  ) => {
    if (isEdit && originalSubItemId) {
      updateSubMenu(menuId, originalSubItemId, subItem);
    } else {
      addSubMenu(menuId, subItem);
    }
    setSubMenuModalOpen(false);
    setEditingSubItem(null);
  };

  const handleOpenCreateContent = () => {
    setEditingContentItem(null);
    setContentModalOpen(true);
  };

  const handleOpenEditContent = (item: ContentItem) => {
    setEditingContentItem(item);
    setContentModalOpen(true);
  };

  const handleSaveContent = (item: ContentItem) => {
    const existing = contentItems.find(c => c.id === item.id);
    if (existing) {
      updateContentItem(item.id, item);
    } else {
      addContentItem(item);
    }
    setContentModalOpen(false);
    setEditingContentItem(null);
  };

  const currentMenu = navigationMenu.find((m) => m.id === activeMenuId) || navigationMenu[0];
  const currentSub = currentMenu?.subItems.find((s) => s.id === activeSubItemId) || currentMenu?.subItems[0];
  const parentMenuForModal = navigationMenu.find((m) => m.id === targetMenuIdForSubMenu) || currentMenu;

  // Local form states for settings
  const [settingsForm, setSettingsForm] = useState(siteMetadata);

  // Search state for tables
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [alloyModalOpen, setAlloyModalOpen] = useState(false);
  const [editingAlloy, setEditingAlloy] = useState<Alloy | null>(null);

  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);
  const [faqForm, setFaqForm] = useState<FaqItem>({
    question: '',
    answer: '',
    category: 'Casting Processes',
  });

  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [downloadForm, setDownloadForm] = useState<DownloadItem>({
    title: '',
    category: 'Datasheet',
    format: 'PDF',
    size: '1.2 MB',
    version: '2026.1',
    description: '',
  });

  const [caseStudyModalOpen, setCaseStudyModalOpen] = useState(false);
  const [caseStudyForm, setCaseStudyForm] = useState<CaseStudy>({
    slug: '',
    title: '',
    clientIndustry: 'Petrochemical & Energy',
    challenge: '',
    solution: '',
    results: ['28% lead time reduction', 'Zero porosity rejects'],
    alloysUsed: 'CF8M / 316 Stainless',
    process: 'Centrifugal Casting',
  });

  // Handle Logout
  const handleLogout = () => {
    logout();
    onNavigate({ view: 'home' });
  };

  // Export Leads to CSV
  const handleExportLeadsCsv = () => {
    if (leads.length === 0) return;
    const headers = 'ID,Full Name,Email,Phone,Company,Source,Alloy/Process,Quantity,Date\n';
    const rows = leads.map(l => 
      `"${l.id}","${l.fullName}","${l.email}","${l.phone || ''}","${l.company || ''}","${l.source}","${l.alloyOrProcess || ''}","${l.estimatedQuantity || ''}","${l.createdAt}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `metaltek_leads_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#070D1E] text-slate-100 flex flex-col font-sans">
      {/* 1. Top Admin Navigation Bar */}
      <header className="h-16 bg-[#0B1528] border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-2 rounded bg-slate-800 text-slate-300 hover:text-white"
          >
            <Layers className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-blue-700 flex items-center justify-center font-black text-white text-sm shadow-md">
              MT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base tracking-tight">Metal Tek BD</span>
                <span className="px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider">
                  Admin Console
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Real-time CMS & Foundry Portal</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Website Preview Link */}
          <button
            onClick={() => onNavigate({ view: 'home' })}
            className="px-3 py-1.5 rounded-sm bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">View Live Website</span>
          </button>

          {/* User Profile */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800 text-xs">
            <div className="w-7 h-7 rounded-full bg-cyan-900 border border-cyan-400 flex items-center justify-center font-bold text-cyan-200 text-xs">
              A
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-white">{adminUser?.name || 'Administrator'}</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Super Admin
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded-sm bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Log out of Admin Console"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* 2. Main Dashboard Layout (AdminSidebar + Dynamic Content Workspace) */}
      <div className="flex-1 flex overflow-hidden">
        {/* Admin Hierarchy Tree & Specialized Sidebar */}
        <AdminSidebar
          menus={navigationMenu}
          contentItems={contentItems}
          activeView={activeTab as any}
          activeMenuId={activeMenuId}
          activeSubItemId={activeSubItemId}
          onSelectSubItem={(menuId, subItemId) => {
            setActiveTab('hierarchy');
            setActiveMenuId(menuId);
            setActiveSubItemId(subItemId);
          }}
          onSelectSystemTab={(tab) => {
            setActiveTab(tab as any);
          }}
          onOpenAddSubMenu={handleOpenAddSubMenu}
          onOpenEditSubMenu={handleOpenEditSubMenu}
          onDeleteSubMenu={(menuId, subItemId) => {
            deleteSubMenu(menuId, subItemId);
          }}
          leadsCount={leads.length}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        {/* Content Workspace Area */}
        <main className="flex-1 overflow-y-auto bg-[#F8FAFC] p-4 sm:p-6 lg:p-8 space-y-6">
          {/* TAB 0: HIERARCHY / SUB-MENU WORKSPACE */}
          {activeTab === 'hierarchy' && currentMenu && currentSub && (
            <ContentWorkspace
              parentMenu={currentMenu}
              subItem={currentSub}
              contentItems={contentItems}
              onOpenCreateContent={handleOpenCreateContent}
              onOpenEditContent={handleOpenEditContent}
              onDeleteContent={(id) => deleteContentItem(id)}
              onTogglePublish={(item) => updateContentItem(item.id, { isPublished: !item.isPublished })}
              onOpenEditSubMenu={handleOpenEditSubMenu}
              onNavigateLive={onNavigate}
            />
          )}

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white">System Overview & Analytics</h1>
                  <p className="text-xs text-slate-400">Real-time status of content catalogs and incoming engineering RFQs.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate({ view: 'home' })}
                    className="px-3 py-1.5 bg-[#004B87] hover:bg-[#003865] text-white text-xs font-semibold rounded-sm shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Visit Live Site</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-md bg-[#0C1527] border border-slate-800 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Active Alloys</span>
                    <Layers className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">{alloys.length}</div>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Searchable in Alloy Finder</span>
                  </p>
                </div>

                <div className="p-4 rounded-md bg-[#0C1527] border border-slate-800 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>RFQ Leads Received</span>
                    <Users className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">{leads.length}</div>
                  <p className="text-[11px] text-cyan-400">Total inquiries captured</p>
                </div>

                <div className="p-4 rounded-md bg-[#0C1527] border border-slate-800 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Case Studies</span>
                    <Briefcase className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">{caseStudies.length}</div>
                  <p className="text-[11px] text-slate-400">Foundry customer stories</p>
                </div>

                <div className="p-4 rounded-md bg-[#0C1527] border border-slate-800 shadow-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-xs">
                    <span>Technical FAQs</span>
                    <HelpCircle className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="text-2xl font-bold text-white font-mono">{faqs.length}</div>
                  <p className="text-[11px] text-slate-400">Knowledge base entries</p>
                </div>
              </div>

              {/* Recent RFQ Leads Snippet */}
              <div className="bg-[#0C1527] border border-slate-800 rounded-md p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-bold text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-emerald-400" />
                    <span>Recent RFQ & Gated Inquiries</span>
                  </h2>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs text-cyan-400 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>View All Leads</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2 px-3">Date</th>
                        <th className="py-2 px-3">Name</th>
                        <th className="py-2 px-3">Company</th>
                        <th className="py-2 px-3">Source</th>
                        <th className="py-2 px-3">Alloy / Process</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                      {leads.slice(0, 4).map(l => (
                        <tr key={l.id} className="hover:bg-slate-800/30">
                          <td className="py-2.5 px-3 text-slate-400">{l.createdAt}</td>
                          <td className="py-2.5 px-3 font-semibold text-slate-200">{l.fullName}</td>
                          <td className="py-2.5 px-3 text-slate-300">{l.company || '—'}</td>
                          <td className="py-2.5 px-3 text-cyan-400">{l.source}</td>
                          <td className="py-2.5 px-3 text-slate-200">{l.alloyOrProcess || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GENERAL SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div className="border-b border-slate-800 pb-4">
                <h1 className="text-xl font-bold text-white">General Site Settings & SEO</h1>
                <p className="text-xs text-slate-400">Manage contact information, office locations, emergency phone, and SEO tags across the entire website.</p>
              </div>

              <div className="bg-[#0C1527] border border-slate-800 rounded-md p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Company Name</label>
                    <input
                      type="text"
                      value={settingsForm.name}
                      onChange={e => setSettingsForm({ ...settingsForm, name: e.target.value })}
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300">Short Brand Name</label>
                    <input
                      type="text"
                      value={settingsForm.shortName}
                      onChange={e => setSettingsForm({ ...settingsForm, shortName: e.target.value })}
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-300">Corporate Tagline</label>
                    <input
                      type="text"
                      value={settingsForm.tagline}
                      onChange={e => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300">Sales Hotline (Phone)</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={e => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300">Sales Inquiries Email</label>
                    <input
                      type="email"
                      value={settingsForm.salesEmail}
                      onChange={e => setSettingsForm({ ...settingsForm, salesEmail: e.target.value })}
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300">Metallurgical Engineering Email</label>
                    <input
                      type="email"
                      value={settingsForm.engineeringEmail}
                      onChange={e => setSettingsForm({ ...settingsForm, engineeringEmail: e.target.value })}
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300">Response Promise</label>
                    <input
                      type="text"
                      value={settingsForm.responsePromise}
                      onChange={e => setSettingsForm({ ...settingsForm, responsePromise: e.target.value })}
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-300">Dhaka Corporate HQ Address</label>
                    <input
                      type="text"
                      value={settingsForm.headquartersAddress}
                      onChange={e => setSettingsForm({ ...settingsForm, headquartersAddress: e.target.value })}
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-300">Gazipur Foundry Plant Address</label>
                    <input
                      type="text"
                      value={settingsForm.plantAddress}
                      onChange={e => setSettingsForm({ ...settingsForm, plantAddress: e.target.value })}
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-xs font-semibold text-slate-300">Footer Copyright Text</label>
                    <input
                      type="text"
                      value={settingsForm.copyright}
                      onChange={e => setSettingsForm({ ...settingsForm, copyright: e.target.value })}
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => updateSiteMetadata(settingsForm)}
                    className="px-5 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white font-semibold rounded text-sm shadow-md flex items-center gap-2 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save & Sync Site Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HERO SECTION CONTENT */}
          {activeTab === 'heroes' && (
            <div className="space-y-6 max-w-4xl">
              <div className="border-b border-slate-800 pb-4">
                <h1 className="text-xl font-bold text-white">Hero Sections Content Management</h1>
                <p className="text-xs text-slate-400">Edit titles, descriptive sub-headings, badges, and CTA button copy without altering banner background layouts.</p>
              </div>

              <div className="space-y-4">
                {['home', 'resources', 'alloys'].map(key => {
                  const content = heroContents[key] || { headline: '', subhead: '' };
                  return (
                    <div key={key} className="bg-[#0C1527] border border-slate-800 rounded-md p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                        <span className="font-bold text-cyan-300 uppercase text-xs tracking-wider">
                          Page: {key.toUpperCase()}
                        </span>
                        <span className="text-[11px] text-slate-500 font-mono">Dynamic Content Sync</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="text-xs font-semibold text-slate-300">Hero Main Headline</label>
                          <input
                            type="text"
                            value={content.headline}
                            onChange={e => updateHeroContent(key, { headline: e.target.value })}
                            className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
                          />
                        </div>

                        <div className="md:col-span-2">
                          <label className="text-xs font-semibold text-slate-300">Hero Subheading</label>
                          <textarea
                            rows={2}
                            value={content.subhead}
                            onChange={e => updateHeroContent(key, { subhead: e.target.value })}
                            className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300">Top Badge Text</label>
                          <input
                            type="text"
                            value={content.badge || ''}
                            onChange={e => updateHeroContent(key, { badge: e.target.value })}
                            className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-semibold text-slate-300">CTA Button Text</label>
                          <input
                            type="text"
                            value={content.ctaText || ''}
                            onChange={e => updateHeroContent(key, { ctaText: e.target.value })}
                            className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-sm text-white"
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: ALLOYS CATALOG */}
          {activeTab === 'alloys' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Alloy Specifications Catalog</h1>
                  <p className="text-xs text-slate-400">Total {alloys.length} registered alloy grades with chemical compositions and mechanical limits.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingAlloy(null);
                      setAlloyModalOpen(true);
                    }}
                    className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-sm shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Alloy</span>
                  </button>
                </div>
              </div>

              {/* Search & Filter */}
              <div className="flex items-center gap-3 max-w-md">
                <div className="relative w-full">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by alloy name, grade, UNS..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                  />
                </div>
              </div>

              {/* Alloys Table */}
              <div className="bg-[#0C1527] border border-slate-800 rounded-md overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#091122] text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-4">Grade / Name</th>
                      <th className="py-2.5 px-4">Family</th>
                      <th className="py-2.5 px-4">UNS & ASTM</th>
                      <th className="py-2.5 px-4">Tensile / Yield</th>
                      <th className="py-2.5 px-4">Hardness</th>
                      <th className="py-2.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {alloys
                      .filter(a => 
                        !searchTerm || 
                        a.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        a.castGrade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        a.family.toLowerCase().includes(searchTerm.toLowerCase())
                      )
                      .map(alloy => (
                        <tr key={alloy.id} className="hover:bg-slate-800/40">
                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{alloy.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono">Grade: {alloy.castGrade}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-medium text-slate-300">
                              {alloy.family}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-300">
                            <div>{alloy.castUNS || '—'}</div>
                            <div className="text-slate-500 text-[10px]">{alloy.castASTM || '—'}</div>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-300">
                            <div>{alloy.mechanical.tensileStrengthMpa} MPa (Tensile)</div>
                            <div className="text-slate-500 text-[10px]">{alloy.mechanical.yieldStrengthMpa} MPa (Yield)</div>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-300">
                            {alloy.mechanical.hardnessHB} HB
                          </td>
                          <td className="py-3 px-4 text-right space-x-2">
                            <button
                              onClick={() => {
                                setEditingAlloy(alloy);
                                setAlloyModalOpen(true);
                              }}
                              className="text-cyan-400 hover:text-cyan-300 p-1 cursor-pointer"
                              title="Edit specifications"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete ${alloy.name}?`)) {
                                  deleteAlloy(alloy.id);
                                }
                              }}
                              className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                              title="Delete alloy"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: FAQS MANAGEMENT */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Technical FAQs Management</h1>
                  <p className="text-xs text-slate-400">Total {faqs.length} answered client questions across casting, testing, and RFQ procedures.</p>
                </div>
                <button
                  onClick={() => {
                    setEditingFaqIndex(null);
                    setFaqForm({ question: '', answer: '', category: 'Casting Processes' });
                    setFaqModalOpen(true);
                  }}
                  className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-sm shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add New FAQ</span>
                </button>
              </div>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="p-4 rounded-md bg-[#0C1527] border border-slate-800 space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 text-[10px] font-bold uppercase tracking-wider">
                          {faq.category}
                        </span>
                        <h3 className="text-sm font-bold text-white mt-1.5">{faq.question}</h3>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => {
                            setEditingFaqIndex(idx);
                            setFaqForm(faq);
                            setFaqModalOpen(true);
                          }}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300 cursor-pointer"
                          title="Edit FAQ"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete this FAQ entry?')) {
                              deleteFaq(idx);
                            }
                          }}
                          className="p-1.5 rounded hover:bg-slate-800 text-slate-400 hover:text-rose-400 cursor-pointer"
                          title="Delete FAQ"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded border border-slate-800/80">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: LEADS & CRM */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Received RFQs & Gated Content Leads</h1>
                  <p className="text-xs text-slate-400">Total {leads.length} customer inquiries captured with commercial details.</p>
                </div>
                <button
                  onClick={handleExportLeadsCsv}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-sm shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to CSV Spreadsheet</span>
                </button>
              </div>

              <div className="bg-[#0C1527] border border-slate-800 rounded-md overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#091122] text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2.5 px-4">Date</th>
                      <th className="py-2.5 px-4">Contact</th>
                      <th className="py-2.5 px-4">Company & Source</th>
                      <th className="py-2.5 px-4">Requirement & Message</th>
                      <th className="py-2.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {leads.map(lead => (
                      <tr key={lead.id} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-mono text-[11px] text-slate-400 whitespace-nowrap">
                          {lead.createdAt}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{lead.fullName}</div>
                          <div className="text-[11px] text-cyan-400">{lead.email}</div>
                          {lead.phone && <div className="text-[10px] text-slate-400 font-mono">{lead.phone}</div>}
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-200">{lead.company || 'Direct Client'}</div>
                          <div className="text-[10px] text-slate-400">Source: {lead.source}</div>
                        </td>
                        <td className="py-3 px-4 text-xs text-slate-300">
                          {lead.alloyOrProcess && (
                            <div className="font-semibold text-amber-300 text-[11px]">
                              Spec: {lead.alloyOrProcess}
                            </div>
                          )}
                          {lead.estimatedQuantity && (
                            <div className="text-[10px] text-slate-400 font-mono">
                              Qty: {lead.estimatedQuantity}
                            </div>
                          )}
                          {lead.message && (
                            <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 italic">
                              "{lead.message}"
                            </p>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Remove lead record for ${lead.fullName}?`)) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                            title="Delete lead record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 7: BACKUP & SYSTEM SYNC */}
          {activeTab === 'backup' && (
            <div className="space-y-6 max-w-3xl">
              <div className="border-b border-slate-800 pb-4">
                <h1 className="text-xl font-bold text-white">System Data Backup, Sync & Factory Reset</h1>
                <p className="text-xs text-slate-400">Export whole site content database to JSON, restore from backup, or reset to original factory state.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Export Card */}
                <div className="p-5 rounded-md bg-[#0C1527] border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                    <DownloadCloud className="w-5 h-5" />
                    <span>Export JSON Backup</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Download a full snapshot of all alloys, case studies, whitepapers, FAQs, site settings, and leads.
                  </p>
                  <button
                    onClick={() => {
                      const json = exportDataJson();
                      const blob = new Blob([json], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `metaltek_backup_${new Date().toISOString().substring(0, 10)}.json`;
                      a.click();
                    }}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded text-xs border border-slate-700 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                {/* Import Card */}
                <div className="p-5 rounded-md bg-[#0C1527] border border-slate-800 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <UploadCloud className="w-5 h-5" />
                    <span>Restore / Import JSON</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Upload a previously exported Metal Tek BD JSON backup file to overwrite and restore content state.
                  </p>
                  <label className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded text-xs border border-slate-700 flex items-center justify-center gap-2 cursor-pointer">
                    <UploadCloud className="w-4 h-4" />
                    <span>Select Backup File</span>
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = event => {
                            const content = event.target?.result as string;
                            if (content) importDataJson(content);
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>

                {/* Reset Card */}
                <div className="md:col-span-2 p-5 rounded-md bg-rose-950/20 border border-rose-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                    <RotateCcw className="w-5 h-5" />
                    <span>Factory Reset to Default Specifications</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    This will discard all custom changes stored in browser storage and revert all alloys, whitepapers, FAQs, and site settings to default factory values.
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('CRITICAL ACTION: Reset all site content to original factory defaults?')) {
                        resetToDefaults();
                      }
                    }}
                    className="py-2 px-4 bg-rose-900/60 hover:bg-rose-800 text-rose-200 border border-rose-500/50 font-semibold rounded text-xs flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Confirm Factory Reset</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: TECHNICAL PAPERS */}
          {activeTab === 'papers' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Technical Papers & Whitepapers</h1>
                  <p className="text-xs text-slate-400">Total {blogPosts.length} published engineering articles and casting whitepapers.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blogPosts.map(post => (
                  <div key={post.slug} className="p-4 rounded-md bg-[#0C1527] border border-slate-800 space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono">
                        {post.date} · {post.readTime}
                      </span>
                      <button
                        onClick={() => {
                          if (confirm(`Delete paper "${post.title}"?`)) {
                            deleteBlogPost(post.slug);
                          }
                        }}
                        className="text-rose-400 hover:text-rose-300 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <h3 className="font-bold text-white text-sm line-clamp-1">{post.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{post.excerpt}</p>
                    <div className="text-[11px] text-slate-500 font-mono">Author: {post.author}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 9: CASE STUDIES */}
          {activeTab === 'case-studies' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Foundry Case Studies</h1>
                  <p className="text-xs text-slate-400">Total {caseStudies.length} engineering case studies showcasing metallurgical problem-solving.</p>
                </div>
              </div>

              <div className="space-y-3">
                {caseStudies.map(cs => (
                  <div key={cs.slug} className="p-4 rounded-md bg-[#0C1527] border border-slate-800 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                          {cs.clientIndustry}
                        </span>
                        <h3 className="font-bold text-white text-sm mt-1">{cs.title}</h3>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Delete case study "${cs.title}"?`)) {
                            deleteCaseStudy(cs.slug);
                          }
                        }}
                        className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-300"><strong>Challenge:</strong> {cs.challenge}</p>
                    <p className="text-xs text-slate-300"><strong>Solution:</strong> {cs.solution}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {cs.results.map((r, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 text-[10px] font-mono border border-emerald-500/20">
                          ✓ {r}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 10: DOWNLOADS */}
          {activeTab === 'downloads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Downloads Catalog Management</h1>
                  <p className="text-xs text-slate-400">Total {downloads.length} catalogues, master brochures, and datasheets.</p>
                </div>
              </div>

              <div className="space-y-3">
                {downloads.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-md bg-[#0C1527] border border-slate-800 flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-cyan-400 text-[10px] font-bold">
                          {item.format} · {item.size}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">v{item.version}</span>
                      </div>
                      <h3 className="font-bold text-white text-sm mt-1">{item.title}</h3>
                      <p className="text-xs text-slate-400">{item.description}</p>
                    </div>
                    <button
                      onClick={() => {
                        if (confirm(`Delete document "${item.title}"?`)) {
                          deleteDownload(idx);
                        }
                      }}
                      className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 11: GLOSSARY */}
          {activeTab === 'glossary' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h1 className="text-xl font-bold text-white">Metallurgy Glossary Terms</h1>
                  <p className="text-xs text-slate-400">Total {glossary.length} terminology entries indexed alphabetically.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {glossary.map((g, idx) => (
                  <div key={idx} className="p-3.5 rounded bg-[#0C1527] border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-sm text-cyan-300">{g.term}</h4>
                      <button
                        onClick={() => {
                          if (confirm(`Delete term "${g.term}"?`)) {
                            deleteGlossaryTerm(idx);
                          }
                        }}
                        className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{g.definition}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 3. Modal: Add/Edit FAQ */}
      {faqModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-[#0C1527] border border-cyan-500/40 rounded-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">
                {editingFaqIndex !== null ? 'Edit FAQ Entry' : 'Add New FAQ'}
              </h3>
              <button onClick={() => setFaqModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Category</label>
                <select
                  value={faqForm.category}
                  onChange={e => setFaqForm({ ...faqForm, category: e.target.value as any })}
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                >
                  <option value="Casting Processes">Casting Processes</option>
                  <option value="Alloys & Specifications">Alloys & Specifications</option>
                  <option value="RFQ & Orders">RFQ & Orders</option>
                  <option value="Quality & Testing">Quality & Testing</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Question</label>
                <input
                  type="text"
                  value={faqForm.question}
                  onChange={e => setFaqForm({ ...faqForm, question: e.target.value })}
                  placeholder="e.g. What is the typical lead time for custom castings?"
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Answer</label>
                <textarea
                  rows={4}
                  value={faqForm.answer}
                  onChange={e => setFaqForm({ ...faqForm, answer: e.target.value })}
                  placeholder="Provide technical answer..."
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setFaqModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!faqForm.question || !faqForm.answer) return;
                  if (editingFaqIndex !== null) {
                    updateFaq(editingFaqIndex, faqForm);
                  } else {
                    addFaq(faqForm);
                  }
                  setFaqModalOpen(false);
                }}
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded"
              >
                Save FAQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Modal: Add/Edit Alloy */}
      {alloyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto bg-[#0C1527] border border-cyan-500/40 rounded-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base">
                {editingAlloy ? `Edit Alloy: ${editingAlloy.name}` : 'Register New Alloy Grade'}
              </h3>
              <button onClick={() => setAlloyModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Update metallurgy designations, mechanical properties, and casting specifications.
            </p>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-300">Alloy Name</label>
                <input
                  type="text"
                  defaultValue={editingAlloy?.name || ''}
                  id="alloy-name-input"
                  placeholder="e.g. Duplex 2205 (Cast 4A)"
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Family</label>
                  <select
                    id="alloy-family-input"
                    defaultValue={editingAlloy?.family || 'Stainless Steel'}
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                  >
                    <option value="Stainless Steel">Stainless Steel</option>
                    <option value="Nickel-Base Superalloy">Nickel-Base Superalloy</option>
                    <option value="Cobalt-Base">Cobalt-Base</option>
                    <option value="Carbon & Low-Alloy">Carbon & Low-Alloy</option>
                    <option value="Copper-Base & Bronze">Copper-Base & Bronze</option>
                    <option value="Wear-Resistant">Wear-Resistant</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Cast Grade</label>
                  <input
                    type="text"
                    defaultValue={editingAlloy?.castGrade || ''}
                    id="alloy-grade-input"
                    placeholder="e.g. CD3MN"
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Tensile (MPa)</label>
                  <input
                    type="number"
                    defaultValue={editingAlloy?.mechanical.tensileStrengthMpa || 655}
                    id="alloy-tensile-input"
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Yield (MPa)</label>
                  <input
                    type="number"
                    defaultValue={editingAlloy?.mechanical.yieldStrengthMpa || 450}
                    id="alloy-yield-input"
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Hardness (HB)</label>
                  <input
                    type="text"
                    defaultValue={editingAlloy?.mechanical.hardnessHB || '225-260'}
                    id="alloy-hardness-input"
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Engineering Description</label>
                <textarea
                  rows={3}
                  defaultValue={editingAlloy?.description || ''}
                  id="alloy-desc-input"
                  placeholder="Describe corrosion resistance, severe service suitability..."
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-800">
              <button
                onClick={() => setAlloyModalOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const name = (document.getElementById('alloy-name-input') as HTMLInputElement)?.value;
                  const family = (document.getElementById('alloy-family-input') as HTMLSelectElement)?.value as any;
                  const grade = (document.getElementById('alloy-grade-input') as HTMLInputElement)?.value;
                  const tensile = Number((document.getElementById('alloy-tensile-input') as HTMLInputElement)?.value) || 600;
                  const yieldStr = Number((document.getElementById('alloy-yield-input') as HTMLInputElement)?.value) || 400;
                  const hardness = (document.getElementById('alloy-hardness-input') as HTMLInputElement)?.value || '200';
                  const desc = (document.getElementById('alloy-desc-input') as HTMLTextAreaElement)?.value || '';

                  if (!name) return;

                  if (editingAlloy) {
                    updateAlloy(editingAlloy.id, {
                      name,
                      family,
                      castGrade: grade,
                      description: desc,
                      mechanical: {
                        ...editingAlloy.mechanical,
                        tensileStrengthMpa: tensile,
                        yieldStrengthMpa: yieldStr,
                        hardnessHB: hardness,
                      },
                    });
                  } else {
                    const newAlloy: Alloy = {
                      id: `alloy-${Date.now()}`,
                      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      name,
                      family,
                      castGrade: grade || name,
                      castUNS: 'J92205',
                      castASTM: 'ASTM A890 Grade 4A',
                      equivalentDIN: '1.4462',
                      wroughtEquiv: 'Alloy 2205',
                      description: desc,
                      composition: [
                        { element: 'Cr', min: 21.0, max: 23.5 },
                        { element: 'Ni', min: 4.5, max: 6.5 },
                        { element: 'Mo', min: 2.5, max: 3.5 },
                        { element: 'N', min: 0.1, max: 0.3 },
                      ],
                      mechanical: {
                        tensileStrengthMpa: tensile,
                        yieldStrengthMpa: yieldStr,
                        elongationPct: 25,
                        hardnessHB: hardness,
                        condition: 'Solution Annealed & Water Quenched',
                      },
                      suitableProcesses: ['Centrifugal Casting', 'Sand Casting', 'Investment Casting'],
                      applications: ['Chemical processing impellers', 'Offshore sour gas valves', 'Desalination high-pressure pumps'],
                      keyAttributes: ['High pitting resistance (PREN > 35)', 'Stress corrosion cracking resistance'],
                    };
                    addAlloy(newAlloy);
                  }
                  setAlloyModalOpen(false);
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white text-xs font-semibold rounded cursor-pointer"
              >
                Save Alloy Specifications
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Sub-Menu Add / Edit Modal */}
      <SubMenuModal
        isOpen={subMenuModalOpen}
        onClose={() => {
          setSubMenuModalOpen(false);
          setEditingSubItem(null);
        }}
        onSave={handleSaveSubMenu}
        menus={navigationMenu}
        initialMenuId={targetMenuIdForSubMenu}
        initialSubItem={editingSubItem}
      />

      {/* 4. Content / Spec Item Add / Edit Modal */}
      {currentMenu && currentSub && (
        <ContentEditorModal
          isOpen={contentModalOpen}
          onClose={() => {
            setContentModalOpen(false);
            setEditingContentItem(null);
          }}
          onSave={handleSaveContent}
          menus={navigationMenu}
          initialItem={editingContentItem}
          defaultMenuId={currentMenu?.id}
          defaultSubItemId={currentSub?.id}
        />
      )}
    </div>
  );
};
