import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Banner from '../../components/Banner/Banner';

const CategoriesPage: React.FC = () => {
  const { t } = useTranslation();

  const categories = [
    { id: 'electronics', name: t('categories.items.electronics'), count: 120, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=1000&auto=format&fit=crop', color: 'bg-blue-50' },
    { id: 'fashion', name: t('categories.items.fashion'), count: 85, image: 'https://images.unsplash.com/photo-1445205170230-053b830c6050?q=80&w=1000&auto=format&fit=crop', color: 'bg-pink-50' },
    { id: 'home', name: t('categories.items.home'), count: 64, image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=1000&auto=format&fit=crop', color: 'bg-green-50' },
    { id: 'audio', name: t('categories.items.audio'), count: 42, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop', color: 'bg-purple-50' },
    { id: 'accessories', name: t('categories.items.accessories'), count: 31, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop', color: 'bg-orange-50' },
    { id: 'gaming', name: t('categories.items.gaming'), count: 56, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop', color: 'bg-indigo-50' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Section */}
        <Banner 
          title={t('categories.banner.title')}
          subtitle={t('categories.banner.subtitle')}
          gradient="from-indigo-600 via-purple-600 to-pink-500"
          ctaText={t('categories.banner.cta')}
        />


        {/* Categories Grid */}
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
                <div className={`w-full aspect-square ${cat.color} rounded-[2rem] overflow-hidden mb-8 group-hover:scale-105 transition-all duration-500`}>
                   <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                </div>
                
                <h4 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{cat.name}</h4>
                <div className="flex items-center justify-between mt-6">
                    <p className="text-slate-500 font-bold text-sm bg-slate-50 py-2 px-6 rounded-2xl group-hover:bg-white transition-colors border border-transparent group-hover:border-slate-100">
                        {cat.count} {t('categories.items.count')}
                    </p>
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
