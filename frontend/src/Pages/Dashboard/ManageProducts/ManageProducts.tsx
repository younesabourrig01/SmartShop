import React, { useState, useContext } from "react";
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
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "../../../components/Loader/Loader";
import PageLoader from "../../../components/Loader/PageLoader";
import { useAuth } from "../../../context/AuthContext";
import { ProductContext } from "../../../context/ProductContext";
import { logout } from "../../../api/auth";
import { getCategories } from "../../../api/category";
import { deleteProduct } from "../../../api/products";
import toast from "react-hot-toast";
import ProductForm from "../../../components/Dashboard/ProductForm";
import DeleteConfirm from "../../../components/Dashboard/DeleteConfirm";
import { API_BASE_URL } from "../../../api/client";

const ManageProducts: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { clearAuth } = useAuth();
  const { products, loading, currentPage, lastPage, setCurrentPage, refreshProducts } = useContext(ProductContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [categories, setCategories] = useState<any[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDeleteClick = (product: any) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    
    setIsDeleting(true);
    setDeletingId(productToDelete.id);
    try {
      await deleteProduct(productToDelete.id);
      toast.success(`${productToDelete.name} deleted successfully`);
      refreshProducts();
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete product");
    } finally {
      setIsDeleting(false);
      setDeletingId(null);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      if (res.data && res.data.status === "success") {
        setCategories(res.data.data);
      }
    } catch (error) {
       console.error("Failed to load categories", error);
    }
  };

  React.useEffect(() => {
    loadCategories();
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesCategory = true;
    if (categoryFilter === 'low_stock') {
        matchesCategory = p.stock < 20;
    } else if (categoryFilter === 'high_stock') {
        matchesCategory = p.stock >= 20;
    } else if (categoryFilter !== 'all') {
        matchesCategory = p.category?.id.toString() === categoryFilter;
    }
    
    return matchesSearch && matchesCategory;
  });

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
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: any) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  return (
    <div className="flex bg-gray-50 text-gray-800 font-sans min-h-screen">
      {/* Sidebar - Reusing Dashboard side bar style */}
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
          <button className="flex items-center gap-3 w-full p-3 bg-blue-50 text-blue-600 rounded-xl font-semibold transition-all">
            <Package size={20} />
            {t('dashboard.sidebar.products')}
          </button>
          <button onClick={() => navigate('/dashboard/categories')} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Layers size={20} />
            {t('dashboard.sidebar.categories')}
          </button>
          <button onClick={() => navigate('/dashboard/settings')} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
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
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
        {/* Header */}
        <header className="sticky top-0 bg-white dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 p-6 flex justify-between items-center z-10">
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

        <div className="p-8 space-y-6 relative">          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
            </div>
            <div className="relative w-full md:w-auto">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all shadow-sm ${categoryFilter !== 'all' ? 'bg-indigo-600 text-white shadow-indigo-100' : 'bg-white dark:bg-slate-900 border border-gray-100 text-gray-600 hover:bg-gray-50'}`}
              >
                <Filter size={18} />
                {categoryFilter === 'all' ? 'All Products' : 
                 categoryFilter === 'low_stock' ? 'Low Stock' :
                 categoryFilter === 'high_stock' ? 'High Stock' :
                 categories.find(c => c.id.toString() === categoryFilter)?.name || 'Filter'}
              </button>

              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="mb-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-2">Dashboard Filters</p>
                        <div className="space-y-1">
                            <button
                                onClick={() => {
                                    setCategoryFilter('all');
                                    setIsFilterOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${categoryFilter === 'all' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                <Layers size={14}/>
                                All Products
                            </button>
                            <button
                                onClick={() => {
                                    setCategoryFilter('low_stock');
                                    setIsFilterOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${categoryFilter === 'low_stock' ? 'bg-red-50 text-red-600' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                <AlertTriangle size={14} className={categoryFilter === 'low_stock' ? 'text-red-500' : 'text-red-400'}/>
                                Low Stock ({"< 20"})
                            </button>
                            <button
                                onClick={() => {
                                    setCategoryFilter('high_stock');
                                    setIsFilterOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${categoryFilter === 'high_stock' ? 'bg-green-50 text-green-600' : 'text-gray-500 hover:bg-gray-50'}`}
                            >
                                <CheckCircle size={14} className={categoryFilter === 'high_stock' ? 'text-green-500' : 'text-green-400'}/>
                                Healthy Stock ({">= 20"})
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-3">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 px-2">Categories</p>
                        <div className="space-y-1 max-h-48 overflow-y-auto scrollbar-hide">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setCategoryFilter(cat.id.toString());
                                        setIsFilterOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-bold transition-all ${categoryFilter === cat.id.toString() ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' : 'text-gray-500 hover:bg-gray-50'}`}
                                >
                                    <Package size={14}/>
                                    {cat.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
              )}
            </div>
          </div>

          {/* Products Table */}
          {loading && <PageLoader/>}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/20 overflow-hidden">
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
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img 
                            src={product.images?.[0]?.url || "https://via.placeholder.com/150"} 
                            alt={product.name} 
                            className="w-12 h-12 rounded-xl object-cover shadow-sm border border-gray-100 font-bold text-[10px] text-center"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                            }}
                          />
                          <div>
                            <p className="text-sm font-extrabold text-gray-900 leading-tight">{product.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">ID: {product.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-wider">
                          {product.category?.name || "Uncategorized"}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-extrabold text-gray-900">{product.price.toFixed(2)} MAD</span>
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
                            onClick={() => navigate(`/product/${product.id}`)}
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
                            onClick={() => handleDeleteClick(product)}
                            disabled={deletingId === product.id}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-lg transition-all disabled:opacity-50"
                            title="Delete"
                          >
                            {deletingId === product.id ? <Loader size={18} color="#ef4444" /> : <Trash2 size={18} />}
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
            
            {/* Pagination Implementation from Products page */}
            {lastPage > 1 && (
              <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex flex-col items-center gap-5">
                {/* Progress bar */}
                <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    initial={false}
                    animate={{ width: `${(currentPage / lastPage) * 100}%` }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                </div>

                <div className="flex items-center gap-2 bg-white dark:bg-slate-900/80 backdrop-blur-xl px-4 py-3 rounded-[2rem] border border-gray-100 shadow-lg shadow-gray-200/50">
                  {/* First Page */}
                  <button
                    onClick={() => setCurrentPage(1)}
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                    title={t("common.first_page") || "First page"}
                  >
                    <ChevronsLeft size={18} strokeWidth={2.5} />
                  </button>

                  {/* Prev */}
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                    title={t("common.previous") || "Previous"}
                  >
                    <ChevronLeft size={18} strokeWidth={2.5} />
                  </button>

                  <div className="w-px h-6 bg-gray-200 mx-1" />

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {(() => {
                      const pages: (number | string)[] = [];
                      const delta = 1;
                      const left = Math.max(2, currentPage - delta);
                      const right = Math.min(lastPage - 1, currentPage + delta);

                      pages.push(1);
                      if (left > 2) pages.push("...");
                      for (let i = left; i <= right; i++) pages.push(i);
                      if (right < lastPage - 1) pages.push("...");
                      if (lastPage > 1) pages.push(lastPage);

                      return pages.map((page, idx) =>
                        typeof page === "string" ? (
                          <span key={`ellipsis-${idx}`} className="w-10 flex items-center justify-center text-gray-300 text-sm font-bold select-none">•••</span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`relative w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 ${
                              currentPage === page ? "text-white" : "text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                            }`}
                          >
                            {currentPage === page && (
                              <motion.div
                                layoutId="activePage"
                                className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/30"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                              />
                            )}
                            <span className="relative z-10">{page}</span>
                          </button>
                        )
                      );
                    })()}
                  </div>

                  <div className="w-px h-6 bg-gray-200 mx-1" />

                  {/* Next */}
                  <button
                    onClick={() => setCurrentPage(Math.min(lastPage, currentPage + 1))}
                    disabled={currentPage === lastPage}
                    className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                    title={t("common.next") || "Next"}
                  >
                    <ChevronRight size={18} strokeWidth={2.5} />
                  </button>

                  {/* Last Page */}
                  <button
                    onClick={() => setCurrentPage(lastPage)}
                    disabled={currentPage === lastPage}
                    className="p-2.5 rounded-xl text-gray-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                    title={t("common.last_page") || "Last page"}
                  >
                    <ChevronsRight size={18} strokeWidth={2.5} />
                  </button>
                </div>

                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  {t("common.page") || "Page"} {currentPage} {t("common.of") || "of"} {lastPage} • {filteredProducts.length} Products
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Product Form Modal */}
      <ProductForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        initialData={editingProduct}
        title={editingProduct ? "Update Product" : "Add New Product"}
        onSuccess={refreshProducts}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirm 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete "${productToDelete?.name}"? This action cannot be undone.`}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default ManageProducts;
