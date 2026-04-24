import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  reconnection: true,
});

// -------------------- CONNECTION EVENTS --------------------

socket.on("connect", () => {
  console.log("⚡ Socket Connected:", socket.id);
});

socket.on("disconnect", () => {
  console.log("❌ Socket Disconnected");
});

// -------------------- SEND TELEMETRY --------------------

export const sendTelemetry = (data) => {
  socket.emit("telemetry", {
    timestamp: Date.now(),
    ...data,
  });
};

// -------------------- LISTEN LIVE UPDATES --------------------

export const onRiskUpdate = (callback) => {
  socket.on("liveUpdate", callback);
};

export const onForceSubmit = (callback) => {
  socket.on("forceSubmit", callback);
};

export default socket;