import React, { useState } from 'react';
import ReviewList from './ReviewList';
import ReviewDetail from './ReviewDetail';

const ReviewScreens = () => {
  const [current, setCurrent] = useState('list');
  return (
    <>
      {current === 'list' && <ReviewList setCurrent={setCurrent} />}
      {current === 'detail' && <ReviewDetail />}
    </>
  );
};

export default ReviewScreens;
