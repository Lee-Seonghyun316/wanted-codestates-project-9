import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping, faBars, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import styled from 'styled-components';

const LogoHeader = () => (
  <Main>
    <Icons position="left">
      <FontAwesomeIcon icon={faBars} />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </Icons>
    <Logo src="https://i.balaan.io/mobile/img/icon/ico_logo.png" alt="logo" />
    <Icons>
      <FontAwesomeIcon icon={faHeart} />
      <FontAwesomeIcon icon={faBagShopping} />
    </Icons>
  </Main>
);

export default LogoHeader;

const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 5rem;
`;

const Icons = styled.div`
  flex: 1;
  display: flex;
  justify-content: ${({ position }) => (position === 'left' ? 'flex-start' : 'flex-end')};
  gap: 2rem;
  font-size: 2rem;
  padding: 0 1rem;
`;

const Logo = styled.img`
  flex: 2;
  max-width: 10.5rem;
`;
