import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import loginData from "./models/Login.js";

dotenv.config();

const addAdmin = async () => {
  try {
    // 1. Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // 2. Check if admin already exists
    const adminExists = await loginData.findOne({ role: "admin" });
    if (adminExists) {
      console.log("Admin already exists");
      process.exit(0);
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    // 4. Create admin
    await loginData.create({
      userName: "Admin",
      passWord: hashedPassword,
      role: "admin"
    });

    console.log("✅ Admin added successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error adding admin:", error);
    process.exit(1);
  }
};

addAdmin();
