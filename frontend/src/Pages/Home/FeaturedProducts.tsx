import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ProductContext } from '../../context/ProductContext';
import ProductCard from '../../components/Cards/ProductCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const FeaturedProducts: React.FC = () => {
  const { products, loading } = useContext(ProductContext);
  const { t } = useTranslation();

  // Show top 4 products
  const featured = products?.slice(0, 4) || [];

  return (
    <section className="w-full py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
      {/* Subtle decorative dot grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #0f172a 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 text-start rtl:text-right">
          <div className="max-w-lg">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 border border-indigo-100 rounded-full mb-5">
              <Sparkles size={13} className="text-indigo-500" />
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-indigo-600">
                Editor's Picks
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              {t('products.banner.title') || 'Featured Products'}
            </h2>
            <p className="text-base text-slate-500 font-medium leading-relaxed">
              {t('products.description') || 'Hand-picked for quality, design & performance.'}
            </p>
          </div>

          <Link
            to="/products"
            className="group inline-flex items-center gap-2 text-indigo-600 font-bold text-sm shrink-0 hover:text-indigo-700 transition-colors"
          >
            <span>{t('categories.banner.cta') || 'View All'}</span>
            <ArrowRight
              size={17}
              className="group-hover:translate-x-1 rtl:rotate-180 transition-transform"
            />
          </Link>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map(i => (
              <div
                key={i}
                className="bg-white/70 animate-pulse rounded-[2rem] aspect-[4/5] w-full ring-1 ring-black/5"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {featured.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.55, delay: idx * 0.1 }}
                className="h-full"
              >
                <ProductCard
                  id={product.id}
                  image={product.images && product.images[0] ? product.images[0].url : ''}
                  title={product.name}
                  price={product.price}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
