import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import { CategoryProvider } from "../context/CategoryContext";
import { ProductProvider } from "../context/ProductContext";
import { CartProvider } from "../context/CartContext";
import { WishlistProvider } from "../context/WishlistContext";
import { ThemeProvider } from "../context/ThemeContext";

type Props = {
  children: ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <CategoryProvider>
              <ProductProvider>{children}</ProductProvider>
            </CategoryProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
