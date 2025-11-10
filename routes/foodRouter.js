import express from 'express';
import foodControllerClass from '../controller/foodController.js';
import auth from "../middlewares/auth.js";
const router = express.Router();
const foodController = new foodControllerClass();

router.get('/', foodController.getFood);
router.get('/:id', foodController.getFoodById);
router.get('/name/:name', foodController.getFoodByName);
router.get('/ingredient/:ingredient', foodController.getFoodByIngredient);
router.get('/allergen/:allergen', foodController.getFoodByAllergen);
router.post('/', foodController.addFood);
router.put('/:id', foodController.uptdateFoodById);
router.delete('/:id', foodController.deleteFoodById);

export default router;