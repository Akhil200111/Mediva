import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {Server} from "socket.io"
import http from "http"

// Import Routes
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
import companionRoutes from "./routes/companionRoutes.js";
import companionBookingRoutes from "./routes/companionBookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import geocodeRouter from "./routes/geocode.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(8000, () => {
  console.log("Server running on port 8000");
});

app.use(cors({ 
  // origin: "http://localhost:5173"
  origin:'*'
}));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use((req, res, next) => {
  req.io = io; // Attach `io` to request
  next();
});


 await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log(`Connected to MongoDB successfully:`);
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB", error);
    });

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rentalshop', RentalShopRoutes);
app.use('/api/product',productRoutes)
app.use("/api/bookings", bookingRoutes);
app.use("/api/laboratory-staff", labStaffRoutes);
app.use("/api/checkup",checkupRoutes)
app.use('/api/orders',orderRoutes)
app.use("/api/companion", companionRoutes);
app.use("/api/companion-booking", companionBookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/geocode", geocodeRouter);


app.listen(8000, () => console.log('Server started on port 8000'));
