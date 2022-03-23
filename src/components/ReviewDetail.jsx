import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import ListItem from './common/ListItem';
import { v4 as uuidv4 } from 'uuid';

const ReviewDetail = ({ index, setCurrent }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const data = useSelector((state) => state.reviews.data);
  const slicedReviews = data.slice(index);
  const handleClickBack = () => {
    setCurrent('list');
  };
  console.log(slicedReviews[0].id);

  return (
    <div>
      <Head>
        <button onClick={handleClickBack}>
          <ButtonImg src="http://djp5oonlusoz4.cloudfront.net/contents/event/20190924/ic_left_btn.png" alt="back" />
        </button>
        리뷰 상세보기
        <button onClick={handleClickBack}>
          <ButtonImg src="https://djp5oonlusoz4.cloudfront.net/contents/event/20190924/ic_can_btn.png" alt="x" />
        </button>
      </Head>
      <section>
        {slicedReviews.map((review) => (
          <div>
            <ListItem review={review} key={uuidv4()} />
            <Comments>
              <Comment>
                <Id>admin</Id>
                <Text>금주의 베스트 리뷰로 선정되어 상품권 10,000원이 발급 되었습니다!</Text>
                <Detail>
                  <DetailText>55주</DetailText>
                  <DetailText>답글달기</DetailText>
                </Detail>
              </Comment>
            </Comments>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ReviewDetail;

const Head = styled.header`
  position: fixed;
  text-align: center;
  padding: 1.4rem 0;
  top: 0;
  box-shadow: 0 0px 3px 0px #ccc;
  width: 100%;
  background: #fff;
  z-index: 999;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-family: Lato;
  color: #020202;
  letter-spacing: 0.031rem;
  font-size: 1.4rem;
  font-weight: 700;
  white-space: nowrap;
`;

const ButtonImg = styled.img`
  width: 1.5rem;
  margin: 0.3rem 1.6rem 0;
`;

const Comments = styled.div`
  display: flex;
  gap: 1.2rem;
  padding: 1.2rem 1.6rem;
  background: #f9f9f9;
`;

const Comment = styled.div`
  font-size: 1.2rem;
  font-weight: normal;
  line-height: 1.5;
`;

const Id = styled.h1`
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: -0.025rem;
  margin-right: 0.6rem;
`;

const Text = styled.p``;

const Detail = styled.div`
  font-size: 1rem;
  margin-top: 0.4rem;
  display: flex;
`;

const DetailText = styled.p`
  color: #999;
  margin-right: 1.7rem;
`;
