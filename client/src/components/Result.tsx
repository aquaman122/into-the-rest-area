import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useResult } from '@/hooks/result';

const Result = () => {
  const { text, setText, postUploadMutation, response, error, setError } = useResult();
  const { register, control, handleSubmit } = useForm();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onSubmit = async () => {
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
      <form onSubmit={handleSubmit(onSubmit)}>
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
