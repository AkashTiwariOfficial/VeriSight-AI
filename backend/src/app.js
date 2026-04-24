// backend/src/app.js

import express from "express";
import cors from "cors";

import examRoutes from "./routes/exam.routes.js";
import adminRoutes from "./routes/admin.routes.js"; // optional if you have

import { apiLimiter } from "./middleware/rateLimit.middleware.js";
import { notFound, errorHandler } from "./middleware/error.middleware.js";

const app = express();

// ------------------ CORE MIDDLEWARE ------------------

app.use(
  cors({
    origin: "*", // tighten in production
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ------------------ GLOBAL RATE LIMIT ------------------

app.use("/api", apiLimiter);

// ------------------ ROUTES ------------------

app.use("/api/exam", examRoutes);
app.use("/api/admin", adminRoutes);

// ------------------ HEALTH CHECK ------------------

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Exam Proctoring API Running",
  });
});

// ------------------ ERROR HANDLING ------------------

app.use(notFound);
app.use(errorHandler);

export default app;