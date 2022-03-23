import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

const CommentForm = ({ newComment, placeholder, depth, fixedInput, fixComment }) => {
  const [input, setInput] = useState('');
  const inputRef = useRef(null);
  useEffect(() => {
    fixedInput && setInput(fixedInput);
    inputRef.current.focus();
  }, [fixedInput]);
  const handleChange = (e) => {
    setInput(e.target.value);
  };
  const handleSubmit = (e) => {
    fixComment ? fixComment(e, depth, input) : newComment(e, depth, input);
    setInput('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input placeholder={placeholder} onChange={handleChange} value={input} ref={inputRef} />
      <Posting>게시</Posting>
    </Form>
  );
};

export default CommentForm;

const Form = styled.form`
  margin-top: 1rem;
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
  cursor: pointer;
`;
