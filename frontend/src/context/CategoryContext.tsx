import { createContext, useEffect, useState, type ReactNode } from "react";
import { getCategories } from "../api/category";

type category = {
  id: number;
  name: string;
  description: string;
  products_count: number;
  image?: string;
};
interface CategoryContextType {
  categories: category[];
  loading: boolean;
}
export const CategoryContext = createContext<CategoryContextType>({
  categories: [],
  loading: true,
});

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    getCategories()
      .then((res) => {
        setCategories(res.data.data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};
