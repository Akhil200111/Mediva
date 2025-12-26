import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils.js';
import loginData from '../models/Login.js';

export const login = async (req, res) => {
  const { userName, passWord } = req.body;
console.log("REQ BODY:", req.body);

  try {
    const user = await loginData.findOne({ userName });
    // console.log(user);
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(passWord, user.passWord);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    const token = generateToken(user._id);
    res.json({ message: 'Login successful', token, user: { id: user._id, role: user.role } });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// New added data

// import bcrypt from "bcrypt";
// import loginData from "../models/Login.js";

// export const login = async (req, res) => {
//   try {
//     const { userName, passWord } = req.body;
//     console.log("REQ BODY:", req.body);

//     // 1. Validate request
//     if (!userName || !passWord) {
//       return res.status(400).json({ message: "Username and password required" });
//     }

//     // 2. Find user
//     const user = await loginData.findOne({ userName });
//     if (!user || !user.passWord) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // 3. Compare password
//     const isMatch = await bcrypt.compare(passWord, user.passWord);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // 4. Success
//     res.status(200).json({
//       message: "Login successful",
//       role: user.role
//     });

//   } catch (error) {
//     console.error("LOGIN ERROR:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };
