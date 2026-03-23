import React, { useState, useEffect, useMemo } from "react";
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
  ShoppingBag,
  Star as StarIcon,
  MessageSquare,
  FileText,
} from "lucide-react";
import Loader from "../../components/Loader/Loader";
import mainLogo from "../../assets/MainLogo.png";
import { orderByUser, downloadInvoice } from "../../api/order";
import { getReviewsByUser } from "../../api/reviews";
import { getBadge } from "../../api/auth";
import PageLoader from "../../components/Loader/PageLoader";
import { Info } from "lucide-react";
import { API_BASE_URL } from "../../api/client";

interface Product {
  id: number;
  name: string;
  image: string;
  images: { url: string }[];
}

interface OrderItem {
  product: Product;
}

interface BackendOrder {
  id: number;
  total: number;
  status: string;
  created_at: string;
  order_items: OrderItem[];
}

interface UserReview {
  id: number;
  product_id: number;
  review: string;
  rating: number;
  created_at: string;
  product: Product;
}

interface GroupedOrders {
  [date: string]: BackendOrder[];
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuth();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [groupedOrders, setGroupedOrders] = useState<GroupedOrders>({});
  const [isOrdersLoading, setIsOrdersLoading] = useState(true);
  const [showAllDays, setShowAllDays] = useState(false);
  const [isDownloadingInvoice, setIsDownloadingInvoice] = useState(false);
  const [badgeData, setBadgeData] = useState<{ badge: string; orders_count: number; wishlist_count: number; shipping_discount?: number } | null>(null);



