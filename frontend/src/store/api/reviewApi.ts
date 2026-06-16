import { apiSlice } from "./apiSlice";
import { Review } from "../../types";

export const reviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductReviews: builder.query<Review[], string | number>({
      query: (productId) => `/products/${productId}/reviews`,
      providesTags: (result, _error, productId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Review" as const, id })),
              { type: "Review", id: `PRODUCT_${productId}` },
            ]
          : [{ type: "Review", id: `PRODUCT_${productId}` }],
    }),
    addReview: builder.mutation<any, { productId: string | number; review: string; rating: number }>({
      query: ({ productId, review, rating }) => ({
        url: `/products/${productId}/reviews`,
        method: "POST",
        body: { review, rating },
      }),
      invalidatesTags: (_result, _error, { productId }) => [
        { type: "Review", id: `PRODUCT_${productId}` },
        { type: "Review", id: "USER_LIST" },
      ],
    }),
    deleteReview: builder.mutation<any, string | number>({
      query: (productId) => ({
        url: `/products/${productId}/reviews`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, productId) => [
        { type: "Review", id: `PRODUCT_${productId}` },
        { type: "Review", id: "USER_LIST" },
      ],
    }),
    getReviewsByUser: builder.query<{ reviews: any[] }, void>({
      query: () => "/reviewsByUser",
      transformResponse: (response: any) => response.data || response,
      providesTags: ["Review", { type: "Review", id: "USER_LIST" }],
    }),
  }),
});

export const {
  useGetProductReviewsQuery,
  useAddReviewMutation,
  useDeleteReviewMutation,
  useGetReviewsByUserQuery,
} = reviewApi;
