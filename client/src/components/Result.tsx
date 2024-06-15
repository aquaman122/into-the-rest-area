import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Result = () => {
  const [text, setText] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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
      const res = await axios.post(`http://localhost:8081/upload`, { text }); // 주제 1. 뭐시기 뭐시기 입력해서 보내주고 받아오기

      const data = res.data;
      setResponse(data.content);
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
