import { useExam } from "../context/ExamContext";

const Dashboard = () => {
  const { state } = useExam();

  return (
    <div className="p-4 bg-black text-white">
      <h1 className="text-xl font-bold">📊 AI Exam Dashboard</h1>

      <div className="mt-4">
        <p>🎯 Trust Score: {state.trustScore}</p>
        <p>⚠️ Risk Level: {state.riskLevel}</p>
        <p>📉 Cheating Probability: {state.cheatingProbability}%</p>
      </div>

      <div className="mt-4">
        <h2 className="font-bold">🚨 Live Alerts</h2>
        {state.alerts.map((a, i) => (
          <p key={i}>• {a}</p>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;