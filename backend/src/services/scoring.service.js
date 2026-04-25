import Session from '../models/Session.js';

export const WEIGHTS = {
  NO_FACE: 20,
  MULTIPLE_FACES: 30,
  TAB_SWITCH: 15,
  GAZE_DEVIATION: 10,
  NOISE: 10,
  IDLE: 5,
  DEVICE_CHANGE: 25
};

export class ScoringService {
  /**
   * Processes a new telemetry event, updates session risk scores
   */
  static async processEvent(sessionId, event) {
    const session = await Session.findById(sessionId);
    if (!session) throw new Error('Session not found');

    const penalty = WEIGHTS[event.type] || 0;
    
    // Update trust score (decay)
    session.trustScore = Math.max(0, session.trustScore - penalty);
    
    // Calculate cheating probability (inversely related to trust + severity based)
    const baseCheatingProb = 100 - session.trustScore;
    session.cheatingProbability = Math.min(100, session.cheatingProbability + penalty * 0.8);
    
    // Determine Risk Level
    if (session.trustScore >= 80) {
      session.riskLevel = 'TRUSTED';
    } else if (session.trustScore >= 50) {
      session.riskLevel = 'WARNING';
    } else {
      session.riskLevel = 'HIGH_RISK';
    }

    session.timelineEvents.push(event);
    
    // Auto-submit logic if trust score reaches 0
    if (session.trustScore <= 0) {
      session.status = 'FORCE_SUBMITTED';
    }

    await session.save();
    return session;
  }
}