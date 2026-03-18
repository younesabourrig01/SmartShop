import { getProducts } from "../api/products";
import { createContext, useEffect, useState, type ReactNode } from "react";

export type Image = {
  id: number;
  url: string;
};

export type Category = {
  id: number;
  name: string;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  images: Image[];
  category: Category;
};
interface ProductContextType {
  products: Product[];
  loading: boolean;
  currentPage: number;
  lastPage: number;
  totalProducts: number;
  setCurrentPage: (page: number) => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: true,
  currentPage: 1,
  lastPage: 1,
  totalProducts: 0,
  setCurrentPage: () => {},
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    getProducts(currentPage)
      .then((res) => {
        setProducts(res.data.data.data);
        setCurrentPage(res.data.data.current_page);
        setLastPage(res.data.data.last_page);
        setTotalProducts(res.data.data.total || 0);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [currentPage]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        currentPage,
        lastPage,
        totalProducts,
        setCurrentPage,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
