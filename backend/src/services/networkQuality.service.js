// backend/src/services/networkQuality.service.js

export const analyzeNetwork = (networkLogs = []) => {
  let risk = 0;
  const reasons = [];

  if (networkLogs.length === 0) {
    return { risk: 0, reasons: [] };
  }

  const disconnects = networkLogs.filter(log => log.status === "offline").length;
  const reconnects = networkLogs.filter(log => log.status === "online").length;

  // 🚨 Too many disconnects
  if (disconnects > 3) {
    risk += 20;
    reasons.push("Frequent disconnections");
  }

  // 🔁 Suspicious reconnect pattern
  if (reconnects > disconnects && reconnects > 5) {
    risk += 15;
    reasons.push("Frequent reconnections detected");
  }

  // 📉 Connection instability ratio
  const instabilityRatio = disconnects / networkLogs.length;

  if (instabilityRatio > 0.3) {
    risk += 15;
    reasons.push("Unstable network behavior");
  }

  return { risk, reasons };
};