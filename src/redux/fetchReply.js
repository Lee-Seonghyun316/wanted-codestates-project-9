import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const replyApi = createApi({
  reducerPath: 'fetchReply',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://balaan.co.kr/',
    keepUnusedDataFor: 30,
  }),
  endpoints: (builder) => ({
    getReply: builder.query({
      query: (reviewId) => `/api/review/reply?review_id=${reviewId}`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetReplyQuery } = replyApi;
