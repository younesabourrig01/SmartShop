import { apiSlice } from "./apiSlice";
import { Product } from "../../types";

export const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<
      { data: Product[]; current_page: number; last_page: number; total: number },
      { page?: number; categoryId?: string | number; sort?: string; search?: string } | void
    >({
      query: (rawParams) => {
        const params = rawParams as { page?: number; categoryId?: string | number; sort?: string; search?: string } | undefined;
        let url = `/products?page=${params?.page || 1}`;
        if (params?.categoryId && params.categoryId !== "all") {
          url += `&category_id=${params.categoryId}`;
        }
        if (params?.sort) {
          url += `&sort=${params.sort}`;
        }
        if (params?.search) {
          url += `&search=${params.search}`;
        }
        return url;
      },
      transformResponse: (response: any) => response.data || response,
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Product" as const, id })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProduct: builder.query<Product, string | number>({
      query: (id) => `/products/${id}`,
      // The backend response is directly the Product object or wrapped in a data property
      // Let's transform response if it's wrapped in { data: Product }
      transformResponse: (response: any) => response.data || response,
      providesTags: (_result, _error, id) => [{ type: "Product", id }],
    }),
    createProduct: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/admin/products",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
    updateProduct: builder.mutation<any, { id: string | number; data: FormData }>({
      query: ({ id, data }) => {
        // Laravel workaround for PUT requests with FormData: send POST with _method=PUT
        const formDataCopy = new FormData();
        // Copy existing fields
        for (const [key, value] of data.entries()) {
          formDataCopy.append(key, value);
        }
        if (!formDataCopy.has("_method")) {
          formDataCopy.append("_method", "PUT");
        }
        return {
          url: `/admin/products/${id}`,
          method: "POST",
          body: formDataCopy,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),
    deleteProduct: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
