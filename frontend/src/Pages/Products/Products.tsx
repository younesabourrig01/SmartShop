import React, { useState } from 'react';
import ProductCard from '../../components/Cards/ProductCard';
import Banner from '../../components/Banner/Banner';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ListFilter, Layers, ChevronDown, ArrowUpDown } from 'lucide-react';

const Products: React.FC = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Static product data
  const exampleProducts = [
    {
      id: 1,
      title: "MacBook Pro M3",
      price: "1,999",
      image: "https://images.unsplash.com/photo-1517336712461-a49a8d5b4ad8?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "iPhone 15 Pro Max",
      price: "1,199",
      image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Sony WH-1000XM5",
      price: "399",
      image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "iPad Pro 12.9",
      price: "1,099",
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 5,
      title: "AirPods Max",
      price: "549",
      image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f0f2f5] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Special Offer Banner */}
        <Banner 
          title={t('products.banner.title')}
          subtitle={t('products.banner.subtitle')}
          ctaText={t('products.banner.cta')}
          onCtaClick={() => console.log("Banner clicked")}
        />

        {/* Filters and Sort Section */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-12 bg-white p-6 md:p-8 rounded-[2.5rem] border border-slate-100 shadow-sm mt-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <ListFilter size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">{t('products.filter.title')}</h3>
              <p className="text-slate-500 text-sm font-medium">{t('products.filter.subtitle')}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Category Dropdown */}
            <div className="relative w-full sm:w-64">
              <label className="absolute -top-2.5 left-4 px-2 bg-white text-[10px] font-black uppercase tracking-widest text-slate-400 z-10">
                {t('products.filter.category')}
              </label>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <Layers size={18} />
              </div>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 appearance-none cursor-pointer"
              >
                <option value="all">{t('products.filter.all_categories')}</option>
                <option value="electronics">{t('products.filter.electronics')}</option>
                <option value="fashion">{t('products.filter.fashion')}</option>
                <option value="home">{t('products.filter.home')}</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <ChevronDown size={18} />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="relative w-full sm:w-64">
              <label className="absolute -top-2.5 left-4 px-2 bg-white text-[10px] font-black uppercase tracking-widest text-slate-400 z-10">
                {t('products.filter.sort_by')}
              </label>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                <ArrowUpDown size={18} />
              </div>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-12 pr-10 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-bold text-slate-800 appearance-none cursor-pointer"
              >
                <option value="newest">{t('products.filter.newest')}</option>
                <option value="popular">{t('products.filter.popular')}</option>
                <option value="price_low">{t('products.filter.price_low')}</option>
                <option value="price_high">{t('products.filter.price_high')}</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>
        </div>

        <header className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900"
          >
            {t('products.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-600 font-medium"
          >
            {t('products.description')}
          </motion.p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {exampleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard 
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
