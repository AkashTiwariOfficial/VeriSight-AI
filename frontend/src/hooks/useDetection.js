import { useRef } from "react";
import * as faceapi from "face-api.js";
import { updateRisk } from "../utils/riskSystem";

export const useDetection = (videoRef, setStatus, setScore) => {
  const lastStatus = useRef("");

  const startDetection = () => {
    const run = async () => {
      if (!videoRef.current || videoRef.current.readyState !== 4) {
        requestAnimationFrame(run);
        return;
      }

      let newStatus = "Face Detected ✅";

      try {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks();

        if (detections.length === 0) {
          newStatus = "No Face ❌";
        } else if (detections.length > 1) {
          newStatus = "Multiple Faces ⚠️";
        } else {
          const landmarks = detections[0].landmarks;

          const mouth = landmarks.getMouth();
          const mouthOpen = Math.abs(mouth[14].y - mouth[18].y);

          const leftEye = landmarks.getLeftEye();
          const rightEye = landmarks.getRightEye();

          const avgX =
            [...leftEye, ...rightEye].reduce((sum, p) => sum + p.x, 0) /
            (leftEye.length + rightEye.length);

          const faceBox = detections[0].detection.box;
          const relativeX = avgX - faceBox.x;

          if (mouthOpen > 10) {
            newStatus = "Talking 🗣️";
          } else if (relativeX < faceBox.width * 0.35) {
            newStatus = "Looking Left 👀";
          } else if (relativeX > faceBox.width * 0.65) {
            newStatus = "Looking Right 👀";
          }
        }
      } catch (err) {
        newStatus = "Detection Error ❌";
      }

      // ✅ update UI only if changed
      if (lastStatus.current !== newStatus) {
        lastStatus.current = newStatus;
        setStatus(newStatus);

        // 🔥 update risk
        const score = updateRisk(newStatus);
        setScore(score);
      }

      setTimeout(() => requestAnimationFrame(run), 300);
    };

    run();
  };

  return { startDetection };
};