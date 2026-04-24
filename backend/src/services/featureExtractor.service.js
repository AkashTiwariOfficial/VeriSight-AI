// backend/src/services/featureExtractor.service.js

export const extractFeatures = (event, session) => {
  const features = {
    tabSwitchRate: session.tabSwitchCount / ((Date.now() - session.startedAt) / 60000),

    idleRatio:
      session.idleTime /
      ((Date.now() - session.startedAt) / 1000),

    typingVariance: calculateVariance(session.typingSpeed || 0),

    mouseStability: session.mouseActivity || 0,

    eventType: event.type,

    timestamp: Date.now(),
  };

  return features;
};

// 📊 Helper: Variance
const calculateVariance = (value) => {
  if (!value) return 0;
  return Math.abs(value - 50) / 50; // normalized deviation
};