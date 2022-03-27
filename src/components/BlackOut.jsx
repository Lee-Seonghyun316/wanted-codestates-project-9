import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const BlackOut = ({ closeModal }) => <Wrap onClick={closeModal} />;

export default BlackOut;

const Wrap = styled.div`
  position: absolute;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.black};
  opacity: 0.4;
`;

BlackOut.propTypes = {
  closeModal: PropTypes.func,
};
