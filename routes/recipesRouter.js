import express from 'express';
import recipeControllerClass from '../controller/recipeController.js';
import auth from "../middlewares/auth.js";
const router = express.Router();
const recipeController = new recipeControllerClass();

router.get('/', recipeController.getRecipes);
router.get('/:id', recipeController.getRecipeById);
router.get('/name/:name', recipeController.getRecipesByName);
router.get('/ingredient/:ingredient', recipeController.getRecipeByIngredient);
router.post('/', recipeController.addRecipe);
router.put('/:id', recipeController.uptdateRecipeById);
router.delete('/:id', recipeController.deleteRecipeById);

export default router;