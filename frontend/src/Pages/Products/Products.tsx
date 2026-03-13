import React from 'react';
import ProductCard from '../../components/Cards/ProductCard';
import Banner from '../../components/Banner/Banner';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Products: React.FC = () => {
  const { t } = useTranslation();

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

        <header className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900"
          >
            Our Products
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-600 font-medium"
          >
            Discover our curated collection of premium tech and electronics.
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
