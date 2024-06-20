import OpenAI from 'openai';
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
});

export const getRecipeSuggestions = async (ingredients) => {
  const prompt = `다음 재료들을 사용하여 만들 수 있는 한국요리를 3가지 추천해줘: ${ingredients.join(', ')}`;
  
  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  
  if (response.choices[0].message.content) {
    return response.choices[0].message.content;
  } else {
    throw new Error('OpenAI로부터 유효한 완성을 가져오지 못했습니다');
  }
};

export const getRecipeExplanation = async (recipe) => {
  const prompt = `이 레시피에 대해 설명해주세요: ${recipe}`;
  
  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });
  
  if (response.choices[0].message.content) {
    return response.choices[0].message.content;
  } else {
    throw new Error('OpenAI로부터 유효한 완성을 가져오지 못했습니다');
  }
};