  useEffect(() => {
    const fetchBadge = async () => {
      try {
        const res = await getBadge();
        setBadgeData(res.data);
      } catch (error) {
        console.error("Error fetching badge:", error);
      }
    };
    fetchBadge();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await orderByUser();
        setGroupedOrders(res.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setIsOrdersLoading(false);
      }
    };
    
    fetchOrders();
  }, []);

  const sortedDates = useMemo(() => 
    Object.keys(groupedOrders).sort((a, b) => b.localeCompare(a)), 
    [groupedOrders]
  );
  
  const totalOrdersCount = useMemo(() => 
    Object.values(groupedOrders).reduce((acc, curr) => acc + curr.length, 0),
    [groupedOrders]
  );

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await logout();
      clearAuth();
      toast.success(res.data.message || "Logged out successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadInvoice = async () => {
    setIsDownloadingInvoice(true);
    try {
      const response = await downloadInvoice();
      const url = window.URL.createObjectURL(new Blob([response.data as Blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'last_invoice.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(t('profile.orders.invoice_success', 'Invoice downloaded successfully'));
    } catch (error) {
      toast.error(t('profile.orders.invoice_error', 'Failed to download invoice'));
    } finally {
      setIsDownloadingInvoice(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-[calc(100vh-76px)] bg-[#f3f4f6] pb-12 pt-8 text-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-8">
        
        {/* Profile Details Container */}
        <div className="bg-gradient-to-br from-white to-slate-50 rounded-[2.5rem] border border-white shadow-xl shadow-slate-200/60 transition-all">
          <div className="px-10 py-10 flex flex-col md:flex-row items-center md:items-end gap-8 relative z-10">
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
            
            <div className="flex-1 text-center md:text-left rtl:md:text-right mb-2">
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">{user.name}</h1>
              <p className="text-slate-400 font-bold text-lg mt-1">{user.email}</p>
            </div>

            <div className="relative group">
              <div 
                className={`flex items-center gap-5 px-6 py-4 rounded-[1.8rem] border transition-all duration-500 hover:shadow-2xl hover:-translate-y-0.5 cursor-default relative ${
                  badgeData?.badge === 'master' ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 border-amber-300/40 text-black shadow-amber-500/30' :
                  badgeData?.badge === 'premium' ? 'bg-gradient-to-br from-slate-900 to-indigo-900 border-indigo-500/30 text-white shadow-indigo-500/20' :
                  badgeData?.badge === 'medium' ? 'bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border-yellow-500/30 text-amber-900 shadow-yellow-500/10' :
                  'bg-white/80 backdrop-blur-md border-slate-200 text-slate-800 shadow-slate-200/50'
                }`}
              >

                {/* Background Glow for Premium & Master */}
                {badgeData?.badge === 'premium' && (
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] group-hover:bg-indigo-400/30 transition-all duration-700"></div>
                )}
                {badgeData?.badge === 'master' && (
                  <div className="absolute -right-20 -top-20 w-64 h-64 bg-amber-400/30 rounded-full blur-[80px] group-hover:bg-amber-300/40 transition-all duration-700 animate-pulse"></div>
                )}
                
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                  {/* Badge Image with Glow */}
                  <div className="relative">
                    {badgeData?.badge === 'premium' && (
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-lg scale-125 animate-pulse"></div>
                    )}
                    {badgeData?.badge === 'master' && (
                      <div className="absolute inset-0 bg-white/40 rounded-full blur-xl scale-[1.3] animate-pulse"></div>
                    )}
                    {badgeData?.badge ? (
                      <img 
                        src={new URL(`../../assets/badges/${badgeData.badge.charAt(0).toUpperCase() + badgeData.badge.slice(1)}.png`, import.meta.url).href} 
                        alt={badgeData.badge} 
                        className="h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105 relative z-10 drop-shadow-xl"
                      />
                    ) : (
                      <div className="h-14 w-14 bg-slate-100 rounded-full animate-pulse"></div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2.5 min-w-[160px]">
                    <div className="flex items-center justify-between gap-8">
                      <div className="flex flex-col">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-0.5 ${badgeData?.badge === 'premium' ? 'text-indigo-300' : 'text-slate-400'}`}>
                          {t('profile.badge.member_status')}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className={`text-xl font-black uppercase tracking-tight ${
                            badgeData?.badge === 'master' ? 'text-black drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]' :
                            badgeData?.badge === 'premium' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-200' : ''
                          }`}>
                            {badgeData?.badge || t('profile.badge.loading')}
                          </span>
                          <Info size={14} className={`opacity-40 hover:opacity-100 transition-opacity cursor-help ${
                            badgeData?.badge === 'master' ? 'text-black' :
                            badgeData?.badge === 'premium' ? 'text-indigo-300' : 'text-slate-400'
                          }`} />
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {badgeData?.badge !== 'master' && (
                      <div className="w-full space-y-2">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                          <span className={badgeData?.badge === 'medium' ? 'text-amber-600' : badgeData?.badge === 'premium' ? 'text-indigo-300' : 'text-slate-400'}>
                             {badgeData?.orders_count || 0} / {
                               badgeData?.badge === 'normal' ? 8 : 
                               badgeData?.badge === 'medium' ? 28 : 
                               35
                             } {t('profile.badge.orders_label')}
                          </span>
                          <span className={badgeData?.badge === 'medium' ? 'text-amber-600' : badgeData?.badge === 'premium' ? 'text-indigo-300' : 'text-blue-500'}>
                            {badgeData?.badge === 'normal' ? 'Medium' : badgeData?.badge === 'medium' ? 'Premium' : 'Master'} {t('profile.badge.next')}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-white shadow-inner">
                          <div 
                            className={`h-full transition-all duration-1000 ${
                              badgeData?.badge === 'medium' ? 'bg-amber-500' : 
                              badgeData?.badge === 'premium' ? 'bg-indigo-600' :
                              'bg-blue-600'
                            }`}
                            style={{ width: `${Math.min(100, ((badgeData?.orders_count || 0) / (
                               badgeData?.badge === 'normal' ? 8 : 
                               badgeData?.badge === 'medium' ? 28 : 
                               35
                            )) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {badgeData?.badge === 'master' && (
                      <p className="text-[10px] font-bold text-black uppercase tracking-[0.25em] flex items-center gap-2 drop-shadow-sm">
                        <StarIcon size={12} fill="currentColor" />
                        Ultimate rank achieved
                      </p>
                    )}
                  </div>
                </div>

                {/* Info Tooltip Hover */}
                <div className="absolute top-1/2 -translate-y-1/2 right-[105%] w-72 p-6 bg-slate-900/95 backdrop-blur-2xl text-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[100] border border-white/10">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400 border border-blue-500/20">
                        <Info size={16} />
                      </div>
                      <div className="text-left rtl:text-right">
                        <p className="text-xs font-black uppercase tracking-widest leading-none">{t('profile.badge.status_guide')}</p>
                        <p className="text-[9px] text-slate-500 mt-1 uppercase font-bold tracking-wider">{t('profile.badge.level_up')}</p>
                      </div>
                    </div>
                    <p className="text-[11px] leading-relaxed font-medium text-slate-300">
                      {badgeData?.badge === 'master'
                        ? t('profile.badge.master_desc', "You are a shopping legend! Enjoy 50% discount on shipping and legendary perks.")
                        : badgeData?.badge === 'premium' 
                        ? t('profile.badge.premium_desc')
                        : badgeData?.badge === 'medium'
                        ? t('profile.badge.medium_desc')
                        : t('profile.badge.normal_desc')}
                    </p>
                    <div className="pt-2 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest bg-white/5 p-3 rounded-xl border border-white/5">
                        <span className="text-slate-400">{t('profile.badge.total_orders')}</span>
                        <span className="text-blue-400">{badgeData?.orders_count || 0}</span>
                      </div>
                      {badgeData?.shipping_discount !== undefined && (
                        <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest bg-blue-500/10 p-3 rounded-xl border border-blue-500/10 shadow-inner">
                          <span className="text-slate-400">Shipping Rival</span>
                          <span className="text-emerald-400">-{ (badgeData.shipping_discount * 100).toFixed(1) }%</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-3 h-3 bg-slate-900/95 backdrop-blur-xl rotate-45 border-t border-r border-white/10"></div>
                </div>
              </div>
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
                  <p className="text-3xl font-black text-blue-600">{badgeData?.orders_count || 0}</p>
                  <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-wider">{t('profile.stats.orders', 'Orders')}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-indigo-50 to-purple-50/30 rounded-2xl border border-white shadow-inner">
                  <p className="text-3xl font-black text-indigo-600">{badgeData?.wishlist_count || 0}</p>
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

              <Link to="/profile/reviews" className="flex items-center gap-4 p-6 hover:bg-slate-50 transition-all group border-t border-slate-50">
                <div className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <MessageSquare size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 leading-none">{t('profile.nav.reviews', 'Your Reviews')}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{t('profile.nav.reviews_desc', 'Manage your feedback.')}</p>
                </div>
                <ExternalLink size={14} className="text-slate-200 group-hover:text-blue-500 transition-colors" />
              </Link>

              <button onClick={handleLogout} className="flex items-center gap-4 w-full p-6 hover:bg-rose-50/50 transition-all group">
                <div className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
                  {isLoading ? <Loader color="#f43f5e" /> : <LogOut size={20} />}
                </div>
                <div className="text-left rtl:text-right flex-1">
                  <p className="font-bold text-slate-900 leading-none">{t('profile.nav.logout', 'Log out')}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{t('profile.nav.logout_desc', 'Exit your session.')}</p>
                </div>
              </button>
            </div>
            
            {/* Support Card - Lightest Gray */}
            <div className="bg-white p-8 rounded-[2rem] border border-white shadow-lg shadow-slate-200/50 relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-blue-100 transition-all"></div>
              <h3 className="font-black text-2xl mb-2 text-slate-900 relative z-10 tracking-tight">{t('profile.support_title')}</h3>
              <p className="text-sm text-slate-400 mb-6 font-medium relative z-10 leading-relaxed">{t('profile.support_desc')}</p>
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
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleDownloadInvoice}
                    disabled={isDownloadingInvoice}
                    className="text-[10px] font-black text-blue-600 bg-blue-50 px-6 py-3 rounded-2xl transition-all uppercase tracking-widest border border-blue-100 hover:bg-blue-100 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isDownloadingInvoice ? <Loader size={12} color="#2563eb" /> : <FileText size={14} />}
                    {t('profile.orders.download_invoice', 'Download Invoice')}
                  </button>
                  <button 
                    onClick={() => setShowAllDays(!showAllDays)}
                    className="text-[10px] font-black text-slate-400 hover:text-blue-600 bg-slate-50 px-6 py-3 rounded-2xl transition-all uppercase tracking-widest border border-white hover:border-blue-100"
                  >
                    {showAllDays ? t('profile.orders.show_latest', 'Show Latest') : t('profile.orders.view_all', 'View All')}
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto min-h-[300px] relative">
                {isOrdersLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-20">
                    <PageLoader />
                  </div>
                ) : null}
                
                <table className="w-full text-left rtl:text-right">
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
                    {sortedDates.length > 0 ? (
                      (showAllDays ? sortedDates : [sortedDates[0]]).map((date) => (
                        <React.Fragment key={date}>
                          {showAllDays && (
                            <tr className="bg-slate-50/50">
                              <td colSpan={5} className="px-8 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                {date}
                              </td>
                            </tr>
                          )}
                          {groupedOrders[date].map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50/30 transition-colors group cursor-pointer">
                              <td className="px-8 py-6">
                                <span className="text-sm font-black text-slate-900 opacity-80 group-hover:opacity-100 transition-opacity">#{order.id}</span>
                              </td>
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-white group-hover:text-blue-600 transition-all shadow-sm border border-transparent group-hover:border-blue-50">
                                    <ShoppingBag size={18} />
                                  </div>
                                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                                    {order.order_items?.[0]?.product?.name || "Order #" + order.id}
                                    {order.order_items?.length > 1 && ` (+${order.order_items.length - 1} more)`}
                                  </span>
                                </div>
                              </td>
                              <td className="px-8 py-6">
                                <span className="text-sm font-medium text-slate-400 italic">
                                  {new Date(order.created_at).toLocaleDateString()}
                                </span>
                              </td>
                              <td className="px-8 py-6">
                                <span className="text-sm font-black text-slate-900">{Number(order.total).toFixed(2)} MAD</span>
                              </td>
                              <td className="px-8 py-6">
                                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                  order.status === 'delivered' ? 'bg-white text-emerald-600 border-emerald-100 shadow-sm shadow-emerald-50' : 
                                  order.status === 'in_transit' ? 'bg-white text-sky-600 border-sky-100 shadow-sm shadow-sky-50' : 
                                  order.status === 'pending' ? 'bg-white text-amber-600 border-amber-100 shadow-sm shadow-amber-50' : 
                                  'bg-white text-rose-600 border-rose-100 shadow-sm shadow-rose-50'
                                }`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    order.status === 'delivered' ? 'bg-emerald-500 animate-pulse' : 
                                    order.status === 'in_transit' ? 'bg-sky-500 animate-pulse' : 
                                    order.status === 'pending' ? 'bg-amber-500' : 
                                    'bg-rose-500'
                                  }`} />
                                  {order.status.replace('_', ' ')}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))
                    ) : (
                      !isOrdersLoading && (
                        <tr>
                          <td colSpan={5} className="px-8 py-12 text-center text-slate-400 font-medium">
                            {t('profile.orders.no_orders', 'No orders found.')}
                          </td>
                        </tr>
                      )
                    )}
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
