import Session from '../models/Session.js';

export const createSession = async (req, res, next) => {
  try {
    const { userId, examId, deviceFingerprint } = req.body;
    
    const session = await Session.create({
      userId,
      examId,
      deviceFingerprint,
      trustScore: 100,
      cheatingProbability: 0,
      riskLevel: 'TRUSTED'
    });

    res.status(201).json({
      success: true,
      data: session
    });
  } catch (error) {
    next(error);
  }
};

export const getSession = async (req, res, next) => {
  try {
    const session = await Session.findById(req.params.sessionId);
    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });
    
    res.status(200).json({
      success: true,
      data: session
    });
  } catch (error) {
    next(error);
  }
};

export const getExamSessions = async (req, res, next) => {
  try {
    const sessions = await Session.find().sort('-updatedAt');
    res.status(200).json({
      success: true,
      data: sessions
    });
  } catch (error) {
    next(error);
  }
};