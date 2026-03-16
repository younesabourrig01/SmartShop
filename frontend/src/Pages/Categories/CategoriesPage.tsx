import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";
import Banner from "../../components/Banner/Banner";
import { CategoryContext } from "../../context/CategoryContext";
import { useContext } from "react";
import PageLoader from "../../components/Loader/PageLoader";

const CategoriesPage: React.FC = () => {
  const { t } = useTranslation();
  const { categories, loading } = useContext(CategoryContext);
  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Section */}
        <Banner
          title={t("categories.banner.title")}
          subtitle={t("categories.banner.subtitle")}
          gradient="from-indigo-600 via-purple-600 to-pink-500"
          ctaText={t("categories.banner.cta")}
        />

        {/* Categories Grid */}
        {loading && <PageLoader />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all group cursor-pointer relative overflow-hidden"
            >
              {/* Decorative background circle */}
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-slate-50 rounded-full group-hover:bg-blue-50 transition-colors duration-500" />

              <div className="relative z-10">
                <div
                  className={`w-full aspect-square blue rounded-[2rem] overflow-hidden mb-8 group-hover:scale-105 transition-all duration-500`}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <h4 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {cat.name}
                </h4>
                <div className="flex items-center justify-between mt-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 shadow-lg shadow-slate-200">
                    <ShoppingBag size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
