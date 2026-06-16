import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLoader from '../../components/Loader/PageLoader';
import { useAppSelector } from '../../store/hooks';
import { useGetWishlistQuery, useRemoveFromWishlistMutation } from '../../store/api/wishlistApi';
import { useAddToCartMutation } from '../../store/api/cartApi';
import { Product } from '../../types';
import toast from 'react-hot-toast';
import { getImageUrl } from '../../api/client';

const Wishlist: React.FC = () => {
  const { t } = useTranslation();
  const token = useAppSelector((state) => state.auth.token);

  const { data: wishlistProducts = [], isLoading: loading } = useGetWishlistQuery(undefined, { skip: !token });
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const [addToCart] = useAddToCartMutation();

  const [isRemoving, setIsRemoving] = useState<number | string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState<number | string | null>(null);

  const handleRemove = async (productId: number | string) => {
    setIsRemoving(productId);
    try {
      await removeFromWishlist(productId).unwrap();
      toast.success(t('wishlist.removed_success'));
    } catch (err) {
      console.error(err);
      toast.error(t('wishlist.removed_failed'));
    } finally {
      setIsRemoving(null);
    }
  };

  const handleAddToCart = async (productId: number | string) => {
    setIsAddingToCart(productId);
    try {
      await addToCart({ productId, quantity: 1 }).unwrap();
      toast.success(t('wishlist.added_success'));
    } catch (err) {
      console.error(err);
      toast.error(t('wishlist.added_failed'));
    } finally {
      setIsAddingToCart(null);
    }
  };

  if (loading && wishlistProducts.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-slate-950 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <Link 
              to="/products" 
              className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm mb-4 hover:gap-3 transition-all italic underline"
            >
              <ArrowLeft size={16} />
              {t('wishlist.back')}
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-pink-50 text-pink-500 rounded-3xl shadow-sm">
                <Heart size={32} fill="currentColor" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  {t('wishlist.title')}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
                  {wishlistProducts.length} {t('wishlist.items')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Grid */}
        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:shadow-pink-500/10 dark:shadow-none transition-all duration-500 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800">
                  <img 
                    src={getImageUrl(product.images?.[0]?.url)} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => handleRemove(product.id)}
                      disabled={isRemoving === product.id}
                      className="p-3 bg-white dark:bg-slate-900/90 backdrop-blur-md text-slate-400 hover:text-red-500 rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 active:scale-90 disabled:opacity-50"
                      title={t('wishlist.removed_success')}
                    >
                      {isRemoving === product.id ? (
                        <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 size={20} />
                      )}
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="px-4 py-1.5 bg-white dark:bg-slate-900/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 shadow-sm">
                      {product.category?.name || 'Uncategorized'}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 flex flex-col flex-grow">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 transition-colors duration-300 line-clamp-1 mb-2">
                      {product.name}
                    </h3>
                  </Link>
                  
                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {t('wishlist.price_label')}
                      </span>
                      <span className="text-2xl font-black text-slate-900 dark:text-white">{product.price} MAD</span>
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      disabled={isAddingToCart === product.id}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/25 dark:shadow-none hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-50"
                    >
                      {isAddingToCart === product.id ? (
                        <div className="w-5 h-5 border-2 border-white dark:border-slate-800 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ShoppingCart size={18} />
                      )}
                      {t('wishlist.add_to_cart')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white dark:bg-slate-900 rounded-[3.5rem] border-2 border-dashed border-slate-100 dark:border-slate-800 shadow-inner">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 mb-8 blur-sm animate-pulse">
              <Heart size={48} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2">{t('wishlist.empty')}</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-10 max-w-xs text-center">{t('wishlist.empty_desc')}</p>
            <Link 
              to="/products" 
              className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-500/20 dark:shadow-none hover:bg-blue-700 hover:-translate-y-1 transition-all"
            >
              {t('wishlist.explore')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
