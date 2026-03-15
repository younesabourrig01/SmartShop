import React, { useState } from "react";
import { logout } from "../../api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Layers, 
  Settings, 
  LogOut, 
  Calendar, 
  Download, 
  ArrowUpDown,
  MoreVertical,
  Menu,
  X
} from "lucide-react";
import Loader from "../../components/Loader/Loader";

interface Order {
  id: number;
  customer_name: string;
  total_price: number;
  status: string;
  created_at: string;
}

const mockOrders: Order[] = [
  { id: 1234, customer_name: "John Doe", total_price: 150.99, status: "completed", created_at: "2026-03-12" },
  { id: 1235, customer_name: "Jane Smith", total_price: 89.50, status: "pending", created_at: "2026-03-13" },
  { id: 1236, customer_name: "Alice Johnson", total_price: 210.00, status: "completed", created_at: "2026-03-11" },
  { id: 1237, customer_name: "Bob Wilson", total_price: 45.00, status: "cancelled", created_at: "2026-03-13" },
  { id: 1238, customer_name: "Charlie Brown", total_price: 120.75, status: "pending", created_at: "2026-03-12" },
];

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { clearAuth } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handelLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await logout();
      clearAuth();
      toast.success(res.data.message);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-start bg-gray-50 text-gray-800 font-sans relative min-h-[calc(100vh-76px)]">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm transition-all duration-300 ease-in-out sticky top-[76px] h-[calc(100vh-76px)] overflow-hidden ${isSidebarOpen ? 'w-64' : 'w-0 border-none'}`}>
        <div className="p-6 flex items-center gap-3 overflow-hidden whitespace-nowrap">
          {/* Logo removed as requested */}
        </div>

        <nav className="flex-1 mt-6 px-4 space-y-1 overflow-y-auto whitespace-nowrap scrollbar-hide">
          <button className="flex items-center gap-3 w-full p-3 bg-blue-50 text-blue-600 rounded-xl font-semibold transition-all">
            <LayoutDashboard size={20} className="min-w-[20px]" />
            {t('dashboard.sidebar.dashboard')}
          </button>
          <button onClick={() => navigate('/dashboard/users')} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Users size={20} className="min-w-[20px]" />
            {t('dashboard.sidebar.users')}
          </button>
          <button onClick={() => navigate('/dashboard/products')} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Package size={20} className="min-w-[20px]" />
            {t('dashboard.sidebar.products')}
          </button>
          <button onClick={() => navigate('/dashboard/categories')} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Layers size={20} className="min-w-[20px]" />
            {t('dashboard.sidebar.categories')}
          </button>
          <button onClick={() => navigate('/dashboard/settings')} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Settings size={20} className="min-w-[20px]" />
            {t('dashboard.sidebar.settings')}
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100 overflow-hidden whitespace-nowrap">
          <button 
            onClick={(e) => handelLogout(e as any)}
            disabled={isLoading}
            className="flex items-center gap-3 w-full p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all font-bold group shadow-sm disabled:opacity-70"
          >
            {isLoading ? <Loader color="#dc2626" /> : <LogOut size={20} className="min-w-[20px]" />}
            {t('dashboard.sidebar.logout')}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out`}>
        {/* Top Navbar */}
        <header className="sticky top-[76px] bg-white/95 backdrop-blur-md border-b border-gray-100 p-6 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-gray-900">{t('dashboard.welcome')}</h1>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <button 
              onClick={(e) => handelLogout(e as any)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2 font-bold disabled:opacity-70"
              title="Logout"
              disabled={isLoading}
            >
              {isLoading ? <Loader color="#ef4444" /> : <LogOut size={20} />}
              <span className="hidden lg:block text-sm">{t('dashboard.sidebar.logout')}</span>
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Quick Action Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/dashboard/users')}>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                    <Users size={24} />
                  </div>
                </div>
                <p className="text-gray-400 text-sm font-semibold mb-1">{t('dashboard.stats.total_users')}</p>
                <div className="flex justify-between items-end">
                    <h3 className="text-2xl font-extrabold text-gray-900">1,280</h3>
                    <span className="text-blue-600 text-xs font-bold hover:underline">{t('dashboard.stats.see_all')}</span>
                </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/dashboard/products')}>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
                    <Package size={24} />
                  </div>
                </div>
                <p className="text-gray-400 text-sm font-semibold mb-1">{t('dashboard.stats.total_products')}</p>
                <div className="flex justify-between items-end">
                    <h3 className="text-2xl font-extrabold text-gray-900">452</h3>
                    <span className="text-purple-600 text-xs font-bold hover:underline">{t('dashboard.stats.manage_all')}</span>
                </div>
            </div>
            {/* Added Categories Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/dashboard/categories')}>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                    <Layers size={24} />
                  </div>
                </div>
                <p className="text-gray-400 text-sm font-semibold mb-1">{t('dashboard.stats.total_categories')}</p>
                <div className="flex justify-between items-end">
                    <h3 className="text-2xl font-extrabold text-gray-900">24</h3>
                    <span className="text-green-600 text-xs font-bold hover:underline">{t('dashboard.stats.manage_all')}</span>
                </div>
            </div>
          </div>

          {/* Orders Section */}
          <section className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">{t('dashboard.transactions.title')}</h2>
              </div>
              <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold text-gray-500 shadow-inner">
                  <Calendar size={14} />
                  {new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
                </div>
                <button 
                  onClick={() => toast("Sort disabled in static mode")}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-400 cursor-not-allowed shadow-sm"
                >
                  <ArrowUpDown size={14} />
                  Sort by Date
                </button>
                <button 
                   onClick={() => toast("Generating PDF report...")}
                   className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
                >
                  <Download size={14} />
                  {t('dashboard.transactions.export')}
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-8 py-4">{t('dashboard.transactions.id')}</th>
                    <th className="px-8 py-4">{t('dashboard.transactions.customer')}</th>
                    <th className="px-8 py-4">{t('dashboard.transactions.amount')}</th>
                    <th className="px-8 py-4">{t('dashboard.transactions.date')}</th>
                    <th className="px-8 py-4">{t('dashboard.transactions.status')}</th>
                    <th className="px-8 py-4 text-right">{t('dashboard.transactions.action')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-5 font-bold text-gray-900 text-sm">#ORD-{order.id}</td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600">
                            {order.customer_name.charAt(0)}
                          </div>
                          <span className="text-sm font-semibold text-gray-700">{order.customer_name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 font-extrabold text-gray-900 text-sm">${order.total_price.toFixed(2)}</td>
                      <td className="px-8 py-5 text-gray-400 text-sm font-medium">{order.created_at}</td>
                      <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                          order.status === 'completed' ? 'bg-green-100 text-green-700' : 
                          order.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                          'bg-red-100 text-red-700'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'completed' ? 'bg-green-500' : order.status === 'pending' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                          {t(`dashboard.transactions.${order.status}`)}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button 
                          onClick={() => toast(`Action for #ORD-${order.id}`)}
                          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        >
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
