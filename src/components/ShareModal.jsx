import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import BlackOut from './BlackOut';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const ROOT_URL = 'http://localhost:3000/';

const ShareModal = ({ setShareModal, reviewId, sort = 'recent' }) => {
  const [copy, setCopy] = useState(false);
  let timeout;
  const handleClick = () => {
    setCopy(true);
    timeout = setTimeout(() => {
      setCopy(false);
    }, 1500);
  };
  useEffect(() => {
    return () => clearTimeout(timeout);
  }, []);
  const filteringSort = sort ? sort : 'recent';
  const shareUrl = `${ROOT_URL}detail?review-id=${reviewId}&sort=${filteringSort}`;
  const closeModal = () => {
    setShareModal(false);
  };
  return (
    <Wrap top={window.scrollY}>
      {copy && <Message>링크 복사 완료:)</Message>}
      <BlackOut closeModal={closeModal} />
      <Content>
        {/*<Img src="https://static.balaan.co.kr/mobile/img/share/btn_share_kt.png" alt="kakao" />*/}
        <CopyToClipboard text={shareUrl}>
          <button onClick={handleClick}>
            <Img src="https://static.balaan.co.kr/mobile/img/share/btn_share_url.png" alt="url" />
          </button>
        </CopyToClipboard>
      </Content>
    </Wrap>
  );
};

export default ShareModal;

const Wrap = styled.div`
  position: absolute;
  top: ${({ top }) => top}px;
  left: 0;
  height: 100%;
  width: 100%;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  display: block;
  width: 5rem;
  margin: 1rem 0;
  cursor: pointer;
`;

const Message = styled.div`
  position: absolute;
  z-index: 11;
  top: 1rem;
  background: ${({ theme }) => theme.color.lightBlue};
  color: ${({ theme }) => theme.color.blue};
  font-size: ${({ theme }) => theme.fontSize.xSmall};
  font-weight: 600;
  padding: 1rem;
  border-radius: 2rem;
  animation: 1.5s appear linear;
  @keyframes appear {
    0% {
      opacity: 0;
      right: -5rem;
    }
    30% {
      opacity: 1;
      right: 1rem;
    }
    70% {
      opacity: 1;
      right: 1rem;
    }
    100% {
      opacity: 0;
      right: -5rem;
    }
  }
`;
