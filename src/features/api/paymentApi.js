import { baseApi } from '../baseApi';

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ========== PROTECTED ROUTES (Requires authentication) ==========
    createCheckout: builder.mutation({
      query: (data) => ({
        url: '/payments/checkout',
        method: 'POST',
        body: data,
        // Don't set Content-Type header - let browser set it for FormData
        // Or use headers only for JSON
      }),
      invalidatesTags: ['Payment', 'PaymentHistory'],
      transformResponse: (response) => response.data,
    }),

    verifyPayment: builder.query({
      query: ({ paymentId, orderId, signature }) => ({
        url: '/payments/verify',
        method: 'GET',
        params: { paymentId, orderId, signature },
      }),
      providesTags: (result, error, { paymentId }) => [{ type: 'Payment', id: paymentId }],
      transformResponse: (response) => response.data,
    }),

    getPaymentHistory: builder.query({
      query: ({ page = 1, limit = 10, status } = {}) => ({
        url: '/payments/history',
        method: 'GET',
        params: { page, limit, status },
      }),
      providesTags: ['PaymentHistory'],
      transformResponse: (response) => response.data,
    }),

    // ========== ADMIN ROUTES ==========
    getAllPayments: builder.query({
      query: ({ page = 1, limit = 10, status, startDate, endDate } = {}) => ({
        url: '/payments/admin/all',
        method: 'GET',
        params: { page, limit, status, startDate, endDate },
      }),
      providesTags: ['AllPayments'],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useCreateCheckoutMutation,
  useVerifyPaymentQuery,
  useLazyVerifyPaymentQuery,
  useGetPaymentHistoryQuery,
  useGetAllPaymentsQuery,
} = paymentApi;