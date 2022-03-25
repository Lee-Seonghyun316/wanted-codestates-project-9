import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const Grid = ({ handleClickDetail }) => {
  const data = useSelector((state) => state.reviews.data);
  const [localReviews, setLocalReviews] = useLocalStorage('localReviews', []);
  const ClientData = data && localReviews?.length > 0 ? localReviews.map((review) => review.data).concat(data) : data;

  return (
    <Wrap>
      <GridItems>
        {ClientData.map((data, index) => (
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
