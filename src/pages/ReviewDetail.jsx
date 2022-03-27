import React, { useCallback, useEffect, useState } from 'react';
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
import useSessionStorage from '../hooks/useSessionStorage';
import PropTypes from 'prop-types';
import Filter from '../components/Filter';

const ReviewDetail = ({ id, setCurrent, currentSort = 'recent', wish = false }) => {
  const [copyId, setCopyId] = useState();
  const [target, setTarget] = useState(null);
  const [shareModal, setShareModal] = useState(false);
  const [params] = useSearchParams();
  const [wishData, setWishData] = useSessionStorage('wish', []);
  const { reviews, queryPage, queryData } = useSelector(
    (state) => ({
      reviews: state.reviews.data,
      queryPage: state.reviews.queryPage,
      queryData: state.reviews.queryData,
    }),
    shallowEqual
  );
  const { data, isFetching } = useGetCertainReviewsQuery({
    page: queryPage,
    reviewId: params.get('review-id') || id,
    sort: params.get('sort') || currentSort,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClickBack = useCallback(async () => {
    await dispatch(deleteQueryData());
    await dispatch(queryPageInitialize());
    if (!wish && setCurrent) {
      setCurrent('list');
      return;
    }
    navigate('/');
  }, [dispatch, navigate, setCurrent, wish]);
  useStopScroll(shareModal);
  useEffect(() => {
    const localData = reviews.filter((review) => review.local === true);
    if (localData.length > 0) {
      console.log(
        localData.filter((data) => data.id === id),
        '추가'
      );
      dispatch(addQueryData(localData.filter((data) => data.id === id)));
    }
  }, [id, reviews]);
  useEffect(() => {
    if (data) {
      dispatch(addQueryData(data.data));
    }
  }, [data, dispatch]);
  useEffect(() => {
    const onIntersect = async ([entry], observer) => {
      if (entry.isIntersecting && !isFetching) {
        await dispatch(incrementQueryPage());
      }
    };
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.2,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target, dispatch, isFetching]);

  return (
    <Wrap>
      <SubHeader title="리뷰 상세보기" onClick={handleClickBack} />
      <List>
        {queryData.map((review) => (
          <Content key={uuidv4()}>
            <ListItem
              review={review}
              setShareModal={setShareModal}
              setCopyId={setCopyId}
              setWishData={setWishData}
              wishDataIds={wishData.map((data) => data.id)}
            />
            <Comments id={review.id} />
          </Content>
        ))}
      </List>
      <InfiniteLoading ref={setTarget}>
        {isFetching && <ReactLoading type="spin" color="#000" width="3rem" height="3rem" />}
      </InfiniteLoading>
      {shareModal && <ShareModal setShareModal={setShareModal} reviewId={copyId} sort={currentSort} />}
    </Wrap>
  );
};

Filter.propTypes = {
  id: PropTypes.number,
  setCurrent: PropTypes.func,
  currentSort: PropTypes.string,
  wish: PropTypes.bool,
};

Filter.defaultProps = {
  id: null,
  currentSort: 'recent',
  wish: false,
};

export default ReviewDetail;

const Wrap = styled.main`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: auto;
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
