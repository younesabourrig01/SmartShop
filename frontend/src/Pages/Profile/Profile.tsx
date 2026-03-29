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
  Info
} from "lucide-react";
import Loader from "../../components/Loader/Loader";
import { orderByUser, downloadInvoice } from "../../api/order";
import { getBadge } from "../../api/auth";
import PageLoader from "../../components/Loader/PageLoader";

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

interface GroupedOrders {
  [date: string]: BackendOrder[];
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, clearAuth } = useAuth();
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
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
    <div className={`min-h-[calc(100vh-76px)] bg-[#f3f4f6] dark:bg-slate-950 pb-12 pt-4 md:pt-8 text-slate-800 dark:text-slate-100 ${isRtl ? 'rtl' : 'ltr'}`}>
      <div className="max-w-7xl mx-auto px-3 md:px-8 space-y-6 md:space-y-8">
        
        {/* Profile Details Container - FIXED DARK MODE */}
        <div className="bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950 rounded-[2rem] md:rounded-[2.5rem] border border-white dark:border-slate-800 shadow-xl shadow-slate-200/6 dark:shadow-none0 dark:shadow-none transition-all">
          <div className="px-5 py-6 md:px-10 md:py-10 flex flex-col md:flex-row items-center md:items-end gap-5 md:gap-8 relative z-10">
            <div className="relative group shrink-0">
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-[2rem] border-[5px] border-white dark:border-slate-800 overflow-hidden shadow-2xl bg-white dark:bg-slate-900 transition-transform duration-500 group-hover:scale-[1.03] group-hover:rotate-2">
                {user.image ? (
                  <img 
                    src={`http://127.0.0.1:8000/storage/${user.image}`} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-200 dark:text-slate-700">
                    <User size={56} />
                  </div>
                )}
              </div>
            </div>
            
            <div className={`flex-1 text-center md:text-left ${isRtl ? 'md:text-right' : ''}`}>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">{user.name}</h1>
              <p className="text-slate-400 dark:text-slate-500 font-bold text-sm md:text-lg mt-2">{user.email}</p>
            </div>

            <div className="relative group w-full md:w-auto">
              {/* Ultra-Condensed Premium Status Guide */}
              <div className={`absolute ${isRtl ? 'left-full ml-6 origin-left' : 'right-full mr-6 origin-right'} top-0 md:top-[-20%] w-[20rem] bg-slate-950/98 backdrop-blur-3xl rounded-[2rem] border border-slate-800 shadow-xl p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 z-[999] transform ${isRtl ? '-translate-x-10' : 'translate-x-10'} group-hover:translate-x-0 pointer-events-none scale-95 group-hover:scale-100`}>
                <div className="space-y-4">
                  {/* Header & Intro */}
                  <div className={`border-b border-slate-800/60 pb-3 ${isRtl ? 'text-right' : 'text-left'}`}>
                    <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-white">
                      {t('profile.badge.status_guide', 'Membership Rewards')}
                    </h4>
                    <p className="text-[8px] font-medium text-slate-500 mt-1 leading-relaxed">
                      {t('profile.badge.status_guide_desc', 'Track your orders to unlock massive shipping discounts and exclusive store privileges.')}
                    </p>
                  </div>

                  {/* Benefit Summary Section */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white/[0.03] border border-slate-800 p-3 rounded-xl">
                      <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest">Active Perk</p>
                      <p className="text-[14px] font-black text-blue-400 mt-0.5">-{badgeData?.badge === 'none' ? '0' : badgeData?.badge === 'normal' ? '1.5' : badgeData?.badge === 'medium' ? '5' : badgeData?.badge === 'premium' ? '10' : '50'}% OFF</p>
                    </div>
                    <div className="bg-blue-600/10 border border-blue-500/20 p-3 rounded-xl">
                      <p className="text-[7px] font-black text-blue-400/60 uppercase tracking-widest">Next Unlock</p>
                      <p className="text-[14px] font-black text-white mt-0.5">-{badgeData?.badge === 'none' ? '1.5' : badgeData?.badge === 'normal' ? '5' : badgeData?.badge === 'medium' ? '10' : badgeData?.badge === 'premium' ? '50' : 'MAX'}% OFF</p>
                    </div>
                  </div>
                  
                  {/* Minified Rank List */}
                  <div className="space-y-1.5">
                    {[
                      { key: 'none', color: 'bg-slate-800', text: 'text-slate-500', rabais: '0%', range: '0-3' },
                      { key: 'normal', color: 'bg-slate-600', text: 'text-slate-400', rabais: '1.5%', range: '3-8' },
                      { key: 'medium', color: 'bg-amber-400', text: 'text-amber-500', rabais: '5%', range: '8-28' },
                      { key: 'premium', color: 'bg-blue-500', text: 'text-blue-400', rabais: '10%', range: '28-35' },
                      { key: 'master', color: 'bg-yellow-400', text: 'text-yellow-500', rabais: '50%', range: '35+' }
                    ].map((rank) => (
                      <div key={rank.key} className={`flex items-center justify-between px-3 py-2 rounded-lg transition-all border ${badgeData?.badge === rank.key ? 'bg-white/[0.04] border-slate-700' : 'opacity-20 border-transparent'} ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${rank.color}`} />
                          <span className={`text-[9px] font-black uppercase tracking-wider ${rank.text}`}>{rank.key === 'none' ? t('profile.badge.locked', 'Locked') : rank.key}</span>
                          {badgeData?.badge === rank.key && <span className="text-[6px] font-black text-blue-400 uppercase">{t('profile.badge.current', 'Current')}</span>}
                        </div>
                        <div className={`flex items-center gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <span className="text-[10px] font-black text-white">{rank.range} <span className="text-[6px] text-slate-600">ORD</span></span>
                          <span className={`text-[11px] font-black ${rank.key === 'none' ? 'text-slate-500' : rank.text}`}>-{rank.rabais}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Footer - Condensed */}
                  <div className={`flex items-center gap-2 px-1 pt-1 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <div className="p-1.5 bg-blue-600 rounded-lg">
                      <Package size={12} className="text-white" />
                    </div>
                    <p className="text-[11px] font-black text-white uppercase tracking-tight">
                      {badgeData?.orders_count || 0} {t('profile.badge.successful_orders', 'Successful Orders')}
                    </p>
                  </div>
                </div>
                {/* Minimal Arrow */}
                <div className={`absolute top-8 ${isRtl ? 'left-[-5px] border-l border-b' : 'right-[-5px] border-r border-t'} transform w-2.5 h-2.5 bg-slate-950 border-slate-800 rotate-45 rounded-[1px]`}></div>
              </div>

              <div 
                className={`flex items-center gap-4 px-5 py-4 rounded-[1.5rem] border transition-all duration-500 hover:shadow-2xl cursor-default relative overflow-hidden ${isRtl ? 'flex-row-reverse' : ''} ${
                  badgeData?.badge === 'master' ? 'bg-gradient-to-br from-amber-400 via-amber-500 to-yellow-600 border-amber-300/40 text-black shadow-amber-500/30 dark:shadow-none' :
                  badgeData?.badge === 'premium' ? 'bg-gradient-to-br from-slate-900 to-blue-900 border-blue-500/30 text-white shadow-blue-500/20 dark:shadow-none' :
                  badgeData?.badge === 'medium' ? 'bg-gradient-to-br from-amber-500/20 via-yellow-500/10 to-transparent border-yellow-500/30 dark:border-yellow-500/30 text-amber-900 dark:text-amber-500 shadow-yellow-500/10 dark:shadow-none' :
                  'bg-white dark:bg-slate-900/80 backdrop-blur-md border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-slate-200/50 dark:shadow-none'
                }`}
              >
                {/* Background Glow for Premium & Master */}
                {badgeData?.badge === 'premium' && (
                  <div className={`absolute ${isRtl ? '-left-20' : '-right-20'} -top-20 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] group-hover:bg-blue-400/30 transition-all duration-700`}></div>
                )}
                {badgeData?.badge === 'master' && (
                  <div className={`absolute ${isRtl ? '-left-20' : '-right-20'} -top-20 w-64 h-64 bg-amber-400/30 rounded-full blur-[80px] group-hover:bg-amber-300/40 transition-all duration-700 animate-pulse`}></div>
                )}
                
                <div className={`relative z-10 flex items-center gap-5 w-full ${isRtl ? 'flex-row-reverse' : ''}`}>
                  {/* Badge Image */}
                  <div className="relative shrink-0">
                    {badgeData?.badge && badgeData.badge !== 'none' ? (
                      <img 
                        src={new URL(`../../assets/badges/${badgeData.badge.charAt(0).toUpperCase() + badgeData.badge.slice(1)}.png`, import.meta.url).href} 
                        alt={badgeData.badge} 
                        className="h-12 md:h-14 w-auto object-contain relative z-10 drop-shadow-xl"
                      />
                    ) : badgeData?.badge === 'none' ? (
                      <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800/30 rounded-2xl flex items-center justify-center text-slate-400 dark:text-slate-600 border border-slate-200/50 dark:border-slate-800 shadow-inner">
                        <ShoppingBag size={24} strokeWidth={1.5} />
                      </div>
                    ) : (
                      <div className="h-12 w-12 bg-slate-100 dark:bg-slate-800/50 rounded-full animate-pulse"></div>
                    )}
                  </div>

                  <div className={`flex flex-col gap-2 flex-1 min-w-0 ${isRtl ? 'items-end text-right' : 'items-start text-left'}`}>
                    <div className={`flex flex-col gap-1 ${isRtl ? 'items-end' : 'items-start'}`}>
                      <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] ${badgeData?.badge === 'premium' ? 'text-blue-300' : badgeData?.badge === 'master' ? 'text-black/60' : 'text-slate-400 dark:text-slate-500'}`}>
                        {t('profile.badge.member_status', 'Member Status')}
                      </span>
                      <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                        {badgeData ? (
                          <span className={`text-base md:text-xl font-black uppercase tracking-tight ${
                            badgeData?.badge === 'master' ? 'text-black drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]' :
                            badgeData?.badge === 'premium' ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-200' : 
                            badgeData?.badge === 'none' ? 'text-slate-400 dark:text-slate-600 italic font-medium' :
                            'text-slate-900 dark:text-white'
                          }`}>
                            {badgeData.badge === 'none' ? t('profile.badge.locked', 'Locked') : badgeData.badge}
                          </span>
                        ) : (
                          <div className="h-6 w-24 bg-slate-100 dark:bg-slate-800/50 rounded-lg animate-pulse my-1"></div>
                        )}
                        <Info size={14} className={`opacity-40 hover:opacity-100 transition-opacity cursor-help ${
                          badgeData?.badge === 'master' ? 'text-black' :
                          badgeData?.badge === 'premium' ? 'text-blue-300' : 
                          badgeData?.badge === 'none' ? 'text-slate-300 dark:text-slate-700' :
                          'text-slate-400 dark:text-slate-500'
                        }`} />
                      </div>
                    </div>

                    {/* Progress Bar Container - FIXED COLLISION */}
                    {badgeData?.badge !== 'master' && (
                      <div className="w-full space-y-1.5">
                        <div className="flex justify-between items-center gap-3 text-[8px] md:text-[9px] font-black uppercase tracking-widest overflow-hidden">
                          <span className={`whitespace-nowrap ${badgeData?.badge === 'medium' ? 'text-amber-600' : badgeData?.badge === 'premium' ? 'text-blue-300' : 'text-slate-400 dark:text-slate-500'}`}>
                            {badgeData ? `${badgeData.orders_count} / ${badgeData.badge === 'none' ? 3 : badgeData.badge === 'normal' ? 8 : badgeData.badge === 'medium' ? 28 : 35}` : '0 / 8'} {t('profile.badge.orders_label', 'Orders')}
                          </span>
                          <span className={`whitespace-nowrap ${badgeData?.badge === 'medium' ? 'text-amber-600' : badgeData?.badge === 'premium' ? 'text-blue-300' : 'text-blue-600 dark:text-blue-400'}`}>
                             {badgeData ? (badgeData.badge === 'none' ? 'Normal' : badgeData.badge === 'normal' ? 'Medium' : badgeData.badge === 'medium' ? 'Premium' : 'Master') : 'Loading'} {t('profile.badge.next', 'Next')}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800/50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${
                              badgeData?.badge === 'medium' ? 'bg-amber-500' : 
                              badgeData?.badge === 'premium' ? 'bg-blue-600' :
                              badgeData?.badge === 'none' ? 'bg-slate-400 dark:bg-slate-600' :
                              'bg-blue-600'
                            }`}
                            style={{ width: `${Math.min(100, ((badgeData?.orders_count || 0) / (badgeData?.badge === 'none' ? 3 : badgeData?.badge === 'normal' ? 8 : badgeData?.badge === 'medium' ? 28 : 35)) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    {badgeData?.badge === 'master' && (
                      <p className="text-[10px] font-bold text-black uppercase tracking-[0.25em] flex items-center gap-2">
                        <StarIcon size={12} fill="currentColor" />
                        Ultimate rank achieved
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Quick Stats & Actions */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-white dark:border-slate-800 shadow-sm">
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-widest mb-6">{t('profile.quick_stats', 'Activity Overview')}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 bg-gradient-to-br from-blue-50 to-blue-50/30 rounded-2xl border border-white dark:border-slate-800 shadow-inner">
                  <p className="text-3xl font-black text-blue-600">{badgeData?.orders_count || 0}</p>
                  <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-wider">{t('profile.stats.orders', 'Orders')}</p>
                </div>
                <div className="p-5 bg-gradient-to-br from-blue-50 to-purple-50/30 rounded-2xl border border-white dark:border-slate-800 shadow-inner">
                  <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{badgeData?.wishlist_count || 0}</p>
                  <p className="text-[10px] font-black text-slate-400 mt-2 uppercase tracking-wider">{t('profile.stats.wishlist', 'Wishlist')}</p>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-white dark:border-slate-800 shadow-sm overflow-hidden divide-y divide-slate-50">
              <Link to="/profile/settings" className="flex items-center gap-4 p-6 hover:bg-slate-50 dark:bg-slate-800 transition-all group">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <SettingsIcon size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white leading-none">{t('profile.nav.settings', 'Settings')}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{t('profile.nav.settings_desc', 'Update your preferences.')}</p>
                </div>
                <ExternalLink size={14} className="text-slate-200 group-hover:text-blue-500 transition-colors" />
              </Link>

              <Link to="/profile/reviews" className="flex items-center gap-4 p-6 hover:bg-slate-50 dark:bg-slate-800 transition-all group border-t border-slate-50">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                  <MessageSquare size={20} />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-slate-900 dark:text-white leading-none">{t('profile.nav.reviews', 'Your Reviews')}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{t('profile.nav.reviews_desc', 'Manage your feedback.')}</p>
                </div>
                <ExternalLink size={14} className="text-slate-200 group-hover:text-blue-500 transition-colors" />
              </Link>

              <button onClick={handleLogout} className="flex items-center gap-4 w-full p-6 hover:bg-rose-50/50 transition-all group">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl group-hover:bg-rose-600 group-hover:text-white transition-all shadow-sm">
                  {isLoading ? <Loader color="#f43f5e" /> : <LogOut size={20} />}
                </div>
                <div className="text-left rtl:text-right flex-1">
                  <p className="font-bold text-slate-900 dark:text-white leading-none">{t('profile.nav.logout', 'Log out')}</p>
                  <p className="text-xs text-slate-400 mt-1.5">{t('profile.nav.logout_desc', 'Exit your session.')}</p>
                </div>
              </button>
            </div>
            
            {/* Support Card - Lightest Gray */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-white dark:border-slate-800 shadow-lg shadow-slate-200/50 dark:shadow-none relative overflow-hidden group">
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-50/50 rounded-full blur-3xl group-hover:bg-blue-100 transition-all"></div>
              <h3 className="font-black text-2xl mb-2 text-slate-900 dark:text-white relative z-10 tracking-tight">{t('profile.support_title')}</h3>
              <p className="text-sm text-slate-400 mb-6 font-medium relative z-10 leading-relaxed">{t('profile.support_desc')}</p>
              <Link to="/contact" className="block w-full py-4 bg-slate-900 text-white rounded-2xl text-xs font-black hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 dark:shadow-none border border-slate-900 relative z-10 uppercase tracking-[0.2em] text-center">
                {t('profile.contact_us', 'Contact Us')}
              </Link>
            </div>
          </div>

          {/* Right Column: Latest Orders */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] border border-white dark:border-slate-800 shadow-xl shadow-slate-200/40 dark:shadow-none overflow-hidden">
              <div className="p-5 md:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-xl shadow-inner border border-white dark:border-slate-800">
                    <Package size={20} />
                  </div>
                  <h2 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">{t('profile.orders.title', 'Latest Orders')}</h2>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <button 
                    onClick={handleDownloadInvoice}
                    disabled={isDownloadingInvoice}
                    className="text-[10px] font-black text-blue-600 bg-blue-50 px-4 py-2.5 rounded-xl transition-all uppercase tracking-widest border border-blue-100 hover:bg-blue-100 flex items-center gap-2 disabled:opacity-50"
                  >
                    {isDownloadingInvoice ? <Loader size={12} color="#2563eb" /> : <FileText size={12} />}
                    {t('profile.orders.download_invoice', 'Invoice')}
                  </button>
                  <button 
                    onClick={() => setShowAllDays(!showAllDays)}
                    className="text-[10px] font-black text-slate-400 hover:text-blue-600 bg-slate-50 dark:bg-slate-800 px-4 py-2.5 rounded-xl transition-all uppercase tracking-widest border border-white dark:border-slate-800 hover:border-blue-100"
                  >
                    {showAllDays ? t('profile.orders.show_latest', 'Show Latest') : t('profile.orders.view_all', 'View All')}
                  </button>
                </div>
              </div>

              {/* Desktop: table view */}
              <div className="hidden md:block overflow-x-auto min-h-[300px] relative">
                {isOrdersLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-900/50 z-20"><PageLoader /></div>
                ) : null}
                <table className="w-full text-left rtl:text-right">
                  <thead className="bg-slate-50 dark:bg-slate-800/30 text-slate-300 text-[10px] uppercase font-black tracking-[0.15em]">
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
                            <tr className="bg-slate-50 dark:bg-slate-800/50">
                              <td colSpan={5} className="px-8 py-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">{date}</td>
                            </tr>
                          )}
                          {groupedOrders[date].map((order) => (
                            <tr key={order.id} className="hover:bg-slate-50 dark:bg-slate-800/30 transition-colors group cursor-pointer">
                              <td className="px-8 py-6"><span className="text-sm font-black text-slate-900 dark:text-white opacity-80">#{order.id}</span></td>
                              <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 transition-all shadow-sm border border-transparent">
                                    <ShoppingBag size={18} />
                                  </div>
                                  <span className="text-sm font-bold text-slate-600 dark:text-slate-300">
                                    {order.order_items?.[0]?.product?.name || "Order #" + order.id}
                                    {order.order_items?.length > 1 && ` (+${order.order_items.length - 1} more)`}
                                  </span>
                                </div>
                              </td>
                              <td className="px-8 py-6"><span className="text-sm font-medium text-slate-400 italic">{new Date(order.created_at).toLocaleDateString()}</span></td>
                              <td className="px-8 py-6"><span className="text-sm font-black text-slate-900 dark:text-white">{Number(order.total).toFixed(2)} MAD</span></td>
                              <td className="px-8 py-6">
                                <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                                  order.status === 'delivered' ? 'bg-white dark:bg-slate-900 text-emerald-600 border-emerald-100 shadow-sm' : 
                                  order.status === 'in_transit' ? 'bg-white dark:bg-slate-900 text-sky-600 border-sky-100 shadow-sm' : 
                                  order.status === 'pending' ? 'bg-white dark:bg-slate-900 text-amber-600 border-amber-100 shadow-sm' : 
                                  'bg-white dark:bg-slate-900 text-rose-600 border-rose-100 shadow-sm'
                                }`}>
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    order.status === 'delivered' ? 'bg-emerald-500 animate-pulse' : 
                                    order.status === 'in_transit' ? 'bg-sky-500 animate-pulse' : 
                                    order.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'
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
                        <tr><td colSpan={5} className="px-8 py-12 text-center text-slate-400 font-medium">{t('profile.orders.no_orders', 'No orders found.')}</td></tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile: card view */}
              <div className="md:hidden divide-y divide-slate-50 relative min-h-[200px]">
                {isOrdersLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-900/50 z-20"><PageLoader /></div>
                ) : null}
                {sortedDates.length > 0 ? (
                  (showAllDays ? sortedDates : [sortedDates[0]]).map((date) => (
                    <React.Fragment key={date}>
                      {showAllDays && (
                        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">{date}</div>
                      )}
                      {groupedOrders[date].map((order) => (
                        <div key={order.id} className="p-4 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
                            <ShoppingBag size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-800 dark:text-white truncate">
                              {order.order_items?.[0]?.product?.name || "Order #" + order.id}
                              {order.order_items?.length > 1 && ` (+${order.order_items.length - 1})`}
                            </p>
                            <p className="text-[11px] text-slate-400 mt-0.5">{new Date(order.created_at).toLocaleDateString()} · #{order.id}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-sm font-black text-slate-900 dark:text-white">{Number(order.total).toFixed(2)} MAD</p>
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 mt-1 rounded-full text-[9px] font-black uppercase ${
                              order.status === 'delivered' ? 'bg-emerald-50 text-emerald-600' : 
                              order.status === 'in_transit' ? 'bg-sky-50 text-sky-600' : 
                              order.status === 'pending' ? 'bg-amber-50 text-amber-600' : 
                              'bg-rose-50 text-rose-600'
                            }`}>
                              <div className={`w-1 h-1 rounded-full ${
                                order.status === 'delivered' ? 'bg-emerald-500' : 
                                order.status === 'in_transit' ? 'bg-sky-500' : 
                                order.status === 'pending' ? 'bg-amber-500' : 'bg-rose-500'
                              }`} />
                              {order.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  !isOrdersLoading && (
                    <div className="px-4 py-10 text-center text-slate-400 font-medium">{t('profile.orders.no_orders', 'No orders found.')}</div>
                  )
                )}
              </div>

              <div className="p-5 bg-slate-50 dark:bg-slate-800/30 text-center border-t border-slate-50">
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
