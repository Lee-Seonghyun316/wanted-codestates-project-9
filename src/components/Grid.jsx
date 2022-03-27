import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

const Grid = ({ handleClickDetail, data }) => {
  const webpSrcSet = (src) => {
    if (src.includes('.jpeg')) {
      return src.replace('.jpeg', '.webp');
    }
    if (src.includes('.jpg')) {
      return src.replace('.jpg', '.webp');
    }
    if (src.includes('.png')) {
      return src.replace('.png', '.webp');
    }
  };
  return (
    <Wrap>
      <GridItems>
        {data?.map((data, index) => (
          <Picture key={uuidv4()} onClick={() => handleClickDetail(index)}>
            <source
              srcSet={data.local ? `${data.img[0]}` : `https://i.balaan.io/review/${webpSrcSet(data.img[0])}`}
              type="image/webp"
            />
            <Img src={data.local ? `${data.img[0]}` : `https://i.balaan.io/review/${data.img[0]}`} alt="reviewImg" />
          </Picture>
        ))}
      </GridItems>
    </Wrap>
  );
};

export default Grid;

const Wrap = styled.div``;

const GridItems = styled.section`
  display: flex;
  flex-wrap: wrap;
`;

const Picture = styled.picture`
  width: 33%;
  margin-right: 0.3%;
`;

const Img = styled.img`
  width: 100%;
  height: 11rem;
  object-fit: cover;
`;
