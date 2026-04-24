// backend/src/sockets/exam.socket.js

import { Server } from "socket.io";
import { predictCheatingProbability } from "../ml/cheatingModel.js";

// In-memory stores (can be replaced with Redis later)
const sessionStore = new Map(); // studentId → session data
const examRooms = new Map(); // examId → Set(studentIds)

// ------------------ INIT SOCKET ------------------

export const initExamSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ Client connected:", socket.id);

    // ------------------ JOIN EXAM ------------------

    socket.on("join_exam", ({ examId, studentId }) => {
      socket.join(examId);

      if (!examRooms.has(examId)) {
        examRooms.set(examId, new Set());
      }

      examRooms.get(examId).add(studentId);

      sessionStore.set(studentId, {
        history: [],
        lastActivity: Date.now(),
      });

      console.log(`🎓 Student ${studentId} joined exam ${examId}`);

      socket.emit("joined_successfully");
    });

    // ------------------ TELEMETRY ------------------

    socket.on("telemetry", (payload) => {
      try {
        const { studentId, examId, features, device, network, audio } = payload;

        const session = sessionStore.get(studentId);
        if (!session) return;

        const result = predictCheatingProbability({
          features,
          device,
          network,
          audio,
          history: session.history,
          context: {
            elapsedTime: Date.now() - session.startTime,
          },
        });

        // Save history
        session.history.push({
          probability: result.probability,
          factors: result.factors,
        });

        // Keep last 20 entries
        if (session.history.length > 20) {
          session.history.shift();
        }

        session.lastActivity = Date.now();

        // ------------------ EMIT TO PROCTOR ------------------

        socket.to(examId).emit("live_update", {
          studentId,
          ...result,
        });

        // ------------------ CRITICAL ALERT ------------------

        if (result.level === "Critical") {
          socket.to(examId).emit("alert", {
            studentId,
            message: "🚨 High probability of cheating",
            details: result,
          });
        }

      } catch (err) {
        console.error("❌ Telemetry error:", err.message);
      }
    });

    // ------------------ HEARTBEAT ------------------

    socket.on("heartbeat", ({ studentId }) => {
      const session = sessionStore.get(studentId);
      if (session) {
        session.lastActivity = Date.now();
      }
    });

    // ------------------ DISCONNECT ------------------

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
      // (Optional: cleanup logic)
    });
  });

  // ------------------ CLEANUP LOOP ------------------

  setInterval(() => {
    const now = Date.now();

    for (const [studentId, session] of sessionStore.entries()) {
      if (now - session.lastActivity > 30000) {
        console.log(`⚠️ Removing inactive student ${studentId}`);
        sessionStore.delete(studentId);
      }
    }
  }, 10000);

  return io;
};