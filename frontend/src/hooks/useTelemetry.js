import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const useTelemetry = (data) => {
  useEffect(() => {
    const interval = setInterval(() => {
      if (!data) return;

      socket.emit("telemetry", {
        timestamp: Date.now(),
        ...data,
      });

      console.log("📡 Telemetry sent:", data);
    }, 3000);

    return () => clearInterval(interval);
  }, [data]);
};