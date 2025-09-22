import express from 'express';
import historyController from '../controller/historyController.js';

const router = express.Router();
const newHistoryController = new historyController();

router.post('/', newHistoryController.addHistory);
router.get('/', newHistoryController.getHistory);
router.get('/:id', newHistoryController.getHistoryById);
router.get('/:id', newHistoryController.getHistoryByUserId);
router.delete('/:id', newHistoryController.deleteHistoryById);
router.delete('/:id', newHistoryController.deleteHistoryByUserId);

export default router;