import { apiSlice } from "./apiSlice";
import { Category } from "../../types";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
      // If the backend returns wrapped in { data: Category[] }
      transformResponse: (response: any) => response.data || response,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Category" as const, id })),
              { type: "Category", id: "LIST" },
            ]
          : [{ type: "Category", id: "LIST" }],
    }),
    getCategory: builder.query<Category, string | number>({
      query: (id) => `/categories/${id}`,
      transformResponse: (response: any) => response.data || response,
      providesTags: (_result, _error, id) => [{ type: "Category", id }],
    }),
    createCategory: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/admin/categories",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
    updateCategory: builder.mutation<any, { id: string | number; data: FormData }>({
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
          url: `/admin/categories/${id}`,
          method: "POST",
          body: formDataCopy,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Category", id },
        { type: "Category", id: "LIST" },
      ],
    }),
    deleteCategory: builder.mutation<any, string | number>({
      query: (id) => ({
        url: `/admin/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Category", id: "LIST" }],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
