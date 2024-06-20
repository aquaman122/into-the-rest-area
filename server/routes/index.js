import express from 'express';
import uploadRoutes from './upload.js';
import recipeRoutes from './recipe.js';

const router = express.Router();

router.use('/upload', uploadRoutes);
router.use('/recipe', recipeRoutes);

export default router;
