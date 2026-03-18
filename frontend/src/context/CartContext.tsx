import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getCart } from "../api/cart";
import { useAuth } from "./AuthContext";

interface CartContextType {
  cartCount: number;
  refreshCartCount: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);
  const { user } = useAuth();

  const refreshCartCount = useCallback(async () => {
    if (!user) {
      setCartCount(0);
      return;
    }
    try {
      const res = await getCart();
      // The API response for /cart has data.cart_items
      const count = res.data.data.cart_items?.length || 0;
      setCartCount(count);
    } catch (err) {
      console.error("Failed to fetch cart count", err);
      // In case of error (like 401), reset count
      setCartCount(0);
    }
  }, [user]);

  useEffect(() => {
    refreshCartCount();
  }, [refreshCartCount]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
