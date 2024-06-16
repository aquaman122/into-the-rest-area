import { postUpload } from "@/api/result";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";


export const useResult = () => {
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

  return {
    text,
    setText,
    postUploadMutation,
    response,
    error,
    setError,
  }
};