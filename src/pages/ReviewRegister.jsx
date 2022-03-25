import React, { createElement, useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import SubHeader from '../components/common/SubHeader';

const ReviewRegister = () => {
  const [input, setInput] = useState({
    title: '',
    content: '',
  });
  const [files, setFiles] = useState([]);
  const handleChange = (e) => {
    const { value, id } = e.target;
    setInput({
      ...input,
      [id]: value,
    });
  };
  const handleClickRegister = (e) => {
    const formData = new FormData();
    formData.append('uploadImage', files[0]);
    const config = {
      Headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const Data = {
      header: config,
      data: formData,
    };
    console.log(Data, 'Data');
  };
  const onLoadFile = (e) => {
    const newFiles = e.target.files;
    setFiles([...files, ...newFiles]);
  };
  const imgStyle = {
    height: '5rem',
    width: '5rem',
    objectFit: 'cover',
    marginRight: '1rem',
  };
  const preview = useCallback(() => {
    if (files.length === 0) return false;
    const imgBoxes = document.querySelector('.img__boxes');
    imgBoxes.innerHTML = ``;
    files.map((file) => {
      const imgBox = document.createElement('img');
      imgBox.style.height = '5rem';
      imgBox.style.width = '5rem';
      imgBox.style.objectFit = 'cover';
      imgBoxes.append(imgBox);
      const reader = new FileReader();
      reader.onload = () => (imgBox.src = `${reader.result}`);
      reader.readAsDataURL(file);
    });
  }, [files]);
  useEffect(() => {
    preview();
    return () => preview();
  });

  return (
    <React.Fragment>
      {console.log(files, 'files')}
      <SubHeader title="리뷰 작성" />
      <Wrap>
        <Form>
          <ProductName>[국내/당일] 22SS 생로랑 모노그램 카드지갑 423291</ProductName>
          <Title>제목</Title>
          <Label htmlFor="title">
            제목을 입력해주세요
            <Input id="title" onChange={handleChange} value={input.title} />
          </Label>
          <Title>내용</Title>
          <Label htmlFor="content">
            오해의 소지가 있는 내용을 작성 시 검토 후 비공개 조치될 수 있습니다.
            <Input id="content" onChange={handleChange} value={input.content} />
          </Label>
          <Description>{input.content.length}자 / 최소 10자</Description>
          <FlexContainer>
            <Title>사진 등록</Title>
            <Description>{files.length}장 / 최대 8장</Description>
          </FlexContainer>
          <AddPictureLabel htmlFor="picture">+</AddPictureLabel>
          <ImgBoxes className="img__boxes" />
          <FileInput id="picture" type="file" accept="img/*" onChange={onLoadFile} />
          <Description left={true}>
            구매한 상품이 아니거나 캡쳐 사진을 첨부할 경우, 통보없이 삭제 및 적립 혜택이 취소됩니다.
          </Description>
          <RegisterButton onClick={handleClickRegister}>등록하기</RegisterButton>
        </Form>
      </Wrap>
    </React.Fragment>
  );
};

export default ReviewRegister;

const Wrap = styled.section`
  padding-top: 7rem;
  background-color: ${({ theme }) => theme.color.lightGrey};
`;

const Form = styled.form`
  background-color: white;
  padding: ${({ theme }) => theme.usefulUnit.middle};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.usefulUnit.basic};
`;

const ProductName = styled.h1`
  font-size: ${({ theme }) => theme.usefulUnit.basic};
  line-height: ${({ theme }) => theme.usefulUnit.middle};
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  margin-top: 1rem;
  font-size: ${({ theme }) => theme.usefulUnit.basic};
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.grey};
  font-size: ${({ theme }) => theme.usefulUnit.small};
`;

const Input = styled.input`
  margin-top: ${({ theme }) => theme.usefulUnit.small};
  padding: ${({ theme }) => theme.usefulUnit.small};
  border: 1px solid ${({ theme }) => theme.color.grey};
`;

const Description = styled.p`
  text-align: ${({ left }) => (left ? 'left' : 'right')};
  color: ${({ theme }) => theme.color.grey};
  font-size: ${({ theme }) => theme.usefulUnit.small};
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AddPictureLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSize.big};
  color: ${({ theme }) => theme.color.grey};
  border: 1px solid ${({ theme }) => theme.color.grey};
  height: 5rem;
  width: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ImgBoxes = styled.div`
  display: flex;
  gap: 1rem;
`;

const FileInput = styled.input`
  border: none;
  width: 0;
`;

const RegisterButton = styled.button`
  background-color: ${({ disable, theme }) => (disable ? theme.color.lightGrey : theme.color.black)};
  color: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => theme.usefulUnit.small};
  font-size: ${({ theme }) => theme.usefulUnit.basic};
  margin: ${({ theme }) => theme.usefulUnit.middle} 0;
`;
