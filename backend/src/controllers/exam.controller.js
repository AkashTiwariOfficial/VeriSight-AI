// backend/src/controllers/exam.controller.js

import Session from "../models/Session.js";

// ▶️ Start Exam
export const startExam = async (req, res) => {
  try {
    const session = await Session.create({
      userId: req.user.id,
      deviceFingerprint: req.body.deviceFingerprint,
    });

    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📡 Update Telemetry
export const updateTelemetry = async (req, res) => {
  try {
    const { sessionId, event } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) return res.status(404).json({ message: "Session not found" });

    // Push event to timeline
    session.timeline.push(event);

    // Example updates
    if (event.type === "TAB_SWITCH") session.tabSwitchCount += 1;
    if (event.type === "IDLE") session.idleTime += event.duration || 0;

    await session.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ⛔ End Exam
export const endExam = async (req, res) => {
  try {
    const { sessionId } = req.body;

    const session = await Session.findByIdAndUpdate(
      sessionId,
      {
        status: "completed",
        endedAt: new Date(),
      },
      { new: true }
    );

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📊 Get Session Details
export const getSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id).populate("userId", "name email");

    if (!session) return res.status(404).json({ message: "Session not found" });

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};