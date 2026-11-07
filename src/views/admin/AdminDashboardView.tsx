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
  X,
  Globe,
  Wand2,
  Sparkles,
  Languages,
  Video,
  Play,
  Film,
  Eye,
  Flame
} from 'lucide-react';
import { useAdmin, DownloadItem, FaqItem, NavigationSubItem, NavigationMenuItem, ContentItem, VideoItem } from '../../context/AdminContext';
import { useLanguage } from '../../context/LanguageContext';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { ContentWorkspace } from '../../components/admin/ContentWorkspace';
import { SubMenuModal } from '../../components/admin/SubMenuModal';
import { ContentEditorModal } from '../../components/admin/ContentEditorModal';
import { PageRoute } from '../../types/navigation';
import { Alloy, CaseStudy, BlogPost, GlossaryTerm, ProcessItem, CapabilityItem, MarketItem } from '../../data/siteData';
import {
  translateBiDirectional,
  detectLanguage,
  autoTranslateVideoFields,
  autoTranslateProcessFields,
  autoTranslateCapabilityFields,
  autoTranslateMarketFields
} from '../../lib/translator';

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
  | 'backup'
  | 'videos'
  | 'cards';

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ onNavigate }) => {
  const { adminIsBn: isBn, toggleAdminLanguage: toggleLanguage, adminT: t } = useLanguage();
  const {
    adminUser,
    logout,
    navigationMenu,
    addMainMenu,
    updateMainMenu,
    deleteMainMenu,
    addSubMenu,
    updateSubMenu,
    deleteSubMenu,
    contentItems,
    addContentItem,
    updateContentItem,
    deleteContentItem,
    processCards,
    addProcessCard,
    updateProcessCard,
    deleteProcessCard,
    capabilityCards,
    addCapabilityCard,
    updateCapabilityCard,
    deleteCapabilityCard,
    marketCards,
    addMarketCard,
    updateMarketCard,
    deleteMarketCard,
    videos,
    addVideo,
    updateVideo,
    deleteVideo,
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
    supabaseConnected,
    supabaseSyncing,
    syncWithSupabase,
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

  // Main Menu Modal State
  const [mainMenuModalOpen, setMainMenuModalOpen] = useState(false);
  const [editingMainMenu, setEditingMainMenu] = useState<NavigationMenuItem | null>(null);
  const [mainMenuForm, setMainMenuForm] = useState({
    id: '',
    label: '',
    labelBn: '',
    slug: '',
    iconName: 'Layers',
    routeView: 'resources' as NavigationMenuItem['routeView'],
    description: '',
  });

  // Video Management State
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [videoLangTab, setVideoLangTab] = useState<'en' | 'bn'>('en');
  const [videoPreviewItem, setVideoPreviewItem] = useState<VideoItem | null>(null);
  const [videoForm, setVideoForm] = useState<VideoItem>({
    id: '',
    title: '',
    titleBn: '',
    category: 'Foundry & Metallurgy',
    categoryBn: 'ফাউন্ড্রি ও ধাতুবিদ্যা',
    description: '',
    descriptionBn: '',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    thumbnailUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
    duration: '04:15',
    tags: ['Centrifugal', 'Foundry', 'MetalTek BD'],
  });

  // Submenu & Overview Cards Management State
  const [cardsSubTab, setCardsSubTab] = useState<'process' | 'capability' | 'market'>('process');

  // Process Card Modal State
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [editingProcessCard, setEditingProcessCard] = useState<ProcessItem | null>(null);
  const [processLangTab, setProcessLangTab] = useState<'en' | 'bn'>('en');
  const [processForm, setProcessForm] = useState<ProcessItem>({
    slug: '',
    title: '',
    titleBn: '',
    summary: '',
    summaryBn: '',
    description: '',
    descriptionBn: '',
    heroHeadline: '',
    heroHeadlineBn: '',
    sizeLimits: '',
    sizeLimitsBn: '',
    weightRange: '',
    weightRangeBn: '',
    tolerances: '',
    tolerancesBn: '',
    typicalComponents: [],
    typicalComponentsBn: [],
    suitableAlloys: [],
    industriesServed: [],
  });

  // Capability Card Modal State
  const [capabilityModalOpen, setCapabilityModalOpen] = useState(false);
  const [editingCapabilityCard, setEditingCapabilityCard] = useState<CapabilityItem | null>(null);
  const [capabilityLangTab, setCapabilityLangTab] = useState<'en' | 'bn'>('en');
  const [capabilityForm, setCapabilityForm] = useState<CapabilityItem>({
    slug: '',
    title: '',
    titleBn: '',
    iconName: 'Flame',
    summary: '',
    summaryBn: '',
    description: '',
    descriptionBn: '',
    equipmentHighlights: [],
    equipmentHighlightsBn: [],
    specifications: [],
    specificationsBn: [],
    standards: [],
  });

  // Market Card Modal State
  const [marketModalOpen, setMarketModalOpen] = useState(false);
  const [editingMarketCard, setEditingMarketCard] = useState<MarketItem | null>(null);
  const [marketLangTab, setMarketLangTab] = useState<'en' | 'bn'>('en');
  const [marketForm, setMarketForm] = useState<MarketItem>({
    slug: '',
    title: '',
    titleBn: '',
    categoryTag: '',
    categoryTagBn: '',
    summary: '',
    summaryBn: '',
    challenges: '',
    challengesBn: '',
    solutions: '',
    solutionsBn: '',
    componentsSupplied: [],
    componentsSuppliedBn: [],
    recommendedAlloys: [],
    salesContactMarketSlug: '',
  });

  // Handle Logout
  const handleLogout = () => {
    logout();
    onNavigate({ view: 'home' });
  };

  // Technical Paper Bi-Lingual Modal State
  const [paperModalOpen, setPaperModalOpen] = useState(false);
  const [editingPaperSlug, setEditingPaperSlug] = useState<string | null>(null);
  const [paperLangTab, setPaperLangTab] = useState<'en' | 'bn'>('en');
  const [paperTitleEn, setPaperTitleEn] = useState('');
  const [paperTitleBn, setPaperTitleBn] = useState('');
  const [paperExcerptEn, setPaperExcerptEn] = useState('');
  const [paperExcerptBn, setPaperExcerptBn] = useState('');
  const [paperCategoryEn, setPaperCategoryEn] = useState('Technical Metallurgy');
  const [paperCategoryBn, setPaperCategoryBn] = useState('প্রকৌশল ও ধাতুবিদ্যা');
  const [paperContentEn, setPaperContentEn] = useState('');
  const [paperContentBn, setPaperContentBn] = useState('');
  const [paperAuthor, setPaperAuthor] = useState('MetalTek Engineering Team');
  const [paperReadTime, setPaperReadTime] = useState('5 min read');

  const handleOpenAddPaper = () => {
    setEditingPaperSlug(null);
    setPaperTitleEn('');
    setPaperTitleBn('');
    setPaperExcerptEn('');
    setPaperExcerptBn('');
    setPaperCategoryEn('Technical Metallurgy');
    setPaperCategoryBn('প্রকৌশল ও ধাতুবিদ্যা');
    setPaperContentEn('');
    setPaperContentBn('');
    setPaperAuthor('MetalTek Engineering Team');
    setPaperReadTime('5 min read');
    setPaperLangTab('en');
    setPaperModalOpen(true);
  };

  const handleOpenEditPaper = (post: BlogPost) => {
    setEditingPaperSlug(post.slug);
    setPaperTitleEn(post.title || '');
    setPaperTitleBn(post.titleBn || translateBiDirectional(post.title || '', 'bn'));
    setPaperExcerptEn(post.excerpt || '');
    setPaperExcerptBn(post.excerptBn || translateBiDirectional(post.excerpt || '', 'bn'));
    setPaperCategoryEn(post.category || 'Technical Metallurgy');
    setPaperCategoryBn(post.categoryBn || translateBiDirectional(post.category || '', 'bn'));
    setPaperContentEn(post.content?.join('\n\n') || '');
    setPaperContentBn(post.contentBn?.join('\n\n') || (post.content ? post.content.map(p => translateBiDirectional(p, 'bn')).join('\n\n') : ''));
    setPaperAuthor(post.author || 'MetalTek Engineering Team');
    setPaperReadTime(post.readTime || '5 min read');
    setPaperLangTab('en');
    setPaperModalOpen(true);
  };

  const handleAutoTranslatePaper = () => {
    if (paperLangTab === 'en') {
      if (!paperTitleEn && !paperContentEn) return;
      setPaperTitleBn(translateBiDirectional(paperTitleEn, 'bn'));
      setPaperExcerptBn(translateBiDirectional(paperExcerptEn, 'bn'));
      setPaperCategoryBn(translateBiDirectional(paperCategoryEn, 'bn'));
      setPaperContentBn(translateBiDirectional(paperContentEn, 'bn'));
      setPaperLangTab('bn');
    } else {
      if (!paperTitleBn && !paperContentBn) return;
      setPaperTitleEn(translateBiDirectional(paperTitleBn, 'en'));
      setPaperExcerptEn(translateBiDirectional(paperExcerptBn, 'en'));
      setPaperCategoryEn(translateBiDirectional(paperCategoryBn, 'en'));
      setPaperContentEn(translateBiDirectional(paperContentBn, 'en'));
      setPaperLangTab('en');
    }
  };

  const handleSavePaper = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTitleEn = paperTitleEn.trim() || (paperTitleBn.trim() ? translateBiDirectional(paperTitleBn, 'en') : '');
    const finalTitleBn = paperTitleBn.trim() || (paperTitleEn.trim() ? translateBiDirectional(paperTitleEn, 'bn') : '');

    if (!finalTitleEn && !finalTitleBn) {
      alert('Article title is required in either English or Bengali.');
      return;
    }

    const finalExcerptEn = paperExcerptEn.trim() || (paperExcerptBn.trim() ? translateBiDirectional(paperExcerptBn, 'en') : '');
    const finalExcerptBn = paperExcerptBn.trim() || (paperExcerptEn.trim() ? translateBiDirectional(paperExcerptEn, 'bn') : '');

    const finalContentEn = paperContentEn.trim()
      ? paperContentEn.split('\n\n').filter(p => p.trim())
      : (paperContentBn.trim() ? paperContentBn.split('\n\n').map(p => translateBiDirectional(p, 'en')) : ['']);

    const finalContentBn = paperContentBn.trim()
      ? paperContentBn.split('\n\n').filter(p => p.trim())
      : (paperContentEn.trim() ? paperContentEn.split('\n\n').map(p => translateBiDirectional(p, 'bn')) : ['']);

    const slug = editingPaperSlug || finalTitleEn.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const post: BlogPost = {
      slug,
      title: finalTitleEn,
      titleBn: finalTitleBn,
      excerpt: finalExcerptEn,
      excerptBn: finalExcerptBn,
      content: finalContentEn,
      contentBn: finalContentBn,
      category: paperCategoryEn,
      categoryBn: paperCategoryBn,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: paperAuthor,
      readTime: paperReadTime,
    };

    if (editingPaperSlug) {
      updateBlogPost(editingPaperSlug, post);
    } else {
      addBlogPost(post);
    }
    setPaperModalOpen(false);
  };

  // Export Leads & Inquiries to CSV for Offline Reporting
  const handleExportLeadsCsv = () => {
    if (leads.length === 0) return;
    const headers = 'ID,Full Name,Email,Phone,Company,Source,Alloy/Process,Quantity,Message,Date\n';
    const rows = leads.map(l => 
      `"${l.id}","${l.fullName}","${l.email}","${l.phone || ''}","${l.company || ''}","${l.source}","${l.alloyOrProcess || ''}","${l.estimatedQuantity || ''}","${(l.message || '').replace(/"/g, '""')}","${l.createdAt}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `metaltek_rfq_inquiries_${new Date().toISOString().substring(0, 10)}.csv`);
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
                  {isBn ? 'অ্যাডমিন কনসোল' : 'Admin Console'}
                </span>
                <button
                  onClick={() => syncWithSupabase()}
                  disabled={supabaseSyncing}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    supabaseConnected
                      ? 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400 hover:bg-emerald-900/80'
                      : 'bg-amber-950/80 border-amber-500/40 text-amber-400 hover:bg-amber-900/80'
                  }`}
                  title="Click to manually refresh data from Supabase PostgreSQL"
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${supabaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                  <span className="hidden sm:inline">
                    {supabaseSyncing ? 'Syncing...' : supabaseConnected ? 'Supabase Live' : 'Supabase Ready'}
                  </span>
                </button>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                {isBn ? 'রিয়েল-টাইম সিএমএস ও ফাউন্ড্রি পোর্টাল' : 'Real-time CMS & Foundry Portal'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Toggle in Admin Navbar */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-slate-800 hover:bg-slate-700 text-[#F5B800] border border-slate-700 text-xs font-semibold cursor-pointer transition-colors"
            title="Toggle English / বাংলা"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{isBn ? 'English' : 'বাংলা'}</span>
          </button>

          {/* Live Website Preview Link */}
          <button
            onClick={() => onNavigate({ view: 'home' })}
            className="px-3 py-1.5 rounded-sm bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">{isBn ? 'ওয়েবসাইট দেখুন' : 'View Live Website'}</span>
          </button>

          {/* User Profile */}
          <div className="hidden lg:flex items-center gap-2 pl-2 border-l border-slate-800 text-xs">
            <div className="w-7 h-7 rounded-full bg-cyan-900 border border-cyan-400 flex items-center justify-center font-bold text-cyan-200 text-xs">
              A
            </div>
            <div className="leading-tight">
              <p className="font-semibold text-white">{adminUser?.name || (isBn ? 'অ্যাডমিনিস্ট্রেটর' : 'Administrator')}</p>
              <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {isBn ? 'সুপার অ্যাডমিন' : 'Super Admin'}
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
            <span className="hidden sm:inline">{isBn ? 'লগ আউট' : 'Logout'}</span>
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
          onOpenAddMainMenu={() => {
            setEditingMainMenu(null);
            setMainMenuForm({
              id: '',
              label: '',
              labelBn: '',
              slug: '',
              iconName: 'Layers',
              routeView: 'resources' as NavigationMenuItem['routeView'],
              description: '',
            });
            setMainMenuModalOpen(true);
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
                  <p className="text-xs text-slate-400">Total {blogPosts.length} published engineering articles and casting whitepapers with bi-directional English & Bengali translation.</p>
                </div>
                <button
                  onClick={handleOpenAddPaper}
                  className="px-3.5 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs font-bold rounded shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Create Technical Paper</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {blogPosts.map(post => (
                  <div key={post.slug} className="p-4 rounded-md bg-[#0C1527] border border-slate-800 space-y-3 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono">
                          {post.date} · {post.readTime}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditPaper(post)}
                            className="text-cyan-400 hover:text-cyan-300 p-1 rounded hover:bg-slate-800 cursor-pointer"
                            title="Edit Paper"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete paper "${post.title}"?`)) {
                                deleteBlogPost(post.slug);
                              }
                            }}
                            className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-slate-800 cursor-pointer"
                            title="Delete Paper"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <h3 className="font-bold text-white text-sm line-clamp-2">
                        {post.title}
                      </h3>
                      {post.titleBn && (
                        <p className="text-xs text-cyan-300 line-clamp-1">
                          🇧🇩 {post.titleBn}
                        </p>
                      )}
                      <p className="text-xs text-slate-400 line-clamp-2">{post.excerpt}</p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-2 border-t border-slate-800/80">
                      <span>Author: {post.author}</span>
                      <span className="text-slate-400">{post.category}</span>
                    </div>
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

          {/* TAB 12: TECHNICAL VIDEOS MANAGEMENT */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h1 className="text-xl font-bold text-white flex items-center gap-2">
                    <Video className="w-5 h-5 text-cyan-400" />
                    <span>{isBn ? 'কারিগরি ভিডিও ও প্রসেস মিডিয়া' : 'Technical Videos & Process Media'}</span>
                  </h1>
                  <p className="text-xs text-slate-400">
                    {isBn 
                      ? 'রিসোর্সেস সেকশনে প্রদর্শিত ফাউন্ড্রি ও মেশিনিং ভিডিও পরিচালনা করুন' 
                      : 'Manage technical process videos displayed under Resources > Technical Videos.'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingVideo(null);
                      setVideoForm({
                        id: `vid-${Date.now().toString(36)}`,
                        title: '',
                        titleBn: '',
                        category: 'Foundry & Metallurgy',
                        categoryBn: 'ফাউন্ড্রি ও ধাতুবিদ্যা',
                        description: '',
                        descriptionBn: '',
                        videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
                        thumbnailUrl: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=1200&q=80',
                        duration: '04:15',
                        tags: ['Centrifugal', 'Foundry', 'MetalTek BD'],
                      });
                      setVideoLangTab('en');
                      setVideoModalOpen(true);
                    }}
                    className="px-3.5 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-semibold rounded-sm shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isBn ? 'নতুন ভিডিও যুক্ত করুন' : 'Add Technical Video'}</span>
                  </button>
                </div>
              </div>

              {/* Videos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {videos.map((vid) => (
                  <div
                    key={vid.id}
                    className="bg-[#0C1527] border border-slate-800 rounded-lg overflow-hidden flex flex-col hover:border-cyan-500/40 transition-colors group"
                  >
                    <div className="relative aspect-video bg-slate-900 overflow-hidden">
                      <img
                        src={vid.thumbnailUrl}
                        alt={vid.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950/90 text-cyan-300 border border-cyan-500/40">
                          {isBn && vid.categoryBn ? vid.categoryBn : vid.category}
                        </span>
                      </div>
                      <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 text-white font-mono text-[11px] font-semibold border border-white/10">
                        {vid.duration}
                      </div>
                      <button
                        onClick={() => setVideoPreviewItem(vid)}
                        className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-cyan-500/80 hover:bg-cyan-400 text-white flex items-center justify-center shadow-lg transition-transform hover:scale-110 cursor-pointer"
                        title="Preview Video"
                      >
                        <Play className="w-5 h-5 ml-0.5 fill-current" />
                      </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors">
                            {isBn && vid.titleBn ? vid.titleBn : vid.title}
                          </h3>
                        </div>
                        {isBn && vid.title && vid.titleBn && (
                          <p className="text-[11px] text-slate-500 font-medium">EN: {vid.title}</p>
                        )}
                        {!isBn && vid.titleBn && (
                          <p className="text-[11px] text-slate-500 font-medium font-bengali">বাংলা: {vid.titleBn}</p>
                        )}
                        <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                          {isBn && vid.descriptionBn ? vid.descriptionBn : vid.description}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-800/80">
                        <div className="flex flex-wrap gap-1">
                          {(vid.tags || []).map((t, i) => (
                            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                              #{t}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] font-mono text-slate-500 truncate max-w-[180px]">
                            {vid.videoUrl}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingVideo(vid);
                                setVideoForm({ ...vid });
                                setVideoLangTab('en');
                                setVideoModalOpen(true);
                              }}
                              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit className="w-3 h-3" />
                              <span>{isBn ? 'সম্পাদনা' : 'Edit'}</span>
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(isBn ? `ভিডিও "${vid.title}" মুছে ফেলতে চান?` : `Delete video "${vid.title}"?`)) {
                                  deleteVideo(vid.id);
                                }
                              }}
                              className="px-2.5 py-1 rounded bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 13: SUBMENU & OVERVIEW CARDS (PROCESS, CAPABILITY, MARKET) */}
          {activeTab === 'cards' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h1 className="text-xl font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>{isBn ? 'সাবমেনু ও ওভারভিউ কার্ড ম্যানেজমেন্ট' : 'Submenu & Overview Cards Management'}</span>
                  </h1>
                  <p className="text-xs text-slate-400">
                    {isBn
                      ? 'কাস্টিং প্রসেস, ক্যাপাবিলিটি ও মার্কেট সেক্টর কার্ডের দ্বৈতভাষিক কন্টেন্ট সরাসরি সম্পাদনা করুন'
                      : 'Live editing of dual-language cards for casting processes, foundry capabilities, and market sectors.'}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {cardsSubTab === 'process' && (
                    <button
                      onClick={() => {
                        setEditingProcessCard(null);
                        setProcessForm({
                          slug: `process-${Date.now().toString(36)}`,
                          title: '',
                          titleBn: '',
                          summary: '',
                          summaryBn: '',
                          description: '',
                          descriptionBn: '',
                          heroHeadline: '',
                          heroHeadlineBn: '',
                          sizeLimits: '',
                          sizeLimitsBn: '',
                          weightRange: '',
                          weightRangeBn: '',
                          tolerances: '',
                          tolerancesBn: '',
                          typicalComponents: [],
                          typicalComponentsBn: [],
                          suitableAlloys: ['Stainless Steel', 'Nickel Superalloy'],
                          industriesServed: ['Energy', 'Aerospace'],
                        });
                        setProcessLangTab('en');
                        setProcessModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold rounded-sm shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isBn ? 'নতুন প্রসেস কার্ড' : 'Add Process Card'}</span>
                    </button>
                  )}
                  {cardsSubTab === 'capability' && (
                    <button
                      onClick={() => {
                        setEditingCapabilityCard(null);
                        setCapabilityForm({
                          slug: `capability-${Date.now().toString(36)}`,
                          title: '',
                          titleBn: '',
                          iconName: 'Flame',
                          summary: '',
                          summaryBn: '',
                          description: '',
                          descriptionBn: '',
                          equipmentHighlights: [],
                          equipmentHighlightsBn: [],
                          specifications: [],
                          specificationsBn: [],
                          standards: ['ASTM', 'ASME Section IX'],
                        });
                        setCapabilityLangTab('en');
                        setCapabilityModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-sm shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isBn ? 'নতুন ক্যাপাবিলিটি কার্ড' : 'Add Capability Card'}</span>
                    </button>
                  )}
                  {cardsSubTab === 'market' && (
                    <button
                      onClick={() => {
                        setEditingMarketCard(null);
                        setMarketForm({
                          slug: `market-${Date.now().toString(36)}`,
                          title: '',
                          titleBn: '',
                          categoryTag: '',
                          categoryTagBn: '',
                          summary: '',
                          summaryBn: '',
                          challenges: '',
                          challengesBn: '',
                          solutions: '',
                          solutionsBn: '',
                          componentsSupplied: [],
                          componentsSuppliedBn: [],
                          recommendedAlloys: ['CF8M', 'Inconel 625'],
                          salesContactMarketSlug: 'general',
                        });
                        setMarketLangTab('en');
                        setMarketModalOpen(true);
                      }}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-sm shadow-xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isBn ? 'নতুন মার্কেট কার্ড' : 'Add Market Solution Card'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Category Sub-Tabs Navigation */}
              <div className="flex border-b border-slate-800 gap-2">
                <button
                  onClick={() => setCardsSubTab('process')}
                  className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                    cardsSubTab === 'process'
                      ? 'border-cyan-400 text-cyan-300 bg-cyan-950/20'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>{isBn ? 'কাস্টিং প্রসেস কার্ডস' : 'Casting Process Cards'} ({processCards.length})</span>
                </button>
                <button
                  onClick={() => setCardsSubTab('capability')}
                  className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                    cardsSubTab === 'capability'
                      ? 'border-blue-400 text-blue-300 bg-blue-950/20'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  <span>{isBn ? 'ফাউন্ড্রি ক্যাপাবিলিটি কার্ডস' : 'Foundry Capabilities'} ({capabilityCards.length})</span>
                </button>
                <button
                  onClick={() => setCardsSubTab('market')}
                  className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 cursor-pointer flex items-center gap-2 ${
                    cardsSubTab === 'market'
                      ? 'border-emerald-400 text-emerald-300 bg-emerald-950/20'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Building className="w-4 h-4" />
                  <span>{isBn ? 'মার্কেট সেক্টর সল্যুশন' : 'Market Sectors'} ({marketCards.length})</span>
                </button>
              </div>

              {/* 1. PROCESS CARDS */}
              {cardsSubTab === 'process' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {processCards.map((pc) => (
                    <div
                      key={pc.slug}
                      className="p-4 rounded-lg bg-[#0C1527] border border-slate-800 hover:border-cyan-500/40 transition-colors flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                            /{pc.slug}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onNavigate({ view: 'metal-casting', subSlug: pc.slug })}
                              className="text-slate-400 hover:text-cyan-300 p-1 cursor-pointer"
                              title="View on Live Website"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingProcessCard(pc);
                                setProcessForm({ ...pc });
                                setProcessLangTab('en');
                                setProcessModalOpen(true);
                              }}
                              className="text-cyan-400 hover:text-cyan-300 p-1 cursor-pointer"
                              title="Edit Card"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete process card "${pc.title}"?`)) {
                                  deleteProcessCard(pc.slug);
                                }
                              }}
                              className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                              title="Delete Card"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <h3 className="font-bold text-white text-base mt-2">
                          {isBn && pc.titleBn ? pc.titleBn : pc.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {isBn ? `EN: ${pc.title}` : (pc.titleBn ? `বাংলা: ${pc.titleBn}` : '')}
                        </p>
                        <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                          {isBn && pc.summaryBn ? pc.summaryBn : pc.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 space-y-1.5 text-[11px]">
                        <div className="flex justify-between text-slate-400">
                          <span>{isBn ? 'সাইজ লিমিট:' : 'Size Limits:'}</span>
                          <span className="text-slate-200 font-medium">{isBn && pc.sizeLimitsBn ? pc.sizeLimitsBn : pc.sizeLimits}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>{isBn ? 'ওজন সীমা:' : 'Weight Range:'}</span>
                          <span className="text-slate-200 font-medium">{isBn && pc.weightRangeBn ? pc.weightRangeBn : pc.weightRange}</span>
                        </div>
                        <div className="flex justify-between text-slate-400">
                          <span>{isBn ? 'টলারেন্স:' : 'Tolerances:'}</span>
                          <span className="text-slate-200 font-medium">{isBn && pc.tolerancesBn ? pc.tolerancesBn : pc.tolerances}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 2. CAPABILITY CARDS */}
              {cardsSubTab === 'capability' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {capabilityCards.map((cap) => (
                    <div
                      key={cap.slug}
                      className="p-4 rounded-lg bg-[#0C1527] border border-slate-800 hover:border-blue-500/40 transition-colors flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/30">
                            /{cap.slug}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onNavigate({ view: 'capabilities', subSlug: cap.slug })}
                              className="text-slate-400 hover:text-blue-300 p-1 cursor-pointer"
                              title="View on Live Website"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingCapabilityCard(cap);
                                setCapabilityForm({ ...cap });
                                setCapabilityLangTab('en');
                                setCapabilityModalOpen(true);
                              }}
                              className="text-blue-400 hover:text-blue-300 p-1 cursor-pointer"
                              title="Edit Card"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete capability "${cap.title}"?`)) {
                                  deleteCapabilityCard(cap.slug);
                                }
                              }}
                              className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                              title="Delete Card"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <h3 className="font-bold text-white text-base mt-2">
                          {isBn && cap.titleBn ? cap.titleBn : cap.title}
                        </h3>
                        <p className="text-[11px] text-slate-500 font-mono">
                          {isBn ? `EN: ${cap.title}` : (cap.titleBn ? `বাংলা: ${cap.titleBn}` : '')}
                        </p>
                        <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                          {isBn && cap.summaryBn ? cap.summaryBn : cap.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 space-y-1 text-[11px]">
                        <span className="text-slate-400 block font-semibold">{isBn ? 'যন্ত্রপাতি ও ইকুইপমেন্ট:' : 'Equipment Highlights:'}</span>
                        <div className="flex flex-wrap gap-1">
                          {(isBn && cap.equipmentHighlightsBn && cap.equipmentHighlightsBn.length > 0 ? cap.equipmentHighlightsBn : cap.equipmentHighlights).slice(0, 3).map((eq, i) => (
                            <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                              {eq}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* 3. MARKET CARDS */}
              {cardsSubTab === 'market' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {marketCards.map((m) => (
                    <div
                      key={m.slug}
                      className="p-4 rounded-lg bg-[#0C1527] border border-slate-800 hover:border-emerald-500/40 transition-colors flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                            /{m.slug}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onNavigate({ view: 'market-solutions', subSlug: m.slug })}
                              className="text-slate-400 hover:text-emerald-300 p-1 cursor-pointer"
                              title="View on Live Website"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                setEditingMarketCard(m);
                                setMarketForm({ ...m });
                                setMarketLangTab('en');
                                setMarketModalOpen(true);
                              }}
                              className="text-emerald-400 hover:text-emerald-300 p-1 cursor-pointer"
                              title="Edit Card"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete market solution "${m.title}"?`)) {
                                  deleteMarketCard(m.slug);
                                }
                              }}
                              className="text-rose-400 hover:text-rose-300 p-1 cursor-pointer"
                              title="Delete Card"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="mt-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded">
                            {isBn && m.categoryTagBn ? m.categoryTagBn : m.categoryTag || 'Industrial Sector'}
                          </span>
                          <h3 className="font-bold text-white text-base mt-1.5">
                            {isBn && m.titleBn ? m.titleBn : m.title}
                          </h3>
                          <p className="text-[11px] text-slate-500 font-mono">
                            {isBn ? `EN: ${m.title}` : (m.titleBn ? `বাংলা: ${m.titleBn}` : '')}
                          </p>
                        </div>

                        <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                          {isBn && m.summaryBn ? m.summaryBn : m.summary}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 space-y-1 text-[11px]">
                        <span className="text-slate-400 block font-semibold">{isBn ? 'মূল সমাধান:' : 'Key Solution:'}</span>
                        <p className="text-slate-300 line-clamp-2">
                          {isBn && m.solutionsBn ? m.solutionsBn : m.solutions}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

      {/* 5. Technical Paper & Article Bi-Lingual Modal */}
      {paperModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0F1B2D]/80 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-[#0C1527] border border-slate-700 rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
            <div className="bg-[#091122] px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white tracking-wide">
                    {editingPaperSlug ? 'Edit Technical Paper / Article' : 'Create New Technical Paper / Article'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    Dual-Language Input with Bi-Directional Auto-Translation & Formatting Preservation
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPaperModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePaper} className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Language Toolbar */}
              <div className="bg-slate-900/90 p-3 rounded border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Languages className="w-4 h-4 text-cyan-400" />
                    Input Language:
                  </span>
                  <div className="inline-flex rounded p-1 bg-slate-800 border border-slate-700">
                    <button
                      type="button"
                      onClick={() => setPaperLangTab('en')}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                        paperLangTab === 'en'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      English (EN)
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaperLangTab('bn')}
                      className={`px-3 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                        paperLangTab === 'bn'
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'text-slate-300 hover:text-white'
                      }`}
                    >
                      বাংলা (BN)
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAutoTranslatePaper}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-extrabold rounded shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  title="Auto-translate entire article into the other language"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>
                    {paperLangTab === 'en' ? '✨ Auto-Translate to বাংলা' : '✨ Auto-Translate to English'}
                  </span>
                </button>
              </div>

              {/* Title & Category */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
                    <span>
                      {paperLangTab === 'en' ? 'Article Title (English)' : 'নিবন্ধের শিরোনাম (বাংলা)'} *
                    </span>
                    <span className="text-[10px] text-cyan-400 font-mono">
                      {paperLangTab === 'en' ? 'EN' : 'BN'}
                    </span>
                  </label>
                  <input
                    type="text"
                    value={paperLangTab === 'en' ? paperTitleEn : paperTitleBn}
                    onChange={(e) => {
                      if (paperLangTab === 'en') setPaperTitleEn(e.target.value);
                      else setPaperTitleBn(e.target.value);
                    }}
                    placeholder={
                      paperLangTab === 'en'
                        ? 'e.g. Centrifugal Casting Solidification Principles for Severe Duty Cylinders'
                        : 'যেমন: কঠিন ব্যবহারের জন্য সেন্ট্রিফিউগাল কাস্টিং ঘনীভবন নীতি'
                    }
                    className="w-full px-3.5 py-2.5 bg-[#091122] border border-slate-700 rounded text-sm text-white font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      {paperLangTab === 'en' ? 'Category Tag (English)' : 'বিভাগীয় ট্যাগ (বাংলা)'}
                    </label>
                    <input
                      type="text"
                      value={paperLangTab === 'en' ? paperCategoryEn : paperCategoryBn}
                      onChange={(e) => {
                        if (paperLangTab === 'en') setPaperCategoryEn(e.target.value);
                        else setPaperCategoryBn(e.target.value);
                      }}
                      placeholder="e.g. Technical Metallurgy"
                      className="w-full px-3 py-2 bg-[#091122] border border-slate-700 rounded text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Author / Organization
                    </label>
                    <input
                      type="text"
                      value={paperAuthor}
                      onChange={(e) => setPaperAuthor(e.target.value)}
                      placeholder="e.g. Lead Foundry Metallurgist"
                      className="w-full px-3 py-2 bg-[#091122] border border-slate-700 rounded text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    {paperLangTab === 'en' ? 'Short Excerpt / Abstract (English)' : 'সংক্ষিপ্ত সারাংশ (বাংলা)'}
                  </label>
                  <input
                    type="text"
                    value={paperLangTab === 'en' ? paperExcerptEn : paperExcerptBn}
                    onChange={(e) => {
                      if (paperLangTab === 'en') setPaperExcerptEn(e.target.value);
                      else setPaperExcerptBn(e.target.value);
                    }}
                    placeholder={
                      paperLangTab === 'en'
                        ? 'Key technical takeaway for engineering clients...'
                        : 'ইঞ্জিনিয়ারিং ক্লায়েন্টদের জন্য মূল কারিগরি তথ্য...'
                    }
                    className="w-full px-3.5 py-2 bg-[#091122] border border-slate-700 rounded text-xs text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Content Paragraphs */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                  <span>
                    {paperLangTab === 'en' ? 'Full Article Content (English)' : 'সম্পূর্ণ নিবন্ধের বিস্তারিত বিবরণ (বাংলা)'}
                  </span>
                  <span className="text-[10px] text-slate-400">Separate paragraphs with blank lines</span>
                </label>
                <textarea
                  rows={8}
                  value={paperLangTab === 'en' ? paperContentEn : paperContentBn}
                  onChange={(e) => {
                    if (paperLangTab === 'en') setPaperContentEn(e.target.value);
                    else setPaperContentBn(e.target.value);
                  }}
                  placeholder={
                    paperLangTab === 'en'
                      ? 'Write paragraph 1 here...\n\nWrite paragraph 2 here with metallurgical details and casting parameters...'
                      : 'এখানে প্রথম অনুচ্ছেদ লিখুন...\n\nএখানে ধাতুবিদ্যা সংক্রান্ত বিস্তারিত ও কাস্টিং প্যারামিটারসহ দ্বিতীয় অনুচ্ছেদ লিখুন...'
                  }
                  className="w-full px-3.5 py-2.5 bg-[#091122] border border-slate-700 rounded text-xs text-white font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Dual-language versions will automatically sync with the user panel
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPaperModalOpen(false)}
                    className="px-4 py-2 border border-slate-700 rounded text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white text-xs font-bold rounded shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Publish Dual-Language Paper</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT MAIN MENU */}
      {mainMenuModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-[#0C1527] border border-cyan-500/40 rounded-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>{editingMainMenu ? (isBn ? 'মেনু সম্পাদনা' : 'Edit Main Menu') : (isBn ? 'নতুন মেইন মেনু যুক্ত করুন' : 'Add New Main Navigation Menu')}</span>
              </h3>
              <button onClick={() => setMainMenuModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!mainMenuForm.label.trim()) {
                  alert('Menu English label is required');
                  return;
                }
                const menuId = editingMainMenu
                  ? editingMainMenu.id
                  : (mainMenuForm.id.trim() || mainMenuForm.label.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                
                const labelBn = mainMenuForm.labelBn.trim() || translateBiDirectional(mainMenuForm.label, 'bn');

                if (editingMainMenu) {
                  updateMainMenu(editingMainMenu.id, {
                    label: mainMenuForm.label,
                    labelBn,
                    iconName: mainMenuForm.iconName,
                    routeView: mainMenuForm.routeView,
                    description: mainMenuForm.description,
                  });
                } else {
                  addMainMenu({
                    id: menuId,
                    label: mainMenuForm.label,
                    labelBn,
                    iconName: mainMenuForm.iconName,
                    routeView: mainMenuForm.routeView,
                    description: mainMenuForm.description,
                    subItems: [],
                  });
                }
                setMainMenuModalOpen(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-xs font-semibold text-slate-300">Menu Label (English)</label>
                <input
                  type="text"
                  required
                  value={mainMenuForm.label}
                  onChange={(e) => setMainMenuForm({ ...mainMenuForm, label: e.target.value })}
                  placeholder="e.g. Innovations"
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Menu Label (বাংলা - Bengali)</label>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={mainMenuForm.labelBn}
                    onChange={(e) => setMainMenuForm({ ...mainMenuForm, labelBn: e.target.value })}
                    placeholder="e.g. উদ্ভাবন ও প্রযুক্তি"
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white font-bengali"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (mainMenuForm.label) {
                        setMainMenuForm({ ...mainMenuForm, labelBn: translateBiDirectional(mainMenuForm.label, 'bn') });
                      }
                    }}
                    className="px-2.5 py-2 bg-cyan-950 border border-cyan-500/40 text-cyan-300 hover:bg-cyan-900 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    title="Auto-translate"
                  >
                    <Wand2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Target Route View</label>
                <select
                  value={mainMenuForm.routeView}
                  onChange={(e) => setMainMenuForm({ ...mainMenuForm, routeView: e.target.value as NavigationMenuItem['routeView'] })}
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                >
                  <option value="metal-casting">Metal Casting Processes (/metal-casting)</option>
                  <option value="capabilities">Foundry Capabilities (/capabilities)</option>
                  <option value="alloys">Materials & Alloys (/alloys)</option>
                  <option value="market-solutions">Market & Sector Solutions (/market-solutions)</option>
                  <option value="resources">Resources & Technical Media (/resources)</option>
                  <option value="about-us">About Us & Overview (/about-us)</option>
                  <option value="contact-us">Contact & Inquiries (/contact-us)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Icon</label>
                <select
                  value={mainMenuForm.iconName}
                  onChange={(e) => setMainMenuForm({ ...mainMenuForm, iconName: e.target.value })}
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                >
                  <option value="Layers">Layers (Stack)</option>
                  <option value="Flame">Flame (Fire / Foundry)</option>
                  <option value="Wrench">Wrench (Engineering / CNC)</option>
                  <option value="Building">Building (Industrial Facilities)</option>
                  <option value="FolderOpen">FolderOpen (Resources)</option>
                  <option value="FileText">FileText (Reports & Specs)</option>
                  <option value="Sparkles">Sparkles (Quality & Innovation)</option>
                  <option value="Video">Video (Media Hub)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Brief Description</label>
                <input
                  type="text"
                  value={mainMenuForm.description}
                  onChange={(e) => setMainMenuForm({ ...mainMenuForm, description: e.target.value })}
                  placeholder="e.g. Next-generation metallurgical solutions"
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMainMenuModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-700 rounded text-xs text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isBn ? 'সংরক্ষণ করুন' : 'Save Main Menu'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT VIDEO */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0C1527] border border-cyan-500/40 rounded-lg p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">
                  {editingVideo ? (isBn ? 'ভিডিও বিবরণ সম্পাদনা' : 'Edit Technical Video') : (isBn ? 'নতুন টেকনিক্যাল ভিডিও যুক্ত করুন' : 'Add Technical Video')}
                </h3>
              </div>
              <button onClick={() => setVideoModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Language Tabs & Auto-Translate */}
            <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded border border-slate-800">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setVideoLangTab('en')}
                  className={`px-3 py-1 rounded text-xs font-bold cursor-pointer transition-all ${
                    videoLangTab === 'en' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  English Fields
                </button>
                <button
                  type="button"
                  onClick={() => setVideoLangTab('bn')}
                  className={`px-3 py-1 rounded text-xs font-bold cursor-pointer transition-all ${
                    videoLangTab === 'bn' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  বাংলা বিবরণ (Bengali)
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  const translated = autoTranslateVideoFields(videoForm);
                  setVideoForm(translated);
                  setVideoLangTab(videoLangTab === 'en' ? 'bn' : 'en');
                }}
                className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded flex items-center gap-1.5 shadow-sm cursor-pointer"
                title="Automatically translate missing fields using metallurgy dictionary"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>{isBn ? 'স্বয়ংক্রিয় অনুবাদ (AI)' : 'Auto-Translate (AI)'}</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const ready = autoTranslateVideoFields(videoForm);
                if (editingVideo) {
                  updateVideo(editingVideo.id, ready);
                } else {
                  addVideo(ready);
                }
                setVideoModalOpen(false);
              }}
              className="space-y-3.5"
            >
              {videoLangTab === 'en' ? (
                <>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Video Title (English)</label>
                    <input
                      type="text"
                      required
                      value={videoForm.title}
                      onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                      placeholder="e.g. Centrifugal Casting: Molten Metal Pouring at 1,600°C"
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Category (English)</label>
                    <input
                      type="text"
                      value={videoForm.category}
                      onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                      placeholder="e.g. Foundry & Pouring Processes"
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">Description (English)</label>
                    <textarea
                      rows={3}
                      value={videoForm.description}
                      onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                      placeholder="Describe the technical process, metallurgy highlights, temperature, or equipment..."
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">ভিডিও শিরোনাম (বাংলা)</label>
                    <input
                      type="text"
                      value={videoForm.titleBn || ''}
                      onChange={(e) => setVideoForm({ ...videoForm, titleBn: e.target.value })}
                      placeholder="যেমন: সেন্ট্রিফিউগাল কাস্টিং: ১৬০০ ডিগ্রি সেলসিয়াসে তরল ধাতু ঢালাই প্রক্রিয়া"
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white font-bengali"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">ক্যাটাগরি (বাংলা)</label>
                    <input
                      type="text"
                      value={videoForm.categoryBn || ''}
                      onChange={(e) => setVideoForm({ ...videoForm, categoryBn: e.target.value })}
                      placeholder="যেমন: ফাউন্ড্রি ও ঢালাই প্রক্রিয়া"
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white font-bengali"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300">বিস্তারিত বিবরণ (বাংলা)</label>
                    <textarea
                      rows={3}
                      value={videoForm.descriptionBn || ''}
                      onChange={(e) => setVideoForm({ ...videoForm, descriptionBn: e.target.value })}
                      placeholder="প্রক্রিয়াটির কারিগরি বিবরণ, তাপমাত্রা এবং রাসায়নিক বৈশিষ্ট্যাবলী লিখুন..."
                      className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white font-bengali"
                    />
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Video URL (YouTube or Direct MP4)</label>
                  <input
                    type="url"
                    required
                    value={videoForm.videoUrl}
                    onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">Duration (e.g. 03:45)</label>
                  <input
                    type="text"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    placeholder="03:45"
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Thumbnail Image URL</label>
                <input
                  type="url"
                  value={videoForm.thumbnailUrl}
                  onChange={(e) => setVideoForm({ ...videoForm, thumbnailUrl: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">Tags (comma-separated)</label>
                <input
                  type="text"
                  value={(videoForm.tags || []).join(', ')}
                  onChange={(e) => setVideoForm({
                    ...videoForm,
                    tags: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                  })}
                  placeholder="Centrifugal, Foundry, Quality Testing"
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setVideoModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-700 rounded text-xs text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isBn ? 'ভিডিও সংরক্ষণ করুন' : 'Save Technical Video'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIDEO PREVIEW PLAYER */}
      {videoPreviewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="w-full max-w-3xl bg-[#0B1528] border border-cyan-500/40 rounded-xl overflow-hidden shadow-2xl space-y-4 p-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <Video className="w-4 h-4 text-cyan-400" />
                <span>{isBn && videoPreviewItem.titleBn ? videoPreviewItem.titleBn : videoPreviewItem.title}</span>
              </h3>
              <button onClick={() => setVideoPreviewItem(null)} className="text-slate-400 hover:text-white p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center">
              {videoPreviewItem.videoUrl.includes('youtube.com') || videoPreviewItem.videoUrl.includes('youtu.be') ? (
                <iframe
                  src={
                    videoPreviewItem.videoUrl.includes('watch?v=')
                      ? videoPreviewItem.videoUrl.replace('watch?v=', 'embed/').split('&')[0]
                      : videoPreviewItem.videoUrl
                  }
                  title={videoPreviewItem.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : (
                <video
                  src={videoPreviewItem.videoUrl}
                  controls
                  autoPlay
                  poster={videoPreviewItem.thumbnailUrl}
                  className="w-full h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {isBn && videoPreviewItem.descriptionBn ? videoPreviewItem.descriptionBn : videoPreviewItem.description}
            </p>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD PROCESS CARD */}
      {processModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0C1527] border border-cyan-500/40 rounded-lg p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>{editingProcessCard ? (isBn ? 'প্রসেস কার্ড সম্পাদনা' : 'Edit Process Card') : (isBn ? 'নতুন প্রসেস কার্ড' : 'Add Casting Process Card')}</span>
              </h3>
              <button onClick={() => setProcessModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded border border-slate-800">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setProcessLangTab('en')}
                  className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                    processLangTab === 'en' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  English Content
                </button>
                <button
                  type="button"
                  onClick={() => setProcessLangTab('bn')}
                  className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                    processLangTab === 'bn' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  বাংলা কন্টেন্ট (Bengali)
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  const translated = autoTranslateProcessFields(processForm);
                  setProcessForm(translated);
                  setProcessLangTab(processLangTab === 'en' ? 'bn' : 'en');
                }}
                className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>{isBn ? 'অনুবাদ সমন্বয় (AI)' : 'Auto-Translate (AI)'}</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const ready = autoTranslateProcessFields(processForm);
                if (editingProcessCard) {
                  updateProcessCard(editingProcessCard.slug, ready);
                } else {
                  addProcessCard(ready);
                }
                setProcessModalOpen(false);
              }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Slug Identifier</label>
                  <input
                    type="text"
                    required
                    value={processForm.slug}
                    onChange={(e) => setProcessForm({ ...processForm, slug: e.target.value })}
                    placeholder="e.g. centrifugal-casting"
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">
                    {processLangTab === 'en' ? 'Process Title (English)' : 'প্রসেস শিরোনাম (বাংলা)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={processLangTab === 'en' ? processForm.title : (processForm.titleBn || '')}
                    onChange={(e) => {
                      if (processLangTab === 'en') setProcessForm({ ...processForm, title: e.target.value });
                      else setProcessForm({ ...processForm, titleBn: e.target.value });
                    }}
                    placeholder={processLangTab === 'en' ? 'e.g. Centrifugal Casting' : 'যেমন: সেন্ট্রিফিউগাল কাস্টিং'}
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">
                  {processLangTab === 'en' ? 'Summary (Overview Card Text)' : 'সারসংক্ষেপ (কার্ডের বিবরণ)'}
                </label>
                <textarea
                  rows={2}
                  required
                  value={processLangTab === 'en' ? processForm.summary : (processForm.summaryBn || '')}
                  onChange={(e) => {
                    if (processLangTab === 'en') setProcessForm({ ...processForm, summary: e.target.value });
                    else setProcessForm({ ...processForm, summaryBn: e.target.value });
                  }}
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">
                  {processLangTab === 'en' ? 'Hero Headline' : 'হিরো হেডলাইন'}
                </label>
                <input
                  type="text"
                  value={processLangTab === 'en' ? processForm.heroHeadline : (processForm.heroHeadlineBn || '')}
                  onChange={(e) => {
                    if (processLangTab === 'en') setProcessForm({ ...processForm, heroHeadline: e.target.value });
                    else setProcessForm({ ...processForm, heroHeadlineBn: e.target.value });
                  }}
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">
                    {processLangTab === 'en' ? 'Size Limits' : 'সাইজ লিমিট'}
                  </label>
                  <input
                    type="text"
                    value={processLangTab === 'en' ? processForm.sizeLimits : (processForm.sizeLimitsBn || '')}
                    onChange={(e) => {
                      if (processLangTab === 'en') setProcessForm({ ...processForm, sizeLimits: e.target.value });
                      else setProcessForm({ ...processForm, sizeLimitsBn: e.target.value });
                    }}
                    placeholder="OD up to 130 in (3,300 mm)"
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">
                    {processLangTab === 'en' ? 'Weight Range' : 'ওজন সীমা'}
                  </label>
                  <input
                    type="text"
                    value={processLangTab === 'en' ? processForm.weightRange : (processForm.weightRangeBn || '')}
                    onChange={(e) => {
                      if (processLangTab === 'en') setProcessForm({ ...processForm, weightRange: e.target.value });
                      else setProcessForm({ ...processForm, weightRangeBn: e.target.value });
                    }}
                    placeholder="10 lbs to 80,000 lbs"
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">
                    {processLangTab === 'en' ? 'Tolerances' : 'টলারেন্স'}
                  </label>
                  <input
                    type="text"
                    value={processLangTab === 'en' ? processForm.tolerances : (processForm.tolerancesBn || '')}
                    onChange={(e) => {
                      if (processLangTab === 'en') setProcessForm({ ...processForm, tolerances: e.target.value });
                      else setProcessForm({ ...processForm, tolerancesBn: e.target.value });
                    }}
                    placeholder="±0.005 in (0.127 mm)"
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">
                  {processLangTab === 'en' ? 'Full Description' : 'সম্পূর্ণ কারিগরি বিবরণ'}
                </label>
                <textarea
                  rows={4}
                  value={processLangTab === 'en' ? processForm.description : (processForm.descriptionBn || '')}
                  onChange={(e) => {
                    if (processLangTab === 'en') setProcessForm({ ...processForm, description: e.target.value });
                    else setProcessForm({ ...processForm, descriptionBn: e.target.value });
                  }}
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setProcessModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-700 rounded text-xs text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Process Card</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD CAPABILITY CARD */}
      {capabilityModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0C1527] border border-blue-500/40 rounded-lg p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Flame className="w-4 h-4 text-blue-400" />
                <span>{editingCapabilityCard ? (isBn ? 'ক্যাপাবিলিটি কার্ড সম্পাদনা' : 'Edit Capability Card') : (isBn ? 'নতুন ক্যাপাবিলিটি কার্ড' : 'Add Capability Card')}</span>
              </h3>
              <button onClick={() => setCapabilityModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded border border-slate-800">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCapabilityLangTab('en')}
                  className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                    capabilityLangTab === 'en' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  English Content
                </button>
                <button
                  type="button"
                  onClick={() => setCapabilityLangTab('bn')}
                  className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                    capabilityLangTab === 'bn' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  বাংলা কন্টেন্ট (Bengali)
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  const translated = autoTranslateCapabilityFields(capabilityForm);
                  setCapabilityForm(translated);
                  setCapabilityLangTab(capabilityLangTab === 'en' ? 'bn' : 'en');
                }}
                className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>{isBn ? 'অনুবাদ সমন্বয় (AI)' : 'Auto-Translate (AI)'}</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const ready = autoTranslateCapabilityFields(capabilityForm);
                if (editingCapabilityCard) {
                  updateCapabilityCard(editingCapabilityCard.slug, ready);
                } else {
                  addCapabilityCard(ready);
                }
                setCapabilityModalOpen(false);
              }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Slug Identifier</label>
                  <input
                    type="text"
                    required
                    value={capabilityForm.slug}
                    onChange={(e) => setCapabilityForm({ ...capabilityForm, slug: e.target.value })}
                    placeholder="e.g. 10-ton-aod-refining"
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">
                    {capabilityLangTab === 'en' ? 'Capability Title (English)' : 'ক্যাপাবিলিটি শিরোনাম (বাংলা)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={capabilityLangTab === 'en' ? capabilityForm.title : (capabilityForm.titleBn || '')}
                    onChange={(e) => {
                      if (capabilityLangTab === 'en') setCapabilityForm({ ...capabilityForm, title: e.target.value });
                      else setCapabilityForm({ ...capabilityForm, titleBn: e.target.value });
                    }}
                    placeholder={capabilityLangTab === 'en' ? 'e.g. 10-Ton AOD Vessel Refining' : 'যেমন: ১০-টন এওডি ভেসেল পরিশোধন'}
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">
                  {capabilityLangTab === 'en' ? 'Summary' : 'সারসংক্ষেপ'}
                </label>
                <textarea
                  rows={2}
                  required
                  value={capabilityLangTab === 'en' ? capabilityForm.summary : (capabilityForm.summaryBn || '')}
                  onChange={(e) => {
                    if (capabilityLangTab === 'en') setCapabilityForm({ ...capabilityForm, summary: e.target.value });
                    else setCapabilityForm({ ...capabilityForm, summaryBn: e.target.value });
                  }}
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">
                  {capabilityLangTab === 'en' ? 'Description' : 'বিস্তারিত বিবরণ'}
                </label>
                <textarea
                  rows={4}
                  value={capabilityLangTab === 'en' ? capabilityForm.description : (capabilityForm.descriptionBn || '')}
                  onChange={(e) => {
                    if (capabilityLangTab === 'en') setCapabilityForm({ ...capabilityForm, description: e.target.value });
                    else setCapabilityForm({ ...capabilityForm, descriptionBn: e.target.value });
                  }}
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCapabilityModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-700 rounded text-xs text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Capability Card</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD MARKET SOLUTION CARD */}
      {marketModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-[#0C1527] border border-emerald-500/40 rounded-lg p-6 space-y-4 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Building className="w-4 h-4 text-emerald-400" />
                <span>{editingMarketCard ? (isBn ? 'মার্কেট সল্যুশন সম্পাদনা' : 'Edit Market Solution Card') : (isBn ? 'নতুন মার্কেট সল্যুশন' : 'Add Market Solution Card')}</span>
              </h3>
              <button onClick={() => setMarketModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center justify-between bg-slate-900/60 p-2 rounded border border-slate-800">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMarketLangTab('en')}
                  className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                    marketLangTab === 'en' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  English Content
                </button>
                <button
                  type="button"
                  onClick={() => setMarketLangTab('bn')}
                  className={`px-3 py-1 rounded text-xs font-bold cursor-pointer ${
                    marketLangTab === 'bn' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  বাংলা কন্টেন্ট (Bengali)
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  const translated = autoTranslateMarketFields(marketForm);
                  setMarketForm(translated);
                  setMarketLangTab(marketLangTab === 'en' ? 'bn' : 'en');
                }}
                className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold rounded flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>{isBn ? 'অনুবাদ সমন্বয় (AI)' : 'Auto-Translate (AI)'}</span>
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const ready = autoTranslateMarketFields(marketForm);
                if (editingMarketCard) {
                  updateMarketCard(editingMarketCard.slug, ready);
                } else {
                  addMarketCard(ready);
                }
                setMarketModalOpen(false);
              }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300">Slug Identifier</label>
                  <input
                    type="text"
                    required
                    value={marketForm.slug}
                    onChange={(e) => setMarketForm({ ...marketForm, slug: e.target.value })}
                    placeholder="e.g. petrochemical-energy"
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300">
                    {marketLangTab === 'en' ? 'Sector Title (English)' : 'সেক্টর শিরোনাম (বাংলা)'}
                  </label>
                  <input
                    type="text"
                    required
                    value={marketLangTab === 'en' ? marketForm.title : (marketForm.titleBn || '')}
                    onChange={(e) => {
                      if (marketLangTab === 'en') setMarketForm({ ...marketForm, title: e.target.value });
                      else setMarketForm({ ...marketForm, titleBn: e.target.value });
                    }}
                    placeholder={marketLangTab === 'en' ? 'e.g. Petrochemical & Energy' : 'যেমন: পেট্রোকেমিক্যাল ও এনার্জি'}
                    className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">
                  {marketLangTab === 'en' ? 'Category Tag' : 'ক্যাটাগরি ট্যাগ'}
                </label>
                <input
                  type="text"
                  value={marketLangTab === 'en' ? (marketForm.categoryTag || '') : (marketForm.categoryTagBn || '')}
                  onChange={(e) => {
                    if (marketLangTab === 'en') setMarketForm({ ...marketForm, categoryTag: e.target.value });
                    else setMarketForm({ ...marketForm, categoryTagBn: e.target.value });
                  }}
                  placeholder="Oil, Gas & Power Generation"
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">
                  {marketLangTab === 'en' ? 'Summary' : 'সারসংক্ষেপ'}
                </label>
                <textarea
                  rows={2}
                  required
                  value={marketLangTab === 'en' ? marketForm.summary : (marketForm.summaryBn || '')}
                  onChange={(e) => {
                    if (marketLangTab === 'en') setMarketForm({ ...marketForm, summary: e.target.value });
                    else setMarketForm({ ...marketForm, summaryBn: e.target.value });
                  }}
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">
                  {marketLangTab === 'en' ? 'Engineering Challenges' : 'ইঞ্জিনিয়ারিং চ্যালেঞ্জসমূহ'}
                </label>
                <textarea
                  rows={2}
                  value={marketLangTab === 'en' ? marketForm.challenges : (marketForm.challengesBn || '')}
                  onChange={(e) => {
                    if (marketLangTab === 'en') setMarketForm({ ...marketForm, challenges: e.target.value });
                    else setMarketForm({ ...marketForm, challengesBn: e.target.value });
                  }}
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300">
                  {marketLangTab === 'en' ? 'Metallurgical Solutions' : 'ধাতুবিদ্যা সংক্রান্ত সমাধান'}
                </label>
                <textarea
                  rows={2}
                  value={marketLangTab === 'en' ? marketForm.solutions : (marketForm.solutionsBn || '')}
                  onChange={(e) => {
                    if (marketLangTab === 'en') setMarketForm({ ...marketForm, solutions: e.target.value });
                    else setMarketForm({ ...marketForm, solutionsBn: e.target.value });
                  }}
                  className="mt-1 w-full p-2 bg-slate-900 border border-slate-700 rounded text-xs text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setMarketModalOpen(false)}
                  className="px-3 py-1.5 border border-slate-700 rounded text-xs text-slate-300 hover:bg-slate-800 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Market Card</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
