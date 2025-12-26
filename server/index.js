import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import RentalShopRoutes from './routes/RentalShopRoutes.js';
import productRoutes  from './routes/productRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import labStaffRoutes from "./routes/labStaffRoutes.js";
import checkupRoutes from "./routes/checkupRoutes.js"
import orderRoutes from './routes/orderRoutes.js'

dotenv.config();

const server = express();
server.use(cors({ origin: 'http://localhost:5173' }));
server.use(express.json());
server.use("/uploads", express.static("uploads"));
 await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`Connected to MongoDB successfully:`);
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB", error);
    });

server.use('/api/auth', authRoutes);
server.use('/api/doctors', doctorRoutes);
server.use('/api/appointments', appointmentRoutes);
server.use('/api/users', userRoutes);
server.use('/api/rentalshop', RentalShopRoutes);
server.use('/api/product',productRoutes)
server.use("/api/bookings", bookingRoutes);
server.use("/api/laboratory-staff", labStaffRoutes);
server.use("/api/checkup",checkupRoutes)
server.use('/api/orders',orderRoutes)
server.listen(8000, () => console.log('Server started on port 8000'));
