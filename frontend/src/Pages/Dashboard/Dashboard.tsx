import React, { useState, useContext } from "react";
import { logout } from "../../api/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { ProductContext } from "../../context/ProductContext";
import { CategoryContext } from "../../context/CategoryContext";
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
  X,
  Clock,
  CheckCircle,
  Truck,
  PackageCheck,
  XCircle,
  RefreshCw,
  ChevronDown
} from "lucide-react";
import Loader from "../../components/Loader/Loader";
import PageLoader from "../../components/Loader/PageLoader";
import { getAllOrders, getOrdersByDate, downloadReport, updateStatus } from "../../api/order";
import { getAllUsers } from "../../api/auth";

interface Order {
  id: number;
  user?: {
    name: string;
  };
  total: number;
  status: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { clearAuth } = useAuth();
  const { totalProducts, loading: productsLoading } = useContext(ProductContext);
  const { categories, loading: categoriesLoading } = useContext(CategoryContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [usersLoading, setUsersLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [tempStatus, setTempStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);
  const statuses = [
    { label: "pending", icon: <Clock size={14}/>, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "paid", icon: <CheckCircle size={14}/>, color: "text-green-500", bg: "bg-green-50" },
    { label: "processing", icon: <RefreshCw size={14}/>, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "shipped", icon: <Truck size={14}/>, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "delivered", icon: <PackageCheck size={14}/>, color: "text-emerald-500", bg: "bg-emerald-50" },
    { label: "cancelled", icon: <XCircle size={14}/>, color: "text-red-500", bg: "bg-red-50" },
  ];

  const fetchUsersCount = async () => {
    setUsersLoading(true);
    try {
      const res = await getAllUsers(1);
      if (res.data.status === 'success') {
        setTotalUsers(res.data.data.total);
      }
    } catch (error) {
      console.error("Failed to fetch users count", error);
    } finally {
      setUsersLoading(false);
    }
  };

  const fetchOrders = async (date?: string) => {
    setOrdersLoading(true);
    try {
      let res;
      if (date) {
        res = await getOrdersByDate(date);
        if (res.data.status === 'success') {
          setOrders(res.data.orders);
        }
      } else {
        res = await getAllOrders();
        if (res.data.status === 'success') {
          // Flatten grouped orders if returned that way
          const flattened = Object.values(res.data.orders_by_day).flat() as Order[];
          setOrders(flattened);
        }
      }
    } catch (error) {
      toast.error("Failed to fetch transactions");
    } finally {
      setOrdersLoading(false);
    }
  };

  React.useEffect(() => {
    fetchOrders(selectedDate);
    fetchUsersCount();
  }, [selectedDate]);

  const handleDownloadReport = async () => {
    if (!selectedDate) {
      toast.error("Please select a date first");
      return;
    }
    const toastId = toast.loading("Generating report...");
    try {
      const response = await downloadReport(selectedDate);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `report-orders-${selectedDate}.pdf`);
      document.body.appendChild(link);
      link.click();
      toast.success("Report downloaded successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to generate report", { id: toastId });
    }
  };

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

const handleUpdateStatus = async (orderId: number) => {
    if (!tempStatus) return;
    setIsUpdating(true);
    try {
      const res = await updateStatus(orderId, tempStatus);
      if (res.data.status === 'success') {
        toast.success("Order status updated successfully");
        setEditingOrderId(null);
        fetchOrders(selectedDate);
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const isDataLoading = productsLoading || categoriesLoading || ordersLoading || usersLoading;

if (isDataLoading) return <PageLoader/>;

  return (
    <div className="flex items-start bg-gray-50 text-gray-800 font-sans relative min-h-screen">
      {/* Sidebar */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm transition-all duration-300 ease-in-out sticky top-0 h-screen overflow-hidden ${isSidebarOpen ? 'w-64' : 'w-0 border-none'}`}>
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
      <main className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out relative h-screen`}>
        {/* Top Navbar */}
        <header className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 p-6 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-extrabold text-gray-900">{t('dashboard.welcome')}</h1>
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
                    <h3 className="text-2xl font-extrabold text-gray-900">{usersLoading ? "..." : totalUsers.toLocaleString()}</h3>
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
                    <h3 className="text-2xl font-extrabold text-gray-900">{productsLoading ? "..." : totalProducts}</h3>
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
                    <h3 className="text-2xl font-extrabold text-gray-900">{categoriesLoading ? "..." : categories.length}</h3>
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
                <div className="flex items-center gap-2 px-4 py-1 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 shadow-sm">
                  <Calendar size={14} className="text-blue-500" />
                  <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="bg-transparent border-none outline-none focus:ring-0 p-1 cursor-pointer"
                  />
                </div>
                <button 
                  onClick={() => fetchOrders()}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50 transition-all shadow-sm active:scale-95"
                >
                  <ArrowUpDown size={14} />
                  Reset to All
                </button>
                <button 
                   onClick={handleDownloadReport}
                   className="flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
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
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                        <td className="px-8 py-5 font-bold text-gray-900 text-sm">#ORD-{order.id}</td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600">
                              {order.user?.name.charAt(0) || "U"}
                            </div>
                            <span className="text-sm font-semibold text-gray-700">{order.user?.name || "Deleted User"}</span>
                          </div>
                        </td>
                        <td className="px-8 py-5 font-extrabold text-gray-900 text-sm">${Number(order.total).toFixed(2)}</td>
                        <td className="px-8 py-5 text-gray-400 text-sm font-medium">{new Date(order.created_at).toLocaleDateString()}</td>
                        <td className="px-8 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            order.status === 'completed' || order.status === 'paid' ? 'bg-green-100 text-green-700' : 
                            order.status === 'pending' || order.status === 'processing' ? 'bg-amber-100 text-amber-700' : 
                            'bg-red-100 text-red-700'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${order.status === 'completed' || order.status === 'paid' ? 'bg-green-500' : order.status === 'pending' || order.status === 'processing' ? 'bg-amber-500' : 'bg-red-500'}`}></span>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right relative">
                          {editingOrderId === order.id ? (
                            <div className="absolute right-8 top-12 z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-64 animate-in fade-in zoom-in duration-200">
                              <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-extraBold text-gray-900 uppercase tracking-wider">change order's status</span>
                                <button onClick={() => setEditingOrderId(null)} className="p-1 hover:bg-gray-100 rounded-full text-gray-400">
                                  <X size={14} />
                                </button>
                              </div>
                              
                              <div className="space-y-1 mb-4">
                                {statuses.map((s) => (
                                  <button
                                    key={s.label}
                                    onClick={() => setTempStatus(s.label)}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                                      tempStatus === s.label 
                                        ? `${s.bg} ${s.color} border border-current/20` 
                                        : "text-gray-500 hover:bg-gray-50 border border-transparent"
                                    }`}
                                  >
                                    <span className={`${tempStatus === s.label ? s.color : "text-gray-400"}`}>
                                      {s.icon}
                                    </span>
                                    {s.label}
                                    {tempStatus === s.label && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-current" />}
                                  </button>
                                ))}
                              </div>

                              <button 
                                onClick={() => handleUpdateStatus(order.id)}
                                disabled={isUpdating}
                                className="w-full h-10 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                              >
                                {isUpdating ? <Loader color="white" /> : "validate changes"}
                              </button>
                            </div>
                          ) : (
                            <button 
                              onClick={() => {
                                setEditingOrderId(order.id);
                                setTempStatus(order.status);
                              }}
                              className="px-4 py-2 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 font-bold text-xs rounded-xl transition-all flex items-center gap-2 ml-auto shadow-sm active:scale-95"
                            >
                              <RefreshCw size={14} />
                              Update Status
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-8 py-10 text-center text-gray-400 font-medium italic">
                        No transactions found for this period.
                      </td>
                    </tr>
                  )}
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
