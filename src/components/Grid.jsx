import React from 'react';
import styled from 'styled-components';
import { useSelector, shallowEqual } from 'react-redux';

const Grid = ({ handleClickDetail }) => {
  const data = useSelector((state) => state.reviews.data);

  return (
    <Wrap>
      <GridItems>
        {data.map((data, index) => (
          <Img
            src={`https://i.balaan.io/review/${data.img[0]}`}
            alt="reviewImg"
            key={data.id}
            onClick={() => handleClickDetail(index)}
          />
        ))}
      </GridItems>
    </Wrap>
  );
};

export default Grid;

const Wrap = styled.div``;

const GridItems = styled.section`
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
