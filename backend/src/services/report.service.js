// backend/src/services/report.service.js

export const generateReport = (session) => {
  return {
    userId: session.userId,
    duration: session.endedAt
      ? (session.endedAt - session.startedAt) / 60000
      : null,

    trustScore: session.trustScore,
    riskLevel: session.riskLevel,
    cheatingProbability: session.cheatingProbability,

    violations: session.reasons,

    summary: generateSummary(session),
  };
};

const generateSummary = (session) => {
  if (session.trustScore > 70) return "Clean exam behavior";
  if (session.trustScore > 40) return "Moderate suspicious activity";
  return "High risk of cheating detected";
};