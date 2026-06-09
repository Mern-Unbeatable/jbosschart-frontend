import { baseApi } from '../baseApi';

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ========== PROTECTED ROUTES (Requires authentication) ==========

    // User profile
    getMe: builder.query({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      providesTags: ['UserProfile'],
      transformResponse: (response) => response.data,
    }),

    updateProfile: builder.mutation({
      query: (data) => {
        // Handle FormData for avatar upload
        if (data instanceof FormData) {
          return {
            url: '/users/me',
            method: 'PATCH',
            body: data,
            // Don't set Content-Type - let browser set it for FormData
          };
        }
        // Handle regular JSON data
        return {
          url: '/users/me',
          method: 'PATCH',
          body: data,
        };
      },
      invalidatesTags: ['UserProfile', 'UserStats'],
      transformResponse: (response) => response.data,
    }),

    deleteMe: builder.mutation({
      query: () => ({
        url: '/users/me',
        method: 'DELETE',
      }),
      invalidatesTags: ['UserProfile'],
      transformResponse: (response) => response.data,
    }),

    getMyStats: builder.query({
      query: () => ({
        url: '/users/me/stats',
        method: 'GET',
      }),
      providesTags: ['UserStats'],
      transformResponse: (response) => response.data,
    }),

    getMyCreditHistory: builder.query({
      query: (params = {}) => ({
        url: '/users/me/credits',
        method: 'GET',
        params,
      }),
      providesTags: ['CreditHistory'],
      transformResponse: (response) => response.data,
    }),

    // ========== ADMIN ONLY ROUTES ==========

    getAllUsers: builder.query({
      query: ({ page = 1, limit = 10, search, role, status, sortBy, sortOrder } = {}) => ({
        url: '/users/admin/users',
        method: 'GET',
        params: { page, limit, search, role, status, sortBy, sortOrder },
      }),
      providesTags: ['AllUsers'],
      transformResponse: (response) => response.data,
    }),

    getAdminStats: builder.query({
      query: () => ({
        url: '/users/admin/stats',
        method: 'GET',
      }),
      providesTags: ['AdminStats'],
      transformResponse: (response) => response.data,
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `/users/admin/users/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'User', id }],
      transformResponse: (response) => response.data,
    }),

    updateUserStatus: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/admin/users/${id}/status`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        'AllUsers',
        'AdminStats',
      ],
      transformResponse: (response) => response.data,
    }),

    updateUserRole: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/admin/users/${id}/role`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        'AllUsers',
        'AdminStats',
      ],
      transformResponse: (response) => response.data,
    }),

    adjustCredits: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/admin/users/${id}/credits`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'User', id },
        'CreditHistory',
        'UserStats',
      ],
      transformResponse: (response) => response.data,
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'User', id },
        'AllUsers',
        'AdminStats',
      ],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  // User profile hooks
  useGetMeQuery,
  useUpdateProfileMutation,
  useDeleteMeMutation,
  useGetMyStatsQuery,
  useGetMyCreditHistoryQuery,

  // Admin hooks
  useGetAllUsersQuery,
  useGetAdminStatsQuery,
  useGetUserByIdQuery,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,
  useAdjustCreditsMutation,
  useDeleteUserMutation,

  // Lazy queries
  useLazyGetMeQuery,
  useLazyGetMyStatsQuery,
  useLazyGetMyCreditHistoryQuery,
  useLazyGetAllUsersQuery,
  useLazyGetAdminStatsQuery,
  useLazyGetUserByIdQuery,
} = userApi;