import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { 
  Users as UsersIcon, 
  Search, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye, 
  LayoutDashboard, 
  Package, 
  Layers, 
  Settings, 
  LogOut,
  X,
  Menu,
  Filter,
  Fingerprint,
  Crown,
  CheckCircle2,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Calendar as CalendarIcon,
  Megaphone
} from "lucide-react";
import { useAppDispatch } from "../../../store/hooks";
import { clearAuth } from "../../../store/slices/authSlice";
import { getAllUsers, logout } from "../../../api/auth";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";
import PageLoader from "../../../components/Loader/PageLoader";

const Users: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const fetchUsers = async (page: number) => {
    setIsLoading(true);
    try {
      const res = await getAllUsers(page);
      if (res.data.status === "success") {
        setUsers(res.data.data.data);
        setPagination(res.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name?.toLowerCase().includes(searchQuery.toLowerCase()) || u.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });


  const handleDelete = (id: number, name: string) => {
    setDeletingId(id);
    toast.loading(`Deleting ${name}...`, { duration: 1500 });
    setTimeout(() => {
      setDeletingId(null);
      toast.success(`${name} deleted successfully`);
    }, 1500);
  };


  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      dispatch(clearAuth());
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-slate-100 font-sans min-h-screen">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar - mobile drawer / desktop panel */}
      <aside className={`
        bg-white dark:bg-slate-900 border-r border-gray-200 flex flex-col z-40 shadow-xl transition-all duration-300 ease-in-out
        fixed top-[48px] md:top-[64px] left-0 h-[calc(100vh-48px)] md:h-[calc(100vh-64px)] w-72
        lg:sticky lg:top-[64px] lg:h-[calc(100vh-64px)] lg:shadow-sm lg:z-20
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
          <button className="flex items-center gap-3 w-full p-3 bg-blue-50 text-blue-600 rounded-xl font-semibold transition-all">
            <UsersIcon size={20} />
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
          <button onClick={() => { navigate("/dashboard/ads"); setIsSidebarOpen(false); }} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Megaphone size={20} />
            {t("dashboard.sidebar.ads")}
          </button>
          <button onClick={() => { navigate('/dashboard/settings'); setIsSidebarOpen(false); }} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Settings size={20} />
            {t('dashboard.sidebar.settings')}
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} disabled={isLoading} className="flex items-center gap-3 w-full p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all font-bold shadow-sm disabled:opacity-70">
            {isLoading ? <Loader color="#dc2626" /> : <LogOut size={20} />}
            {t('dashboard.sidebar.logout')}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out w-full">
        {/* Header */}
        <header className="sticky top-[48px] md:top-[64px] bg-white dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 px-4 py-4 md:px-6 flex justify-between items-center z-40">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
              <Menu size={22} />
            </button>
            <h1 className="text-lg md:text-2xl font-extrabold text-gray-900">Manage Users</h1>
          </div>
        </header>

        <div className="p-8 space-y-6">
          {isLoading ? (
            <div className="flex items-center justify-center min-h-[400px]">
               <PageLoader />
            </div>
          ) : (
            <>
              {/* Controls */}
              <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                    placeholder="Search users..." 
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                  />
                </div>
                <div className="relative w-full md:w-auto">
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm ${roleFilter !== 'all' ? 'bg-blue-600 text-white shadow-blue-100 dark:shadow-none' : 'bg-white dark:bg-slate-900 border border-gray-100 text-gray-600 hover:bg-gray-50'}`}
                    >
                        <Filter size={18} />
                        Filter {roleFilter !== 'all' ? `: ${roleFilter}` : ''}
                    </button>

                    {isFilterOpen && (
                        <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-2">Filter By Badge & Role</p>
                            <div className="space-y-1">
                                {[
                                    { label: 'All Users', value: 'all', icon: <UsersIcon size={14}/> },
                                    { label: 'Administrators', value: 'Admin', icon: <Crown size={14} className="text-amber-500"/> },
                                    { label: 'Regular Customers', value: 'User', icon: <CheckCircle2 size={14} className="text-blue-500"/> }
                                ].map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => {
                                            setRoleFilter(opt.value);
                                            setCurrentPage(1);
                                            setIsFilterOpen(false);
                                        }}
                                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${roleFilter === opt.value ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'text-gray-500 hover:bg-gray-50'}`}
                                    >
                                        {opt.icon}
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
              </div>

              {/* Users Table */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/20 dark:shadow-none overflow-hidden relative min-h-[400px]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase font-bold">
                      <tr>
                        <th className="px-8 py-5">User</th>
                        <th className="px-8 py-5">Role</th>
                        <th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                            <td className="px-8 py-5">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center overflow-hidden">
                                  {user.image ? (
                                    <img 
                                      src={`http://127.0.0.1:8000/storage/${user.image}`} 
                                      alt={user.name}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase">
                                      {user.name?.substring(0, 2) || user.email?.substring(0, 2)}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-extrabold text-gray-900 leading-tight">{user.name || "N/A"}</p>
                                  <p className="text-xs text-gray-400 font-medium">{user.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-5">
                              <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm transition-all relative overflow-hidden group/badge ${
                                user.role === 'Admin' 
                                ? 'bg-gradient-to-r from-yellow-300 via-amber-500 to-yellow-600 text-white shadow-amber-200 dark:shadow-none' 
                                : 'bg-gray-100 text-gray-600'
                              }`}>
                                {user.role === 'Admin' && (
                                  <>
                                    <div className="absolute inset-0 bg-white dark:bg-slate-900/20 translate-x-[-100%] group-hover/badge:translate-x-[100%] transition-transform duration-1000" />
                                    <Crown size={12} className="animate-bounce" />
                                  </>
                                )}
                                {user.role || "User"}
                              </span>
                            </td>
                             <td className="px-8 py-5 text-right">
                               <div className="flex justify-end gap-2">
                                 <button 
                                   onClick={() => {
                                     setSelectedUser(user);
                                     setIsModalOpen(true);
                                   }}
                                   className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 dark:bg-blue-900/30 rounded-xl transition-all flex items-center gap-2 group/btn ml-auto"
                                   title="Show Details"
                                 >
                                   <Eye size={18} className="group-hover/btn:scale-110 transition-transform" />
                                   <span className="text-xs font-bold hidden sm:block italic">View Info</span>
                                 </button>
                               </div>
                             </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-8 py-10 text-center text-gray-400 font-medium italic">
                            No users found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Showing {filteredUsers.length} of {pagination?.total || filteredUsers.length} Users
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-all shadow-sm active:scale-95"
                    >
                      Previous
                    </button>
                    <button 
                      onClick={() => setCurrentPage(p => p + 1)}
                      disabled={!pagination || currentPage === pagination.last_page}
                      className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-50 transition-all shadow-sm active:scale-95"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* User Details Modal */}
      {isModalOpen && selectedUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Modal Header */}
            <div className={`p-8 flex justify-between items-start relative ${selectedUser.role === 'Admin' ? 'bg-gradient-to-br from-blue-900 to-gray-900 text-white border-b-4 border-amber-500' : 'bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 border-b border-gray-100'}`}>
              {/* Admin Gold Banner */}
              {selectedUser.role === 'Admin' && (
                <div className="absolute top-0 left-0">
                  <div className="relative">
                    <div className="bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 text-white text-[10px] font-bold px-8 py-1.5 uppercase tracking-[0.2em] transform -rotate-45 -translate-x-6 translate-y-3 shadow-lg border-b border-amber-300 z-10 flex items-center gap-2">
                       <Crown size={10} />
                       Admin
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-6">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center overflow-hidden shadow-xl border-4 ${selectedUser.role === 'Admin' ? 'border-amber-500 shadow-amber-500/20 dark:shadow-none' : 'border-white dark:border-slate-800'}`}>
                  {selectedUser.image ? (
                    <img src={`http://127.0.0.1:8000/storage/${selectedUser.image}`} alt={selectedUser.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className={`text-2xl font-black ${selectedUser.role === 'Admin' ? 'text-white' : 'text-blue-600 dark:text-blue-400'}`}>
                      {selectedUser.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tight">{selectedUser.name || "N/A"}</h2>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 mt-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm ${selectedUser.role === 'Admin' ? 'bg-amber-500 text-white' : 'bg-blue-600 text-white'}`}>
                    <ShieldCheck size={10} />
                    {selectedUser.role || "User"}
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className={`p-2 rounded-xl transition-all ${selectedUser.role === 'Admin' ? 'hover:bg-white dark:bg-slate-900/10 text-white' : 'hover:bg-gray-200 text-gray-400'}`}
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto scrollbar-hide">
              <div className="grid grid-cols-1 gap-4">
                <InfoRow icon={<Fingerprint size={18}/>} label="User ID" value={`#USR-${selectedUser.id}`} />
                <InfoRow icon={<Mail size={18}/>} label="Email Address" value={selectedUser.email} />
                <InfoRow icon={<Phone size={18}/>} label="Phone Number" value={selectedUser.phone_number || "Not provided"} />
                <InfoRow icon={<MapPin size={18}/>} label="Address" value={selectedUser.adress || "Not provided"} />
                <InfoRow icon={<CalendarIcon size={18}/>} label="Joined Date" value={new Date(selectedUser.created_at).toLocaleDateString(undefined, { dateStyle: 'long' })} />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-gray-50 flex justify-end px-8">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-8 py-3 bg-gray-900 text-white font-black text-sm rounded-2xl hover:bg-gray-800 transition-all shadow-lg active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper Component for Modal Rows
const InfoRow: React.FC<{ icon: React.ReactNode, label: string, value: string }> = ({ icon, label, value }) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-transparent hover:border-gray-100 transition-all group">
    <div className="p-2.5 bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 rounded-xl shadow-sm group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-bold text-gray-900">{value}</p>
    </div>
  </div>
);

export default Users;
