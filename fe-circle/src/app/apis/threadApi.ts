import type {
  FetchUserResponse,
  FollowPayload,
  FollowResponse,
  LikePayload,
  ReplyRequest,
  ReplyResponse,
  ThreadArrayResponse,
  ThreadPayload,
  ThreadResponse,
} from '@/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type ThreadRequest = {
  body: ThreadPayload | FormData;
  token: string;
};

export const threadApi = createApi({
  reducerPath: 'threadApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
  }),
  tagTypes: ['Threads', 'Users'],
  endpoints: build => ({
    createThread: build.mutation<ThreadResponse, ThreadRequest>({
      query: thread => ({
        url: '/threads',
        headers: { authorization: `Bearer ${thread.token}` },
        method: 'POST',
        body: thread.body,
      }),
      invalidatesTags: ['Threads'],
    }),
    createLike: build.mutation<string, LikePayload>({
      query: like => ({
        url: '/likes',
        headers: { authorization: `Bearer ${like.token}` },
        method: 'POST',
        body: like.body,
      }),
      invalidatesTags: ['Threads'],
    }),
    createReply: build.mutation<ReplyResponse, ReplyRequest>({
      query: reply => ({
        url: '/replies',
        headers: { authorization: `Bearer ${reply.token}` },
        method: 'POST',
        body: reply.body,
      }),
      invalidatesTags: ['Threads'],
    }),
    createFollow: build.mutation<FollowResponse, FollowPayload>({
      query: follow => ({
        url: '/follow',
        headers: { authorization: `Bearer ${follow.token}` },
        method: 'POST',
        body: follow.body,
      }),
      invalidatesTags: ['Users'],
    }),
    fetchThreads: build.query<ThreadArrayResponse, null>({
      query: () => ({
        url: '/threads',
        method: 'GET',
      }),
      providesTags: ['Threads'],
    }),
    fetchThreadId: build.query<ThreadResponse, string>({
      query: threadId => ({
        url: `threads/current/${threadId}`,
        method: 'GET',
      }),
      providesTags: ['Threads'],
    }),
    fetchThreadsBelongToUser: build.query<
      ThreadResponse,
      Pick<ThreadRequest, 'token'>
    >({
      query: thread => ({
        url: '/threads/user',
        headers: { authorization: `Bearer ${thread.token}` },
        method: 'GET',
      }),
      providesTags: ['Threads'],
    }),
    fetchAllUsers: build.query<FetchUserResponse, null>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
  }),
});
