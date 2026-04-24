// backend/src/server.js

import http from "http";
import dotenv from "dotenv";

import app from "./app.js";
import connectDB from "./config/db.js";
import { initExamSocket } from "./sockets/exam.socket.js";

dotenv.config();

// ------------------ START SERVER ------------------

const startServer = async () => {
  try {
    // 🔥 Connect Database
    await connectDB();
    console.log("✅ Database connected");

    // 🔥 Create HTTP Server
    const server = http.createServer(app);

    // 🔥 Initialize Socket.IO
    initExamSocket(server);
    console.log("⚡ Socket.IO initialized");

    // 🔥 Start Listening
    const PORT = process.env.PORT || 5000;

    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

    // 🔥 Graceful shutdown
    process.on("SIGINT", () => {
      console.log("🛑 Server shutting down...");
      server.close(() => {
        console.log("✅ Server closed");
        process.exit(0);
      });
    });

  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();