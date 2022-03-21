import React from 'react';
import { useGetReviewsQuery } from '../service/reviews';

const ReviewListPage = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetReviewsQuery(1);

  return <h1>reviewListPage</h1>;
};

export default ReviewListPage;
