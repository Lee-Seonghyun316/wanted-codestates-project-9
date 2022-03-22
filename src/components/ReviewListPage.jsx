import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetReviewsQuery } from '../features/reviews/fetchReviews';
import Head from './common/Head';
import Filter from './common/Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addData, incrementPage } from '../features/reviews/reviews';
import ReactLoading from 'react-loading';
import Grid from './Grid';
import List from './List';

const ReviewListPage = () => {
  const [target, setTarget] = useState(null);
  const page = useSelector((state) => state.reviews.page);
  const dispatch = useDispatch();
  const { data, error, isSuccess, isError, isFetching, isLoading } = useGetReviewsQuery(page);
  const [loading, setLoading] = useState(false);
  const [throttle, setThrottle] = useState(false);
  const [viewType, setViewType] = useState('list');

  useEffect(() => {
    window.onbeforeunload = function pushRefresh() {
      window.scrollTo(0, 0);
    };
  }, []);
  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);
  useEffect(() => {
    data && dispatch(addData(data.data));
  }, [data]);
  useEffect(() => {
    if (isLoading) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }, [isLoading]);
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      if (!throttle) {
        setThrottle(true);
        setTimeout(async () => {
          await dispatch(incrementPage());
          setThrottle(false);
        }, 300);
      }
    }
  };

  return (
    <Wrap>
      <Head />
      <Filters>
        <Filter text="정렬" type="main" />
        <Filter text="성별" type="main" />
        <Filter text="인기 디자이너" />
        <Filter text="카테고리" />
      </Filters>
      <Tags>
        <Tag>최신순</Tag>
        <Tag>전체</Tag>
        <Refresh>
          <FontAwesomeIcon icon={faArrowRotateRight} />
        </Refresh>
      </Tags>
      {loading && (
        <LoaderWrap>
          <ReactLoading type="spin" color="#000" width="3rem" height="3rem" />
        </LoaderWrap>
      )}
      <ViewChoice>
        <ChoiceButton selected={true}>
          <ViewChoiceImg src="https://static.balaan.co.kr/mobile/img/icon/contents/tab-icon-01@2x.png" alt="gird" />
        </ChoiceButton>
        <ChoiceButton>
          <ViewChoiceImg src="https://static.balaan.co.kr/mobile/img/icon/contents/tab-icon-02@2x.png" alt="list" />
        </ChoiceButton>
      </ViewChoice>
      {viewType === 'grid' ? <Grid /> : <List />}
      <div ref={setTarget} />
    </Wrap>
  );
};

export default ReviewListPage;

const Wrap = styled.div``;

const LoaderWrap = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 2px 2px 20px 2px grey;
  padding: 1.5rem;
  border-radius: 20px;
  z-index: 1;
`;

const Filters = styled.div`
  display: flex;
  padding: 0 1rem;
  gap: 10px;
  ${({ theme }) => theme.common.hideScrollBar}
`;

const Tags = styled.ul`
  position: relative;
  display: flex;
  gap: 10px;
  padding: 1rem;
  margin-top: 1rem;
  background-color: ${({ theme }) => theme.color.lightGery};
`;

const Tag = styled.li`
  padding: 10px 1rem;
  background-color: ${({ theme }) => theme.color.lightBlue};
  border-radius: 3rem;
  color: ${({ theme }) => theme.color.blue};
  font-size: ${({ theme }) => theme.fontSize.xSmall};
  font-weight: 600;
`;

const Refresh = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 1rem;
  color: ${({ theme }) => theme.color.grey};
  font-size: ${({ theme }) => theme.fontSize.xSmall};
`;

const ViewChoice = styled.div`
  width: 100%;
`;

const ChoiceButton = styled.button`
  padding: 1rem 0;
  width: 50%;
  border-bottom: 2px solid ${({ theme }) => theme.color.black};
  opacity: ${({ selected }) => (selected ? 1 : 0.3)};
`;

const ViewChoiceImg = styled.img`
  width: 2rem;
`;
