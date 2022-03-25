import React from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import LogoHeader from './LogoHeader';

const Head = () => {
  const navigate = useNavigate();

  return (
    <Wrap>
      <LogoHeader />
      <Nav>
        <NavItem>특가</NavItem>
        <NavItem>당일배송</NavItem>
        <NavItem>디자이너</NavItem>
        <NavItem selected={true}>리뷰</NavItem>
        <NavItem onClick={() => navigate('/register')}>리뷰작성</NavItem>
      </Nav>
    </Wrap>
  );
};

export default Head;

const Wrap = styled.header`
  display: flex;
  flex-direction: column;
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
  overflow-x: scroll;
  gap: 1rem;
`;

const NavItem = styled.li`
  flex: 1;
  text-align: center;
  white-space: nowrap;
  padding-bottom: 0.4rem;
  cursor: pointer;
  ${({ selected, theme }) =>
    selected &&
    css`
      color: ${theme.color.black};
      border-bottom: 3px solid ${theme.color.black};
    `}
`;
