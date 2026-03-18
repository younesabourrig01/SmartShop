import API from "./client";

export const getCart = () => {
  return API.get("/cart");
};
export const clearCart = () => {
  return API.delete("/cart");
};

export const addToCart = (product_id: number | string, quantity: number) => {
  return API.post("/cart", { product_id, quantity });
};

export const updateCart = (product_id: number | string, quantity: number) => {
  return API.put("/cart", { product_id, quantity });
};
