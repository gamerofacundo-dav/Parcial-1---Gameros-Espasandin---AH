import express from 'express';
import historyController from '../controller/historyController.js';
import auth from "../middlewares/auth.js";

const router = express.Router();
const newHistoryController = new historyController();

router.post('/', auth, newHistoryController.addHistory);
router.get('/', auth, newHistoryController.getHistory);
router.get('/id/:id', auth, newHistoryController.getHistoryById);
router.get('/user/:id_usuario', auth, newHistoryController.getHistoryByUserId);
router.delete('/id/:id', auth, newHistoryController.deleteHistoryById);
router.delete('/user/:id_usuario', auth, newHistoryController.deleteHistoryByUserId);

export default router;