// features/api/baseApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { tagList } from './tagList';

const BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  'https://jobsschart-api.maktechgroup.tech/api/v1';

console.log('🔍 RTK Query baseUrl =', BASE_URL); // Remove after debugging

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error) {
    console.error('❌ API Error Details:', {
      status: result.error.status,
      data: result.error.data,
      url: args.url,
    });
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: tagList,
  endpoints: () => ({}),
});