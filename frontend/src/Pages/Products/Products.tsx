import React, { useState, useContext, useMemo, useEffect } from "react";
import ProductCard from "../../components/Cards/ProductCard";
import Banner from "../../components/Banner/Banner";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ListFilter,
  Layers,
  Search,
  ChevronDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { ProductContext } from "../../context/ProductContext";
import PageLoader from "../../components/Loader/PageLoader";

const Products: React.FC = () => {
  const { t } = useTranslation();

  const {
    products,
    loading,
    currentPage,
    lastPage,
    setCurrentPage,
    categories,
    selectedCategory,
    sortBy,
    search,
    setSelectedCategory,
    setSortBy,
    setSearch,
  } = useContext(ProductContext);

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-slate-900 pt-6 md:pt-24 pb-12 md:pb-20 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 overflow-x-hidden">
        {/* Special Offer Banner */}
        <Banner
          title={t("products.banner.title")}
          subtitle={t("products.banner.subtitle")}
          ctaText={t("products.banner.cta")}
          onCtaClick={() => console.log("Banner clicked")}
        />

        {/* Search Section */}
        <div className="bg-white dark:bg-slate-900 p-4 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-slate-100 dark:border-slate-700 shadow-sm mt-4 md:mt-8 mb-4 md:mb-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-focus-within:opacity-[0.08] transition-opacity duration-500">
            <Search size={120} />
          </div>
          <div className="relative z-10">
            <h2 className="text-lg md:text-2xl font-black text-slate-900 dark:text-white mb-3 md:mb-6 flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/30 dark:shadow-none">
                <Search size={16} />
              </div>
              {t("products.filter.search_title") || "Find Your Product"}
            </h2>
            <div className="relative max-w-3xl">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 md:pl-14 pr-4 py-3 md:py-5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-base md:text-lg text-slate-800 dark:text-slate-100 placeholder-slate-400 shadow-inner"
                placeholder={t("products.filter.search_placeholder") || "Search products..."}
              />
            </div>
          </div>
        </div>

        {/* Filters and Sort Section */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 md:gap-6 mb-6 md:mb-12 bg-white dark:bg-slate-900 p-4 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-2 md:p-3 bg-blue-50 text-blue-600 rounded-xl">
              <ListFilter size={20} />
            </div>
            <div>
              <h3 className="text-base md:text-xl font-black text-slate-900 dark:text-white leading-tight">
                {t("products.filter.title")}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium hidden sm:block">
                {t("products.filter.subtitle")}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2 md:gap-4">
            {/* Category Dropdown */}
            <div className="relative flex-1 sm:w-64">
              <label className="absolute -top-2.5 left-4 px-2 bg-white dark:bg-slate-900 text-[10px] font-black uppercase tracking-widest text-slate-400 z-10">
                {t("products.filter.category")}
              </label>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <Layers size={16} />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-9 pr-8 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm text-slate-800 dark:text-slate-100 appearance-none cursor-pointer"
              >
                <option value="all">
                  {t("products.filter.all_categories")}
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <ChevronDown size={16} />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex-1 sm:w-64">
              <label className="absolute -top-2.5 left-4 px-2 bg-white dark:bg-slate-900 text-[10px] font-black uppercase tracking-widest text-slate-400 z-10">
                {t("products.filter.sort_by")}
              </label>
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <ArrowUpDown size={16} />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-9 pr-8 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-sm text-slate-800 dark:text-slate-100 appearance-none cursor-pointer"
              >
                <option value="min_price">
                  {t("products.filter.min_price")}
                </option>
                <option value="max_price">
                  {t("products.filter.max_price")}
                </option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </div>

        <header className="mb-6 md:mb-12">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl md:text-5xl font-black text-slate-900 dark:text-white"
          >
            {t("products.title")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 md:mt-4 text-sm md:text-lg text-slate-600 dark:text-slate-300 font-medium"
          >
            {t("products.description")}
          </motion.p>
        </header>
        {loading && <PageLoader />}
        {!loading && products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-24 px-4 text-center bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-700"
          >
            <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-full mb-6">
              <Layers size={48} className="text-slate-300" />
            </div>
            <h3 className="text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">
              {t("products.filter.no_results")}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm">
              Try adjusting your filters or search terms to find what you are
              looking for.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard
                  id={product.id}
                  title={product.name}
                  price={product.price}
                  image={product.images?.[0]?.url}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
      {/* Pagination */}
      {lastPage > 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 md:mt-16 flex flex-col items-center gap-4"
        >
          {/* Progress bar */}
          <div className="w-36 md:w-48 h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-500"
              initial={false}
              animate={{ width: `${(currentPage / lastPage) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          <div className="flex items-center gap-1 bg-white dark:bg-slate-900/80 backdrop-blur-xl px-2 py-2 md:px-4 md:py-3 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-none">
            {/* First Page */}
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              title={t("common.first_page") || "First page"}
            >
              <ChevronsLeft size={16} strokeWidth={2.5} />
            </button>

            {/* Prev */}
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              title={t("common.previous") || "Previous"}
            >
              <ChevronLeft size={16} strokeWidth={2.5} />
            </button>

            {/* Divider */}
            <div className="w-px h-5 bg-slate-200 mx-0.5" />

            {/* Page Numbers */}
            <div className="flex items-center gap-0.5">
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
                    <span
                      key={`ellipsis-${idx}`}
                      className="w-8 flex items-center justify-center text-slate-300 text-xs font-bold select-none"
                    >
                      •••
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative w-8 h-8 md:w-10 md:h-10 rounded-xl text-xs md:text-sm font-bold transition-all duration-200 ${
                        currentPage === page
                          ? "text-white"
                          : "text-slate-500 dark:text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      {currentPage === page && (
                        <motion.div
                          layoutId="activePage"
                          className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/30 dark:shadow-none"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                      <span className="relative z-10">{page}</span>
                    </button>
                  )
                );
              })()}
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-slate-200 mx-0.5" />

            {/* Next */}
            <button
              onClick={() =>
                setCurrentPage(Math.min(lastPage, currentPage + 1))
              }
              disabled={currentPage === lastPage}
              className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              title={t("common.next") || "Next"}
            >
              <ChevronRight size={16} strokeWidth={2.5} />
            </button>

            {/* Last Page */}
            <button
              onClick={() => setCurrentPage(lastPage)}
              disabled={currentPage === lastPage}
              className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
              title={t("common.last_page") || "Last page"}
            >
              <ChevronsRight size={16} strokeWidth={2.5} />
            </button>
          </div>

          {/* Page count label */}
          <p className="text-xs font-semibold text-slate-400">
            {t("common.page") || "Page"} {currentPage} {t("common.of") || "of"}{" "}
            {lastPage}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Products;
