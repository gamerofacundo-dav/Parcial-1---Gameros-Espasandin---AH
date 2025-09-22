import express from 'express';
import historyController from '../controller/historyController.js';

const router = express.Router();
const newHistoryController = new historyController();

router.post('/', newHistoryController.addHistory);
router.get('/', newHistoryController.getHistory);
router.get('/id/:id', newHistoryController.getHistoryById);
router.get('/user/:id_usuario', newHistoryController.getHistoryByUserId);
router.delete('/id/:id', newHistoryController.deleteHistoryById);
router.delete('/user/:id_usuario', newHistoryController.deleteHistoryByUserId);

export default router;