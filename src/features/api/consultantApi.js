import { baseApi } from '../baseApi';

export const consultantApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // ========== PUBLIC ROUTES ==========
        getAllConsultants: builder.query({
            query: (params = {}) => ({
                url: '/consultants',
                method: 'GET',
                params,
            }),
            providesTags: ['Consultant'],
            transformResponse: (response) => response.data,
        }),

        getTopConsultants: builder.query({
            query: (params = {}) => ({
                url: '/consultants/top',
                method: 'GET',
                params,
            }),
            providesTags: ['Consultant'],
            transformResponse: (response) => response.data,
        }),

        getConsultantById: builder.query({
            query: (id) => ({
                url: `/consultants/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Consultant', id }],
            transformResponse: (response) => response.data,
        }),

        getConsultantAvailability: builder.query({
            query: (id) => ({
                url: `/consultants/${id}/availability`,
                method: 'GET',
            }),
            providesTags: (result, error, id) => [{ type: 'Availability', id }],
            transformResponse: (response) => response.data,
        }),

        getConsultantReviews: builder.query({
            query: ({ id, params = {} }) => ({
                url: `/consultants/${id}/reviews`,
                method: 'GET',
                params,
            }),
            providesTags: (result, error, { id }) => [{ type: 'Review', id }],
            transformResponse: (response) => response.data,
        }),

        // ========== PROTECTED ROUTES (Consultant only) ==========
        getMyConsultantProfile: builder.query({
            query: () => ({
                url: '/consultants/me/profile',
                method: 'GET',
            }),
            providesTags: ['MyConsultantProfile'],
            transformResponse: (response) => response.data,
        }),

        updateMyConsultantProfile: builder.mutation({
            query: (data) => ({
                url: '/consultants/me/profile',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['MyConsultantProfile', 'Consultant'],
            transformResponse: (response) => response.data,
        }),

        updateOnlineStatus: builder.mutation({
            query: (data) => ({
                url: '/consultants/me/status',
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['MyConsultantProfile', 'Consultant'],
            transformResponse: (response) => response.data,
        }),

        getMyEarnings: builder.query({
            query: (params = {}) => ({
                url: '/consultants/me/earnings',
                method: 'GET',
                params,
            }),
            providesTags: ['Earnings'],
            transformResponse: (response) => response.data,
        }),

        getMyStats: builder.query({
            query: () => ({
                url: '/consultants/me/stats',
                method: 'GET',
            }),
            providesTags: ['Stats'],
            transformResponse: (response) => response.data,
        }),

        getMyAvailabilitySlots: builder.query({
            query: (params = {}) => ({
                url: '/consultants/me/slots',
                method: 'GET',
                params,
            }),
            providesTags: ['AvailabilitySlots'],
            transformResponse: (response) => response.data,
        }),

        addAvailabilitySlots: builder.mutation({
            query: (data) => ({
                url: '/consultants/me/slots',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['AvailabilitySlots', 'Availability'],
            transformResponse: (response) => response.data,
        }),

        deleteAvailabilitySlot: builder.mutation({
            query: (slotId) => ({
                url: `/consultants/me/slots/${slotId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['AvailabilitySlots', 'Availability'],
            transformResponse: (response) => response.data,
        }),

        updateScheduleStatus: builder.mutation({
            query: ({ scheduleId, ...data }) => ({
                url: `/consultants/me/schedules/${scheduleId}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['AvailabilitySlots', 'Availability', 'Schedule'],
            transformResponse: (response) => response.data,
        }),

        addConsultantReview: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/consultants/${id}/reviews`,
                method: 'POST',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Review', id },
                'Consultant',
            ],
            transformResponse: (response) => response.data,
        }),

        // ========== ADMIN ONLY ROUTES ==========
        approveConsultant: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/consultants/${id}/approve`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Consultant', id },
                'Consultant',
            ],
            transformResponse: (response) => response.data,
        }),
    }),
});

export const {
    // Public queries
    useGetAllConsultantsQuery,
    useGetTopConsultantsQuery,
    useGetConsultantByIdQuery,
    useGetConsultantAvailabilityQuery,
    useGetConsultantReviewsQuery,

    // Consultant profile (protected)
    useGetMyConsultantProfileQuery,
    useUpdateMyConsultantProfileMutation,
    useUpdateOnlineStatusMutation,
    useGetMyEarningsQuery,
    useGetMyStatsQuery,

    // Availability slots (protected)
    useGetMyAvailabilitySlotsQuery,
    useAddAvailabilitySlotsMutation,
    useDeleteAvailabilitySlotMutation,
    useUpdateScheduleStatusMutation,

    // Reviews (public but requires auth)
    useAddConsultantReviewMutation,

    // Admin only
    useApproveConsultantMutation,
} = consultantApi;