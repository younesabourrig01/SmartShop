import API from "./client";
export const getProducts = (currentPage: number) => {
  return API.get(`/products?page=${currentPage}`);
};

export const getProduct = (id: string | number) => {
  return API.get(`/products/${id}`);
};
