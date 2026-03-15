import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { 
  Package, 
  Plus, 
  Search, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye, 
  LayoutDashboard, 
  Users, 
  Layers, 
  Settings, 
  LogOut,
  X,
  Menu,
  Filter
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { logout } from "../../../api/auth";
import toast from "react-hot-toast";
import ProductForm from "../../../components/Dashboard/ProductForm";

const ManageProducts: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { clearAuth } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const mockProducts = [
    {
      id: 1,
      name: "iPhone 15 Pro",
      category: "Electronics",
      price: 999.99,
      stock: 45,
      image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80",
      description: "Experience the next level of mobile technology with the iPhone 15 Pro."
    },
    {
      id: 2,
      name: "Sony WH-1000XM5",
      category: "Audio",
      price: 349.00,
      stock: 120,
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80",
      description: "Industry-leading noise canceling headphones with exceptional sound quality."
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
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: any) => {
    setEditingProduct(product);
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
          <button onClick={() => toast("Users page...")} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Users size={20} />
            {t('dashboard.sidebar.users')}
          </button>
          <button className="flex items-center gap-3 w-full p-3 bg-blue-50 text-blue-600 rounded-xl font-semibold transition-all">
            <Package size={20} />
            {t('dashboard.sidebar.products')}
          </button>
          <button onClick={() => toast("Categories page...")} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Layers size={20} />
            {t('dashboard.sidebar.categories')}
          </button>
          <button onClick={() => toast("Settings page...")} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
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
            <h1 className="text-2xl font-extrabold text-gray-900">Manage Products</h1>
          </div>
          <button 
            onClick={openAddForm}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
          >
            <Plus size={20} />
            Add Product
          </button>
        </header>

        <div className="p-8 space-y-6">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search products..." 
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

          {/* Products Table */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 text-gray-400 text-xs uppercase font-bold">
                  <tr>
                    <th className="px-8 py-5">Product</th>
                    <th className="px-8 py-5">Category</th>
                    <th className="px-8 py-5">Price</th>
                    <th className="px-8 py-5">Stock</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-12 h-12 rounded-xl object-cover shadow-sm border border-gray-100"
                          />
                          <div>
                            <p className="text-sm font-extrabold text-gray-900 leading-tight">{product.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-extrabold text-gray-900">${product.price.toFixed(2)}</span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${product.stock > 20 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                          <span className="text-sm font-bold text-gray-600">{product.stock} units</span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => toast(`Viewing ${product.name}`)}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Show Details"
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => openEditForm(product)}
                            className="p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all"
                            title="Update"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button 
                            onClick={() => toast(`Deleted ${product.name}`)}
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
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Showing 2 of 2 Products</p>
            </div>
          </div>
        </div>
      </main>

      {/* Product Form Modal */}
      <ProductForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        initialData={editingProduct}
        title={editingProduct ? "Update Product" : "Add New Product"}
      />
    </div>
  );
};

export default ManageProducts;
