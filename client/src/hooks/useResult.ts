import { fetchRecipe, postUpload } from "@/api/result";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";


export const useResult = () => {
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<string[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const postUploadMutation = useMutation({
    mutationFn: postUpload,
    onSuccess: (data) => {
      if (data.content) {
        const recipesArray = data.content.split('\n');
        setRecipes(recipesArray);
  
        queryClient.invalidateQueries({
          queryKey: ['recipes'],
        });
      } else {
        setError("데이터가 없습니다.");
      }
    },
    onError: (error) => {
      setError("오류 발생: ");
      console.error("오류 발생:", error);
    },
  });

  const fetchRecipeMutation = useMutation({
    mutationFn: fetchRecipe,
    onSuccess: (data) => {
      setSelectedRecipe(data.recipe);
    },
    onError: (error) => {
      setError("오류 발생: ");
      console.error("오류 발생:", error);
    }
  });



  return {
    ingredients,
    setIngredients,
    recipes,
    selectedRecipe,
    error,
    setError,
    postUploadMutation,
    fetchRecipeMutation,
  }
};