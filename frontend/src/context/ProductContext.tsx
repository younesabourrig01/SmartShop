import { getProducts } from "../api/products";
import { getCategories } from "../api/category";
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
  categories: Category[];
  selectedCategory: string;
  sortBy: string;
  search: string;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: string) => void;
  setSearch: (search: string) => void;
  setCurrentPage: (page: number) => void;
  refreshProducts: () => void;
}

export const ProductContext = createContext<ProductContextType>({
  products: [],
  loading: true,
  currentPage: 1,
  lastPage: 1,
  totalProducts: 0,
  categories: [],
  selectedCategory: "all",
  sortBy: "min_price",
  search: "",
  setSelectedCategory: () => {},
  setSortBy: () => {},
  setSearch: () => {},
  setCurrentPage: () => {},
  refreshProducts: () => {},
});

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [lastPage, setLastPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("min_price");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const fetchProducts = () => {
    setLoading(true);
    getProducts(currentPage, selectedCategory, sortBy, debouncedSearch)
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
  };

  const fetchCategories = () => {
    getCategories().then((res) => {
      setCategories(res.data.data);
    });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy, debouncedSearch]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, sortBy, debouncedSearch]);

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        currentPage,
        lastPage,
        totalProducts,
        categories,
        selectedCategory,
        sortBy,
        search,
        setSelectedCategory,
        setSortBy,
        setSearch,
        setCurrentPage,
        refreshProducts: fetchProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
