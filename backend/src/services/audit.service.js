// backend/src/services/audit.service.js

import AuditLog from "../models/AuditLog.js";

export const logAudit = async ({
  adminId,
  userId,
  sessionId,
  action,
  message,
  metadata = {},
}) => {
  try {
    await AuditLog.create({
      adminId,
      userId,
      sessionId,
      action,
      message,
      metadata,
    });
  } catch (err) {
    console.error("Audit log failed:", err.message);
  }
};