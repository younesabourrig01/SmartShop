import React from "react";
import { logout } from "../../api/auth";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { 
  User, 
  Settings as SettingsIcon, 
  LogOut, 
  Package, 
  ExternalLink,
  ShoppingBag
} from "lucide-react";
import mainLogo from "../../assets/MainLogo.png";

interface Order {
  id: string;
  item: string;
  price: number;
  date: string;
  status: 'Delivered' | 'In Transit' | 'Processing' | 'Cancelled';
}

const mockOrders: Order[] = [
  { id: "ORD-9821", item: "Wireless Headphones", price: 129.99, date: "2026-03-10", status: "Delivered" },
  { id: "ORD-9745", item: "Smart Watch Series 7", price: 349.00, date: "2026-03-08", status: "In Transit" },
  { id: "ORD-9612", item: "Ergonomic Keyboards", price: 89.50, date: "2026-03-05", status: "Delivered" },
  { id: "ORD-9501", item: "USB-C Fast Charger", price: 25.00, date: "2026-03-01", status: "Processing" },
  { id: "ORD-9423", item: "Leather Wallet", price: 55.00, date: "2026-02-25", status: "Cancelled" },
];

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuth();
  const { t } = useTranslation();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await logout();
      clearAuth();
      toast.success(res.data.message || "Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#f3f4f6] pb-12 pt-8 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Profile Card Header - White/Gray Mix */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/60 overflow-hidden">
          <div className="relative h-28 bg-slate-100/50 flex items-center justify-center overflow-hidden">
             {/* Logo background decoration */}
             <img 
               src={mainLogo} 
               alt="Background Logo" 
               className="absolute w-64 opacity-[0.03] blur-[1px] select-none pointer-events-none" 
             />
             <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent"></div>
          </div>
          
          <div className="px-10 pb-10 flex flex-col md:flex-row items-center md:items-end gap-8 -mt-14 relative z-10">
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] border-[6px] border-white overflow-hidden shadow-2xl bg-white transition-transform duration-500 group-hover:scale-[1.03] group-hover:rotate-2">
                {user.image ? (
                  <img 
                    src={`http://127.0.0.1:8000/storage/${user.image}`} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-200">
                    <User size={64} />
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left mb-2">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">{user.name}</h1>
              <p className="text-slate-400 font-bold text-lg mt-1">{user.email}</p>
            </div>

            <div className="flex items-center gap-3 mb-2 px-6 py-3 bg-white/80 backdrop-blur-md rounded-[1.5rem] border border-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
               <img src={mainLogo} alt="Shop Logo" className="h-10 opacity-90" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Quick Stats & Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-3xl border border-white shadow-sm">
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-6">{t('profile.quick_stats', 'Activity Overview')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50/30 rounded-2xl border border-white shadow-inner">
                  <p className="text-3xl font-black text-blue-600">12</p>
                  <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-wider">{t('profile.stats.orders', 'Orders')}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50/30 rounded-2xl border border-white shadow-inner">
                  <p className="text-3xl font-black text-indigo-600">3</p>
                  <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-wider">{t('profile.stats.wishlist', 'Wishlist')}</p>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="bg-white rounded-[2rem] border border-white shadow-sm overflow-hidden divide-y divide-slate-50">
              <Link to="/profile/settings" className="flex items-center gap-4 p-6 hover:bg-slate-50 transition-all group">
                <div className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <SettingsIcon size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 leading-none">{t('profile.nav.settings', 'Settings')}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{t('profile.nav.settings_desc', 'Update your preferences.')}</p>
                </div>
                <ExternalLink size={14} className="text-slate-200 group-hover:text-blue-500 transition-colors" />
              </Link>

              <button onClick={handleLogout} className="flex items-center gap-4 w-full p-6 hover:bg-rose-50/50 transition-all group">
                <div className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
                  <LogOut size={20} />
                </div>
                <div className="text-left flex-1">
                  <p className="font-bold text-slate-900 leading-none">{t('profile.nav.logout', 'Log out')}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{t('profile.nav.logout_desc', 'Exit your session.')}</p>
                </div>
              </button>
            </div>
            
            {/* Support Card - Lightest Gray */}
            <div className="bg-white p-8 rounded-[2rem] border border-white shadow-lg shadow-slate-200/50 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-blue-100 transition-all"></div>
              <h3 className="font-black text-2xl mb-2 text-slate-900 relative z-10 tracking-tight">Premium Support</h3>
              <p className="text-sm text-slate-400 mb-6 font-medium relative z-10 leading-relaxed">Need help with an order? Our team is available 24/7.</p>
              <Link to="/contact" className="block w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 border border-slate-900 relative z-10 uppercase tracking-[0.2em] text-center">
                {t('profile.contact_us', 'Contact Us')}
              </Link>
            </div>
          </div>

          {/* Right Column: Latest Orders */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/40 overflow-hidden">
              <div className="p-8 md:p-10 flex items-center justify-between border-b border-slate-50">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-slate-50 text-slate-800 rounded-2xl shadow-inner border border-white">
                    <Package size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">{t('profile.orders.title', 'Latest Orders')}</h2>
                </div>
                <Link to="/profile/orders" className="text-[10px] font-black text-slate-400 hover:text-blue-600 bg-slate-50 px-6 py-3 rounded-2xl transition-all uppercase tracking-widest border border-white hover:border-blue-100">
                  {t('profile.orders.view_all', 'View All')}
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50/30 text-slate-300 text-[10px] uppercase font-black tracking-[0.15em]">
                    <tr>
                      <th className="px-8 py-5">{t('profile.orders.id', 'ID')}</th>
                      <th className="px-8 py-5">{t('profile.orders.product', 'Product')}</th>
                      <th className="px-8 py-5">{t('profile.orders.date', 'Date')}</th>
                      <th className="px-8 py-5">{t('profile.orders.amount', 'Amount')}</th>
                      <th className="px-8 py-5">{t('profile.orders.status', 'Status')}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50/50">
                    {mockOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-slate-50/30 transition-colors group cursor-pointer">
                        <td className="px-8 py-6">
                          <span className="text-sm font-black text-slate-900 opacity-80 group-hover:opacity-100 transition-opacity">#{order.id}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-white group-hover:text-blue-600 transition-all shadow-sm border border-transparent group-hover:border-blue-50">
                              <ShoppingBag size={18} />
                            </div>
                            <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{order.item}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-medium text-slate-400 italic">{order.date}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className="text-sm font-black text-slate-900">${order.price.toFixed(2)}</span>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                            order.status === 'Delivered' ? 'bg-white text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-50' : 
                            order.status === 'In Transit' ? 'bg-white text-sky-600 border-sky-100 shadow-sm shadow-sky-50' : 
                            order.status === 'Processing' ? 'bg-white text-amber-600 border-amber-100 shadow-sm shadow-amber-50' : 
                            'bg-white text-rose-600 border-rose-100 shadow-sm shadow-rose-50'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                               order.status === 'Delivered' ? 'bg-emerald-500 animate-pulse' : 
                               order.status === 'In Transit' ? 'bg-sky-500 animate-pulse' : 
                               order.status === 'Processing' ? 'bg-amber-500' : 
                               'bg-rose-500'
                            }`} />
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="p-8 bg-slate-50/30 text-center border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">
                  {t('profile.orders.showing_recent', 'Recent Activity Log • Version 2.0')}
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
