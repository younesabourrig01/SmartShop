import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Layers, 
  Settings, 
  LogOut,
  X,
  Menu
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../api/auth";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import SettingsContent from "../../components/Account/SettingsContent";

const DashboardSettings: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { clearAuth } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="flex bg-gray-50 text-gray-800 font-sans min-h-screen">
      {/* Sidebar */}
      <aside className={`bg-white dark:bg-slate-900 border-r border-gray-200 flex flex-col z-20 shadow-sm transition-all duration-300 ease-in-out sticky top-0 h-screen overflow-hidden ${isSidebarOpen ? 'w-64' : 'w-0 border-none'}`}>
        <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto whitespace-nowrap scrollbar-hide">
          <button onClick={() => navigate('/dashboard')} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <LayoutDashboard size={20} />
            {t('dashboard.sidebar.dashboard')}
          </button>
          <button onClick={() => navigate('/dashboard/users')} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Users size={20} />
            {t('dashboard.sidebar.users')}
          </button>
          <button onClick={() => navigate('/dashboard/products')} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Package size={20} />
            {t('dashboard.sidebar.products')}
          </button>
          <button onClick={() => navigate('/dashboard/categories')} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Layers size={20} />
            {t('dashboard.sidebar.categories')}
          </button>
          <button className="flex items-center gap-3 w-full p-3 bg-blue-50 text-blue-600 rounded-xl font-semibold transition-all">
            <Settings size={20} />
            {t('dashboard.sidebar.settings')}
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleLogout} 
            disabled={isLoading}
            className="flex items-center gap-3 w-full p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all font-bold group shadow-sm disabled:opacity-70"
          >
            {isLoading ? <Loader color="#dc2626" /> : <LogOut size={20} />}
            {t('dashboard.sidebar.logout')}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out h-screen overflow-hidden">
        {/* Header */}
        <header className="sticky top-0 bg-white dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 p-6 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-extrabold text-gray-900">{t('dashboard.sidebar.settings')}</h1>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <SettingsContent 
            backLabel={t('common.back_to_dashboard', 'Back to Dashboard')} 
            backPath="/dashboard" 
          />
        </div>
      </main>
    </div>
  );
};

export default DashboardSettings;
