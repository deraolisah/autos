import express from "express";
import { addToFavorites, getFavorites, removeFromFavorites } from "../controllers/favoriteControllers.js";
import { protect } from "../middlewares/auth.js";


const router = express.Router();


router.post("/add/:vehicleId", protect, addToFavorites);
router.delete("/remove/:vehicleId", protect, removeFromFavorites);
router.get("/get", protect, getFavorites);

export default router;