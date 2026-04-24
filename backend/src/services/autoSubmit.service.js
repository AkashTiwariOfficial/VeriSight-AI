// backend/src/services/autoSubmit.service.js

export const checkAutoSubmit = (session) => {
  const actions = [];

  // 🚨 Hard rule: trust score too low
  if (session.trustScore < 20) {
    actions.push({
      type: "AUTO_SUBMIT",
      reason: "Trust score critically low",
    });
  }

  // 🚨 High cheating probability
  if (session.cheatingProbability > 80) {
    actions.push({
      type: "AUTO_SUBMIT",
      reason: "High cheating probability detected",
    });
  }

  // 🚨 Multiple severe violations
  if (session.reasons?.length > 5) {
    actions.push({
      type: "AUTO_SUBMIT",
      reason: "Multiple suspicious activities detected",
    });
  }

  return actions;
};