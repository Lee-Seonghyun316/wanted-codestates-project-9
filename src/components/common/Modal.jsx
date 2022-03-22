import React from 'react';
import styled from 'styled-components';
import { sortData } from '../../data';

const Modal = ({ closeModal, handleClickSortType, handleApplyButton, sort }) => {
  return (
    <Wrap>
      <BlackOut onClick={closeModal} />
      <SortModal>
        <ModalTitle>정렬</ModalTitle>
        <SortTypes>
          {sortData.map((item) => (
            <SortType selected={sort === item.id} onClick={handleClickSortType} id={item.id} key={item.id}>
              {item.name}
              <CheckBox selected={sort === item.id}>
                <Check selected={sort === item.id} />
              </CheckBox>
            </SortType>
          ))}
        </SortTypes>
        <ApplyButton onClick={handleApplyButton}>적용하기</ApplyButton>
      </SortModal>
    </Wrap>
  );
};

export default Modal;

const Wrap = styled.div``;

const BlackOut = styled.div`
  position: absolute;
  z-index: 9;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.color.black};
  opacity: 0.4;
`;

const SortModal = styled.div`
  position: absolute;
  bottom: 0;
  width: 100vw;
  display: flex;
  flex-direction: column;
  margin-top: auto;
  flex: 1;
  background-color: #fff;
  z-index: 10;
`;

const ModalTitle = styled.h1`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1.8rem 0 1.3rem 0;
  font-size: 1.3rem;
`;

const SortTypes = styled.ul`
  margin-bottom: 1.6rem;
  overflow-x: hidden;
  padding: 0 1.8rem;
`;

const SortType = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0.2rem;
  font-size: ${({ theme }) => theme.fontSize.xSmall};
  border-bottom: 1px solid #ccc;
  font-weight: bolder;
  color: ${({ selected, theme }) => (selected ? theme.color.black : 'grey')};
  cursor: pointer;
`;

const CheckBox = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid ${({ selected, theme }) => (selected ? theme.color.black : '#ccc')};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Check = styled.div`
  background-color: ${({ selected, theme }) => (selected ? theme.color.black : 'white')};
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;

const ApplyButton = styled.button`
  display: flex;
  justify-content: center;
  margin: 2rem 1.8rem;
  flex: 1;
  padding: 1rem 0;
  background-color: #000;
  color: #fff;
  border-radius: 0.2rem;
  font-size: ${({ theme }) => theme.fontSize.small};
  cursor: pointer;
`;
