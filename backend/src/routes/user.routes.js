// backend/src/routes/user.routes.js

import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

// 📝 Register
router.post("/register", registerUser);

// 🔑 Login
router.post("/login", loginUser);

// 👤 Profile
router.get("/me", protect, getProfile);

export default router;