import React, { useState } from 'react';
import ReviewList from './ReviewList';
import ReviewDetail from './ReviewDetail';

const ReviewScreens = () => {
  return (
    <>
      {/*{current === 'list' && <ReviewList setCurrent={setCurrent} setIndex={setIndex} />}*/}
      <ReviewList />
    </>
  );
};

export default ReviewScreens;
