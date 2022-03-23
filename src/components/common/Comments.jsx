import React from 'react';
import styled from 'styled-components';
import { useGetReplyQuery } from '../../features/reviews/fetchReply';
import { v4 as uuidv4 } from 'uuid';

const Comments = ({ id }) => {
  const { data, error, isSuccess, isError, isFetching, isLoading } = useGetReplyQuery(id);

  return (
    <Wrap>
      {data &&
        data.map((reply) => (
          <Comment id={reply.id} key={uuidv4()} depth={reply.depth}>
            <Id>{reply.nickname}</Id>
            <Text>{reply.contents}</Text>
            <Detail>
              <DetailText>{reply.dt}</DetailText>
              <DetailText>답글달기</DetailText>
            </Detail>
          </Comment>
        ))}
      <InputContainer>
        <Input placeholder="댓글 달기" />
        <Posting>게시</Posting>
      </InputContainer>
    </Wrap>
  );
};

export default Comments;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1.2rem 1.6rem;
  background: #f9f9f9;
`;

const Comment = styled.div`
  font-size: 1.2rem;
  font-weight: normal;
  line-height: 1.5;
  ${({ depth }) => `margin-left: ${depth * 3}rem`}
`;

const Id = styled.h1`
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: -0.025rem;
  margin-right: 0.6rem;
`;

const Text = styled.p``;

const Detail = styled.div`
  font-size: 1rem;
  margin-top: 0.4rem;
  display: flex;
`;

const DetailText = styled.p`
  color: #999;
  margin-right: 1.7rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const Input = styled.input`
  border-radius: 4rem 0 0 4rem;
  width: 100%;
  background: #fff !important;
  border: 1px solid #ddd;
  padding: 1rem 1rem 1rem 2rem;
  border-right: 0;
  display: block;
  font-size: 1.3rem;
  color: #333;
`;

const Posting = styled.button`
  border-radius: 0 4rem 4rem 0;
  width: 7rem;
  cursor: pointer;
  background: #fff !important;
  border: 1px solid #ddd;
  padding: 1rem 2rem 1rem;
  border-left: 0;
  display: block;
  font-size: 1.3rem;
  color: #333;
  white-space: nowrap;
`;
