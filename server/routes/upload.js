import express from 'express';
import { getRecipeSuggestions } from '../service/openaiService.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { ingredients } = req.body;

  if (!ingredients) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const suggestions = await getRecipeSuggestions(ingredients);
    res.json({ content: suggestions });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
