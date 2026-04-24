// backend/src/config/db.js

import mongoose from "mongoose";
import { logger } from "../utils/logger.js";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || "exam_proctoring",
    });

    logger.info(`🚀 MongoDB Connected: ${conn.connection.host}`);

    // ------------------ CONNECTION EVENTS ------------------

    mongoose.connection.on("error", (err) => {
      logger.error(`❌ MongoDB Error: ${err.message}`);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("⚠️ MongoDB Disconnected");
    });

    mongoose.connection.on("reconnected", () => {
      logger.info("🔄 MongoDB Reconnected");
    });

  } catch (error) {
    logger.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;