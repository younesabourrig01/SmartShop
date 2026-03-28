import React, { useState, useContext } from "react";
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
  Megaphone,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { logout } from "../../../api/auth";
import toast from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";
import CategoryForm from "../../../components/Dashboard/CategoryForm";
import CategoryInfo from "../../../components/Dashboard/CategoryInfo";
import DeleteConfirm from "../../../components/Dashboard/DeleteConfirm";
import { CategoryContext } from "../../../context/CategoryContext";
import { deleteCategory } from "../../../api/category";
import PageLoader from "../../../components/Loader/PageLoader";
import { API_BASE_URL } from "../../../api/client";

const ManageCategories: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { clearAuth } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { categories, loading, refreshCategories } = useContext(CategoryContext);

  const handleDeleteClick = (category: any) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedCategory) return;
    setDeletingId(selectedCategory.id);
    try {
      await deleteCategory(selectedCategory.id);
      toast.success(`${selectedCategory.name} deleted successfully`);
      refreshCategories();
      setIsDeleteOpen(false);
      setSelectedCategory(null);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  };

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
    setEditingCategory(null);
    setIsFormOpen(true);
  };

  const openEditForm = (category: any) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };

  const openInfoPopup = (category: any) => {
    setSelectedCategory(category);
    setIsInfoOpen(true);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex bg-gray-50 dark:bg-slate-950 text-gray-800 dark:text-slate-100 font-sans min-h-screen">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar - mobile drawer / desktop panel */}
      <aside
        className={`
          bg-white dark:bg-slate-900 border-r border-gray-200 flex flex-col z-40 shadow-xl transition-all duration-300 ease-in-out
          fixed top-0 left-0 h-full w-72
          lg:sticky lg:top-[88px] lg:h-[calc(100vh-88px)] lg:shadow-sm lg:z-20
          ${isSidebarOpen ? 'translate-x-0 lg:w-64' : '-translate-x-full lg:translate-x-0 lg:w-0 lg:border-none lg:overflow-hidden'}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100 lg:hidden">
          <span className="font-extrabold text-gray-900 text-lg">Dashboard</span>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500"><X size={22} /></button>
        </div>
        <nav className="flex-1 mt-4 lg:mt-6 px-4 space-y-1 overflow-y-auto whitespace-nowrap scrollbar-hide">
          <button onClick={() => { navigate("/dashboard"); setIsSidebarOpen(false); }} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <LayoutDashboard size={20} />
            {t("dashboard.sidebar.dashboard")}
          </button>
          <button onClick={() => { navigate("/dashboard/users"); setIsSidebarOpen(false); }} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Users size={20} />
            {t("dashboard.sidebar.users")}
          </button>
          <button onClick={() => { navigate("/dashboard/products"); setIsSidebarOpen(false); }} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Package size={20} />
            {t("dashboard.sidebar.products")}
          </button>
          <button onClick={() => { navigate("/dashboard/categories"); setIsSidebarOpen(false); }} className="flex items-center gap-3 w-full p-3 bg-blue-50 text-blue-600 rounded-xl font-semibold transition-all">
            <Layers size={20} />
            {t("dashboard.sidebar.categories")}
          </button>
          <button onClick={() => { navigate("/dashboard/ads"); setIsSidebarOpen(false); }} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Megaphone size={20} />
            Manage Ads
          </button>
          <button onClick={() => { navigate("/dashboard/settings"); setIsSidebarOpen(false); }} className="flex items-center gap-3 w-full p-3 text-gray-500 hover:bg-gray-50 hover:text-gray-900 rounded-xl transition-all">
            <Settings size={20} />
            {t("dashboard.sidebar.settings")}
          </button>
        </nav>
        <div className="p-4 border-t border-gray-100">
          <button onClick={handleLogout} disabled={isLoading} className="flex items-center gap-3 w-full p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-all font-bold shadow-sm disabled:opacity-70">
            {isLoading ? <Loader color="#dc2626" /> : <LogOut size={20} />}
            {t("dashboard.sidebar.logout")}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out min-h-[calc(100vh-88px)] w-full">
        {/* Header */}
        <header className="sticky top-[88px] bg-white dark:bg-slate-900/95 backdrop-blur-md border-b border-gray-100 px-4 py-4 md:px-6 flex justify-between items-center z-40">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
              <Menu size={22} />
            </button>
            <h1 className="text-lg md:text-2xl font-extrabold text-gray-900 leading-tight">Manage Categories</h1>
          </div>
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg dark:shadow-none active:scale-95"
          >
            <Plus size={20} />
            Add Category
          </button>
        </header>

        <div className="p-8 space-y-6 flex-1 overflow-y-auto scrollbar-hide">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
            </div>
          </div>

          {/* Categories Table */}
          {loading && <PageLoader />}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/20 dark:shadow-none overflow-hidden">
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
                <tbody className="divide-y divide-gray-50 text-nowarp">
                  {filteredCategories.map((category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-gray-50/50 transition-colors group"
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={category.url?.startsWith('http') ? category.url : `${API_BASE_URL}${category.url || ""}`}
                            alt={category.name}
                            className="w-12 h-12 rounded-xl object-cover shadow-sm border border-gray-100 font-bold text-[10px] text-center"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/150";
                            }}
                          />
                          <div>
                            <p className="text-sm font-extrabold text-gray-900 leading-tight">
                              {category.name}
                            </p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                              ID: {category.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <p className="text-sm text-gray-500 font-medium max-w-xs truncate">
                          {category.description || "No description"}
                        </p>
                      </td>
                      <td className="px-8 py-5 text-wrap">
                        <span className="text-sm font-extrabold text-gray-900">
                          {category.products_count} Items
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex justify-end gap-2 transition-all">
                          <button
                            onClick={() => openInfoPopup(category)}
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
                            onClick={() => handleDeleteClick(category)}
                            disabled={deletingId === category.id}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all disabled:opacity-50"
                            title="Delete"
                          >
                            {deletingId === category.id ? (
                              <Loader size={18} color="#ef4444" />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredCategories.length === 0 && !loading && (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="p-4 bg-gray-50 text-gray-300 rounded-full">
                            <Layers size={48} />
                          </div>
                          <p className="text-gray-400 font-bold tracking-tight">No categories found matching your search</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
        onSuccess={refreshCategories}
      />

      {/* Category Info Popup */}
      <CategoryInfo
        isOpen={isInfoOpen}
        onClose={() => setIsInfoOpen(false)}
        category={selectedCategory}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirm 
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Category"
        message={`Are you sure you want to delete "${selectedCategory?.name}"? This will also affect products associated with it.`}
        isLoading={!!deletingId}
      />
    </div>
  );
};

export default ManageCategories;
