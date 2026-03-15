import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { 
  Layers, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye, 
  LayoutDashboard, 
  Users, 
  Package, 
  Settings, 
  LogOut,
  X,
  Menu,
  Filter
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { logout } from "../../../api/auth";
import toast from "react-hot-toast";
import CategoryForm from "../../../components/Dashboard/CategoryForm";

const ManageCategories: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { clearAuth } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const mockCategories = [
    {
      id: 1,
      name: "Electronics",
      description: "Latest gadgets and electronic devices.",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&q=80",
      productCount: 156
    },
    {
      id: 2,
      name: "Audio",
      description: "Premium headphones, speakers and audio gear.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80",
      productCount: 84
    },
    {
      id: 3,
      name: "Smart Home",
      description: "Devices to make your home smarter.",
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80",
      productCount: 42
    }
  ];

  const handleLogout = async () => {
    try {
      await logout();
      clearAuth();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const openAddForm = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const openEditForm = (category: any) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  return (
    <div className="flex bg-gray-50 text-gray-800 font-sans min-h-[calc(100vh-76px)]">
      {/* Sidebar - Reusing Dashboard side bar style */}
      <aside className={`bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm transition-all duration-300 ease-in-out sticky top-[76px] h-[calc(100vh-76px)] overflow-hidden ${isSidebarOpen ? 'w-64' : 'w-0 border-none'}`}>
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
          <button className="flex items-center gap-3 w-full p-3 bg-blue-50 text-blue-600 rounded-xl font-semibold transition-all">
            <Layers size={20} />
            {t('dashboard.sidebar.categories')}
          </button>
          <button onClick={() => navigate('/dashboard/settings')} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Settings size={20} />
            {t('dashboard.sidebar.settings')}
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all font-bold group shadow-sm">
            <LogOut size={20} />
            {t('dashboard.sidebar.logout')}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="sticky top-[76px] bg-white/95 backdrop-blur-md border-b border-gray-100 p-6 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-extrabold text-gray-900">Manage Categories</h1>
          </div>
          <button 
            onClick={openAddForm}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            <Plus size={20} />
            Add Category
          </button>
        </header>

        <div className="p-8 space-y-6">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search categories..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
                <Filter size={18} />
                Filter
              </button>
            </div>
          </div>

          {/* Categories Table */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-8 py-5">Category</th>
                    <th className="px-8 py-5">Description</th>
                    <th className="px-8 py-5">Products</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockCategories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img 
                            src={category.image} 
                            alt={category.name} 
                            className="w-12 h-12 rounded-xl object-cover shadow-sm border border-gray-100"
                          />
                          <div>
                            <p className="text-sm font-extrabold text-gray-900 leading-tight">{category.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">ID: {category.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm text-gray-500 font-medium max-w-xs truncate">{category.description}</p>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-extrabold text-gray-900">{category.productCount} Items</span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => toast(`Viewing ${category.name}`)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Show Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => openEditForm(category)}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                            title="Update"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button 
                            onClick={() => toast(`Deleted ${category.name}`)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                            title="Delete"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        <button className="md:hidden p-2 text-gray-400 hover:text-gray-600 bg-gray-50 rounded-lg group-hover:hidden">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination Placeholder */}
            <div className="p-6 bg-gray-50/50 border-t border-gray-100 flex justify-center">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing {mockCategories.length} of {mockCategories.length} Categories</p>
            </div>
          </div>
        </div>
      </main>

      {/* Category Form Modal */}
      <CategoryForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        initialData={editingCategory}
        title={editingCategory ? "Update Category" : "Add New Category"}
      />
    </div>
  );
};

export default ManageCategories;
