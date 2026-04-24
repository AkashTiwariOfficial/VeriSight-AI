// backend/src/services/patternClassifier.js

export const classifyPattern = (features) => {
  let score = 0;
  const reasons = [];

  // 🚨 Tab switching
  if (features.tabSwitchRate > 3) {
    score += 25;
    reasons.push("Frequent tab switching");
  }

  // 😴 Idle behavior
  if (features.idleRatio > 0.3) {
    score += 15;
    reasons.push("High idle time");
  }

  // ⌨️ Typing anomaly
  if (features.typingVariance > 0.6) {
    score += 20;
    reasons.push("Irregular typing pattern");
  }

  // 🖱️ Mouse inactivity
  if (features.mouseStability < 10) {
    score += 10;
    reasons.push("Low mouse activity");
  }

  return {
    anomalyScore: score,
    reasons,
  };
};


// backend/src/services/patternClassifier.js (upgrade snippet)

export const classifySeverity = (score) => {
  if (score > 70) return "CRITICAL";
  if (score > 40) return "HIGH";
  if (score > 20) return "MEDIUM";
  return "LOW";
};