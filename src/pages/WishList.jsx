import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import LogoHeader from '../components/LogoHeader';
import ViewChoice from '../components/ViewChoice';
import Grid from '../components/Grid';
import List from '../components/List';
import ReviewDetail from './ReviewDetail';
import useSessionStorage from '../hooks/useSessionStorage';
import { useStopScroll } from '../hooks/useStopScroll';
import ShareModal from '../components/ShareModal';

const WishList = () => {
  const [viewType, setViewType] = useState('grid');
  const [current, setCurrent] = useState('wish');
  const [id, setId] = useState();
  const [copyId, setCopyId] = useState(null);
  const [shareModal, setShareModal] = useState(false);
  const [wishData, setWishData] = useSessionStorage('wish', []);
  const handleClickDetail = (id) => {
    setCurrent('detail');
    setId(id);
  };
  const handleClickViewType = useCallback((e) => {
    const value = e.currentTarget.id;
    setViewType(value);
  }, []);
  useStopScroll(shareModal);

  return (
    <Wrap>
      {current === 'wish' && (
        <div>
          <LogoHeader />
          <Title>리뷰 위시리스트</Title>
          <ViewChoice viewType={viewType} handleClickViewType={handleClickViewType} />
          {wishData.length === 0 && <Title>좋아요 누른 리뷰 없음:(</Title>}
          {viewType === 'grid' ? (
            <Grid handleClickDetail={handleClickDetail} data={wishData} />
          ) : (
            <List data={wishData} setShareModal={setShareModal} setCopyId={setCopyId} />
          )}
          {wishData > 0 && shareModal && <ShareModal setShareModal={setShareModal} reviewId={copyId} />}
        </div>
      )}
      {current === 'detail' && <ReviewDetail setCurrent={setCurrent} id={id} wish={true} />}
    </Wrap>
  );
};

export default WishList;

const Wrap = styled.main`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: #000;
  line-height: 4rem;
`;
