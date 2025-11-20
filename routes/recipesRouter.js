import express from 'express';
import recipeControllerClass from '../controller/recipeController.js';
import auth from "../middlewares/auth.js";
const router = express.Router();
const recipeController = new recipeControllerClass();

router.get('/', auth, recipeController.getRecipes);
router.get('/:id', auth, recipeController.getRecipeById);
router.get('/name/:name', auth, recipeController.getRecipesByName);
router.get('/ingredient/:ingredient', auth, recipeController.getRecipeByIngredient);
router.post('/', auth, recipeController.addRecipe);
router.put('/:id', auth, recipeController.uptdateRecipeById);
router.delete('/:id', auth, recipeController.deleteRecipeById);

export default router;