import React from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const Header = () => {
  return (
    <Wrap>
      <Main>
        <Icons>
          <FontAwesomeIcon icon={faBars} />
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Icons>
        <Logo src="https://i.balaan.io/mobile/img/icon/ico_logo.png" alt="logo" />
        <Icons>
          <FontAwesomeIcon icon={faHeart} />
          <FontAwesomeIcon icon={faBagShopping} />
        </Icons>
      </Main>
      <Nav>
        <NavItem>특가</NavItem>
        <NavItem>당일배송</NavItem>
        <NavItem>디자이너</NavItem>
        <NavItem selected={true}>리뷰</NavItem>
        <NavItem>이벤트</NavItem>
      </Nav>
    </Wrap>
  );
};

export default Header;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Main = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
`;

const Icons = styled.div`
  display: flex;
  gap: 2rem;
  font-size: 2rem;
  padding: 0 2rem;
`;

const Logo = styled.img`
  width: 10.5rem;
`;

const Nav = styled.ul`
  display: flex;
  justify-content: space-around;
  margin: 1rem 5px;
  padding-bottom: 3px;
  font-size: ${({ theme }) => theme.fontSize.xSmall};
  font-weight: 700;
  color: ${({ theme }) => theme.color.darkGrey};
  border-bottom: 2px solid #e9e8e8;
`;

const NavItem = styled.li`
  white-space: nowrap;
  padding: 0 1.3rem 0.6rem;
  ${({ selected, theme }) =>
    selected &&
    css`
      color: ${theme.color.black};
      border-bottom: 3px solid ${theme.color.black};
    `}
`;
