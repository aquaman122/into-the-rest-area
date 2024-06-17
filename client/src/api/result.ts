import { API_END_POINT } from "@/constants/api";
import { httpClient } from "@/utils/axios";

export const postUpload = async (data: { ingredients: string[] }) => {
  const response = await httpClient.post(`${API_END_POINT.UPLOAD}` , data);
  return response.data;
}

export const fetchRecipe = async (data: { recipeIndex: number }) => {
  const response = await httpClient.post(`${API_END_POINT.RECIPE}/${data.recipeIndex}`);
  return response.data;
}