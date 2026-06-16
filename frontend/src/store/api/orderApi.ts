import { apiSlice } from "./apiSlice";
import { BackendOrder } from "../../types";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserOrders: builder.query<{ orders: { [date: string]: BackendOrder[] } } | any, void>({
      query: () => "/my-orders",
      providesTags: ["Order"],
    }),
    getAllOrders: builder.query<any, void>({
      query: () => "/admin/orders",
      providesTags: ["Order"],
    }),
    getOrdersByDate: builder.query<any, string>({
      query: (date) => `/admin/orders/date/${date}`,
      providesTags: ["Order"],
    }),
    createOrder: builder.mutation<any, void>({
      query: () => ({
        url: "/order",
        method: "POST",
      }),
      invalidatesTags: ["Order", "Cart"],
    }),
    updateOrderStatus: builder.mutation<any, { id: number | string; status: string }>({
      query: ({ id, status }) => ({
        url: `/admin/orders/${id}/updateStatus`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Order"],
    }),
    downloadReport: builder.query<Blob, string>({
      query: (date) => ({
        url: `/admin/orders/report/${date}`,
        responseHandler: (response) => response.blob(),
      }),
    }),
    downloadInvoice: builder.query<Blob, void>({
      query: () => ({
        url: "/download-invoice",
        responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useGetUserOrdersQuery,
  useLazyGetUserOrdersQuery,
  useGetAllOrdersQuery,
  useGetOrdersByDateQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
  useLazyDownloadReportQuery,
  useLazyDownloadInvoiceQuery,
} = orderApi;
