import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import ListItem from './common/ListItem';
import { v4 as uuidv4 } from 'uuid';
import Comments from './common/Comments';
import ShareModal from './common/ShareModal';
import { useSearchParams } from 'react-router-dom';
import { useGetCertainReviewsQuery } from '../features/reviews/fetchReviews';
import ReactLoading from 'react-loading';
import { addData, addQueryData, addRandomData, incrementQueryPage } from '../features/reviews/reviews';

const ReviewDetail = ({ index, setCurrent }) => {
  const { queryPage, queryData, reviews } = useSelector(
    (state) => ({
      queryPage: state.reviews.queryPage,
      reviews: state.reviews.data,
      queryData: state.reviews.queryData,
    }),
    shallowEqual
  );
  let [params] = useSearchParams();
  let reviewId = params.get('review-id');
  const { data, error, isSuccess, isError, isFetching, isLoading } = useGetCertainReviewsQuery({
    page: queryPage,
    reviewId: reviewId,
  });
  const [shareModal, setShareModal] = useState(false);
  const slicedReviews = queryData ? queryData : reviews.slice(index);
  const [target, setTarget] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.2,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);
  useEffect(() => {
    if (data) {
      console.log(data.data);
      dispatch(addQueryData(data.data));
    }
  }, [data]);
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      await dispatch(incrementQueryPage());
    }
  };
  const handleClickBack = () => {
    setCurrent && setCurrent('list');
    //없을 때는 링크 이동
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
      <InfiniteLoading ref={setTarget}>
        {isFetching && <ReactLoading type="spin" color="#000" width="3rem" height="3rem" />}
      </InfiniteLoading>
      {shareModal && <ShareModal setShareModal={setShareModal} />}
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

const InfiniteLoading = styled.div`
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;
