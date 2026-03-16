import API from "./client";

export const getCategories = () => {
  return API.get("/categories");
};

