// backend/src/utils/timelineFormatter.js

/**
 * Formats session history into readable timeline
 */
export const formatTimeline = (history = []) => {
  return history.map((entry, index) => ({
    step: index + 1,
    time: new Date().toLocaleTimeString(),
    probability: entry.probability,
    level: classify(entry.probability),
    summary: generateSummary(entry),
  }));
};

const classify = (p) => {
  if (p > 85) return "Critical";
  if (p > 65) return "High Risk";
  if (p > 40) return "Suspicious";
  return "Normal";
};

const generateSummary = (entry) => {
  const reasons = [];

  if (entry.factors?.behavior > 0.6)
    reasons.push("Behavior anomaly");

  if (entry.factors?.audio > 0.5)
    reasons.push("Audio anomaly");

  if (entry.factors?.device > 0.5)
    reasons.push("Device issue");

  if (entry.factors?.network > 0.5)
    reasons.push("Network issue");

  if (entry.factors?.drift > 0.1)
    reasons.push("Sudden behavior change");

  return reasons.length
    ? reasons.join(", ")
    : "No suspicious activity";
};