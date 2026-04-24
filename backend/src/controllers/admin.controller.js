// backend/src/controllers/admin.controller.js

import Session from "../models/Session.js";
import AuditLog from "../models/AuditLog.js";

// 📊 Get All Sessions
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🚨 Flag Session
export const flagSession = async (req, res) => {
  try {
    const { sessionId, message } = req.body;

    const session = await Session.findByIdAndUpdate(
      sessionId,
      { suspiciousFlag: true },
      { new: true }
    );

    await AuditLog.create({
      adminId: req.user.id,
      userId: session.userId,
      sessionId,
      action: "WARNING_SENT",
      message,
    });

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ⛔ Force Submit
export const forceSubmit = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await Session.findByIdAndUpdate(
      sessionId,
      {
        status: "terminated",
        endedAt: new Date(),
      },
      { new: true }
    );

    await AuditLog.create({
      adminId: req.user.id,
      userId: session.userId,
      sessionId,
      action: "FORCE_SUBMIT",
    });

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};