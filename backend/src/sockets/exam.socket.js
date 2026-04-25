import { Server } from 'socket.io';
import { ScoringService } from '../services/scoring.service.js';

export const initExamSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  const examNamespace = io.of('/exam');

  examNamespace.on('connection', (socket) => {
    console.log(`🔌 Client connected to /exam: ${socket.id}`);

    // Join room for specific exam session
    socket.on('join_session', (sessionId) => {
      socket.join(sessionId);
      console.log(`👤 Socket ${socket.id} joined session ${sessionId}`);
    });

    // Handle incoming telemetry events from the frontend
    socket.on('telemetry_event', async (data) => {
      try {
        const { sessionId, event } = data;
        
        // Process event through risk engine
        const updatedSession = await ScoringService.processEvent(sessionId, event);

        // Broadcast updated risk data to admins/dashboards listening on this session
        examNamespace.to(sessionId).emit('risk_update', {
          trustScore: updatedSession.trustScore,
          cheatingProbability: updatedSession.cheatingProbability,
          riskLevel: updatedSession.riskLevel,
          status: updatedSession.status,
          latestEvent: event
        });

        // Notify client if force submitted
        if (updatedSession.status === 'FORCE_SUBMITTED') {
          examNamespace.to(sessionId).emit('force_submit', { reason: 'Trust score depleted due to multiple violations.' });
        }
      } catch (err) {
        console.error('Telemetry processing error:', err.message);
      }
    });

    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });
  });

  return io;
};