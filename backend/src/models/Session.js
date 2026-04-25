import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'NO_FACE', 'MULTIPLE_FACES', 'TAB_SWITCH', 'NOISE', 'IDLE', 'GAZE_DEVIATION'
  timestamp: { type: Date, default: Date.now },
  severity: { type: String, enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'], required: true },
  description: { type: String },
  snapshotUrl: { type: String }
});

const sessionSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  examId: { type: String, required: true, index: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  status: { type: String, enum: ['ACTIVE', 'COMPLETED', 'FORCE_SUBMITTED', 'DISQUALIFIED'], default: 'ACTIVE' },
  
  trustScore: { type: Number, default: 100, min: 0, max: 100 },
  cheatingProbability: { type: Number, default: 0, min: 0, max: 100 },
  riskLevel: { type: String, enum: ['TRUSTED', 'WARNING', 'HIGH_RISK'], default: 'TRUSTED' },
  
  deviceFingerprint: { type: Object },
  networkLogs: [{
    ip: String,
    timestamp: Date,
    userAgent: String
  }],
  
  timelineEvents: [eventSchema],
  snapshots: [{ url: String, timestamp: Date, reason: String }]
}, { timestamps: true });

export default mongoose.model('Session', sessionSchema);