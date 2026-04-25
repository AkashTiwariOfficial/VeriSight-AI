import express from 'express';
import { createSession, getSession, getExamSessions } from '../controllers/exam.controller.js';

const router = express.Router();

// Initialize a new exam session
router.post('/session', createSession);

// Get specific session status
router.get('/session/:sessionId', getSession);

// Get all sessions (for admin dashboard)
router.get('/sessions', getExamSessions);

export default router;