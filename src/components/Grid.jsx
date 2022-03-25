import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Grid = ({ handleClickDetail, data }) => {

  return (
    <Wrap>
      <GridItems>
        {data?.map((data, index) => (
          <Img
            src={data.local ? `${data.img[0]}` : `https://i.balaan.io/review/${data.img[0]}`}
            alt="reviewImg"
            key={uuidv4()}
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
