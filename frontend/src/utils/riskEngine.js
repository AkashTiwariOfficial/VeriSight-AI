export const calculateRisk = (signals) => {
  let risk = 0;

  if (signals.noFace) risk += 30;
  if (signals.multipleFaces) risk += 40;
  if (signals.gazeAway) risk += 15;
  if (signals.tabSwitch) risk += 20;
  if (signals.audioNoise) risk += 20;

  const probability = Math.min(100, risk);

  return {
    probability,
    level:
      probability > 80
        ? "Critical"
        : probability > 50
        ? "High"
        : "Normal",
  };
};