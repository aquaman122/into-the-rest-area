import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useResult } from '@/hooks/useResult';

interface FormInputs {
  ingredients: string;
}

const Result = () => {
  const { ingredients, setIngredients, recipes, selectedRecipe, postUploadMutation, fetchRecipeMutation, error, setError } = useResult();
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs>  = async (data) => {
    try {
      postUploadMutation.mutate({ ingredients: data.ingredients.split(',') });
    } catch (error: any) {
      setError("오류 발생: " + (error.response?.data.error || error.message));
      console.error("오류 발생:", error);
    }
  };

  const handleRecipeSelection = (index: number) => {
    fetchRecipeMutation.mutate({ recipeIndex: index });
  };

  const recipesArray = Array.isArray(recipes) ? recipes.map((recipe) => recipe.split('\n')) : [];
  console.log(recipesArray);

  return (
    <ResultStyle>
      <h1>텍스트를 입력하고 설명을 받아보세요</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea {...register('ingredients')} placeholder='재료를 입력하세요 (예: 양파, 토마토, 닭고기)' />
        {errors.ingredients && <p style={{ color: 'red' }}>재료를 입력해주세요.</p>}
        <button type='submit'>업로드</button>
      </form>
      {error && (
        <div style={{ color: 'red' }}>
          <h2>오류:</h2>
          <p>{error}</p>
        </div>
      )}
      {recipesArray.length > 0 && (
        <div>
          <h2>추천 요리:</h2>
          <ul>
            {recipesArray.map((recipesGroup, groupIndex) => (
              <div key={groupIndex}>
                {recipesGroup.map((recipe, index) => (
                  <li key={index} onClick={() => handleRecipeSelection(index)}>
                    {index + 1}. {recipe}
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </div>
      )}
      {selectedRecipe && (
        <div>
          <h2>선택된 요리의 레시피:</h2>
          <p>{selectedRecipe}</p>
        </div>
      )}
    </ResultStyle>
  );
};

const ResultStyle = styled.div`
  
`;

export default Result;
