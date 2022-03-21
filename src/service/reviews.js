import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const reviewsApi = createApi({
  reducerPath: 'reviews',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.balaan.co.kr',
    keepUnusedDataFor: 30,
  }),
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (page) => `/v1/contents?page=${page}&sort=recent&gender=unisex&brandno=&hashtags=&category=`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetReviewsQuery } = reviewsApi;
