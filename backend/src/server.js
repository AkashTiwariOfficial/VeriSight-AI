import http from 'http';
import app from './app.js';
import connectDB from './config/db.js';
import { initExamSocket } from './sockets/exam.socket.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);

// Initialize Socket.io
initExamSocket(server);

// Connect to Database and start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
  });
});