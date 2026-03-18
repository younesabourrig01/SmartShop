import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getWishlist } from "../api/wishlist";
import { useAuth } from "./AuthContext";

interface WishlistContextType {
  wishlistCount: number;
  refreshWishlistCount: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistCount, setWishlistCount] = useState(0);
  const { user } = useAuth();

  const refreshWishlistCount = useCallback(async () => {
    if (!user) {
      setWishlistCount(0);
      return;
    }
    try {
      const res = await getWishlist();
      // res.data might be direct array or {data: []} based on Wishlist.tsx logic (res.data?.data || res.data || [])
      const data = res.data?.data || (Array.isArray(res.data) ? res.data : []);
      setWishlistCount(data.length);
    } catch (err) {
      console.error("Failed to fetch wishlist count", err);
      setWishlistCount(0);
    }
  }, [user]);

  useEffect(() => {
    refreshWishlistCount();
  }, [refreshWishlistCount]);

  return (
    <WishlistContext.Provider value={{ wishlistCount, refreshWishlistCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
