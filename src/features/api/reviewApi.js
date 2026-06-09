// features/api/reviewApi.js
import { baseApi } from "../baseApi";

export const reviewApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createReview: builder.mutation({
            query: (data) => ({
                url: '/reviews',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Review'],
        }),
    }),
});

export const {
    useCreateReviewMutation,
} = reviewApi;