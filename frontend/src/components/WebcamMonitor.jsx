import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import { useExam } from "../context/ExamContext";
import { loadModels } from "../utils/faceModelLoader";

const WebcamMonitor = () => {
  const videoRef = useRef(null);
  const { dispatch } = useExam();

  useEffect(() => {
    start();
  }, []);

  const start = async () => {
    await loadModels();

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    videoRef.current.srcObject = stream;

    videoRef.current.addEventListener("play", detect);
  };

  const detect = async () => {
    setInterval(async () => {
      const detection = await faceapi.detectAllFaces(
        videoRef.current,
        new faceapi.TinyFaceDetectorOptions()
      );

      if (detection.length === 0) {
        dispatch({
          type: "ADD_ALERT",
          payload: "⚠️ No face detected",
        });
      }

      if (detection.length > 1) {
        dispatch({
          type: "ADD_ALERT",
          payload: "⚠️ Multiple faces detected",
        });
      }
    }, 2000);
  };

  return <video ref={videoRef} autoPlay muted className="w-64" />;
};

export default WebcamMonitor;