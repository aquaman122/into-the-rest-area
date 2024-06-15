import { useState } from 'react';
import styled from 'styled-components';
import { useMutation } from '@tanstack/react-query';
import { postUpload } from '@/api/result';

const Result = () => {
  const [text, setText] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const postUploadMutation = useMutation({
    mutationFn: postUpload,
    onSuccess: (data) => {
      setResponse(data.content);
    },
    onError: (error) => {
      setError("오류 발생: ");
      console.error("오류 발생:", error);
    },
  });

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text) {
      alert('텍스트를 입력해주세요.');
      return;
    }

    try {
      postUploadMutation.mutate({ text: text });
    } catch (error: any) {
      setError("오류 발생: " + (error.response?.data.error || error.message));
      console.error("오류 발생:", error);
    }
  };

  return (
    <ResultStyle>
      <h1>텍스트를 입력하고 설명을 받아보세요</h1>
      <form onSubmit={handleSubmit}>
        <textarea placeholder='텍스트를 입력하세요' onChange={handleTextChange} />
        <button type='submit'>업로드</button>
      </form>
      {error && (
        <div style={{ color: 'red' }}>
          <h2>오류:</h2>
          <p>{error}</p>
        </div>
      )}
      {response && (
        <div>
          <h2>답변:</h2>
          <p>{response}</p>
        </div>
      )}
    </ResultStyle>
  );
};

const ResultStyle = styled.div`
  
`;

export default Result;
