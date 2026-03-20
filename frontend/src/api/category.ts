import API from "./client";

export const getCategories = () => {
  return API.get("/categories");
};

export const addCategory = (data: FormData) => {
  return API.post("/admin/categories", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateCategory = (id: string | number, data: FormData) => {
  // Use POST with _method = PUT for Laravel workaround
  data.append("_method", "PUT");
  return API.post(`/admin/categories/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteCategory = (id: string | number) => {
  return API.delete(`/admin/categories/${id}`);
};
