// backend/src/services/audioNoise.service.js

export const analyzeAudioNoise = (audioEvents = []) => {
  let risk = 0;
  const reasons = [];

  if (!audioEvents.length) {
    return { risk: 0, reasons: [] };
  }

  const highNoiseEvents = audioEvents.filter(e => e.level > 70); // dB threshold
  const speechEvents = audioEvents.filter(e => e.type === "speech");

  // 🔊 Continuous loud noise
  if (highNoiseEvents.length > 5) {
    risk += 20;
    reasons.push("Consistent high background noise");
  }

  // 🗣️ Speech detection (possible collaboration)
  if (speechEvents.length > 3) {
    risk += 30;
    reasons.push("Multiple speech events detected");
  }

  // ⏱️ Noise frequency
  const noiseRatio = highNoiseEvents.length / audioEvents.length;

  if (noiseRatio > 0.4) {
    risk += 10;
    reasons.push("Frequent noise spikes");
  }

  return { risk, reasons };
};