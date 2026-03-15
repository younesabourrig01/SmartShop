import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LogoAnimation from '../../components/LogoAnimation/LogoAnimation';

const Us: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="relative w-full">
      {/* Main Container Card - Balanced Rounded Corners & Shadow */}
      <div className="w-full bg-white rounded-[2.5rem] shadow-xl border border-slate-50 p-6 md:p-10 lg:p-16 overflow-hidden flex flex-col items-center">
        
        {/* Hero Top Content: Dual Layout */}
        <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 mb-16 z-10 text-start rtl:text-right">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            {/* Minimalist Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-slate-50 rounded-full border border-slate-100 transition-all hover:bg-white hover:shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#01b0d3] animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">{t('us.welcome')}</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter">
              {t('us.title_1')} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0046be] via-[#01b0d3] to-[#43dabb]">
                {t('us.title_2')}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-xl">
              {t('us.description')}
            </p>
            
            <div className="flex flex-col xl:flex-row items-center gap-6 pt-4">
              {/* Primary CTA */}
              <Link to="/products">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-5 bg-[#0046be] text-white font-black text-xl rounded-2xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] flex items-center justify-center gap-3 group"
                >
                  <ShoppingBag size={24} />
                  <span>{t('us.shop_products')}</span>
                </motion.button>
              </Link>

              {/* Secondary CTA */}
              <motion.button 
                whileHover={{ x: 6 }}
                className="flex items-center gap-2 text-slate-900 font-black text-xl group cursor-pointer"
              >
                <span>{t('us.our_story')}</span>
                <ArrowRight size={24} className={`text-[#01b0d3] group-hover:translate-x-1 transition-transform rtl:rotate-180`} />
              </motion.button>
            </div>
          </motion.div>

          {/* Right: The RE-RESTORED Logo Animation */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, x: 50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="w-full lg:w-1/2 relative flex items-center justify-center"
          >
            <LogoAnimation />
          </motion.div>
        </div>

        {/* BOTTOM: Minimalist Search Bar Integration */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-full max-w-4xl relative"
        >
          <div className="relative bg-slate-50 p-2.5 rounded-[2.5rem] shadow-inner flex flex-col md:flex-row items-center gap-4 border border-slate-100/50">
            <div className="flex-1 w-full relative flex items-center">
               <div className={`absolute ${i18n.language === 'ar' ? 'right-7' : 'left-7'} text-slate-400`}>
                  <Search size={24} />
               </div>
               <input 
                 type="text" 
                 placeholder={t('us.search_placeholder')}
                 className={`w-full py-5 ${i18n.language === 'ar' ? 'pr-16 pl-8' : 'pl-16 pr-8'} bg-transparent rounded-[1.8rem] text-lg font-bold text-slate-800 placeholder-slate-400 outline-none`}
               />
            </div>
            <button className="w-full md:w-auto px-10 py-5 bg-[#0046be] text-white font-black text-lg rounded-[2rem] shadow-lg hover:shadow-2xl transition-all cursor-pointer">
              {t('us.search_button')}
            </button>
          </div>

          {/* Trending Bar */}
          <div className="flex justify-center gap-6 mt-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('us.trending')}:</span>
            {["Razer", "iPhone 15", "Gaming PC"].map(tag => (
              <button key={tag} className="text-[10px] font-black uppercase tracking-widest text-[#0046be] opacity-70 hover:opacity-100 transition-opacity cursor-pointer">#{tag}</button>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Us;
