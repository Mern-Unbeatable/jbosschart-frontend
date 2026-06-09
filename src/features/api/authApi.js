import { baseApi } from '../baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    verifySignupOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/verify-signup-otp',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
      transformResponse: (response) => response.data,
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: '/auth/signin',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    verifyLoginOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/verify-login-otp',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
      transformResponse: (response) => response.data,
    }),
    resendOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/resend-otp',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      }),
      transformResponse: (response) => response.data,
    }),
    signOut: builder.mutation({
      query: () => ({
        url: '/auth/signout',
        method: 'POST',
      }),
      transformResponse: (response) => response.data,
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),

    verifyResetOtp: builder.mutation({
      query: (data) => ({
        url: '/auth/verify-reset-otp',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: '/auth/change-password',
        method: 'PATCH',
        body: data,
      }),
      transformResponse: (response) => response.data,
    }),
    getCurrentUser: builder.query({
      query: () => '/auth/me',
      providesTags: ['User'],
      transformResponse: (response) => response.data,
    }),
    googleLogin: builder.mutation({
  query: () => ({
    url: '/auth/google',
    method: 'GET',
  }),
  transformResponse: (response) => response,
}),
  }),
});

export const {
  useSignUpMutation,
  useVerifySignupOtpMutation,
  useSignInMutation,
  useVerifyLoginOtpMutation,
  useResendOtpMutation,
  useRefreshTokenMutation,
  useSignOutMutation,
  useForgotPasswordMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetCurrentUserQuery,
  useGoogleLoginMutation,
} = authApi;