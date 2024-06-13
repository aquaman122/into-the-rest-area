import { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Result = () => {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('파일 먼저 업로드해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setResponse(res.data.content);
    } catch (error) {
      console.error("Error uploading the image:", error);
    }
  };

  return (
    <ResultStyle>
      <h1>Image to GPT-3.5</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' onChange={handleFileChange} />
        <button type='submit'>Upload</button>
      </form>
      {response && (
        <div>
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
    </ResultStyle>
  );
};

const ResultStyle = styled.div`
  
`;

export default Result;
