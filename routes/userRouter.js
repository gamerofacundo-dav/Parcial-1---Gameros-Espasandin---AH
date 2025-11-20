import express from "express";
import UserControllerClass from "../controller/userController.js";
import auth from "../middlewares/auth.js";
const router = express.Router();
const userController = new UserControllerClass();

router.post('/', userController.addUser);
router.post('/auth', userController.login);

router.get('/', auth, userController.getUsers);
router.delete('/:id', auth, userController.deleteUserById);
router.put('/:id', auth, userController.updateUserById);
router.put('/allergy/:id', auth, userController.updateUserAllergyById);
router.get('/:id', auth, userController.getUserById);

export default router;