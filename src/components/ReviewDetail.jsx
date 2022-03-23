import React, { useEffect } from 'react';
import styled from 'styled-components';
import List from './common/List';
import { useSelector } from 'react-redux';

const ReviewDetail = (index) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const data = useSelector((state) => state.reviews.data);
  const slicedReviews = data.slice(index.index);

  return (
    <div>
      <Head>
        <button>
          <ButtonImg src="http://djp5oonlusoz4.cloudfront.net/contents/event/20190924/ic_left_btn.png" alt="left" />
        </button>
        리뷰 상세보기
        <button>
          <ButtonImg src="https://djp5oonlusoz4.cloudfront.net/contents/event/20190924/ic_can_btn.png" alt="left" />
        </button>
      </Head>
      <List data={slicedReviews} />
    </div>
  );
};

export default ReviewDetail;

const Head = styled.header`
  position: fixed;
  text-align: center;
  padding: 1.4rem 0;
  top: 0;
  box-shadow: 0 0px 3px 0px #ccc;
  width: 100%;
  background: #fff;
  z-index: 999;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-family: Lato;
  color: #020202;
  letter-spacing: 0.031rem;
  font-size: 1.4rem;
  font-weight: 700;
  white-space: nowrap;
`;

const ButtonImg = styled.img`
  width: 1.5rem;
  margin: 0.3rem 1.6rem 0;
`;
