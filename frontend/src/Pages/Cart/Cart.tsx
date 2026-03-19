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
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PageLoader from "../../components/Loader/PageLoader";
import Loader from "../../components/Loader/Loader";
import { getCart, clearCart, updateCart } from "../../api/cart";
import { createOrder } from "../../api/order";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import toast from "react-hot-toast";

const Cart: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const { refreshCartCount } = useCart();

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [totalCartItems, setTotalCartItems] = useState(null);
  const [updatingItemId, setUpdatingItemId] = useState<number | string | null>(
    null,
  );

  const fetchCart = async () => {
    try {
      const res = await getCart();

      setTotalCartItems(res.data.total);
      setCartItems(res.data.data.cart_items);
    } catch (err) {
      console.error("Failed to fetch cart", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleClearCart = async () => {
    setIsClearing(true);
    try {
      await clearCart();
      setCartItems([]);
    } catch (err) {
      console.error("Failed to clear cart", err);
    } finally {
      setIsClearing(false);
      refreshCartCount();
    }
  };

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
      const res = await createOrder();

      if (res.data.status === "error") {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      setCartItems([]);
      setTotalCartItems(null);
      setTimeout(()=>{
       window.location.href = '/profile';
      },200)
    } catch (err: any) {
      console.error("Failed to create order", err);
      toast.error(err.response?.data?.message || "Failed to create order");
    } finally {
      setIsCheckingOut(false);
      refreshCartCount();
    }
  };

  const handleUpdateQuantity = async (
    productId: number | string,
    newQuantity: number,
  ) => {
    setUpdatingItemId(productId);
    try {
      await updateCart(productId, newQuantity);
      await fetchCart();
      if (newQuantity === 0) {
        toast.success(t("dashboard.cart.product_removed", "Product removed"));
      }
    } catch (err: any) {
      console.error("Failed to update cart", err);
      toast.error(err.response?.data?.message || "Failed to update cart");
    } finally {
      setUpdatingItemId(null);
      refreshCartCount();
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

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-[#f0f2f5] py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-extrabold text-slate-900 flex items-center gap-3"
            >
              <ShoppingCart className="text-blue-600" size={32} />
              {t("dashboard.cart.title", "Shopping Cart")}
            </motion.h1>
            <p className="text-slate-500 mt-1 font-medium">
              {cartItems.length}{" "}
              {t("dashboard.cart.items_count", "items in your tray")}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to="/products"
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-slate-600 font-bold hover:bg-slate-50 transition-all border border-slate-200 shadow-sm"
            >
              <ArrowLeft size={18} />
              {t("dashboard.cart.back", "Back to Shop")}
            </Link>
            <button
              onClick={handleClearCart}
              disabled={isClearing || cartItems.length === 0}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-full ${cartItems.length === 0 ? "bg-slate-50 text-slate-400 border-slate-100 cursor-not-allowed" : "bg-red-50 text-red-600 border-red-100 hover:bg-red-100"} font-bold transition-all disabled:opacity-75 disabled:cursor-not-allowed`}
            >
              {isClearing ? (
                <Loader size={18} color="#ef4444" />
              ) : (
                <Trash2 size={18} />
              )}
              {t("dashboard.cart.clear", "Clear")}
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
                  className="bg-white rounded-3xl p-4 md:p-6 shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6 group hover:shadow-md transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0 relative group">
                    <img
                      src={
                        item.product?.images?.[0]?.url ||
                        item.image ||
                        "https://via.placeholder.com/300"
                      }
                      alt={item.product?.name || item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-300" />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col md:flex-row justify-between w-full gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        {item.product?.category?.name ||
                          item.category ||
                          "Uncategorized"}
                      </span>
                      <h3 className="text-xl font-bold text-slate-800 hover:text-blue-600 transition-colors cursor-pointer leading-tight">
                        {item.product?.name || item.name}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400 text-sm">
                        <ShoppingBag size={14} />
                        <span>In Stock</span>
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col justify-between items-center md:items-end gap-4">
                      <div className="text-2xl font-black text-slate-900">
                        $
                        {(
                          (item.product?.price || item.price || 0) *
                          item.quantity
                        ).toFixed(2)}
                      </div>

                      <div className="flex items-center gap-6">
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-slate-50 rounded-full p-1 border border-slate-200">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.product.id, -1)
                            }
                            disabled={updatingItemId === item.product.id}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-slate-400 hover:text-blue-600 transition-all disabled:opacity-50"
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
                            className="w-12 text-center bg-transparent border-none focus:ring-0 font-bold text-slate-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none disabled:opacity-50"
                            disabled={updatingItemId === item.product.id}
                          />
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.product.id, 1)
                            }
                            disabled={updatingItemId === item.product.id}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-slate-400 hover:text-blue-600 transition-all disabled:opacity-50"
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
                          className="p-2.5 rounded-full bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-300 border border-transparent hover:border-red-100 disabled:opacity-50"
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
                className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100"
              >
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                  <ShoppingBag size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">
                  Your cart is empty
                </h2>
                <p className="text-slate-500 mb-8">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                  to="/products"
                  className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all"
                >
                  {t("dashboard.cart.start_shopping", "Start Shopping")}
                </Link>
              </motion.div>
            )}

            {/* Recommendation Banner */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-6 text-white relative overflow-hidden"
            >
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-xl font-bold">
                    Free Shipping on your first order!
                  </h4>
                  <p className="text-blue-100 text-sm opacity-90">
                    Use code: SMARTSHOP2024 at checkout
                  </p>
                </div>
                <button className="px-6 py-2 bg-white text-blue-600 font-bold rounded-full hover:scale-105 transition-transform">
                  Copy Code
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -left-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            </motion.div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 sticky top-24"
            >
              <h2 className="text-2xl font-black text-slate-800 mb-6">
                {t("dashboard.cart.summary", "Order Summary")}
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center text-slate-500 font-medium">
                  <span>{t("dashboard.cart.shipping", "Shipping")}</span>
                  <span className="text-green-500 font-bold">
                    {t("dashboard.cart.free", "FREE")}
                  </span>
                </div>
                <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-800">
                    {t("dashboard.cart.total", "Total")}
                  </span>
                  <span className="text-3xl font-black text-blue-600">
                    ${totalCartItems}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut || cartItems.length === 0}
                className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-500/20 hover:bg-blue-700 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isCheckingOut ? (
                  <Loader size={20} />
                ) : (
                  <CreditCard
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                )}
                {t("dashboard.cart.checkout", "Checkout Now")}
              </button>

              <div className="mt-8 pt-8 border-t border-slate-100">
                <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Secure checkout powered by Stripe
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
