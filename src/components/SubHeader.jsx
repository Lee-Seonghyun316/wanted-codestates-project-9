import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SubHeader = ({ onClick, title }) => (
  <Head>
    <Button onClick={onClick}>
      <ButtonImg src="https://djp5oonlusoz4.cloudfront.net/contents/event/20190924/ic_left_btn.png" alt="back" />
    </Button>
    {title}
    <Button onClick={onClick}>
      <ButtonImg src="https://djp5oonlusoz4.cloudfront.net/contents/event/20190924/ic_can_btn.png" alt="x" />
    </Button>
  </Head>
);

SubHeader.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
};

SubHeader.defaultProps = {
  title: '',
};

export default React.memo(SubHeader);

const Head = styled.header`
  position: fixed;
  text-align: center;
  padding: 1.4rem 0;
  top: 0;
  box-shadow: 0 0 3px 0 #ccc;
  width: 100%;
  max-width: ${({ theme }) => theme.maxWidth};
  background: #fff;
  z-index: 8;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-family: Lato;
  color: #020202;
  letter-spacing: 0.031rem;
  font-size: 1.4rem;
  font-weight: 700;
  white-space: nowrap;
`;

const ButtonImg = styled.img`
  width: 1.5rem;
  margin: 0.3rem 1.6rem 0;
`;

const Button = styled.button`
  cursor: pointer;
`;
