import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import Reviews from '../../components/Reviews/Reviews';
import ProductCard from '../../components/Cards/ProductCard';

const ShowProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(0);

  // Static product data (in a real app, this would come from an API)
  const productsData: Record<string, any> = {
    "1": {
      name: "MacBook Pro M3",
      description: "The most advanced chips ever built for a personal computer. MacBook Pro blasts forward with the M3, M3 Pro, and M3 Max chips. Built on 3-nanometer technology and featuring an all-new GPU architecture, they’re the most advanced chips ever built for a personal computer. And each one brings more pro performance and capability.",
      price: "1,999",
      category: "Laptops",
      stock: 15,
      images: [
        "https://images.unsplash.com/photo-1517336712461-a49a8d5b4ad8?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000&auto=format&fit=crop"
      ]
    },
    "2": {
      name: "iPhone 15 Pro Max",
      description: "iPhone 15 Pro Max has a strong and light aerospace-grade titanium design with a textured matte-glass back. It also features a Ceramic Shield front that’s tougher than any smartphone glass. And it’s splash, water, and dust resistant.",
      price: "1,199",
      category: "Smartphones",
      stock: 8,
      images: [
        "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1696446702183-cbd13d78e1e7?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop"
      ]
    },
    "3": {
      name: "Sony WH-1000XM5",
      description: "Our best noise canceling ever gets even better. With four microphones on each earcup, ambient sound is captured even more accurately for a dramatic reduction in high frequency noise.",
      price: "399",
      category: "Audio",
      stock: 0,
      images: [
        "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1546435770-a3e426da4717?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1583394838336-acd97773cf3f?q=80&w=1000&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=1000&auto=format&fit=crop"
      ]
    },
    "4": {
        name: "iPad Pro 12.9",
        description: "iPad Pro. With astonishing performance, superfast wireless connectivity, and next-generation Apple Pencil experience. Plus, powerful new productivity and collaboration features in iPadOS 16. iPad Pro is the ultimate iPad experience.",
        price: "1,099",
        category: "Tablets",
        stock: 5,
        images: [
          "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1585515320310-259814833e62?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000&auto=format&fit=crop"
        ]
      },
      "5": {
        name: "AirPods Max",
        description: "AirPods Max reimagine over-ear headphones. An Apple-designed dynamic driver provides immersive high-fidelity audio. Every detail, from canopy to cushions, has been designed for an exceptional fit.",
        price: "549",
        category: "Audio",
        stock: 12,
        images: [
          "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1628202926206-c63a34b1618f?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1625249091940-320af6ed9601?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1546435770-a3e426da4717?q=80&w=1000&auto=format&fit=crop",
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop"
        ]
      }
  };

  const product = id ? productsData[id] : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5]">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 mb-4">{t('product_page.not_found')}</h2>
          <Link to="/products" className="text-blue-600 font-bold hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={20} /> {t('product_page.back_to_products')}
          </Link>
        </div>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-[#f0f2f5] pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Navigation */}
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          {t('product_page.back_to_products')}
        </Link>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-50 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Image Gallery */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-slate-50/50">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-inner mb-6 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={selectedImage}
                    src={product.images[selectedImage]}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              <div 
                className="flex gap-4 overflow-x-auto pb-2 scrollbar-none"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style>{`
                  .scrollbar-none::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                {product.images.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-4 transition-all ${
                      selectedImage === index ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Product Info */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest rounded-full">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-black text-slate-900">
                  ${product.price}
                </span>
                <div className="h-8 w-px bg-slate-200" />
                <div className="flex items-center gap-2">
                  {product.stock > 0 ? (
                    <>
                      <CheckCircle2 size={20} className="text-green-500" />
                      <span className="text-green-600 font-bold">{t('product_page.in_stock')} ({product.stock})</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={20} className="text-red-500" />
                      <span className="text-red-600 font-bold">{t('product_page.out_of_stock')}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-6 mb-10 flex-grow">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{t('product_page.description')}</h3>
                  <p className="text-slate-600 font-medium leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button 
                  disabled={product.stock === 0}
                  className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-lg transition-all active:scale-95 shadow-lg ${
                    product.stock > 0 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  <ShoppingCart size={24} />
                  {t('product_page.add_to_cart')}
                </button>
                <button className="px-8 py-5 rounded-2xl bg-slate-50 text-slate-900 font-black text-lg border border-slate-100 hover:bg-white hover:shadow-md transition-all active:scale-95">
                  {t('product_page.wishlist')}
                </button>
              </div>
              
              {/* Extra Info */}
              <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('product_page.free_shipping')}</span>
                  <span className="text-sm font-bold text-slate-700">{t('product_page.on_orders_above')} $50</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{t('product_page.returns')}</span>
                  <span className="text-sm font-bold text-slate-700">30 {t('product_page.days_return')}</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Product Reviews Section */}
        <Reviews />

        {/* Recommendations Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-black text-slate-900 mb-8">{t('product_page.you_may_like')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {[1, 2, 3, 4, 5].map((recId) => {
              const rec = {
                "1": { title: "MacBook Pro M3", price: "1,999", image: "https://images.unsplash.com/photo-1517336712461-a49a8d5b4ad8?q=80&w=1000&auto=format&fit=crop" },
                "2": { title: "iPhone 15 Pro Max", price: "1,199", image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1000&auto=format&fit=crop" },
                "3": { title: "Sony WH-1000XM5", price: "399", image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=1000&auto=format&fit=crop" },
                "4": { title: "iPad Pro 12.9", price: "1,099", image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=1000&auto=format&fit=crop" },
                "5": { title: "AirPods Max", price: "549", image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=1000&auto=format&fit=crop" }
              }[recId.toString()];
              
              if (recId.toString() === id) return null;

              return rec ? (
                <ProductCard 
                  key={recId}
                  id={recId}
                  title={rec.title}
                  price={rec.price}
                  image={rec.image}
                />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProduct;
