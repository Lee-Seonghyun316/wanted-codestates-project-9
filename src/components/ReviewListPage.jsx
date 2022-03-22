import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetReviewsQuery } from '../features/reviews/fetchReviews';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import Head from './common/Head';
import Filter from './common/Filter';
import Grid from './Grid';
import List from './List';
import { addData, incrementPage } from '../features/reviews/reviews';

const ReviewListPage = () => {
  const [target, setTarget] = useState(null);
  const page = useSelector((state) => state.reviews.page);
  const [loading, setLoading] = useState(false);
  const [throttle, setThrottle] = useState(false);
  const [viewType, setViewType] = useState('grid');
  const [sort, setSort] = useState('recent');
  const [sortModal, sortModalVisible] = useState(false);
  const [random, setRandom] = useState(false);
  const dispatch = useDispatch();
  const { data, error, isSuccess, isError, isFetching, isLoading } = useGetReviewsQuery({
    page,
    sort,
  });

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
      loadingHandling();
    }
  }, [isLoading]);
  const loadingHandling = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };
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
  const handleClickViewType = (e) => {
    const value = e.currentTarget.id;
    setViewType(value);
  };
  const handleClickSortType = (e) => {
    const value = e.currentTarget.id;
    setSort(value);
  };
  const sortData = [
    {
      id: 'recent',
      name: '최신순',
    },
    { id: 'like', name: '리뷰 카운터순' },
    { id: 'random', name: '랜덤' },
  ];
  const closeModal = () => {
    sortModalVisible(false);
  };
  const handleApplyButton = () => {
    closeModal();
    loadingHandling();
  };
  const handleClickSort = () => {
    sortModalVisible(true);
  };

  return (
    <Wrap>
      <Head />
      <Filters>
        <Filter text="정렬" type="main" onClick={handleClickSort} />
        <Filter text="성별" type="main" />
        <Filter text="인기 디자이너" />
        <Filter text="카테고리" />
      </Filters>
      {sortModal && <BlackOut onClick={closeModal} />}
      {sortModal && (
        <SortModal>
          <ModalTitle>정렬</ModalTitle>
          <SortTypes>
            {sortData.map((item) => (
              <SortType selected={sort === item.id} onClick={handleClickSortType} id={item.id} key={item.id}>
                {item.name}
                <CheckBox selected={sort === item.id}>
                  <Check selected={sort === item.id} />
                </CheckBox>
              </SortType>
            ))}
          </SortTypes>
          <ApplyButton onClick={handleApplyButton}>적용하기</ApplyButton>
        </SortModal>
      )}
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
        <ChoiceButton selected={viewType === 'grid'} onClick={handleClickViewType} id="grid">
          <ViewChoiceImg src="https://static.balaan.co.kr/mobile/img/icon/contents/tab-icon-01@2x.png" alt="gird" />
        </ChoiceButton>
        <ChoiceButton selected={viewType === 'list'} onClick={handleClickViewType} id="list">
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

const BlackOut = styled.div`
  position: absolute;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.black};
  opacity: 0.4;
`;

const SortModal = styled.div`
  position: absolute;
  bottom: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  flex: 1;
  background-color: #fff;
  z-index: 10;
`;

const ModalTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.8rem 0 1.3rem 0;
  font-size: 1.3rem;
`;

const SortTypes = styled.ul`
  margin-bottom: 1.6rem;
  overflow-x: hidden;
  padding: 0 1.8rem;
`;

const SortType = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.2rem;
  font-size: ${({ theme }) => theme.fontSize.xSmall};
  border-bottom: 1px solid #ccc;
  font-weight: bolder;
  color: ${({ selected, theme }) => (selected ? theme.color.black : 'grey')};
  cursor: pointer;
`;

const CheckBox = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid ${({ selected, theme }) => (selected ? theme.color.black : '#ccc')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Check = styled.div`
  background-color: ${({ selected, theme }) => (selected ? theme.color.black : 'white')};
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;

const ApplyButton = styled.button`
  display: flex;
  justify-content: center;
  margin: 2rem 1.8rem;
  flex: 1;
  padding: 1rem 0;
  background-color: #000;
  color: #fff;
  border-radius: 0.2rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  cursor: pointer;
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
  cursor: pointer;
`;

const ViewChoiceImg = styled.img`
  width: 2rem;
`;
