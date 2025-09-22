import express from "express";
import intolerancesControllerClass from "../controller/intolerancesController.js";
const router = express.Router();
const intolerancesController = new intolerancesControllerClass();

router.post("/", intolerancesController.addIntolerance);
router.get("/:id", intolerancesController.getIntoleranceById);
router.get("/", intolerancesController.getAllIntolerances);
router.put("/:id", intolerancesController.updateIntoleranceById);
router.delete("/:id", intolerancesController.deleteIntoleranceById);
router.get("/name/:name", intolerancesController.getIntoleranceByName);

export default router;