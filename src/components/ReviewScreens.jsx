import React, { useState } from 'react';
import ReviewList from './ReviewList';
import ReviewDetail from './ReviewDetail';

const ReviewScreens = () => {
  const [current, setCurrent] = useState('list');
  const [index, setIndex] = useState(0);
  return (
    <>
      {current === 'list' && <ReviewList setCurrent={setCurrent} setIndex={setIndex} />}
      {current === 'detail' && <ReviewDetail setCurrent={setCurrent} index={index} />}
    </>
  );
};

export default ReviewScreens;
