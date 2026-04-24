// backend/src/ml/cheatingModel.js

/**
 * 🛡️ HEC v3.0 — GOD LEVEL MODEL
 * - EWMA Temporal Modeling
 * - Cross-Signal Synergy
 * - Drift Detection
 * - Context Awareness
 * - Confidence + Uncertainty Modeling
 * - Adaptive Learning with Stability
 */

let WEIGHTS = {
  behavior: 0.4,
  device: 0.2,
  network: 0.2,
  audio: 0.2,
};

const BIAS = -1.15;
const SYNERGY_COEFFICIENT = 0.2;
const DECAY_FACTOR = 0.98;

// ------------------ UTILITIES ------------------

const sigmoid = (x) => 1 / (1 + Math.exp(-x));
const normalize = (val, max = 100) => Math.min(Math.max(val / max, 0), 1);

const renormalizeWeights = () => {
  const sum = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
  Object.keys(WEIGHTS).forEach(k => WEIGHTS[k] /= sum);
};

// ------------------ TEMPORAL INTELLIGENCE ------------------

const computeEWMA = (history = []) => {
  if (history.length < 2) return 0;

  const alpha = 0.7;
  let ewma = history[0].probability;

  for (let i = 1; i < history.length; i++) {
    ewma = alpha * history[i].probability + (1 - alpha) * ewma;
  }

  return ewma;
};

const computeTrendFactor = (history = []) => {
  const ewma = computeEWMA(history);

  if (ewma > 75) return 1.35;
  if (ewma > 50) return 1.2;
  if (ewma < 25) return 0.9; // stabilization
  return 1;
};

// ------------------ DRIFT DETECTION ------------------

const detectDrift = (current, previous = {}) => {
  let driftScore = 0;
  const reasons = [];

  Object.keys(current).forEach(key => {
    if (previous[key] !== undefined) {
      const diff = Math.abs(current[key] - previous[key]);

      if (diff > 0.4) {
        driftScore += 0.1;
        reasons.push(`Sudden shift in ${key}`);
      }
    }
  });

  return { driftScore, reasons };
};

// ------------------ SYNERGY ------------------

const calculateSynergy = (scores) => {
  const highSignals = Object.values(scores).filter(s => s > 0.65).length;
  return highSignals >= 2 ? highSignals * SYNERGY_COEFFICIENT : 0;
};

// ------------------ CONTEXT AWARENESS ------------------

const applyContextRules = (probability, context = {}) => {
  let adjusted = probability;

  // 🕒 Early phase relaxation
  if (context.elapsedTime < 120000) {
    adjusted *= 0.8;
  }

  // ⏳ Long exam strictness
  if (context.elapsedTime > 3600000) {
    adjusted *= 1.1;
  }

  return adjusted;
};

// ------------------ CONFIDENCE ------------------

const calibrateConfidence = (scores, historyLength) => {
  if (historyLength < 3) return "Low";

  const vals = Object.values(scores);
  const variance = Math.max(...vals) - Math.min(...vals);

  if (variance < 0.2) return "High";
  if (variance < 0.4) return "Medium";
  return "Low (Conflict)";
};

// ------------------ MAIN MODEL ------------------

export const predictCheatingProbability = ({
  features = {},
  device = {},
  network = {},
  audio = {},
  history = [],
  context = {},
}) => {
  // 1️⃣ Feature Scoring
  const scores = {
    behavior:
      normalize(features.tabSwitchRate, 5) * 0.35 +
      normalize(features.typingVariance, 1) * 0.35 +
      (1 - normalize(features.mouseStability, 100)) * 0.3,

    device: normalize(device.risk, 100),
    network: normalize(network.risk, 100),
    audio: normalize(audio.risk, 100),
  };

  // 2️⃣ Linear Model
  let z = BIAS;
  for (const key in WEIGHTS) {
    z += scores[key] * WEIGHTS[key];
  }

  // 3️⃣ Synergy
  z += calculateSynergy(scores);

  // 4️⃣ Temporal Trend
  const trendFactor = computeTrendFactor(history);
  z *= trendFactor;

  // 5️⃣ Drift Detection
  const prev = history[history.length - 1]?.factors || {};
  const drift = detectDrift(scores, prev);
  z += drift.driftScore;

  // 6️⃣ Decay (reduces stale suspicion)
  z *= DECAY_FACTOR;

  // 7️⃣ Probability
  let probability = sigmoid(z) * 100;

  // 8️⃣ Context Awareness
  probability = applyContextRules(probability, context);

  // 9️⃣ Confidence
  const confidence = calibrateConfidence(scores, history.length);

  // 🔟 Reasons
  const reasons = [];

  if (scores.behavior > 0.6) reasons.push("Anomalous behavioral pattern");
  if (scores.audio > 0.5) reasons.push("Suspicious audio activity");
  if (scores.device > 0.5) reasons.push("Device inconsistency detected");
  if (scores.network > 0.5) reasons.push("Network instability detected");
  if (trendFactor > 1.2) reasons.push("Escalating risk trend");
  if (drift.reasons.length) reasons.push(...drift.reasons);
  if (calculateSynergy(scores) > 0)
    reasons.push("Multi-sensor correlation detected");

  return {
    probability: Number(probability.toFixed(2)),
    level: classifyLevel(probability),
    confidence,
    verdict: generateVerdict(probability, confidence),
    factors: {
      ...scores,
      trendFactor,
      drift: drift.driftScore,
    },
    reasons,
  };
};

// ------------------ VERDICT ------------------

const classifyLevel = (p) => {
  if (p > 85) return "Critical";
  if (p > 65) return "High Risk";
  if (p > 40) return "Suspicious";
  return "Normal";
};

const generateVerdict = (p, c) => {
  if (p > 80 && c === "High") return "PROCTOR_INTERVENTION_REQUIRED";
  if (p > 50) return "FLAG_FOR_REVIEW";
  return "STABLE";
};

// ------------------ ADAPTIVE LEARNING ------------------

export const adaptWeights = (feedback = {}) => {
  if (feedback.falsePositive) {
    WEIGHTS.behavior *= 0.9;
    WEIGHTS.audio *= 0.95;
  }

  if (feedback.confirmedCheating) {
    WEIGHTS.behavior *= 1.1;
    WEIGHTS.audio *= 1.1;
  }

  renormalizeWeights();
};