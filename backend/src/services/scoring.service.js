// backend/src/services/scoring.service.js

import { extractFeatures } from "./featureExtractor.service.js";
import { detectAnomaly } from "./anomaly.service.js";

export const updateTrustScore = (session, event) => {
  // 🔍 Step 1: Extract features
  const features = extractFeatures(event, session);

  // 🧠 Step 2: Detect anomaly
  const anomaly = detectAnomaly(features);

  // 📉 Step 3: Update trust score
  let newScore = session.trustScore - anomaly.anomalyScore * 0.1;

  // Clamp score
  newScore = Math.max(0, Math.min(100, newScore));

  // 🚨 Flag if needed
  const suspiciousFlag = newScore < 40;

  return {
    trustScore: newScore,
    riskLevel: anomaly.riskLevel,
    confidenceLevel: anomaly.confidenceLevel,
    cheatingProbability: anomaly.anomalyScore,
    reasons: anomaly.reasons,
    suspiciousFlag,
  };
};