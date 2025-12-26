import express from "express";
import { addLabStaff, getAllLabStaff, getLabStaffHome } from "../Controllers/labStaffController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

router.post("/", addLabStaff); // Add Lab Staff
router.get("/", getAllLabStaff); // Get all Lab Staff
router.get("/lab-staff/:logId",authenticateToken,getLabStaffHome)
export default router;
