import ExamPage from "./components/ExamPage";
import Dashboard from "./components/Dashboard";
import TimelineView from "./components/TimelineView";
import HeatmapView from "./components/HeatmapView";
import RiskChart from "./components/RiskChart";
import ReportView from "./components/ReportView";

import WebcamMonitor from "./components/WebcamMonitor";
import AudioMonitor from "./components/AudioMonitor";
import BehaviorTracker from "./components/BehaviorTracker";

import AlertToast from "./components/AlertToast";
import WarningModal from "./components/WarningModal";

import { useExam } from "./context/ExamContext";

function App() {
  const { state } = useExam();

  return (
    <div className="bg-black min-h-screen text-white">

      {/* ---------------- AI MONITORING LAYER ---------------- */}
      <WebcamMonitor />
      <AudioMonitor />
      <BehaviorTracker />

      {/* ---------------- ALERT SYSTEM ---------------- */}
      <AlertToast />
      <WarningModal />

      {/* ---------------- MAIN EXAM INTERFACE ---------------- */}
      <ExamPage />

      {/* ---------------- DASHBOARD (ADMIN VIEW) ---------------- */}
      <div className="grid grid-cols-2 gap-4 p-4">
        <Dashboard />
        <RiskChart />
        <HeatmapView />
        <TimelineView />
      </div>

      {/* ---------------- FINAL REPORT ---------------- */}
      {state.sessionActive === false && <ReportView />}
    </div>
  );
}

export default App;