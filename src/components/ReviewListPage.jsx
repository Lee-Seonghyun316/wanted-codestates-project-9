import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useGetReviewsQuery } from '../features/reviews/fetchReviews';
import Head from './common/Head';
import Filter from './common/Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faHeart } from '@fortawesome/free-solid-svg-icons';
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
  const [viewType, setViewType] = useState('list');
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

  const renderStar = (point) => {
    const pointArr = [];
    for (let i = 0; i < point; i++) {
      pointArr.push(
        <Star src="https://i.balaan.io/mobile/img/icons/icon-star-black.png" alt="별점" key={MakeRandomKey()} />
      );
    }
    for (let i = 0; i < 5 - point; i++) {
      pointArr.push(
        <Star src="https://i.balaan.io/mobile/img/icons/icon-star-gray.png" alt="별점" key={MakeRandomKey()} />
      );
    }
    return pointArr;
  };

  const MakeRandomKey = () => {
    return Date.now() + Math.random();
  };

  const renderQuestions = (reviewSize) => {
    return (
      <Questions>
        {reviewSize.map((item) => (
          <Question key={MakeRandomKey()}>
            <Title>{item.title}</Title>
            <Txt>{item.txt}</Txt>
          </Question>
        ))}
      </Questions>
    );
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
      {viewType === 'grid' && (
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
      )}
      {reviews.length > 0 && (
        <List>
          <ListItem>
            <Activities>
              <NickName>{reviews[0]?.nickname}</NickName>
              <ActivitySet>
                <DateText>{reviews[0]?.regdt.split(' ')[0]}</DateText>
                <Activity src="https://i.balaan.io/mobile/img/icon/icon-more.png" />
              </ActivitySet>
            </Activities>
            <ListImg src={`https://i.balaan.io/review/${reviews[0]?.img[0]}`} />
            <Activities>
              <ActivitySet>
                <Expression like={false}>
                  <FontAwesomeIcon icon={faThumbsUp} />
                </Expression>
                <Activity src="https://static.balaan.co.kr/mobile/img/view/share.png?v=2" />
              </ActivitySet>
              <Expression like={false}>
                <FontAwesomeIcon icon={faHeart} />
              </Expression>
            </Activities>
            <StarCore>{renderStar(reviews[0]?.point)}</StarCore>
            <Option>구매 옵션명 : {reviews[0]?.opt}</Option>
            <Contents>{reviews[0]?.contents}</Contents>
            {renderQuestions(reviews[0]?.reviewSize)}
            <Delivery>
              <DeliveryIcon src="https://i.balaan.io/mobile/img/icons/icon-box-20.png" />
              배송 도착까지
              <Strong>&nbsp;1일 소요</Strong>
            </Delivery>
          </ListItem>
        </List>
      )}
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

const Grid = styled.section`
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

const List = styled.section``;

const ListItem = styled.div``;

const Activities = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.6rem;
  line-height: 2.1rem;
`;

const NickName = styled.h1`
  font-size: 1.3rem;
  font-weight: bold;
`;

const ActivitySet = styled.div`
  display: flex;
`;

const DateText = styled.p`
  font-size: 1.1rem;
  color: #999;
`;

const ListImg = styled.img`
  max-width: 100%;
`;

const activityStyle = css`
  width: 2rem;
  height: 2rem;
  background-size: cover;
`;

const Activity = styled.button`
  background-image: ${({ src }) => src && `url(${src})`};
  margin-left: 1rem;
  ${activityStyle};
`;

const Expression = styled.div`
  font-size: 2rem;
  color: ${({ like, theme }) => (like ? theme.color.black : '#C8CAC7')};
`;

const StarCore = styled.div`
  display: flex;
  padding-left: 1.6rem;
  align-items: center;
  margin-bottom: 0.7rem;
`;

const Star = styled.img`
  width: 1.4rem;
`;

const Option = styled.p`
  padding: 0 1.6rem;
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.5;
  letter-spacing: -0.025rem;
  margin-bottom: 1.2rem;
  color: #999;
`;

const Contents = styled.p`
  padding: 0 1.6rem 1.5rem;
  font-size: 1.2rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: -0.025rem;
  white-space: pre-wrap;
  color: #020202;
  font-family: lato, SpoqaHanSansNeo !important;
`;

const Questions = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0 1.6rem 2.05rem;
`;

const Question = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 1.05rem;
  font-family: lato, SpoqaHanSansNeo !important;
  margin-right: 0.55rem;
  background: white;
  border: 1px solid #e5e5e5;
  padding: 0.35rem 0.7rem;
  border-radius: 1.1rem;
`;

const Title = styled.span`
  color: #666;
  margin-right: 0.5rem;
`;

const Txt = styled.span`
  color: #122f5c;
`;

const Delivery = styled.div`
  font-size: 1.05rem;
  font-family: lato, SpoqaHanSansNeo;
  display: flex;
  align-items: center;
  margin: 0 1.6rem 2rem;
  background: #f6f6f6;
  border-radius: 0.4rem;
  width: fit-content;
  padding: 0.6rem 0.85rem;
`;

const DeliveryIcon = styled.img`
  font-size: 1.05rem;
  font-family: lato, SpoqaHanSansNeo;
  color: #222;
  margin-right: 0.35rem;
`;

const Strong = styled.span`
  font-weight: bold;
`;
