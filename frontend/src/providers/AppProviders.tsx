import { ReactNode } from "react";
import { AuthProvider } from "../context/AuthContext";
import { CategoryProvider } from "../context/CategoryContext";
import { ProductProvider } from "../context/ProductContext";

type Props = {
  children: ReactNode;
};

export const AppProviders = ({ children }: Props) => {
  return (
    <AuthProvider>
      <CategoryProvider>
        <ProductProvider>{children}</ProductProvider>
      </CategoryProvider>
    </AuthProvider>
  );
};
