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
          <Comment id={reply.id} key={uuidv4()}>
            <Id>{reply.nickname}</Id>
            <Text>{reply.contents}</Text>
            <Detail>
              <DetailText>{reply.dt}</DetailText>
              <DetailText>답글달기</DetailText>
            </Detail>
          </Comment>
        ))}
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
