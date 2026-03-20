import { createContext, useEffect, useState, type ReactNode } from "react";
import { getCategories } from "../api/category";

export type Category = {
  id: number;
  name: string;
  description: string;
  products_count: number;
  image?: string;
  url?: string;
  created_at?: string;
};

interface CategoryContextType {
  categories: Category[];
  loading: boolean;
  refreshCategories: () => void;
}

export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  loading: true,
  refreshCategories: () => {},
});

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCategories = () => {
    setLoading(true);
    getCategories()
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading, refreshCategories: fetchCategories }}>
      {children}
    </CategoryContext.Provider>
  );
};
