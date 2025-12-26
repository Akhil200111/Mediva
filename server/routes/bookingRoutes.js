import express from "express";
import { bookProduct, cancelBooking, getUserBookings } from "../Controllers/bookingController.js";
import authenticateToken from "../middlewares/authenticateToken.js";

const router = express.Router();

// Route to book a product
router.post("/",authenticateToken, bookProduct);
// router.get('/shop', authenticateToken, getShopBookings);
// Route to get all bookings
// router.get("/", getBookings);

// Route to get bookings for a specific user
 router.get("/:userId",authenticateToken, getUserBookings);
router.delete('/:bookingId',authenticateToken,cancelBooking)
export default router;
