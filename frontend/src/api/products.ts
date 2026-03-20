import API from "./client";

export const getProducts = (currentPage: number) => {
  return API.get(`/products?page=${currentPage}`);
};

export const getProduct = (id: string | number) => {
  return API.get(`/products/${id}`);
};

export const addProduct = (data: FormData) => {
  return API.post("/admin/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateProduct = (id: string | number, data: FormData) => {
  // Use POST with _method = PUT workaround for Laravel + FormData
  data.append("_method", "PUT");
  return API.post(`/admin/products/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteProduct = (id: string | number) => {
  return API.delete(`/admin/products/${id}`);
};
