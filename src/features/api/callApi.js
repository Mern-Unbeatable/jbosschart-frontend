// features/api/callApi.js
import { baseApi } from "../baseApi";

export const callApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        initiateCall: builder.mutation({
            query: (data) => {
                return {
                    url: '/calls/initiate',
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['Call', 'PendingCalls', 'CallHistory'],
            transformResponse: (response) => {
                return response?.data || response;
            },
            transformErrorResponse: (error) => {
                console.error('📞 Call initiation error FULL:', error);
                return {
                    message: error?.data?.message || 'Failed to initiate call',
                    status: error?.status,
                    data: error?.data
                };
            },
        }),

        acceptCall: builder.mutation({
            query: (callId) => ({
                url: `/calls/${callId}/accept`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, callId) => [
                { type: 'Call', id: callId },
                'PendingCalls',
                'CallHistory',
            ],
            transformResponse: (response) => response?.data || response,
        }),

        rejectCall: builder.mutation({
            query: (callId) => ({
                url: `/calls/${callId}/reject`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, callId) => [
                { type: 'Call', id: callId },
                'PendingCalls',
                'CallHistory',
            ],
            transformResponse: (response) => response?.data || response,
        }),

        joinCall: builder.mutation({
            query: (callId) => ({
                url: `/calls/${callId}/join`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, callId) => [{ type: 'Call', id: callId }],
            transformResponse: (response) => response?.data || response,
        }),

        endCall: builder.mutation({
            query: (callId) => ({
                url: `/calls/${callId}/end`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, callId) => [
                { type: 'Call', id: callId },
                'CallHistory',
                'Earnings',
            ],
            transformResponse: (response) => response?.data || response,
        }),

        cancelCall: builder.mutation({
            query: (callId) => ({
                url: `/calls/${callId}/cancel`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, callId) => [
                { type: 'Call', id: callId },
                'PendingCalls',
                'CallHistory',
            ],
            transformResponse: (response) => response?.data || response,
        }),

        getPendingCalls: builder.query({
            query: (params = {}) => {
                return {
                    url: '/calls/pending',
                    method: 'GET',
                    params,
                };
            },
            providesTags: ['PendingCalls'],
            transformResponse: (response) => response?.data || response,
        }),

        getCallHistory: builder.query({
            query: ({ role, page = 1, limit = 10, status, startDate, endDate } = {}) => ({
                url: '/calls/history',
                method: 'GET',
                params: { role, page, limit, status, startDate, endDate },
            }),
            providesTags: ['CallHistory'],
            transformResponse: (response) => response?.data || response,
        }),

        getCallById: builder.query({
            query: (callId) => ({
                url: `/calls/${callId}`,
                method: 'GET',
            }),
            providesTags: (result, error, callId) => [{ type: 'Call', id: callId }],
            transformResponse: (response) => response?.data || response,
        }),

        getConsultantEarnings: builder.query({
            query: ({ period, startDate, endDate } = {}) => ({
                url: '/calls/earnings',
                method: 'GET',
                params: { period, startDate, endDate },
            }),
            providesTags: ['Earnings'],
            transformResponse: (response) => response?.data || response,
        }),
    }),
});

export const {
    useInitiateCallMutation,
    useAcceptCallMutation,
    useRejectCallMutation,
    useJoinCallMutation,
    useEndCallMutation,
    useCancelCallMutation,
    useGetPendingCallsQuery,
    useGetCallHistoryQuery,
    useGetCallByIdQuery,
    useGetConsultantEarningsQuery,
    useLazyGetPendingCallsQuery,
    useLazyGetCallHistoryQuery,
    useLazyGetCallByIdQuery,
    useLazyGetConsultantEarningsQuery,
} = callApi;