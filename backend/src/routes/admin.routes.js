// backend/src/routes/admin.routes.js

import express from "express";
import {
  getAllSessions,
  flagSession,
  forceSubmit,
} from "../controllers/admin.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";


const router = express.Router();

// 🔐 Only admins allowed
router.use(protect);
router.use(authorize("admin", "super-admin"));

// 📊 Get all sessions
router.get("/sessions", getAllSessions);

// 🚨 Flag suspicious session
router.post("/flag", flagSession);

// ⛔ Force submit exam
router.post("/force-submit", forceSubmit);

export default router;