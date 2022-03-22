import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Grid = ({ setTarget }) => {
  const reviews = useSelector((state) => state.reviews.data);

  return (
    <Wrap>
      <ViewChoice>
        <ChoiceButton selected={true}>
          <ViewChoiceImg src="https://static.balaan.co.kr/mobile/img/icon/contents/tab-icon-01@2x.png" alt="gird" />
        </ChoiceButton>
        <ChoiceButton>
          <ViewChoiceImg src="https://static.balaan.co.kr/mobile/img/icon/contents/tab-icon-02@2x.png" alt="list" />
        </ChoiceButton>
      </ViewChoice>
      <GridImgs>
        {reviews.map((data) => (
          <Img src={`https://i.balaan.io/review/${data.img[0]}`} alt="reviewImg" key={data.id} />
        ))}
      </GridImgs>
    </Wrap>
  );
};

export default Grid;

const Wrap = styled.div``;

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

const GridImgs = styled.section`
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
