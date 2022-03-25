import React from 'react';
import styled from 'styled-components';

const BlackOut = ({ closeModal, top }) => <Wrap onClick={closeModal} top={top} />;

export default BlackOut;

const Wrap = styled.div`
  position: absolute;
  z-index: 9;
  left: 0;
  top: ${({ top }) => (top ? top : 0)}px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.black};
  opacity: 0.4;
`;
