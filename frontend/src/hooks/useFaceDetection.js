import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { loadModels } from "../utils/faceModelLoader";

export const useFaceDetection = (videoRef) => {
  const [faceState, setFaceState] = useState({
    noFace: false,
    multipleFaces: false,
  });

  const intervalRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      await loadModels();

      intervalRef.current = setInterval(async () => {
        if (!videoRef.current) return;

        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.TinyFaceDetectorOptions()
        );

        setFaceState({
          noFace: detections.length === 0,
          multipleFaces: detections.length > 1,
        });
      }, 1000);
    };

    init();

    return () => clearInterval(intervalRef.current);
  }, [videoRef]);

  return faceState;
};