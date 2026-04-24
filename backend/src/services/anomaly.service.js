// backend/src/services/anomaly.service.js

import { classifyPattern } from "./patternClassifier.js";

export const detectAnomaly = (features) => {
  const result = classifyPattern(features);

  let riskLevel = "Trusted";
  let confidenceLevel = "Low";

  if (result.anomalyScore > 60) {
    riskLevel = "High Risk";
    confidenceLevel = "High";
  } else if (result.anomalyScore > 30) {
    riskLevel = "Warning";
    confidenceLevel = "Medium";
  }

  return {
    ...result,
    riskLevel,
    confidenceLevel,
  };
};