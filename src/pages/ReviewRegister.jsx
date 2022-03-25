import React, { useState } from 'react';
import styled from 'styled-components';
import SubHeader from '../components/common/SubHeader';
import { v4 as uuidv4 } from 'uuid';

const ReviewRegister = () => {
  const [input, setInput] = useState({
    title: '',
    content: '',
  });
  const { title, content } = input;
  const [files, setFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState({
    fileError: false,
  });
  const { fileError } = errorMessage;
  const handleChange = (e) => {
    const { value, id } = e.target;
    setInput({
      ...input,
      [id]: value,
    });
  };
  const handleClickRegister = (e) => {
    e.preventDefault();
    if (title && content.length > 9) {
      const formData = new FormData();
      formData.append(
        'Img',
        files.map((file) => file.file)
      );
      formData.append('title', title);
      formData.append('content', content);
      const config = {
        Headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const Data = {
        header: config,
        data: { title: title, content: content, formData: formData, imgSrc: files.map((file) => file.src) },
      };
      console.log(Data, 'Data');
    }
  };
  const onLoadFile = (e) => {
    const newFiles = e.target.files;
    let newUrls = [];
    for (let i = 0; i < newFiles.length; i++) {
      newUrls.push({ file: newFiles[i], src: URL.createObjectURL(newFiles[i]) });
    }
    if (newUrls.length + files.length > 9) {
      setErrorMessage({ ...errorMessage, fileError: true });
      setTimeout(() => {
        setErrorMessage({ ...errorMessage, fileError: false });
      }, 1500);
      return;
    }
    setFiles([...files, ...newUrls]);
  };
  const handleClickDeleteFile = (src) => {
    URL.revokeObjectURL(src);
    setFiles((files) => files.filter((file) => file.src !== src));
  };

  return (
    <React.Fragment>
      <SubHeader title="리뷰 작성" />
      <Wrap>
        <Form>
          <ProductName>[국내/당일] 22SS 생로랑 모노그램 카드지갑 423291</ProductName>
          <Section>
            <Title>제목</Title>
            <Label htmlFor="title">
              제목을 입력해주세요
              <Input id="title" onChange={handleChange} value={input.title} />
            </Label>
          </Section>
          <Section>
            <Title>내용</Title>
            <Label htmlFor="content">
              오해의 소지가 있는 내용을 작성 시 검토 후 비공개 조치될 수 있습니다.
              <Input id="content" onChange={handleChange} value={input.content} />
            </Label>
            <Description>{input.content.length}자 / 최소 10자</Description>
          </Section>
          <Section>
            <FlexContainer>
              <Title>
                <ErrorMessage fileError={fileError}>8장 이상 등록불가:(</ErrorMessage>
                사진 등록
              </Title>
            </FlexContainer>
            <ImgBoxes>
              {files.length <= 8 && <AddPictureLabel htmlFor="picture">+</AddPictureLabel>}
              <FileInput id="picture" type="file" accept="img/*" onChange={onLoadFile} multiple />
              {files.length > 0 &&
                files.map((file, index) => (
                  <ImgBox key={uuidv4()}>
                    <XBtn onClick={() => handleClickDeleteFile(file.src)}>+</XBtn>
                    <Img src={file.src} alt="preview" />
                  </ImgBox>
                ))}
            </ImgBoxes>
            <Description>{files.length}장 / 최대 8장</Description>
            <Description left={true}>
              구매한 상품이 아니거나 캡쳐 사진을 첨부할 경우, 통보없이 삭제 및 적립 혜택이 취소됩니다.
            </Description>
          </Section>
          <RegisterButton onClick={handleClickRegister} able={title && content.length > 9}>
            등록하기
          </RegisterButton>
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

const Section = styled.div``;

const ProductName = styled.h1`
  font-size: ${({ theme }) => theme.usefulUnit.basic};
  line-height: ${({ theme }) => theme.usefulUnit.middle};
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.usefulUnit.basic};
  margin-bottom: 0.5rem;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.grey};
  font-size: ${({ theme }) => theme.usefulUnit.small};
`;

const Input = styled.input`
  margin: ${({ theme }) => theme.usefulUnit.small} 0;
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
  color: ${({ theme }) => theme.color.lightBlue};
  border: 1px solid ${({ theme }) => theme.color.lightBlue};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 1.5rem 2rem;
`;

const ImgBoxes = styled.div`
  display: flex;
  gap: 1rem;
  overflow-y: scroll;
  padding: 1rem 0;
  ${({ theme }) => theme.common.hideScrollBar}
`;

const ImgBox = styled.div`
  position: relative;
`;

const Img = styled.img`
  width: 5rem;
  height: 5rem;
`;

const XBtn = styled.button`
  position: absolute;
  right: -0.5rem;
  top: -0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: white;
  border: 1px solid ${({ theme }) => theme.color.lightBlue};
  color: ${({ theme }) => theme.color.blue};
  transform: rotate(45deg);
  font-size: ${({ theme }) => theme.usefulUnit.small};
  cursor: pointer;
`;

const FileInput = styled.input`
  border: none;
  width: 0;
`;

const RegisterButton = styled.button`
  background-color: ${({ able, theme }) => (able ? theme.color.black : theme.color.grey)};
  color: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => theme.usefulUnit.small};
  font-size: ${({ theme }) => theme.usefulUnit.basic};
  margin: ${({ theme }) => theme.usefulUnit.middle} 0;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  margin-bottom: 0.5rem;
  color: ${({ theme, fileError }) => (fileError ? theme.color.blue : 'white')};
  font-size: ${({ theme }) => theme.usefulUnit.small};
`;
