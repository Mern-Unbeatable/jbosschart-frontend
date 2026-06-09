import { baseApi } from '../baseApi';

export const packageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllPackages: builder.query({
      query: (params = {}) => ({
        url: '/packages',
        method: 'GET',
        params,
      }),
      providesTags: ['Package'],
      transformResponse: (response) => response.data,
    }),

    // ✅ MISSING: Get active packages endpoint
    getActivePackages: builder.query({
      query: (params = {}) => ({
        url: '/packages/active',
        method: 'GET',
        params,
      }),
      providesTags: ['Package'],
      transformResponse: (response) => response.data,
    }),

    // ✅ Added slug-based lookup
    getPackageBySlug: builder.query({
      query: (slug) => ({
        url: `/packages/slug/${slug}`,
        method: 'GET',
      }),
      providesTags: (result, error, slug) => [{ type: 'Package', id: slug }],
      transformResponse: (response) => response.data,
    }),

    getPackageById: builder.query({
      query: (id) => ({
        url: `/packages/${id}`,
        method: 'GET',
      }),
      providesTags: (result, error, id) => [{ type: 'Package', id }],
      transformResponse: (response) => response.data,
    }),

    createPackage: builder.mutation({
      query: (data) => ({
        url: '/packages',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Package'],
      transformResponse: (response) => response.data,
    }),

    updatePackage: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/packages/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Package', id }],
      transformResponse: (response) => response.data,
    }),

    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/packages/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Package'],
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetAllPackagesQuery,
  useGetActivePackagesQuery,
  useGetPackageBySlugQuery,
  useGetPackageByIdQuery,
  useCreatePackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
} = packageApi;