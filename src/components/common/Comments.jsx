import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGetReplyQuery } from '../../features/reviews/fetchReply';
import { v4 as uuidv4 } from 'uuid';
import CommentForm from './CommentForm';

const NICKNAME = 'FEDeveloper';

const Comments = ({ id }) => {
  const { data, error, isSuccess, isError, isFetching, isLoading } = useGetReplyQuery(id);
  const [comments, setComments] = useState([]);
  const [deepIndex, setDeepIndex] = useState(null);
  const [fixed, setFixed] = useState(false);
  useEffect(() => {
    setComments(data);
  }, [data]);
  const newComment = (e, depth, value) => {
    e.preventDefault();
    const newComment = {
      nickname: NICKNAME,
      id: uuidv4(),
      depth: depth,
      contents: value,
      dt: '지금',
    };
    depth === 0 && setComments((comments) => [...comments, newComment]);
    if (deepIndex !== null) {
      const newComment = {
        nickname: NICKNAME,
        id: uuidv4(),
        depth: depth,
        contents: value,
        dt: '지금',
        target_nickname: comments[deepIndex].nickname,
      };
      let newArray = [...comments];
      newArray.splice(deepIndex + 1, 0, newComment);
      setComments([...newArray]);
    }
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
  const fixComment = (e, depth, value) => {
    e.preventDefault();
    if (deepIndex !== null) {
      const fixComment = {
        nickname: NICKNAME,
        id: uuidv4(),
        depth: depth - 1,
        contents: value,
        dt: '지금',
      };
      let newArray = [...comments];
      newArray.splice(deepIndex, 1, fixComment);
      setComments([...newArray]);
    }
    handleClickCancelFixed();
  };
  const handleDeleteComment = (id) => {
    setComments((comments) => comments.filter((comment) => comment.id !== id));
  };

  return (
    <Wrap>
      {comments &&
        comments.map((reply, index) => (
          <Comment id={reply.id} key={uuidv4()} depth={reply.depth}>
            <MainInfo>
              <Id me={NICKNAME === reply.nickname}>{reply.nickname}</Id>
              {reply.target_nickname && <Id>@{reply.target_nickname}</Id>}
              <Text dangerouslySetInnerHTML={{ __html: reply.contents }} />
              {/*<Text>{reply.contents}</Text>*/}
            </MainInfo>
            <DetailContainer>
              <Detail>{reply.dt}</Detail>
              {deepIndex !== index ? (
                <Detail onClick={() => handleClickDeepComment(index)}>답글달기</Detail>
              ) : (
                <Detail onClick={handleClickCancelComment}>답글취소</Detail>
              )}
              {NICKNAME === reply.nickname && !fixed ? (
                <Detail onClick={() => handleClickFixed(index)}>수정하기</Detail>
              ) : (
                <Detail onClick={handleClickCancelFixed}>수정취소</Detail>
              )}
              {NICKNAME === reply.nickname && <Detail onClick={() => handleDeleteComment(reply.id)}>삭제</Detail>}
            </DetailContainer>
            {deepIndex === index && (
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
      {deepIndex === null && <CommentForm newComment={newComment} placeholder="댓글 달기" depth={0} />}
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
