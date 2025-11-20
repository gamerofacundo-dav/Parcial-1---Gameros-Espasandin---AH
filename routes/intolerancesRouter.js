import express from "express";
import intolerancesControllerClass from "../controller/intolerancesController.js";
const router = express.Router();
import auth from "../middlewares/auth.js";
const intolerancesController = new intolerancesControllerClass();

router.post("/", auth, intolerancesController.addIntolerance);
router.get("/:id", auth, intolerancesController.getIntoleranceById);
router.get("/", intolerancesController.getAllIntolerances);
router.put("/:id", auth, intolerancesController.updateIntoleranceById);
router.delete("/:id", auth, intolerancesController.deleteIntoleranceById);
router.get("/name/:name", auth, intolerancesController.getIntoleranceByName);

export default router;