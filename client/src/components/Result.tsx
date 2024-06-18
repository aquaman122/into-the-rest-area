import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useResult } from '@/hooks/useResult';
import { useState } from 'react';

interface FormInputs {
  ingredients: string;
}

const Result = () => {
  const { ingredients, setIngredients, recipes, selectedRecipe, postUploadMutation, fetchRecipeMutation, error, setError } = useResult();
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      postUploadMutation.mutate({ ingredients: data.ingredients.split(',') });
    } catch (error: any) {
      setError("오류 발생: " + (error.response?.data.error || error.message));
      console.error("오류 발생:", error);
    }
  };

  const handleRecipeSelection = (index: number) => {
    setSelectedIndex(index);
    fetchRecipeMutation.mutate({ recipeIndex: index });
  };

  const recipesArray = Array.isArray(recipes) ? recipes.map((recipe) => recipe.split('\n')) : [];

  return (
    <ResultStyle>
      <Title>텍스트를 입력하고 설명을 받아보세요</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Textarea {...register('ingredients')} placeholder='재료를 입력하세요 (예: 양파, 토마토, 닭고기)' />
        {errors.ingredients && <ErrorMessage>재료를 입력해주세요.</ErrorMessage>}
        <Button type='submit'>업로드</Button>
      </Form>
      {error && (
        <ErrorContainer>
          <h2>오류:</h2>
          <p>{error}</p>
        </ErrorContainer>
      )}
      {selectedIndex === null && recipesArray.length > 0 && (
        <RecipeStyle>
          <h2>추천 요리:</h2>
          <RecipeList>
            {recipesArray.map((recipesGroup, groupIndex) => (
              <RecipeGroup key={groupIndex}>
                {recipesGroup.map((recipe, index) => (
                  <RecipeItem key={index} onClick={() => handleRecipeSelection(index)}>
                    {recipe}
                  </RecipeItem>
                ))}
              </RecipeGroup>
            ))}
          </RecipeList>
        </RecipeStyle>
      )}
      {selectedRecipe && selectedIndex !== null && (
        <SelectRecipeStyle>
          <h2>선택된 요리의 레시피:</h2>
          <p>{selectedRecipe}</p>
        </SelectRecipeStyle>
      )}
    </ResultStyle>
  );
};

const ResultStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  
  &:hover {
    background-color: #218838;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 10px;
`;

const ErrorContainer = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;

const RecipeStyle = styled.div`
  margin-top: 20px;
  width: 100%;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const RecipeList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const RecipeGroup = styled.div`
  margin-bottom: 10px;
`;

const RecipeItem = styled.li`
  padding: 10px;
  margin: 5px 0;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const SelectRecipeStyle = styled.div`
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  
  h2 {
    color: #333;
    font-size: 20px;
  }

  p {
    font-size: 16px;
    color: #555;
  }
`;

export default Result;
