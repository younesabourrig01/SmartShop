import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useGetCategoryQuery } from "../../store/api/categoryApi";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Layers } from "lucide-react";
import ProductCard from "../../components/Cards/ProductCard";
import PageLoader from "../../components/Loader/PageLoader";
import { useTranslation } from "react-i18next";

interface Product {
  id: number;
  name: string;
  price: number;
  images: { url: string }[];
}

interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  products: Product[];
}

const ShowCategory: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const { data, isLoading: loading } = useGetCategoryQuery(id as string, { skip: !id });
  const category = data as unknown as Category;
  const API_BASE_URL = "http://127.0.0.1:8000/storage/";

  if (loading) return <PageLoader />;
  if (!category) return <div className="pt-32 text-center h-screen">Category not found</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Link */}
        <Link
          to="/categories"
          className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 transition-colors mb-8 font-bold group"
        >
          <div className="p-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700 group-hover:bg-blue-50 transition-colors">
            <ArrowLeft size={18} />
          </div>
          {t("product_page.back_to_products") || "Back to Categories"}
        </Link>

        {/* Category Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border border-slate-100 dark:border-slate-700 shadow-sm mb-12 relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-1/3 h-full opacity-[0.03] pointer-events-none">
            <Layers size={300} className="-rotate-12 translate-x-20 -translate-y-20" />
          </div>

          <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
            <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-500/10 dark:shadow-none border-4 border-slate-50">
              <img
                src={
                  category.image && category.image.startsWith("http")
                    ? category.image
                    : category.image ? `${API_BASE_URL}${category.image}` : "https://via.placeholder.com/400x400?text=No+Category+Image"
                }
                alt={category.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/400x400?text=No+Category+Image";
                }}
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest rounded-full mb-4">
                {t("categories.items.count", "Items")} : {category.products.length}
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                {category.name}
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                {category.description || "Explore our wide range of carefully curated products in this category."}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Products Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8 flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-500/30 dark:shadow-none">
              <ShoppingBag size={24} />
            </div>
            {t("nav.products")}
          </h2>

          {category.products.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-100 dark:border-slate-700"
            >
              <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-full inline-block mb-6 text-slate-300">
                <ShoppingBag size={48} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{t("products.filter.no_results")}</h3>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {category.products.map((product, index) => (
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
      </div>
    </div>
  );
};

export default ShowCategory;
