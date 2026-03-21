import API from "./client";

export const getProductReviews = (id: string | number) => {
  return API.get(`/products/${id}/reviews`);
};

export const addReview = (productId: string | number, data: { review: string, rating: number }) => {
  return API.post(`/products/${productId}/reviews`, data);
};

export const deleteReview = (productId: string | number) => {
  return API.delete(`/products/${productId}/reviews`);
};

export const getReviewsByUser = () => {
  return API.get("/reviewsByUser");
};
