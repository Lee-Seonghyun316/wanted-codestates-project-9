import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import ListItem from '../components/ListItem';
import Comments from '../components/Comments';
import ShareModal from '../components/ShareModal';
import { useGetCertainReviewsQuery } from '../redux/fetchReviews';
import { addQueryData, deleteQueryData, incrementQueryPage, queryPageInitialize } from '../redux/reviews';
import { useStopScroll } from '../hooks/useStopScroll';
import SubHeader from '../components/SubHeader';
import useLocalStorage from '../hooks/useLocalStorage';

const ReviewDetail = ({ index, setCurrent, currentSort = 'recent', wish = false }) => {
  const [copyId, setCopyId] = useState();
  const [params] = useSearchParams();
  const reviewId = params.get('review-id');
  const sort = params.get('sort');
  const { queryPage, queryData, reviews } = useSelector(
    (state) => ({
      queryPage: state.reviews.queryPage,
      reviews: state.reviews.data,
      queryData: state.reviews.queryData,
    }),
    shallowEqual
  );
  const [localReviews, setLocalReviews] = useLocalStorage('localReviews', []);
  const [wishData, setWishData] = useLocalStorage('wish', []);
  const ClientData =
    reviews && localReviews?.length > 0 ? localReviews.map((review) => review.data).concat(reviews) : reviews;
  const { data, error, isSuccess, isError, isFetching, isLoading } = useGetCertainReviewsQuery({
    page: queryPage,
    reviewId: reviewId,
    sort: sort,
  });
  const slicedReviews = wish ? wishData.slice(index) : queryData.length > 0 ? queryData : ClientData.slice(index);
  const [shareModal, setShareModal] = useState(false);
  const [target, setTarget] = useState(null);
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
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(addQueryData(data.data));
    }
  }, [data]);
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      await dispatch(incrementQueryPage());
    }
  };
  const navigate = useNavigate();
  const handleClickBack = async () => {
    if (!wish && setCurrent) {
      setCurrent('list');
      return;
    }
    await dispatch(deleteQueryData());
    await dispatch(queryPageInitialize());
    navigate('/');
  };
  useStopScroll(shareModal);

  return (
    <React.Fragment>
      <SubHeader title="리뷰 상세보기" onClick={handleClickBack} />
      <List>
        {slicedReviews.length === 0 && <Title>데이터 없음:(</Title>}
        {slicedReviews.map((review) => (
          <Content key={uuidv4()}>
            <ListItem
              review={review}
              key={uuidv4()}
              setShareModal={setShareModal}
              setCopyId={setCopyId}
              setWishData={setWishData}
              wishData={wishData}
            />
            <Comments id={review.id} key={uuidv4()} />
          </Content>
        ))}
      </List>
      <InfiniteLoading ref={setTarget}>
        {isFetching && <ReactLoading type="spin" color="#000" width="3rem" height="3rem" />}
      </InfiniteLoading>
      {shareModal && <ShareModal setShareModal={setShareModal} reviewId={copyId} sort={currentSort} />}
    </React.Fragment>
  );
};

export default ReviewDetail;

const Title = styled.h1`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: #000;
  line-height: 4rem;
`;

const List = styled.section`
  padding-top: 6rem;
  background-color: ${({ theme }) => theme.color.lightGrey};
`;

const Content = styled.div`
  background-color: white;
`;

const InfiniteLoading = styled.div`
  padding: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;
