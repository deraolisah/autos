import express from "express";
import { 
    addVehicle,
    deleteVehicle, 
    getAllVehicles, 
    getVehicleById, 
    patchVehicle, 
    updateVehicle 
} from "../controllers/vehicleControllers.js";

const router = express.Router();

router.post("/add", addVehicle);
router.get("/all", getAllVehicles);
router.get("/:id", getVehicleById);
router.post("/update-vehicle", updateVehicle);
router.patch("/patch/:id", patchVehicle);
router.delete("/delete/:id", deleteVehicle);


export default router;