import React, { useState } from 'react';
import styled from 'styled-components';
import LogoHeader from '../components/LogoHeader';
import ViewChoice from '../components/ViewChoice';
import Grid from '../components/Grid';
import List from '../components/List';
import ReviewDetail from './ReviewDetail';
import useLocalStorage from '../hooks/useLocalStorage';
import { useStopScroll } from '../hooks/useStopScroll';
import ShareModal from '../components/ShareModal';

const WishList = () => {
  const [viewType, setViewType] = useState('grid');
  const [current, setCurrent] = useState('wish');
  const [wishData, setWishData] = useLocalStorage('wish');
  const [index, setIndex] = useState(0);
  const [copyId, setCopyId] = useState(null);
  const [shareModal, setShareModal] = useState(false);
  const handleClickDetail = (index) => {
    setCurrent('detail');
    setIndex(index);
  };
  useStopScroll(shareModal);

  return (
    <div>
      {current === 'wish' && (
        <div>
          <LogoHeader />
          <Title>리뷰 위시리스트</Title>
          <ViewChoice />
          {viewType === 'grid' ? (
            <Grid handleClickDetail={handleClickDetail} data={wishData} />
          ) : (
            <List data={wishData} setShareModal={setShareModal} setCopyId={setCopyId} />
          )}
          {shareModal && <ShareModal setShareModal={setShareModal} reviewId={copyId} />}
        </div>
      )}
      {current === 'detail' && <ReviewDetail setCurrent={setCurrent} index={index} />}
    </div>
  );
};

export default WishList;

const Title = styled.h1`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: #000;
  line-height: 4rem;
`;
