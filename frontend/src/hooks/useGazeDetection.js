import { useEffect, useState } from "react";
import * as faceapi from "face-api.js";

export const useGazeDetection = (videoRef) => {
  const [gazeAway, setGazeAway] = useState(false);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (!videoRef.current) return;

      const detection = await faceapi
        .detectSingleFace(videoRef.current)
        .withFaceLandmarks();

      if (!detection) return;

      const landmarks = detection.landmarks;
      const leftEye = landmarks.getLeftEye();
      const rightEye = landmarks.getRightEye();

      const avgX =
        [...leftEye, ...rightEye].reduce((sum, p) => sum + p.x, 0) /
        (leftEye.length + rightEye.length);

      setGazeAway(avgX < 150 || avgX > 450);
    }, 1000);

    return () => clearInterval(interval);
  }, [videoRef]);

  return gazeAway;
};