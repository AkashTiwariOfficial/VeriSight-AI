// backend/src/routes/exam.routes.js

import express from "express";
import { protect, } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";
import { validate, createExamSchema } from "../validators/exam.validator.js";
import { createExam } from "../controllers/exam.controller.js";

import {
  startExam,
  updateTelemetry,
  endExam,
  getSession,
} from "../controllers/exam.controller.js";

import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  authorize("admin"),
  validate(createExamSchema),
  createExam
);
// ▶️ Start exam session
router.post("/start", protect, startExam);

// 📡 Send telemetry (AI tracking events)
router.post("/telemetry", protect, updateTelemetry);

// ⛔ End exam
router.post("/end", protect, endExam);

// 📊 Get session details
router.get("/:id", protect, getSession);

export default router;