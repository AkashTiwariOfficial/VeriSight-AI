// backend/src/utils/fingerprint.js

import crypto from "crypto";

/**
 * Generates a unique device fingerprint
 */
export const generateFingerprint = ({
  userAgent = "",
  screen = "",
  platform = "",
  language = "",
  ip = "",
}) => {
  const raw = `${userAgent}|${screen}|${platform}|${language}|${ip}`;

  return crypto
    .createHash("sha256")
    .update(raw)
    .digest("hex");
};

/**
 * Compare fingerprints
 */
export const compareFingerprint = (fp1, fp2) => {
  return fp1 === fp2;
};

/**
 * Detect suspicious change
 */
export const detectFingerprintAnomaly = (current, previous) => {
  if (!previous) return { risk: 0, reason: null };

  if (current !== previous) {
    return {
      risk: 70,
      reason: "Device fingerprint changed",
    };
  }

  return { risk: 0, reason: null };
};