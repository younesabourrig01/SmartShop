import API from "./client";

export const getWishlist = () => {
  return API.get('/wishlist');
};

export const storeWishlist = (productId: number | string) => {
  return API.post(`/wishlist/${productId}`);
};

export const removeFromWishlist = (productId: number | string) => {
  return API.delete(`/wishlist/${productId}`);
};

export const isInWishlist = (productId: number | string) => {
  return API.get(`/products/${productId}/in-wishlist`);
};
