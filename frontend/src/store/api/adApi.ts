import { apiSlice } from "./apiSlice";
import { Ad } from "../../types";

export const adApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAds: builder.query<{ sliders: Ad[]; banners: Ad[] }, void>({
      query: () => "/ads",
      transformResponse: (response: any) => response.data || response,
      providesTags: (result) =>
        result
          ? [
              ...(result.sliders || []).map(({ id }) => ({ type: "Ad" as const, id })),
              ...(result.banners || []).map(({ id }) => ({ type: "Ad" as const, id })),
              { type: "Ad", id: "LIST" },
            ]
          : [{ type: "Ad", id: "LIST" }],
    }),
    createAd: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/admin/ads",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Ad", id: "LIST" }],
    }),
    updateAd: builder.mutation<any, { id: number | string; data: FormData }>({
      query: ({ id, data }) => {
        // Laravel workaround: use POST with _method=PUT
        const formDataCopy = new FormData();
        for (const [key, value] of data.entries()) {
          formDataCopy.append(key, value);
        }
        if (!formDataCopy.has("_method")) {
          formDataCopy.append("_method", "PUT");
        }
        return {
          url: `/admin/ads/${id}`,
          method: "POST",
          body: formDataCopy,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Ad", id },
        { type: "Ad", id: "LIST" },
      ],
    }),
    deleteAd: builder.mutation<any, number | string>({
      query: (id) => ({
        url: `/admin/ads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Ad", id: "LIST" }],
    }),
  }),
});

export const {
  useGetAdsQuery,
  useCreateAdMutation,
  useUpdateAdMutation,
  useDeleteAdMutation,
} = adApi;
