import API from "./client";

export const getProducts = (
  page: number = 1,
  categoryId?: string | number,
  sort?: string,
  search?: string
) => {
  let url = `/products?page=${page}`;
  if (categoryId && categoryId !== "all") url += `&category_id=${categoryId}`;
  if (sort) url += `&sort=${sort}`;
  if (search) url += `&search=${search}`;
  return API.get(url);
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
