import express from "express";
import UserControllerClass from "../controller/userController.js";

const router = express.Router();
const userController = new UserControllerClass();

router.get('/', userController.getUsers);
router.post('/', userController.addUser);
router.post('/auth', userController.login);
router.delete('/:id', userController.deleteUserById);
router.put('/:id', userController.updateUserById);
router.put('/allergy/:id', userController.updateUserAllergyById);
router.get('/:id', userController.getUserById);

export default router;