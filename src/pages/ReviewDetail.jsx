import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ReactLoading from 'react-loading';
import ListItem from '../components/common/ListItem';
import Comments from '../components/common/Comments';
import ShareModal from '../components/common/ShareModal';
import { useGetCertainReviewsQuery } from '../redux/fetchReviews';
import { addQueryData, deleteQueryData, incrementQueryPage, queryPageInitialize } from '../redux/reviews';
import { useStopScroll } from '../hooks/useStopScroll';
import SubHeader from '../components/common/SubHeader';

const ReviewDetail = ({ index, setCurrent, currentSort }) => {
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
  const { data, error, isSuccess, isError, isFetching, isLoading } = useGetCertainReviewsQuery({
    page: queryPage,
    reviewId: reviewId,
    sort: sort,
  });
  const slicedReviews = queryData.length > 0 ? queryData : reviews.slice(index);
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
    if (setCurrent) {
      setCurrent('list');
    } else {
      await dispatch(deleteQueryData());
      await dispatch(queryPageInitialize());
      navigate('/');
    }
  };
  useStopScroll(shareModal);

  return (
    <React.Fragment>
      <SubHeader title="리뷰 상세보기" onClick={handleClickBack} />
      <List>
        {slicedReviews.map((review) => (
          <Content key={uuidv4()}>
            <ListItem review={review} key={uuidv4()} setShareModal={setShareModal} setCopyId={setCopyId} />
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
