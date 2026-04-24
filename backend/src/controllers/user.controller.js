// backend/src/controllers/user.controller.js

import User from "../models/User.js";
import jwt from "jsonwebtoken";

// 🔐 Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// 📝 Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      user,
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔑 Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.lastLogin = new Date();
    await user.save();

    res.json({
      user,
      token: generateToken(user),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 👤 Get Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};