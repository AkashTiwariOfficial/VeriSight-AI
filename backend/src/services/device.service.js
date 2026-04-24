// backend/src/services/device.service.js

export const analyzeDevice = (currentFingerprint, storedFingerprint) => {
  let risk = 0;
  const reasons = [];

  if (!storedFingerprint) {
    return { risk: 0, reasons: [] };
  }

  // 🧠 Browser mismatch
  if (currentFingerprint.browser !== storedFingerprint.browser) {
    risk += 20;
    reasons.push("Browser changed during exam");
  }

  // 📺 Screen resolution change
  if (currentFingerprint.screenResolution !== storedFingerprint.screenResolution) {
    risk += 15;
    reasons.push("Screen resolution changed");
  }

  // 🌍 IP mismatch
  if (currentFingerprint.ip !== storedFingerprint.ip) {
    risk += 25;
    reasons.push("IP address changed");
  }

  // 🧬 User-Agent mismatch
  if (currentFingerprint.userAgent !== storedFingerprint.userAgent) {
    risk += 20;
    reasons.push("Device fingerprint mismatch");
  }

  return { risk, reasons };
};