import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetReviewsQuery } from '../features/reviews/fetchReviews';
import Header from './common/Header';
import Filter from './common/Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { addData, incrementPage } from '../features/reviews/reviews';
import ReactLoading from 'react-loading';

const ReviewListPage = () => {
  const [target, setTarget] = useState(null);
  const page = useSelector((state) => state.reviews.page);
  const reviews = useSelector((state) => state.reviews.data);
  const dispatch = useDispatch();
  const { data, error, isSuccess, isError, isFetching } = useGetReviewsQuery(page);
  const [loading, setLoading] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(0);
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      const newTimer = setTimeout(async () => {
        try {
          observer.unobserve(entry.target);
          await dispatch(incrementPage());
          observer.observe(entry.target);
        } catch (e) {
          console.error('error', e);
        }
      }, 800);
      setDebounceTimer(newTimer);
    }
  };
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
    if (isFetching) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, [isFetching]);

  return (
    <Wrap>
      <Header />
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
      <ViewContainer>
        <ViewChoice>
          <ChoiceButton selected={true}>
            <ViewChoiceImg src="https://static.balaan.co.kr/mobile/img/icon/contents/tab-icon-01@2x.png" alt="gird" />
          </ChoiceButton>
          <ChoiceButton>
            <ViewChoiceImg src="https://static.balaan.co.kr/mobile/img/icon/contents/tab-icon-02@2x.png" alt="list" />
          </ChoiceButton>
        </ViewChoice>
        <Grid>
          {reviews.map((data) => (
            <Img src={`https://i.balaan.io/review/${data.img[0]}`} alt="reviewImg" key={data.id} />
          ))}
        </Grid>
        <div ref={setTarget} />
      </ViewContainer>
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

const ViewContainer = styled.div``;

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

const Grid = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Img = styled.img`
  border-top: 2px solid white;
  width: 33%;
  height: 11rem;
  object-fit: cover;
`;
