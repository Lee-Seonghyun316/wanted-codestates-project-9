import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const ListItem = ({ review }) => {
  const renderStar = (point) => {
    const pointArr = [];
    for (let i = 0; i < point; i++) {
      pointArr.push(<Star src="https://i.balaan.io/mobile/img/icons/icon-star-black.png" alt="별점" key={uuidv4()} />);
    }
    for (let i = 0; i < 5 - point; i++) {
      pointArr.push(<Star src="https://i.balaan.io/mobile/img/icons/icon-star-gray.png" alt="별점" key={uuidv4()} />);
    }
    return pointArr;
  };
  const renderQuestions = (reviewSize) => {
    return (
      <Questions>
        {reviewSize.map((item) => (
          <Question key={uuidv4()}>
            <Title>{item.title}</Title>
            <Txt>{item.txt}</Txt>
          </Question>
        ))}
      </Questions>
    );
  };

  return (
    <div key={review.id}>
      <Activities>
        <NickName>{review?.nickname}</NickName>
        <ActivitySet>
          <DateText>{review?.regdt.split(' ')[0]}</DateText>
          <Activity src="https://i.balaan.io/mobile/img/icon/icon-more.png" />
        </ActivitySet>
      </Activities>
      <ListImg src={`https://i.balaan.io/review/${review?.img[0]}`} />
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
      <StarCore>{renderStar(review?.point)}</StarCore>
      <Option>구매 옵션명 : {review?.opt}</Option>
      <Contents>{review?.contents}</Contents>
      {renderQuestions(review?.reviewSize)}
      <Delivery>
        <DeliveryIcon src="https://i.balaan.io/mobile/img/icons/icon-box-20.png" />
        배송 도착까지
        <Strong>&nbsp;1일 소요</Strong>
      </Delivery>
    </div>
  );
};

export default ListItem;

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
  font-family: lato, SpoqaHanSansNeo;
`;

const Questions = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0 1.6rem 2.05rem;
  overflow-x: scroll;
  ${({ theme }) => theme.common.hideScrollBar}
`;

const Question = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  font-size: 1.05rem;
  font-family: lato, SpoqaHanSansNeo;
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
