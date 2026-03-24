import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageLoader from '../../components/Loader/PageLoader';
import { getWishlist, removeFromWishlist } from '../../api/wishlist';
import { addToCart } from '../../api/cart';
import { Product } from '../../context/ProductContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const Wishlist: React.FC = () => {
  const { t } = useTranslation();

  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState<number | string | null>(null);
  const [isAddingToCart, setIsAddingToCart] = useState<number | string | null>(null);

  const { refreshWishlistCount } = useWishlist();
  const { refreshCartCount } = useCart();

  const fetchWishlist = () => {
    setLoading(true);
    getWishlist()
      .then((res) => {
        const data = res.data?.data || (Array.isArray(res.data) ? res.data : []);
        setWishlistProducts(data);
      })
      .catch((err) => {
        console.error("Failed to fetch wishlist", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (productId: number | string) => {
    setIsRemoving(productId);
    try {
      await removeFromWishlist(productId);
      toast.success(t('product_page.removed_from_wishlist_success') || 'Removed from wishlist');
      setWishlistProducts(prev => prev.filter(p => p.id !== productId));
      refreshWishlistCount();
    } catch (err) {
      console.error(err);
      toast.error('Failed to remove from wishlist');
    } finally {
      setIsRemoving(null);
    }
  };

  const handleAddToCart = async (productId: number | string) => {
    setIsAddingToCart(productId);
    try {
      const res = await addToCart(productId, 1);
      if (res.data.status === 'success') {
        toast.success(res.data.message || t('product_page.added_to_cart_success') || 'Added to cart!');
        refreshCartCount();
      } else {
        toast.error(res.data.message || 'Failed to add to cart');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to add to cart');
    } finally {
      setIsAddingToCart(null);
    }
  };

  if (loading) {
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
              className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm mb-4 hover:gap-3 transition-all"
            >
              <ArrowLeft size={16} />
              {t('wishlist.back', 'Back to Shop')}
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 bg-pink-50 text-pink-500 rounded-3xl shadow-sm">
                <Heart size={32} fill="currentColor" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                  {t('wishlist.title', 'My Wishlist')}
                </h1>
                <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">
                  {wishlistProducts.length} {t('wishlist.items', 'items saved to your wishlist')}
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
                className="group bg-white dark:bg-slate-900 rounded-[2.5rem] overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-2xl hover:shadow-pink-500/10 transition-all duration-500 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800">
                  <img 
                    src={product.images?.[0]?.url || 'https://via.placeholder.com/300'} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <button 
                      onClick={() => handleRemove(product.id)}
                      disabled={isRemoving === product.id}
                      className="p-3 bg-white dark:bg-slate-900/90 backdrop-blur-md text-slate-400 hover:text-red-500 rounded-2xl shadow-lg transition-all duration-300 hover:scale-110 active:scale-90 disabled:opacity-50"
                      title="Remove from wishlist"
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
                  
                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        {t('product_page.price_label', 'Price')}
                      </span>
                      <span className="text-2xl font-black text-slate-900 dark:text-white">{product.price} MAD</span>
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(product.id)}
                      disabled={isAddingToCart === product.id}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-500/25 hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 disabled:opacity-50"
                    >
                      {isAddingToCart === product.id ? (
                        <div className="w-5 h-5 border-2 border-white dark:border-slate-800 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <ShoppingCart size={18} />
                      )}
                      {t('wishlist.add_to_cart', 'Add')}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
            <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 mb-6">
              <Heart size={48} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">{t('wishlist.empty', 'Your wishlist is empty')}</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium mb-8">{t('wishlist.empty_desc', 'Save items you love to find them easily later.')}</p>
            <Link 
              to="/products" 
              className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 hover:bg-blue-700 transition-all"
            >
              {t('wishlist.explore', 'Explore Products')}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
