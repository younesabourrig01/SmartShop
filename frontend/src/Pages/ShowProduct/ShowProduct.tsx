import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, ArrowLeft, CheckCircle2, XCircle, Loader2, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import Reviews from '../../components/Reviews/Reviews';
import ProductCard from '../../components/Cards/ProductCard';
import { useAppSelector } from '../../store/hooks';
import { useGetProductQuery, useGetProductsQuery } from '../../store/api/productApi';
import { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } from '../../store/api/wishlistApi';
import { useAddToCartMutation } from '../../store/api/cartApi';
import { Product } from '../../types';
import PageLoader from '../../components/Loader/PageLoader';
import { API_BASE_URL, getImageUrl } from '../../api/client';

const ShowProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const token = useAppSelector((state) => state.auth.token);

  // Queries
  const { data: product, isLoading: productLoading, isError } = useGetProductQuery(id || '');
  const { data: productsData } = useGetProductsQuery();
  const { data: wishlistProducts = [] } = useGetWishlistQuery(undefined, { skip: !token });

  // Mutations
  const [addToCart] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisting, setIsWishlisting] = useState(false);

  const inWishlist = wishlistProducts.some((item) => item.id.toString() === id);

  // Reset selected image and scroll to top when id changes
  useEffect(() => {
    setSelectedImage(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const allProducts = productsData?.data || [];

  const handleAddToCart = async () => {
    if (!product) return;
    if (!token) {
      toast.error(t('login.required') || 'Please log in to add items to cart');
      return;
    }
    
    setIsAdding(true);
    try {
      await addToCart({ productId: product.id, quantity: 1 }).unwrap();
      const successMessage = (t('product_page.added_to_cart_success') as string) || 'Product added to cart!';
      toast.success(successMessage);
    } catch (error: any) {
      console.error(error);
      toast.error((t('product_page.added_to_cart_error') as string) || error?.data?.message || 'Failed to add product');
    } finally {
      setIsAdding(false);
    }
  };

  const handleToggleWishlist = async () => {
    if (!product) return;
    if (!token) {
      toast.error(t('login.required') || 'Please log in to save items to wishlist');
      return;
    }
    setIsWishlisting(true);
    try {
      if (inWishlist) {
        await removeFromWishlist(product.id).unwrap();
        toast.success((t('product_page.removed_from_wishlist_success') as string) || 'Removed from wishlist');
      } else {
        await addToWishlist(product.id).unwrap();
        toast.success((t('product_page.added_to_wishlist_success') as string) || 'Added to wishlist');
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.data?.message || 'Failed to update wishlist');
    } finally {
      setIsWishlisting(false);
    }
  };

  if (productLoading) {
    return (
      <div className="min-h-screen pt-24">
        <PageLoader />
      </div>
    );
  }

  // Handle Error/Not Found State
  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5]">
        <div className="text-center">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">{t('product_page.not_found')}</h2>
          <Link to="/products" className="text-blue-600 font-bold hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={20} /> {t('product_page.back_to_products')}
          </Link>
        </div>
      </div>
    );
  }

  // Filter recommendations from context (excluding current product)
  const recommendations = allProducts
    .filter((p) => p.id.toString() !== id)
    .slice(0, 5);

  const productImages = product.images || [];

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-slate-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb / Back Navigation */}
        <Link 
          to="/products" 
          className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-blue-600 font-bold mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          {t('product_page.back_to_products')}
        </Link>

        <div className="bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-[2.5rem] shadow-xl dark:shadow-none border border-slate-50 dark:border-slate-800/60 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Image Gallery */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 bg-slate-50 dark:bg-slate-800/10 border-r border-slate-100 dark:border-slate-800/30">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white dark:bg-slate-900 shadow-inner dark:shadow-none mb-6 group">
                <AnimatePresence mode="wait">
                  {productImages.length > 0 ? (
                    <motion.img
                      key={selectedImage}
                      src={getImageUrl(productImages[selectedImage]?.url)}
                      alt={product.name}
                      initial={{ opacity: 0, scale: 1.1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800/50">
                      No Image Available
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* Thumbnails */}
              {productImages.length > 1 && (
                <div 
                  className="flex gap-4 overflow-x-auto pb-2 scrollbar-none"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  <style>{`
                    .scrollbar-none::-webkit-scrollbar {
                      display: none;
                    }
                  `}</style>
                  {productImages.map((img, index) => (
                    <button
                      key={img.id || index}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-4 transition-all ${
                        selectedImage === index ? 'border-blue-600 scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img 
                        src={getImageUrl(img.url)} 
                        alt={`${product.name} thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover" 
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Product Info */}
            <div className="w-full lg:w-1/2 p-8 lg:p-12 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="px-4 py-1.5 bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-widest rounded-full">
                  {product.category?.name || 'Category'}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {product.price} MAD
                </span>
                <div className="h-8 w-px bg-slate-200" />
                <div className="flex items-center gap-2">
                  {product.stock > 0 ? (
                    <>
                      <CheckCircle2 size={20} className="text-green-500" />
                      <span className="text-green-600 font-bold">{t('product_page.in_stock')}</span>
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
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t('product_page.description')}</h3>
                  <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <button 
                  disabled={product.stock === 0 || isAdding}
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-lg transition-all active:scale-95 ${
                    product.stock > 0 
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg dark:shadow-none' 
                    : 'bg-slate-100 dark:bg-slate-800/50 text-slate-400 cursor-not-allowed shadow-none'
                  }`}
                >
                  {isAdding ? <Loader2 className="animate-spin" size={24} /> : <ShoppingCart size={24} />}
                  {t('product_page.add_to_cart')}
                </button>
                <button 
                  onClick={handleToggleWishlist}
                  disabled={isWishlisting}
                  className={`px-8 py-5 rounded-2xl font-black text-lg border border-slate-100 dark:border-slate-800 hover:shadow-md dark:hover:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2 ${
                    inWishlist ? 'bg-pink-50 text-pink-500 border-pink-100' : 'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white'
                  }`}
                >
                  {isWishlisting ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <Heart size={24} fill={inWishlist ? "currentColor" : "none"} />
                  )}
                  {inWishlist ? 'Saved' : t('product_page.wishlist')}
                </button>
              </div>
              
              
            </div>
          </div>
        </div>

        {/* Product Reviews Section */}
        <Reviews productId={id} />

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-8">{t('product_page.you_may_like')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
              {recommendations.map((rec) => (
                <ProductCard 
                  key={rec.id}
                  id={rec.id}
                  title={rec.name}
                  price={rec.price}
                  image={rec.images?.[0]?.url || ''}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowProduct;
