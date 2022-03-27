import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ViewChoice = ({ viewType, handleClickViewType }) => (
  <Wrap>
    <ChoiceButton selected={viewType === 'grid'} onClick={handleClickViewType} id="grid">
      <ViewChoiceImg src="https://static.balaan.co.kr/mobile/img/icon/contents/tab-icon-01@2x.png" alt="gird" />
    </ChoiceButton>
    <ChoiceButton selected={viewType === 'list'} onClick={handleClickViewType} id="list">
      <ViewChoiceImg src="https://static.balaan.co.kr/mobile/img/icon/contents/tab-icon-02@2x.png" alt="list" />
    </ChoiceButton>
  </Wrap>
);

ViewChoice.propTypes = {
  viewType: PropTypes.string,
  handleClickViewType: PropTypes.func,
};

ViewChoice.defaultProps = {
  viewType: '',
};

export default ViewChoice;

const Wrap = styled.div`
  width: 100%;
`;

const ChoiceButton = styled.button`
  padding: 1rem 0;
  width: 50%;
  border-bottom: 2px solid ${({ theme }) => theme.color.black};
  opacity: ${({ selected }) => (selected ? 1 : 0.3)};
  cursor: pointer;
`;

const ViewChoiceImg = styled.img`
  width: 2rem;
`;
