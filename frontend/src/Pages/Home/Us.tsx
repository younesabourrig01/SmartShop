import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Star, Truck, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Us: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const TRUST_BADGES = [
    { icon: Star,   label: t('us.badges.rating')   },
    { icon: Truck,  label: t('us.badges.shipping') },
    { icon: Shield, label: t('us.badges.secure')   },
  ];

  return (
    <section className="relative w-full min-h-[92vh] flex items-center bg-white dark:bg-slate-900 overflow-hidden pt-20 pb-16 lg:pt-28 lg:pb-24">
      {/* Subtle background blobs */}
      <div className="absolute top-0 right-0 w-[45rem] h-[45rem] bg-blue-50 dark:bg-blue-900/30 rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[35rem] h-[35rem] bg-rose-50 rounded-full blur-3xl opacity-50 -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* ── Left: Copy ── */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[55%] flex flex-col items-start rtl:items-end text-start rtl:text-right"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 rounded-full mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-bold tracking-[0.18em] uppercase text-blue-600 dark:text-blue-400">
              {t('us.welcome')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-extrabold text-slate-900 dark:text-white leading-[1.04] tracking-tight mb-6">
            {t('us.title_1')}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-violet-500 italic pr-1">
              {t('us.title_2')}
            </span>
          </h1>

          {/* Sub-copy */}
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl mb-10 font-medium">
            {t('us.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-12">
            <Link to="/products" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full px-8 py-4 bg-slate-900 text-white font-semibold text-base rounded-full shadow-xl shadow-slate-900/20 hover:shadow-slate-900/35 flex items-center justify-center gap-3 transition-all duration-300"
              >
                <ShoppingBag size={19} />
                <span>{t('us.shop_products')}</span>
              </motion.button>
            </Link>

            <Link to="/categories" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ x: isRtl ? -5 : 5 }}
                className="w-full px-8 py-4 text-slate-700 dark:text-slate-200 font-semibold text-base flex items-center justify-center gap-2 group border border-slate-200 dark:border-slate-700 rounded-full hover:bg-slate-50 dark:bg-slate-800 transition-all duration-300"
              >
                <span>{t('slider.category_title')}</span>
                <ArrowRight size={18} className="group-hover:text-blue-600 dark:text-blue-400 transition-colors rtl:rotate-180 shrink-0" />
              </motion.button>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-6">
            {TRUST_BADGES.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-sm font-semibold text-slate-400">
                <Icon size={15} className="text-blue-400 shrink-0" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: Image ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-[45%] relative aspect-[4/5] lg:aspect-auto lg:h-[640px] flex items-center justify-center"
        >
          {/* Main image card */}
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-blue-900/[0.12] ring-1 ring-black/5">
            <img
              src="/hero.png"
              alt="Premium Gadgets"
              className="w-full h-full object-cover scale-[1.03] hover:scale-[1.07] transition-transform duration-[2.5s] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/15 to-transparent mix-blend-overlay" />
          </div>

          {/* Floating review card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
            className={`absolute ${isRtl ? '-right-4 md:-right-6' : '-left-4 md:-left-6'} bottom-14 hidden md:block`}
          >
            <div className="bg-white dark:bg-slate-900/95 backdrop-blur-xl px-5 py-4 rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] border border-white dark:border-slate-800/80 max-w-[210px]">
              <div className="flex -space-x-2.5 mb-3">
                {[21, 22, 23].map(i => (
                  <img
                    key={i}
                    src={`https://i.pravatar.cc/100?img=${i}`}
                    alt="user"
                    className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-800 object-cover"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-snug">
                {t('commantes.joined')}
              </p>
            </div>
          </motion.div>

          {/* Floating badge top-right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className={`absolute top-10 ${isRtl ? '-left-4' : '-right-4'} hidden md:flex items-center gap-2 bg-white dark:bg-slate-900/95 backdrop-blur-xl px-4 py-2.5 rounded-xl shadow-lg border border-white dark:border-slate-800/80`}
          >
            <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center">
              <Shield size={13} className="text-green-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Trusted</p>
              <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100">100% Secure</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Us;
