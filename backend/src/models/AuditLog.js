// backend/src/models/AuditLog.js

import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema(
  {
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },

    action: {
      type: String,
      enum: ["WARNING_SENT", "EXAM_PAUSED", "FORCE_SUBMIT"],
      required: true,
    },

    message: String,

    metadata: Object,
  },
  { timestamps: true }
);

export default mongoose.model("AuditLog", auditLogSchema);