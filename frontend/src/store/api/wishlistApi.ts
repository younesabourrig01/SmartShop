import { apiSlice } from "./apiSlice";
import { Product } from "../../types";

export const wishlistApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<Product[], void>({
      query: () => "/wishlist",
      transformResponse: (response: any) =>
        response.data?.data || response.data || (Array.isArray(response) ? response : []),
      providesTags: ["Wishlist"],
    }),
    addToWishlist: builder.mutation<any, number | string>({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: "POST",
      }),
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishlist: builder.mutation<any, number | string>({
      query: (productId) => ({
        url: `/wishlist/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
