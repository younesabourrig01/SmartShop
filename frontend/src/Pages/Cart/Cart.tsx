import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  ShoppingBag,
  FileText,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PageLoader from "../../components/Loader/PageLoader";
import Loader from "../../components/Loader/Loader";
import { getBadge } from "../../api/auth";
import { API_BASE_URL, getImageUrl } from "../../api/client";
import { useAppSelector } from "../../store/hooks";
import { useGetCartQuery, useUpdateCartMutation, useClearCartMutation } from "../../store/api/cartApi";
import { useCreateOrderMutation, useLazyDownloadInvoiceQuery } from "../../store/api/orderApi";
import toast from "react-hot-toast";

const Cart: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  
  // Queries & Mutations
  const { data: cartData, isLoading: loading } = useGetCartQuery();
  const [updateCart] = useUpdateCartMutation();
  const [clearCart] = useClearCartMutation();
  const [createOrder] = useCreateOrderMutation();
  const [triggerDownloadInvoice] = useLazyDownloadInvoiceQuery();

  const cartItems = cartData?.items || [];
  const totalCartItems = cartData?.totalPrice || 0;

  const [isClearing, setIsClearing] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [updatingItemId, setUpdatingItemId] = useState<number | string | null>(
    null,
  );
  const [showInvoicePopup, setShowInvoicePopup] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [badgeData, setBadgeData] = useState<any>(null);

  useEffect(() => {
    const fetchBadge = async () => {
      try {
        const res = await getBadge();
        setBadgeData(res.data);
      } catch (err) {
        console.error("Failed to fetch badge", err);
      }
    };
    fetchBadge();
  }, []);

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      await clearCart().unwrap();
      toast.success(t("cart.cleared") || "Cart cleared successfully!");
    } catch (err) {
      console.error("Failed to clear cart", err);
    } finally {
      setIsClearing(false);
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await createOrder().unwrap();

      if (res.status === "error") {
        toast.error(res.message);
        return;
      }

      toast.success(res.message || t('cart.checkout_success') || "Order placed successfully!");
      setShowInvoicePopup(true);
    } catch (err: any) {
      console.error("Failed to create order", err);
      toast.error(err.data?.message || t('cart.order_failed') || "Failed to place order");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleDownloadInvoice = async () => {
    setIsDownloading(true);
    try {
      const response = await triggerDownloadInvoice().unwrap();
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success(t('cart.download_success'));
    } catch (error) {
      toast.error(t('cart.download_failed'));
    } finally {
      setIsDownloading(false);
      window.location.href = '/profile';
    }
  };

  const handleUpdateQuantity = async (
    productId: number | string,
    newQuantity: number,
  ) => {
    setUpdatingItemId(productId);
    try {
      await updateCart({ productId, quantity: newQuantity }).unwrap();
      if (newQuantity === 0) {
        toast.success(t("cart.product_removed"));
      }
    } catch (err: any) {
      console.error("Failed to update cart", err);
      toast.error(err.data?.message || t('cart.cart_update_failed'));
    } finally {
      setUpdatingItemId(null);
    }
  };

  const updateQuantity = (
    id: number,
    productId: number | string,
    delta: number,
  ) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      const newQty = Math.max(1, item.quantity + delta);
      handleUpdateQuantity(productId, newQty);
    }
  };

  const handleQuantityChange = (
    id: number,
    productId: number | string,
    value: string,
  ) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 1) {
      handleUpdateQuantity(productId, num);
    }
  };

  if (loading && cartItems.length === 0) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] dark:bg-slate-950 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-3"
            >
              <ShoppingCart className="text-blue-600" size={32} />
              {t("cart.title")}
            </motion.h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1 font-medium italic">
              {cartItems.length}{" "}
              {t("cart.items_count")}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/products"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <ArrowLeft size={18} />
              {t("cart.back")}
            </Link>
            <button
              onClick={handleClearCart}
              disabled={isClearing || cartItems.length === 0}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-full ${cartItems.length === 0 ? "bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-slate-700 cursor-not-allowed" : "bg-red-50 text-red-600 border-red-100 hover:bg-red-100"} font-bold transition-all disabled:opacity-75 disabled:cursor-not-allowed`}
            >
              {isClearing ? (
                <Loader size={18} color="#ef4444" />
              ) : (
                <Trash2 size={18} />
              )}
              {t("cart.clear")}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col md:flex-row items-center gap-6 group hover:shadow-md transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800 flex-shrink-0 relative group">
                    <img
                      src={getImageUrl(item.product?.images?.[0]?.url)}
                      alt={item.product?.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300" />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col md:flex-row justify-between w-full gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {item.product?.category?.name ||
                          "Uncategorized"}
                      </span>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 hover:text-blue-600 transition-colors cursor-pointer leading-tight">
                        {item.product?.name}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400 text-sm italic">
                        <ShoppingBag size={14} />
                        <span>{t('cart.in_stock')}</span>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4">
                      <div className="text-2xl font-black text-slate-900 dark:text-white">
                        {(
                          (item.product?.price || 0) *
                          item.quantity
                        ).toFixed(2)} MAD
                      </div>

                      <div className="flex items-center gap-6">
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-full p-1 border border-slate-200 dark:border-slate-700">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.product.id, -1)
                            }
                            disabled={updatingItemId === item.product.id}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white dark:bg-slate-900 hover:shadow-sm text-slate-400 hover:text-blue-600 transition-all disabled:opacity-50"
                          >
                            <Minus size={16} />
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                item.product.id,
                                e.target.value,
                              )
                            }
                            min="1"
                            className="w-12 text-center bg-transparent border-none focus:ring-0 font-bold text-slate-700 dark:text-slate-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50"
                            disabled={updatingItemId === item.product.id}
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.product.id, 1)
                            }
                            disabled={updatingItemId === item.product.id}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white dark:bg-slate-900 hover:shadow-sm text-slate-400 hover:text-blue-600 transition-all disabled:opacity-50"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.product.id, 0)
                          }
                          disabled={updatingItemId === item.product.id}
                          className="p-2.5 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300 border border-transparent hover:border-red-100 disabled:opacity-50"
                        >
                          {updatingItemId === item.product.id ? (
                            <Loader size={18} color="#ef4444" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center shadow-sm border border-slate-100 dark:border-slate-700"
              >
                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <ShoppingBag size={48} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-2">
                  {t("cart.empty_title")}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium">
                  {t("cart.empty_desc")}
                </p>
                <Link
                  to="/products"
                  className="inline-block bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-blue-500/20 dark:shadow-none hover:bg-blue-700 hover:-translate-y-1 transition-all"
                >
                  {t("cart.start_shopping")}
                </Link>
              </motion.div>
            )}

          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-700 sticky top-24"
            >
              <h2 className="text-2xl font-black text-slate-800 dark:text-white mb-6 tracking-tight">
                {t("cart.summary")}
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 font-medium">
                  <span>{t("cart.subtotal")}</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {Number(totalCartItems || 0).toFixed(2)} MAD
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 font-medium">
                  <div className="flex flex-col">
                    <span>{t("cart.shipping")}</span>
                    {badgeData && (
                      <span className="text-[10px] text-blue-600 font-black uppercase">
                        {t('cart.badge_info', { badge: badgeData.badge, discount: badgeData.shipping_discount * 100 })}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="line-through text-xs text-slate-400">103.00 MAD</span>
                    <span className="text-blue-600 font-black">
                      {(103 * (1 - (badgeData?.shipping_discount || 0))).toFixed(2)} MAD
                    </span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-800 dark:text-white">
                    {t("cart.total")}
                  </span>
                  <span className="text-3xl font-black text-blue-600">
                    {(Number(totalCartItems || 0) + (103 * (1 - (badgeData?.shipping_discount || 0)))).toFixed(2)} MAD
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || cartItems.length === 0}
                className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-500/20 dark:shadow-none hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isCheckingOut ? (
                  <Loader size={20} />
                ) : (
                  <CreditCard
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                )}
                {t("cart.checkout")}
              </button>

              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
                <p className="text-[10px] uppercase font-black tracking-widest text-slate-400 text-center flex items-center justify-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  {t('cart.secure_checkout')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {showInvoicePopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 max-w-sm w-full shadow-2xl space-y-6 text-center"
          >
            <div className="w-20 h-20 bg-green-50 text-green-500 rounded-3xl flex items-center justify-center mx-auto mb-4 border-2 border-white dark:border-slate-800 shadow-lg">
              <ShoppingBag size={40} />
            </div>
            <h3 className="text-3xl font-black text-slate-800 dark:text-white tracking-tight">{t('cart.order_success_title')}</h3>
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{t('cart.order_success_desc')}</p>
            
            <div className="flex flex-col gap-3 mt-8">
              <button 
                onClick={handleDownloadInvoice}
                disabled={isDownloading}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition flex items-center justify-center gap-2 disabled:opacity-75 shadow-lg shadow-blue-500/30 dark:shadow-none"
              >
                {isDownloading ? <Loader size={20} color="#ffffff" /> : <FileText size={20} />}
                {t('cart.download_invoice')}
              </button>
              <button 
                onClick={() => window.location.href = '/profile'}
                className="w-full py-4 bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 rounded-2xl font-bold hover:bg-white dark:hover:bg-slate-800 transition"
              >
                {t('cart.later')}
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default Cart;
