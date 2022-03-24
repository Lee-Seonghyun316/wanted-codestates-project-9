import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetReplyQuery } from '../../redux/fetchReply';
import { v4 as uuidv4 } from 'uuid';
import CommentForm from './CommentForm';

const NICKNAME = 'FEDeveloper';

const Comments = ({ id }) => {
  const [comments, setComments] = useState([]);
  const [currentIndex, setDeepIndex] = useState(null);
  const [fixed, setFixed] = useState(false);
  const { data, error, isSuccess, isError, isFetching, isLoading } = useGetReplyQuery(id);
  const makeTimeGap = (startTime) => {
    const milliSeconds = Date.now() - startTime;
    const minutes = milliSeconds / 60000;
    const hours = minutes / 60;
    const day = hours / 24;
    const weeks = day / 7;
    if (weeks >= 1) {
      return `${parseInt(weeks)}주`;
    }
    if (day >= 1) {
      return `${parseInt(day)}일`;
    }
    if (hours >= 1) {
      return `${parseInt(hours)}시간`;
    }
    return minutes < 1 ? '지금' : `${parseInt(minutes)}분`;
  };
  const newComment = (e, depth, value) => {
    if (value === '') {
      return;
    }
    e.preventDefault();
    const newComment = {
      nickname: NICKNAME,
      id: uuidv4(),
      depth: depth,
      contents: value,
      registration_time: Date.now(),
    };
    depth === 0 && setComments((comments) => [...comments, newComment]);
    if (currentIndex !== null) {
      const newComment = {
        nickname: NICKNAME,
        id: uuidv4(),
        depth: depth,
        contents: value,
        registration_time: Date.now(),
        target_nickname: comments[currentIndex].nickname,
      };
      const headArray = comments.slice(0, currentIndex + 1);
      const tailArray = comments.slice(currentIndex + 1);
      setComments(headArray.concat(newComment, tailArray));
    }
  };
  const fixComment = (e, depth, value) => {
    e.preventDefault();
    if (currentIndex === null) {
      return;
    }
    const fixComment = {
      ...comments[currentIndex],
      contents: value,
      registration_time: Date.now(),
    };
    if (comments.length === 1) {
      setComments([fixComment]);
    } else {
      const headArray = comments.slice(0, currentIndex);
      const tailArray = comments.slice(currentIndex + 1);
      setComments(headArray.concat(fixComment, tailArray));
    }
    handleClickCancelFixed();
  };
  const handleClickDeepComment = (index) => {
    setDeepIndex(index);
  };
  const handleClickCancelComment = () => {
    setDeepIndex(null);
  };
  const handleClickFixed = (index) => {
    setFixed(true);
    handleClickDeepComment(index);
  };
  const handleClickCancelFixed = () => {
    setFixed(false);
    handleClickCancelComment();
  };
  const handleDeleteComment = (id) => {
    setComments((comments) => comments.filter((comment) => comment.id !== id));
  };
  const makeFixButton = (me, index) => {
    if (!me) {
      return;
    }
    return !fixed ? (
      <Detail onClick={() => handleClickFixed(index)}>수정하기</Detail>
    ) : (
      <Detail onClick={handleClickCancelFixed}>수정취소</Detail>
    );
  };
  const makeDetailContainer = (reply, index) => {
    const dt = reply.dt ? reply.dt : makeTimeGap(reply.registration_time);
    const me = NICKNAME === reply.nickname && !fixed;
    return (
      <DetailContainer>
        <Detail>{dt}</Detail>
        {currentIndex !== index ? (
          <Detail onClick={() => handleClickDeepComment(index)}>답글달기</Detail>
        ) : (
          <Detail onClick={handleClickCancelComment}>답글취소</Detail>
        )}
        {makeFixButton(me, index)}
        {me && <Detail onClick={() => handleDeleteComment(reply.id)}>삭제</Detail>}
      </DetailContainer>
    );
  };
  useEffect(() => {
    setComments(data);
  }, [data]);

  return (
    <Wrap>
      {comments?.map((reply, index) => (
        <Comment id={reply.id} key={uuidv4()} depth={reply.depth}>
          <MainInfo>
            <Id me={NICKNAME === reply.nickname}>{reply.nickname}</Id>
            {reply.target_nickname && <Id>@{reply.target_nickname}</Id>}
            <Text dangerouslySetInnerHTML={{ __html: reply.contents }} />
          </MainInfo>
          {makeDetailContainer(reply, index)}
          {currentIndex === index && (
            <CommentForm
              newComment={newComment}
              placeholder={fixed ? '' : `${NICKNAME} (으)로 답글`}
              depth={reply.depth + 1}
              fixedInput={fixed ? comments[index].contents : null}
              fixComment={fixed ? fixComment : null}
            />
          )}
        </Comment>
      ))}
      {currentIndex === null && <CommentForm newComment={newComment} placeholder="댓글 달기" depth={0} />}
    </Wrap>
  );
};

export default Comments;

const Wrap = styled.div`
  ${({ theme }) => theme.common.flexColumn};
  padding: ${({ theme }) => theme.common.basic} 1.6rem;
  background: ${({ theme }) => theme.color.lightGrey};
`;

const Comment = styled.div`
  font-size: ${({ theme }) => theme.common.basic};
  font-weight: normal;
  line-height: 1.5;
  ${({ depth }) => `margin-left: ${depth * 3}rem`}
`;

const MainInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Id = styled.h1`
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: -0.025rem;
  margin-right: 0.6rem;
  ${({ me }) => me && 'color: #be9162'}
`;

const Text = styled.p``;

const DetailContainer = styled.div`
  font-size: 1rem;
  margin-top: 0.4rem;
  display: flex;
`;

const Detail = styled.p`
  color: #999;
  margin-right: 1.7rem;
`;
