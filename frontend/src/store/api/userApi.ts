import { apiSlice } from "./apiSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserBadge: builder.query<{ badge: string; orders_count: number; wishlist_count: number; shipping_discount?: number }, void>({
      query: () => "/badge",
      transformResponse: (response: any) => response.data || response,
      providesTags: ["User"],
    }),
  }),
});

export const { useGetUserBadgeQuery } = userApi;
