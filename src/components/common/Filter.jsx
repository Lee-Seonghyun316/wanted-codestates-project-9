import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const Filter = ({ text, type }) => (
  <Wrap type={type}>
    {text}
    <ArrowBottom>
      <FontAwesomeIcon icon={faAngleDown} />
    </ArrowBottom>
  </Wrap>
);

Filter.propTypes = {
  text: PropTypes.string,
  type: PropTypes.string,
};

export default Filter;

const Wrap = styled.button`
  display: flex;
  gap: 5px;
  padding: 10px 1rem;
  border-radius: 3rem;
  background: none;
  font-size: ${({ theme }) => theme.fontSize.xSmall};
  font-weight: 600;
  border: 1px solid ${({ theme }) => theme.color.grey};
  white-space: nowrap;
  ${({ type }) =>
    type === 'main' &&
    css`
      border: 1px solid ${({ theme }) => theme.color.borderBlue};
      color: ${({ theme }) => theme.color.blue};
    `}
`;

const ArrowBottom = styled.div`
  color: ${({ theme }) => theme.color.grey};
`;
