import LabStaff from "../models/LabStaff.js";
import Login from "../models/Login.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

export const addLabStaff = async (req, res) => {
    try {
      const { name, address, phone, email, password } = req.body;
  
      if (!name || !address || !phone || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
      }
  
      // ✅ Check if email (username) already exists in Login collection
      const existingUser = await Login.findOne({ username: email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }
  
      // ✅ Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // ✅ Create Login entry with hashed password
      const loginData = new Login({
        userName: email, // Store email as username
        passWord: hashedPassword,
        role: "labStaff",
      });
      await loginData.save();
  
      // ✅ Create LabStaff entry and link to Login using commonKey
      const newLabStaff = new LabStaff({
        labName:name,
        address,
        phone,
        email,
        commonKey: loginData._id, // Link to Login collection
      });
      await newLabStaff.save();
  
      res.status(201).json({ message: "Laboratory staff registered successfully!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
// Get all lab staff
export const getAllLabStaff = async (req, res) => {
  try {
    const staff = await LabStaff.find().populate("commonKey");
    console.log(staff);
    
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch staff" });
  }
};

export const getLabStaffHome = async (req, res) => {
  try {
    const { logId } = req.params; // Get logId from request parameters

    if (!logId) {
      return res.status(400).json({ error: "logId is required" });
    }

    // ✅ Find the lab staff using the commonKey (logId)
    const labStaff = await LabStaff.findOne({ commonKey: logId }).populate("commonKey");

    if (!labStaff) {
      return res.status(404).json({ error: "Lab staff not found" });
    }

    res.status(200).json(labStaff);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


