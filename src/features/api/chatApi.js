// src/features/api/chatApi.js
import { baseApi } from '../baseApi';

export const chatApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({


        getOrCreateConversation: builder.mutation({
            query: (otherUserId) => ({
                url: '/chat/conversations',
                method: 'POST',
                body: { otherUserId },
            }),
            // No invalidatesTags here — manual refetch prevents race condition duplicates
            transformResponse: (r) => r?.data?.conversation || r?.conversation,
        }),

        getConversations: builder.query({
            query: () => '/chat/conversations',
            providesTags: ['ChatConversation'],
            transformResponse: (r) => r?.data?.conversations || [],
        }),

        getMessages: builder.query({
            query: ({ conversationId, page = 1, limit = 50 }) =>
                `/chat/conversations/${conversationId}/messages?page=${page}&limit=${limit}`,
            providesTags: (result, error, { conversationId }) => [
                { type: 'ChatMessage', id: conversationId },
            ],
            transformResponse: (r) => r?.data || { messages: [], meta: {} },
        }),

       
        sendMessage: builder.mutation({
            query: (data) => ({
                url: '/chat/messages',
                method: 'POST',
                body: data,
            }),
            transformResponse: (r) => r?.data?.message || r?.message,
        }),

        markAsRead: builder.mutation({
            query: (conversationId) => ({
                url: `/chat/conversations/${conversationId}/read`,
                method: 'PATCH',
            }),
            invalidatesTags: ['ChatConversation'],
        }),

        getUnreadCount: builder.query({
            query: () => '/chat/unread-count',
            providesTags: ['ChatUnread'],
            transformResponse: (r) => r?.data?.count || 0,
        }),

        startSession: builder.mutation({
            query: ({ conversationId, sessionType }) => ({
                url: `/chat/conversations/${conversationId}/session/start`,
                method: 'POST',
                body: { sessionType },
            }),
            invalidatesTags: ['ChatConversation'],
            transformResponse: (r) => r?.data?.session || r?.session,
        }),


endSession: builder.mutation({
    query: (conversationId) => ({
        url: `/chat/conversations/${conversationId}/session/end`,
        method: 'POST',
    }),
    invalidatesTags: ['ChatConversation'],
    transformResponse: (r) => {
        // Make sure we're getting the session data correctly
        const sessionData = r?.data?.session || r?.session;
        console.log('End session response:', sessionData);
        return sessionData;
    },
}),

        getSessionStatus: builder.query({
            query: (conversationId) =>
                `/chat/conversations/${conversationId}/session/status`,
            transformResponse: (r) => r?.data?.status || r?.status,
        }),
    }),
});

export const {
    useGetOrCreateConversationMutation,
    useGetConversationsQuery,
    useGetMessagesQuery,
    useSendMessageMutation,
    useMarkAsReadMutation,
    useGetUnreadCountQuery,
    useStartSessionMutation,
    useEndSessionMutation,
    useGetSessionStatusQuery,
} = chatApi;