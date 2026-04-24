// backend/src/utils/logger.js

const formatMessage = (level, message, meta = {}) => {
  return JSON.stringify({
    timestamp: new Date().toISOString(),
    level,
    message,
    ...meta,
  });
};

export const logger = {
  info: (msg, meta) => {
    console.log(formatMessage("INFO", msg, meta));
  },

  warn: (msg, meta) => {
    console.warn(formatMessage("WARN", msg, meta));
  },

  error: (msg, meta) => {
    console.error(formatMessage("ERROR", msg, meta));
  },
};