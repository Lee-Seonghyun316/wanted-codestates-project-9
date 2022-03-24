import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

export const reviewsApi = createApi({
  reducerPath: 'fetchReviews',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.balaan.co.kr/v1/contents',
    keepUnusedDataFor: 30,
  }),
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: (query) => `?page=${query.page}&sort=${query.sort}&gender=unisex&brandno=&hashtags=&category=`,
      keepUnusedDataFor: 5,
    }),
    getCertainReviews: builder.query({
      query: (query) =>
        `?size=3&from=1&page=${query.page}&sort=reply&gender=unisex&brandno=&hashtags=&category=&id=${query.reviewId}&goodsno=&type=&m_no=&shop_id=undefined`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const { useGetReviewsQuery, useGetCertainReviewsQuery } = reviewsApi;
