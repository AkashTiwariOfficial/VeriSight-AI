import mongoose from 'mongoose';

const auditLogSchema = new mongoose.Schema({
  sessionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Session', required: true },
  action: { type: String, required: true }, // 'EXAM_STARTED', 'WARNING_ISSUED', 'AUTO_SUBMITTED'
  details: { type: mongoose.Schema.Types.Mixed },
  performedBy: { type: String, enum: ['SYSTEM', 'ADMIN', 'STUDENT'], required: true },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model('AuditLog', auditLogSchema);