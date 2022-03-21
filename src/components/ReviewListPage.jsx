import React from 'react';
import styled from 'styled-components';
import { useGetReviewsQuery } from '../service/reviews';
import Header from './common/Header';
import Filter from './common/Filter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';

const ReviewListPage = () => {
  const { data, error, isLoading, isSuccess, isError } = useGetReviewsQuery(1);

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
      <ViewContainer>
        <ViewChoice>
          <ChoiceButton selected={true}>
            <ViewChoiceImg src="https://static.balaan.co.kr/mobile/img/icon/contents/tab-icon-01@2x.png" alt="gird" />
          </ChoiceButton>
          <ChoiceButton>
            <ViewChoiceImg src="https://static.balaan.co.kr/mobile/img/icon/contents/tab-icon-02@2x.png" alt="list" />
          </ChoiceButton>
        </ViewChoice>
        {data && (
          <Grid>
            {data.data.map((data) => (
              <Img src={`https://i.balaan.io/review/${data.img[0]}`} alt="reviewImg" />
            ))}
          </Grid>
        )}
      </ViewContainer>
    </Wrap>
  );
};

export default ReviewListPage;

const Wrap = styled.div``;

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
  border-radius: 20px;
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
