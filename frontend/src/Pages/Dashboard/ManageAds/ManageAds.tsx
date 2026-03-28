import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { 
  Megaphone, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  LayoutDashboard, 
  Users, 
  Package, 
  Layers, 
  Settings, 
  LogOut,
  X,
  Menu,
  Image as ImageIcon,
  Type,
  ExternalLink,
  Info
} from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import { logout } from "../../../api/auth";
import AdForm from "../../../components/Dashboard/AdForm";
import DeleteConfirm from "../../../components/Dashboard/DeleteConfirm";
import { getAds, deleteAd } from "../../../api/ads";
import { API_BASE_URL } from "../../../api/client";

const ManageAds: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { clearAuth } = useAuth();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [adToDelete, setAdToDelete] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'slider' | 'banner'>('slider');

  const [isLoading, setIsLoading] = useState(false);
  const [ads, setAds] = useState<any[]>([]);
  const [isFetchingAds, setIsFetchingAds] = useState(true);

  const fetchAds = async () => {
    setIsFetchingAds(true);
    try {
      const res = await getAds();
      if (res.data.status === 'success') {
        const { sliders, banners } = res.data.data;
        setAds([...sliders, ...banners]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load advertisements");
    } finally {
      setIsFetchingAds(false);
    }
  };

  React.useEffect(() => {
    fetchAds();
  }, []);

  const filteredAds = ads.filter(ad => ad.position === activeTab);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      clearAuth();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  const openAddForm = () => {
    setEditingAd(null);
    setIsFormOpen(true);
  };

  const openEditForm = (ad: any) => {
    setEditingAd(ad);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (ad: any) => {
    setAdToDelete(ad);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!adToDelete) return;
    try {
      await deleteAd(adToDelete.id);
      toast.success(`${adToDelete.title} deleted successfully`);
      setIsDeleteModalOpen(false);
      fetchAds();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete ad");
    }
  };

  return (
    <div className="flex bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-slate-100 font-sans min-h-screen">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        bg-white dark:bg-slate-900 border-r border-gray-200 flex flex-col z-40 shadow-xl transition-all duration-300 ease-in-out
        fixed top-0 left-0 h-full w-72
        lg:sticky lg:top-[88px] lg:h-[calc(100vh-88px)] lg:shadow-sm lg:z-20
        ${isSidebarOpen ? 'translate-x-0 lg:w-64' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:border-none lg:overflow-hidden'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden">
          <span className="font-extrabold text-gray-900 text-lg">Dashboard</span>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><X size={22} /></button>
        </div>
        <nav className="flex-1 mt-4 lg:mt-6 px-4 space-y-1 overflow-y-auto whitespace-nowrap scrollbar-hide">
          <button onClick={() => { navigate('/dashboard'); setIsSidebarOpen(false); }} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <LayoutDashboard size={20} />
            {t('dashboard.sidebar.dashboard')}
          </button>
          <button onClick={() => { navigate('/dashboard/users'); setIsSidebarOpen(false); }} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Users size={20} />
            {t('dashboard.sidebar.users')}
          </button>
          <button onClick={() => { navigate('/dashboard/products'); setIsSidebarOpen(false); }} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Package size={20} />
            {t('dashboard.sidebar.products')}
          </button>
          <button onClick={() => { navigate('/dashboard/categories'); setIsSidebarOpen(false); }} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Layers size={20} />
            {t('dashboard.sidebar.categories')}
          </button>
          <button className="flex items-center gap-3 w-full p-3 bg-blue-50 text-blue-600 rounded-xl font-semibold transition-all">
            <Megaphone size={20} />
            Manage Ads
          </button>
          <button onClick={() => { navigate('/dashboard/settings'); setIsSidebarOpen(false); }} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Settings size={20} />
            {t('dashboard.sidebar.settings')}
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} disabled={isLoading} className="flex items-center gap-3 w-full p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all font-bold shadow-sm disabled:opacity-70">
            {isLoading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-red-600 border-t-transparent" /> : <LogOut size={20} />}
            {t('dashboard.sidebar.logout')}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out w-full font-sans">
        {/* Header */}
        <header className="sticky top-[88px] bg-white dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 px-4 py-4 md:px-6 flex justify-between items-center z-40">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
              <Menu size={22} />
            </button>
            <h1 className="text-lg md:text-2xl font-extrabold text-gray-900">Manage Advertisements</h1>
          </div>
          <button 
            onClick={openAddForm}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg dark:shadow-none active:scale-95"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add New Ad</span>
            <span className="sm:hidden">Add</span>
          </button>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
            <button 
              onClick={() => setActiveTab('slider')}
              className={`p-6 rounded-[2rem] border transition-all text-left flex items-start gap-4 ${
                activeTab === 'slider' 
                  ? 'bg-white dark:bg-slate-800 border-blue-500 shadow-xl shadow-blue-10 dark:shadow-none0 dark:shadow-none translate-y-[-4px]' 
                  : 'bg-white dark:bg-slate-900 border-gray-100 hover:border-blue-200 opacity-60'
              }`}
            >
              <div className={`p-4 rounded-2xl ${activeTab === 'slider' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                <ImageIcon size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white capitalize">Main Sliders</h3>
                <p className="text-sm font-bold text-gray-400 mt-1">Huge hero section banners with images.</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${activeTab === 'slider' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    Active: {isFetchingAds ? '...' : ads.filter(a => a.position === 'slider').length}
                  </span>
                </div>
              </div>
            </button>

            <button 
              onClick={() => setActiveTab('banner')}
              className={`p-6 rounded-[2rem] border transition-all text-left flex items-start gap-4 ${
                activeTab === 'banner' 
                  ? 'bg-white dark:bg-slate-800 border-amber-500 shadow-xl shadow-amber-10 dark:shadow-none0 dark:shadow-none translate-y-[-4px]' 
                  : 'bg-white dark:bg-slate-900 border-gray-100 hover:border-amber-200 opacity-60'
              }`}
            >
              <div className={`p-4 rounded-2xl ${activeTab === 'banner' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-600'}`}>
                <Type size={28} />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white capitalize">Text Banners</h3>
                <p className="text-sm font-bold text-gray-400 mt-1">Slim contextual alerts across the shop.</p>
                <div className="mt-4 flex items-center gap-2">
                  <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full ${activeTab === 'banner' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-400'}`}>
                    Active: {isFetchingAds ? '...' : ads.filter(a => a.position === 'banner').length}
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Ads List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {isFetchingAds ? (
              <div className="col-span-full py-20 flex justify-center text-blue-500">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-current border-t-transparent" />
              </div>
            ) : filteredAds.length > 0 ? (
              filteredAds.map((ad) => (
                <div key={ad.id} className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all overflow-hidden relative">
                  {/* Top Badges */}
                  <div className="absolute top-6 left-6 z-10 flex gap-2">
                    <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                      ad.position === 'slider' ? 'bg-blue-600 text-white' : 'bg-amber-500 text-white'
                    }`}>
                      {ad.position}
                    </span>
                  </div>

                  {/* Actions Bar (Overlay) */}
                  <div className="absolute top-6 right-6 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    <button 
                      onClick={() => openEditForm(ad)}
                      className="p-3 bg-white text-gray-900 rounded-xl shadow-xl hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
                    >
                      <Edit3 size={18} />
                    </button>
                    <button 
                      onClick={() => handleDeleteClick(ad)}
                      className="p-3 bg-white text-gray-900 rounded-xl shadow-xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Image for Sliders */}
                  {ad.position === 'slider' && (
                    <div className="aspect-[21/9] w-full relative overflow-hidden bg-gray-100">
                      <img 
                        src={ad.image?.startsWith('http') ? ad.image : `${API_BASE_URL}/storage/${ad.image}`} 
                        alt={ad.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
                    </div>
                  )}

                  {/* Content Area */}
                  <div className={`p-8 ${ad.position === 'banner' ? 'pt-16 border-t-8 border-amber-500' : ''}`}>
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h4 className="text-2xl font-black text-gray-900 dark:text-white leading-tight">
                        {ad.title}
                      </h4>
                    </div>
                    
                    <p className="text-sm font-bold text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
                      {ad.description}
                    </p>

                    <div className="flex justify-between items-center pt-6 border-t border-gray-50 dark:border-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-gray-50 dark:bg-slate-800 rounded-lg text-gray-400">
                          <Eye size={14} />
                        </div>
                        <span className="text-[10px] font-black uppercase text-gray-400">Published: {new Date(ad.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Banner Indicator Icon */}
                  {ad.position === 'banner' && (
                    <div className="absolute top-6 right-6 p-4 bg-amber-50 text-amber-500 rounded-full dark:bg-amber-900/20 group-hover:scale-110 transition-transform">
                      <Type size={32} />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center text-center px-6">
                <div className="p-6 bg-gray-50 dark:bg-slate-800 rounded-full mb-6">
                  <Megaphone size={48} className="text-gray-300" />
                </div>
                <h4 className="text-xl font-black text-gray-900 dark:text-white">No Advertisements Found</h4>
                <p className="text-gray-400 font-bold text-sm max-w-sm mt-2">
                  We couldn't find any {activeTab}s matching your search criteria. Try adjusting your filters or create a new one.
                </p>
                <button 
                  onClick={openAddForm}
                  className="mt-8 flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-gray-800 transition-all shadow-xl"
                >
                  <Plus size={18} />
                  Create Your First Ad
                </button>
              </div>
            )}
          </div>

          {/* Ad Position Guide */}
          <div className="bg-blue-600 rounded-[3rem] p-10 relative overflow-hidden shadow-2xl dark:shadow-none lg:col-span-1">
            <div className="absolute top-0 right-0 p-12 text-white/5 pointer-events-none">
              <Megaphone size={200} />
            </div>
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 text-blue-100 font-black text-xs uppercase tracking-[0.2em] mb-4">
                <Info size={14} />
                <span>Quick Tip</span>
              </div>
              <h3 className="text-3xl font-black text-white mb-4">Mastering Your Page Positions</h3>
              <p className="text-blue-100 font-bold leading-relaxed mb-6">
                Use <span className="text-white underline">Main Sliders</span> for high-impact visual campaigns with professional photography. 
                Use <span className="text-white underline">Text Banners</span> for quick calls-to-action, shipping alerts, or seasonal coupons where text hierarchy is more important than visuals.
              </p>
              <div className="flex h-px bg-white/20 w-32 mb-6" />
              <button 
                onClick={() => window.open('https://help.smartshop.com/ads', '_blank')}
                className="text-white font-black text-[10px] uppercase tracking-widest hover:pl-2 transition-all flex items-center gap-2 group"
              >
                View Full Placement Guide
                <ExternalLink size={12} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Ad Form Component */}
      <AdForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        initialData={editingAd}
        title={editingAd ? "Update Ad Campaign" : "Launch New Campaign"}
        onSuccess={fetchAds}
      />

      {/* Delete Confirmation Component */}
      <DeleteConfirm 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Archive Campaign"
        message={`Are you sure you want to delete the "${adToDelete?.title}" campaign? This will remove it from the customer view immediately.`}
        isLoading={false}
      />
    </div>
  );
};

export default ManageAds;
