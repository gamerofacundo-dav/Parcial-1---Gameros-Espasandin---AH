import express from 'express';
import foodControllerClass from '../controller/foodController.js';
import auth from "../middlewares/auth.js";
const router = express.Router();
const foodController = new foodControllerClass();

router.get('/', auth, foodController.getFood);
router.get('/:id', auth, foodController.getFoodById);
router.get('/name/:name', auth, foodController.getFoodByName);
router.get('/ingredient/:ingredient', auth, foodController.getFoodByIngredient);
router.get('/allergen/:allergen', auth, foodController.getFoodByAllergen);
router.post('/', auth, foodController.addFood);
router.put('/:id', auth, foodController.uptdateFoodById);
router.delete('/:id', auth, foodController.deleteFoodById);

export default router;