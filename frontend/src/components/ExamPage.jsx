import { useEffect } from "react";
import WebcamMonitor from "./WebcamMonitor";
import AudioMonitor from "./AudioMonitor";
import BehaviorTracker from "./BehaviorTracker";

const ExamPage = () => {
  useEffect(() => {
    console.log("🚀 Exam Started");
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-xl font-bold">🧠 AI Proctored Exam</h1>

      <WebcamMonitor />
      <AudioMonitor />
      <BehaviorTracker />
    </div>
  );
};

export default ExamPage;