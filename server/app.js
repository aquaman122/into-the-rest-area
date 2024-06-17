import express from 'express';
import axios from 'axios';
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 8081;
const apiKey = process.env.OPENAI_API_KEY;

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3001', 'http://localhost:3000'],
  credentials: true,
}));

const openai = new OpenAI({
  apiKey: apiKey,
});

app.post('/upload', async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const prompt = `다음 재료들을 사용하여 만들 수 있는 요리를 3가지 추천해줘: ${ingredients.join(', ')}`;

    const response = await openai.chat.completions.create({
      messages: [
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
    });
    
    if (response.choices[0].message.content) {
      const completionText = response.choices[0].message.content;
      res.json({ content: completionText });
    } else {
      throw new Error('OpenAI로부터 유효한 완성을 가져오지 못했습니다');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/recipe/:recipeIndex', async (req, res) => {
  const { recipeIndex } = req.params;

  try {
    const recipes = [
      "레시피 1",
      "레시피 2",
      "레시피 3"
    ];

    const selectedRecipe = recipes[recipeIndex];

    const prompt = `이 레시피에 대해 설명해주세요: ${selectedRecipe}`;

    const response = await openai.chat.completions.create({
      messages: [
        { role: "user", content: prompt }
      ],
      model: "gpt-3.5-turbo",
    });

    if (response.choices && response.choices.length > 0 && response.choices[0].message && response.choices[0].message.content) {
      const completionText = response.choices[0].message.content;

      res.json({ recipe: `${selectedRecipe} 설명: ${completionText}` });
    } else {
      throw new Error('OpenAI로부터 유효한 완성을 가져오지 못했습니다');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
