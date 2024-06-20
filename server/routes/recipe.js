import express from 'express';
import { getRecipeExplanation } from '../service/openaiService.js';

const router = express.Router();

router.post('/:recipeIndex', async (req, res) => {
  const { recipeIndex } = req.params;

  try {
    const recipes = [
      "레시피 1",
      "레시피 2",
      "레시피 3"
    ];

    const selectedRecipe = recipes[recipeIndex];
    const explanation = await getRecipeExplanation(selectedRecipe);

    res.json({ recipe: `${selectedRecipe} 설명: ${explanation}` });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
