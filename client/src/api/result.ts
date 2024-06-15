import { API_END_POINT } from "@/constants/api";
import { httpClient } from "@/utils/axios";

interface postUpload {
  text: string;
}

export const postUpload = async (data: postUpload) => {
  const response = await httpClient.post(`${API_END_POINT.UPLOAD}` ,{ ...data });
  return response.data;
}