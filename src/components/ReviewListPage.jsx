import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useGetReviewsQuery } from '../features/reviews/fetchReviews';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import Head from './common/Head';
import Filter from './common/Filter';
import Grid from './Grid';
import List from './List';
import {
  addData,
  addRandomData,
  deleteData,
  incrementPage,
  pageInitialize,
  randomSort,
} from '../features/reviews/reviews';
import { sortData } from '../data';
import Modal from './common/Modal';

const ReviewListPage = () => {
  const [target, setTarget] = useState(null);
  const page = useSelector((state) => state.reviews.page);
  const [loading, setLoading] = useState(false);
  const [throttle, setThrottle] = useState(false);
  const [viewType, setViewType] = useState('grid');
  const [sort, setSort] = useState('recent');
  const [sortModal, sortModalVisible] = useState(false);
  const dispatch = useDispatch();
  const { data, error, isSuccess, isError, isFetching, isLoading } = useGetReviewsQuery({
    page: page,
    sort: sort === 'random' ? 'recent' : sort,
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
        threshold: 0.2,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);
  useEffect(() => {
    if (data) {
      sort === 'random' ? dispatch(addRandomData(data.data)) : dispatch(addData(data.data));
    }
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
  const handleClickSortType = async (e) => {
    const value = e.currentTarget.id;
    await setSort(value);
    if (value === 'random') {
      dispatch(randomSort());
      return;
    }
    await dispatch(deleteData());
    await dispatch(pageInitialize());
  };
  const deleteTag = async () => {
    setSort('recent');
    await dispatch(deleteData());
    await dispatch(pageInitialize());
  };
  const searchTagName = (id) => {
    return sortData.map(
      (data) =>
        data.id === id && (
          <Tag key={data.id}>
            {data.name}
            {id !== 'recent' && (
              <DeleteTag onClick={deleteTag}>
                <DeleteImg src="https://static.balaan.co.kr/mobile/img/icon/search/ic_close_b.png" alt="delete" />
              </DeleteTag>
            )}
          </Tag>
        )
    );
  };
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
    <Wrap modalVisible={sortModal}>
      <Head />
      <Filters>
        <Filter text="정렬" type="main" onClick={handleClickSort} />
        <Filter text="성별" type="main" />
        <Filter text="인기 디자이너" />
        <Filter text="카테고리" />
      </Filters>
      {sortModal && (
        <Modal
          closeModal={closeModal}
          handleClickSortType={handleClickSortType}
          handleApplyButton={handleApplyButton}
          sort={sort}
        />
      )}
      <Tags>
        {searchTagName(sort)}
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

const Wrap = styled.div`
  ${({ modalVisible }) => modalVisible && 'position:fixed;width:100%;height:100%;overflow:hidden;'};
`;

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
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.color.lightBlue};
  border-radius: 3rem;
  color: ${({ theme }) => theme.color.blue};
  font-size: ${({ theme }) => theme.fontSize.xSmall};
  font-weight: 600;
`;

const DeleteTag = styled.button`
  cursor: pointer;
`;

const DeleteImg = styled.img`
  width: 0.8rem;
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
