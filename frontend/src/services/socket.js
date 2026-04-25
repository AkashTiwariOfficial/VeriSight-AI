import { io } from 'socket.io-client';

export const socket = io('http://localhost:5000/exam', {
  autoConnect: false
});

export const connectSocket = (sessionId) => {
  if (!socket.connected) {
    socket.connect();
  }
  socket.emit('join_session', sessionId);
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export const sendTelemetry = (sessionId, event) => {
  socket.emit('telemetry_event', { sessionId, event });
};