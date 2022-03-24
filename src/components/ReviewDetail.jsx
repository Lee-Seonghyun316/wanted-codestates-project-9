import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ListItem from './common/ListItem';
import { v4 as uuidv4 } from 'uuid';
import Comments from './common/Comments';

const ReviewDetail = ({ index, setCurrent, isFetching, setShareModal }) => {
  const reviews = useSelector((state) => state.reviews.data);
  const slicedReviews = reviews.slice(index);
  const handleClickBack = () => {
    setCurrent('list');
  };

  return (
    <div>
      <Head>
        <button onClick={handleClickBack}>
          <ButtonImg src="http://djp5oonlusoz4.cloudfront.net/contents/event/20190924/ic_left_btn.png" alt="back" />
        </button>
        리뷰 상세보기
        <button onClick={handleClickBack}>
          <ButtonImg src="https://djp5oonlusoz4.cloudfront.net/contents/event/20190924/ic_can_btn.png" alt="x" />
        </button>
      </Head>
      <section>
        {slicedReviews.map((review) => (
          <div key={uuidv4()}>
            <ListItem review={review} key={uuidv4()} setShareModal={setShareModal} />
            <Comments id={review.id} key={uuidv4()} />
          </div>
        ))}
      </section>
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
  z-index: 8;
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
