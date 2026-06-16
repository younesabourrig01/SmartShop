import { apiSlice } from "./apiSlice";
import { CartItem } from "../../types";

export const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<{ items: CartItem[]; totalPrice: number }, void>({
      query: () => "/cart",
      transformResponse: (response: any) => ({
        items: response.data?.cart_items || [],
        totalPrice: response.total || 0,
      }),
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation<any, { productId: number | string; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: "/cart",
        method: "POST",
        body: { product_id: productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    updateCart: builder.mutation<any, { productId: number | string; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: "/cart",
        method: "PUT",
        body: { product_id: productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation<any, void>({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useClearCartMutation,
} = cartApi;
