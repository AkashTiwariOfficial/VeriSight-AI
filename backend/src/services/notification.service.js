// backend/src/services/notification.service.js

export const sendNotification = ({ type, message, userId }) => {
  // For now: console + placeholder
  console.log(`[NOTIFICATION] (${type}) → User: ${userId} → ${message}`);

  // Future:
  // - WebSocket emit
  // - Email (nodemailer)
  // - Push notification
};