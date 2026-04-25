import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { useDetection } from "./hooks/useDetection";

function App() {
  const videoRef = useRef(null);

  const [status, setStatus] = useState("Loading...");
  const [score, setScore] = useState(0); // ✅ added

  useEffect(() => {
    startCamera();
    loadModels();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch {
      setStatus("Camera Error ❌");
    }
  };

  const { startDetection } = useDetection(videoRef, setStatus, setScore);

  const loadModels = async () => {
    try {
      const MODEL_URL = `${window.location.origin}/models`;

      await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
      await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);

      setStatus("Models Loaded ✅");

      startDetection();
    } catch (err) {
      console.error(err);
      setStatus("Model Load Error ❌");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">
        VeriSight AI
      </h1>

      <div className="bg-gray-800 p-4 rounded-2xl shadow-lg">
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-96 rounded-xl border-4 border-gray-700"
        />
      </div>

      <div className="mt-6 text-xl font-semibold">
        <span
          className={
            status.includes("No Face")
              ? "text-red-400"
              : status.includes("Multiple")
              ? "text-yellow-400"
              : status.includes("Talking")
              ? "text-purple-400"
              : status.includes("Looking")
              ? "text-blue-300"
              : "text-green-400"
          }
        >
          {status}
        </span>

        {/* 🔥 NEW FEATURE */}
        <p className="mt-2 text-orange-400">
          Risk Score: {score}
        </p>
      </div>
    </div>
  );
}

export default App;